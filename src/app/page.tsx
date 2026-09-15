import Link from 'next/link';
import { getFeaturedProducts, getProductBySlug } from '@/lib/products';
import { Hero } from '@/components/home/Hero';
import { ServiceStrip } from '@/components/home/ServiceStrip';
import { HomeQuickLinks } from '@/components/home/HomeQuickLinks';
import { HomeBentoGrid } from '@/components/home/HomeBentoGrid';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { PurchaseSteps } from '@/components/home/PurchaseSteps';
import { FaqSection } from '@/components/home/FaqSection';
import { ContactBand } from '@/components/home/ContactBand';
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';

export default async function HomePage() {
  const [featured, heroProduct, proProduct] = await Promise.all([
    getFeaturedProducts(),
    getProductBySlug('iphone-18-pro-max'),
    getProductBySlug('iphone-18-pro'),
  ]);

  if (!heroProduct) return null;

  return (
    <main id="main-content" tabIndex={-1}>
      {/* 1. Hero with Live Color & Model Switcher */}
      <Hero product={heroProduct} secondaryProduct={proProduct} />

      {/* 2. Confidence Pillars & Trust Badges */}
      <ServiceStrip />

      {/* 3. Quick Action Banners (Compare & Offers Promos) */}
      <HomeQuickLinks />

      {/* 4. Filterable Featured Products Carousel */}
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CATÁLOGO SELECCIONADO</span>
            <h2>Explora los modelos más buscados.</h2>
          </div>
          <Link className="text-link" href="/productos">
            Ver todos los modelos ↗
          </Link>
        </div>
        <FeaturedCarousel products={featured} />
      </section>

      {/* 5. Apple-style Bento Grid: Value Proposition & Conditions */}
      <HomeBentoGrid />

      {/* 6. Customer Social Proof & Verified Reviews */}
      <CustomerReviews />

      {/* 7. How to Buy Step-by-Step */}
      <PurchaseSteps />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Direct Contact & Consultation Band */}
      <ContactBand />
    </main>
  );
}
