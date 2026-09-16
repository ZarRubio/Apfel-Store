'use client';

import { useEffect, useRef, useState } from 'react';

const AUTOPLAY_DELAY = 6000;

const deliverySlots = [
  { city: 'Lima', label: 'Entrega coordinada' },
  { city: 'Arequipa', label: 'Envío a provincia' },
  { city: 'Trujillo', label: 'Envío a provincia' },
  { city: 'Cusco', label: 'Envío a provincia' },
  { city: 'Chiclayo', label: 'Envío a provincia' },
  { city: 'Piura', label: 'Envío a provincia' },
];

export function CustomerDeliveries() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = Math.max(0, Math.min(index, deliverySlots.length - 1));
    const slide = track.children.item(nextIndex) as HTMLElement | null;
    if (!slide) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
    setActiveSlide(nextIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updatePosition = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const closest = slides.reduce((best, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Number.POSITIVE_INFINITY });
      setActiveSlide(closest.index);
      setCanGoBack(track.scrollLeft > 2);
      setCanGoForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 2);
    };

    updatePosition();
    track.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    return () => {
      track.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => goToSlide(canGoForward ? activeSlide + 1 : 0), AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeSlide, canGoForward, isPaused]);

  return <section
    className="deliveries-section section"
    aria-labelledby="deliveries-title"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    onFocusCapture={() => setIsPaused(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
    }}
  >
    <div className="container">
      <div className="deliveries-heading">
        <div>
          <span className="eyebrow">ENTREGAS APFEL STORE</span>
          <h2 id="deliveries-title">Momentos reales, clientes reales.</h2>
        </div>
        <p><strong>Sección preparada.</strong> Cada espacio se reemplazará por una fotografía autorizada del cliente al recibir su equipo.</p>
      </div>

      <div className="deliveries-toolbar">
        <p><span>{String(activeSlide + 1).padStart(2, '0')}</span> / {String(deliverySlots.length).padStart(2, '0')} · avance automático</p>
        <div className="deliveries-controls" aria-label="Controles del carrusel de entregas">
          <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={!canGoBack} aria-label="Ver entrega anterior">←</button>
          <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={!canGoForward} aria-label="Ver entrega siguiente">→</button>
        </div>
      </div>

      <div ref={trackRef} className="deliveries-carousel" aria-label="Fotografías de entregas" aria-live="off">
        {deliverySlots.map((delivery, index) => <article className="delivery-card" key={`${delivery.city}-${index}`}>
          <div className="delivery-photo-placeholder">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h2l1.2-1.5h4.6L15.5 5h2A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z"/><circle cx="12" cy="12" r="3.5"/></svg>
            <span>Fotografía pendiente</span>
            <small>Formato recomendado: 4:5 vertical</small>
          </div>
          <footer>
            <div><strong>{delivery.label}</strong><span>{delivery.city}, Perú</span></div>
            <span className="delivery-sample-badge">Vista previa</span>
          </footer>
        </article>)}
      </div>
    </div>
  </section>;
}
