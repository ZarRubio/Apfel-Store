import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import { CatalogBrowser } from '@/components/catalog/CatalogBrowser';
import { ProductCard } from '@/components/product/ProductCard';

export const metadata: Metadata = { title: 'Todos los iPhone', description: 'Explora el catálogo de iPhone de Apfel Store.' };

export default async function ProductsPage() {
  const products = await getProducts();
  return <main id="main-content" tabIndex={-1} className="catalog-page">
    <section className="page-header container catalog-header">
      <div><span className="eyebrow">LA COLECCIÓN APFEL</span><h1>Tu próximo <em>iPhone.</em></h1></div>
      <p>Compara modelos, elige tus detalles.<br />El resto lo coordinamos contigo.</p>
    </section>
    <section aria-label="Catálogo de iPhone" className="section container catalog-section">
      <Suspense fallback={<><p role="status">Cargando filtros…</p><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></>}><CatalogBrowser products={products} /></Suspense>
    </section>
  </main>;
}
