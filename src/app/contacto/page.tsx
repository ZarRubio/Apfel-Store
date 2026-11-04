import type { Metadata } from 'next';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { ClockIcon, MailIcon, MapPinIcon } from '@/components/icons/UiIcons';

const email = 'apfelstorepe@gmail.com';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con Apfel Store por WhatsApp o correo. Atención disponible las 24 horas.',
};

export default function ContactPage() {
  return <main id="main-content" className="contact-page" tabIndex={-1}>
    <section className="page-header container contact-hero">
      <div className="contact-hero-copy">
        <span className="eyebrow">CONTÁCTANOS</span>
        <h1>Conversemos.<em>Estamos para ayudarte.</em></h1>
        <p>¿Tienes dudas sobre un equipo, un pedido o el servicio técnico? Cuéntanos qué necesitas y te orientamos.</p>
        <div className="contact-actions">
          <a className="button button-dark" data-event="whatsapp_click" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Escribir por WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <a className="contact-email-link" href={`mailto:${email}`}><MailIcon /> Enviar un correo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <figure className="contact-hero-visual" style={{ position: 'relative', width: '100%', aspectRatio: '5 / 4', overflow: 'hidden', borderRadius: 20 }}>
        <Image src="/contact/contacto-ilustrativo.webp" alt="Ilustración de una persona comunicándose por teléfono" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
        <figcaption>Imagen ilustrativa</figcaption>
      </figure>
    </section>

    <section className="section container contact-grid" aria-labelledby="contact-options-title">
      <div className="contact-intro">
        <span className="eyebrow">CANALES DE ATENCIÓN</span>
        <h2 id="contact-options-title">Elige cómo contactarnos.</h2>
        <p>Escríbenos por WhatsApp o correo y coordinemos los detalles de tu consulta.</p>
      </div>

      <div className="contact-details">
        <a className="contact-detail-card" href={getWhatsAppUrl()} target="_blank" rel="noreferrer" data-event="whatsapp_click">
          <span className="contact-channel-label"><WhatsAppIcon /> WhatsApp</span>
          <strong>+51 921 078 492</strong>
          <small>Iniciar conversación <span aria-hidden="true">↗</span></small>
        </a>
        <a className="contact-detail-card contact-email-card" href={`mailto:${email}`}>
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
      </div>
    </section>
  </main>;
}
