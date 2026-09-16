'use client';

import { useEffect, useMemo } from 'react';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { replaceLocationSearch, useLocationSearch } from '@/lib/useLocationSearch';
import { CompareDeviceCard } from './compare/CompareDeviceCard';
import { CompareHighlights } from './compare/CompareHighlights';
import { CompareSpecTables } from './compare/CompareSpecTables';
import { CompareToolbar } from './compare/CompareToolbar';
import { SPEC_GROUPS, rowHasDifference } from './compare/compareData';
import type { CompareProduct } from './compare/types';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const MAX_PRODUCTS = 3;
const MIN_PRODUCTS = 2;

function getDefaultSlugs(products: CompareProduct[]): string[] {
  return products.slice(0, MIN_PRODUCTS).map((product) => product.slug);
}

function sanitizeSlugs(value: string | null, products: CompareProduct[]): string[] {
  const validSlugs = new Set(products.map((product) => product.slug));
  const requested = [...new Set((value ?? '').split(',').filter((slug) => validSlugs.has(slug)))].slice(0, MAX_PRODUCTS);
  return requested.length >= MIN_PRODUCTS ? requested : getDefaultSlugs(products);
}

function getSelectedColors(value: string | null, products: CompareProduct[]): string[] {
  const requested = (value ?? '').split('|');
  return products.map((product, index) => {
    const candidate = requested[index];
    return product.colors.some((color) => color.name === candidate)
      ? candidate
      : product.defaultColor ?? product.colors[0]?.name ?? '';
  });
}

export function CompareBrowser({ products }: { products: CompareProduct[] }) {
  const search = useLocationSearch();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const selectedSlugs = useMemo(() => sanitizeSlugs(params.get('modelos'), products), [params, products]);
  const selectedProducts = useMemo(
    () => selectedSlugs.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is CompareProduct => Boolean(product)),
    [products, selectedSlugs],
  );
  const selectedColors = useMemo(
    () => getSelectedColors(params.get('colores'), selectedProducts),
    [params, selectedProducts],
  );
  const onlyDifferences = params.get('diferencias') === '1';

  useEffect(() => {
    const requested = params.get('modelos');
    const canonical = selectedSlugs.join(',');
    if (requested && requested !== canonical) {
      const nextParams = new URLSearchParams(params.toString());
      nextParams.set('modelos', canonical);
      nextParams.delete('colores');
      replaceLocationSearch(nextParams);
    }
  }, [params, selectedSlugs]);

  const groupedProducts = useMemo(() => [...new Set(products.map((product) => product.series))]
    .sort((a, b) => Number(b) - Number(a))
    .map((series) => ({ series, items: products.filter((product) => product.series === series) })), [products]);

  const differenceCount = useMemo(() => SPEC_GROUPS.reduce(
    (total, group) => total + group.rows.filter((row) => rowHasDifference(row, selectedProducts)).length,
    0,
  ), [selectedProducts]);

  function updateUrl(slugs: string[], colors: string[] = []) {
    const nextParams = new URLSearchParams(params.toString());
    nextParams.set('modelos', slugs.join(','));
    if (colors.some(Boolean)) nextParams.set('colores', colors.join('|'));
    else nextParams.delete('colores');
    replaceLocationSearch(nextParams);
  }

  function updateModel(index: number, slug: string) {
    if (selectedSlugs.some((selectedSlug, selectedIndex) => selectedSlug === slug && selectedIndex !== index)) return;
    const nextSlugs = [...selectedSlugs];
    const nextColors = [...selectedColors];
    nextSlugs[index] = slug;
    nextColors[index] = '';
    updateUrl(nextSlugs, nextColors);
  }

  function updateColor(index: number, color: string) {
    const nextColors = [...selectedColors];
    nextColors[index] = color;
    updateUrl(selectedSlugs, nextColors);
  }

  function applyPreset(slugs: string[]) {
    updateUrl(sanitizeSlugs(slugs.join(','), products));
  }

  function setSlotCount(count: 2 | 3) {
    if (count === selectedSlugs.length) return;
    if (count === 2) {
      updateUrl(selectedSlugs.slice(0, 2), selectedColors.slice(0, 2));
      return;
    }
    const candidate = products.find((product) => !selectedSlugs.includes(product.slug));
    if (candidate) updateUrl([...selectedSlugs, candidate.slug], [...selectedColors, '']);
  }

  function removeProduct(index: number) {
    if (selectedSlugs.length <= MIN_PRODUCTS) return;
    updateUrl(
      selectedSlugs.filter((_, itemIndex) => itemIndex !== index),
      selectedColors.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function setOnlyDifferences(checked: boolean) {
    const nextParams = new URLSearchParams(params.toString());
    if (checked) nextParams.set('diferencias', '1');
    else nextParams.delete('diferencias');
    replaceLocationSearch(nextParams);
  }

  return <div className="compare-page-wrap">
    <header className="compare-header-enhanced">
      <span className="eyebrow">COMPARADOR APFEL STORE</span>
      <h1>
        Compara modelos de iPhone.
        <em>Elige usando los datos disponibles de cada equipo.</em>
      </h1>
      <p>Revisa pantalla, procesador, cámaras, capacidad y precio. Los campos pendientes se identifican claramente para que puedas confirmarlos con un asesor.</p>
    </header>

    <CompareToolbar
      selectedSlugs={selectedSlugs}
      onlyDifferences={onlyDifferences}
      differenceCount={differenceCount}
      onPreset={applyPreset}
      onSlotCountChange={setSlotCount}
      onDifferencesChange={setOnlyDifferences}
    />

    <div className={`compare-devices-grid cols-${selectedProducts.length}`}>
      {selectedProducts.map((product, index) => <CompareDeviceCard
        key={product.slug}
        product={product}
        index={index}
        activeColorName={selectedColors[index]}
        groups={groupedProducts}
        canRemove={selectedProducts.length > MIN_PRODUCTS}
        selectedSlugs={selectedSlugs}
        onModelChange={updateModel}
        onColorChange={updateColor}
        onRemove={removeProduct}
      />)}
    </div>

    <CompareHighlights products={selectedProducts} />
    <CompareSpecTables products={selectedProducts} onlyDifferences={onlyDifferences} />

    <aside className="compare-advisor-card">
      <div className="compare-advisor-text">
        <span className="eyebrow">ASESORÍA DIRECTA APFEL STORE</span>
        <h2>¿Necesitas confirmar algún detalle?</h2>
        <p>Consulta disponibilidad, condición, garantía, precio final y entrega del modelo que te interesa antes de reservar.</p>
      </div>
      <a className="compare-advisor-btn" href={getWhatsAppUrl()} target="_blank" rel="noreferrer" data-event="whatsapp_compare_advisor">
        <WhatsAppIcon /> Consultar por WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </aside>
  </div>;
}
