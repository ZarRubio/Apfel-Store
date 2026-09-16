import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
export const metadata: Metadata = { title: 'Blog', description: 'Guías para elegir tu próximo iPhone.' };
export default function BlogPage() { return <main id="main-content" tabIndex={-1}><section className="page-header container"><span className="eyebrow">IDEAS APFEL</span><h1>Comprar mejor<br /><em>empieza por saber.</em></h1><p>Guías breves para entender tus opciones antes de conversar con un asesor.</p></section><section className="section container blog-grid">{blogPosts.map((post) => <article className="blog-card" key={post.slug}><span className="eyebrow">{post.category}</span><h2>{post.title}</h2><p className="muted">{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Leer artículo ↗</Link></article>)}</section></main>; }
