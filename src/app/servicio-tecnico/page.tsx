import type { Metadata } from 'next';
import { ClockIcon, ShieldIcon, SmartphoneIcon, ToolIcon } from '@/components/icons/UiIcons';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import '../styles/service.css';

export const metadata: Metadata = {
  title: 'Servicio técnico',
  description: 'Atención técnica para iPhone y MacBook: solicita una evaluación, diagnóstico y cotización por WhatsApp.',
};

const serviceContactUrl = getWhatsAppUrl({
  message: '👋 Hola Apfel Store.\n\n🛠️ Quisiera información sobre el servicio técnico para mi equipo Apple. ¿Podrían orientarme?',
});

const commonIssues = [
  'Pantalla dañada',
  'Batería con poca duración',
  'Equipo lento',
  'Evaluación general',
];

const servicePrinciples = [
  {
    number: '01',
    title: 'Reparaciones ágiles',
    description: 'Coordinamos la evaluación y te explicamos el proceso y el plazo estimado para tu equipo.',
    icon: ClockIcon,
  },
  {
    number: '02',
    title: 'Diagnóstico preciso',
    description: 'El equipo será evaluado antes de confirmar el trabajo, el precio y el tiempo estimado.',
    icon: ToolIcon,
  },
  {
    number: '03',
    title: 'Cuidado responsable',
    description: 'Las condiciones, repuestos y garantía se comunicarán antes de autorizar cualquier intervención.',
    icon: ShieldIcon,
  },
];

export default function TechnicalServicePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="service-hero">
        <div className="container service-hero-inner">
          <div className="service-hero-heading">
            <span className="eyebrow">SERVICIO TÉCNICO</span>
            <h1>
              Tu equipo merece
              <br />
              <em>seguir contigo.</em>
            </h1>
          </div>

          <div className="service-hero-copy">
            <span className="service-status">
              <span aria-hidden="true" /> Atención para equipos Apple
            </span>
            <p>
              ¿Pantalla rota, batería que dura poco o un equipo más lento? Solicita una evaluación y recibe un diagnóstico claro antes de autorizar cualquier reparación.
            </p>
            <a
              className="button button-light"
              href={serviceContactUrl}
              target="_blank"
              rel="noreferrer"
              data-event="whatsapp_service_click"
            >
              <WhatsAppIcon /> Solicitar diagnóstico <span aria-hidden="true">↗</span>
            </a>
        <span className="service-contact-note">+51 921 078 492 · Consultas por WhatsApp las 24 horas</span>
          </div>
        </div>
      </section>

      <section className="service-intro section container" aria-labelledby="service-intro-title">
        <div className="service-intro-heading">
          <span className="eyebrow">IPHONE Y MACBOOK</span>
          <h2 id="service-intro-title">
            Cuéntanos qué le pasa
            <br />
            <em>a tu equipo.</em>
          </h2>
        </div>

        <div className="service-intro-copy">
          <SmartphoneIcon aria-hidden="true" />
          <p>
            Atendemos consultas sobre iPhone y MacBook. Cuéntanos qué sucede para orientarte sobre el diagnóstico, las opciones de reparación y el cuidado que necesita tu equipo.
          </p>
          <div className="service-issue-list" aria-label="Consultas frecuentes">
            {commonIssues.map((issue) => <span key={issue}>{issue}</span>)}
          </div>
        </div>
      </section>

      <section className="service-principles section" aria-labelledby="service-principles-title">
        <div className="container">
          <div className="service-principles-heading">
            <span className="eyebrow">NUESTRA PROPUESTA</span>
            <h2 id="service-principles-title">
              Información clara.
              <br />
              <em>Cuidado en cada paso.</em>
            </h2>
            <p>
              Primero evaluamos el equipo. Antes de empezar, recibirás la explicación del trabajo, su precio, el plazo estimado y las condiciones aplicables.
            </p>
          </div>

          <div className="service-principles-grid">
            {servicePrinciples.map(({ number, title, description, icon: Icon }) => (
              <article className="service-principle-card" key={number}>
                <div className="service-principle-top">
                  <span>{number}</span>
                  <span className="service-principle-icon" aria-hidden="true"><Icon /></span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="service-disclaimer">
            <strong>Agenda una evaluación.</strong>
            <p>Escríbenos con el modelo del equipo y una breve descripción de la falla. Te indicaremos cómo continuar y qué revisar antes de entregarlo.</p>
            <a href={serviceContactUrl} target="_blank" rel="noreferrer" data-event="whatsapp_service_click">
              <WhatsAppIcon /> Contactar al +51 921 078 492 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
