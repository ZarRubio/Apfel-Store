# Revisión de frontend — Apfel Store

## Resuelto

- **Fotografías:** los 21 modelos tienen 92 opciones de color, todas con una ruta distinta y un archivo existente. Se eliminó de las tarjetas el recorte transparente que mostraba un color diferente al inicial. Se midieron los encuadres actuales y se aplicaron 35 correcciones puntuales de escala o centrado a las fotos con márgenes desiguales; los archivos originales no se alteraron.
- **URL y rastreo:** `src/constants/site.ts` y la metadata usan la URL privada de Sites en lugar de `apfel-store.example`. Se mantiene `noindex` y el bloqueo en `robots.txt` mientras los datos comerciales estén pendientes.
- **Información comercial:** la disponibilidad de los 21 modelos es “por confirmar”. El filtro de disponibilidad solo aparece cuando existan datos confirmados. La sección Ofertas muestra únicamente dos modelos que tienen un precio anterior de referencia; la consulta por WhatsApp pide confirmación del precio final, inventario, garantía y entrega.
- **Documentación:** `docs/DESIGN.md` y `README.md` describen ahora los 21 modelos, los filtros reales, el carrusel manual y la situación comercial de la vista privada.

## Por confirmar antes de abrir al público

1. Dominio propio, precios finales, inventario, garantía y condiciones de entrega. No se han inventado ni publicado como confirmados.
2. Permisos de uso de las fotografías. `ASSET-SOURCES.json` registra el origen de los WebP externos; la autorización de uso no consta en el repositorio. Los JPG conservan diferencias reales de luz, perspectiva y calidad que no se pueden eliminar solo con escala y centrado.
3. Una revisión visual en móvil y la fotografía definitiva de producto antes del lanzamiento comercial.

## Verificación

- 21 modelos, 92 colores, 92 rutas de fotografía distintas, sin imágenes ausentes.
- ESLint y compilación estática de Next.js correctos.
