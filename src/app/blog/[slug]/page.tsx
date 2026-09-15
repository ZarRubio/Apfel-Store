import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post
    ? {
        title: `${post.title} | Blog Apfel Store`,
        description: post.excerpt,
      }
    : {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main id="main-content" tabIndex={-1} className="container editorial-page-wrap">
      <article className="article-detail-wrap">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumbs" aria-label="Navegación del blog" style={{ marginBottom: '24px' }}>
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.category}</span>
        </nav>

        {/* Article Meta */}
        <div className="article-header-meta">
          <span className="article-category-badge">{post.category}</span>
          <span style={{ fontSize: '0.82rem', color: '#71717a' }}>{post.readTime}</span>
          <span style={{ fontSize: '0.82rem', color: '#71717a' }}>· {post.date}</span>
        </div>

        {/* Title & Excerpt */}
        <h1>{post.title}</h1>
        <p className="article-lead">{post.excerpt}</p>

        {/* Hero Cover Image */}
        <div
          style={{
            position: 'relative',
            height: '340px',
            background: '#f5f5f7',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            width={320}
            height={320}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="article-takeaways-box">
            <strong>Puntos clave de esta guía:</strong>
            <ul>
              {post.keyTakeaways.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Body Paragraphs */}
        <div className="article-body-content">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Author & WhatsApp Advisor Box */}
        <div className="article-author-card">
          <div>
            <span className="eyebrow" style={{ color: '#0071e3' }}>EDITORIAL APFEL STORE</span>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '4px 0 8px' }}>
              ¿Te ayudamos a elegir tu próximo iPhone?
            </h3>
            <p style={{ color: '#6e6e73', fontSize: '0.9rem', margin: 0, maxWidth: '480px' }}>
              Nuestros asesores te comparten fotos reales de los modelos en stock y te ayudan a comparar opciones sin compromiso.
            </p>
          </div>
          <a
            className="button button-dark"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            data-event="whatsapp_blog_click"
          >
            <span>💬</span> Consultar con un asesor ↗
          </a>
        </div>

        {/* Back to Blog */}
        <div style={{ marginTop: '40px' }}>
          <Link className="text-link" href="/blog">
            ← Volver a todas las guías del blog
          </Link>
        </div>
      </article>
    </main>
  );
}
