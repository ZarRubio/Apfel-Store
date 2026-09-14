import type { Metadata } from 'next';
import { getOfferProducts } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
export const metadata: Metadata = { title: 'Ofertas', description: 'Ofertas y selecciones especiales de iPhone en Apfel Store.' };
export default async function OffersPage() { const products = await getOfferProducts(); return <main id="main-content" tabIndex={-1}><section className="page-header container"><span className="eyebrow">SELECCIÓN ESPECIAL</span><h1>Una buena elección,<br /><em>ahora más cerca.</em></h1><p>Precios de referencia en modelos seleccionados. Confirma disponibilidad por WhatsApp.</p></section><section className="section container"><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section></main>; }
