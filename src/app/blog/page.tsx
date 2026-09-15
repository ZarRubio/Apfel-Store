import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog & Guías de iPhone | Apfel Store',
  description: 'Guías de compra, comparativas técnicas y consejos para cuidar la batería y rendimiento de tu iPhone en Perú.',
};

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const others = blogPosts.filter((p) => p.slug !== featured.slug);

  return (
    <main id="main-content" tabIndex={-1} className="container editorial-page-wrap">
      {/* Header */}
      <section className="editorial-hero-banner">
        <span className="eyebrow">EDITORIAL APFEL STORE</span>
        <h1>
          Aprender antes de elegir.
          <em>Comprar con total certeza.</em>
        </h1>
        <p className="editorial-hero-lead">
          Guías prácticas, comparativas técnicas y consejos de nuestros especialistas para que tomes la mejor decisión de compra.
        </p>
      </section>

      {/* Featured Article Card */}
      {featured && (
        <article className="blog-featured-card">
          <div className="blog-featured-copy">
            <div className="blog-meta-row">
              <span className="blog-category-tag">{featured.category}</span>
              <span className="blog-read-time">{featured.readTime}</span>
              <span className="blog-read-time">· {featured.date}</span>
            </div>
            <h2>
              <Link href={`/blog/${featured.slug}`}>
                {featured.title}
              </Link>
            </h2>
            <p>{featured.excerpt}</p>
            <Link className="button button-light" style={{ width: 'fit-content' }} href={`/blog/${featured.slug}`}>
              Leer guía completa <span>↗</span>
            </Link>
          </div>
          <div className="blog-featured-image">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              width={380}
              height={380}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </article>
      )}

      {/* Grid of Other Articles */}
      <div className="section-heading" style={{ marginTop: '20px', marginBottom: '24px' }}>
        <div>
          <span className="eyebrow">MÁS ARTÍCULOS Y TUTORIALES</span>
          <h2>Guías recientes</h2>
        </div>
      </div>

      <div className="blog-cards-grid">
        {others.map((post) => (
          <article className="blog-card-item" key={post.slug}>
            <div className="blog-card-image-box">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={220}
                height={220}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="blog-card-body">
              <div className="blog-meta-row" style={{ marginBottom: '8px' }}>
                <span className="blog-category-tag" style={{ background: '#f4f4f6', color: '#18181b', border: '1px solid #e4e4e7' }}>
                  {post.category}
                </span>
                <span className="blog-read-time" style={{ fontSize: '0.75rem' }}>{post.readTime}</span>
              </div>
              <h3>
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p>{post.excerpt}</p>
              <Link className="blog-card-link-arrow" href={`/blog/${post.slug}`}>
                Leer artículo <span>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
