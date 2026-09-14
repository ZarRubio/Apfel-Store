# Diseño y contenido actual

## Identidad

Apfel Store usa negro carbón (`#111113`), grafito (`#242529`), plata (`#C5C7CC`), gris claro (`#F5F5F7`) y blanco. El logo original se conserva sin deformaciones.

## Recorrido de compra

- La portada presenta un iPhone con recorte transparente, precio de referencia y acceso directo al catálogo.
- El catálogo ofrece 21 modelos, filtros por serie y ofertas con precio anterior, y orden por precio o generación. Los filtros activos quedan en la URL. No hay búsqueda de texto.
- La ficha permite elegir color y capacidad; la imagen cambia con el color. El precio mostrado es referencial y la consulta continúa por WhatsApp.
- El carrusel de destacados se desplaza manualmente con botones, teclado o gesto táctil. No avanza solo.
- La portada, las tarjetas y el cambio de imagen usan movimiento breve. Se respeta `prefers-reduced-motion`.

## Fotografías

Las 92 opciones de color tienen 92 rutas de fotografía distintas y existentes. Los archivos originales mezclan JPG con fondos y márgenes variables; cuatro tarjetas usan recortes WebP transparentes cuyo color coincide con la variante inicial. Otros 35 archivos tienen un ajuste de escala o centrado en `src/data/imagePresentation.ts`. La presentación comparte marco blanco y proporciones sin deformar ni reemplazar las fotografías. Unificar de verdad iluminación y perspectiva requiere fotos de producto consistentes.

`ASSET-SOURCES.json` registra la procedencia de los WebP usados en la portada y en parte del catálogo. Los permisos de uso de esas imágenes y de los JPG del catálogo siguen por confirmar antes de abrir la tienda al público.

## Datos comerciales

La URL canónica usa la dirección privada actual de Sites. La vista conserva `noindex` y `robots.txt` bloquea el rastreo. Los 21 modelos tienen disponibilidad sin confirmar; por eso el sitio no ofrece un filtro de inventario hasta contar con datos reales. Solo dos modelos tienen una comparación de precios de referencia para mostrarse en Ofertas. El asesor confirma precio final, garantía, disponibilidad y entrega.

## Validación

ESLint, compilación de Next.js para Sites, existencia de las fotografías asociadas a los colores y rutas principales. La prueba visual de navegador móvil queda pendiente antes de un lanzamiento comercial.
