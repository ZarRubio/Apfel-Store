import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';

const WHATSAPP_BASE_URL = 'https://api.whatsapp.com/send?phone=51921078492';

type WhatsAppProduct = Pick<Product, 'name' | 'storage' | 'defaultColor' | 'colors'>;

interface WhatsAppUrlOptions {
  product?: WhatsAppProduct;
  capacity?: string;
  color?: string;
  message?: string;
}

const DEFAULT_MESSAGE = '👋 Hola Apfel Store.\n\n📱 Quisiera asesoría para elegir mi próximo iPhone. ¿Podrían ayudarme?';

function getProductMessage(product: WhatsAppProduct, capacity?: string, color?: string) {
  const selectedCapacity = product.storage.find((item) => item.capacity === capacity) ?? product.storage[0];
  if (!selectedCapacity) return DEFAULT_MESSAGE;

  const selectedColor = color ?? product.defaultColor ?? product.colors[0]?.name ?? 'Por confirmar';
  const referencePrice = selectedCapacity.price === null
    ? 'Por confirmar'
    : formatPrice(selectedCapacity.price);

  return `👋 Hola Apfel Store, me interesa este equipo.\n\n📱 Modelo: ${product.name}\n💾 Capacidad: ${selectedCapacity.capacity}\n🎨 Color: ${selectedColor}\n💰 Precio de referencia: ${referencePrice}\n\n✅ ¿Podrían confirmar precio final, disponibilidad, garantía y entrega?`;
}

export function getWhatsAppUrl(options: WhatsAppUrlOptions = {}) {
  const message = options.message
    ?? (options.product
      ? getProductMessage(options.product, options.capacity, options.color)
      : DEFAULT_MESSAGE);

  return `${WHATSAPP_BASE_URL}&text=${encodeURIComponent(message)}`;
}
