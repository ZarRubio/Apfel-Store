import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {products,whatsappUrl,STORE} from '../dist/scripts/catalog.js';
const root=fileURLToPath(new URL('../',import.meta.url));
// location is the only browser value needed by the quote builder.
globalThis.location={origin:'https://preview.example'};
assert.equal(new Set(products.map(p=>p.id)).size,products.length,'Product IDs must be unique');
for(const product of products){
  assert.ok(existsSync(`${root}dist/producto/${product.id}/index.html`),`Missing route for ${product.id}`);
  assert.ok(product.capacities.length>0&&product.colors.length>0,'Product must be configurable');
  for(const [capacityIndex,capacity] of product.capacities.entries()){
    assert.ok(Number.isFinite(capacity.price)&&capacity.price>0,'Invalid price');
    for(const [colorIndex,color] of product.colors.entries()){
      assert.ok(existsSync(`${root}dist/assets/${color.image}`),`Missing ${color.image}`);
      const url=new URL(whatsappUrl(product,capacityIndex,colorIndex));
      const text=url.searchParams.get('text');
      assert.equal(url.hostname,'wa.me');
      assert.equal(url.pathname,`/${STORE.whatsapp}`);
      for(const value of [product.name,color.name,capacity.label,product.condition])assert.ok(text.includes(value),`Quote lost ${value}`);
      assert.ok(text.includes(`capacidad=${capacityIndex}`)&&text.includes(`color=${colorIndex}`),'Shared quote must preserve options');
    }
  }
}
const product=products[0];
assert.notEqual(whatsappUrl(product,0,0),whatsappUrl(product,1,1),'Changing variants must change quote');
assert.ok(existsSync(`${root}dist/catalogo/index.html`),'Missing catalog route');
for(const file of ['index.html','catalogo/index.html',...products.map(p=>`producto/${p.id}/index.html`)]){
  const html=readFileSync(`${root}dist/${file}`,'utf8');
  for(const ref of html.matchAll(/(?:src|href)="(\/[^"?#]+\.[a-z0-9]+)"/g))assert.ok(existsSync(`${root}dist${ref[1]}`),`Missing local asset ${ref[1]}`);
}
console.log(`OK: ${products.length} product routes, all variants, local assets and WhatsApp configuration.`);
