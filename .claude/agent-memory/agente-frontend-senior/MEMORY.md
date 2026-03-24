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

## Animaciones — framer-motion
- framer-motion 12.38.0 instalado (marzo 2026), comando: `pnpm add framer-motion --ignore-workspace`.
- Usado en `SearchFlow.tsx` > `HeroPanel`: stagger col izquierda con `containerVariants`/`itemVariants`, panel derecho `initial x:60`, burbujas con `scale` desde 0.
- `ease` personalizado como tuple: `[0.22, 1, 0.36, 1] as [number, number, number, number]` — necesario para evitar error de tipos en TypeScript.
- `motion.li` es valido como hijo de `motion.div` con variants (stagger funciona sobre cualquier motion.* hijo).

## Build y dev
- `pnpm dev` -- servidor local en localhost:3000
- `pnpm build` -- build produccion (compilation + SSG)
- `npx tsc --noEmit` -- check de tipos sin compilar

## Concepto del sitio (actualizado marzo 2026)
- El home es un **portal de busqueda de disponibilidad** (estilo Booking/Airbnb simplificado), NO un sitio de marca LIVIC.
- **Modo oscuro eliminado completamente.** No hay ThemeToggle. No hay clases `dark:`. globals.css sin bloque `.dark`.
- variables CSS fijadas en modo claro: `--background: #FFFFFF`, `--foreground: #0C0A0B`.

## Hero split layout (diseno final — marzo 2026)
- `grid grid-cols-1 lg:grid-cols-2` — texto izquierda, panel busqueda derecha.
- Imagen: `<img>` nativa `absolute inset-0 w-full h-full object-cover`.
- Overlay: `bg-gradient-to-r from-white/90 via-white/50 to-transparent` (aclara zona texto).
- Col izquierda: badge `bg-livic-yellow text-livic-black`, H1 negro + span gradiente pink→purple, bullets con `<Check>` lucide + circulo `bg-livic-green/20`.
- Col derecha: `bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md ml-auto` con `<AvailabilityBar />`.

## AvailabilityBar — layout vertical (dentro de panel blanco)
- Secciones apiladas `flex flex-col gap-2` (NO pill horizontal).
- Cada seccion: `rounded-xl border border-gray-200 bg-gray-50`.
- Boton buscar: full-width `w-full bg-livic-pink rounded-xl py-3.5`.
- Dropdowns: `bg-white border border-gray-200 rounded-2xl shadow-2xl`.

## Nav.tsx (diseno final)
- `bg-white border-b border-gray-100` — sin blur, sin dark.
- Logo: solo `logo-livic.png` (un unico tag `<Image>`).
- Links centro: `text-sm text-gray-600 font-medium hover:text-livic-pink`.
- Derecha: link "WhatsApp" texto plano — sin boton CTA pill, sin ThemeToggle.

## Card.tsx (diseno final)
- `bg-white rounded-2xl border border-gray-100 shadow-sm` — solo modo claro.
- Corazon decorativo: `<div aria-hidden>` con `text-gray-400` (no Heart interactivo).

## Error resuelto: onClick en Server Component
- `Card.tsx` es Server Component. Un `<button onClick={...}>` dentro falla en prerender.
- Solucion: usar `<div aria-hidden>` para elementos decorativos. Para logica real, crear Client Component separado.

## Rediseno base UI — Travila-style (tokens que se mantienen)
- Stats: `bg-livic-black`, 4 cols `divide-white/10`, numero `text-4xl font-black text-livic-pink`.
- Footer: 3 columnas, linea inferior con copyright + dot livic-green.
- Section.tsx: `max-w-7xl`, `py-14 md:py-20`. Tokens `text-foreground` y `text-text-muted` siguen validos (son alias de los CSS vars del :root).
- globals.css: `.card-hover` para lift al hover (sin clases dark).
