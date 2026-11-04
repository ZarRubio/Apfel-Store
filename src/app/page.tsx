import Link from 'next/link';
import { getFeaturedProducts, getProductBySlug } from '@/lib/products';
import { Hero } from '@/components/home/Hero';
import { ServiceStrip } from '@/components/home/ServiceStrip';
import { PurchaseSteps } from '@/components/home/PurchaseSteps';
import { FaqSection } from '@/components/home/FaqSection';
import { ContactBand } from '@/components/home/ContactBand';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { CustomerDeliveries } from '@/components/home/CustomerDeliveries';
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';
import { Reveal } from '@/components/animations/Reveal';
import { ChevronRightIcon } from '@/components/icons/UiIcons';

export default async function HomePage() {
  const [featured, heroProduct] = await Promise.all([getFeaturedProducts(), getProductBySlug('iphone-18-pro-max')]);
  if (!heroProduct) return null;
  return <main id="main-content" tabIndex={-1}><Hero product={heroProduct} /><ServiceStrip /><section className="accessory-promo container"><div><span className="eyebrow">UN EXTRA PARA TI</span><h2>Tu iPhone viene con más.</h2><p>Por la compra de un iPhone llevas <strong>7 accesorios gratis.</strong></p><p className="accessory-promo-note">Consulta los accesorios incluidos y las condiciones.</p></div><Link className="button button-dark" href="/accesorios">Conocer la promoción <ChevronRightIcon /></Link></section><section className="section container"><Reveal><div className="section-heading"><div><span className="eyebrow">ELIGE TU PRÓXIMO IPHONE</span><h2>El que va contigo.</h2></div><Link className="text-link" href="/productos">Ver todos los modelos <ChevronRightIcon /></Link></div><FeaturedCarousel products={featured} /></Reveal></section><PurchaseSteps /><CustomerDeliveries /><CustomerReviews /><FaqSection /><ContactBand /></main>;
}
