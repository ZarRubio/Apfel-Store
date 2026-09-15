'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function OffersBrowser({ products }: { products: Product[] }) {
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

  const availableSeries = ['all', ...new Set(products.map((p) => p.series))];

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

  return (
    <div className="offers-page-content">
      {/* Animated Hero Banner */}
      <motion.div
        className="offers-hero-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="offers-hero-glow" aria-hidden="true" />
        <div className="offers-hero-content">
          <div className="offers-hero-badge">
            <span className="spark">⚡</span> Oportunidades Especiales · Stock Limitado
          </div>
          <h1>
            Tu próximo iPhone con descuento real.
            <em>Hasta S/ {maxSavings} de ahorro directo.</em>
          </h1>
          <p className="offers-hero-lead">
            Equipos seleccionados con rebajas exclusivas por tiempo limitado. Todos incluyen garantía completa, accesorios y coordinación directa por WhatsApp.
          </p>
          <div className="offers-perks-row">
            <div className="offers-perk-item">
              <div className="offers-perk-icon" aria-hidden="true">🛡️</div>
              <div className="offers-perk-text">
                <strong>Garantía Total</strong>
                <span>Respaldo y soporte de Apfel</span>
              </div>
            </div>
            <div className="offers-perk-item">
              <div className="offers-perk-icon" aria-hidden="true">⚡</div>
              <div className="offers-perk-text">
                <strong>Entrega Inmediata</strong>
                <span>Lima en horas y provincias seguro</span>
              </div>
            </div>
            <div className="offers-perk-item">
              <div className="offers-perk-icon" aria-hidden="true">💬</div>
              <div className="offers-perk-text">
                <strong>Atención 1 a 1</strong>
                <span>Fotos y videos del equipo exacto</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="offers-filter-bar">
        <div className="offers-tab-group" role="tablist" aria-label="Filtrar por serie">
          {availableSeries.map((series) => {
            const count = series === 'all' ? products.length : products.filter((p) => p.series === series).length;
            const label = series === 'all' ? 'Todas las ofertas' : `Serie ${series}`;
            const isActive = selectedSeries === series;
            return (
              <button
                key={series}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`offers-tab-button ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedSeries(series)}
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
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSeries}
          className="product-grid"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* WhatsApp Help Band */}
      <motion.div
        className="contact-band"
        style={{ marginTop: '70px', borderRadius: '16px' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div>
          <span className="eyebrow">¿BUSCAS OTRO MODELO O COLOR?</span>
          <h2>Consúltanos por WhatsApp.</h2>
          <p>Podemos verificar disponibilidad de otras capacidades, colores o cotizarte un modelo a pedido.</p>
        </div>
        <a
          className="button button-light"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          data-event="whatsapp_click"
        >
          Conversar con un asesor <span>↗</span>
        </a>
      </motion.div>
    </div>
  );
}

