# Auditoría técnica — Loly Luz del Alma

Fecha: 2026-08-12

## Tipo de proyecto

Sitio HTML estático. No se encontró `package.json`, `next.config.*`, Vite ni otro sistema de build; por ello no hay un comando de build que ejecutar. Cada bloque se valida con comprobación sintáctica de HTML/JavaScript, enlaces internos y `git diff --check`.

## Inventario relevante

| Archivo | Función |
| --- | --- |
| `index.html` | Página de inicio, secciones de transformación, cursos, formulario y modal de pago simulado. |
| `servicios.html` | Página de servicios. |
| `cursos.html` | Página de cursos. |
| `consulta-privada.html` | Página de solicitud de consulta. |
| `testimonios.html` | Página de testimonios. |
| `styles.css` | Estilos globales para las páginas internas. |
| `script.js` | Menú móvil, revelado por scroll y lógica de formularios de páginas internas. |
| `assets/logo-luzdelalma.png` | Logo principal raster. |
| `assets/logo-circular.svg` | Recurso gráfico vectorial existente. |

## Hallazgos iniciales

- Se usaban fuentes serif para cuerpo y UI, sin escala tipográfica global compartida.
- El checkout en `index.html` simulaba una captura de tarjeta y una confirmación de pago: no es apto para producción.
- El enlace etiquetado como WhatsApp era un `mailto:`.
- El preloader bloqueaba el contenido durante 2.6 s, perjudicando LCP.
- No había Open Graph/Twitter Card completo por página.
- No se puede medir Lighthouse real sin un servidor local o navegador automatizado disponible; queda pendiente una ejecución en CI o Chrome local.

## Cambios aplicados

- Tipografía: se implementó Cormorant Garamond para títulos e Inter para cuerpo/UI, ambas con `display=swap`. Se añadieron variables de escala (`--text-hero`, `--text-h2`, `--text-h3`, `--text-body`, `--text-eyebrow`) en los estilos globales y en la portada.
- Separación de marca: se añadió una transición visual explícita antes del área educativa, indicando que la formación espiritual es una línea independiente del acompañamiento de transformación personal.
- Checkout: se eliminó la simulación de captura, cobro y confirmación de tarjeta. Ahora el modal es una lista de espera y no solicita datos de pago. Su envío usa el cliente de correo disponible, sin fingir que existe una transacción.
- WhatsApp: el enlace se cambió de `mailto:` a una URL `wa.me` con mensaje prellenado. El segmento `NUMERO` queda intencionalmente marcado como pendiente: hay que sustituirlo por el número real en formato internacional (sin `+`, espacios ni guiones) antes de publicar.
- Animaciones: el preloader deja de retener el contenido por 2.6 s y se oculta al cargar. La regla de movimiento reducido ahora desactiva explícitamente animaciones y transiciones. Las animaciones revisadas usan `transform` u `opacity`; el starfield es decorativo y no intercepta punteros.
- SEO: se añadieron Open Graph y Twitter Cards a las cinco páginas HTML actuales. Todas tienen un único `h1`.
- Accesibilidad: se añadió foco visible de alto contraste a links, botones y campos. El icono de WhatsApp se marcó como decorativo. Los contrastes principales usados (`#EDE4CF` sobre `#07060B` y dorado sobre negro) superan AA para texto normal; el celeste se reserva para foco/detalles.

## Validación

Después de cada bloque se ejecutó la validación disponible para un proyecto estático: parseo del JavaScript inline, comprobación de fuentes/HTML y `git diff --check`. No existe un script de build en el repositorio.

## Pendientes

- Configurar el número real de WhatsApp en `index.html` (`52NUMERO`).
- Integrar Stripe Checkout o Elements con un backend que cree sesiones, valide webhooks y conceda acceso solo tras pago confirmado.
- Sustituir el envío `mailto:` de lista de espera por un endpoint real (por ejemplo, un formulario serverless) para no depender del cliente de correo.
- Ejecutar Lighthouse con un servidor/Chrome disponible y registrar métricas antes/después; no fue posible medirlo en este entorno. La conversión del PNG a WebP/AVIF también queda pendiente: el conversor WebP no está instalado y `sips` no soporta la codificación requerida.
- Revisar las páginas de contenido antiguo antes de enlazarlas públicamente: actualmente la navegación de varias páginas internas conserva referencias históricas a amarres y mal de ojo.
