# Apfel Store

Frontend e-commerce de Apfel Store, especializado en iPhone. La compra se inicia en el catÃ¡logo, continÃºa con la configuraciÃ³n del producto y se concreta por WhatsApp.

## Stack

- Next.js 16 con App Router y Server Components por defecto
- React 19, TypeScript estricto y Tailwind CSS 4
- Animaciones CSS breves con alternativa para movimiento reducido
- `next/image` y `next/font`
- Sin backend, autenticaciÃ³n, pagos ni dependencias de base de datos

## Desarrollo

Requiere Node.js 20 o posterior.

```bash
npm install
npm run dev
```

La aplicaciÃ³n queda disponible en `http://localhost:3000`.

```bash
npm run lint
npm run build
npm start
```

## Estructura

```text
src/
â”œâ”€â”€ app/              # Rutas App Router, metadata, sitemap y robots
â”œâ”€â”€ components/       # Layout, home, catÃ¡logo y producto
â”œâ”€â”€ constants/        # Identidad y configuraciÃ³n del sitio
â”œâ”€â”€ data/             # Adaptador local: productos, navegaciÃ³n y blog
â”œâ”€â”€ lib/              # Acceso a datos, precios, SEO y WhatsApp
â””â”€â”€ types/            # Contratos TypeScript
public/images/        # ImÃ¡genes servidas por Next/Image
```

## Datos y futuras integraciones

Los componentes nunca importan `src/data/products.ts` directamente. Usan las funciones de `src/lib/products.ts`, que actualmente devuelven datos locales. Para integrar Supabase en una fase posterior, se reemplaza esa implementaciÃ³n manteniendo el contrato de las funciones y los tipos de `src/types/product.ts`.

Las cards, el detalle y sus miniaturas usan WebP normalizados en `public/products/normalized`. El manifiesto generado `src/data/normalizedProductImages.json` resuelve las rutas sin cambiar la informaciÃ³n comercial. Consulta [Normalizar imÃ¡genes](docs/PRODUCT-IMAGES.md) para aÃ±adir fuentes y regenerar el catÃ¡logo.

## Agregar un producto

AÃ±ade un objeto `Product` en `src/data/products.ts`, incluyendo `slug`, imÃ¡genes existentes en `public/images`, colores, capacidades, disponibilidad y especificaciones. Usa `available: null` hasta confirmar inventario. La ruta `/iphone/[slug]`, sitemap, metadata y recomendaciones se generan automÃ¡ticamente.

## Variables configurables

El nombre y el número de WhatsApp se centralizan en `src/constants/site.ts`. Antes de compilar para Hostinger, define el dominio final en `NEXT_PUBLIC_SITE_URL` (ver `.env.example`); así se generan los canonical y el sitemap del dominio correcto. Si no está definido, no se publica una URL de Sites ni de localhost. Confirma también precios, inventario, permisos de imágenes y garantía.

## AnalÃ­tica y SEO

Los CTAs importantes incluyen `data-event="whatsapp_click"` y `data-product-id` cuando aplica, listos para instrumentar GA4/GTM. Ya existen metadata por pÃ¡gina, metadata dinÃ¡mica de producto, Open Graph, Twitter cards, sitemap y robots.

## Estado actual

No incluye Supabase, PostgreSQL, Cloudinary, autenticaciÃ³n, carrito, checkout, pagos, panel administrador ni tracking activo. Esas integraciones quedan para fases posteriores.
