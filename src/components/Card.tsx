/**
 * Card.tsx
 * Tarjeta de apartamento para el listado del catálogo.
 * Server Component (solo renderiza datos estáticos).
 */

import Link from "next/link";
import Badge from "@/components/Badge";
import type { Apartment } from "@/data/apartments";

interface CardProps {
  apartment: Apartment;
}

export default function Card({ apartment }: CardProps) {
  return (
    <Link
      href={`/apartamentos/${apartment.slug}`}
      className="group block bg-surface-100 border border-surface-300 rounded-2xl overflow-hidden hover:border-livic-pink transition-colors duration-300"
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={apartment.heroPhoto.src}
          alt={apartment.heroPhoto.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge "Vista al mar" si aplica */}
        {apartment.ubicacion.accesoPlaya && (
          <div className="absolute top-3 left-3">
            <Badge variant="green">🌊 Vista al mar</Badge>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 md:p-5">
        {/* Edificio */}
        <p className="text-livic-pink text-xs font-medium uppercase tracking-wide mb-1">
          {apartment.edificio}
        </p>

        {/* Nombre */}
        <h3 className="text-foreground font-semibold text-base md:text-lg leading-snug mb-2">
          {apartment.nombre}
        </h3>

        {/* Datos rápidos */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="neutral">{apartment.huespedes} huéspedes</Badge>
          <Badge variant="neutral">{apartment.habitaciones} hab.</Badge>
          <Badge variant="neutral">{apartment.banos} baños</Badge>
        </div>

        {/* Ubicación */}
        <p className="text-text-muted text-xs">
          {apartment.ubicacion.cercaDe || apartment.ubicacion.ciudad}, {apartment.ubicacion.departamento}
        </p>

        {/* Botón "Ver" */}
        <div className="mt-4">
          <span className="inline-flex items-center text-livic-pink text-sm font-medium group-hover:gap-2 transition-all">
            Ver apartamento
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
