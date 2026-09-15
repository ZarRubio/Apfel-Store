import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { getCardImage } from '@/lib/productImage';

export function ProductCard({ product, sizes = '(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw' }: { product: Product; sizes?: string }) {
  const offer = product.price !== null && product.previousPrice !== undefined && product.previousPrice > product.price;
  return <article className="product-card">
    <Link className="product-card-link" href={`/iphone/${product.slug}`} aria-label={`${product.reservationOnly ? 'Configurar y solicitar reserva de' : 'Ver detalles de'} ${product.name}`}>
      <span className="product-card-image">
        <Image src={getCardImage(product)} alt={product.illustrativeImages ? `Ilustración referencial de ${product.name}` : product.name} fill sizes={sizes} />
      </span>
      <div className="product-card-body">
      <div className="badge-row">{product.reservationOnly && <span className="badge badge-new">Solicita tu reserva</span>}{product.new && !product.reservationOnly && <span className="badge badge-new">Nuevo</span>}{product.offer && offer && <span className="badge badge-offer">Oferta</span>}</div>
      <h3>{product.name}</h3>
      <p className="muted">{product.shortDescription}</p>
      <div className="product-card-bottom">
        <div>{product.price === null ? <><span className="from-label">Precio</span><strong>Por confirmar</strong></> : <><span className="from-label">Desde</span><strong>{formatPrice(product.price)}</strong>{product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}</>}</div>
        <span className="swatches" aria-label={`Colores disponibles: ${product.colors.map(color => color.name).join(', ')}`}>{product.colors.map((color) => <span key={color.name} aria-hidden="true" style={{ backgroundColor: color.hex }} />)}</span>
      </div>
      {product.illustrativeImages && <span className="product-art-note">Imagen ilustrativa</span>}
      <span className="card-cta">{product.reservationOnly ? 'Elegir y solicitar reserva' : 'Ver detalles'} <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  </article>;
}
