import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/products';
import { ProductConfigurator } from '@/components/product/ProductConfigurator';
import { ProductCard } from '@/components/product/ProductCard';
import { pageMetadata } from '@/lib/seo';
import { ChevronRightIcon } from '@/components/icons/UiIcons';

export async function generateStaticParams() { return (await getProducts()).map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = await getProductBySlug(slug); return product ? pageMetadata(product.name, product.description, `/iphone/${slug}`) : {}; }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = await getProductBySlug(slug); if (!product) notFound(); const recommendations = (await getProducts()).filter((item) => item.slug !== product.slug).sort((a, b) => Number(b.series === product.series) - Number(a.series === product.series) || Math.abs(Number(a.series) - Number(product.series)) - Math.abs(Number(b.series) - Number(product.series))).slice(0, 3); return <main id="main-content" tabIndex={-1}><section className="section container product-page"><nav className="breadcrumbs" aria-label="Ruta de navegación"><Link href="/productos">Todos los iPhone</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav><ProductConfigurator product={product} /></section><section className="spec-section"><div className="container"><span className="eyebrow">CADA DETALLE CUENTA</span><h2>Conoce tu equipo.</h2><div className="spec-grid">{product.specifications?.map((spec) => <div key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>)}</div></div></section><section className="section container"><div className="section-heading"><h2>También puede ir contigo.</h2><Link className="text-link" href={`/comparar?modelos=${product.slug},${recommendations[0]?.slug}`}>Comparar modelos <ChevronRightIcon /></Link></div><div className="product-grid">{recommendations.map((item) => <ProductCard key={item.id} product={item} />)}</div></section></main>; }
