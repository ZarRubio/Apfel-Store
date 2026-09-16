import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { blogPosts } from '@/data/blog';
import { site } from '@/constants/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: site.url },
    { url: `${site.url}/productos` },
    { url: `${site.url}/comparar` },
    { url: `${site.url}/ofertas` },
    { url: `${site.url}/nosotros` },
    { url: `${site.url}/blog` },
    { url: `${site.url}/contacto` },
    ...products.map((product) => ({ url: `${site.url}/iphone/${product.slug}` })),
    ...blogPosts.map((post) => ({ url: `${site.url}/blog/${post.slug}` })),
  ];
}
