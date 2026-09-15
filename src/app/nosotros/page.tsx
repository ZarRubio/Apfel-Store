import type { Metadata } from 'next';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Nosotros | Apfel Store',
  description: 'Conoce la filosofía de Apfel Store: transparencia técnica, fotografías del equipo real, garantía escrita y asesoría personalizada en la compra de tu iPhone en Perú.',
};

export default function AboutPage() {
  const stats = [
    { num: '300+', label: 'Entregas coordinadas en Perú' },
    { num: '100%', label: 'Equipos y piezas originales' },
    { num: '4.9 ★', label: 'Satisfacción comprobada' },
    { num: '< 5 min', label: 'Respuesta promedio en WhatsApp' },
  ];

  const commitments = [
    {
      icon: '🛡️',
      title: 'Garantía Escrita y Respaldo Real',
      desc: 'Nada de promesas verbales. Cada compra va acompañada de su comprobante y término de garantía de tienda con cobertura técnica real.',
    },
    {
      icon: '📸',
      title: 'Fotos y Videos del Equipo Exacto',
      desc: 'Antes de realizar cualquier pago, te mostramos el número de serie, la pantalla de ajustes, condición física y la salud de batería de la unidad que recibirás.',
    },
    {
      icon: '💬',
      title: 'Asesoría de Usuario a Usuario',
      desc: 'No usamos respuestas automatizadas ni intentamos venderte el modelo más costoso. Te recomendamos la capacidad y el modelo que mejor resuelve tu día a día.',
    },
  ];

  const inspectionPoints = [
    { title: 'Batería y Rendimiento', desc: 'Verificación de ciclos de carga y salud entre 85% y 100% sin mensajes de pieza desconocida.' },
    { title: 'Pantalla True Tone y ProMotion', desc: 'Comprobación de panel OLED original, calibración de color True Tone y tasa de 120Hz fluida.' },
    { title: 'Cámaras y Sensor LiDAR', desc: 'Prueba de enfoque automático, estabilización óptica, zoom teleobjetivo y escáner LiDAR en fotos nocturnas.' },
    { title: 'Face ID y Biometría', desc: 'Testeo completo del proyector de puntos infrarrojo y reconocimiento facial instantáneo.' },
    { title: 'Audio, Micrófonos y Red 5G', desc: 'Revisión de altavoces estéreo, cancelación de ruido, llamadas claras y velocidad en redes 5G.' },
    { title: 'Higienización y Presentación', desc: 'Limpieza con productos de grado electrónico y empaque protector seguro para traslado.' },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="container editorial-page-wrap">
      {/* Hero Banner */}
      <section className="editorial-hero-banner">
        <span className="eyebrow">FILOSOFÍA APFEL STORE</span>
        <h1>
          Comprar un iPhone
          <em>no debería ser un salto de fe.</em>
        </h1>
        <p className="editorial-hero-lead">
          Nacimos para eliminar la incertidumbre del mercado de telefonía premium en el Perú. Creemos en la atención directa, la información técnica honesta y las decisiones sin presión.
        </p>
      </section>

      {/* Stats Bar */}
      <div className="nosotros-stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="nosotros-stat-card">
            <span className="nosotros-stat-num">{item.num}</span>
            <span className="nosotros-stat-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Commitments Section */}
      <section className="nosotros-commitments-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">NUESTROS TRES COMPROMISOS</span>
            <h2>La conversación es parte del producto.</h2>
          </div>
          <p>
            Comprar con nosotros significa tener claridad total desde el primer mensaje hasta que el equipo esté en tus manos.
          </p>
        </div>

        <div className="commitments-grid">
          {commitments.map((item, index) => (
            <div key={index} className="commitment-card">
              <span className="commitment-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Inspection Process */}
      <section className="inspection-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CONTROL DE CALIDAD RIGUROSO</span>
            <h2>Más de 30 puntos de inspección técnica.</h2>
          </div>
          <p>Cada unidad de exhibición pasa por un protocolo estricto antes de ingresar a nuestro catálogo.</p>
        </div>

        <div className="inspection-grid">
          {inspectionPoints.map((point, index) => (
            <div key={index} className="inspection-item">
              <span className="inspection-check" aria-hidden="true">✓</span>
              <div className="inspection-text">
                <strong>{point.title}</strong>
                <p>{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <aside className="contact-band-wrapper">
        <div className="contact-band-card">
          <div className="contact-band-content">
            <span className="eyebrow">¿TIENES DUDAS SOBRE UN MODELO O DISPONIBILIDAD?</span>
            <h2>Conversemos directamente por WhatsApp.</h2>
            <p>
              Un asesor de Apfel Store te atenderá con gusto para resolver cualquier inquietud y mostrarte equipos disponibles hoy mismo.
            </p>
          </div>
          <div className="contact-band-action">
            <a
              className="button button-light contact-band-btn"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              data-event="whatsapp_nosotros_click"
            >
              <span>💬</span> Hablar con un asesor <span>↗</span>
            </a>
          </div>
        </div>
      </aside>
    </main>
  );
}
