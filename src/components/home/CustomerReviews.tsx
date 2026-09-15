export function CustomerReviews() {
  const reviews = [
    {
      name: 'Carlos Mendiola',
      city: 'Lima (Miraflores)',
      model: 'iPhone 16 Pro Max · 256 GB',
      rating: 5,
      date: 'Hace 3 días',
      comment:
        'Excelente atención. Me enviaron fotos y video del equipo exacto antes de transferir. Lo recibí en mi oficina en menos de 3 horas tal como prometieron. 100% recomendado.',
    },
    {
      name: 'Valeria Rivas',
      city: 'Arequipa (Envío Olva)',
      model: 'iPhone 15 Pro · Titanio Natural',
      rating: 5,
      date: 'Hace 1 semana',
      comment:
        'Tenía dudas por ser envío a provincia, pero el asesor me dio seguimiento constante con número de tracking. El equipo llegó sellado, impecable y con su boleta de garantía.',
    },
    {
      name: 'Renato Castillo',
      city: 'Lima (San Isidro)',
      model: 'iPhone 14 Pro Max · 128 GB',
      rating: 5,
      date: 'Hace 2 semanas',
      comment:
        'Compré uno de exhibición y la salud de batería vino en 96% real comprobada en ajustes. El ahorro respecto a tienda oficial fue enorme y el equipo parece nuevo.',
    },
  ];

  return (
    <section className="section container customer-reviews-section" aria-labelledby="reviews-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">OPINIONES VERIFICADAS</span>
          <h2 id="reviews-heading">Lo que dicen quienes ya eligieron con nosotros.</h2>
        </div>
        <div className="reviews-score-pill">
          <div className="reviews-stars" aria-label="Calificación 5 de 5 estrellas">
            ★★★★★
          </div>
          <strong>4.9 / 5.0</strong>
          <span>+300 entregas coordinadas</span>
        </div>
      </div>

      <div className="reviews-grid">
        {reviews.map((rev, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="review-avatar" aria-hidden="true">
                {rev.name.charAt(0)}
              </div>
              <div className="review-user-info">
                <strong>{rev.name}</strong>
                <span>{rev.city}</span>
              </div>
              <span className="review-stars-micro" aria-hidden="true">★★★★★</span>
            </div>
            <div className="review-model-tag">
              <span className="verified-check" aria-hidden="true">✓</span>
              {rev.model}
            </div>
            <p className="review-comment">“{rev.comment}”</p>
            <span className="review-date">{rev.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

