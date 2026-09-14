# Revisión de frontend — Apfel Store

## Mejoras aplicadas

- Portada: se sustituyó el JPG con fondo blanco por el recorte WebP con transparencia real que ya existía en el proyecto. La foto y su leyenda tienen espacio propio; la entrada y el hover usan solo `transform` y `opacity`, con movimiento reducido respetado.
- Catálogo: filtros y orden quedan reflejados en la URL, el primer resultado aparece antes, el estado vacío da una salida clara y las tarjetas comparten marco y tamaño. Los cinco modelos con recortes transparentes disponibles usan esas imágenes; las fotos originales con mucho margen reciben una corrección limitada de escala.
- Ficha: el precio anterior solo se muestra cuando corresponde a la capacidad base; la foto cambia con una transición breve y los controles tienen objetivos táctiles y estado accesible.
- Navegación: enlace para saltar al contenido, estado de página actual, cierre del menú con Escape y controles visibles al usar teclado.
- Publicación: salida estática de Next.js preparada en `out/` para Sites, manteniendo la compilación normal del proyecto.

## Pendientes de contenido antes de vender

1. **Inventario y ofertas.** Los 21 modelos figuran como disponibles. Hay 17 marcados como oferta y 15 de ellos no tienen precio anterior. Es necesario cargar inventario y promociones verificadas para que las etiquetas tengan significado comercial.
2. **Fotografía completa.** El catálogo contiene fotografías JPG de distintas fuentes, recortes y proporciones. La presentación actual corrige los bordes más visibles, pero una biblioteca definitiva debería fotografiar cada variante con el mismo encuadre, luz y fondo; el CSS no puede reconstruir detalles que faltan. Algunos colores comparten la misma fotografía. Revisar derechos de uso y correspondencia exacta de color/modelo antes de publicar el catálogo final.
3. **Datos comerciales.** La URL pública de `src/constants/site.ts` sigue siendo `apfel-store.example`, y el sitio conserva `noindex`. Configurar el dominio real, garantía, condiciones, precios y disponibilidad confirmados antes de abrirlo al público.
4. **Contenido.** La documentación de diseño menciona búsqueda y seis modelos, mientras la aplicación actual ofrece filtros y 21 modelos. Actualizarla cuando se cierre el catálogo definitivo.

## Verificación

- ESLint y compilación estática de Next.js correctos.
- 21 productos; ninguna ruta de imagen de producto o color faltante.
- Transparencia real verificada en los cinco recortes que utiliza el catálogo.
