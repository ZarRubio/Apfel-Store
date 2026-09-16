import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import { CatalogBrowser } from '@/components/catalog/CatalogBrowser';
import { ProductCard } from '@/components/product/ProductCard';
import { ChevronRightIcon } from '@/components/icons/UiIcons';

export const metadata: Metadata = { title: 'Todos los iPhone', description: 'Explora el catálogo de iPhone de Apfel Store.' };

export default async function ProductsPage() {
  const products = await getProducts();
  return <main id="main-content" tabIndex={-1} className="catalog-page">
    <section className="page-header container catalog-header">
      <div><span className="eyebrow">LA COLECCIÓN APFEL</span><h1>Tu próximo <em>iPhone.</em></h1></div>
      <p>Compara modelos, elige tus detalles.<br />El resto lo coordinamos contigo.</p>
    </section>
    <section className="catalog-launch container" aria-label="Nueva serie iPhone 18 Pro">
      <div><span className="eyebrow">NUEVA SERIE</span><h2>iPhone 18 Pro y Pro Max.</h2><p>Cuatro acabados. Cuatro capacidades. Solicita tu reserva y confirma precio y disponibilidad con un asesor.</p></div>
      <div className="catalog-launch-links"><Link href="/iphone/iphone-18-pro">Explorar Pro <ChevronRightIcon /></Link><Link href="/iphone/iphone-18-pro-max">Explorar Pro Max <ChevronRightIcon /></Link><Link href="/comparar">Comparar modelos <ChevronRightIcon /></Link></div>
    </section>
    <section aria-label="Catálogo de iPhone" className="section container catalog-section">
      <Suspense fallback={<><p role="status">Cargando filtros…</p><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></>}><CatalogBrowser products={products} /></Suspense>
    </section>
  </main>;
}
