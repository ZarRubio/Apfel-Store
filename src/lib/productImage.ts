import type { Product } from '@/types/product';
import normalizedImages from '@/data/normalizedProductImages.json';

const images: Readonly<Record<string, string>> = normalizedImages;

// Only successfully generated files enter the manifest. New/unprocessed assets
// retain their source URL until the next normalize-images run.
export function getProductImage(src: string) {
  return images[src] ?? src;
}

export function getCardImage(product: Product) {
  return getProductImage(product.colors[0]?.image ?? product.images[0]);
}
