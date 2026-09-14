import type { Product } from '@/types/product';
import type { CSSProperties } from 'react';
import { imagePresentation } from '@/data/imagePresentation';

// These source files have real transparency and a consistent front/back crop.
// Variant galleries keep the product's own color-specific images.
const cutouts: Record<string, string> = {
  'iphone-17-pro-max': '/images/products/17-pro-silver.webp',
  'iphone-17-pro': '/images/products/17-pro-blue.webp',
  'iphone-17': '/images/products/17-black.webp',
  'iphone-16': '/images/products/16-black.webp',
};

export function getCardImage(product: Product) {
  return cutouts[product.slug] ?? product.images[0];
}

export function getImageFrameStyle(src: string): CSSProperties {
  const frame = imagePresentation[src];
  return {
    '--image-scale': frame?.scale ?? 1,
    '--image-x': `${frame?.x ?? 0}%`,
    '--image-y': `${frame?.y ?? 0}%`,
  } as CSSProperties;
}
