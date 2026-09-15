'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { getProductImage } from '@/lib/productImage';
import { replaceLocationSearch, useLocationSearch } from '@/lib/useLocationSearch';

interface SpecRowDef {
  id: string;
  label: string;
  tooltip?: string;
  getValue: (p: Product) => string;
}

interface SpecGroupDef {
  category: string;
  icon: string;
  rows: SpecRowDef[];
}

// Preset shortcuts
const PRESETS = [
  { label: '18 Pro Max vs 17 Pro Max', slugs: ['iphone-18-pro-max', 'iphone-17-pro-max'] },
  { label: '17 Pro vs 16 Pro', slugs: ['iphone-17-pro', 'iphone-16-pro'] },
  { label: '16 Pro vs iPhone 16', slugs: ['iphone-16-pro', 'iphone-16'] },
  { label: '16 vs 15', slugs: ['iphone-16', 'iphone-15'] },
  { label: '18 Pro Max vs 16 Pro Max vs 15 Pro Max', slugs: ['iphone-18-pro-max', 'iphone-16-pro-max', 'iphone-15-pro-max'] },
];

function extractSpec(product: Product, keyword: string): string {
  const spec = product.specifications?.find(s => s.label.toLowerCase().includes(keyword.toLowerCase()));
  return spec?.value ?? 'Consultar';
}

function getScreenSize(product: Product): string {
  const spec = extractSpec(product, 'pantalla');
  const match = spec.match(/(\d+(\.\d+)?)\s*pulgadas/i);
  return match ? `${match[1]}"` : '6.1"';
}

function getRefreshRate(product: Product): string {
  const spec = extractSpec(product, 'pantalla');
  return spec.includes('120Hz')
    ? 'ProMotion 120Hz (fluidez adaptativa)'
    : '60Hz estándar';
}

function getFrontDesign(product: Product): string {
  const s = Number(product.series);
  if (s >= 15 || product.slug.includes('14-pro')) {
    return 'Dynamic Island interactiva';
  }
  return 'Notch clásico';
}

function getPortType(product: Product): string {
  const s = Number(product.series);
  if (s >= 15) {
    const isPro = product.slug.includes('pro');
    return isPro ? 'USB-C (transferencia Pro de alta velocidad)' : 'USB-C estándar';
  }
  return 'Conector Lightning';
}

function getMaterial(product: Product): string {
  const isPro = product.slug.includes('pro');
  const s = Number(product.series);
  if (isPro && s >= 15) return 'Titanio de grado aeroespacial';
  if (isPro && s < 15) return 'Acero inoxidable de calidad quirúrgica';
  return 'Aluminio de calidad aeroespacial';
}

function getCameraZoom(product: Product): string {
  const spec = extractSpec(product, 'cámara');
  if (spec.includes('5x')) return 'Zoom óptico 5x';
  if (spec.includes('3x')) return 'Zoom óptico 3x';
  if (spec.includes('2.5x')) return 'Zoom óptico 2.5x';
  if (spec.includes('2x')) return 'Zoom óptico 2x';
  if (product.slug.includes('pro')) return 'Zoom óptico avanzado';
  return 'Zoom óptico 2x';
}

function getLidar(product: Product): string {
  const spec = extractSpec(product, 'cámara');
  return spec.toLowerCase().includes('lidar')
    ? 'Sí, escáner LiDAR integrado'
    : 'No incluye sensor LiDAR';
}

function getAppleIntelligence(product: Product): string {
  const s = Number(product.series);
  if (s >= 16 || product.slug.includes('15-pro')) {
    return 'Compatible con Apple Intelligence';
  }
  return 'No compatible';
}

function rowHasDifference(row: SpecRowDef, items: Product[]): boolean {
  if (items.length < 2) return false;
  const firstVal = row.getValue(items[0]);
  return items.some(p => row.getValue(p) !== firstVal);
}

export function CompareBrowser({ products }: { products: Product[] }) {
  const search = useLocationSearch();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  // Derived selected slugs directly from URL state
  const selectedSlugs = useMemo(() => {
    const requested = (params.get('modelos') ?? '').split(',').filter(Boolean);
    const valid = requested.filter(slug => products.some(p => p.slug === slug));
    if (valid.length >= 2) return valid;
    return [products[0]?.slug, products[1]?.slug].filter(Boolean);
  }, [params, products]);

  // Selected color overrides per column index
  const [activeColors, setActiveColors] = useState<Record<number, string>>({});

  // Differences only switch
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  const selectedProducts = useMemo(() => {
    return selectedSlugs
      .map(slug => products.find(p => p.slug === slug))
      .filter((p): p is Product => Boolean(p));
  }, [selectedSlugs, products]);

  function updateSlot(index: number, newSlug: string) {
    const next = [...selectedSlugs];
    next[index] = newSlug;
    setActiveColors(prev => ({ ...prev, [index]: '' }));

    const nextParams = new URLSearchParams(params.toString());
    nextParams.set('modelos', next.join(','));
    replaceLocationSearch(nextParams);
  }

  function applyPreset(slugs: string[]) {
    setActiveColors({});
    const nextParams = new URLSearchParams(params.toString());
    nextParams.set('modelos', slugs.join(','));
    replaceLocationSearch(nextParams);
  }

  function toggleThirdSlot() {
    if (selectedSlugs.length === 2) {
      // Add a 3rd model not already selected
      const candidate = products.find(p => !selectedSlugs.includes(p.slug)) ?? products[2] ?? products[0];
      const next = [...selectedSlugs, candidate.slug];
      const nextParams = new URLSearchParams(params.toString());
      nextParams.set('modelos', next.join(','));
      replaceLocationSearch(nextParams);
    } else {
      // Remove 3rd model
      const next = selectedSlugs.slice(0, 2);
      const nextParams = new URLSearchParams(params.toString());
      nextParams.set('modelos', next.join(','));
      replaceLocationSearch(nextParams);
    }
  }

  function removeSlot(indexToRemove: number) {
    if (selectedSlugs.length <= 2) return;
    const next = selectedSlugs.filter((_, i) => i !== indexToRemove);
    const nextParams = new URLSearchParams(params.toString());
    nextParams.set('modelos', next.join(','));
    replaceLocationSearch(nextParams);
  }

  // Spec groups definition
  const specGroups: SpecGroupDef[] = useMemo(() => [
    {
      category: 'Pantalla y Visualización',
      icon: '📱',
      rows: [
        { id: 'screen-size', label: 'Tamaño de pantalla', getValue: (p) => getScreenSize(p) },
        { id: 'screen-tech', label: 'Panel y Tecnología', getValue: (p) => extractSpec(p, 'pantalla') },
        { id: 'refresh-rate', label: 'Tasa de refresco', getValue: (p) => getRefreshRate(p) },
        { id: 'front-cutout', label: 'Diseño frontal', getValue: (p) => getFrontDesign(p) },
        { id: 'material', label: 'Material del marco', getValue: (p) => getMaterial(p) },
      ],
    },
    {
      category: 'Rendimiento y Potencia',
      icon: '⚡',
      rows: [
        { id: 'processor', label: 'Procesador / Chip', getValue: (p) => extractSpec(p, 'procesador') },
        { id: 'apple-intelligence', label: 'Apple Intelligence', getValue: (p) => getAppleIntelligence(p) },
      ],
    },
    {
      category: 'Sistema de Cámaras y Zoom',
      icon: '📸',
      rows: [
        { id: 'camera-system', label: 'Configuración de cámaras', getValue: (p) => extractSpec(p, 'cámara') },
        { id: 'camera-zoom', label: 'Zoom óptico teleobjetivo', getValue: (p) => getCameraZoom(p) },
        { id: 'lidar', label: 'Escáner LiDAR nocturno', getValue: (p) => getLidar(p) },
      ],
    },
    {
      category: 'Batería y Conectividad',
      icon: '🔋',
      rows: [
        { id: 'battery', label: 'Capacidad de batería', getValue: (p) => extractSpec(p, 'batería') },
        { id: 'port', label: 'Puerto de carga', getValue: (p) => getPortType(p) },
        { id: 'network', label: 'Red móvil', getValue: (p) => extractSpec(p, 'conectividad') },
      ],
    },
    {
      category: 'Almacenamiento y Acabados',
      icon: '💾',
      rows: [
        { id: 'storage', label: 'Capacidades disponibles', getValue: (p) => p.storage.map(s => s.capacity).join(', ') },
        { id: 'colors-count', label: 'Gama de colores', getValue: (p) => `${p.colors.length} colores (${p.colors.map(c => c.name).join(', ')})` },
      ],
    },
    {
      category: 'Precios y Disponibilidad',
      icon: '🏷️',
      rows: [
        {
          id: 'price-status',
          label: 'Inversión de referencia',
          getValue: (p) => p.price === null ? 'Por confirmar (Reserva)' : p.offer && p.previousPrice ? `Precio especial: ${formatPrice(p.price)} (Antes ${formatPrice(p.previousPrice)})` : `Desde ${formatPrice(p.price)}`
        },
        {
          id: 'delivery',
          label: 'Modalidad de compra',
          getValue: (p) => p.reservationOnly ? 'Reserva anticipada exclusiva' : p.offer ? 'Oferta especial con entrega inmediata' : 'Disponible para coordinar entrega'
        },
      ],
    },
  ], []);

  // Count total differences across all rows
  const diffCount = useMemo(() => {
    let count = 0;
    for (const group of specGroups) {
      for (const row of group.rows) {
        if (rowHasDifference(row, selectedProducts)) count++;
      }
    }
    return count;
  }, [specGroups, selectedProducts]);

  // Group products by series for select dropdown
  const groupedProducts = useMemo(() => {
    const seriesOrder = ['18', '17', '16', '15', '14', '13', '12', '11'];
    return seriesOrder.map(s => ({
      series: s,
      items: products.filter(p => p.series === s),
    })).filter(g => g.items.length > 0);
  }, [products]);

  const numCols = selectedProducts.length;

  return (
    <div className="compare-page-wrap">
      {/* Header with Title & Lead */}
      <div className="compare-header-enhanced">
        <span className="eyebrow">HERRAMIENTA OFICIAL DE COMPARACIÓN</span>
        <h1>
          Compara modelos de iPhone.
          <em>Encuentra el equipo exacto para tus necesidades.</em>
        </h1>
        <p>
          Analiza lado a lado las diferencias en pantalla, cámaras, potencia de chip, puertos USB-C y precios para tomar una decisión informada.
        </p>
      </div>

      {/* Quick Comparison Presets */}
      <div className="compare-presets-wrap">
        <span className="compare-presets-label">
          <span>⚡</span> Comparaciones populares:
        </span>
        {PRESETS.map((preset) => {
          const isActive = preset.slugs.length === selectedSlugs.length &&
            preset.slugs.every((s, i) => s === selectedSlugs[i]);
          return (
            <button
              key={preset.label}
              type="button"
              className={`compare-preset-pill ${isActive ? 'active' : ''}`}
              onClick={() => applyPreset(preset.slugs)}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Controls Toolbar: Slot Count & Differences Only Switch */}
      <div className="compare-toolbar">
        <div className="compare-slot-controls">
          <button
            type="button"
            className={`slot-toggle-button ${selectedSlugs.length === 2 ? 'active' : ''}`}
            onClick={() => selectedSlugs.length !== 2 && toggleThirdSlot()}
          >
            2 Modelos
          </button>
          <button
            type="button"
            className={`slot-toggle-button ${selectedSlugs.length === 3 ? 'active' : ''}`}
            onClick={() => selectedSlugs.length !== 3 && toggleThirdSlot()}
          >
            + 3 Modelos
          </button>
        </div>

        <div className="compare-diff-toggle-wrap">
          <label className="compare-toggle-label">
            <input
              type="checkbox"
              className="sr-only compare-toggle-input"
              checked={onlyDifferences}
              onChange={(e) => setOnlyDifferences(e.target.checked)}
            />
            <span className="compare-toggle-switch" aria-hidden="true" />
            <span>Solo mostrar diferencias</span>
          </label>
          <span className="compare-diff-count-badge">
            {diffCount} {diffCount === 1 ? 'diferencia detectada' : 'diferencias detectadas'}
          </span>
        </div>
      </div>

      {/* Top Device Showcase Cards */}
      <div className={`compare-devices-grid cols-${numCols}`}>
        {selectedProducts.map((product, colIndex) => {
          const activeColorName = activeColors[colIndex] ?? product.defaultColor ?? product.colors[0]?.name;
          const activeColorObj = product.colors.find(c => c.name === activeColorName) ?? product.colors[0];
          const displayImage = getProductImage(activeColorObj?.image ?? product.images[0]);

          const hasOffer = product.offer && product.price && product.previousPrice && product.previousPrice > product.price;
          const savings = hasOffer && product.price && product.previousPrice ? product.previousPrice - product.price : 0;

          return (
            <div key={`${product.id}-${colIndex}`} className="compare-device-card">
              {/* Select Dropdown */}
              <div className="compare-select-wrap">
                <label className="compare-select-label" htmlFor={`select-model-${colIndex}`}>
                  Modelo {colIndex + 1} {selectedSlugs.length === 3 && (
                    <button
                      type="button"
                      onClick={() => removeSlot(colIndex)}
                      style={{ float: 'right', background: 'none', border: 'none', color: '#86868b', cursor: 'pointer', fontSize: '0.75rem' }}
                      title="Quitar de la comparación"
                    >
                      ✕ Quitar
                    </button>
                  )}
                </label>
                <select
                  id={`select-model-${colIndex}`}
                  className="compare-select-element"
                  value={product.slug}
                  onChange={(e) => updateSlot(colIndex, e.target.value)}
                >
                  {groupedProducts.map((group) => (
                    <optgroup key={group.series} label={`Serie ${group.series}`}>
                      {group.items.map((opt) => (
                        <option key={opt.slug} value={opt.slug}>
                          {opt.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Visual Box with Active Color Photo */}
              <div className="compare-device-visual">
                <Image
                  src={displayImage}
                  alt={`${product.name} en color ${activeColorName}`}
                  width={220}
                  height={220}
                  priority={colIndex < 2}
                  style={{ width: 'auto', height: '85%', objectFit: 'contain' }}
                />
              </div>

              {/* Color Swatches Switcher */}
              <div className="compare-swatches-row" role="radiogroup" aria-label={`Colores de ${product.name}`}>
                {product.colors.map((color) => {
                  const isSelected = color.name === activeColorName;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`Ver en color ${color.name}`}
                      title={color.name}
                      className={`compare-swatch-dot ${isSelected ? 'active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setActiveColors(prev => ({ ...prev, [colIndex]: color.name }))}
                    />
                  );
                })}
              </div>
              <div className="compare-color-caption">
                {activeColorName}
              </div>

              {/* Name & Badge */}
              <div className="compare-card-title-wrap">
                {product.reservationOnly && <span className="compare-card-badge">Serie 18 · Solicita Reserva</span>}
                {hasOffer && <span className="compare-card-badge" style={{ color: '#ef4444' }}>⚡ Oferta Especial</span>}
                {!product.reservationOnly && !hasOffer && product.new && <span className="compare-card-badge">Novedad</span>}

                <h2 className="compare-card-title">{product.name}</h2>

                <div className="compare-card-price-row">
                  {product.price === null ? (
                    <span className="compare-card-price">Por confirmar</span>
                  ) : (
                    <>
                      <span className="compare-card-price">{formatPrice(product.price)}</span>
                      {product.previousPrice && (
                        <span className="compare-card-old-price">{formatPrice(product.previousPrice)}</span>
                      )}
                    </>
                  )}
                </div>

                {hasOffer && (
                  <div>
                    <span className="compare-card-savings">Ahorras {formatPrice(savings)}</span>
                  </div>
                )}
              </div>

              {/* Direct Actions */}
              <div className="compare-card-actions">
                <a
                  className="compare-btn-primary"
                  href={getWhatsAppUrl(product, undefined, activeColorName)}
                  target="_blank"
                  rel="noreferrer"
                  data-event="whatsapp_compare_click"
                >
                  <span>💬</span> {product.reservationOnly ? 'Consultar reserva' : 'Consultar por WhatsApp'}
                </a>
                <Link className="compare-btn-secondary" href={`/iphone/${product.slug}`}>
                  Ver ficha completa ↗
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Visual Highlights Cards */}
      <section className="compare-highlights-section" aria-labelledby="highlights-heading">
        <div className="compare-section-header">
          <h2 id="highlights-heading">
            <span className="compare-section-icon" aria-hidden="true">⚡</span>
            Resumen de Puntos Clave
          </h2>
        </div>
        <div className="compare-highlights-grid">
          <div className="compare-highlight-card">
            <span className="compare-highlight-icon" aria-hidden="true">📱</span>
            <span className="compare-highlight-label">Pantalla</span>
            <div className="compare-highlight-values">
              {selectedProducts.map((p) => (
                <div key={p.id} className="compare-highlight-val-item">
                  <small>{p.name}</small>
                  {getScreenSize(p)} · {p.specifications?.find(s => s.label.toLowerCase().includes('pantalla'))?.value.includes('120Hz') ? '120Hz ProMotion' : '60Hz'}
                </div>
              ))}
            </div>
          </div>

          <div className="compare-highlight-card">
            <span className="compare-highlight-icon" aria-hidden="true">🚀</span>
            <span className="compare-highlight-label">Procesador</span>
            <div className="compare-highlight-values">
              {selectedProducts.map((p) => (
                <div key={p.id} className="compare-highlight-val-item">
                  <small>{p.name}</small>
                  {extractSpec(p, 'procesador')}
                </div>
              ))}
            </div>
          </div>

          <div className="compare-highlight-card">
            <span className="compare-highlight-icon" aria-hidden="true">📸</span>
            <span className="compare-highlight-label">Zoom Óptico</span>
            <div className="compare-highlight-values">
              {selectedProducts.map((p) => (
                <div key={p.id} className="compare-highlight-val-item">
                  <small>{p.name}</small>
                  {getCameraZoom(p)}
                </div>
              ))}
            </div>
          </div>

          <div className="compare-highlight-card">
            <span className="compare-highlight-icon" aria-hidden="true">🔌</span>
            <span className="compare-highlight-label">Conexión</span>
            <div className="compare-highlight-values">
              {selectedProducts.map((p) => (
                <div key={p.id} className="compare-highlight-val-item">
                  <small>{p.name}</small>
                  {getPortType(p)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Technical Specifications Groups */}
      <section className="compare-specs-wrap" aria-label="Especificaciones detalladas">
        <div className="compare-section-header">
          <h2>
            <span className="compare-section-icon" aria-hidden="true">📑</span>
            Ficha Técnica Detallada
          </h2>
        </div>

        {specGroups.map((group) => {
          // Filter rows if "only differences" is checked
          const visibleRows = onlyDifferences
            ? group.rows.filter(row => rowHasDifference(row, selectedProducts))
            : group.rows;

          if (visibleRows.length === 0) return null;

          return (
            <div key={group.category} className="compare-spec-group">
              <div className="compare-group-title-bar">
                <h3>
                  <span aria-hidden="true">{group.icon}</span>
                  {group.category}
                </h3>
              </div>

              <div className="compare-table-wrap-outer">
                <table className="compare-table-detailed">
                  <caption className="sr-only">{group.category}</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '22%' }}>Característica</th>
                      {selectedProducts.map((p) => (
                        <th key={p.id} scope="col">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row) => {
                      const isDiff = rowHasDifference(row, selectedProducts);
                      return (
                        <tr key={row.id} className={isDiff ? 'is-different' : ''}>
                          <th scope="row">
                            <div>{row.label}</div>
                            {isDiff && <span className="compare-diff-tag">Difiere</span>}
                          </th>
                          {selectedProducts.map((p) => (
                            <td key={p.id}>
                              {row.getValue(p)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom Advisor Card */}
      <aside className="compare-advisor-card">
        <div className="compare-advisor-text">
          <span className="eyebrow">ASESORÍA DIRECTA APFEL STORE</span>
          <h2>¿Aún no estás seguro de cuál modelo elegir?</h2>
          <p>
            Te enviamos fotos en alta definición de los equipos reales, validamos el estado de batería y resolvemos cualquier duda técnica antes de tu compra.
          </p>
        </div>
        <a
          className="compare-advisor-btn"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          data-event="whatsapp_compare_advisor_click"
        >
          <span>💬</span> Hablar con un especialista ↗
        </a>
      </aside>
    </div>
  );
}
