import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { alphaBounds, normalizeDirectory } from './normalize-product-images';

async function fixture() {
  await mkdir('artifacts', { recursive: true });
  const root = await mkdtemp(path.resolve('artifacts/image-test-'));
  const inputDir = path.join(root, 'original'), outputDir = path.join(root, 'normalized');
  await mkdir(inputDir);
  return { inputDir, outputDir, log: () => {} };
}

async function phone(width: number, height: number, left: number, top: number, w: number, h: number, background = '#00000000') {
  const device = await sharp({ create: { width: w, height: h, channels: 4, background: '#28466aff' } }).png().toBuffer();
  return sharp({ create: { width, height, channels: 4, background } }).composite([{ input: device, left, top }]).png().toBuffer();
}

async function bounds(file: string) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 1200); assert.equal(info.height, 1200);
  assert.equal(data[3], 0);
  return alphaBounds(data, info.width, info.height);
}

test('normalizes padding and source resolution with a common model scale; preserves originals', async () => {
  const options = await fixture();
  const inputs = {
    'iphone-17-pro-max-silver.png': await phone(300, 500, 60, 40, 120, 300),
    'iphone-17-pro-max-blue.png': await phone(500, 700, 130, 90, 240, 600),
    'iphone-17-pro-max-orange.png': await phone(400, 600, 140, 150, 120, 300),
  };
  for (const [name, data] of Object.entries(inputs)) await writeFile(path.join(options.inputDir, name), data);
  const report = await normalizeDirectory(options);
  assert.equal(report.results.length, 3); assert.deepEqual(report.errors, []);
  assert.equal(new Set(report.results.map(result => result.groupScale)).size, 1);
  for (const result of report.results) {
    assert.deepEqual(result.rendered, { width: 384, height: 960 });
    assert.deepEqual(await bounds(path.join(options.outputDir, result.output)), { left: 408, top: 120, width: 384, height: 960 });
    const hash = (buffer: Buffer) => createHash('sha256').update(buffer).digest('hex');
    assert.equal(hash(await readFile(path.join(options.inputDir, result.file))), hash(inputs[result.file as keyof typeof inputs]));
  }
  const first = await readFile(path.join(options.outputDir, report.results[0].output));
  assert.deepEqual((await normalizeDirectory(options)).errors, []);
  assert.deepEqual(await readFile(path.join(options.outputDir, report.results[0].output)), first);
});

test('wide variants constrain the entire group without cropping or distortion', async () => {
  const options = await fixture();
  await writeFile(path.join(options.inputDir, 'iphone-15-black.png'), await phone(300, 300, 40, 40, 100, 200));
  await writeFile(path.join(options.inputDir, 'iphone-15-blue.png'), await phone(500, 300, 20, 40, 400, 200));
  const report = await normalizeDirectory(options);
  assert.equal(report.results[0].rendered.height, 480);
  assert.equal(report.results[1].rendered.height, 480);
  assert.equal(report.results[1].rendered.width, 960);
  for (const result of report.results) assert.equal(result.rendered.width / result.rendered.height, result.boundingBox.width / result.boundingBox.height);
});

test('corrupt, empty and colliding inputs do not prevent other files from processing', async () => {
  const options = await fixture();
  await writeFile(path.join(options.inputDir, 'broken.png'), 'invalid');
  await writeFile(path.join(options.inputDir, 'empty.png'), await sharp({ create: { width: 10, height: 10, channels: 4, background: '#00000000' } }).png().toBuffer());
  const valid = await phone(30, 50, 5, 5, 20, 40);
  await writeFile(path.join(options.inputDir, 'valid.png'), valid);
  await writeFile(path.join(options.inputDir, 'duplicate.png'), valid);
  await writeFile(path.join(options.inputDir, 'duplicate.webp'), await sharp(valid).webp().toBuffer());
  const report = await normalizeDirectory(options);
  assert.equal(report.errors.length, 4);
  assert.equal(report.results.length, 1);
  assert.equal(report.results[0].output, 'valid.webp');
});

test('alpha bounds preserve faint pixels and edge-touching content', () => {
  const data = Buffer.alloc(6 * 6 * 4);
  data[3] = 1; data[(35 * 4) + 3] = 255;
  assert.deepEqual(alphaBounds(data, 6, 6), { left: 0, top: 0, width: 6, height: 6 });
});

test('white cleanup is opt-in and keeps enclosed white device detail', async () => {
  const options = await fixture();
  const white = await sharp({ create: { width: 40, height: 100, channels: 4, background: '#ffffffff' } }).png().toBuffer();
  const input = await sharp(await phone(200, 300, 50, 50, 100, 200, '#ffffffff'))
    .composite([{ input: white, left: 80, top: 100 }]).png().toBuffer();
  await writeFile(path.join(options.inputDir, 'white-phone.png'), input);
  const report = await normalizeDirectory({ ...options, rules: { 'white-phone.png': { background: 'white' } } });
  assert.deepEqual(report.results[0].boundingBox, { left: 50, top: 50, width: 100, height: 200 });
  const { data, info } = await sharp(path.join(options.outputDir, 'white-phone.webp')).raw().toBuffer({ resolveWithObject: true });
  assert.equal(data[(600 * info.width + 600) * 4 + 3], 255);
  const unchanged = await normalizeDirectory(options);
  assert.deepEqual(unchanged.results[0].boundingBox, { left: 0, top: 0, width: 200, height: 300 });
});

test('rejects output folders that overlap originals', async () => {
  const options = await fixture();
  await assert.rejects(normalizeDirectory({ ...options, outputDir: options.inputDir }), /separadas/);
  await assert.rejects(normalizeDirectory({ ...options, outputDir: path.join(options.inputDir, 'output') }), /separadas/);
});

test('removes detached pale JPG frame lines without cutting the device', async () => {
  const options = await fixture();
  const line = await sharp({ create: { width: 200, height: 2, channels: 4, background: '#e8e8e8ff' } }).png().toBuffer();
  const input = await sharp(await phone(200, 300, 50, 10, 100, 280, '#ffffffff'))
    .composite([{ input: line, left: 0, top: 0 }]).png().toBuffer();
  await writeFile(path.join(options.inputDir, 'frame.png'), input);
  const report = await normalizeDirectory({ ...options, rules: { 'frame.png': { background: 'white' } } });
  assert.deepEqual(report.results[0].boundingBox, { left: 50, top: 10, width: 100, height: 280 });
});

test('detects off-white backgrounds and ignores detached labels; keeps both phone views', async () => {
  const options = await fixture();
  const view = await sharp({ create: { width: 40, height: 120, channels: 4, background: '#224455ff' } }).png().toBuffer();
  const label = await sharp({ create: { width: 70, height: 3, channels: 4, background: '#000000ff' } }).png().toBuffer();
  const input = await sharp({ create: { width: 200, height: 200, channels: 4, background: '#f5f5f7' } })
    .composite([{ input: view, left: 50, top: 30 }, { input: view, left: 100, top: 30 }, { input: label, left: 65, top: 180 }]).png().toBuffer();
  await writeFile(path.join(options.inputDir, 'studio.png'), input);
  const report = await normalizeDirectory({ ...options, rules: { 'studio.png': { background: 'white' } } });
  assert.deepEqual(report.results[0].boundingBox, { left: 50, top: 30, width: 90, height: 120 });
  assert.equal(report.results[0].rendered.height, 960);
});
