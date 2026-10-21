# BySoft Web

Sitio web estático de BySoft para presentar servicios de ingeniería de software,
casos de trabajo, demos interactivas y el formulario de diagnóstico por WhatsApp.

## Optimizaciones aplicadas

- Se eliminó CSS inline duplicado de `index.html`; los estilos compartidos viven en
  `css/base.css` y `css/components.css`.
- Se corrigió el token de color `--bysoft-300`, que estaba declarado como una
  cadena inválida.
- Se corrigió una clase utilitaria mal escrita en el pie de página.
- Se añadieron botones flotantes accesibles y responsivos para WhatsApp,
  Instagram y Facebook. WhatsApp usa el número oficial actual.

## Recomendaciones para producción

- Migrar Tailwind desde el CDN a un build local para reducir dependencias externas,
  generar solo las clases usadas y mejorar el control de caché.
- Migrar progresivamente los manejadores `onclick` inline a `js/main.js` y
  `js/demos.js` para separar estructura y comportamiento.
- Mantener las demos y casos actuales hasta contar con métricas de uso; no hay
  evidencia suficiente para eliminarlos por ahora.

## Configuración de redes sociales

Los botones de Instagram y Facebook se muestran como pendientes hasta recibir las
URLs oficiales. Cuando estén disponibles, sustituir cada botón deshabilitado en
`index.html` por un enlace con su URL y mantener `target="_blank"` junto con
`rel="noopener noreferrer"`.
