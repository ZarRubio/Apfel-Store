# Apfel Store

Frontend e-commerce de Apfel Store, especializado en iPhone. La compra se inicia en el catálogo, continúa con la configuración del producto y se concreta por WhatsApp.

## Stack

- Next.js 16 con App Router y Server Components por defecto
- React 19, TypeScript estricto y Tailwind CSS 4
- `motion` disponible para futuras animaciones de interacción
- `next/image` y `next/font`
- Sin backend, autenticación, pagos ni dependencias de base de datos

## Desarrollo

Requiere Node.js 20 o posterior.

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

```bash
npm run lint
npm run build
npm start
```

## Estructura

```text
src/
├── app/              # Rutas App Router, metadata, sitemap y robots
├── components/       # Layout, home, catálogo y producto
├── constants/        # Identidad y configuración del sitio
├── data/             # Adaptador local: productos, navegación y blog
├── lib/              # Acceso a datos, precios, SEO y WhatsApp
└── types/            # Contratos TypeScript
public/images/        # Imágenes servidas por Next/Image
```

## Datos y futuras integraciones

Los componentes nunca importan `src/data/products.ts` directamente. Usan las funciones de `src/lib/products.ts`, que actualmente devuelven datos locales. Para integrar Supabase en una fase posterior, se reemplaza esa implementación manteniendo el contrato de las funciones y los tipos de `src/types/product.ts`.

Las imágenes usan rutas estándar (`/images/products/...`) y los componentes aceptan URLs de imagen, por lo que pueden migrar a Cloudinary sin cambiar la UI.

## Agregar un producto

Añade un objeto `Product` en `src/data/products.ts`, incluyendo `slug`, imágenes existentes en `public/images/products`, colores, capacidades, disponibilidad y especificaciones. La ruta `/iphone/[slug]`, sitemap, metadata y recomendaciones se generan automáticamente.

## Variables configurables

El nombre, URL pública, descripción y número de WhatsApp están centralizados en `src/constants/site.ts`. No se guardan secretos en el repositorio. Antes de publicación comercial hay que confirmar precios, inventario, permisos de imágenes y políticas de garantía.

## Analítica y SEO

Los CTAs importantes incluyen `data-event="whatsapp_click"` y `data-product-id` cuando aplica, listos para instrumentar GA4/GTM. Ya existen metadata por página, metadata dinámica de producto, Open Graph, Twitter cards, sitemap y robots. El sitio conserva `noindex` mientras sea una vista previa.

## Estado actual

No incluye Supabase, PostgreSQL, Cloudinary, autenticación, carrito, checkout, pagos, panel administrador ni tracking activo. Esas integraciones quedan para fases posteriores.
