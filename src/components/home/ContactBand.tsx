import { getWhatsAppUrl } from '@/lib/whatsapp';

export function ContactBand() {
  return (
    <section className="contact-band-wrapper">
      <div className="container">
        <div className="contact-band-card">
          <div className="contact-band-content">
            <span className="eyebrow">¿BUSCAS ASESORÍA PERSONALIZADA?</span>
            <h2>Encontramos tu próximo iPhone contigo.</h2>
            <p>
              Cuéntanos qué uso le darás, qué capacidad necesitas o cuál es tu presupuesto.<br />
              Te recomendamos la mejor opción y te mostramos equipos disponibles hoy mismo.
            </p>
            <div className="contact-band-badges">
              <span>⚡ Respuesta en &lt; 5 min</span>
              <span>📸 Fotos y videos reales</span>
              <span>📍 Atención en Lima y provincias</span>
            </div>
          </div>
          <div className="contact-band-action">
            <a
              className="button button-light contact-band-btn"
              data-event="whatsapp_click"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <span>💬</span> Conversar con un asesor <span>↗</span>
            </a>
            <small>Atención de lunes a sábado de 9:00 a 19:00</small>
          </div>
        </div>
      </div>
    </section>
  );
}
