import { site } from '@/constants/site';
import type { Product } from '@/types/product';

export function getWhatsAppUrl(product?: Product, capacity?: string, color?: string) {
  const selectedCapacity = product?.storage.find((item) => item.capacity === capacity) ?? product?.storage[0];
  const message = product && selectedCapacity
    ? `Hola Apfel Store, me interesa:\n${product.name}\n${selectedCapacity.capacity}\nColor ${color ?? product.colors[0].name}\nPrecio: ${selectedCapacity.price.toLocaleString('es-PE')}\n\n¿Podrían brindarme más información?`
    : 'Hola Apfel Store, quisiera asesoría para elegir mi próximo iPhone.';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
