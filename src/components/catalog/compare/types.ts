import type { ProductColor, ProductSpecification, ProductStorage } from '@/types/product';

export interface CompareProduct {
  slug: string;
  name: string;
  series: string;
  price: number | null;
  previousPrice?: number;
  offer?: boolean;
  new?: boolean;
  reservationOnly?: boolean;
  defaultColor?: string;
  fallbackImage: string;
  colors: ProductColor[];
  storage: ProductStorage[];
  specifications?: ProductSpecification[];
}

export interface SpecRowDef {
  id: string;
  label: string;
  getValue: (product: CompareProduct) => string;
}

export interface SpecGroupDef {
  category: string;
  icon: 'specifications' | 'configuration' | 'purchase';
  rows: SpecRowDef[];
}
