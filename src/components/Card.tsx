/**
 * Card.tsx — Tarjeta de apartamento estilo Travila
 * Rating sobre la imagen, specs + botón en fila inferior.
 */

import Link from 'next/link'
import Image from 'next/image'
import type { Apartment } from '@/data/apartments'
import { Users, BedDouble, Heart } from 'lucide-react'

interface CardProps {
  apartment: Apartment
}

export default function Card({ apartment }: CardProps) {
  const rating = apartment.anfitrionPrincipal.calificacion ?? 5.0
  const resenas = apartment.anfitrionPrincipal.resenas ?? 0

  return (
    <Link
      href={`/apartamentos/${apartment.slug}`}
      className="card-hover group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col"
    >
      {/* ── Imagen ── */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <Image
          src={apartment.heroPhoto.src}
          alt={apartment.heroPhoto.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge top-left — blanco con texto oscuro */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center bg-white text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            Top Rated
          </span>
        </div>

        {/* Corazón top-right */}
        <div aria-hidden="true" className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-sm">
          <Heart className="w-4 h-4 text-gray-400" />
        </div>

        {/* Rating sobre la imagen — pill en la esquina inferior izquierda */}
        <div className="absolute bottom-3 left-3">
          <div className="inline-flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1 shadow-sm">
            <span className="text-livic-yellow text-xs leading-none">★</span>
            <span className="text-gray-900 font-bold text-xs">{rating.toFixed(2)}</span>
            {resenas > 0 && (
              <span className="text-gray-500 text-xs">({resenas} reseñas)</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Cuerpo ── */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Título — hasta 2 líneas */}
        <h3 className="font-bold text-base text-gray-900 leading-snug line-clamp-2 mb-2">
          {apartment.nombre}
        </h3>

        {/* Specs — huéspedes · habitaciones · baños */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5 flex-shrink-0" />
            {apartment.habitaciones} hab · {apartment.banos} baños
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            {apartment.huespedes} huéspedes
          </span>
        </div>

        {/* Fila inferior: edificio + botón CTA */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="text-gray-500 text-xs truncate">
            {apartment.edificio}
            <span className="mx-1 text-gray-300">·</span>
            {apartment.ubicacion.cercaDe ?? apartment.ubicacion.ciudad}
          </p>

          <span className="shrink-0 bg-livic-black text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-colors group-hover:bg-livic-pink whitespace-nowrap">
            Ver ahora
          </span>
        </div>
      </div>
    </Link>
  )
}
