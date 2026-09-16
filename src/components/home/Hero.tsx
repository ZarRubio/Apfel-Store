'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Product } from '@/types/product';
import { getProductImage } from '@/lib/productImage';

const COLOR_CHANGE_DELAY = 4500;

export function Hero({ product }: { product: Product }) {
  const reduceMotion = useReducedMotion();
  const colors = useMemo(() => {
    const defaultIndex = product.colors.findIndex((color) => color.name === product.defaultColor);
    if (defaultIndex <= 0) return product.colors;
    return [product.colors[defaultIndex], ...product.colors.filter((_, index) => index !== defaultIndex)];
  }, [product.colors, product.defaultColor]);
  const [activeColor, setActiveColor] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const color = colors[activeColor] ?? colors[0];

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    colors.slice(1).forEach((option) => {
      const preload = new window.Image();
      preload.src = getProductImage(option.image);
    });
  }, [colors]);

  useEffect(() => {
    if (interactionPaused || !documentVisible || colors.length < 2) return;
    const timer = window.setTimeout(() => setActiveColor((current) => (current + 1) % colors.length), COLOR_CHANGE_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeColor, colors.length, documentVisible, interactionPaused]);

  if (!color) return null;

  return <section
    className="hero-section legacy-hero iphone18-hero hero-animated"
    onMouseEnter={() => setInteractionPaused(true)}
    onMouseLeave={() => setInteractionPaused(false)}
    onFocusCapture={() => setInteractionPaused(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false);
    }}
  >
    <div className="legacy-hero-glow" aria-hidden="true" />
    <div className="legacy-hero-copy">
      <span className="eyebrow hero-enter hero-enter-1">NUEVA SERIE · SOLICITUDES DE RESERVA</span>
      <h1 className="hero-enter hero-enter-2">iPhone 18 Pro.<br /><em>Haz espacio<br className="mobile-break" /> para más.</em></h1>
      <p className="hero-enter hero-enter-3">Conoce los nuevos Pro y Pro Max. Elige el color y la capacidad que prefieres; te ayudamos a confirmar los detalles.</p>
      <div className="hero-actions hero-enter hero-enter-4"><Link className="button button-light" href={`/iphone/${product.slug}`}>Solicitar reserva <span>↗</span></Link><Link className="text-link hero-secondary" href="/productos?serie=18">Explorar la serie 18 ↗</Link></div>
      <span className="hero-reservation-note hero-enter hero-enter-5">Precio, disponibilidad y condiciones por confirmar.</span>
    </div>
    <div className="legacy-hero-product hero-enter hero-product-enter">
      <span className="legacy-watermark" aria-hidden="true">18</span>
      <Link href={`/iphone/${product.slug}`} data-event="product_view" data-product-id={product.id} aria-label={`Ver ${product.name} en color ${color.name}`}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            className="hero-color-frame"
            key={color.image}
            initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateX(16px) scale(0.975)' }}
            animate={{ opacity: 1, transform: 'translateX(0) scale(1)' }}
            exit={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateX(-12px) scale(0.985)' }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <Image src={getProductImage(color.image)} alt={`${product.name} en color ${color.name.toLowerCase()}`} width={1200} height={1200} priority={activeColor === 0} />
          </motion.div>
        </AnimatePresence>
      </Link>
      <div className="hero-color-picker" role="group" aria-label="Colores del iPhone 18 Pro Max">
        {colors.map((option, index) => <button
          key={option.name}
          type="button"
          className={index === activeColor ? 'is-active' : ''}
          aria-label={`Mostrar ${product.name} en color ${option.name}`}
          aria-pressed={index === activeColor}
          onClick={() => setActiveColor(index)}
        ><span style={{ backgroundColor: option.hex }} aria-hidden="true" /></button>)}
        <strong>{color.name}</strong>
      </div>
      <div className="legacy-product-caption"><span>{product.name} · {color.name}</span><strong>Solicita tu reserva</strong></div>
    </div>
    <div className="legacy-hero-footer hero-enter hero-enter-5"><span>01 / LA NUEVA SERIE</span><span>Tu elección, a tu ritmo.</span></div>
  </section>;
}
