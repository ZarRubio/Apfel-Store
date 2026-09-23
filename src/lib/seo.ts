import type { Metadata } from 'next';
import { site } from '@/constants/site';

export function pageMetadata(title: string, description = site.description, path = ''): Metadata {
  const canonical = site.url ? `${site.url}${path}` : undefined;
  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: { title, description, siteName: site.name, type: 'website', locale: site.locale, ...(canonical ? { url: canonical } : {}) },
    twitter: { card: 'summary_large_image', title, description }
  };
}
