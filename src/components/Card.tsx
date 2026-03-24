/**
 * Card.tsx
 * Tarjeta de apartamento para el listado del catálogo.
 * Rediseñada: imagen más grande, overlay al hover, CTA más solido, estilo premium.
 */

import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/Badge";
import type { Apartment } from "@/data/apartments";
import { Users, BedDouble, Bath, Eye, Building2, ArrowRight } from "lucide-react";

interface CardProps {
  apartment: Apartment;
}

export default function Card({ apartment }: CardProps) {
  return (
    <Link
      href={`/apartamentos/${apartment.slug}`}
      className="group block bg-surface-100 border border-surface-300/70 rounded-3xl overflow-hidden hover:border-livic-pink/50 hover:shadow-2xl hover:shadow-livic-pink/10 transition-all duration-500 h-full flex flex-col"
    >
      {/* Imagen grande */}
      <div className="relative aspect-[3/2] overflow-hidden flex-shrink-0">
        <Image
          src={apartment.heroPhoto.src}
          alt={apartment.heroPhoto.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay base suave */}
        <div className="absolute inset-0 bg-gradient-to-t from-livic-black/70 via-livic-black/20 to-transparent" />

        {/* Overlay adicional al hover */}
        <div className="absolute inset-0 bg-livic-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges flotantes */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {apartment.ubicacion.accesoPlaya && (
            <Badge variant="green">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 flex-shrink-0" />
                Vista al mar
              </span>
            </Badge>
          )}
          <Badge variant="pink">
            Piso {apartment.piso}
          </Badge>
        </div>

        {/* Rating flotante en esquina superior derecha */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-livic-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
          <span className="text-livic-yellow text-xs leading-none">★</span>
          <span className="text-white font-bold text-xs">
            {apartment.anfitrionPrincipal.calificacion || "5.0"}
          </span>
        </div>

        {/* Nombre del apartamento en overlay inferior */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg md:text-xl leading-tight line-clamp-2 drop-shadow-lg">
            {apartment.nombre}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Building2 className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
            <span className="text-white/80 text-sm truncate">
              {apartment.edificio} · {apartment.ubicacion.cercaDe || apartment.ubicacion.ciudad}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido inferior */}
      <div className="p-5 flex flex-col flex-grow">

        {/* Grid de specs */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="flex flex-col items-center bg-surface-200/80 rounded-2xl py-3 px-2">
            <Users className="w-4 h-4 text-livic-pink mb-1.5 flex-shrink-0" />
            <span className="text-base font-bold text-foreground leading-none">{apartment.huespedes}</span>
            <span className="text-[9px] uppercase tracking-widest text-text-muted font-semibold mt-1">Huésp.</span>
          </div>

          <div className="flex flex-col items-center bg-surface-200/80 rounded-2xl py-3 px-2">
            <BedDouble className="w-4 h-4 text-livic-pink mb-1.5 flex-shrink-0" />
            <span className="text-base font-bold text-foreground leading-none">{apartment.habitaciones}</span>
            <span className="text-[9px] uppercase tracking-widest text-text-muted font-semibold mt-1">Hab.</span>
          </div>

          <div className="flex flex-col items-center bg-surface-200/80 rounded-2xl py-3 px-2">
            <Bath className="w-4 h-4 text-livic-pink mb-1.5 flex-shrink-0" />
            <span className="text-base font-bold text-foreground leading-none">{apartment.banos}</span>
            <span className="text-[9px] uppercase tracking-widest text-text-muted font-semibold mt-1">Baños</span>
          </div>
        </div>

        {/* CTA sólido */}
        <div className="mt-auto">
          <div className="flex items-center justify-between bg-livic-pink/10 border border-livic-pink/20 group-hover:bg-livic-pink group-hover:border-livic-pink rounded-2xl px-4 py-3 transition-all duration-300">
            <span className="text-livic-pink group-hover:text-white text-sm font-bold transition-colors duration-300">
              Ver apartamento
            </span>
            <ArrowRight
              className="w-4 h-4 text-livic-pink group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
