import Link from 'next/link';
import { getFeaturedProducts, getProductBySlug } from '@/lib/products';
import { Hero } from '@/components/home/Hero';
import { ServiceStrip } from '@/components/home/ServiceStrip';
import { EditorialShowcase } from '@/components/home/EditorialShowcase';
import { PurchaseSteps } from '@/components/home/PurchaseSteps';
import { FaqSection } from '@/components/home/FaqSection';
import { ContactBand } from '@/components/home/ContactBand';
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { CustomerDeliveries } from '@/components/home/CustomerDeliveries';
import { Reveal } from '@/components/animations/Reveal';
import { ChevronRightIcon } from '@/components/icons/UiIcons';

export default async function HomePage() {
  const [featured, heroProduct] = await Promise.all([getFeaturedProducts(), getProductBySlug('iphone-18-pro-max')]);
  if (!heroProduct) return null;
  return <main id="main-content" tabIndex={-1}><Hero product={heroProduct} /><ServiceStrip /><section className="section container"><Reveal><div className="section-heading"><div><span className="eyebrow">ELIGE TU PRÓXIMO IPHONE</span><h2>El que va contigo.</h2></div><Link className="text-link" href="/productos">Ver todos los modelos <ChevronRightIcon /></Link></div><FeaturedCarousel products={featured} /></Reveal></section><EditorialShowcase /><PurchaseSteps /><CustomerDeliveries /><CustomerReviews /><FaqSection /><ContactBand /></main>;
}
