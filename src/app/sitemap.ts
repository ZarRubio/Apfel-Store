import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { site } from '@/constants/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: site.url },
    { url: `${site.url}/productos` },
    { url: `${site.url}/comparar` },
    { url: `${site.url}/ofertas` },
    { url: `${site.url}/servicio-tecnico` },
    { url: `${site.url}/nosotros` },
    { url: `${site.url}/contacto` },
    ...products.map((product) => ({ url: `${site.url}/iphone/${product.slug}` })),
  ];
}
