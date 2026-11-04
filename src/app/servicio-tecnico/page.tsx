import type { Metadata } from 'next';
import Image from 'next/image';
import { ShieldIcon, SmartphoneIcon, ToolIcon } from '@/components/icons/UiIcons';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { AdvisorCard } from '@/components/shared/AdvisorCard';
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
    title: 'Cuéntanos qué sucede',
    description: 'Envíanos por WhatsApp el modelo y una breve descripción de la falla para coordinar la evaluación.',
    icon: WhatsAppIcon,
  },
  {
    number: '02',
    title: 'Revisamos tu equipo',
    description: 'Evaluamos el problema y te comunicamos las opciones de reparación disponibles.',
    icon: ToolIcon,
  },
  {
    number: '03',
    title: 'Tú decides',
    description: 'Antes de autorizar el trabajo, podrás confirmar el precio, el plazo, los repuestos y la garantía.',
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
              Si tu iPhone o MacBook presenta una falla, conversemos para orientarte y coordinar una evaluación.
            </p>
            <a
              className="button button-dark"
              href={serviceContactUrl}
              target="_blank"
              rel="noreferrer"
              data-event="whatsapp_service_click"
            >
              <WhatsAppIcon /> Consultar por WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <span className="service-contact-note">+51 921 078 492 · Consultas por WhatsApp las 24 horas</span>
          </div>
        </div>
        <figure className="container service-hero-visual">
          <Image src="/service/servicio-tecnico-ilustracion.webp" alt="Ilustración de una revisión técnica de un teléfono en una mesa de trabajo" width={1672} height={941} sizes="(max-width: 700px) 100vw, 1240px" priority />
          <figcaption>Imagen ilustrativa</figcaption>
        </figure>
      </section>

      <section className="service-intro section container" aria-labelledby="service-intro-title">
        <div className="service-intro-heading">
          <span className="eyebrow">IPHONE Y MACBOOK</span>
          <h2 id="service-intro-title">
            ¿En qué podemos
            <br />
            <em>ayudarte?</em>
          </h2>
        </div>

        <div className="service-intro-copy">
          <SmartphoneIcon aria-hidden="true" />
          <p>
            Puedes consultarnos por estos problemas o contarnos cualquier otra falla de tu equipo.
          </p>
          <div className="service-issue-list" aria-label="Consultas frecuentes">
            {commonIssues.map((issue) => <span key={issue}>{issue}</span>)}
          </div>
        </div>
      </section>

      <section className="service-principles section" aria-labelledby="service-principles-title">
        <div className="container">
          <div className="service-principles-heading">
            <span className="eyebrow">ASÍ FUNCIONA</span>
            <h2 id="service-principles-title">
              Atención en tres pasos.
              <br />
              <em>Con claridad desde el inicio.</em>
            </h2>
            <p>
              Te acompañamos desde la primera consulta hasta que decidas cómo proceder.
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

          <div className="advisor-spaced"><AdvisorCard eyebrow="SERVICIO TÉCNICO" title="Estamos para ayudarte." description="Conversemos por WhatsApp para indicarte cómo empezar." href={serviceContactUrl} label="Consultar servicio técnico" event="whatsapp_service_click" /></div>
        </div>
      </section>
    </main>
  );
}
