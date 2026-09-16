import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { products } from '../src/data/products';
import { getWhatsAppUrl } from '../src/lib/whatsapp';
import { toQueryValue } from '../src/lib/queryValue';
import { getCardImage } from '../src/lib/productImage';

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
    assert.equal(product.defaultColor, 'Borgoña');
    assert.match(getCardImage(product), /borgona/);
    assert.deepEqual(product.colors.map((color) => color.name), ['Negro', 'Plateado', 'Glaciar', 'Borgoña']);
    assert.deepEqual(product.storage.map((item) => item.capacity), ['256 GB', '512 GB', '1 TB', '2 TB']);
    assert.ok(product.storage.every((item) => item.price === null));
  }
});

test('las fotografías tienen canvas transparente y escala idéntica entre colores', async () => {
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
    assert.ok(bounds.every((box) => box.top === bounds[0].top && box.bottom === bounds[0].bottom));
  }
});

test('las selecciones generan valores de URL legibles y estables', () => {
  assert.equal(toQueryValue('Borgoña'), 'borgona');
  assert.equal(toQueryValue('1 TB'), '1-tb');
});

test('WhatsApp conserva el mensaje UTF-8 exacto y lo codifica una sola vez', () => {
  const expected = '👋 Hola Apfel Store, me interesa este equipo.\n\n📱 Modelo: iPhone 18 Pro Max\n💾 Capacidad: 1 TB\n🎨 Color: Borgoña\n💰 Precio de referencia: Por confirmar\n\n✅ ¿Podrían confirmar precio final, disponibilidad, garantía y entrega?';
  const generated = getWhatsAppUrl({ product: newModels[0], capacity: '1 TB', color: 'Borgoña' });

  assert.equal(generated, `https://wa.me/51921078492?text=${encodeURIComponent(expected)}`);
  assert.equal(new URL(generated).searchParams.get('text'), expected);
  assert.match(generated, /%F0%9F%91%8B/);
  assert.doesNotMatch(generated, /%25F0%259F/);
});

test('WhatsApp preserva tildes, eñe, signos y saltos de línea en mensajes personalizados', () => {
  const expected = '👋 Atención en Perú y España.\n¿Podrían enviarme información?';
  const generated = getWhatsAppUrl({ message: expected });
  assert.equal(new URL(generated).searchParams.get('text'), expected);
});
