import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CompareBrowser } from '@/components/catalog/CompareBrowser';
import { getProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Comparar iPhone | Apfel Store',
  description: 'Compara modelos de iPhone lado a lado: pantalla, procesador A-Series, cámaras, zoom óptico, batería y precios en Apfel Store.',
};

export default async function ComparePage() {
  const products = await getProducts();

  return (
    <main id="main-content" tabIndex={-1} className="container" style={{ paddingTop: '32px' }}>
      <Suspense fallback={<p role="status" style={{ padding: '40px 0', textAlign: 'center' }}>Cargando comparador…</p>}>
        <CompareBrowser products={products} />
      </Suspense>
    </main>
  );
}
