export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductStorage {
  capacity: string;
  price: number | null;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number | null;
  previousPrice?: number;
  category: string;
  series: string;
  images: string[];
  colors: ProductColor[];
  storage: ProductStorage[];
  available: boolean | null;
  featured?: boolean;
  new?: boolean;
  offer?: boolean;
  reservationOnly?: boolean;
  illustrativeImages?: boolean;
  defaultColor?: string;
  specifications?: ProductSpecification[];
  specificationsSource?: string;
}
