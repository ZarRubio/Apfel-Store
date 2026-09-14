import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const post = blogPosts.find((item) => item.slug === slug); return post ? { title: post.title, description: post.excerpt } : {}; }
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = blogPosts.find((item) => item.slug === slug); if (!post) notFound(); return <main id="main-content" tabIndex={-1}><article className="article-page container"><span className="eyebrow">{post.category}</span><h1>{post.title}</h1><p className="article-intro">{post.excerpt}</p><div className="article-content">{post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><Link className="text-link" href="/blog">Volver al blog ↗</Link></article></main>; }
