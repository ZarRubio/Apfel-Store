import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { products } from '../src/data/products';
import { getWhatsAppUrl } from '../src/lib/whatsapp';

const newModels = products.filter((product) => product.series === '18');

async function alphaBounds(file: string) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let left = info.width;
  let top = info.height;
  let right = 0;
  let bottom = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * info.channels + 3] < 10) continue;
    left = Math.min(left, x); top = Math.min(top, y); right = Math.max(right, x); bottom = Math.max(bottom, y);
  }
  return { left, top, right, bottom };
}

test('la serie 18 ofrece las variantes anunciadas sin inventar precios', () => {
  assert.deepEqual(newModels.map((product) => product.slug), ['iphone-18-pro-max', 'iphone-18-pro']);
  for (const product of newModels) {
    assert.equal(product.price, null);
    assert.equal(product.reservationOnly, true);
    assert.deepEqual(product.colors.map((color) => color.name), ['Negro', 'Plateado', 'Glaciar', 'Borgoña']);
    assert.deepEqual(product.storage.map((item) => item.capacity), ['256 GB', '512 GB', '1 TB', '2 TB']);
    assert.ok(product.storage.every((item) => item.price === null));
  }
});

test('las ilustraciones tienen canvas transparente y escala idéntica entre colores', async () => {
  for (const product of newModels) {
    const bounds = [];
    for (const color of product.colors) {
      const file = path.join(process.cwd(), 'public', color.image.replace(/^\//, ''));
      await access(file);
      const metadata = await sharp(file).metadata();
      assert.equal(metadata.width, 1200);
      assert.equal(metadata.height, 1200);
      assert.equal(metadata.hasAlpha, true);
      bounds.push(await alphaBounds(file));
    }
    assert.ok(bounds.every((box) => JSON.stringify(box) === JSON.stringify(bounds[0])));
  }
});

test('la solicitud incluye modelo, capacidad y color sin afirmar una reserva confirmada', () => {
  const url = new URL(getWhatsAppUrl(newModels[0], '1 TB', 'Borgoña'));
  const message = url.searchParams.get('text') ?? '';
  assert.match(message, /iPhone 18 Pro Max/);
  assert.match(message, /1 TB/);
  assert.match(message, /Borgoña/);
  assert.match(message, /no confirma la reserva/);
  assert.doesNotMatch(message, /Precio de referencia/);
});
