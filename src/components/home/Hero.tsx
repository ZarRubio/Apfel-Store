import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { getProductImage } from '@/lib/productImage';

export function Hero({ product }: { product: Product }) {
  return <section className="hero-section legacy-hero iphone18-hero">
    <div className="legacy-hero-glow" aria-hidden="true" />
    <div className="legacy-hero-copy">
      <span className="eyebrow">NUEVA SERIE · SOLICITUDES DE RESERVA</span>
      <h1>iPhone 18 Pro.<br /><em>Haz espacio<br className="mobile-break" /> para más.</em></h1>
      <p>Conoce los nuevos Pro y Pro Max. Elige el color y la capacidad que prefieres; te ayudamos a confirmar los detalles.</p>
      <div className="hero-actions"><Link className="button button-light" href={`/iphone/${product.slug}`}>Solicitar reserva <span>↗</span></Link><Link className="text-link hero-secondary" href="/productos?serie=18">Explorar la serie 18 ↗</Link></div>
      <span className="hero-reservation-note">Precio, disponibilidad y condiciones por confirmar.</span>
    </div>
    <div className="legacy-hero-product">
      <span className="legacy-watermark" aria-hidden="true">18</span>
      <Link href={`/iphone/${product.slug}`} data-event="product_view" data-product-id={product.id} aria-label={`Ver ${product.name}`}><Image src={getProductImage(product.colors[2].image)} alt={`Ilustración referencial de ${product.name} en color glaciar`} width={1200} height={1200} priority /></Link>
      <div className="legacy-product-caption"><span>{product.name} · Imagen ilustrativa</span><strong>Solicita tu reserva</strong></div>
    </div>
    <div className="legacy-hero-footer"><span>01 / LA NUEVA SERIE</span><span>Tu elección, a tu ritmo.</span></div>
  </section>;
}
