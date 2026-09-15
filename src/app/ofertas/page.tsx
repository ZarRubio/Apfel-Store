import type { Metadata } from 'next';
import { getOfferProducts } from '@/lib/products';
import { OffersBrowser } from '@/components/offers/OffersBrowser';

export const metadata: Metadata = {
  title: 'Ofertas Especiales | Apfel Store',
  description: 'Descuentos exclusivos en modelos seleccionados de iPhone. Stock limitado con garantía completa en Apfel Store.',
};

export default async function OffersPage() {
  const products = await getOfferProducts();

  return (
    <main id="main-content" tabIndex={-1} className="container" style={{ paddingTop: '32px', paddingBottom: '96px' }}>
      <OffersBrowser products={products} />
    </main>
  );
}
