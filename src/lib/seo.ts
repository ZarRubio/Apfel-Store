import type { Metadata } from 'next';
import { site } from '@/constants/site';

export function pageMetadata(title: string, description = site.description, path = ''): Metadata {
  const canonical = path ? `${site.url}${path}` : site.url;
  return { title, description, alternates: { canonical }, openGraph: { title, description, siteName: site.name, type: 'website', locale: site.locale }, twitter: { card: 'summary_large_image', title, description } };
}
