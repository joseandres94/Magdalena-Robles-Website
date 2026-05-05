# Assets — Magdalena Robles

## Estructura esperada

```
assets/
  looks/
    pedrolino-01.jpg      ← Look 01 editorial
    colombina-01.jpg      ← Look 02 editorial
    arlequin-01.jpg       ← Look 03 editorial
    pantalone-01.jpg      ← Look 04 editorial
    isabella-01.jpg       ← Look 05 editorial
    lelio-01.jpg          ← Look 06 editorial
  moodboard/
    [fotos campaña, proceso, backstage]
  process/
    [fotos de taller, patronaje, materiales]
  logo/
    logo.svg
    logo-light.svg        ← Versión sobre fondo oscuro
```

## Especificaciones de imagen

- **Looks editoriales:** proporción 2:3, mínimo 800×1200px, WebP preferido
- **Moodboard:** varias proporciones, máx 1200px en lado largo
- **Logo SVG:** sin fondo, trazos

## Formatos recomendados

Usa WebP con fallback JPEG. Para Next.js / SSR, `srcset` con 400w, 800w, 1200w.
