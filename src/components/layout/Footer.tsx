import Link from 'next/link';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { SocialLinks } from '@/components/social/SocialLinks';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const currentYear = new Date().getFullYear();

const footerLinks = {
  productos: {
    label: 'Productos',
    links: [
      { name: 'iPhone 18 Pro Max', href: '/iphone/iphone-18-pro-max' },
      { name: 'iPhone 18 Pro', href: '/iphone/iphone-18-pro' },
      { name: 'iPhone 16 Pro Max', href: '/iphone/iphone-16-pro-max' },
      { name: 'Todos los modelos', href: '/productos' },
      { name: 'Comparar modelos', href: '/comparar' },
      { name: 'Ofertas', href: '/ofertas' },
    ],
  },
  empresa: {
    label: 'Empresa',
    links: [
      { name: 'Nosotros', href: '/nosotros' },
      { name: 'Contacto', href: '/contacto' },
    ],
  },
  soporte: {
    label: 'Soporte',
    links: [
      { name: 'Servicio técnico', href: '/servicio-tecnico' },
      { name: 'Preguntas frecuentes', href: '/#preguntas' },
      { name: 'Consultar garantía y condiciones', href: '/contacto' },
      { name: 'Consultar opciones de entrega', href: '/contacto' },
    ],
  },
};

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      {/* ── Top: Newsletter / CTA band ── */}
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div className="footer-cta-copy">
            <span className="eyebrow">Mantente al día</span>
            <p className="footer-cta-headline">
              Conoce las novedades y resuelve tus dudas por WhatsApp.
            </p>
          </div>
          <a
            className="button button-ghost footer-cta-button"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            data-event="whatsapp_click"
          >
            <WhatsAppIcon /> Escríbenos por WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link className="wordmark footer-wordmark" href="/">
              <Image
                className="wordmark-mark"
                src="/images/brand/apfel-logo.jpg"
                alt=""
                width={58}
                height={58}
              />
              <span>
                <span>APFEL</span><b>STORE</b>
              </span>
            </Link>
            <p className="footer-tagline">
              Tu próximo iPhone comienza aquí. Atención humana, productos
              seleccionados y la mejor experiencia de compra en Lima.
            </p>
            <div className="footer-location">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Lima, Perú</span>
            </div>
            <div className="footer-socials">
              <span className="footer-socials-label">Síguenos</span>
              <SocialLinks label="Redes sociales de Apfel Store" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <nav key={key} className="footer-nav" aria-label={section.label}>
              <p className="footer-label">{section.label}</p>
              <ul className="footer-link-list">
                {section.links.map((link) => (
                  <li key={link.href + link.name}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Trust badges */}
        <div className="footer-trust">
          <div className="footer-trust-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div>
              <strong>Garantía y condiciones</strong>
              <span>Consúltalas con un asesor</span>
            </div>
          </div>
          <div className="footer-trust-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="1" y="3" width="15" height="13" rx="2" />
              <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2h-1" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div>
              <strong>Opciones de entrega</strong>
              <span>Se coordinan según disponibilidad</span>
            </div>
          </div>
          <div className="footer-trust-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div>
              <strong>Atención personalizada</strong>
              <span>Asesoría por WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom">
          <div className="footer-legal">
            <span>© {currentYear} Apfel Store. Todos los derechos reservados.</span>
            <span className="footer-separator" aria-hidden="true">·</span>
            <span>Precios y disponibilidad por confirmar.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
