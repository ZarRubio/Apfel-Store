import { site } from '@/constants/site';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';

export function getWhatsAppUrl(product?: Product, capacity?: string, color?: string) {
  const selectedCapacity = product?.storage.find((item) => item.capacity === capacity) ?? product?.storage[0];
  const message = product && selectedCapacity
    ? product.reservationOnly
      ? `Hola Apfel Store, quisiera solicitar una reserva de:\n${product.name}\n${selectedCapacity.capacity}\nColor ${color ?? product.colors[0].name}\n\n¿Podrían confirmar precio final, disponibilidad en Perú, condiciones de reserva, garantía y entrega? Entiendo que la solicitud no confirma la reserva hasta recibir su respuesta.`
      : `Hola Apfel Store, me interesa:\n${product.name}\n${selectedCapacity.capacity}\nColor ${color ?? product.colors[0].name}\nPrecio de referencia: ${formatPrice(selectedCapacity.price!)}\n\n¿Podrían confirmar precio final, disponibilidad, garantía y entrega?`
    : 'Hola Apfel Store, quisiera asesoría para elegir mi próximo iPhone.';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
