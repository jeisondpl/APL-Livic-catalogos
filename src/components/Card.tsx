import Link from 'next/link'
import Image from 'next/image'
import type { Apartment } from '@/data/apartments'
import { Users, BedDouble, Bath, Heart, Star } from 'lucide-react'

interface CardProps {
  apartment: Apartment
}

export default function Card({ apartment }: CardProps) {
  const rating  = apartment.anfitrionPrincipal.calificacion ?? 5.0
  const resenas = apartment.anfitrionPrincipal.resenas ?? 0
  const precio  = apartment.precioNoche

  return (
    <Link
      href={`/apartamentos/${apartment.slug}`}
      className="card-hover group block bg-white rounded-[3.5rem] p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.10)] border border-gray-100"
    >
      {/* ── Imagen ── */}
      <div className="relative">
        {/* Imagen con overflow-hidden propio */}
        <div className="relative h-[280px] rounded-[3rem] overflow-hidden">
          <Image
            src={apartment.heroPhoto.src}
            alt={apartment.heroPhoto.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge top-left */}
          <div className="absolute top-5 left-5">
            <span className="bg-white px-5 py-2.5 rounded-[1.25rem] shadow-sm text-livic-pink font-bold text-sm">
              Top Rated
            </span>
          </div>

          {/* Corazón top-right */}
          <button
            aria-label="Guardar"
            className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-sm hover:scale-110 transition-transform"
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={20} className="text-gray-900" />
          </button>
        </div>

        {/* Rating badge — fuera del overflow-hidden, sobresale sobre el contenido */}
        <div className="absolute bottom-0 right-6 translate-y-1/2 bg-white px-4 py-2.5 rounded-[1.5rem] shadow-[0_10px_25px_rgba(0,0,0,0.10)] flex items-center gap-1.5 border border-gray-50 z-10">
          <Star size={16} className="fill-livic-yellow text-livic-yellow" />
          <span className="font-bold text-gray-900 text-base">{rating.toFixed(2)}</span>
          {resenas > 0 && (
            <span className="text-gray-400 text-sm font-medium">({resenas})</span>
          )}
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className="pt-10 px-3 pb-2">

        {/* Título */}
        <h3 className="text-[1.35rem] font-bold text-gray-900 leading-[1.2] mb-4 tracking-tight line-clamp-2">
          {apartment.nombre}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-6 text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <BedDouble size={20} className="text-gray-300" />
            <span className="text-base font-medium">{apartment.habitaciones} hab.</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={20} className="text-gray-300" />
            <span className="text-base font-medium">{apartment.banos} baños</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-gray-300" />
            <span className="text-base font-medium">{apartment.huespedes} huésp.</span>
          </div>
        </div>

        {/* Footer: precio + CTA */}
        <div className="flex items-center justify-between">
          {precio != null ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-[2rem] font-bold text-gray-900 tracking-tight">
                ${precio.toFixed(0)}
              </span>
              <span className="text-gray-400 text-base font-medium">/noche</span>
            </div>
          ) : (
            <p className="text-gray-400 text-sm truncate max-w-[140px]">
              {apartment.edificio}
            </p>
          )}

          <span className="bg-[#F3F4F6] px-7 py-4 rounded-[2rem] font-bold text-gray-900 text-base group-hover:bg-livic-pink group-hover:text-white transition-all whitespace-nowrap">
            Ver ahora
          </span>
        </div>
      </div>
    </Link>
  )
}
