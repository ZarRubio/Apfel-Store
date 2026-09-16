import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/formatPrice';
import { getProductImage } from '@/lib/productImage';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import type { CompareProduct } from './types';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { ChevronRightIcon, XCircleIcon } from '@/components/icons/UiIcons';

interface ProductGroup {
  series: string;
  items: CompareProduct[];
}

interface CompareDeviceCardProps {
  product: CompareProduct;
  index: number;
  activeColorName: string;
  groups: ProductGroup[];
  canRemove: boolean;
  selectedSlugs: string[];
  onModelChange: (index: number, slug: string) => void;
  onColorChange: (index: number, color: string) => void;
  onRemove: (index: number) => void;
}

export function CompareDeviceCard({
  product,
  index,
  activeColorName,
  groups,
  canRemove,
  selectedSlugs,
  onModelChange,
  onColorChange,
  onRemove,
}: CompareDeviceCardProps) {
  const activeColor = product.colors.find((color) => color.name === activeColorName) ?? product.colors[0];
  const displayImage = getProductImage(activeColor?.image ?? product.fallbackImage);
  const hasOffer = Boolean(product.offer && product.price && product.previousPrice && product.previousPrice > product.price);
  const savings = hasOffer && product.price && product.previousPrice ? product.previousPrice - product.price : 0;

  return <article className="compare-device-card">
    <div className="compare-select-wrap">
      <div className="compare-select-heading">
        <label className="compare-select-label" htmlFor={`select-model-${index}`}>Modelo {index + 1}</label>
        {canRemove && <button
          type="button"
          className="compare-remove-button"
          onClick={() => onRemove(index)}
          aria-label={`Quitar ${product.name} de la comparación`}
        >
          <XCircleIcon /> Quitar
        </button>}
      </div>
      <select
        id={`select-model-${index}`}
        className="compare-select-element"
        value={product.slug}
        onChange={(event) => onModelChange(index, event.target.value)}
      >
        {groups.map((group) => <optgroup key={group.series} label={`Serie ${group.series}`}>
          {group.items.map((option) => <option
            key={option.slug}
            value={option.slug}
            disabled={option.slug !== product.slug && selectedSlugs.includes(option.slug)}
          >
            {option.name}
          </option>)}
        </optgroup>)}
      </select>
    </div>

    <div className="compare-device-visual">
      <Image
        src={displayImage}
        alt={`${product.name} en color ${activeColorName}`}
        width={220}
        height={220}
        priority={index < 2}
        sizes="(max-width: 680px) 80vw, (max-width: 960px) 40vw, 24vw"
      />
    </div>

    <div className="compare-swatches-row" role="radiogroup" aria-label={`Color de ${product.name}`}>
      {product.colors.map((color) => {
        const isSelected = color.name === activeColorName;
        return <button
          key={color.name}
          type="button"
          role="radio"
          aria-checked={isSelected}
          aria-label={`${color.name}${isSelected ? ', seleccionado' : ''}`}
          title={color.name}
          className={`compare-swatch-button ${isSelected ? 'active' : ''}`}
          onClick={() => onColorChange(index, color.name)}
        >
          <span className="compare-swatch-dot" style={{ backgroundColor: color.hex }} aria-hidden="true" />
        </button>;
      })}
    </div>
    <p className="compare-color-caption" aria-live="polite">{activeColorName}</p>

    <div className="compare-card-title-wrap">
      {product.reservationOnly && <span className="compare-card-badge">Serie 18 · Solicita reserva</span>}
      {hasOffer && <span className="compare-card-badge compare-card-badge-offer">Oferta especial</span>}
      {!product.reservationOnly && !hasOffer && product.new && <span className="compare-card-badge">Novedad</span>}
      <h2 className="compare-card-title">{product.name}</h2>
      <div className="compare-card-price-row">
        {product.price === null
          ? <span className="compare-card-price">Por confirmar</span>
          : <>
            <span className="compare-card-price">{formatPrice(product.price)}</span>
            {product.previousPrice && <span className="compare-card-old-price">{formatPrice(product.previousPrice)}</span>}
          </>}
      </div>
      {hasOffer && <span className="compare-card-savings">Ahorras {formatPrice(savings)}</span>}
    </div>

    <div className="compare-card-actions">
      <a
        className="compare-btn-primary"
        href={getWhatsAppUrl({ product, color: activeColorName })}
        target="_blank"
        rel="noreferrer"
        data-event="whatsapp_compare_click"
      >
        <WhatsAppIcon /> {product.reservationOnly ? 'Consultar reserva' : 'Consultar por WhatsApp'} <span aria-hidden="true">↗</span>
      </a>
      <Link className="compare-btn-secondary" href={`/iphone/${product.slug}`}>
        Ver ficha completa <ChevronRightIcon />
      </Link>
    </div>
  </article>;
}
