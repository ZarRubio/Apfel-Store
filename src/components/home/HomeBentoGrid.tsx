import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function HomeBentoGrid() {
  return (
    <section className="section container home-bento-section" aria-labelledby="bento-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ESTÁNDAR APFEL STORE</span>
          <h2 id="bento-heading">Comprar tu iPhone con total tranquilidad.</h2>
        </div>
        <p>
          Información clara, fotos del equipo real y garantía por escrito.<br />
          Sin sorpresas ni letra chica.
        </p>
      </div>

      <div className="bento-grid">
        {/* Card 1: Sellados vs Exhibición */}
        <div className="bento-card bento-card-large">
          <div className="bento-card-content">
            <span className="bento-badge">TRANSPARENCIA TOTAL</span>
            <h3>Sellados vs. Exhibición</h3>
            <p>
              Tú decides cómo comprar. Te explicamos cada condición con honestidad para que elijas según tu presupuesto y expectativas:
            </p>
            <div className="bento-compare-mini">
              <div className="bento-condition-col">
                <span className="bento-condition-pill sealed">📦 Sellado</span>
                <strong>Caja de fábrica</strong>
                <small>0 ciclos de batería, accesorios originales sin abrir y garantía completa.</small>
              </div>
              <div className="bento-condition-col">
                <span className="bento-condition-pill display">✨ Exhibición</span>
                <strong>Estado impecable</strong>
                <small>Inspeccionado en 30+ puntos técnicos, batería saludable y ahorro significativo.</small>
              </div>
            </div>
          </div>
          <div className="bento-card-image-wrap">
            <Image
              src="/images/products/16-pro-natural.webp"
              alt="iPhone en condición impecable"
              width={340}
              height={340}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Card 2: Batería Garantizada */}
        <div className="bento-card bento-card-battery">
          <div className="bento-icon-circle">🔋</div>
          <span className="bento-badge">RENDIMIENTO ÓPTIMO</span>
          <h3>Salud de Batería Garantizada</h3>
          <p>
            Todos nuestros equipos de exhibición cuentan con salud de batería entre <strong>85% y 100%</strong> sin mensajes de pieza desconocida.
          </p>
          <div className="bento-battery-meter">
            <div className="bento-battery-bar" style={{ width: '92%' }} />
            <span>Condición verificada · 92% a 100%</span>
          </div>
        </div>

        {/* Card 3: Trade-in / Renovación */}
        <div className="bento-card bento-card-tradein">
          <div className="bento-icon-circle">🔄</div>
          <span className="bento-badge">RENOVACIÓN ÁGIL</span>
          <h3>Deja tu iPhone en parte de pago</h3>
          <p>
            Cotizamos tu modelo actual en minutos vía WhatsApp para que des el salto al iPhone que deseas pagando solo la diferencia.
          </p>
          <a
            className="bento-link"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            data-event="whatsapp_tradein_click"
          >
            Cotizar mi iPhone actual <span>↗</span>
          </a>
        </div>

        {/* Card 4: Cobertura Nacional */}
        <div className="bento-card bento-card-shipping">
          <div className="bento-icon-circle">🚚</div>
          <span className="bento-badge">COBERTURA NACIONAL</span>
          <h3>Envíos asegurados a todo el Perú</h3>
          <p>
            Entregas el mismo día en Lima y envíos a provincia vía <strong>Olva Courier</strong> y <strong>Shalom</strong> con número de guía y seguro de tránsito.
          </p>
          <div className="bento-shipping-tags">
            <span>Lima en 2-4 horas</span>
            <span>Arequipa</span>
            <span>Trujillo</span>
            <span>Cusco</span>
            <span>Chiclayo</span>
            <span>+24 ciudades</span>
          </div>
        </div>
      </div>
    </section>
  );
}
