import type { Metadata } from 'next';
import { getOfferProducts } from '@/lib/products';
import { OffersBrowser } from '@/components/offers/OffersBrowser';
import '../styles/offers-page.css';

export const metadata: Metadata = {
  title: 'Ofertas especiales',
  description: 'Consulta precios de referencia y disponibilidad de modelos seleccionados de iPhone en Apfel Store.',
};

export default async function OffersPage() {
  const products = await getOfferProducts();

  return (
    <main id="main-content" tabIndex={-1} className="container" style={{ paddingTop: '32px', paddingBottom: '96px' }}>
      <OffersBrowser products={products} />
    </main>
  );
}
