import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function Hero({ product }: { product: Product }) {
  return <section className="hero-section legacy-hero"><div className="legacy-hero-glow" aria-hidden="true" /><div className="legacy-hero-copy"><span className="eyebrow">LA EXPERIENCIA APFEL</span><h1>iPhone.<br /><em>A tu<br className="mobile-break" /> manera.</em></h1><p>El modelo que quieres.<br />La atención que necesitas.</p><div className="hero-actions"><Link className="button button-light" href="/productos">Encuentra tu iPhone <span>↗</span></Link><a className="text-link hero-secondary" data-event="whatsapp_click" href={getWhatsAppUrl(product)} target="_blank" rel="noreferrer">Consultar por WhatsApp ↗</a></div></div><div className="legacy-hero-product"><span className="legacy-watermark" aria-hidden="true">PRO</span><Link href={`/iphone/${product.slug}`} data-event="product_view" data-product-id={product.id} aria-label={`Ver ${product.name}`}><Image src="/images/products/17-pro-silver.webp" alt={product.name} width={400} height={417} priority /></Link><div className="legacy-product-caption"><span>{product.name}</span><strong>Desde {formatPrice(product.price)}</strong></div></div><div className="legacy-hero-footer"><span>01 / ENCUENTRA EL TUYO</span><span>Diseñado para tu día. Elegido por ti.</span></div></section>;
}
