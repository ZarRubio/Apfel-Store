import type { Metadata } from 'next';
import { WhatsAppCta } from '@/components/home/WhatsAppCta';
import { SmartphoneIcon, TagIcon, UsersIcon } from '@/components/icons/UiIcons';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la forma de comprar iPhone en Apfel Store.',
};

const benefits = [
  {
    number: '01',
    title: 'Oportunidades exclusivas',
    description: 'Promociones pensadas para que encuentres el equipo que buscas con una propuesta clara.',
    icon: TagIcon,
  },
  {
    number: '02',
    title: 'Tecnología de punta',
    description: 'Seleccionamos iPhone para ayudarte a renovar tu equipo y acompañar mejor tu día a día.',
    icon: SmartphoneIcon,
  },
  {
    number: '03',
    title: 'Atención personalizada',
    description: 'Escuchamos lo que necesitas y te orientamos en modelo, capacidad, color y disponibilidad.',
    icon: UsersIcon,
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-header about-hero container">
        <span className="eyebrow">APFEL STORE</span>
        <h1>
          Acerca de
          <br />
          <em>nosotros.</em>
        </h1>
        <p>
          Creemos que una buena compra empieza con información clara, atención cercana y la libertad de elegir sin presión.
        </p>
      </section>

      <section className="about-story section container" aria-labelledby="about-story-title">
        <div className="about-story-heading">
          <span className="eyebrow">NUESTRA FORMA</span>
          <h2 id="about-story-title">
            La conversación
            <br />
            es parte del producto.
          </h2>
        </div>
        <div className="about-story-copy">
          <p>
            Cada persona usa su iPhone de una manera distinta. Por eso te ayudamos a comparar modelos, capacidades, colores, condición y disponibilidad antes de coordinar tu compra.
          </p>
          <p>
            Nuestra mayor satisfacción es que renueves tu equipo con confianza y tengas claro qué estás eligiendo en cada paso.
          </p>
        </div>
      </section>

      <section className="about-benefits section" aria-labelledby="about-benefits-title">
        <div className="container">
          <div className="about-benefits-heading">
            <span className="eyebrow">¿POR QUÉ ELEGIRNOS?</span>
            <h2 id="about-benefits-title">
              Beneficios reales.
              <br />
              <em>Una elección más simple.</em>
            </h2>
            <p>
              Nuestra comunidad sigue creciendo porque ponemos la orientación y la claridad en el centro de cada compra.
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

      <section className="about-community section container" aria-labelledby="about-community-title">
        <span className="eyebrow">COMUNIDAD APFEL</span>
        <div className="about-community-layout">
          <h2 id="about-community-title">
            Tu próxima experiencia
            <br />
            <em>empieza aquí.</em>
          </h2>
          <p>
            Ya sea que busques tu primer iPhone o quieras renovar el actual, te ayudamos a encontrar una opción que encaje contigo y a confirmar todos los detalles antes de comprar.
          </p>
        </div>
      </section>

      <WhatsAppCta />
    </main>
  );
}
