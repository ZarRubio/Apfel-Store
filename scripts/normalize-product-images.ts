import sharp from 'sharp';
import { constants } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Release libvips file handles promptly so reruns can replace generated WebP
// files on Windows even after those files have been inspected with Sharp.
sharp.cache({ files: 0 });

const CANVAS = 1200;
const OCCUPANCY = 0.8;
const EXTENSIONS = /\.(png|jpe?g|webp|avif|tiff?)$/i;
const SOURCE_PRIORITY = ['.png', '.tif', '.tiff', '.jpg', '.jpeg', '.avif', '.webp'];
type Box = { left: number; top: number; width: number; height: number };
export type ImageRule = { group?: string; background?: 'alpha' | 'solid' | 'white' };
type Prepared = {
  file: string; group: string; data: Buffer; width: number; height: number;
  box: Box; original: { width: number; height: number }; warnings: string[];
};
export type ImageResult = {
  file: string; output: string; group: string; original: { width: number; height: number };
  boundingBox: Box; modelHeight: number; sourceCalibration: number; groupScale: number;
  appliedScale: number; rendered: { width: number; height: number }; warnings: string[];
};
const message = (error: unknown) => error instanceof Error ? error.message : String(error);
const slash = (value: string) => value.split(path.sep).join('/');

// Scan every nonzero alpha value, including faint shadows and antialiased edges.
// No colour threshold or Sharp trim median filter can discard device details here.
export function alphaBounds(data: Buffer, width: number, height: number): Box {
  let left = width, top = height, right = -1, bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] === 0) continue;
      left = Math.min(left, x); top = Math.min(top, y);
      right = Math.max(right, x); bottom = Math.max(bottom, y);
    }
  }
  if (right < left) throw new Error('Imagen completamente transparente o fondo vacío');
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

// Opt-in only for the existing white-background catalog. Flood-fill exterior
// near-white pixels; enclosed white highlights and white device bodies survive.
// This is not semantic segmentation: use alpha originals for ambiguous edges.
function removeExteriorSolid(data: Buffer, width: number, height: number) {
  // Estimate a flat studio backdrop from the most frequent border colour.
  // Flood fill keeps enclosed highlights, screens and dark device details.
  const colors = new Map<string, { count: number; rgb: number[] }>();
  const sample = (pixel: number) => {
    const rgb = [...data.subarray(pixel * 4, pixel * 4 + 3)];
    const key = rgb.map(channel => Math.floor(channel / 8)).join(',');
    const color = colors.get(key) ?? { count: 0, rgb };
    color.count++; colors.set(key, color);
  };
  for (let x = 0; x < width; x++) { sample(x); sample((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { sample(y * width); sample(y * width + width - 1); }
  const backdrop = [...colors.values()].sort((a, b) => b.count - a.count)[0]?.rgb ?? [255, 255, 255];
  const visited = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0, tail = 0;
  const visit = (pixel: number) => {
    if (visited[pixel]) return;
    visited[pixel] = 1;
    const offset = pixel * 4;
    if (data[offset + 3] !== 0 && !backdrop.every((channel, index) => Math.abs(data[offset + index] - channel) <= 18)) return;
    data[offset + 3] = 0;
    queue[tail++] = pixel;
  };
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  while (head < tail) {
    const pixel = queue[head++], x = pixel % width;
    if (x > 0) visit(pixel - 1);
    if (x < width - 1) visit(pixel + 1);
    if (pixel >= width) visit(pixel - width);
    if (pixel < width * (height - 1)) visit(pixel + width);
  }
  // Some JPG exports include a pale scanner/frame line at an outer edge.
  // Remove only light bands separated from the product by a fully transparent
  // row/column, within the outer 2%. Never cross an opaque device boundary.
  const clearBand = (length: number, breadth: number, pixelAt: (line: number, offset: number) => number) => {
    for (let line = 0; line < Math.ceil(length * 0.02); line++) {
      let empty = true;
      for (let offset = 0; offset < breadth; offset++) {
        const pixel = pixelAt(line, offset) * 4;
        if (!data[pixel + 3]) continue;
        empty = false;
        if (Math.min(data[pixel], data[pixel + 1], data[pixel + 2]) < 220) return;
      }
      if (empty) {
        for (let previous = 0; previous < line; previous++) {
          for (let offset = 0; offset < breadth; offset++) data[pixelAt(previous, offset) * 4 + 3] = 0;
        }
        return;
      }
    }
  };
  clearBand(height, width, (line, offset) => line * width + offset);
  clearBand(height, width, (line, offset) => (height - 1 - line) * width + offset);
  clearBand(width, height, (line, offset) => offset * width + line);
  clearBand(width, height, (line, offset) => offset * width + width - 1 - line);

  // Disconnected labels, export rules and specks must not set the phone's
  // height. Keep every substantial component, including separated front/back
  // views; do not apply this heuristic to true-alpha originals.
  visited.fill(0);
  const components: { pixels: Uint32Array; size: number }[] = [];
  for (let seed = 0; seed < width * height; seed++) {
    if (visited[seed] || !data[seed * 4 + 3]) continue;
    head = 0; tail = 0;
    const enqueue = (pixel: number) => {
      if (visited[pixel] || !data[pixel * 4 + 3]) return;
      visited[pixel] = 1; queue[tail++] = pixel;
    };
    enqueue(seed);
    while (head < tail) {
      const pixel = queue[head++], x = pixel % width, y = Math.floor(pixel / width);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (x + dx >= 0 && x + dx < width && y + dy >= 0 && y + dy < height) enqueue(pixel + dy * width + dx);
      }
    }
    components.push({ pixels: queue.slice(0, tail), size: tail });
  }
  const largest = components.reduce((max, component) => Math.max(max, component.size), 0);
  for (const component of components) {
    if (component.size >= largest * 0.05) continue;
    for (const pixel of component.pixels) data[pixel * 4 + 3] = 0;
  }
}

async function prepare(inputDir: string, file: string, rule: ImageRule): Promise<Prepared> {
  const input = path.join(inputDir, file);
  const metadata = await sharp(input, { limitInputPixels: 40_000_000 }).metadata();
  if ((metadata.pages ?? 1) > 1) throw new Error('Las imágenes animadas/multipágina no están admitidas');
  const { data, info } = await sharp(input, { limitInputPixels: 40_000_000 })
    .autoOrient().toColourspace('srgb').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const warnings: string[] = [];
  if (rule.background === 'white' || rule.background === 'solid') {
    removeExteriorSolid(data, info.width, info.height);
    warnings.push('Fondo exterior uniforme tratado; revisar contornos similares al fondo');
  } else if (!metadata.hasAlpha) {
    warnings.push('Fuente opaca: se conserva su fondo; usar un original con alfa o background:white');
  }
  const box = alphaBounds(data, info.width, info.height);
  if (!box.left || !box.top || box.left + box.width === info.width || box.top + box.height === info.height) {
    warnings.push('El contenido toca el borde de la fuente; no se reconstruyen partes ausentes');
  }
  const folder = slash(path.dirname(file));
  const model = path.basename(file).match(/^(?:iphone-)?\d+(?:-pro-max|-pro|-plus|-mini|-air)?(?=-|\.)/i)?.[0];
  return { file, group: rule.group ?? (folder !== '.' ? folder : model ?? path.parse(file).name),
    data, width: info.width, height: info.height, box,
    original: { width: metadata.width!, height: metadata.height! }, warnings };
}

async function walk(directory: string, prefix = ''): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(path.join(directory, prefix), { withFileTypes: true })) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await walk(directory, relative));
    else if (entry.isFile() && EXTENSIONS.test(entry.name)) files.push(slash(relative));
  }
  return files.sort();
}

export async function normalizeDirectory(options: {
  inputDir: string; outputDir: string; rules?: Record<string, ImageRule>;
  log?: (line: string) => void;
}) {
  const { inputDir, outputDir, rules = {}, log = console.log } = options;
  const inputRoot = path.resolve(inputDir), outputRoot = path.resolve(outputDir);
  if (inputRoot === outputRoot || outputRoot.startsWith(inputRoot + path.sep) || inputRoot.startsWith(outputRoot + path.sep)) {
    throw new Error('Las carpetas de originales y resultados deben estar separadas');
  }
  const files = await walk(inputDir);
  if (!files.length) throw new Error(`No hay imágenes en ${inputDir}`);
  const errors: { file: string; error: string }[] = [];
  const results: ImageResult[] = [];
  const outputs = new Map<string, string[]>();
  for (const file of files) {
    const key = file.replace(EXTENSIONS, '.webp').toLowerCase();
    outputs.set(key, [...(outputs.get(key) ?? []), file]);
  }
  const selectedSources = new Map<string, string>();
  for (const [output, sources] of outputs) {
    const selected = [...sources].sort((a, b) => {
      const extension = (file: string) => path.extname(file).toLowerCase();
      return SOURCE_PRIORITY.indexOf(extension(a)) - SOURCE_PRIORITY.indexOf(extension(b)) || a.localeCompare(b);
    })[0];
    selectedSources.set(output, selected);
    if (sources.length > 1) {
      log(`AVISO ${output}: se usará ${selected}; se omiten duplicados ${sources.filter(file => file !== selected).join(', ')}`);
    }
  }
  const fail = (file: string, error: unknown) => {
    errors.push({ file, error: message(error) }); log(`ERROR ${file}: ${message(error)}`);
  };
  // Keep only one model's decoded pixels in memory at a time.
  const pendingGroups = new Map<string, string[]>();
  for (const file of files) {
    const folder = slash(path.dirname(file));
    const inferred = path.basename(file).match(/^(?:iphone-)?\d+(?:-pro-max|-pro|-plus|-mini|-air)?(?=-|\.)/i)?.[0];
    const group = rules[file]?.group ?? (folder !== '.' ? folder : inferred ?? path.parse(file).name);
    pendingGroups.set(group, [...(pendingGroups.get(group) ?? []), file]);
  }
  await mkdir(outputDir, { recursive: true });
  for (const [group, members] of pendingGroups) {
    const images: Prepared[] = [];
    for (const file of members) {
      try {
        const outputKey = file.replace(EXTENSIONS, '.webp').toLowerCase();
        if (selectedSources.get(outputKey) !== file) continue;
        const rule = rules[file] ?? { background: /\.jpe?g$/i.test(file) ? 'solid' : 'alpha' };
        images.push(await prepare(inputDir, file, { ...rule, group }));
      } catch (error) { fail(file, error); }
    }
    if (!images.length) continue;
    // Source JPGs have different pixel densities. Calibrate them to one model
    // coordinate system before computing a COMMON box and a COMMON fit factor.
    // This is a mathematical calibration, not an extra resampling operation.
    const heights = images.map(image => image.box.height).sort((a, b) => a - b);
    const modelHeight = heights[Math.floor(heights.length / 2)];
    const commonWidth = Math.max(...images.map(image => image.box.width * modelHeight / image.box.height));
    const groupScale = CANVAS * OCCUPANCY / Math.max(modelHeight, commonWidth);
    const renderHeight = Math.max(1, Math.floor(modelHeight * groupScale));
    for (const image of images) {
      try {
        const output = image.file.replace(EXTENSIONS, '.webp');
        const destination = path.join(outputDir, output);
        const { data: resized, info } = await sharp(image.data, { raw: { width: image.width, height: image.height, channels: 4 } })
          .extract(image.box).resize({ height: renderHeight, kernel: sharp.kernel.lanczos3 })
          .png().toBuffer({ resolveWithObject: true });
        const left = Math.floor((CANVAS - info.width) / 2), top = Math.floor((CANVAS - info.height) / 2);
        if (left < 0 || top < 0) throw new Error('El producto no cabe en el canvas');
        await mkdir(path.dirname(destination), { recursive: true });
        const encoded = await sharp({ create: { width: CANVAS, height: CANVAS, channels: 4, background: '#00000000' } })
          .composite([{ input: resized, left, top }]).webp({ quality: 92, alphaQuality: 100, effort: 4 }).toBuffer();
        await writeFile(destination + '.tmp', encoded);
        await rename(destination + '.tmp', destination);
        const result: ImageResult = { file: image.file, output, group, original: image.original,
          boundingBox: image.box, modelHeight, sourceCalibration: modelHeight / image.box.height,
          groupScale, appliedScale: renderHeight / image.box.height,
          rendered: { width: info.width, height: info.height }, warnings: image.warnings };
        results.push(result);
        log(`${image.file} | original ${image.original.width}×${image.original.height} | bbox ${image.box.width}×${image.box.height} (${image.box.left},${image.box.top}) | escala ${result.appliedScale.toFixed(6)} | escala común ${groupScale.toFixed(6)} | generado ${destination}`);
        for (const warning of image.warnings) log(`  AVISO: ${warning}`);
      } catch (error) { fail(image.file, error); }
    }
  }
  const report = { canvas: CANVAS, occupancy: OCCUPANCY, results, errors };
  await writeFile(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  log(`Finalizado: ${results.length} imágenes generadas; ${errors.length} errores.`);
  return report;
}

async function main() {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const inputDir = path.join(root, 'public/products/original');
  const outputDir = path.join(root, 'public/products/normalized');
  const { products } = await import('../src/data/products');
  const rules: Record<string, ImageRule> = {};
  const sourceAliases: Record<string, string> = {};
  let copyErrors = 0;
  for (const product of products) {
    for (const src of [...new Set([...product.images, ...product.colors.map(color => color.image)])]) {
      if (src.startsWith('/products/normalized/')) continue;
      const file = `${product.slug}/${path.basename(src)}`;
      rules[file] = { group: product.slug, background: /\.jpe?g$/i.test(src) ? 'solid' : 'alpha' };
      sourceAliases[src] = file;
      await mkdir(path.join(inputDir, product.slug), { recursive: true });
      try {
        // Bootstrap the current catalog once. Existing originals are NEVER replaced.
        const source = path.join(root, 'public', src.replace(/^\//, ''));
        await copyFile(source, path.join(inputDir, file), constants.COPYFILE_EXCL);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
          console.error(`ERROR copiando ${src}: ${message(error)}`); copyErrors++;
        }
      }
    }
  }
  // Optional explicit groups/background rules for future assets or overrides.
  const configPath = path.join(inputDir, 'config.json');
  try { Object.assign(rules, JSON.parse(await readFile(configPath, 'utf8'))); }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
  const report = await normalizeDirectory({ inputDir, outputDir, rules });
  const successful = new Map(report.results.map(result => [result.file, `/products/normalized/${result.output}`]));
  const mapping: Record<string, string> = {};
  for (const [file, output] of successful) mapping[`/products/original/${file}`] = output;
  for (const [source, file] of Object.entries(sourceAliases)) {
    const output = successful.get(file);
    if (output) mapping[source] = output;
  }
  await writeFile(path.join(root, 'src/data/normalizedProductImages.json'), JSON.stringify(mapping, null, 2) + '\n');
  if (report.errors.length || copyErrors) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(message(error)); process.exitCode = 1; });
}
