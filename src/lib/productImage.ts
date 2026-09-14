import type { Product } from '@/types/product';

// These source files have real transparency and a consistent front/back crop.
// Variant galleries keep the product's own color-specific images.
const cutouts: Record<string, string> = {
  'iphone-17-pro-max': '/images/products/17-pro-silver.webp',
  'iphone-17-pro': '/images/products/17-pro-blue.webp',
  'iphone-17': '/images/products/17-black.webp',
  'iphone-16-pro-max': '/images/products/16-pro-natural.webp',
  'iphone-16': '/images/products/16-black.webp',
};

export function getCardImage(product: Product) {
  return cutouts[product.slug] ?? product.images[0];
}

// A few original landscape/padded photos make the device appear smaller inside
// an otherwise identical card. Keep their correction bounded to the card.
const zoom: Record<string, number> = {
  'iphone-11': 1.22,
  'iphone-11-pro': 1.08,
  'iphone-11-pro-max': 1.22,
  'iphone-13-pro-max': 1.08,
  'iphone-15-pro-max': 1.12,
};

export function getCardImageScale(product: Product) {
  return zoom[product.slug] ?? 1;
}
