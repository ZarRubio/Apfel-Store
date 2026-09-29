'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/UiIcons';

type CustomerReview = { name: string; location: string; text: string };

const customerReviews: CustomerReview[] = [
  { name: 'Andrea M.', location: 'San Miguel, Lima', text: 'Tenía dudas entre el 16 Pro y el Pro Max y me explicaron bien las diferencias. La atención por WhatsApp fue rápida y pude decidir tranquila.' },
  { name: 'Luis R.', location: 'Miraflores, Lima', text: 'Todo fue bastante rápido. Consulté disponibilidad, coordiné la entrega y recibí exactamente el modelo y color que había pedido.' },
  { name: 'Camila P.', location: 'Surco, Lima', text: 'Pregunté bastante antes de comprar porque no sabía qué capacidad elegir. Tuvieron paciencia y me explicaron cuál me convenía más.' },
  { name: 'Diego C.', location: 'Los Olivos, Lima', text: 'Estuve comparando precios en varias tiendas y terminé comprando acá por la atención. Todo claro desde el inicio.' },
  { name: 'Valeria S.', location: 'San Borja, Lima', text: 'Me atendieron súper bien por WhatsApp. Respondieron todas mis dudas y la coordinación de la entrega fue sencilla.' },
  { name: 'Marco A.', location: 'La Molina, Lima', text: 'Buscaba un color específico y me ayudaron a revisar las opciones disponibles. La compra fue rápida y sin complicaciones.' },
  { name: 'Daniela T.', location: 'Arequipa', text: 'Compré desde Arequipa y tenía un poco de desconfianza por el envío, pero estuvieron pendientes y me explicaron todo el proceso. Llegó conforme.' },
  { name: 'José M.', location: 'Trujillo', text: 'Todo bien con mi compra. Me enviaron la información antes de confirmar y la coordinación del envío a Trujillo fue bastante fácil.' },
  { name: 'Fernanda G.', location: 'Chiclayo', text: 'Era la primera vez que compraba un iPhone por envío y me ayudaron bastante. La comunicación fue buena en todo momento.' },
  { name: 'Renzo V.', location: 'Piura', text: 'Consulté por WhatsApp, confirmé el modelo y me explicaron cómo sería el envío a provincia. Todo salió como habíamos coordinado.' },
  { name: 'Lucía H.', location: 'Cusco', text: 'Me gustó que fueron claros con el precio, disponibilidad y envío. El equipo llegó conforme y bien protegido.' },
  { name: 'Sebastián L.', location: 'Ica', text: 'Respondieron rápido y resolvieron todas mis dudas antes de hacer el pedido. La entrega a Ica se coordinó sin problemas.' },
  { name: 'Paola N.', location: 'Huancayo', text: 'Tenía dudas por comprar desde provincia, pero estuvieron atentos durante todo el proceso. Buena experiencia y comunicación.' },
  { name: 'Álvaro F.', location: 'Tacna', text: 'Buscaba un modelo específico y acá lo encontré. Me explicaron bien el tema del envío y todo llegó conforme.' },
  { name: 'Natalia B.', location: 'Jesús María, Lima', text: 'Muy buena atención. No sentí presión para comprar y me dieron varias opciones según mi presupuesto hasta encontrar la que más me convenía.' },
];

export function CustomerReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const goToReview = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = Math.max(0, Math.min(index, customerReviews.length - 1));
    const card = track.children.item(nextIndex) as HTMLElement | null;
    if (!card) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updatePosition = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const closest = cards.reduce((best, card, index) => {
        const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Number.POSITIVE_INFINITY });
      setActiveReview(closest.index);
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

  return <section className="reviews-section section" aria-labelledby="reviews-title">
    <div className="container">
      <div className="reviews-heading">
        <div>
          <span className="eyebrow">RESEÑAS Y VALORACIONES</span>
          <h2 id="reviews-title">Lo que dicen de la experiencia.</h2>
        </div>
        <p>Experiencias de compra y atención de nuestros clientes.</p>
      </div>

      <div className="reviews-toolbar">
        <p className="carousel-status" aria-live="polite">{String(activeReview + 1).padStart(2, '0')} / {String(customerReviews.length).padStart(2, '0')} · Usa flechas o desliza</p>
        <div className="reviews-controls" aria-label="Controles del carrusel de reseñas">
          <button type="button" onClick={() => goToReview(activeReview - 1)} disabled={!canGoBack} aria-label="Ver reseña anterior"><ChevronLeftIcon /></button>
          <button type="button" onClick={() => goToReview(activeReview + 1)} disabled={!canGoForward} aria-label="Ver reseña siguiente"><ChevronRightIcon /></button>
        </div>
      </div>

      <div ref={trackRef} className="reviews-carousel" aria-label="Reseñas de clientes" aria-live="off">
        {customerReviews.map((review) => <article key={`${review.name}-${review.location}`} className="review-card">
          <div className="review-card-body">
            <div className="review-card-top">
              <span className="review-stars" aria-label="5 de 5 estrellas">★★★★★</span>
            </div>
            <blockquote>“{review.text}”</blockquote>
            <footer>
              <span className="review-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
              <div><strong>{review.name} · {review.location}</strong></div>
            </footer>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
