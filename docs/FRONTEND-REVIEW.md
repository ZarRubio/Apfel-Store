# Revisión de frontend — Apfel Store

## Trabajo aplicado

- El catálogo contiene 23 modelos y 100 variantes de color. Se comprobaron las referencias de imagen presentes en el repositorio.
- La indexación está habilitada. La URL pública es configurable con `NEXT_PUBLIC_SITE_URL` y no apunta al dominio anterior de Sites; definir el dominio Hostinger antes del build.
- Se conservaron los carruseles de reseñas y entregas para revisar el diseño. Los textos, nombres, calificaciones y fotos están marcados como demostración y deben reemplazarse por contenido autorizado antes de publicar.
- La ficha permite configurar producto por URL, enlaza a especificaciones Apple y muestra la barra de contacto móvil cuando el CTA principal sale de pantalla.
- Se ajustó el footer para que las redes sigan siendo legibles en pantallas estrechas y se quitaron reglas móviles en conflicto.
- El servicio técnico muestra una entrada activa para consultas, sin insinuar que hay reparaciones autorizadas ni condiciones no confirmadas.

## Pendiente de cierre comercial

Consultar `docs/PRODUCTION-CHECKLIST.md` para precio, disponibilidad, garantías, pagos y entregas. Consultar `docs/PRODUCTION-ASSETS.md` para fotografías reales de clientes, reseñas consentidas y videos. También se debe confirmar el permiso comercial y la correspondencia exacta de cada imagen de producto.

## Comprobaciones

La comprobación de archivos encontró rutas de producto existentes; no equivale a confirmar stock. Ejecutar `npm run lint` y `npm run build` antes de publicar.
