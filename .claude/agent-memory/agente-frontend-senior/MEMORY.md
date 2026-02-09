# Agent Memory – APL-Livic-catalogos

## Proyecto
- **Nombre:** APL-Livic-catalogos
- **Directorio:** C:/LIVIC/PROYECTOS/APL-Livic-catalogos
- **Stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4, pnpm
- **Extras instalados:** zod, axios, zustand (listos para uso futuro)

## Tailwind CSS v4 -- IMPORTANTE
- No existe `tailwind.config.ts`. La configuracion de colores se hace en `globals.css` dentro de `@theme inline`.
- Los tokens de color se declaran como `--color-livic-pink: #E288AE;` etc.
- Esto permite usar clases como `bg-livic-pink`, `text-livic-green`, `border-livic-yellow` directamente.
- Superficie oscura custom: `surface-100`, `surface-200`, `surface-300` como neutrales.
- Texto muted: `text-muted` via `--color-text-muted`.
- Referencia: src/app/globals.css

## Estructura del proyecto
```
src/
  app/
    layout.tsx          -- layout raiz, metadata global, lang="es"
    page.tsx            -- home: catalogo + seccion "Que hace LIVIC"
    apartamentos/
      [slug]/
        page.tsx        -- detalle: hero, galeria, amenidades, host, CTA
  components/
    Nav.tsx             -- nav fija superior (Server Component)
    Badge.tsx           -- etiquetas con variantes de color
    Card.tsx            -- tarjeta del catalogo (enlace al detalle)
    Hero.tsx            -- hero hotelero con overlay sobre imagen
    Gallery.tsx         -- galeria con lightbox (Client Component)
    Section.tsx         -- contenedor de seccion con titulo y acento
    Amenities.tsx       -- grid de amenidades por categoria
    HostCard.tsx        -- tarjeta de anfitrion con estrellas
    CTA.tsx             -- boton "Consultar disponibilidad" (Client Component)
  data/
    apartments.ts       -- datos estáticos de apartamentos + tipos exportados
  lib/
    catalog.ts          -- funciones: getAllApartments, getApartmentBySlug, getAllSlugs
public/
  source/
    salgerosuite/
      1008/             -- 20 fotos del apartamento 1008
```

## Datos del apartamento 1008
- Slug: `salguero-suite-1008`
- Fuente original: C:/LIVIC/apartamentos-Airbnb/SALGERO SUITE/1008/
  - apartamento_1008.json -- datos estructurados
  - ficha/Ficha_Apto1008_SalgueroSuite_SantaMarta.md -- datos detallados con copy
  - fotos/ -- 93 fotos originales (solo 20 copiadas a public/)
- Datos reales usados: capacidad, amenidades, hosts (Lina/Zharick), ubicacion, reglas, notas de transparencia.

## Decisiones clave
- Imagenes: se sirven como assets estaticos de public/ con `<img>` nativa (no next/image) para evitar complejidad de configuracion con archivos grandes en desarrollo.
- Server Components por defecto. Solo Gallery y CTA son Client Components (usan estado).
- generateStaticParams en [slug]/page.tsx genera las paginas en build time.
- La paleta Livic se mantiene estricta: pink, black, green, purple, yellow, white. Neutrales custom solo para superficies.

## Errores resueltos durante la creacion
- create-next-app no acepta nombres con mayusculas ni directorios pre-existentes con archivos. Solucion: crear scaffold en /tmp y copiar archivos al directorio real.
- pnpm approve-builds es interactivo. Solucion: .npmrc con `approve-builds[sharp]=true`.

## Como agregar un apartamento nuevo
1. Agregar fotos a `public/source/{edificio}/{numero}/`
2. Agregar el objeto Apartment al array APARTMENTS en `src/data/apartments.ts`
3. La ruta `/apartamentos/{slug}` se genera automaticamente en el build.

## Build y dev
- `pnpm dev` -- servidor local en localhost:3000
- `pnpm build` -- build produccion (compilation + SSG)
- `npx tsc --noEmit` -- check de tipos sin compilar
