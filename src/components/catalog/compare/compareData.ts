import { formatPrice } from '@/lib/formatPrice';
import type { CompareProduct, SpecGroupDef, SpecRowDef } from './types';

export const COMPARE_PRESETS = [
  { label: '18 Pro Max vs 17 Pro Max', slugs: ['iphone-18-pro-max', 'iphone-17-pro-max'] },
  { label: '17 Pro vs 16 Pro', slugs: ['iphone-17-pro', 'iphone-16-pro'] },
  { label: '16 Pro vs iPhone 16', slugs: ['iphone-16-pro', 'iphone-16'] },
  { label: '16 vs 15', slugs: ['iphone-16', 'iphone-15'] },
  { label: '18 Pro Max vs 16 Pro Max vs 15 Pro Max', slugs: ['iphone-18-pro-max', 'iphone-16-pro-max', 'iphone-15-pro-max'] },
] as const;

export function getVerifiedSpec(product: CompareProduct, label: string): string {
  const normalizedLabel = label.toLocaleLowerCase('es');
  const specification = product.specifications?.find((item) => {
    const itemLabel = item.label.toLocaleLowerCase('es');
    return itemLabel === normalizedLabel || itemLabel.startsWith(`${normalizedLabel} `);
  });
  return specification?.value || 'Por confirmar';
}

export const SPEC_GROUPS: SpecGroupDef[] = [
  {
    category: 'Especificaciones verificadas',
    icon: 'specifications',
    rows: [
      { id: 'display', label: 'Pantalla', getValue: (product) => getVerifiedSpec(product, 'Pantalla') },
      { id: 'processor', label: 'Procesador', getValue: (product) => getVerifiedSpec(product, 'Procesador') },
      { id: 'camera', label: 'Cámara', getValue: (product) => getVerifiedSpec(product, 'Cámara') },
      { id: 'battery', label: 'Autonomía', getValue: (product) => getVerifiedSpec(product, 'Autonomía') },
      { id: 'connectivity', label: 'Conectividad', getValue: (product) => getVerifiedSpec(product, 'Conectividad') },
    ],
  },
  {
    category: 'Configuración disponible',
    icon: 'configuration',
    rows: [
      { id: 'storage', label: 'Capacidades', getValue: (product) => product.storage.map((item) => item.capacity).join(', ') || 'Por confirmar' },
      { id: 'colors', label: 'Colores', getValue: (product) => product.colors.map((color) => color.name).join(', ') || 'Por confirmar' },
    ],
  },
  {
    category: 'Precio y compra',
    icon: 'purchase',
    rows: [
      {
        id: 'price',
        label: 'Precio de referencia',
        getValue: (product) => product.price === null
          ? 'Por confirmar'
          : product.offer && product.previousPrice
            ? `${formatPrice(product.price)} (antes ${formatPrice(product.previousPrice)})`
            : `Desde ${formatPrice(product.price)}`,
      },
      {
        id: 'purchase',
        label: 'Modalidad de compra',
        getValue: (product) => product.reservationOnly
          ? 'Solicitud de reserva; confirmación con un asesor'
          : 'Disponibilidad y entrega por confirmar con un asesor',
      },
    ],
  },
];

export function rowHasDifference(row: SpecRowDef, products: CompareProduct[]): boolean {
  if (products.length < 2) return false;
  const firstValue = row.getValue(products[0]);
  return products.some((product) => row.getValue(product) !== firstValue);
}
