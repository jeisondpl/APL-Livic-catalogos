/**
 * page.tsx – Home / Portal de búsqueda de alojamiento
 * Server Component. Estructura Travila index-3:
 * Hero fullscreen → Tags de zona → Grid de alojamientos → Stats → Footer 3 cols
 */

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Card from "@/components/Card";
import Section from "@/components/Section";
import AvailabilityBar from "@/components/AvailabilityBar";
import ParallaxHero from "@/components/ParallaxHero";
import { getAllApartments } from "@/lib/catalog";
import { MapPin } from "lucide-react";

// ─── Tags de zona / tipo ───────────────────────────────────────────────────────
const ZONA_TAGS = [
  { label: "Playa Salguero",         emoji: "🏖️" },
  { label: "Vista al mar",            emoji: "🌊" },
  { label: "Reserva del Mar",        emoji: "🏢" },
  { label: "El Rodadero",            emoji: "🌆" },
  { label: "Acceso directo playa",   emoji: "🏄" },
];

// ─── Estadísticas del bloque oscuro ───────────────────────────────────────────
const STATS = [
  { numero: "4.8★", label: "Valoración promedio en Airbnb" },
  { numero: "2",    label: "Apartamentos disponibles" },
  { numero: "100%", label: "Check-in autónomo" },
  { numero: "24/7", label: "Atención al huésped" },
];

export default function CatalogHome() {
  const apartments = getAllApartments();

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* ════════════════════════════════════════════════════════════
          A) HERO — Fullscreen con imagen de fondo y search bar
      ════════════════════════════════════════════════════════════ */}
      <header className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Imagen de fondo con parallax */}
        {apartments.length > 0 && (
          <ParallaxHero
            src={apartments[0].heroPhoto.src}
            alt="Alojamientos en Santa Marta, Colombia"
          />
        )}

        {/* Overlay oscuro Travila-style (siempre oscuro sobre la foto) */}
        <div className="absolute inset-0 hero-overlay-travila" />

        {/* Contenido centrado */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-24 pb-16 max-w-4xl mx-auto w-full">

          {/* Badge pill de ubicación */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-livic-pink flex-shrink-0" />
            <span className="text-white/90 text-xs font-bold uppercase tracking-[0.2em]">
              Santa Marta · Colombia
            </span>
          </div>

          {/* H1 — siempre blanco en el hero */}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-5 tracking-tight">
            Tu alojamiento perfecto
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #E288AE 0%, #AD80B4 50%, #6AB895 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              en el Caribe colombiano
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed mb-10 font-light">
            Consulta disponibilidad en tiempo real. Apartamentos verificados frente al mar.
          </p>

          {/* AvailabilityBar flotante en panel blanco */}
          <div className="bg-white dark:bg-surface-100 rounded-2xl shadow-2xl p-2 w-full max-w-3xl">
            <AvailabilityBar />
          </div>
        </div>

        {/* Flecha de scroll */}
        <div className="relative z-10 flex justify-center pb-8">
          <div className="flex flex-col items-center gap-1 text-white/50 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest font-medium">Explorar</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-70">
              <path
                d="M8 3v10M3 8l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          B) TAGS DE ZONA — Pills horizontales clicables
      ════════════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-surface-100 border-b border-gray-100 dark:border-surface-300/30">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-5">
            Explora por zona
          </p>
          <div className="flex flex-wrap gap-3">
            {ZONA_TAGS.map((tag) => (
              <button
                key={tag.label}
                type="button"
                className="inline-flex items-center gap-2 border border-gray-200 dark:border-surface-300 rounded-full px-4 py-2 text-sm text-foreground/80 hover:bg-livic-pink hover:text-white hover:border-livic-pink transition-all duration-200 cursor-pointer bg-white dark:bg-surface-200"
              >
                <span>{tag.emoji}</span>
                <span>{tag.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          C) GRID DE ALOJAMIENTOS
      ════════════════════════════════════════════════════════════ */}
      <div className="bg-gray-50 dark:bg-background">
        <Section
          id="alojamientos"
          titulo="Alojamientos disponibles"
          subtitulo="Encuentra el apartamento ideal para tu estadía en Santa Marta"
          acento="pink"
          etiqueta="Catálogo"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {apartments.map((apt) => (
              <Card key={apt.slug} apartment={apt} />
            ))}
          </div>

          {/* Estado vacío */}
          {apartments.length === 0 && (
            <div className="text-center py-24 border border-dashed border-surface-300 rounded-3xl">
              <p className="text-text-muted text-lg">
                No hay alojamientos disponibles en este momento. Vuelve pronto.
              </p>
            </div>
          )}
        </Section>
      </div>

      {/* ════════════════════════════════════════════════════════════
          D) BLOQUE DE ESTADÍSTICAS — Fondo oscuro 4 columnas
      ════════════════════════════════════════════════════════════ */}
      <div className="bg-livic-black">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center px-6 py-8 md:py-0"
              >
                <span className="text-4xl font-black text-livic-pink mb-2 leading-none">
                  {stat.numero}
                </span>
                <span className="text-white/60 text-sm leading-snug max-w-[140px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          E) FOOTER — 3 columnas
      ════════════════════════════════════════════════════════════ */}
      <footer className="bg-white dark:bg-surface-100 border-t border-gray-100 dark:border-surface-300/30">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-16">

          {/* Grid 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">

            {/* Col 1: Logo + descripción + sociales */}
            <div>
              <div className="mb-4">
                <Image
                  src="/logo-livic.png"
                  alt="LIVIC"
                  width={100}
                  height={33}
                  className="h-8 w-auto block dark:hidden"
                />
                <Image
                  src="/logo-livic-white.png"
                  alt="LIVIC"
                  width={100}
                  height={33}
                  className="h-8 w-auto hidden dark:block"
                />
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-5 max-w-xs">
                Alojamientos verificados en Santa Marta, Colombia. Disfruta el Caribe con comodidad y confianza.
              </p>
              {/* Íconos sociales */}
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/573000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-surface-200 flex items-center justify-center hover:bg-livic-green hover:text-white text-text-muted transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href="https://es-l.airbnb.com/rooms/1608385896028957180"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Airbnb"
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-surface-200 flex items-center justify-center hover:bg-livic-pink hover:text-white text-text-muted transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.005 2C6.478 2 2 6.478 2 12.005 2 17.522 6.478 22 12.005 22S22 17.522 22 12.005C22 6.478 17.522 2 12.005 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.505 0 4.694-3.806 8.5-8.5 8.5-4.7 0-8.505-3.806-8.505-8.5 0-4.699 3.806-8.505 8.505-8.505zm-.006 2.784c-.78 0-1.406.63-1.406 1.407 0 .776.626 1.406 1.406 1.406.78 0 1.41-.63 1.41-1.406 0-.777-.63-1.407-1.41-1.407zm-3.2 4.003c-.637 0-1.088.447-1.088 1.07v.008c0 .72.508 1.434 1.396 2.03.748.503 1.73.848 2.895.848 1.166 0 2.148-.345 2.896-.847.888-.597 1.396-1.311 1.396-2.03v-.009c0-.623-.451-1.07-1.089-1.07-.504 0-.862.3-1.152.55-.39.334-.786.527-2.051.527-1.265 0-1.662-.193-2.052-.527-.29-.25-.648-.55-1.151-.55z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Alojamientos */}
            <div>
              <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-5">
                Alojamientos
              </h4>
              <ul className="space-y-3">
                {apartments.map((apt) => (
                  <li key={apt.slug}>
                    <Link
                      href={`/apartamentos/${apt.slug}`}
                      className="text-text-muted text-sm hover:text-livic-pink transition-colors duration-200"
                    >
                      {apt.nombre}
                    </Link>
                  </li>
                ))}
                {apartments.length === 0 && (
                  <li className="text-text-muted text-sm">Próximamente</li>
                )}
              </ul>
            </div>

            {/* Col 3: Contacto */}
            <div>
              <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-5">
                Contacto
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://wa.me/573000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted text-sm hover:text-livic-green transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-livic-green inline-block flex-shrink-0" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://es-l.airbnb.com/rooms/1608385896028957180"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted text-sm hover:text-livic-pink transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-livic-pink inline-block flex-shrink-0" />
                    Airbnb
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Línea inferior */}
          <div className="border-t border-gray-100 dark:border-surface-300/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-text-muted text-xs">
              © 2026 LIVIC · Santa Marta, Colombia
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-livic-green inline-block" />
              <span className="text-text-muted text-xs">Disponible ahora</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
