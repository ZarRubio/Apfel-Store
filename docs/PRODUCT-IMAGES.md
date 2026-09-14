# Normalización de imágenes de producto

```bash
npm run normalize-images
npm run test:images
```

Sharp procesa las imágenes fuera de Next.js; no se envía al navegador. El comando usa `tsx scripts/normalize-product-images.ts`.

## Carpetas y nombres

- `public/products/original/`: fuentes intactas. La primera ejecución copia las 92 fotografías referenciadas por el catálogo a subcarpetas por modelo. Nunca sustituye un original existente, ni modifica `public/images/`.
- `public/products/normalized/`: resultados WebP y `report.json`. Se conserva la estructura de subcarpetas y el nombre base: `iphone-15/iphone-15-black.png` genera `iphone-15/iphone-15-black.webp`.
- `src/data/normalizedProductImages.json`: rutas de origen → resultados generados correctamente. Las cards, el detalle (`ProductConfigurator`) y las miniaturas usan este manifiesto. Un archivo que falla conserva su URL de origen en la aplicación.

Para una nueva variante, coloca su PNG/WebP transparente en la carpeta del modelo, añade su ruta `/products/original/<modelo>/<archivo>` a los datos del producto y ejecuta el comando. Para actualizar una fuente existente, reemplaza deliberadamente el archivo de `original/` y vuelve a ejecutar el comando. El proceso no actualiza esa copia por su cuenta.

## Medidas y escala por modelo

1. Se aplica la orientación EXIF y se decodifica en RGBA/sRGB.
2. Se encuentra el rectángulo que contiene **todos** los píxeles con alfa mayor que cero. Incluye bordes suavizados y sombras tenues. Solo se eliminan filas y columnas totalmente transparentes.
3. Los originales pueden tener distinta densidad de píxeles. Su altura visible se calibra a una altura de referencia común del modelo (mediana de las alturas detectadas), sin remuestreo intermedio.
4. Se calcula un rectángulo común con esa altura y el ancho máximo calibrado entre variantes. Un único factor ajusta ese rectángulo dentro de 960 × 960 px.
5. Todas las variantes tienen exactamente la misma altura final. Se redimensionan una sola vez, conservando proporciones, y se centran en un canvas transparente de 1200 × 1200. La altura habitual es 960 px, con 120 px arriba y abajo. Si una variante es especialmente ancha, se reduce **todo el grupo** para conservar el producto completo.
6. Se exporta WebP con calidad 92, calidad alfa 100 y esfuerzo 4. El redondeo de píxeles puede producir como máximo 1 px de diferencia entre márgenes opuestos.

El factor aplicado a píxeles de origen puede diferir entre variantes de 600 px y 1500 px. El factor de encuadre del modelo y la altura final son comunes. El informe registra ambos factores y la calibración, además de dimensiones originales, bounding box, dimensiones finales, nombre generado y advertencias.

Se agrupa primero por el modelo del catálogo; para archivos adicionales, por subcarpeta. En la raíz se reconoce el prefijo `iphone-17-pro-max`, `iphone-17-pro`, etc. Usa una subcarpeta por modelo o una regla explícita para nombres distintos. Deben ser vistas comparables del dispositivo completo: una foto de detalle de cámara no representa la altura física del teléfono.

## Fondos blancos existentes

Las fuentes JPG actuales no contienen transparencia. Para esas copias del catálogo se activa un tratamiento conservador: se estima el fondo blanco o gris muy claro más frecuente en los bordes y se elimina el color similar conectado al exterior (tolerancia de 6 por canal). También se eliminan líneas claras del marco dentro del 2% exterior, únicamente cuando una fila o columna completamente transparente las separa del dispositivo. Las marcas aisladas menores al 5% del componente principal se descartan para evitar que etiquetas o barras ajenas al dispositivo determinen la escala. Se conservan componentes grandes separados, como vistas frontal y posterior. Los blancos encerrados dentro del dispositivo se conservan. No se cambia el color del teléfono ni se reconstruye contenido.

El tratamiento de JPG es heurístico: marcas conectadas al teléfono o partes pequeñas separadas requieren revisión. Esto no equivale a segmentación semántica del producto: blancos del dispositivo conectados al fondo pueden ser ambiguos, y un fondo gris, sombras o compresión pueden dejar contorno. El informe señala esta situación y las fuentes cuyo contenido toca el borde. Una imagen ya cortada no puede recuperar partes ausentes. Para un recorte fiable de esas fuentes, sustituye el original por una fotografía con alfa real. La normalización no iguala perspectiva, iluminación ni nitidez, ni crea detalle al ampliar.

Los archivos adicionales que no forman parte del catálogo conservan su fondo por defecto. Se puede añadir `public/products/original/config.json` con reglas por ruta relativa:

```json
{
  "iphone-17-pro-max/silver.png": { "group": "iphone-17-pro-max", "background": "alpha" },
  "iphone-17-pro-max/orange.jpg": { "group": "iphone-17-pro-max", "background": "white" }
}
```

En la revisión del catálogo actual se detectó una etiqueta conectada al dispositivo en `iphone-13-pro/13-pro-128gb-y-256gb-plata.jpg`. Se conserva para no recortar contenido del teléfono. Esa etiqueta sigue formando parte del área visible y puede reducir la altura aparente del dispositivo; sustituir esa fuente por una versión limpia para cerrar la uniformidad de esa variante.

## Errores y comprobaciones

Un archivo corrupto, vacío, animado o con nombre de salida duplicado se registra y no detiene los demás. No se sobreescriben fuentes. El comando finaliza con código 1 si hubo errores para que puedan detectarse en automatización. Los resultados se escriben de forma atómica; el informe y el manifiesto solo registran las salidas correctas de esa ejecución.

Las pruebas comprueban transparencia, márgenes, proporciones, variantes con distinta resolución, imágenes anchas, errores aislados, preservación de blancos interiores, repetibilidad y hashes de los originales. La interfaz conserva los datos comerciales y el diseño de las cards, con el cambio solicitado a un marco de imagen cuadrado y sin el escalado CSS individual anterior.

API de referencia: [redimensionado de Sharp](https://sharp.pixelplumbing.com/api-resize/) y [exportación WebP](https://sharp.pixelplumbing.com/api-output/#webp).
