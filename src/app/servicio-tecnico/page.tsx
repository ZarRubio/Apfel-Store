import type { Metadata } from 'next';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import '../styles/service.css';

export const metadata: Metadata = {
  title: 'Servicio técnico',
  description: 'Próxima área de servicio técnico de Apfel Store. Alcance, condiciones y precios pendientes de confirmación.',
};

const serviceContactUrl = getWhatsAppUrl({
  message: '👋 Hola Apfel Store.\n\n🛠️ Quisiera recibir información cuando esté disponible el servicio técnico. ¿Pueden orientarme?',
});

const pendingDetails = [
  {
    number: '01',
    title: 'Equipos y reparaciones',
    description: 'Los modelos atendidos y los tipos de reparación todavía están por definirse.',
  },
  {
    number: '02',
    title: 'Diagnóstico y precios',
    description: 'El proceso de evaluación, sus plazos y tarifas se publicarán cuando estén confirmados.',
  },
  {
    number: '03',
    title: 'Garantía del servicio',
    description: 'La cobertura, repuestos y condiciones se detallarán antes de recibir equipos.',
  },
];

export default function TechnicalServicePage() {
  return <main id="main-content" tabIndex={-1}>
    <section className="service-hero">
      <div className="container service-hero-inner">
        <div>
          <span className="eyebrow">SERVICIO TÉCNICO</span>
          <h1>Estamos preparando una atención a la altura de tu iPhone.</h1>
        </div>
        <div className="service-hero-copy">
          <span className="service-status"><span aria-hidden="true" /> Próximamente</span>
          <p>Aún estamos definiendo el alcance, los equipos admitidos, los precios y las condiciones del servicio.</p>
          <a className="button button-light" href={serviceContactUrl} target="_blank" rel="noreferrer" data-event="whatsapp_service_click">
            <WhatsAppIcon /> Solicitar información <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>

    <section className="section container service-pending" aria-labelledby="service-pending-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">INFORMACIÓN PENDIENTE</span>
          <h2 id="service-pending-title">Lo que confirmaremos.</h2>
        </div>
        <p>No recibimos equipos desde esta página por el momento.</p>
      </div>
      <div className="service-pending-grid">
        {pendingDetails.map((detail) => <article key={detail.number} className="service-pending-card">
          <span>{detail.number}</span>
          <h3>{detail.title}</h3>
          <p>{detail.description}</p>
        </article>)}
      </div>
    </section>
  </main>;
}
