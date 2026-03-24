/**
 * Card.tsx
 * Tarjeta de apartamento para el listado del catálogo.
 * Estilo Travila: imagen 4/3, badge disponible top-left, corazón top-right,
 * rating + título + ubicación + specs + CTA bajo la imagen.
 */

import Link from "next/link";
import Image from "next/image";
import type { Apartment } from "@/data/apartments";
import { Users, BedDouble, Bath, MapPin, Heart } from "lucide-react";

interface CardProps {
  apartment: Apartment;
}

export default function Card({ apartment }: CardProps) {
  return (
    <Link
      href={`/apartamentos/${apartment.slug}`}
      className="card-hover group block bg-white dark:bg-surface-100 rounded-2xl overflow-hidden shadow-sm border border-transparent dark:border-surface-300/40 h-full flex flex-col"
    >
      {/* Imagen 4/3 */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <Image
          src={apartment.heroPhoto.src}
          alt={apartment.heroPhoto.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge disponible — top left */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center bg-livic-green text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Disponible
          </span>
        </div>

        {/* Botón corazón favorito — top right (decorativo por ahora) */}
        <div
          aria-hidden="true"
          className="absolute top-3 right-3 bg-white/80 dark:bg-livic-black/60 backdrop-blur-sm rounded-full p-1.5"
        >
          <Heart className="w-4 h-4 text-livic-black/60 dark:text-white/60" />
        </div>
      </div>

      {/* Cuerpo de la card */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-livic-yellow text-sm leading-none">★</span>
          <span className="text-foreground font-semibold text-sm">
            {apartment.anfitrionPrincipal.calificacion || "5.0"}
          </span>
          {apartment.anfitrionPrincipal.resenas && (
            <span className="text-text-muted text-sm">
              · ({apartment.anfitrionPrincipal.resenas} reseñas)
            </span>
          )}
        </div>

        {/* Título — 1 línea truncada */}
        <h3 className="font-bold text-base text-foreground leading-snug truncate mb-1">
          {apartment.nombre}
        </h3>

        {/* Ubicación */}
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          <span className="text-text-muted text-sm truncate">
            {apartment.ubicacion.cercaDe || apartment.ubicacion.ciudad}, {apartment.ubicacion.departamento}
          </span>
        </div>

        {/* Row de specs */}
        <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            {apartment.huespedes} huésp.
          </span>
          <span className="w-px h-3 bg-gray-200 dark:bg-surface-300" />
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5 flex-shrink-0" />
            {apartment.habitaciones} hab.
          </span>
          <span className="w-px h-3 bg-gray-200 dark:bg-surface-300" />
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5 flex-shrink-0" />
            {apartment.banos} baños
          </span>
        </div>

        {/* CTA — siempre al fondo */}
        <div className="mt-auto">
          <div className="w-full bg-livic-pink hover:bg-livic-pink/90 text-white text-center rounded-xl py-2.5 text-sm font-semibold transition-colors duration-200">
            Ver disponibilidad
          </div>
        </div>
      </div>
    </Link>
  );
}
