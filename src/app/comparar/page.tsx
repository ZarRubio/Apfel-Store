import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CompareBrowser } from '@/components/catalog/CompareBrowser';
import { getProducts } from '@/lib/products';

export const metadata: Metadata = { title: 'Comparar iPhone', description: 'Compara modelos, capacidades y características de los iPhone de Apfel Store.' };

export default async function ComparePage() {
  const products = await getProducts();
  return <main id="main-content" tabIndex={-1}>
    <section className="page-header container compare-header"><span className="eyebrow">COMPARA MODELOS</span><h1>Encuentra las<br /><em>diferencias.</em></h1><p>Elige dos modelos para revisar sus características principales lado a lado.</p></section>
    <section className="section container compare-section"><Suspense fallback={<p role="status">Preparando comparación…</p>}><CompareBrowser products={products} /></Suspense></section>
  </main>;
}
