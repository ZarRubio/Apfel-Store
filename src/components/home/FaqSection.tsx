import { getWhatsAppUrl } from '@/lib/whatsapp';

const faqs = [
  {
    q: '¿Cómo compro mi iPhone en Apfel Store?',
    a: 'Elige tu modelo en el catálogo o comparador, pulsa "Consultar por WhatsApp" y uno de nuestros asesores te responderá en minutos. Te enviaremos fotos del equipo exacto, salud de batería, precio de referencia y coordinaremos el método de pago y entrega que más te acomode.',
  },
  {
    q: '¿Cuál es la diferencia entre un equipo sellado y uno de exhibición?',
    a: 'Un equipo sellado viene en su caja original de fábrica sin abrir, con 0 ciclos de carga y accesorios sin usar. Un equipo de exhibición es una unidad que ha estado en vitrina o demostración comercial: se encuentra en condición cosmética sobresaliente (9.5/10 a 10/10), con batería saludable (85% a 100%), 100% operativo y a un precio significativamente más accesible.',
  },
  {
    q: '¿Qué garantía incluye mi compra?',
    a: 'Todos nuestros equipos incluyen garantía escrita de tienda que cubre defectos técnicos o de funcionamiento, además de soporte postventa directo para resolver cualquier duda con tu configuración o migración de datos.',
  },
  {
    q: '¿Hacen entregas en Lima y envíos a provincia?',
    a: 'Sí. En Lima realizamos entregas en horas previa coordinación en tu domicilio, oficina o punto de encuentro seguro. Para provincias trabajamos con Olva Courier y Shalom, despachando paquetes asegurados con número de remito y seguimiento en tiempo real.',
  },
  {
    q: '¿Puedo dar mi iPhone actual como parte de pago?',
    a: 'Sí. Puedes enviarnos fotos de tu equipo actual, porcentaje de batería y modelo por WhatsApp para darte una tasación inmediata y descontarla del valor de tu próximo iPhone.',
  },
];

export function FaqSection() {
  return (
    <section id="preguntas" className="faq-section section" aria-labelledby="faq-heading">
      <div className="container faq-container">
        <div className="faq-intro">
          <span className="eyebrow">TODO CLARO DESDE EL INICIO</span>
          <h2 id="faq-heading">Preguntas frecuentes.</h2>
          <p>Resolvemos tus principales dudas sobre garantía, estado de equipos y entregas.</p>
          <div className="faq-cta-box">
            <span>¿Tienes otra consulta específica?</span>
            <a className="button button-dark faq-btn" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
              Consultar a un asesor <span>↗</span>
            </a>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">
                <span>{item.q}</span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
