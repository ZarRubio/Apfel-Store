import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { getCardImage } from '@/lib/productImage';
import { ChevronRightIcon, SparklesIcon } from '@/components/icons/UiIcons';

export function ProductCard({ product, sizes = '(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw' }: { product: Product; sizes?: string }) {
  const hasOffer = product.offer && product.price !== null && product.previousPrice !== undefined && product.previousPrice > product.price;
  const savings = hasOffer && product.price !== null && product.previousPrice ? product.previousPrice - product.price : 0;
  const percent = hasOffer && product.price !== null && product.previousPrice ? Math.round((savings / product.previousPrice) * 100) : 0;

  return <article className={`product-card ${hasOffer ? 'is-offer' : ''}`}>
    <Link className="product-card-link" href={`/iphone/${product.slug}`} aria-label={`${product.reservationOnly ? 'Configurar y solicitar reserva de' : 'Ver detalles de'} ${product.name}`}>
      <span className="product-card-image">
        <Image src={getCardImage(product)} alt={product.illustrativeImages ? `Ilustración referencial de ${product.name}` : product.name} fill sizes={sizes} />
        {hasOffer && (
          <span className="offer-floating-tag">
            <span className="offer-tag-icon" aria-hidden="true"><SparklesIcon /></span> -{percent}%
          </span>
        )}
      </span>
      <div className="product-card-body">
      <div className="badge-row">
        {product.reservationOnly && <span className="badge badge-new">Solicita tu reserva</span>}
        {product.new && !product.reservationOnly && !hasOffer && <span className="badge badge-new">Nuevo</span>}
        {hasOffer && (
          <span className="badge badge-offer-pulse">
            <span className="offer-beacon-dot" aria-hidden="true" />
            <span>Oferta especial</span>
          </span>
        )}
      </div>
      <h3>{product.name}</h3>
      <p className="muted">{product.shortDescription}</p>
      <div className="product-card-bottom">
        <div>
          {product.price === null ? (
            <><span className="from-label">Precio</span><strong>Por confirmar</strong></>
          ) : hasOffer ? (
            <div className="price-offer-wrap">
              <span className="from-label offer-label-text">Precio de oferta</span>
              <div className="price-row-offer">
                <strong className="offer-price-highlight">{formatPrice(product.price)}</strong>
                {product.previousPrice && <del className="offer-original-price">{formatPrice(product.previousPrice)}</del>}
              </div>
              <span className="savings-chip">Ahorras {formatPrice(savings)}</span>
            </div>
          ) : (
            <><span className="from-label">Desde</span><strong>{formatPrice(product.price)}</strong>{product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}</>
          )}
        </div>
        <span className="swatches" aria-label={`Colores disponibles: ${product.colors.map(color => color.name).join(', ')}`}>{product.colors.map((color) => <span key={color.name} aria-hidden="true" style={{ backgroundColor: color.hex }} />)}</span>
      </div>
      {product.illustrativeImages && <span className="product-art-note">Imagen ilustrativa</span>}
      <span className="card-cta">{product.reservationOnly ? 'Elegir y solicitar reserva' : hasOffer ? 'Aprovechar oferta' : 'Ver detalles'} <ChevronRightIcon /></span>
      </div>
    </Link>
  </article>;
}
