import type { Metadata } from 'next';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { SocialLinks } from '@/components/social/SocialLinks';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { ClockIcon, MailIcon, MapPinIcon, SocialIcon } from '@/components/icons/UiIcons';

const email = 'apfelstorepe@gmail.com';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con Apfel Store por WhatsApp o correo. Atención disponible las 24 horas.',
};

export default function ContactPage() {
  return <main id="main-content" tabIndex={-1}>
    <section className="page-header container contact-hero">
      <span className="eyebrow">CONTÁCTANOS</span>
      <h1>
        Estamos para ayudarte.
        <em>Las 24 horas.</em>
      </h1>
      <p>Cuéntanos qué modelo, capacidad o color buscas. Te ayudaremos a revisar las opciones disponibles y resolver tus dudas.</p>
      <div className="contact-actions">
        <a className="button button-dark" data-event="whatsapp_click" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
          <WhatsAppIcon /> Escribir por WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <a className="contact-email-link" href={`mailto:${email}`}>
          <MailIcon /> Enviar un correo <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <section className="section container contact-grid" aria-labelledby="contact-options-title">
      <div className="contact-intro">
        <span className="eyebrow">CANALES DE ATENCIÓN</span>
        <h2 id="contact-options-title">Elige cómo conversar.</h2>
        <p>Atendemos consultas todos los días. La disponibilidad, precios y condiciones se confirman directamente con un asesor.</p>
      </div>

      <div className="contact-details">
        <a className="contact-detail-card" href={getWhatsAppUrl()} target="_blank" rel="noreferrer" data-event="whatsapp_click">
          <span className="contact-channel-label"><WhatsAppIcon /> WhatsApp</span>
          <strong>+51 921 078 492</strong>
          <small>Iniciar conversación <span aria-hidden="true">↗</span></small>
        </a>
        <a className="contact-detail-card" href={`mailto:${email}`}>
          <span className="contact-channel-label"><MailIcon /> Correo electrónico</span>
          <strong>{email}</strong>
          <small>Redactar correo <span aria-hidden="true">↗</span></small>
        </a>
        <div className="contact-detail-card">
          <span className="contact-channel-label"><ClockIcon /> Horario de atención</span>
          <strong>24 horas</strong>
          <small>Todos los días</small>
        </div>
        <div className="contact-detail-card">
          <span className="contact-channel-label"><MapPinIcon /> Ubicación</span>
          <strong>Lima, Perú</strong>
          <small>Entregas coordinadas según disponibilidad</small>
        </div>
        <div className="contact-detail-card contact-social-card">
          <span className="contact-channel-label"><SocialIcon /> Redes sociales</span>
          <strong>Síguenos en redes</strong>
          <SocialLinks label="Próximas redes sociales de Apfel Store" />
        </div>
      </div>
    </section>
  </main>;
}
