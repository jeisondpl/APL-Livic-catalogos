/**
 * Card.tsx
 * Tarjeta de apartamento para el listado del catálogo.
 * Diseño optimizado para evitar desbordamientos y mejorar alineación de iconos.
 */

import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/Badge";
import type { Apartment } from "@/data/apartments";
import { Users, BedDouble, Bath, Eye, Building2 } from "lucide-react";

interface CardProps {
  apartment: Apartment;
}

export default function Card({ apartment }: CardProps) {
  return (
    <Link
      href={`/apartamentos/${apartment.slug}`}
      className="group block bg-surface-100 border border-surface-300 rounded-2xl overflow-hidden hover:border-livic-pink transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col"
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <Image
          src={apartment.heroPhoto.src}
          alt={apartment.heroPhoto.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-livic-black/50 to-transparent opacity-60" />
        
        {/* Badges flotantes */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-livic-pink transition-colors leading-tight line-clamp-2">
            {apartment.nombre}
          </h3>
          <div className="flex items-center gap-1 text-livic-yellow flex-shrink-0 pt-0.5">
            <span className="text-base leading-none">★</span>
            <span className="font-bold text-sm">{apartment.anfitrionPrincipal.calificacion || "5.0"}</span>
          </div>
        </div>

        {/* Info Edificio */}
        <div className="flex items-center gap-2 text-text-muted text-sm mb-5">
          <Building2 className="w-4 h-4 text-livic-pink flex-shrink-0" />
          <span className="truncate">
            {apartment.edificio} · {apartment.ubicacion.cercaDe || apartment.ubicacion.ciudad}
          </span>
        </div>

        {/* Grid de Specs (Más robusto que flex) */}
        <div className="grid grid-cols-3 gap-2 border-t border-surface-300 pt-4 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Users className="w-4 h-4 text-livic-pink flex-shrink-0" />
              <span className="text-sm font-bold text-foreground">{apartment.huespedes}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Huéspedes</span>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <BedDouble className="w-4 h-4 text-livic-pink flex-shrink-0" />
              <span className="text-sm font-bold text-foreground">{apartment.habitaciones}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Hab</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Bath className="w-4 h-4 text-livic-pink flex-shrink-0" />
              <span className="text-sm font-bold text-foreground">{apartment.banos}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Baños</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 pt-4 border-t border-surface-300">
          <span className="inline-flex items-center gap-2 text-livic-pink text-sm font-bold group-hover:gap-3 transition-all">
            Ver apartamento
            <span className="text-lg leading-none">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
