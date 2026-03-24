/**
 * page.tsx – Home / Portal de búsqueda de alojamiento
 * Server Component. Renderiza hero con buscador y listado de apartamentos.
 * Concepto: portal de disponibilidad y precios estilo Booking/Airbnb simplificado.
 */

import Image from 'next/image'
import Nav from '@/components/Nav'
import Card from '@/components/Card'
import Section from '@/components/Section'
import AvailabilityBar from '@/components/AvailabilityBar'
import ParallaxHero from '@/components/ParallaxHero'
import { getAllApartments } from '@/lib/catalog'
import { MapPin, ShieldCheck, Star, Waves } from 'lucide-react'

export default function CatalogHome() {
  const apartments = getAllApartments()

  return (
    <div className='min-h-screen bg-background'>
      <Nav />

      {/* ── Hero — Buscador principal ── */}
      <header className='relative w-full min-h-[90vh] flex flex-col justify-center pt-[64px] overflow-hidden'>

        {/* Fondo con parallax */}
        {apartments.length > 0 && (
          <ParallaxHero src={apartments[0].heroPhoto.src} alt='Alojamientos en Santa Marta, Colombia' />
        )}

        {/* Overlay adaptativo claro/oscuro */}
        <div className='absolute inset-0 hero-overlay-light' />

        {/* Contenido del hero */}
        <div className='relative z-10 flex flex-col items-center text-center px-5 py-20 md:py-28 max-w-4xl mx-auto w-full'>

          {/* Pill de ubicación */}
          <div className='inline-flex items-center gap-2 bg-white/60 dark:bg-livic-black/40 border border-gray-300/60 dark:border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm'>
            <MapPin className='w-3.5 h-3.5 text-livic-pink flex-shrink-0' />
            <span className='text-livic-black dark:text-white/90 text-xs font-bold uppercase tracking-[0.2em]'>Santa Marta, Colombia</span>
          </div>

          {/* Título principal */}
          <h1 className='text-4xl md:text-6xl font-black text-livic-black dark:text-white leading-[1.05] mb-5 tracking-tight'>
            Encuentra tu{' '}
            <span
              className='block md:inline'
              style={{
                background: 'linear-gradient(135deg, #E288AE 0%, #AD80B4 50%, #6AB895 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              alojamiento ideal
            </span>
            {' '}en Santa Marta
          </h1>

          {/* Subtítulo */}
          <p className='text-livic-black/60 dark:text-white/70 text-base md:text-lg max-w-xl leading-relaxed mb-10 font-light'>
            Consulta disponibilidad y precios en tiempo real.
            <br className='hidden md:block' />
            <span className='text-livic-black/80 dark:text-white/90 font-medium'>Apartamentos verificados frente al Caribe.</span>
          </p>

          {/* ── Barra de disponibilidad — elemento principal ── */}
          <div className='w-full max-w-2xl mb-10'>
            <AvailabilityBar />
          </div>

          {/* Stats rápidos de credibilidad */}
          <div className='flex items-center gap-5 md:gap-8 text-livic-black/50 dark:text-white/50 text-sm'>
            <div className='flex items-center gap-1.5'>
              <Star className='w-4 h-4 text-livic-yellow fill-livic-yellow flex-shrink-0' />
              <span><strong className='text-livic-black dark:text-white font-semibold'>5.0</strong> en Airbnb</span>
            </div>
            <div className='w-px h-4 bg-livic-black/15 dark:bg-white/20' />
            <div className='flex items-center gap-1.5'>
              <ShieldCheck className='w-4 h-4 text-livic-green flex-shrink-0' />
              <span><strong className='text-livic-black dark:text-white font-semibold'>{apartments.length}</strong> alojamiento{apartments.length !== 1 ? 's' : ''} verificado{apartments.length !== 1 ? 's' : ''}</span>
            </div>
            <div className='w-px h-4 bg-livic-black/15 dark:bg-white/20' />
            <div className='flex items-center gap-1.5'>
              <Waves className='w-4 h-4 text-livic-purple flex-shrink-0' />
              <span>Acceso al Caribe</span>
            </div>
          </div>
        </div>

        {/* Flecha de scroll */}
        <div className='relative z-10 flex justify-center pb-8'>
          <div className='flex flex-col items-center gap-1 text-livic-black/30 dark:text-white/40 animate-bounce'>
            <span className='text-[10px] uppercase tracking-widest font-medium'>Explorar</span>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='opacity-60'>
              <path d='M8 3v10M3 8l5 5 5-5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </div>
      </header>

      {/* ── Listado de alojamientos ── */}
      <Section
        titulo='Alojamientos en Santa Marta'
        subtitulo='Apartamentos verificados con acceso directo al mar Caribe.'
        acento='pink'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {apartments.map((apt) => (
            <Card key={apt.slug} apartment={apt} />
          ))}
        </div>

        {/* Estado vacío */}
        {apartments.length === 0 && (
          <div className='text-center py-24 border border-dashed border-surface-300 rounded-3xl'>
            <p className='text-text-muted text-lg'>No hay alojamientos disponibles en este momento. Vuelve pronto.</p>
          </div>
        )}
      </Section>

      {/* ── Footer simplificado ── */}
      <footer className='border-t border-gray-200 dark:border-surface-300/60 bg-background'>
        <div className='max-w-6xl mx-auto px-5 md:px-10 py-8'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>

            {/* Logo discreto */}
            <div className='flex items-center gap-3'>
              <Image
                src='/logo-livic.png'
                alt='Logo'
                width={80}
                height={26}
                className='h-6 w-auto opacity-50 block dark:hidden'
              />
              <Image
                src='/logo-livic-white.png'
                alt='Logo'
                width={80}
                height={26}
                className='h-6 w-auto opacity-40 hidden dark:block'
              />
              <span className='text-text-muted text-xs'>© 2026 · Santa Marta, Colombia</span>
            </div>

            {/* Derecha: estado + contacto */}
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-livic-green inline-block' />
                <span className='text-text-muted text-xs'>Disponible ahora</span>
              </div>
              <a
                href='https://wa.me/573000000000'
                target='_blank'
                rel='noopener noreferrer'
                className='text-text-muted text-xs hover:text-livic-green transition-colors'
              >
                WhatsApp
              </a>
              <a
                href='https://es-l.airbnb.com/rooms/1608385896028957180'
                target='_blank'
                rel='noopener noreferrer'
                className='text-text-muted text-xs hover:text-livic-pink transition-colors'
              >
                Airbnb
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
