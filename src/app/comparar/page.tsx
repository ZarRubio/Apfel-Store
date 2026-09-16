import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CompareBrowser } from '@/components/catalog/CompareBrowser';
import type { CompareProduct } from '@/components/catalog/compare/types';
import { getProducts } from '@/lib/products';
import '../styles/compare.css';

export const metadata: Metadata = {
  title: 'Comparar iPhone',
  description: 'Compara los datos disponibles de cada iPhone: pantalla, procesador, cámaras, capacidad y precio de referencia.',
};

export default async function ComparePage() {
  const products = await getProducts();
  const compareProducts: CompareProduct[] = products.map((product) => ({
    slug: product.slug,
    name: product.name,
    series: product.series,
    price: product.price,
    ...(product.previousPrice !== undefined && { previousPrice: product.previousPrice }),
    ...(product.offer !== undefined && { offer: product.offer }),
    ...(product.new !== undefined && { new: product.new }),
    ...(product.reservationOnly !== undefined && { reservationOnly: product.reservationOnly }),
    ...(product.defaultColor !== undefined && { defaultColor: product.defaultColor }),
    fallbackImage: product.images[0],
    colors: product.colors,
    storage: product.storage,
    ...(product.specifications !== undefined && { specifications: product.specifications }),
  }));

  return (
    <main id="main-content" tabIndex={-1} className="container" style={{ paddingTop: '32px' }}>
      <Suspense fallback={<p role="status" style={{ padding: '40px 0', textAlign: 'center' }}>Cargando comparador…</p>}>
        <CompareBrowser products={compareProducts} />
      </Suspense>
    </main>
  );
}
