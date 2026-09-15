'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import type { Product } from '@/types/product';
import { getProductImage } from '@/lib/productImage';

interface HeroProps {
  product: Product;
  secondaryProduct?: Product | null;
}

export function Hero({ product, secondaryProduct }: HeroProps) {
  const [selectedModel, setSelectedModel] = useState<string>(product.slug);
  const currentProduct = selectedModel === secondaryProduct?.slug && secondaryProduct ? secondaryProduct : product;

  const defaultColorName = currentProduct.defaultColor ?? currentProduct.colors[0]?.name ?? 'Borgoña';
  const [selectedColor, setSelectedColor] = useState<string>(defaultColorName);

  const activeColorObj = currentProduct.colors.find(
    (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
  ) ?? currentProduct.colors[0];

  const activeImage = getProductImage(activeColorObj?.image ?? currentProduct.images[0]);
  const isMax = currentProduct.slug.includes('max');

  function handleModelChange(slug: string) {
    setSelectedModel(slug);
    const targetProduct = slug === secondaryProduct?.slug && secondaryProduct ? secondaryProduct : product;
    setSelectedColor(targetProduct.defaultColor ?? targetProduct.colors[0]?.name ?? 'Borgoña');
  }

  return (
    <section className="hero-section legacy-hero iphone18-hero" aria-label="Lanzamiento oficial iPhone 18 Pro">
      <div className="legacy-hero-glow" aria-hidden="true" />

      {/* Copy Column */}
      <div className="legacy-hero-copy">
        <div className="hero-badge-pill">
          <span className="hero-badge-spark" aria-hidden="true">✨</span>
          <span>NUEVA GENERACIÓN · RESERVAS ABIERTAS</span>
        </div>

        <h1>
          iPhone 18 Pro.
          <br />
          <em>Haz espacio para lo extraordinario.</em>
        </h1>

        <p>
          Chip A20 Pro de máxima eficiencia, cámara Fusion de 48 MP con apertura variable y nuevo acabado en titanio Borgoña.
        </p>

        {/* Model Switcher Buttons */}
        {secondaryProduct && (
          <div className="hero-model-switcher" role="group" aria-label="Elegir modelo de iPhone 18">
            <button
              type="button"
              className={`hero-model-btn ${isMax ? 'active' : ''}`}
              onClick={() => handleModelChange(product.slug)}
            >
              <strong>iPhone 18 Pro Max</strong>
              <span>6.9 pulgadas</span>
            </button>
            <button
              type="button"
              className={`hero-model-btn ${!isMax ? 'active' : ''}`}
              onClick={() => handleModelChange(secondaryProduct.slug)}
            >
              <strong>iPhone 18 Pro</strong>
              <span>6.3 pulgadas</span>
            </button>
          </div>
        )}

        {/* Color Palette Selector */}
        <div className="hero-color-picker-wrap">
          <span className="hero-color-label">
            Color: <strong>{activeColorObj?.name}</strong>
          </span>
          <div className="hero-swatches" role="radiogroup" aria-label="Colores disponibles">
            {currentProduct.colors.map((color) => {
              const isSelected = color.name.toLowerCase() === selectedColor.toLowerCase();
              return (
                <button
                  key={color.name}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Seleccionar color ${color.name}`}
                  title={color.name}
                  className={`hero-swatch-dot ${isSelected ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.name)}
                />
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="hero-actions">
          <Link className="button button-light hero-cta-btn" href={`/iphone/${currentProduct.slug}`}>
            Solicitar reserva <span>↗</span>
          </Link>
          <Link className="text-link hero-secondary" href="/comparar?modelos=iphone-18-pro-max,iphone-17-pro-max">
            Comparar con Serie 17 ↗
          </Link>
        </div>

        <div className="hero-reservation-note">
          <span className="hero-note-dot" aria-hidden="true" />
          <span>Solicitud sin compromiso previo. Confirmación directa con un asesor por WhatsApp.</span>
        </div>
      </div>

      {/* Interactive Visual Showcase */}
      <div className="legacy-hero-product">
        <span className="legacy-watermark" aria-hidden="true">18</span>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentProduct.slug}-${activeColorObj?.name}`}
            className="hero-image-motion-wrap"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/iphone/${currentProduct.slug}`}
              data-event="product_view"
              data-product-id={currentProduct.id}
              aria-label={`Ver detalles de ${currentProduct.name} en color ${activeColorObj?.name}`}
            >
              <Image
                src={activeImage}
                alt={`${currentProduct.name} en color ${activeColorObj?.name}`}
                width={1200}
                height={1200}
                priority
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="legacy-product-caption">
          <div>
            <span>{currentProduct.name}</span>
            <small>Color {activeColorObj?.name} · Acabado oficial</small>
          </div>
          <strong>Reserva anticipada exclusiva</strong>
        </div>
      </div>

      <div className="legacy-hero-footer">
        <span>01 / LANZAMIENTO EXCLUSIVO</span>
        <span>Atención directa y entregas coordinadas en Perú</span>
      </div>
    </section>
  );
}
