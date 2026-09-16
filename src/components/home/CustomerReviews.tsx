'use client';

import { useEffect, useRef, useState } from 'react';

type ReviewSample = {
  name: string;
  location: string;
  product: string;
  text: string;
};

const AUTOPLAY_DELAY = 6000;

const reviewSamples: ReviewSample[] = [
  { name: 'María P.', location: 'Lima', product: 'iPhone 16 Pro', text: 'Me ayudaron a comparar capacidades y colores con calma. La coordinación por WhatsApp fue clara desde el inicio.' },
  { name: 'Diego R.', location: 'Arequipa', product: 'iPhone 15 Pro Max', text: 'Consulté por un modelo específico y resolvieron mis dudas antes de coordinar el envío a mi ciudad.' },
  { name: 'Valeria M.', location: 'Trujillo', product: 'iPhone 17 Pro', text: 'Me explicaron las opciones disponibles y pude elegir la configuración que mejor se ajustaba a lo que necesitaba.' },
  { name: 'Carlos A.', location: 'Lima', product: 'iPhone 16', text: 'La atención fue rápida y recibí la información del equipo antes de confirmar la compra y la entrega.' },
  { name: 'Luciana G.', location: 'Cusco', product: 'iPhone 16 Pro Max', text: 'Me enviaron los detalles para revisar el equipo y pude seguir la coordinación del despacho por WhatsApp.' },
  { name: 'Jorge S.', location: 'Chiclayo', product: 'iPhone 15', text: 'Tenía dudas sobre la capacidad y me orientaron con una explicación sencilla. Todo quedó coordinado en el mismo chat.' },
  { name: 'Andrea C.', location: 'Lima', product: 'iPhone 17 Pro Max', text: 'Pude confirmar color, capacidad y condiciones antes de separar el equipo. La atención fue muy ordenada.' },
  { name: 'Renato V.', location: 'Piura', product: 'iPhone 16 Plus', text: 'La comunicación durante el envío fue constante y tuve a la mano los datos necesarios para hacer seguimiento.' },
  { name: 'Camila F.', location: 'Ica', product: 'iPhone 15 Pro', text: 'Me mostraron las alternativas disponibles y resolvieron cada consulta antes de coordinar la compra.' },
  { name: 'Sebastián L.', location: 'Lima', product: 'iPhone 16 Pro', text: 'El proceso fue directo: elegí la configuración, confirmé los detalles y coordinamos la entrega por WhatsApp.' },
  { name: 'Fernanda T.', location: 'Huancayo', product: 'iPhone 15 Plus', text: 'Me explicaron cómo se realizaría el despacho y recibí los datos necesarios para seguir el pedido hasta mi ciudad.' },
  { name: 'Alonso M.', location: 'Lima', product: 'iPhone 17', text: 'Comparé dos modelos con ayuda del asesor y pude decidir sin apuros. La comunicación fue rápida y sencilla.' },
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
        <p><strong>Vista previa.</strong> Estas 12 opiniones muestran el formato final. Deben sustituirse por testimonios verificados antes de publicar.</p>
      </div>

      <div className="reviews-toolbar">
        <p><span>{String(activeReview + 1).padStart(2, '0')}</span> / {String(reviewSamples.length).padStart(2, '0')} · {userPaused ? 'en pausa' : 'avance automático'}</p>
        <div className="reviews-controls" aria-label="Controles del carrusel de reseñas">
          <button type="button" onClick={() => goToReview(activeReview - 1)} disabled={!canGoBack} aria-label="Ver reseña anterior">←</button>
          <button type="button" onClick={() => setUserPaused((paused) => !paused)} aria-label={userPaused ? 'Reanudar carrusel de reseñas' : 'Pausar carrusel de reseñas'} aria-pressed={userPaused}>{userPaused ? '▶' : 'Ⅱ'}</button>
          <button type="button" onClick={() => goToReview(activeReview + 1)} disabled={!canGoForward} aria-label="Ver reseña siguiente">→</button>
        </div>
      </div>

      <div ref={trackRef} className="reviews-carousel" aria-label="Reseñas de clientes" aria-live="off">
        {reviewSamples.map((review, index) => <article key={`${review.name}-${review.product}`} className="review-card">
          <div className="review-card-body">
            <div className="review-card-top">
              <span className="review-stars" aria-label="Ejemplo de valoración de 5 sobre 5">★★★★★</span>
              <span className="review-sample-badge">Muestra {String(index + 1).padStart(2, '0')}</span>
            </div>
            <blockquote>“{review.text}”</blockquote>
            <footer>
              <span className="review-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
              <div>
                <strong>{review.name} · {review.location}</strong>
                <span>{review.product} · contenido de muestra</span>
              </div>
            </footer>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
