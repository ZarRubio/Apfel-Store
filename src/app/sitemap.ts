import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { blogPosts } from '@/data/blog';
import { site } from '@/constants/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const now = new Date();
  return [
    { url: site.url, lastModified: now },
    { url: `${site.url}/productos`, lastModified: now },
    { url: `${site.url}/comparar`, lastModified: now },
    { url: `${site.url}/ofertas`, lastModified: now },
    { url: `${site.url}/nosotros`, lastModified: now },
    { url: `${site.url}/blog`, lastModified: now },
    { url: `${site.url}/contacto`, lastModified: now },
    ...products.map((product) => ({ url: `${site.url}/iphone/${product.slug}`, lastModified: now })),
    ...blogPosts.map((post) => ({ url: `${site.url}/blog/${post.slug}`, lastModified: now })),
  ];
}
