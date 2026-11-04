'use client';

import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { pushLocationSearch, replaceLocationSearch, useLocationSearch } from '@/lib/useLocationSearch';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { AdvisorCard } from '@/components/shared/AdvisorCard';
import { ShieldIcon, SparklesIcon, TruckIcon } from '@/components/icons/UiIcons';

export function OffersBrowser({ products }: { products: Product[] }) {
  const search = useLocationSearch();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const reduceMotion = useReducedMotion();
  const availableSeries = useMemo(() => ['all', ...new Set(products.map((product) => product.series))], [products]);
  const requestedSeries = params.get('serie') ?? 'all';
  const selectedSeries = availableSeries.includes(requestedSeries) ? requestedSeries : 'all';

  useEffect(() => {
    if (requestedSeries !== 'all' && !availableSeries.includes(requestedSeries)) {
      const nextParams = new URLSearchParams(params.toString());
      nextParams.delete('serie');
      replaceLocationSearch(nextParams);
    }
  }, [availableSeries, params, requestedSeries]);

  const filtered = selectedSeries === 'all'
    ? products
    : products.filter((p) => p.series === selectedSeries);

  const maxSavings = products.reduce((max, p) => {
    if (p.price && p.previousPrice) {
      const diff = p.previousPrice - p.price;
      return diff > max ? diff : max;
    }
    return max;
  }, 0);

  function selectSeries(series: string) {
    const nextParams = new URLSearchParams(params.toString());
    if (series === 'all') nextParams.delete('serie');
    else nextParams.set('serie', series);
    pushLocationSearch(nextParams);
  }

  return (
    <div className="offers-page-content">
      {/* Animated Hero Banner */}
      <motion.div
        className="offers-hero-banner"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="offers-hero-glow" aria-hidden="true" />
        <div className="offers-hero-content">
          <div className="offers-hero-badge">
            <span className="spark"><SparklesIcon /></span> Oportunidades especiales
          </div>
          <h1>
            Tu próximo iPhone con descuento real.
            <em>Hasta S/ {maxSavings} de ahorro directo.</em>
          </h1>
          <p className="offers-hero-lead">
            Descubre modelos seleccionados y consulta su disponibilidad y condiciones por WhatsApp.
          </p>
          <div className="offers-perks-row">
            <div className="offers-perk-item">
              <div className="offers-perk-icon"><ShieldIcon /></div>
              <div className="offers-perk-text">
                <strong>Garantía y condiciones</strong>
                <span>Consúltalas con un asesor</span>
              </div>
            </div>
            <div className="offers-perk-item">
              <div className="offers-perk-icon"><TruckIcon /></div>
              <div className="offers-perk-text">
                <strong>Entrega coordinada</strong>
                <span>Según ubicación y disponibilidad</span>
              </div>
            </div>
            <div className="offers-perk-item">
              <div className="offers-perk-icon" aria-hidden="true"><WhatsAppIcon /></div>
              <div className="offers-perk-text">
                <strong>Atención personalizada</strong>
                <span>Resuelve tus dudas por WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="offers-filter-bar">
        <div className="offers-tab-group" role="group" aria-label="Filtrar por serie">
          {availableSeries.map((series) => {
            const count = series === 'all' ? products.length : products.filter((p) => p.series === series).length;
            const label = series === 'all' ? 'Todas las ofertas' : `Serie ${series}`;
            const isActive = selectedSeries === series;
            return (
              <button
                key={series}
                type="button"
                aria-pressed={isActive}
                className={`offers-tab-button ${isActive ? 'active' : ''}`}
                onClick={() => selectSeries(series)}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
        <span className="offers-count-label">
          Mostrando <strong>{filtered.length}</strong> {filtered.length === 1 ? 'modelo en oferta' : 'modelos en oferta'}
        </span>
      </div>

      {/* Product Grid with AnimatePresence */}
      <AnimatePresence mode="wait" initial={!reduceMotion}>
        <motion.div
          key={selectedSeries}
          className="product-grid"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
        >
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* WhatsApp Help Band */}
      <motion.div
        className="advisor-spaced"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
        viewport={{ once: true }}
      >
        <AdvisorCard eyebrow="¿BUSCAS OTRO MODELO O COLOR?" title="Encontrémoslo juntos." description="Consulta por otras capacidades, colores o modelos disponibles." href={getWhatsAppUrl()} label="Conversar con un asesor" />
      </motion.div>
    </div>
  );
}
