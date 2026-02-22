/**
 * [slug]/page.tsx – Página de detalle de apartamento
 * Server Component. Genera las páginas estáticamente con generateStaticParams.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Section from "@/components/Section";
import Amenities from "@/components/Amenities";
import HostCard from "@/components/HostCard";
import LocationCard from "@/components/LocationCard";
import CTA from "@/components/CTA";
import { getApartmentBySlug, getAllSlugs } from "@/lib/catalog";

// ── Params type ──────────────────────────────────────────────────────────────
interface SlugParams {
  slug: string;
}

// ── generateStaticParams (pre-renderiza todas las páginas conocidas) ────────
export async function generateStaticParams(): Promise<SlugParams[]> {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ── Metadata dinámica ────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<SlugParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const apartment = getApartmentBySlug(slug);
  if (!apartment) return { title: "Apartamento no encontrado" };

  return {
    title: `${apartment.nombre} – LIVIC`,
    description: apartment.descripcionCorta,
  };
}

// ── Componente de página ─────────────────────────────────────────────────────
export default async function ApartmentDetailPage({
  params,
}: {
  params: Promise<SlugParams>;
}) {
  const { slug } = await params;
  const apartment = getApartmentBySlug(slug);

  if (!apartment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* ── Hero ── */}
      <div className="pt-[64px]">
        <Hero apartment={apartment} />
      </div>

      {/* ── Descripción larga ── */}
      <Section>
        <div className="max-w-2xl">
          <p className="text-foreground text-base md:text-lg leading-relaxed">
            {apartment.descripcionLarga}
          </p>
          {/* Frase de marca */}
          <p className="text-livic-purple italic text-sm mt-4">
            "{apartment.frasePosituelo}"
          </p>
        </div>
      </Section>

      {/* ── Galería ── */}
      <Section titulo="Galería de fotos" acento="pink"> 
        <Gallery photos={apartment.galeria}  />
      </Section>

      {/* ── Amenidades ── */}
      <Section titulo="Amenidades" acento="green">
        <Amenities categorias={apartment.amenidades} acento="green" />
      </Section>

      {/* ── Edificio: amenidades + reglas ── */}
      <Section titulo={`Edificio ${apartment.edificio}`} acento="purple">
        <Amenities 
          acento="purple"
          categorias={[
            {
              titulo: "Amenidades del edificio",
              icono: "🏢",
              items: apartment.edificioAmenidades
            },
            {
              titulo: "Reglas de la casa",
              icono: "📋",
              items: apartment.edificioReglas
            }
          ]} 
        />
      </Section>

      {/* ── Servicios y transparencias ── */}
      <Section titulo="Servicios y políticas" acento="yellow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {apartment.servicios.map((svc) => (
            <div
              key={svc.etiqueta}
              className="flex items-start gap-3 bg-surface-100 border border-surface-300 rounded-lg p-4"
            >
              {/* Indicador disponible / no disponible */}
              <div
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  svc.disponible ? "bg-livic-green/20" : "bg-surface-300"
                }`}
              >
                <span className={`text-xs ${svc.disponible ? "text-livic-green" : "text-text-muted"}`}>
                  {svc.disponible ? "✓" : "✕"}
                </span>
              </div>
              <div>
                <p className={`text-sm font-medium ${svc.disponible ? "text-foreground" : "text-text-muted"}`}>
                  {svc.etiqueta}
                </p>
                {svc.nota && (
                  <p className="text-text-muted text-xs mt-0.5">{svc.nota}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Ubicación ── */}
      <Section titulo="Ubicación" acento="green">
        <LocationCard location={apartment.ubicacion} edificio={apartment.edificio} />
      </Section>

      {/* ── Check-in / Check-out ── */}
      <Section titulo="Check-in y Check-out" acento="pink">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-100 border border-surface-300 rounded-xl p-5 text-center">
            <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Check-in</p>
            <p className="text-foreground text-xl font-semibold">{apartment.checkIn}</p>
          </div>
          <div className="bg-surface-100 border border-surface-300 rounded-xl p-5 text-center">
            <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Check-out</p>
            <p className="text-foreground text-xl font-semibold">{apartment.checkOut}</p>
          </div>
        </div>

        {/* Notas importantes */}
        {apartment.notas.length > 0 && (
          <div className="mt-5 bg-livic-yellow/10 border border-livic-yellow/30 rounded-xl p-5">
            <p className="text-livic-yellow text-xs font-semibold uppercase tracking-wide mb-3">
              Información importante
            </p>
            <ul className="space-y-2">
              {apartment.notas.map((nota) => (
                <li key={nota} className="flex items-start gap-2">
                  <span className="mt-0.5 text-livic-yellow text-xs">⚠</span>
                  <span className="text-text-muted text-sm leading-snug">{nota}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* ── Hosts ── */}
      <Section titulo="Tu anfitrión" acento="pink">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <HostCard host={apartment.anfitrionPrincipal} isPrimary />
          {apartment.coanfitrion && (
            <HostCard host={apartment.coanfitrion} isPrimary={false} />
          )}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section>
        <CTA apartmentName={apartment.nombre} />
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-surface-300 py-8 px-5 text-center">
        <p className="text-text-muted text-xs">
          © 2026 LIVIC · Apartamentos en Santa Marta, Colombia
        </p>
      </footer>
    </div>
  );
}
