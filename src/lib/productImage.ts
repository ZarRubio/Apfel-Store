import type { Product } from '@/types/product';
import normalizedImages from '@/data/normalizedProductImages.json';

const images: Readonly<Record<string, string>> = normalizedImages;

// Only successfully generated files enter the manifest. New/unprocessed assets
// retain their source URL until the next normalize-images run.
export function getProductImage(src: string) {
  return images[src] ?? src;
}

export function getDefaultProductColor(product: Product) {
  if (product.defaultColor) {
    const found = product.colors.find(
      (c) => c.name.toLowerCase() === product.defaultColor!.toLowerCase()
    );
    if (found) return found;
  }
  return product.colors[0];
}

export function getCardImage(product: Product) {
  const defaultColor = getDefaultProductColor(product);
  return getProductImage(defaultColor?.image ?? product.images[0]);
}
