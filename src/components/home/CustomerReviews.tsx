'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/UiIcons';

type ReviewSample = {
  name: string;
  location: string;
  product: string;
  text: string;
};

const AUTOPLAY_DELAY = 6000;

const reviewSamples: ReviewSample[] = [
  { name: 'Perfil de muestra 01', location: 'Ubicación de ejemplo', product: 'iPhone 16 Pro · ejemplo', text: 'Tenía dudas entre dos capacidades y me ayudó que me explicaran qué cambiaba en el uso diario. Así pude elegir con más claridad.' },
  { name: 'Perfil de muestra 02', location: 'Ubicación de ejemplo', product: 'iPhone 15 Pro Max · ejemplo', text: 'La atención por WhatsApp fue clara. Me indicaron qué detalles debía confirmar antes de coordinar el envío.' },
  { name: 'Perfil de muestra 03', location: 'Ubicación de ejemplo', product: 'iPhone 17 Pro · ejemplo', text: 'Me orientaron con los colores y las diferencias entre modelos sin apurar la decisión. Eso hizo más sencilla la elección.' },
  { name: 'Perfil de muestra 04', location: 'Ubicación de ejemplo', product: 'iPhone 16 · ejemplo', text: 'Pude resolver mis preguntas sobre el equipo y conocer las condiciones antes de avanzar con la compra.' },
  { name: 'Perfil de muestra 05', location: 'Ubicación de ejemplo', product: 'iPhone 16 Pro Max · ejemplo', text: 'Me compartieron la información que necesitaba para revisar la configuración y coordinar la entrega.' },
  { name: 'Perfil de muestra 06', location: 'Ubicación de ejemplo', product: 'iPhone 15 · ejemplo', text: 'No tenía claro qué capacidad elegir. La explicación fue sencilla y me ayudó a comparar las opciones.' },
  { name: 'Perfil de muestra 07', location: 'Ubicación de ejemplo', product: 'iPhone 17 Pro Max · ejemplo', text: 'Antes de separar el equipo pude consultar por el color, el precio final y las condiciones. La conversación fue ordenada.' },
  { name: 'Perfil de muestra 08', location: 'Ubicación de ejemplo', product: 'iPhone 16 Plus · ejemplo', text: 'Me explicaron qué datos debía tener en cuenta para el despacho y cómo consultar el seguimiento del pedido.' },
  { name: 'Perfil de muestra 09', location: 'Ubicación de ejemplo', product: 'iPhone 15 Pro · ejemplo', text: 'Me presentaron las alternativas disponibles y pude preguntar con calma cuál encajaba mejor con lo que buscaba.' },
  { name: 'Perfil de muestra 10', location: 'Ubicación de ejemplo', product: 'iPhone 16 Pro · ejemplo', text: 'La selección fue sencilla: revisé los detalles, resolví mis consultas y luego coordiné por WhatsApp.' },
  { name: 'Perfil de muestra 11', location: 'Ubicación de ejemplo', product: 'iPhone 15 Plus · ejemplo', text: 'Agradecí que me explicaran cómo confirmar el costo y el plazo de envío a mi ciudad antes de decidir.' },
  { name: 'Perfil de muestra 12', location: 'Ubicación de ejemplo', product: 'iPhone 17 · ejemplo', text: 'Estaba comparando dos modelos y la asesoría me ayudó a entender sus diferencias para elegir sin apuro.' },
];

export function CustomerReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  const goToReview = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = Math.max(0, Math.min(index, reviewSamples.length - 1));
    const card = track.children.item(nextIndex) as HTMLElement | null;
    if (!card) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
    setActiveReview(nextIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActiveReview = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const closest = cards.reduce((best, card, index) => {
        const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Number.POSITIVE_INFINITY });
      setActiveReview(closest.index);
      setCanGoBack(track.scrollLeft > 2);
      setCanGoForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 2);
    };

    updateActiveReview();
    track.addEventListener('scroll', updateActiveReview, { passive: true });
    window.addEventListener('resize', updateActiveReview);
    return () => {
      track.removeEventListener('scroll', updateActiveReview);
      window.removeEventListener('resize', updateActiveReview);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: .2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (userPaused || hovered || focusWithin || !isInView || !documentVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => goToReview(canGoForward ? activeReview + 1 : 0), AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeReview, canGoForward, documentVisible, focusWithin, hovered, isInView, userPaused]);

  return <section
    ref={sectionRef}
    className="reviews-section section"
    aria-labelledby="reviews-title"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocusWithin(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
    }}
  >
    <div className="container">
      <div className="reviews-heading">
        <div>
          <span className="eyebrow">RESEÑAS Y VALORACIONES</span>
          <h2 id="reviews-title">Lo que dicen de la experiencia.</h2>
        </div>
        <p><strong>Textos ficticios de demostración.</strong> No corresponden a clientes, compras ni calificaciones reales. Reemplázalos por opiniones auténticas antes de publicar.</p>
      </div>

      <div className="reviews-toolbar">
        <p><span>{String(activeReview + 1).padStart(2, '0')}</span> / {String(reviewSamples.length).padStart(2, '0')} · {userPaused ? 'en pausa' : 'avance automático'}</p>
        <div className="reviews-controls" aria-label="Controles del carrusel de reseñas">
          <button type="button" onClick={() => goToReview(activeReview - 1)} disabled={!canGoBack} aria-label="Ver reseña anterior"><ChevronLeftIcon /></button>
          <button type="button" onClick={() => setUserPaused((paused) => !paused)} aria-label={userPaused ? 'Reanudar carrusel de reseñas' : 'Pausar carrusel de reseñas'} aria-pressed={userPaused}>{userPaused ? '▶' : 'Ⅱ'}</button>
          <button type="button" onClick={() => goToReview(activeReview + 1)} disabled={!canGoForward} aria-label="Ver reseña siguiente"><ChevronRightIcon /></button>
        </div>
      </div>

      <div ref={trackRef} className="reviews-carousel" aria-label="Reseñas de clientes" aria-live="off">
        {reviewSamples.map((review) => <article key={`${review.name}-${review.product}`} className="review-card">
          <div className="review-card-body">
            <div className="review-card-top">
              <span className="review-stars" aria-label="Estrellas de demostración; no representan calificaciones reales">★★★★★</span>
              <span className="review-sample-badge">Texto de ejemplo</span>
            </div>
            <blockquote>“{review.text}”</blockquote>
            <footer>
              <span className="review-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
              <div>
                <strong>{review.name} · {review.location}</strong>
                <span>{review.product} · contenido de demostración</span>
              </div>
            </footer>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
