'use client';

import Image from 'next/image';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { getProductImage } from '@/lib/productImage';
import { toQueryValue } from '@/lib/queryValue';
import { replaceLocationSearch, useLocationSearch } from '@/lib/useLocationSearch';

export function ProductConfigurator({ product }: { product: Product }) {
  const search = useLocationSearch();
  const params = new URLSearchParams(search);
  const requestedColor = params.get('color');
  const requestedStorage = params.get('capacidad');
  const colorIndex = Math.max(0, product.colors.findIndex(item => toQueryValue(item.name) === requestedColor));
  const storageIndex = Math.max(0, product.storage.findIndex(item => toQueryValue(item.capacity) === requestedStorage));
  const color = product.colors[colorIndex];
  const storage = product.storage[storageIndex];
  const reservation = product.reservationOnly === true;
  const imageIndex = Math.max(0, product.images.indexOf(color.image));
  const selectedImage = getProductImage(color.image);
  const whatsappUrl = getWhatsAppUrl(product, storage.capacity, color.name);
  const price = storage.price === null ? 'Por confirmar' : formatPrice(storage.price);

  function updateSelection(name: 'color' | 'capacidad', value: string) {
    const next = new URLSearchParams(window.location.search);
    next.set(name, toQueryValue(value));
    replaceLocationSearch(next);
  }

  return <div className="product-detail-grid">
    <div className="product-gallery">
      <div className="product-main-image">
        <span className="product-image-label">{product.illustrativeImages ? 'IMAGEN ILUSTRATIVA' : product.new ? 'NUEVO' : 'APFEL STORE'}</span>
        <Image key={selectedImage} className="gallery-active-image" src={selectedImage} alt={product.illustrativeImages ? `Ilustración referencial de ${product.name} en ${color.name}` : `${product.name}, ${color.name}`} fill sizes="(max-width: 900px) 100vw, 55vw" priority />
      </div>
      <div className="thumbnail-row">{product.images.map((image, index) => { const relatedColor = product.colors.find(item => item.image === image); return <button key={image} type="button" className={imageIndex === index ? 'thumbnail active' : 'thumbnail'} onClick={() => relatedColor && updateSelection('color', relatedColor.name)} aria-label={`Ver ${relatedColor?.name ?? `imagen ${index + 1}`}`} aria-pressed={imageIndex === index}><Image src={getProductImage(image)} alt="" fill sizes="80px" /></button>; })}</div>
    </div>
    <div className="product-detail-copy">
      <span className="eyebrow">{reservation ? 'SOLICITA TU RESERVA' : product.new ? 'NUEVO' : product.offer && product.previousPrice && product.price !== null && product.previousPrice > product.price ? 'SELECCIÓN ESPECIAL' : 'APFEL STORE'}</span>
      <h1>{product.name}</h1>
      <p className="detail-lead">{product.description}</p>
      <div className="detail-price" aria-live="polite" aria-atomic="true"><strong>{price}</strong>{!reservation && storageIndex === 0 && product.previousPrice && storage.price !== null && product.previousPrice > storage.price && <del>{formatPrice(product.previousPrice)}</del>}<span>{reservation ? 'Precio y disponibilidad en Perú pendientes de confirmación' : 'Precio de referencia al contado'}</span></div>
      <fieldset className="selector"><legend>Color: <b>{color.name}</b></legend><div className="color-selector">{product.colors.map((item, index) => <button key={item.name} type="button" className={colorIndex === index ? 'color-choice selected' : 'color-choice'} style={{ '--swatch': item.hex } as React.CSSProperties} onClick={() => updateSelection('color', item.name)} aria-label={item.name} aria-pressed={colorIndex === index}><span /></button>)}</div></fieldset>
      <fieldset className="selector"><legend>Capacidad</legend><div className="storage-selector">{product.storage.map((item, index) => <button key={item.capacity} type="button" className={storageIndex === index ? 'storage-choice selected' : 'storage-choice'} onClick={() => updateSelection('capacidad', item.capacity)} aria-pressed={storageIndex === index}><b>{item.capacity}</b><span>{item.price === null ? 'Por confirmar' : formatPrice(item.price)}</span></button>)}</div></fieldset>
      <p className={product.available === true ? 'availability' : 'availability unavailable'}><span /> {reservation ? 'Reserva sujeta a confirmación' : product.available === true ? 'Disponible para coordinar' : product.available === false ? 'No disponible temporalmente' : 'Disponibilidad por confirmar'}</p>
      <a className="button button-dark full-button" data-event="whatsapp_click" data-product-id={product.id} href={whatsappUrl} target="_blank" rel="noreferrer">{reservation ? 'Solicitar reserva por WhatsApp ↗' : product.available === true ? 'Consultar por WhatsApp ↗' : 'Consultar disponibilidad ↗'}</a>
      <p className="purchase-note">{reservation ? 'Tu mensaje solicita una reserva; un asesor deberá confirmar precio, disponibilidad, condiciones, garantía y entrega antes de cualquier pago.' : 'Un asesor confirmará disponibilidad, precio final y opciones de entrega antes del pago.'}</p>
    </div>
    <div className="mobile-buy-bar"><span>{price}</span><a className="button button-dark" data-event="whatsapp_click" data-product-id={product.id} href={whatsappUrl} target="_blank" rel="noreferrer">{reservation ? 'Solicitar reserva ↗' : 'WhatsApp ↗'}</a></div>
  </div>;
}
