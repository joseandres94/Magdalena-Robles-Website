# Magdalena Robles — Fashion Designer Website

Portfolio editorial bilingüe de Magdalena Robles, diseñadora de moda y patronista especializada en Almería.

## Requisitos

- Node.js 22
- npm 11+

## Desarrollo

```bash
npm ci
npm start
```

La aplicación queda disponible en `http://localhost:4200`.

## Comandos

```bash
npm run check      # TypeScript, ESLint, Stylelint, formato y código muerto
npm run test:ci    # Tests unitarios con umbrales de cobertura
npm run e2e        # Playwright en escritorio y móvil
npm run build      # Build SSR y prerender de las rutas públicas
```

Para ejecutar E2E por primera vez:

```bash
npx playwright install chromium
```

## Configuración

Los valores públicos de despliegue están en `src/app/core/app-environment.ts`:

- `publicUrl`: dominio canónico utilizado por SEO.
- `contactEndpoint`: endpoint HTTP `POST` del formulario de contacto.
- `newsletterEndpoint`: endpoint HTTP `POST` de newsletter.

Los endpoints vacíos fallan de forma explícita y muestran una alternativa de contacto; nunca simulan un envío correcto.

Antes de publicar también se deben revisar el dominio de `src/robots.txt` y `src/sitemap.xml`.

## Fotografías

El sitio incluye SVG editoriales de fallback para que el diseño no se rompa mientras faltan recursos. Las fotografías definitivas deben respetar la estructura y especificaciones de `src/assets/README.md`. Al conservar los nombres previstos, no es necesario modificar componentes.

## Estructura

```text
src/
  app/
    core/       # Layout, configuración, servicios y modelos
    shared/     # Componentes, directivas y pipes reutilizables
    features/   # Páginas y secciones lazy-loaded
    data/       # Contenido de marca y colección
  assets/       # Fotografías y fallbacks
  styles/       # Tokens, tipografía, mixins y animaciones
```

## Renderizado y SEO

Angular SSR prerenderiza home, colección, fichas de looks, diseñadora, contacto y privacidad. `SeoService` gestiona title, description, canonical, Open Graph, Twitter, robots y datos estructurados.

## Pendientes de publicación

1. Añadir fotografías definitivas.
2. Configurar los dos endpoints HTTP.
3. Validar la política de privacidad con los datos fiscales y proveedores reales.
4. Confirmar dominio, analytics consentido y plataforma de despliegue.
