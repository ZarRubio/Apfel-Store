'use client';

import { useSearchParams } from 'next/navigation';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';

export function CatalogBrowser({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const seriesOptions = [...new Set(products.map((product) => product.series))].sort((a, b) => Number(b) - Number(a));
  const hasKnownAvailability = products.some((product) => product.available !== null);
  const series = seriesOptions.includes(params.get('serie') ?? '') ? params.get('serie')! : 'all';
  const availability = hasKnownAvailability && ['available', 'unavailable'].includes(params.get('disponibilidad') ?? '') ? params.get('disponibilidad')! : 'all';
  const offer = params.get('ofertas') === '1';
  const sort = ['low', 'high', 'new'].includes(params.get('orden') ?? '') ? params.get('orden')! : 'recommended';
  const activeFilters = Number(series !== 'all') + Number(availability !== 'all') + Number(offer);
  const filtered = products.filter((product) =>
    (series === 'all' || product.series === series) &&
    (availability === 'all' || (availability === 'available' ? product.available === true : product.available === false)) &&
    (!offer || (product.offer && product.previousPrice && product.price !== null && product.previousPrice > product.price))
  ).sort((a, b) => {
    if (sort === 'low' || sort === 'high') {
      if (a.price === null) return b.price === null ? 0 : 1;
      if (b.price === null) return -1;
      return sort === 'low' ? a.price - b.price : b.price - a.price;
    }
    if (sort === 'new') return Number(b.series) - Number(a.series);
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });

  function updateFilter(name: string, value: string) {
    const url = new URL(window.location.href);
    if (value === 'all' || value === 'recommended' || value === '') url.searchParams.delete(name);
    else url.searchParams.set(name, value);
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  function clearFilters() {
    const url = new URL(window.location.href);
    ['serie', 'disponibilidad', 'ofertas'].forEach((key) => url.searchParams.delete(key));
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  return <div>
    <div className="catalog-controls">
      <div className={hasKnownAvailability ? 'filter-group' : 'filter-group filters-unverified'}>
        <label>Serie<select name="serie" value={series} onChange={(event) => updateFilter('serie', event.target.value)}><option value="all">Todas las series</option>{seriesOptions.map((value) => <option key={value} value={value}>iPhone {value}</option>)}</select></label>
        {hasKnownAvailability && <label>Disponibilidad<select name="disponibilidad" value={availability} onChange={(event) => updateFilter('disponibilidad', event.target.value)}><option value="all">Todos los modelos</option><option value="available">Disponible</option><option value="unavailable">Agotado</option></select></label>}
        <label>Ordenar por<select name="orden" value={sort} onChange={(event) => updateFilter('orden', event.target.value)}><option value="recommended">Recomendados</option><option value="low">Menor precio</option><option value="high">Mayor precio</option><option value="new">Más recientes</option></select></label>
        <label className="check-filter"><input name="ofertas" type="checkbox" checked={offer} onChange={(event) => updateFilter('ofertas', event.target.checked ? '1' : '')} /> Solo ofertas</label>
      </div>
    </div>
    <div className="catalog-toolbar">
      <p className="result-count" role="status" aria-atomic="true"><strong>{filtered.length}</strong> {filtered.length === 1 ? 'modelo' : 'modelos'}{activeFilters > 0 ? ` de ${products.length}` : ' para elegir'}</p>
      {activeFilters > 0 && <button className="clear-filters" type="button" onClick={clearFilters}>Limpiar filtros ({activeFilters}) <span aria-hidden="true">×</span></button>}
    </div>
    {filtered.length > 0 ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span className="eyebrow">PRUEBA OTRA COMBINACIÓN</span><h2>No hay modelos con estos filtros.</h2><p>Prueba con otra serie o elimina los filtros para ver toda la colección.</p><button className="button button-dark" type="button" onClick={clearFilters}>Ver todos los modelos <span aria-hidden="true">↗</span></button></div>}
  </div>;
}
