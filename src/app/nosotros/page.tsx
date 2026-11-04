import type { Metadata } from 'next';
import Image from 'next/image';
import { AdvisorCard } from '@/components/shared/AdvisorCard';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { SmartphoneIcon, TagIcon, UsersIcon } from '@/components/icons/UiIcons';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la forma de comprar iPhone en Apfel Store.',
};

const benefits = [
  {
    number: '01',
    title: 'Más con tu iPhone',
    description: 'Por la compra de un iPhone llevas siete accesorios gratis. Consulta cuáles incluye la promoción.',
    icon: TagIcon,
  },
  {
    number: '02',
    title: 'Opciones para elegir',
    description: 'Explora modelos, colores y capacidades, y consulta la disponibilidad de cada equipo.',
    icon: SmartphoneIcon,
  },
  {
    number: '03',
    title: 'Atención personalizada',
    description: 'Conversa con un asesor por WhatsApp para resolver tus dudas y coordinar tu compra.',
    icon: UsersIcon,
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page" tabIndex={-1}>
      <section className="page-header about-hero container">
        <div className="about-hero-copy">
          <span className="eyebrow">APFEL STORE</span>
          <h1>Tu próximo iPhone, <em>con atención cercana.</em></h1>
          <p>Te ayudamos a elegir un equipo que vaya contigo y a resolver tus dudas antes de comprar.</p>
        </div>
        <figure className="about-hero-visual" style={{ position: 'relative', width: '100%', aspectRatio: '5 / 4', overflow: 'hidden', borderRadius: 20 }}>
          <Image src="/about/atencion-ilustrativa.webp" alt="Ilustración de una persona recibiendo atención para elegir un teléfono" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
          <figcaption>Imagen ilustrativa</figcaption>
        </figure>
      </section>

      <section className="about-story section container" aria-labelledby="about-story-title">
        <div className="about-story-heading">
          <span className="eyebrow">QUIÉNES SOMOS</span>
          <h2 id="about-story-title">
            Una compra que empieza
            <br />
            con confianza.
          </h2>
        </div>
        <div className="about-story-copy">
          <p>
            En Apfel Store sabemos que cada persona busca algo distinto. Por eso puedes comparar nuestras opciones y conversar con nosotros antes de decidir.
          </p>
          <p>
            Agradecemos a quienes confían en nosotros para renovar su equipo. Su confianza nos impulsa a seguir mejorando cada experiencia de compra.
          </p>
        </div>
      </section>

      <section className="about-benefits section" aria-labelledby="about-benefits-title">
        <div className="container">
          <div className="about-benefits-heading">
            <span className="eyebrow">¿POR QUÉ ELEGIRNOS?</span>
            <h2 id="about-benefits-title">
              Lo que encuentras
              <br />
              <em>en Apfel Store.</em>
            </h2>
            <p>
              Equipos, accesorios y acompañamiento para elegir con tranquilidad.
            </p>
          </div>

          <div className="about-benefit-grid">
            {benefits.map(({ number, title, description, icon: Icon }) => (
              <article className="about-benefit-card" key={number}>
                <div className="about-benefit-top">
                  <span>{number}</span>
                  <span className="about-benefit-icon" aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="container advisor-section"><AdvisorCard eyebrow="APFEL STORE" title="¿Quieres conocernos mejor?" description="Estamos aquí para ayudarte en tu próxima compra." href={getWhatsAppUrl()} label="Hablar con nosotros" /></div>
    </main>
  );
}
