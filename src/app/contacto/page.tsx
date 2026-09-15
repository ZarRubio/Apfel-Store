import type { Metadata } from 'next';
import { ContactInteractiveBox } from '@/components/contact/ContactInteractiveBox';
import { site } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Contacto & Asesoría | Apfel Store',
  description: 'Conversa con un asesor de Apfel Store por WhatsApp. Atención personalizada, fotos del equipo real y coordinación de entrega en Lima y provincias.',
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="container editorial-page-wrap">
      {/* Header */}
      <section className="editorial-hero-banner">
        <span className="eyebrow">ATENCIÓN DIRECTA Y TRANSPARENTE</span>
        <h1>
          Hablemos de tu próximo iPhone.
          <em>Sin intermediarios ni demoras.</em>
        </h1>
        <p className="editorial-hero-lead">
          Te ayudamos a elegir la configuración perfecta, validamos la condición técnica del equipo y coordinamos el pago y la entrega con total seguridad.
        </p>
      </section>

      {/* Main Grid: Interactive Box + Channels */}
      <div className="contacto-grid-main">
        {/* Left Column: Interactive WhatsApp Generator */}
        <ContactInteractiveBox />

        {/* Right Column: Information & Channels */}
        <div className="contacto-side-details">
          {/* Official Channel Card */}
          <div className="contacto-info-card">
            <h3>
              <span aria-hidden="true">💬</span> Canal Principal
            </h3>
            <div className="contacto-meta-list">
              <div className="contacto-meta-item">
                <span>WhatsApp Oficial</span>
                <strong style={{ fontSize: '1.25rem' }}>+51 {site.whatsapp}</strong>
              </div>
              <div className="whatsapp-fast-pill">
                <span>⚡</span> Tiempo de respuesta: &lt; 5 minutos
              </div>
            </div>
          </div>

          {/* Hours & Location */}
          <div className="contacto-info-card">
            <h3>
              <span aria-hidden="true">📍</span> Horarios y Cobertura
            </h3>
            <div className="contacto-meta-list">
              <div className="contacto-meta-item">
                <span>Horario de atención</span>
                <strong>Lunes a sábado · 9:00 a 19:00</strong>
              </div>
              <div className="contacto-meta-item">
                <span>Entregas en Lima</span>
                <strong>Mismo día (2 a 4 horas previa coordinación)</strong>
              </div>
              <div className="contacto-meta-item">
                <span>Envíos a Provincia</span>
                <strong>Olva Courier y Shalom con seguro de carga</strong>
              </div>
            </div>
          </div>

          {/* Payment & Security Card */}
          <div className="contacto-info-card">
            <h3>
              <span aria-hidden="true">🛡️</span> Métodos de Pago Seguros
            </h3>
            <p style={{ color: '#6e6e73', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Aceptamos transferencias bancarias (BCP, BBVA, Interbank), Yape, Plin, tarjetas de crédito/débito y pago contraentrega coordinado en Lima.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
