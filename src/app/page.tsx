/**
 * page.tsx – Home / Portal de búsqueda de alojamiento
 * Server Component. Layout split hero: texto izq + panel búsqueda der.
 * Solo modo claro — sin clases dark:
 */

import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Card from '@/components/Card'
import Section from '@/components/Section'
import AvailabilityBar from '@/components/AvailabilityBar'
import { getAllApartments } from '@/lib/catalog'
import { MapPin, Check } from 'lucide-react'

// ─── Tags de zona / tipo ───────────────────────────────────────────────────────
const ZONA_TAGS = [
  { label: 'Playa Salguero', emoji: '🏖️' },
  { label: 'Vista al mar', emoji: '🌊' },
  { label: 'Reserva del Mar', emoji: '🏢' },
  { label: 'El Rodadero', emoji: '🌆' },
  { label: 'Acceso directo playa', emoji: '🏄' },
]

// ─── Bullets del hero ─────────────────────────────────────────────────────────
const HERO_BULLETS = ['Apartamentos frente al mar Caribe', 'Check-in autónomo 24/7', 'Atención personalizada']

export default function CatalogHome() {
  const apartments = getAllApartments()

  return (
    <div className='min-h-screen bg-white'>
      <Nav />

      {/* ════════════════════════════════════════════════════════════
          A) HERO — Card con márgenes laterales
      ════════════════════════════════════════════════════════════ */}
      <header className='w-full pt-24 pb-10 px-4 md:px-8 xl:px-14 bg-white'>
        {/* Tarjeta hero: imagen de fondo con bordes redondeados */}
        <div className='relative max-w-6xl mx-auto rounded-3xl overflow-hidden min-h-[580px] md:min-h-[620px] flex items-center shadow-xl'>

          {/* Imagen de fondo */}
          {apartments.length > 0 && (
            <img
              src={apartments[0].heroPhoto.src}
              alt='Alojamientos en Santa Marta, Colombia'
              className='absolute inset-0 w-full h-full object-cover'
            />
          )}

          {/* Overlay gradiente izquierdo */}
          <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10' />

          {/* Contenido en dos columnas */}
          <div className='relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-8 md:px-14 py-14'>

            {/* ── Columna izquierda: texto ── */}
            <div>
              <span className='inline-block bg-livic-yellow text-livic-black text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide'>
                Alojamientos verificados
              </span>

              <h1 className='text-4xl md:text-5xl font-black text-white leading-tight mb-6'>
                Tu alojamiento ideal
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #E288AE, #AD80B4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  en Santa Marta
                </span>
              </h1>

              <ul className='space-y-3 mb-8'>
                {HERO_BULLETS.map((item) => (
                  <li key={item} className='flex items-center gap-3 text-white/85'>
                    <span className='w-5 h-5 rounded-full bg-livic-green/30 border border-livic-green/50 flex items-center justify-center flex-shrink-0'>
                      <Check className='w-3 h-3 text-livic-green' />
                    </span>
                    <span className='text-sm'>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href='#alojamientos'
                className='inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200'
              >
                <MapPin className='w-4 h-4' />
                Ver todos los alojamientos
              </a>
            </div>

            {/* ── Columna derecha: panel de búsqueda ── */}
            <div className='bg-white rounded-2xl shadow-2xl p-6 md:p-7 w-full max-w-sm ml-auto'>
              <h3 className='text-base font-bold text-gray-900 mb-1'>Consulta disponibilidad</h3>
              <p className='text-xs text-gray-500 mb-4'>Selecciona fechas y número de huéspedes</p>
              <AvailabilityBar />
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          B) TAGS DE ZONA — Pills horizontales
      ════════════════════════════════════════════════════════════ */}
      <div className='bg-gray-50 border-b border-gray-100'>
        <div className='max-w-6xl mx-auto px-6 md:px-12 xl:px-16 py-10'>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5'>Explora por zona</p>
          <div className='flex flex-wrap gap-3'>
            {ZONA_TAGS.map((tag) => (
              <button
                key={tag.label}
                type='button'
                className='inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-livic-pink hover:text-white hover:border-livic-pink transition-all duration-200 cursor-pointer bg-white'
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
      <div className='bg-gray-50'>
        <Section id='alojamientos' titulo='Alojamientos disponibles' subtitulo='Encuentra el apartamento ideal para tu estadía en Santa Marta' acento='pink' etiqueta='Catálogo'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {apartments.map((apt) => (
              <Card key={apt.slug} apartment={apt} />
            ))}
          </div>

          {/* Estado vacío */}
          {apartments.length === 0 && (
            <div className='text-center py-24 border border-dashed border-gray-200 rounded-3xl'>
              <p className='text-gray-400 text-lg'>No hay alojamientos disponibles en este momento. Vuelve pronto.</p>
            </div>
          )}
        </Section>
      </div>

      {/* ════════════════════════════════════════════════════════════
          E) FOOTER — 3 columnas
      ════════════════════════════════════════════════════════════ */}
      <footer className='bg-white border-t border-gray-100'>
        <div className='max-w-6xl mx-auto px-6 md:px-12 xl:px-16 py-14 md:py-16'>
          {/* Grid 3 columnas */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12'>
            {/* Col 1: Logo + descripción + sociales */}
            <div>
              <div className='mb-4'>
                <Image src='/logo-livic.png' alt='LIVIC' width={100} height={33} className='h-8 w-auto' />
              </div>
              <p className='text-gray-500 text-sm leading-relaxed mb-5 max-w-xs'>
                Alojamientos verificados en Santa Marta, Colombia. Disfruta el Caribe con comodidad y confianza.
              </p>
              {/* Íconos sociales */}
              <div className='flex items-center gap-3'>
                <a
                  href='https://wa.me/573000000000'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='WhatsApp'
                  className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-livic-green hover:text-white text-gray-500 transition-colors duration-200'
                >
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                  </svg>
                </a>
                <a
                  href='https://es-l.airbnb.com/rooms/1608385896028957180'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Airbnb'
                  className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-livic-pink hover:text-white text-gray-500 transition-colors duration-200'
                >
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12.005 2C6.478 2 2 6.478 2 12.005 2 17.522 6.478 22 12.005 22S22 17.522 22 12.005C22 6.478 17.522 2 12.005 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.505 0 4.694-3.806 8.5-8.5 8.5-4.7 0-8.505-3.806-8.505-8.5 0-4.699 3.806-8.505 8.505-8.505zm-.006 2.784c-.78 0-1.406.63-1.406 1.407 0 .776.626 1.406 1.406 1.406.78 0 1.41-.63 1.41-1.406 0-.777-.63-1.407-1.41-1.407zm-3.2 4.003c-.637 0-1.088.447-1.088 1.07v.008c0 .72.508 1.434 1.396 2.03.748.503 1.73.848 2.895.848 1.166 0 2.148-.345 2.896-.847.888-.597 1.396-1.311 1.396-2.03v-.009c0-.623-.451-1.07-1.089-1.07-.504 0-.862.3-1.152.55-.39.334-.786.527-2.051.527-1.265 0-1.662-.193-2.052-.527-.29-.25-.648-.55-1.151-.55z' />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Alojamientos */}
            <div>
              <h4 className='font-bold text-gray-900 text-sm uppercase tracking-wider mb-5'>Alojamientos</h4>
              <ul className='space-y-3'>
                {apartments.map((apt) => (
                  <li key={apt.slug}>
                    <Link href={`/apartamentos/${apt.slug}`} className='text-gray-500 text-sm hover:text-livic-pink transition-colors duration-200'>
                      {apt.nombre}
                    </Link>
                  </li>
                ))}
                {apartments.length === 0 && <li className='text-gray-400 text-sm'>Próximamente</li>}
              </ul>
            </div>

            {/* Col 3: Contacto */}
            <div>
              <h4 className='font-bold text-gray-900 text-sm uppercase tracking-wider mb-5'>Contacto</h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='https://wa.me/573000000000'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-500 text-sm hover:text-livic-green transition-colors duration-200 flex items-center gap-2'
                  >
                    <span className='w-1.5 h-1.5 rounded-full bg-livic-green inline-block flex-shrink-0' />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href='https://es-l.airbnb.com/rooms/1608385896028957180'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-500 text-sm hover:text-livic-pink transition-colors duration-200 flex items-center gap-2'
                  >
                    <span className='w-1.5 h-1.5 rounded-full bg-livic-pink inline-block flex-shrink-0' />
                    Airbnb
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Línea inferior */}
          <div className='border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3'>
            <span className='text-gray-400 text-xs'>© 2026 LIVIC · Santa Marta, Colombia</span>
            <div className='flex items-center gap-1.5'>
              <span className='w-1.5 h-1.5 rounded-full bg-livic-green inline-block' />
              <span className='text-gray-400 text-xs'>Disponible ahora</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
