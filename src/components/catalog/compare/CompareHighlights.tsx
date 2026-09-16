import { getVerifiedSpec } from './compareData';
import type { CompareProduct } from './types';
import { CameraIcon, ConnectivityIcon, ProcessorIcon, SmartphoneIcon } from '@/components/icons/UiIcons';

const highlights = [
  { label: 'Pantalla', icon: SmartphoneIcon },
  { label: 'Procesador', icon: ProcessorIcon },
  { label: 'Cámara', icon: CameraIcon },
  { label: 'Conectividad', icon: ConnectivityIcon },
] as const;

export function CompareHighlights({ products }: { products: CompareProduct[] }) {
  return <section className="compare-highlights-section" aria-labelledby="highlights-heading">
    <div className="compare-section-header">
      <h2 id="highlights-heading">Resumen de datos verificados</h2>
    </div>
    <div className="compare-highlights-grid">
      {highlights.map((highlight) => <article key={highlight.label} className="compare-highlight-card">
        <span className="compare-highlight-icon"><highlight.icon /></span>
        <h3 className="compare-highlight-label">{highlight.label}</h3>
        <div className="compare-highlight-values">
          {products.map((product) => <p key={product.slug} className="compare-highlight-val-item">
            <small>{product.name}</small>
            {getVerifiedSpec(product, highlight.label)}
          </p>)}
        </div>
      </article>)}
    </div>
  </section>;
}
