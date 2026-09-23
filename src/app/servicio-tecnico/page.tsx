import type { Metadata } from 'next';
import { ClockIcon, ShieldIcon, SmartphoneIcon, ToolIcon } from '@/components/icons/UiIcons';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import '../styles/service.css';

export const metadata: Metadata = {
  title: 'Servicio técnico',
  description: 'Conoce la próxima área de servicio técnico de Apfel Store para iPhone y MacBook.',
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
    title: 'Atención ágil',
    description: 'Buscamos que recibas orientación clara desde el primer contacto y conozcas el siguiente paso.',
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
              <span aria-hidden="true" /> Información en preparación
            </span>
            <p>
              ¿Pantalla rota, batería con poca duración o un equipo más lento de lo habitual? Cuéntanos qué sucede y te orientaremos sobre los próximos pasos.
            </p>
            <a
              className="button button-light"
              href={serviceContactUrl}
              target="_blank"
              rel="noreferrer"
              data-event="whatsapp_service_click"
            >
              <WhatsAppIcon /> Consultar por WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <span className="service-contact-note">+51 921 078 492 · Atención por WhatsApp las 24 horas</span>
          </div>
        </div>
      </section>

      <section className="service-intro section container" aria-labelledby="service-intro-title">
        <div className="service-intro-heading">
          <span className="eyebrow">ESTAMOS PREPARÁNDONOS</span>
          <h2 id="service-intro-title">
            Cuéntanos qué le pasa
            <br />
            <em>a tu equipo.</em>
          </h2>
        </div>

        <div className="service-intro-copy">
          <SmartphoneIcon aria-hidden="true" />
          <p>
            Desde el iPhone que te acompaña todos los días hasta tu MacBook, estamos definiendo una atención técnica enfocada en evaluar cada caso con claridad.
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
              Publicaremos los equipos admitidos, servicios, precios, tiempos y condiciones cuando el área esté completamente confirmada.
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
            <strong>Servicio en preparación.</strong>
            <p>Por el momento no recibimos equipos desde esta página. Escríbenos para conocer las novedades y el alcance disponible.</p>
            <a href={serviceContactUrl} target="_blank" rel="noreferrer" data-event="whatsapp_service_click">
              <WhatsAppIcon /> Escríbenos al +51 921 078 492 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
