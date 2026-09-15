import Link from 'next/link';

export function HomeQuickLinks() {
  return (
    <section className="section container home-quick-links-section" aria-label="Herramientas destacadas de compra">
      <div className="home-quick-links-grid">
        {/* Compare Card */}
        <div className="quick-link-card compare-card-promo">
          <div className="quick-link-glow" aria-hidden="true" />
          <div className="quick-link-body">
            <div className="quick-link-badge">
              <span aria-hidden="true">⚡</span> HERRAMIENTA OFICIAL
            </div>
            <h2>Compara modelos de iPhone.</h2>
            <p>
              Pantalla, procesadores A-Series, cámaras, Dynamic Island y puertos USB-C. Pon 2 o 3 modelos lado a lado con el filtro de diferencias.
            </p>
            <div className="quick-link-features">
              <span>✓ Vista lado a lado</span>
              <span>✓ Selector de color en vivo</span>
              <span>✓ Solo diferencias</span>
            </div>
            <Link className="button button-light quick-link-cta" href="/comparar">
              Probar el Comparador <span>↗</span>
            </Link>
          </div>
        </div>

        {/* Offers Card */}
        <div className="quick-link-card offers-card-promo">
          <div className="quick-link-glow offers-glow" aria-hidden="true" />
          <div className="quick-link-body">
            <div className="quick-link-badge offers-badge">
              <span aria-hidden="true">🔥</span> DESCUENTOS ACTIVOS
            </div>
            <h2>Ofertas con entrega inmediata.</h2>
            <p>
              Equipos seleccionados con precios de referencia rebajados y hasta S/ 350 de ahorro directo. Unidades limitadas con garantía de tienda.
            </p>
            <div className="quick-link-features">
              <span>✓ Serie 17, 16, 15 y 14</span>
              <span>✓ Ahorro de hasta S/ 350</span>
              <span>✓ Stock en Lima</span>
            </div>
            <Link className="button button-dark quick-link-cta" href="/ofertas">
              Ver todas las ofertas <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

