# Apfel Store

Maqueta navegable de una tienda especializada en iPhone. Identidad en negro carbón, grafito, plata y blanco a partir del logo proporcionado. La compra se coordina por WhatsApp.

## Estado

Versión 0.1: inicio, catálogo con búsqueda y filtros, seis fichas de producto, opciones de color y capacidad, enlaces con selección compartible y mensaje de WhatsApp. Adaptación para móvil, navegación con teclado y reducción de movimiento.

Este proyecto es una maqueta: no reserva stock ni procesa pagos. Los datos se tomaron del catálogo de El Convoy revisado el 13 de septiembre de 2026. El teléfono de referencia es el mismo del sitio anterior. Confirmar con el negocio antes de uso comercial.

El código está preparado para un repositorio propio de GitHub. La cuenta conectada es ZarRubio, pero aún no se ha indicado ni creado un repositorio de destino. No se han modificado repositorios ajenos al proyecto ni se ha afirmado una sincronización con GitHub.

## Ejecutar

Requiere Node.js 20 o posterior. No necesita instalar dependencias.

```sh
npm run dev
```

Abre http://localhost:8080. Para verificar rutas, archivos y la composición de las consultas:

```sh
npm run check
```

## Archivos

- `dist/index.html`: documento principal y navegación compartida.
- `dist/styles/main.css`: diseño, componentes, tamaños de pantalla y movimiento.
- `dist/scripts/app.js`: vistas, filtros, variantes, navegación y compartir.
- `dist/scripts/catalog.js`: catálogo y configuración de contacto.
- `dist/assets/`: logo original y fotografías de referencia.
- `dist/catalogo/` y `dist/producto/`: documentos de entrada para enlaces directos.
- `scripts/serve.mjs`: servidor local sin dependencias externas.
- `scripts/check.mjs`: verificaciones de rutas, imágenes y mensajes.
- `ASSET-SOURCES.json`: procedencia exacta de las imágenes de producto.
- `docs/DESIGN.md`: decisiones de diseño y pendientes de contenido.

Los archivos dentro de `dist` son la fuente estática publicada, no una compilación descartable. Se guardan en Git. Las vistas comparten el código de `app.js` y los estilos de `main.css`. Si se cambia la estructura general de `index.html`, actualizar también los documentos de entrada; los textos específicos de cada vista se editan una sola vez en `app.js`.

## Preparación para GitHub

Crear o indicar un repositorio privado llamado `apfel-store` y dar acceso a la conexión de GitHub. La configuración temporal de vista previa se guarda en `.openai/hosting.json`; el proyecto funciona como sitio estático y no depende de esa vista previa.

No hay claves, contraseñas ni tokens dentro del proyecto. Las consultas usan enlaces públicos `wa.me` y solo envían un mensaje cuando el visitante lo envía en WhatsApp.

## Antes del lanzamiento comercial

- Confirmar el número de WhatsApp de Apfel Store y sus horarios.
- Sustituir los datos de referencia por precios y disponibilidad aprobados por variante.
- Revisar modelos, especificaciones, imágenes y permisos de uso de las fotografías. Las imágenes del sitio anterior no implican una licencia independiente de redistribución.
- Para exhibición: agregar fotos de la unidad, salud de batería, estado físico, reparación y contenido de entrega.
- Confirmar cobertura real de garantía, medios de pago, costos y plazos de entrega.
- Completar información del negocio y documentos comerciales aplicables.
- Definir quién y cómo actualizará el catálogo.
- La maqueta usa `noindex,nofollow` y una franja visible de vista previa; revisarlos solo cuando se apruebe el lanzamiento.

Las capacidades WebMCP se activan solo si el navegador ofrece `document.modelContext`. Registran lectura del catálogo y preparación de una selección; no envían mensajes ni ejecutan compras. La validación en un navegador con ese soporte no estuvo disponible en esta entrega. El flujo habitual no depende de WebMCP.
