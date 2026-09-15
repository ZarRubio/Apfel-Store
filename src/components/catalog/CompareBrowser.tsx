'use client';

import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { replaceLocationSearch, useLocationSearch } from '@/lib/useLocationSearch';

function specification(product: Product, label: string) {
  return product.specifications?.find(item => item.label.toLocaleLowerCase('es').startsWith(label))?.value ?? 'Consultar';
}

export function CompareBrowser({ products }: { products: Product[] }) {
  const search = useLocationSearch();
  const params = new URLSearchParams(search);
  const requested = (params.get('modelos') ?? '').split(',');
  const first = products.find(product => product.slug === requested[0]) ?? products[0];
  const second = products.find(product => product.slug === requested[1] && product.slug !== first.slug) ?? products.find(product => product.slug !== first.slug)!;

  function select(index: number, slug: string) {
    const values = [first.slug, second.slug];
    values[index] = slug;
    if (values[0] === values[1]) values[index === 0 ? 1 : 0] = products.find(product => product.slug !== slug)!.slug;
    const next = new URLSearchParams(params.toString());
    next.set('modelos', values.join(','));
    replaceLocationSearch(next);
  }

  const rows = [
    ['Precio', (product: Product) => product.price === null ? 'Por confirmar' : `Desde ${formatPrice(product.price)}`],
    ['Pantalla', (product: Product) => specification(product, 'pantalla')],
    ['Procesador', (product: Product) => specification(product, 'procesador')],
    ['Cámara', (product: Product) => specification(product, 'cámara')],
    ['Capacidades', (product: Product) => product.storage.map(item => item.capacity).join(', ')],
    ['Colores', (product: Product) => product.colors.map(color => color.name).join(', ')],
    ['Disponibilidad', (product: Product) => product.available === true ? 'Disponible para coordinar' : product.available === false ? 'No disponible' : 'Por confirmar'],
  ] as const;

  return <div className="compare-browser">
    <div className="compare-selectors">
      {[first, second].map((product, index) => <label key={index}>Modelo {index + 1}<select value={product.slug} onChange={event => select(index, event.target.value)}>{products.map(option => <option key={option.slug} value={option.slug}>{option.name}</option>)}</select></label>)}
    </div>
    <div className="compare-table-wrap">
      <table className="compare-table">
        <caption className="sr-only">Comparación entre {first.name} y {second.name}</caption>
        <thead><tr><th scope="col">Característica</th><th scope="col">{first.name}</th><th scope="col">{second.name}</th></tr></thead>
        <tbody>{rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value(first)}</td><td>{value(second)}</td></tr>)}</tbody>
      </table>
    </div>
  </div>;
}
