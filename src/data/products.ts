import type { Product } from '@/types/product';

const image = (name: string) => `/images/products/${name}`;
const fallbackImages: Record<string, string> = { '16': image('16-pro-natural.webp'), '15': image('15-pro-natural.webp'), '14': image('16-black.webp'), '13': image('17-black.webp'), '12': image('16-black.webp'), '11': image('16-black.webp') };
const colorHex: Record<string, string> = { Negro: '#27282b', Plata: '#c5c7cc', Blanco: '#f4f4f2', Oro: '#c8ad82', Grafito: '#56585d', 'Gris Espacial': '#4d4f53', 'Negro Espacial': '#25262a', 'Azul Sierra': '#7a8795', 'Azul Pacífico': '#526a82', 'Verde Medianoche': '#34463f', Verde: '#6f8971', Rojo: '#a64d4e', Rosa: '#d5a5ae', Púrpura: '#80738f', Morado: '#81748e', Amarillo: '#d5b94f', 'Titanio Blanco': '#e4e3df', 'Titanio Negro': '#313338', 'Titanio Natural': '#a79e91', 'Titanio del Desierto': '#b29b82', Medianoche: '#1f2023', 'Morado Oscuro': '#3e3650', 'Titanio Azul': '#394c5f', Azul: '#5b7ea1' };
function legacyProduct(slug: string, name: string, series: string, line: string, price: number, storage: string[], colors: string[], specs: [string, string][], description: string, previousPrice?: number, offer?: boolean): Product {
  const productImage = fallbackImages[series];
  return { id: slug, slug, name, category: 'iPhone', series, shortDescription: description, description, price, previousPrice, available: null, offer: offer ?? false, images: [productImage], colors: colors.map((color) => ({ name: color, hex: colorHex[color] ?? '#c5c7cc', image: productImage })), storage: storage.map((capacity) => ({ capacity, price })), specifications: specs.map(([label, value]) => ({ label, value })) };
}

const officialSpecifications: Record<string, Product['specifications']> = {
  'iphone-18-pro-max': [
    { label: 'Pantalla', value: '6,9″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A20 Pro' },
    { label: 'Cámara', value: 'Sistema Pro Fusion de 48 MP: principal con apertura variable, ultra gran angular y teleobjetivo' },
    { label: 'Autonomía', value: 'Hasta 45 horas de reproducción de video; hasta 40 horas en streaming' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 7 y Bluetooth 6' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '163,4 × 78 × 8,75 mm · 249 g' },
    { label: 'Materiales', value: 'Diseño unibody de aluminio, Ceramic Shield 2 frontal y Ceramic Shield posterior' },
  ],
  'iphone-18-pro': [
    { label: 'Pantalla', value: '6,3″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A20 Pro' },
    { label: 'Cámara', value: 'Sistema Pro Fusion de 48 MP: principal con apertura variable, ultra gran angular y teleobjetivo' },
    { label: 'Autonomía', value: 'Hasta 36 horas de reproducción de video; hasta 33 horas en streaming' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 7 y Bluetooth 6' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '150 × 71,9 × 8,75 mm · 211 g' },
    { label: 'Materiales', value: 'Diseño unibody de aluminio, Ceramic Shield 2 frontal y Ceramic Shield posterior' },
  ],
  'iphone-17-pro-max': [
    { label: 'Pantalla', value: '6,9″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A19 Pro' },
    { label: 'Cámara', value: 'Sistema Pro Fusion de 48 MP; teleobjetivo óptico 4x y zoom de calidad óptica 8x' },
    { label: 'Autonomía', value: 'Hasta 37 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 7 y Bluetooth 6' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '163,4 × 78 × 8,75 mm · 233 g' },
    { label: 'Materiales', value: 'Diseño unibody de aluminio y Ceramic Shield' },
  ],
  'iphone-17-pro': [
    { label: 'Pantalla', value: '6,3″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A19 Pro' },
    { label: 'Cámara', value: 'Sistema Pro Fusion de 48 MP; teleobjetivo óptico 4x y zoom de calidad óptica 8x' },
    { label: 'Autonomía', value: 'Hasta 31 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 7 y Bluetooth 6' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '150 × 71,9 × 8,75 mm · 206 g' },
    { label: 'Materiales', value: 'Diseño unibody de aluminio y Ceramic Shield' },
  ],
  'iphone-17': [
    { label: 'Pantalla', value: '6,3″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A19' },
    { label: 'Cámara', value: 'Sistema Fusion dual de 48 MP; teleobjetivo de calidad óptica 2x' },
    { label: 'Autonomía', value: 'Hasta 30 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 7 y Bluetooth 6' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '149,6 × 71,5 × 8 mm · 177 g' },
    { label: 'Materiales', value: 'Estructura de aluminio, Ceramic Shield 2 frontal y vidrio posterior' },
  ],
  'iphone-16-pro-max': [
    { label: 'Pantalla', value: '6,9″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A18 Pro' },
    { label: 'Cámara', value: 'Sistema Pro Fusion de 48 MP con ultra gran angular y teleobjetivo óptico 5x' },
    { label: 'Autonomía', value: 'Hasta 33 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 7 y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '163 × 77,6 × 8,25 mm · 227 g' },
    { label: 'Materiales', value: 'Estructura de titanio y vidrio mate texturizado' },
  ],
  'iphone-16-pro': [
    { label: 'Pantalla', value: '6,3″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A18 Pro' },
    { label: 'Cámara', value: 'Sistema Pro Fusion de 48 MP con ultra gran angular y teleobjetivo óptico 5x' },
    { label: 'Autonomía', value: 'Hasta 27 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 7 y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '149,6 × 71,5 × 8,25 mm · 199 g' },
    { label: 'Materiales', value: 'Estructura de titanio y vidrio mate texturizado' },
  ],
  'iphone-16': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A18' },
    { label: 'Cámara', value: 'Sistema dual de 48 MP y ultra gran angular de 12 MP; teleobjetivo de calidad óptica 2x' },
    { label: 'Autonomía', value: 'Hasta 22 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 7 y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '147,6 × 71,6 × 7,8 mm · 170 g' },
    { label: 'Materiales', value: 'Estructura de aluminio y vidrio tintado' },
  ],
  'iphone-15-pro-max': [
    { label: 'Pantalla', value: '6,7″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A17 Pro' },
    { label: 'Cámara', value: 'Sistema Pro de 48 MP con teleobjetivo óptico 5x y LiDAR' },
    { label: 'Autonomía', value: 'Hasta 29 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6E y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '159,9 × 76,7 × 8,25 mm · 221 g' },
    { label: 'Materiales', value: 'Estructura de titanio y vidrio mate texturizado' },
  ],
  'iphone-15-pro': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A17 Pro' },
    { label: 'Cámara', value: 'Sistema Pro de 48 MP con teleobjetivo óptico 3x y LiDAR' },
    { label: 'Autonomía', value: 'Hasta 23 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6E y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '146,6 × 70,6 × 8,25 mm · 187 g' },
    { label: 'Materiales', value: 'Estructura de titanio y vidrio mate texturizado' },
  ],
  'iphone-15': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A16 Bionic' },
    { label: 'Cámara', value: 'Sistema dual de 48 MP y ultra gran angular de 12 MP; teleobjetivo de calidad óptica 2x' },
    { label: 'Autonomía', value: 'Hasta 20 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '147,6 × 71,6 × 7,8 mm · 171 g' },
    { label: 'Materiales', value: 'Estructura de aluminio y vidrio tintado' },
  ],
  'iphone-14-pro-max': [
    { label: 'Pantalla', value: '6,7″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A16 Bionic' },
    { label: 'Cámara', value: 'Sistema Pro de 48 MP con teleobjetivo óptico 3x y LiDAR' },
    { label: 'Autonomía', value: 'Hasta 29 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '160,7 × 77,6 × 7,85 mm · 240 g' },
    { label: 'Materiales', value: 'Estructura de acero inoxidable y vidrio mate texturizado' },
  ],
  'iphone-14-pro': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A16 Bionic' },
    { label: 'Cámara', value: 'Sistema Pro de 48 MP con teleobjetivo óptico 3x y LiDAR' },
    { label: 'Autonomía', value: 'Hasta 23 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '147,5 × 71,5 × 7,85 mm · 206 g' },
    { label: 'Materiales', value: 'Estructura de acero inoxidable y vidrio mate texturizado' },
  ],
  'iphone-14': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A15 Bionic' },
    { label: 'Cámara', value: 'Sistema dual de 12 MP: principal y ultra gran angular' },
    { label: 'Autonomía', value: 'Hasta 20 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.3' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '146,7 × 71,5 × 7,8 mm · 172 g' },
    { label: 'Materiales', value: 'Estructura de aluminio y vidrio' },
  ],
  'iphone-13-pro-max': [
    { label: 'Pantalla', value: '6,7″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A15 Bionic' },
    { label: 'Cámara', value: 'Sistema Pro de 12 MP con teleobjetivo óptico 3x y LiDAR' },
    { label: 'Autonomía', value: 'Hasta 28 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.0' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '160,8 × 78,1 × 7,65 mm · 238 g' },
    { label: 'Materiales', value: 'Estructura de acero inoxidable y vidrio mate texturizado' },
  ],
  'iphone-13-pro': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED, ProMotion hasta 120 Hz' },
    { label: 'Procesador', value: 'A15 Bionic' },
    { label: 'Cámara', value: 'Sistema Pro de 12 MP con teleobjetivo óptico 3x y LiDAR' },
    { label: 'Autonomía', value: 'Hasta 22 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.0' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '146,7 × 71,5 × 7,65 mm · 203 g' },
    { label: 'Materiales', value: 'Estructura de acero inoxidable y vidrio mate texturizado' },
  ],
  'iphone-13': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A15 Bionic' },
    { label: 'Cámara', value: 'Sistema dual de 12 MP: principal y ultra gran angular' },
    { label: 'Autonomía', value: 'Hasta 19 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.0' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '146,7 × 71,5 × 7,65 mm · 174 g' },
    { label: 'Materiales', value: 'Estructura de aluminio y vidrio' },
  ],
  'iphone-12-pro-max': [
    { label: 'Pantalla', value: '6,7″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A14 Bionic' },
    { label: 'Cámara', value: 'Sistema Pro de 12 MP con teleobjetivo óptico 2,5x y LiDAR' },
    { label: 'Autonomía', value: 'Hasta 20 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.0' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '160,8 × 78,1 × 7,4 mm · 226 g' },
    { label: 'Materiales', value: 'Estructura de acero inoxidable y vidrio mate texturizado' },
  ],
  'iphone-12-pro': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A14 Bionic' },
    { label: 'Cámara', value: 'Sistema Pro de 12 MP con teleobjetivo óptico 2x y LiDAR' },
    { label: 'Autonomía', value: 'Hasta 17 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.0' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '146,7 × 71,5 × 7,4 mm · 189 g' },
    { label: 'Materiales', value: 'Estructura de acero inoxidable y vidrio mate texturizado' },
  ],
  'iphone-12': [
    { label: 'Pantalla', value: '6,1″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A14 Bionic' },
    { label: 'Cámara', value: 'Sistema dual de 12 MP: principal y ultra gran angular' },
    { label: 'Autonomía', value: 'Hasta 17 horas de reproducción de video' },
    { label: 'Conectividad', value: '5G, Wi‑Fi 6 y Bluetooth 5.0' },
    { label: 'Protección', value: 'Clasificación IP68' },
    { label: 'Tamaño y peso', value: '146,7 × 71,5 × 7,4 mm · 162 g' },
    { label: 'Materiales', value: 'Estructura de aluminio y vidrio' },
  ],
  'iphone-11-pro-max': [
    { label: 'Pantalla', value: '6,5″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A13 Bionic' },
    { label: 'Cámara', value: 'Sistema triple de 12 MP con teleobjetivo óptico 2x' },
    { label: 'Autonomía', value: 'Hasta 20 horas de reproducción de video' },
    { label: 'Conectividad', value: 'LTE Gigabit; no compatible con 5G' },
    { label: 'Protección', value: 'Clasificación IP68, hasta 4 m por 30 minutos en pruebas de laboratorio' },
    { label: 'Tamaño y peso', value: '158 × 77,8 × 8,1 mm · 226 g' },
    { label: 'Materiales', value: 'Estructura de acero inoxidable y vidrio mate texturizado' },
  ],
  'iphone-11-pro': [
    { label: 'Pantalla', value: '5,8″ Super Retina XDR OLED' },
    { label: 'Procesador', value: 'A13 Bionic' },
    { label: 'Cámara', value: 'Sistema triple de 12 MP con teleobjetivo óptico 2x' },
    { label: 'Autonomía', value: 'Hasta 18 horas de reproducción de video' },
    { label: 'Conectividad', value: 'LTE Gigabit; no compatible con 5G' },
    { label: 'Protección', value: 'Clasificación IP68, hasta 4 m por 30 minutos en pruebas de laboratorio' },
    { label: 'Tamaño y peso', value: '144 × 71,4 × 8,1 mm · 188 g' },
    { label: 'Materiales', value: 'Estructura de acero inoxidable y vidrio mate texturizado' },
  ],
  'iphone-11': [
    { label: 'Pantalla', value: '6,1″ Liquid Retina HD LCD' },
    { label: 'Procesador', value: 'A13 Bionic' },
    { label: 'Cámara', value: 'Sistema dual de 12 MP: principal y ultra gran angular' },
    { label: 'Autonomía', value: 'Hasta 17 horas de reproducción de video' },
    { label: 'Conectividad', value: 'LTE Gigabit; no compatible con 5G' },
    { label: 'Protección', value: 'Clasificación IP68, hasta 2 m por 30 minutos en pruebas de laboratorio' },
    { label: 'Tamaño y peso', value: '150,9 × 75,7 × 8,3 mm · 194 g' },
    { label: 'Materiales', value: 'Estructura de aluminio y vidrio' },
  ],
};

const appleSpecificationsSources: Record<string, string> = {
  'iphone-18-pro': 'https://support.apple.com/es-la/148590', 'iphone-18-pro-max': 'https://support.apple.com/es-la/148591',
  'iphone-17': 'https://support.apple.com/es-es/125089', 'iphone-17-pro': 'https://support.apple.com/es-es/125090', 'iphone-17-pro-max': 'https://support.apple.com/es-es/125091',
  'iphone-16': 'https://support.apple.com/es-es/121029', 'iphone-16-pro': 'https://support.apple.com/es-es/121031', 'iphone-16-pro-max': 'https://support.apple.com/es-es/121032',
  'iphone-15': 'https://support.apple.com/es-es/111831', 'iphone-15-pro': 'https://support.apple.com/es-es/111829', 'iphone-15-pro-max': 'https://support.apple.com/es-es/111828',
  'iphone-14': 'https://support.apple.com/es-es/111850', 'iphone-14-pro': 'https://support.apple.com/es-es/111849', 'iphone-14-pro-max': 'https://support.apple.com/es-es/111846',
  'iphone-13': 'https://support.apple.com/es-es/111872', 'iphone-13-pro': 'https://support.apple.com/es-es/111871', 'iphone-13-pro-max': 'https://support.apple.com/es-es/111870',
  'iphone-12': 'https://support.apple.com/es-es/111876', 'iphone-12-pro': 'https://support.apple.com/es-es/111875', 'iphone-12-pro-max': 'https://support.apple.com/es-es/111874',
  'iphone-11': 'https://support.apple.com/es-es/111865', 'iphone-11-pro': 'https://support.apple.com/es-es/111879', 'iphone-11-pro-max': 'https://support.apple.com/es-es/111878',
};

const legacyProducts: Product[] = [
  legacyProduct('iphone-14-pro-max', 'iPhone 14 Pro Max', '14', 'Pro Max', 2650, ['128 GB', '256 GB'], ['Oro', 'Negro Espacial', 'Morado Oscuro', 'Plata'], [['Pantalla', '6.7 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz, Dynamic Island'], ['Procesador', 'Apple A16 Bionic'], ['Cámara', 'Triple 48 MP + 12 MP + 12 MP, teleobjetivo 3x + LiDAR'], ['Batería', '4323 mAh'], ['Conectividad', '5G']], 'Pantalla amplia y cámara Pro para quienes buscan una experiencia inmersiva.', 2950, true),
  legacyProduct('iphone-14-pro', 'iPhone 14 Pro', '14', 'Pro', 2200, ['128 GB', '256 GB'], ['Oro', 'Negro Espacial', 'Morado Oscuro', 'Plata'], [['Pantalla', '6.1 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz, Dynamic Island'], ['Procesador', 'Apple A16 Bionic'], ['Cámara', 'Triple 48 MP + 12 MP + 12 MP, teleobjetivo + LiDAR'], ['Batería', '3200 mAh'], ['Conectividad', '5G']], 'Rendimiento Pro y una cámara versátil en un formato equilibrado.'),
  legacyProduct('iphone-14', 'iPhone 14', '14', 'Base', 1700, ['128 GB', '256 GB'], ['Medianoche', 'Blanco', 'Azul', 'Morado', 'Rojo', 'Amarillo'], [['Pantalla', '6.1 pulgadas Super Retina XDR OLED, 60Hz'], ['Procesador', 'Apple A15 Bionic'], ['Cámara', 'Doble 12 MP + 12 MP, principal y ultra gran angular'], ['Batería', '3279 mAh'], ['Conectividad', '5G']], 'Una experiencia iPhone completa, con cámara dual y gran autonomía.'),
  legacyProduct('iphone-13-pro-max', 'iPhone 13 Pro Max', '13', 'Pro Max', 2200, ['128 GB', '256 GB'], ['Grafito', 'Oro', 'Plata', 'Azul Sierra'], [['Pantalla', '6.7 pulgadas Super Retina XDR OLED, ProMotion 120Hz'], ['Procesador', 'Apple A15 Bionic'], ['Cámara', 'Triple 12 MP + 12 MP + 12 MP, principal, teleobjetivo y ultra gran angular'], ['Batería', '4352 mAh'], ['Conectividad', '5G']], 'Gran pantalla ProMotion y autonomía generosa para todo tu contenido.'),
  legacyProduct('iphone-13-pro', 'iPhone 13 Pro', '13', 'Pro', 1800, ['128 GB', '256 GB'], ['Grafito', 'Oro', 'Plata', 'Azul Sierra'], [['Pantalla', '6.1 pulgadas Super Retina XDR OLED, ProMotion 120Hz'], ['Procesador', 'Apple A15 Bionic'], ['Cámara', 'Triple 12 MP + 12 MP + 12 MP, principal, teleobjetivo y ultra gran angular'], ['Batería', '3095 mAh'], ['Conectividad', '5G']], 'Cámara Pro, pantalla fluida y potencia sostenida en un formato compacto.'),
  legacyProduct('iphone-13', 'iPhone 13', '13', 'Base', 1500, ['128 GB', '256 GB'], ['Medianoche', 'Verde', 'Blanco', 'Azul', 'Rojo', 'Rosa'], [['Pantalla', '6.1 pulgadas Super Retina XDR OLED, 60Hz'], ['Procesador', 'Apple A15 Bionic'], ['Cámara', 'Doble 12 MP + 12 MP, principal y ultra gran angular'], ['Batería', '3240 mAh'], ['Conectividad', '5G']], 'Diseño compacto, cámara dual y potencia para acompañar tu día.'),
  legacyProduct('iphone-12-pro-max', 'iPhone 12 Pro Max', '12', 'Pro Max', 1700, ['256 GB'], ['Grafito', 'Oro', 'Plata', 'Azul Pacífico'], [['Pantalla', '6.7 pulgadas Super Retina XDR OLED, 60Hz'], ['Procesador', 'Apple A14 Bionic'], ['Cámara', 'Triple 12 MP + 12 MP + 12 MP, teleobjetivo 2.5x + LiDAR'], ['Batería', '3687 mAh'], ['Conectividad', '5G']], 'El formato grande de la generación 12 con cámara Pro y acabado premium.'),
  legacyProduct('iphone-12-pro', 'iPhone 12 Pro', '12', 'Pro', 1400, ['128 GB', '256 GB'], ['Grafito', 'Plata', 'Oro', 'Azul Pacífico'], [['Pantalla', '6.1 pulgadas Super Retina XDR OLED, 60Hz'], ['Procesador', 'Apple A14 Bionic'], ['Cámara', 'Triple 12 MP + 12 MP + 12 MP, teleobjetivo 2x + LiDAR'], ['Batería', '2815 mAh'], ['Conectividad', '5G']], 'Diseño angular, cámara Pro y conectividad 5G para tu día a día.'),
  legacyProduct('iphone-12', 'iPhone 12', '12', 'Base', 1200, ['128 GB'], ['Negro', 'Púrpura', 'Blanco', 'Azul', 'Rojo', 'Verde'], [['Pantalla', '6.1 pulgadas Super Retina XDR OLED, 60Hz'], ['Procesador', 'Apple A14 Bionic'], ['Cámara', 'Doble 12 MP + 12 MP, principal y ultra gran angular'], ['Batería', '2815 mAh'], ['Conectividad', '5G']], 'Un clásico moderno con pantalla OLED, cámara dual y 5G.'),
  legacyProduct('iphone-11-pro-max', 'iPhone 11 Pro Max', '11', 'Pro Max', 1400, ['256 GB'], ['Plata', 'Verde Medianoche', 'Oro', 'Gris Espacial'], [['Pantalla', '6.5 pulgadas Super Retina XDR OLED, 60Hz'], ['Procesador', 'Apple A13 Bionic'], ['Cámara', 'Triple 12 MP + 12 MP + 12 MP, principal, teleobjetivo y ultra gran angular'], ['Batería', '3969 mAh'], ['Conectividad', '4G LTE (sin 5G)']], 'Pantalla amplia y cámara triple para una experiencia Pro accesible.'),
  legacyProduct('iphone-11-pro', 'iPhone 11 Pro', '11', 'Pro', 1300, ['256 GB'], ['Gris Espacial', 'Plata', 'Oro', 'Verde Medianoche'], [['Pantalla', '5.8 pulgadas Super Retina XDR OLED, 60Hz'], ['Procesador', 'Apple A13 Bionic'], ['Cámara', 'Triple 12 MP + 12 MP + 12 MP, principal, teleobjetivo y ultra gran angular'], ['Batería', '3046 mAh'], ['Conectividad', '4G LTE (sin 5G)']], 'Formato compacto, cámara triple y acabados Pro.'),
  legacyProduct('iphone-11', 'iPhone 11', '11', 'Base', 1000, ['128 GB'], ['Negro', 'Verde', 'Amarillo', 'Morado', 'Blanco', 'Rojo'], [['Pantalla', '6.1 pulgadas Liquid Retina LCD, 60Hz'], ['Procesador', 'Apple A13 Bionic'], ['Cámara', 'Doble 12 MP + 12 MP, principal y ultra gran angular'], ['Batería', '3110 mAh'], ['Conectividad', '4G LTE (sin 5G)']], 'Una opción confiable con cámara dual, colores y gran autonomía.')
];

const rawProducts: Product[] = [
  {
    id: 'iphone-17-pro-max', slug: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', category: 'iPhone', series: '17',
    shortDescription: 'Todo el potencial. En grande.', description: 'Una experiencia Pro diseñada para quienes quieren la máxima pantalla, cámara y autonomía.',
    price: 5000, previousPrice: 5300, available: null, featured: true, new: true, offer: true,
    images: [image('17-pro-silver.webp'), image('17-pro-blue.webp'), image('17-pro-orange.webp')],
    colors: [{ name: 'Plateado', hex: '#d3d3cf', image: image('17-pro-silver.webp') }, { name: 'Naranja', hex: '#c87540', image: image('17-pro-orange.webp') }, { name: 'Azul', hex: '#38445a', image: image('17-pro-blue.webp') }],
    storage: [{ capacity: '256 GB', price: 5000 }, { capacity: '512 GB', price: 5600 }],
    specifications: [{ label: 'Pantalla', value: '6.9 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz' }, { label: 'Procesador', value: 'Apple A19 Pro' }, { label: 'Cámara', value: 'Triple 48 MP + 48 MP + 48 MP, teleobjetivo 5x' }, { label: 'Batería', value: '4823 mAh' }, { label: 'Conectividad', value: '5G' }]
  },
  {
    id: 'iphone-17-pro', slug: 'iphone-17-pro', name: 'iPhone 17 Pro', category: 'iPhone', series: '17',
    shortDescription: 'Potencia que se nota.', description: 'Rendimiento profesional en un formato equilibrado, con cámara preparada para tus mejores historias.',
    price: 4600, available: null, featured: true, new: true,
    images: [image('17-pro-blue.webp'), image('17-pro-silver.webp'), image('17-pro-orange.webp')],
    colors: [{ name: 'Azul', hex: '#38445a', image: image('17-pro-blue.webp') }, { name: 'Plateado', hex: '#d3d3cf', image: image('17-pro-silver.webp') }, { name: 'Naranja', hex: '#c87540', image: image('17-pro-orange.webp') }],
    storage: [{ capacity: '256 GB', price: 4600 }, { capacity: '512 GB', price: 5200 }],
    specifications: [{ label: 'Pantalla', value: '6.3 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz' }, { label: 'Procesador', value: 'Apple A19 Pro' }, { label: 'Cámara', value: 'Triple 48 MP + 48 MP + 48 MP, teleobjetivo 5x' }, { label: 'Batería', value: '3998 mAh' }, { label: 'Conectividad', value: '5G' }]
  },
  {
    id: 'iphone-17', slug: 'iphone-17', name: 'iPhone 17', category: 'iPhone', series: '17',
    shortDescription: 'Un gran salto para tu día a día.', description: 'La combinación justa de diseño, potencia y cámara para hacer más de lo que te encanta.',
    price: 3450, available: null, featured: true, new: true,
    images: [image('17-lavender.webp'), image('17-black.webp')],
    colors: [{ name: 'Negro', hex: '#333437', image: image('17-black.webp') }, { name: 'Blanco', hex: '#f4f4f2', image: image('17-lavender.webp') }, { name: 'Azul Neblina', hex: '#9baebe', image: image('17-lavender.webp') }, { name: 'Salvia', hex: '#91a18c', image: image('17-lavender.webp') }, { name: 'Lavanda', hex: '#c1b8d7', image: image('17-lavender.webp') }],
    storage: [{ capacity: '256 GB', price: 3450 }],
    specifications: [{ label: 'Pantalla', value: '6.3 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz' }, { label: 'Procesador', value: 'Apple A19' }, { label: 'Cámara', value: 'Doble 48 MP + 48 MP, principal y ultra gran angular' }, { label: 'Batería', value: '3692 mAh' }, { label: 'Conectividad', value: '5G' }]
  },
  {
    id: 'iphone-16-pro-max', slug: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', category: 'iPhone', series: '16',
    shortDescription: 'Diseño en titanio. Espíritu Pro.', description: 'Una experiencia a lo grande con acabados premium y una cámara que acompaña tu ritmo.',
    price: 4400, available: null, featured: false,
    images: [image('16-pro-natural.webp')], colors: [{ name: 'Titanio del Desierto', hex: '#b29b82', image: image('16-pro-natural.webp') }, { name: 'Titanio Negro', hex: '#313338', image: image('16-pro-natural.webp') }, { name: 'Titanio Natural', hex: '#a79e91', image: image('16-pro-natural.webp') }], storage: [{ capacity: '256 GB', price: 4400 }],
    specifications: [{ label: 'Pantalla', value: '6.9 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz' }, { label: 'Procesador', value: 'Apple A18 Pro' }, { label: 'Cámara', value: 'Triple 48 MP + 48 MP + 12 MP, teleobjetivo 5x + LiDAR' }, { label: 'Batería', value: '4685 mAh' }, { label: 'Conectividad', value: '5G' }]
  },
  legacyProduct('iphone-16-pro', 'iPhone 16 Pro', '16', 'Pro', 4000, ['256 GB'], ['Titanio del Desierto', 'Titanio Negro', 'Titanio Natural', 'Titanio Blanco'], [['Pantalla', '6.3 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz'], ['Procesador', 'Apple A18 Pro'], ['Cámara', 'Triple 48 MP + 48 MP + 12 MP, teleobjetivo 5x'], ['Batería', '3582 mAh'], ['Conectividad', '5G']], 'Potencia Pro en un formato más cómodo, con titanio y cámara avanzada.', 4350, true),
  {
    id: 'iphone-16', slug: 'iphone-16', name: 'iPhone 16', category: 'iPhone', series: '16',
    shortDescription: 'Todo lo que te gusta de iPhone.', description: 'Un iPhone confiable y capaz para acompañar cada parte de tu día.', price: 3000, available: null, featured: true,
    images: [image('16-black.webp')], colors: [{ name: 'Negro', hex: '#343637', image: image('16-black.webp') }, { name: 'Blanco', hex: '#f4f4f2', image: image('16-black.webp') }, { name: 'Rosa', hex: '#d5a5ae', image: image('16-black.webp') }, { name: 'Verde Azulado', hex: '#6d8c89', image: image('16-black.webp') }, { name: 'Azul Altamar', hex: '#637b92', image: image('16-black.webp') }], storage: [{ capacity: '128 GB', price: 3000 }],
    specifications: [{ label: 'Pantalla', value: '6.1 pulgadas Super Retina XDR OLED, 60Hz' }, { label: 'Procesador', value: 'Apple A18' }, { label: 'Cámara', value: 'Doble 48 MP + 12 MP, principal y ultra gran angular' }, { label: 'Batería', value: '3561 mAh' }, { label: 'Conectividad', value: '5G' }]
  },
  {
    id: 'iphone-15-pro-max', slug: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'iPhone', series: '15',
    shortDescription: 'Tu entrada al mundo Pro.', description: 'Una opción Pro para quienes buscan una pantalla amplia y una cámara versátil.', price: 3200, previousPrice: 3500, available: null, offer: true,
    images: [image('15-pro-natural.webp')], colors: [{ name: 'Titanio Blanco', hex: '#e4e3df', image: image('15-pro-natural.webp') }, { name: 'Titanio Negro', hex: '#313338', image: image('15-pro-natural.webp') }, { name: 'Titanio Azul', hex: '#566b82', image: image('15-pro-natural.webp') }, { name: 'Titanio Natural', hex: '#9d9689', image: image('15-pro-natural.webp') }], storage: [{ capacity: '256 GB', price: 3200 }],
    specifications: [{ label: 'Pantalla', value: '6.7 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz, Dynamic Island' }, { label: 'Procesador', value: 'Apple A17 Pro' }, { label: 'Cámara', value: 'Triple 48 MP + 12 MP + 12 MP, teleobjetivo 5x + LiDAR' }, { label: 'Batería', value: '4441 mAh' }, { label: 'Conectividad', value: '5G' }]
  },
  legacyProduct('iphone-15-pro', 'iPhone 15 Pro', '15', 'Pro', 2800, ['256 GB'], ['Titanio Blanco', 'Titanio Negro', 'Titanio Azul', 'Titanio Natural'], [['Pantalla', '6.1 pulgadas Super Retina XDR OLED LTPO, ProMotion 120Hz, Dynamic Island'], ['Procesador', 'Apple A17 Pro'], ['Cámara', 'Triple 48 MP + 12 MP + 12 MP, teleobjetivo 3x + LiDAR'], ['Batería', '3274 mAh'], ['Conectividad', '5G']], 'Diseño en titanio y rendimiento Pro para crear, jugar y capturar.', 3100, true),
  legacyProduct('iphone-15', 'iPhone 15', '15', 'Base', 2300, ['128 GB'], ['Negro', 'Azul', 'Verde', 'Amarillo', 'Rosa'], [['Pantalla', '6.1 pulgadas Super Retina XDR OLED, 60Hz, Dynamic Island'], ['Procesador', 'Apple A16 Bionic'], ['Cámara', 'Doble 48 MP + 12 MP, principal y ultra gran angular'], ['Batería', '3349 mAh'], ['Conectividad', '5G']], 'Diseño fresco, cámara de 48 MP y una experiencia fluida para cada día.'),
  ...legacyProducts
];

const catalogImages: Record<string, Record<string, string>> = {
  'iphone-17-pro-max': { Plateado: '/images/catalog/iphone-17/17-pro-max-256gb-plata.jpg', Naranja: '/images/catalog/iphone-17/17-pro-max-256gb-naranja-cosmico.jpg', Azul: '/images/catalog/iphone-17/17-pro-max-256gb-azul-oscuro.jpg' },
  'iphone-17-pro': { Azul: '/images/catalog/iphone-17/17-pro-256gb-azul-oscuro.jpg', Plateado: '/images/catalog/iphone-17/17-pro-256gb-plata.jpg', Naranja: '/images/catalog/iphone-17/17-pro-256gb-naranja-cosmico.jpg' },
  'iphone-17': { Negro: '/images/catalog/iphone-17/17-256gb-negro.jpg', Blanco: '/images/catalog/iphone-17/17-256gb-blanco.jpg', 'Azul Neblina': '/images/catalog/iphone-17/17-256gb-azul-neblina.jpg', Salvia: '/images/catalog/iphone-17/17-256gb-verde-salvia.jpg', Lavanda: '/images/catalog/iphone-17/17-256gb-lavanda.jpg' },
  'iphone-16-pro-max': { 'Titanio del Desierto': '/images/catalog/iphone-16/16-pro-max-256gb-titanio-desierto.jpg', 'Titanio Negro': '/images/catalog/iphone-16/16-pro-max-256gb-titanio-negro.jpg', 'Titanio Natural': '/images/catalog/iphone-16/16-pro-max-256gb-titanio-natural.jpg' },
  'iphone-16-pro': { 'Titanio del Desierto': '/images/catalog/iphone-16/16-pro-256gb-titanio-desierto.jpg', 'Titanio Negro': '/images/catalog/iphone-16/16-pro-256gb-titanio-negro.jpg', 'Titanio Natural': '/images/catalog/iphone-16/16-pro-256gb-titanio-natural.jpg', 'Titanio Blanco': '/images/catalog/iphone-16/16-pro-256gb-titanio-blanco.jpg' },
  'iphone-16': { Negro: '/images/catalog/iphone-16/16-128gb-y-256gb-negro.jpg', Blanco: '/images/catalog/iphone-16/16-128gb-y-256gb-blanco.jpg', Rosa: '/images/catalog/iphone-16/16-128gb-y-256gb-rosa.jpg', 'Verde Azulado': '/images/catalog/iphone-16/16-128gb-y-256gb-verde-azulado.jpg', 'Azul Altamar': '/images/catalog/iphone-16/16-128gb-y-256gb-azul-ultramar.jpg' },
  'iphone-15-pro-max': { 'Titanio Blanco': '/images/catalog/iphone-15/15-pro-max-256gb-titanio-blanco.jpg', 'Titanio Negro': '/images/catalog/iphone-15/15-pro-max-256gb-titanio-negro.jpg', 'Titanio Azul': '/images/catalog/iphone-15/15-pro-max-256gb-titanio-azul.jpg', 'Titanio Natural': '/images/catalog/iphone-15/15-pro-max-256gb-titanio-natural.jpg' },
  'iphone-15-pro': { 'Titanio Blanco': '/images/catalog/iphone-15/15-pro-256gb-titanio-blanco.jpg', 'Titanio Negro': '/images/catalog/iphone-15/15-pro-256gb-titanio-negro.jpg', 'Titanio Azul': '/images/catalog/iphone-15/15-pro-256gb-titanio-azul.jpg', 'Titanio Natural': '/images/catalog/iphone-15/15-pro-256gb-titanio-natural.jpg' },
  'iphone-15': { Negro: '/images/catalog/iphone-15/15-128gb-y-256gb-negro.jpg', Azul: '/images/catalog/iphone-15/15-128gb-y-256gb-azul.jpg', Verde: '/images/catalog/iphone-15/15-128gb-y-256gb-verde.jpg', Amarillo: '/images/catalog/iphone-15/15-128gb-y-256gb-amarillo.jpg', Rosa: '/images/catalog/iphone-15/15-128gb-y-255gb-rosa.jpg' },
  'iphone-14-pro-max': { Oro: '/images/catalog/iphone-14/14-pro-max-128gb-y-256gb-oro.jpg', 'Negro Espacial': '/images/catalog/iphone-14/14-pro-max-128gb-y-256gb-negro-espacial.jpg', 'Morado Oscuro': '/images/catalog/iphone-14/14-pro-max-128gb-y-256gb-morado-oscuro.jpg', Plata: '/images/catalog/iphone-14/14-pro-max-128gb-y-256gb-plata.jpg' },
  'iphone-14-pro': { Oro: '/images/catalog/iphone-14/14-pro-128gb-y-256gb-oro.jpg', 'Negro Espacial': '/images/catalog/iphone-14/14-pro-128gb-y-256gb-negro-espacial.jpg', 'Morado Oscuro': '/images/catalog/iphone-14/14-pro-128gb-y-256gb-morado-oscuro.jpg', Plata: '/images/catalog/iphone-14/14-pro-128gb-y-256gb-plata.jpg' },
  'iphone-14': { Medianoche: '/images/catalog/iphone-14/14-128gb-y-256gb-medianoche.jpg', Blanco: '/images/catalog/iphone-14/14-128gb-y-256gb-blanco-estrella.jpg', Azul: '/images/catalog/iphone-14/14-128gb-y-256gb-azul.jpg', Morado: '/images/catalog/iphone-14/14-128gb-y-256gb-purpura.jpg', Rojo: '/images/catalog/iphone-14/14-128gb-y-256gb-rojo.jpg', Amarillo: '/images/catalog/iphone-14/14-128gb-y-256gb-amarillo.jpg' },
  'iphone-13-pro-max': { Grafito: '/images/catalog/iphone-13/13-pro-max-128gb-y-256gb-grafito.jpg', Oro: '/images/catalog/iphone-13/13-pro-max-128gb-y-256gb-oro.jpg', Plata: '/images/catalog/iphone-13/13-pro-max-128gb-y-256gb-plata.jpg', 'Azul Sierra': '/images/catalog/iphone-13/13-pro-max-128gb-y-256gb-azul-sierra.jpg' },
  'iphone-13-pro': { Grafito: '/images/catalog/iphone-13/13-pro-128gb-y-256gb-grafito.jpg', Oro: '/images/catalog/iphone-13/13-pro-128gb-y-256gb-oro.jpg', Plata: '/images/catalog/iphone-13/13-pro-128gb-y-256gb-plata.jpg', 'Azul Sierra': '/images/catalog/iphone-13/13-pro-128gb-y-256gb-azul-sierra.jpg' },
  'iphone-13': { Medianoche: '/images/catalog/iphone-13/13-128gb-y-256gb-medianoche.jpg', Verde: '/images/catalog/iphone-13/13-128gb-y-256gb-verde.jpg', Blanco: '/images/catalog/iphone-13/13-128gb-y-256gb-blanco.jpg', Azul: '/images/catalog/iphone-13/13-128gb-y-256gb-azul.jpg', Rojo: '/images/catalog/iphone-13/13-128gb-y-256gb-rojojpg.jpg', Rosa: '/images/catalog/iphone-13/13-128gb-y-256gb-rosa.jpg' },
  'iphone-12-pro-max': { Grafito: '/images/catalog/iphone-12/12-pro-max-256gb-grafito.jpg', Oro: '/images/catalog/iphone-12/12-pro-max-256gb-oro.jpg', Plata: '/images/catalog/iphone-12/12-pro-max-256gb-plata.jpg', 'Azul Pacífico': '/images/catalog/iphone-12/12-pro-max-256gb-azul-marino.jpg' },
  'iphone-12-pro': { Grafito: '/images/catalog/iphone-12/12-pro-128gb-y-256gb-grafito.jpg', Plata: '/images/catalog/iphone-12/12-pro-128gb-y-256gb-plata.jpg', Oro: '/images/catalog/iphone-12/12-pro-128gb-y-256gb-oro.jpg', 'Azul Pacífico': '/images/catalog/iphone-12/12-pro-128gb-y-256gb-azul-marino.jpg' },
  'iphone-12': { Negro: '/images/catalog/iphone-12/12-128gb-negro.jpg', Púrpura: '/images/catalog/iphone-12/12-128gb-purpura.jpg', Blanco: '/images/catalog/iphone-12/12-128gb-blanco.jpg', Azul: '/images/catalog/iphone-12/12-128gb-azul.jpg', Rojo: '/images/catalog/iphone-12/12-128gb-rojo.jpg', Verde: '/images/catalog/iphone-12/12-128gb-verde.jpg' },
  'iphone-11-pro-max': { Plata: '/images/catalog/iphone-11/11-pro-max-256gb-plata.jpg', 'Verde Medianoche': '/images/catalog/iphone-11/11-pro-max-256gb-verde-media-noche.jpg', Oro: '/images/catalog/iphone-11/11-pro-max-256gb-oro.jpg', 'Gris Espacial': '/images/catalog/iphone-11/11-pro-max-256gb-gris-espacial.jpg' },
  'iphone-11-pro': { 'Gris Espacial': '/images/catalog/iphone-11/11-pro-256gb-gris-espacial.jpg', Plata: '/images/catalog/iphone-11/11-pro-256gb-plata.jpg', Oro: '/images/catalog/iphone-11/11-pro-256gb-oro.jpg', 'Verde Medianoche': '/images/catalog/iphone-11/11-pro-256gb-verde-medianoche.jpg' },
  'iphone-11': { Negro: '/images/catalog/iphone-11/11-128gb-negro.jpg', Verde: '/images/catalog/iphone-11/11-128gb-verde.jpg', Amarillo: '/images/catalog/iphone-11/11-128gb-amarillo.jpg', Morado: '/images/catalog/iphone-11/11-128gb-morado.jpg', Blanco: '/images/catalog/iphone-11/11-128gb-blanco.jpg', Rojo: '/images/catalog/iphone-11/11-128gb-rojo.jpg' }
};

const catalogProducts: Product[] = rawProducts.map((originalProduct) => {
  const product: Product = {
    ...originalProduct,
    specifications: officialSpecifications[originalProduct.slug] ?? originalProduct.specifications,
    specificationsSource: appleSpecificationsSources[originalProduct.slug],
  };
  const imageMap = catalogImages[product.slug];
  if (!imageMap) return product;
  const images = [...new Set(Object.values(imageMap))];
  return { ...product, images, colors: product.colors.map((color) => ({ ...color, image: imageMap[color.name] ?? images[0] })) };
});

const iphone18Colors = [
  { name: 'Negro', hex: '#34363b', slug: 'negro' },
  { name: 'Plateado', hex: '#d4d8da', slug: 'plateado' },
  { name: 'Glaciar', hex: '#b9cbd1', slug: 'glaciar' },
  { name: 'Borgoña', hex: '#6f4751', slug: 'borgona' },
] as const;

function iphone18Product(max: boolean): Product {
  const slug = max ? 'iphone-18-pro-max' : 'iphone-18-pro';
  const mediaSlug = max ? 'iphone-18-pro-max-apple' : 'iphone-18-pro-apple';
  const images = iphone18Colors.map((color) => `/products/normalized/${mediaSlug}/${slug}-${color.slug}.webp`);
  return {
    id: slug,
    slug,
    name: max ? 'iPhone 18 Pro Max' : 'iPhone 18 Pro',
    category: 'iPhone',
    series: '18',
    shortDescription: max ? 'La experiencia Pro en su formato más amplio.' : 'Nueva potencia Pro en un formato equilibrado.',
    description: max
      ? 'Pantalla de 6,9 pulgadas, chip A20 Pro y cámara principal Fusion de 48 MP con apertura variable. Solicita tu reserva y confirma los detalles con un asesor.'
      : 'Pantalla de 6,3 pulgadas, chip A20 Pro y cámara principal Fusion de 48 MP con apertura variable. Solicita tu reserva y confirma los detalles con un asesor.',
    price: null,
    available: null,
    featured: true,
    new: true,
    reservationOnly: true,
    illustrativeImages: false,
    defaultColor: 'Borgoña',
    images,
    colors: iphone18Colors.map((color, index) => ({ name: color.name, hex: color.hex, image: images[index] })),
    storage: ['256 GB', '512 GB', '1 TB', '2 TB'].map((capacity) => ({ capacity, price: null })),
    specifications: [
      { label: 'Pantalla', value: max ? '6,9 pulgadas' : '6,3 pulgadas' },
      { label: 'Procesador', value: 'A20 Pro' },
      { label: 'Cámara principal', value: 'Fusion de 48 MP con apertura variable' },
      { label: 'Capacidades', value: '256 GB, 512 GB, 1 TB y 2 TB' },
    ],
  };
}

export const products: Product[] = [iphone18Product(true), iphone18Product(false), ...catalogProducts];
