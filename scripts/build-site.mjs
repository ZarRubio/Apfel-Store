import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const result = spawnSync(process.execPath, [require.resolve('next/dist/bin/next'), 'build'], {
  stdio: 'inherit',
  env: { ...process.env, SITES_EXPORT: '1' },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const output = path.resolve('out');
const privateAssetPrefixes = ['/products/original/', '/images/catalog/'];
function assertNoPrivateAssetReferences(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) assertNoPrivateAssetReferences(file);
    else if (/\.html$/i.test(entry.name)) {
      const contents = readFileSync(file, 'utf8');
      const prefix = privateAssetPrefixes.find(value => new RegExp(`(?:src|srcset)="[^"]*${value.replaceAll('/', '\\/')}`).test(contents));
      if (prefix) throw new Error(`El export todavía referencia recursos privados (${prefix}) desde ${file}`);
    }
  }
}

assertNoPrivateAssetReferences(output);
for (const relative of ['products/original', 'images/catalog']) {
  const target = path.join(output, relative);
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
}
rmSync(path.join(output, 'products/normalized/report.json'), { force: true });
console.log('Export limpio: solo se publican recursos utilizados por la tienda.');
