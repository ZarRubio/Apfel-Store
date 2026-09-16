const reviewSamples = [
  {
    name: 'María P.',
    product: 'iPhone 16 Pro',
    text: 'Me ayudaron a comparar capacidades y colores sin apurar la decisión. La coordinación por WhatsApp fue clara desde el inicio.',
  },
  {
    name: 'Diego R.',
    product: 'iPhone 15 Pro Max',
    text: 'Pregunté por un modelo específico y pude resolver mis dudas sobre el equipo antes de coordinar la compra.',
  },
  {
    name: 'Valeria M.',
    product: 'iPhone 17 Pro',
    text: 'La atención fue directa y me explicaron las opciones disponibles para elegir la configuración que necesitaba.',
  },
];

export function CustomerReviews() {
  return <section className="reviews-section section" aria-labelledby="reviews-title">
    <div className="container">
      <div className="reviews-heading">
        <div>
          <span className="eyebrow">RESEÑAS Y VALORACIONES</span>
          <h2 id="reviews-title">Experiencias de compra.</h2>
        </div>
        <p><strong>Vista previa.</strong> Estos textos muestran el formato final y deben reemplazarse por opiniones verificadas antes de publicar.</p>
      </div>

      <div className="reviews-grid">
        {reviewSamples.map((review) => <article key={review.name} className="review-card">
          <div className="review-card-top">
            <span className="review-stars" aria-label="Ejemplo de valoración de 5 sobre 5">★★★★★</span>
            <span className="review-sample-badge">Muestra</span>
          </div>
          <blockquote>“{review.text}”</blockquote>
          <footer>
            <span className="review-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
            <div>
              <strong>{review.name}</strong>
              <span>{review.product} · contenido de muestra</span>
            </div>
          </footer>
        </article>)}
      </div>
    </div>
  </section>;
}
