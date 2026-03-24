/**
 * page.tsx – Home / Catálogo
 * Server Component. Renderiza el listado de apartamentos.
 * Rediseñado: hero con gradiente de texto, secciones premium, footer con logo.
 */

import Script from 'next/script'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Card from '@/components/Card'
import Section from '@/components/Section'
import AvailabilityBar from '@/components/AvailabilityBar'
import { getAllApartments } from '@/lib/catalog'
import { MapPin, ShieldCheck, Sparkles } from 'lucide-react'

export default function CatalogHome() {
  const apartments = getAllApartments()

  return (
    <div className='min-h-screen bg-background'>
      <Nav />

      {/* ── Hero del catálogo ── */}
      <header className='relative w-full min-h-[90vh] flex flex-col justify-center pt-[64px]'>

        {/* Capas de fondo: overflow-hidden solo aquí para no recortar los dropdowns */}
        <div className='absolute inset-0 overflow-hidden bg-livic-black pointer-events-none'>
          {apartments.length > 0 && (
            <img
              src={apartments[0].heroPhoto.src}
              alt='Portada del catálogo LIVIC'
              className='absolute inset-0 w-full h-full object-cover opacity-40'
            />
          )}
          {/* Gradiente multicapa para drama visual */}
          <div className='absolute inset-0 bg-gradient-to-br from-livic-black via-livic-black/80 to-livic-black/60' />
          <div className='absolute inset-0 bg-gradient-to-t from-livic-black via-transparent to-transparent' />
          {/* Acento de color sutil en esquina */}
          <div className='absolute top-0 right-0 w-96 h-96 bg-livic-pink/10 rounded-full blur-3xl' />
          <div className='absolute bottom-1/3 left-0 w-72 h-72 bg-livic-purple/10 rounded-full blur-3xl' />
        </div>

        {/* Contenido del hero */}
        <div className='relative z-10 flex flex-col items-center text-center px-5 py-20 md:py-28 max-w-4xl mx-auto w-full'>

          {/* Pill de etiqueta */}
          <div className='inline-flex items-center gap-2 bg-livic-pink/15 border border-livic-pink/30 rounded-full px-4 py-1.5 mb-8'>
            <MapPin className='w-3.5 h-3.5 text-livic-pink flex-shrink-0' />
            <span className='text-livic-pink text-xs font-bold uppercase tracking-[0.2em]'>Santa Marta, Colombia</span>
          </div>

          {/* Título con gradiente de texto */}
          <h1 className='text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight'>
            Escápate al{' '}
            <span
              className='block md:inline'
              style={{
                background: 'linear-gradient(135deg, #E288AE 0%, #AD80B4 50%, #6AB895 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Caribe
            </span>
          </h1>

          {/* Tagline */}
          <p className='text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-4 font-light'>
            Apartamentos cuidadosamente seleccionados en Santa Marta.
            <br className='hidden md:block' />
            <span className='text-white/90 font-medium'>Anfitriones reales. Experiencias reales. Sin filtros.</span>
          </p>

          {/* Stats rápidos */}
          <div className='flex items-center gap-6 md:gap-8 mb-12 text-white/60 text-sm'>
            <div className='flex items-center gap-2'>
              <span className='text-livic-yellow text-base'>★</span>
              <span><strong className='text-white'>5.0</strong> en Airbnb</span>
            </div>
            <div className='w-px h-4 bg-white/20' />
            <div>
              <strong className='text-white'>{apartments.length}</strong> apartamento{apartments.length !== 1 ? 's' : ''} disponible{apartments.length !== 1 ? 's' : ''}
            </div>
            <div className='w-px h-4 bg-white/20' />
            <div>Desde <strong className='text-white'>Santa Marta</strong></div>
          </div>

          {/* ── Barra de disponibilidad ── */}
          <div className='w-full max-w-2xl pb-8'>
            <AvailabilityBar />
          </div>
        </div>

        {/* Flecha scroll */}
        <div className='relative z-10 flex justify-center pb-8'>
          <div className='flex flex-col items-center gap-1 text-white/40 animate-bounce'>
            <span className='text-[10px] uppercase tracking-widest font-medium'>Explorar</span>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='opacity-60'>
              <path d='M8 3v10M3 8l5 5 5-5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </div>
      </header>

      {/* ── Listado de apartamentos ── */}
      <Section
        titulo='Nuestros apartamentos'
        subtitulo='Cada espacio ha sido visitado y verificado por el equipo LIVIC. Lo que ves es lo que encuentras.'
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
            <p className='text-text-muted text-lg'>Pronto estarán disponibles apartamentos. Vuelve después.</p>
          </div>
        )}
      </Section>

      {/* ── Sección "Cómo funciona LIVIC" ── */}
      <Section
        id='como-funciona'
        titulo='¿Qué hace LIVIC?'
        subtitulo='No somos una plataforma genérica. Somos un equipo que conoce cada apartamento de primera mano.'
        acento='green'
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14'>

          {/* Card 1 — Espacios curados */}
          <div className='relative overflow-hidden rounded-3xl p-7 bg-livic-green/10 border border-livic-green/20 group hover:border-livic-green/50 transition-all duration-300'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-livic-green/10 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:opacity-70 transition-opacity' />
            <div className='relative z-10'>
              <div className='w-12 h-12 rounded-2xl bg-livic-green/20 flex items-center justify-center mb-5'>
                <ShieldCheck className='w-6 h-6 text-livic-green' />
              </div>
              <h3 className='text-foreground font-bold text-lg mb-2'>Espacios curados</h3>
              <p className='text-text-muted text-sm leading-relaxed'>
                Solo publicamos apartamentos que conocemos de cerca. Sin sorpresas, sin fotos truchas.
              </p>
            </div>
          </div>

          {/* Card 2 — Anfitriones cercanos (card central, destaca con pink) */}
          <div className='relative overflow-hidden rounded-3xl p-7 bg-livic-pink/10 border border-livic-pink/20 group hover:border-livic-pink/50 transition-all duration-300'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-livic-pink/10 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:opacity-70 transition-opacity' />
            <div className='relative z-10'>
              <div className='w-12 h-12 rounded-2xl bg-livic-pink/20 flex items-center justify-center mb-5'>
                {/* Icono de personas / equipo */}
                <svg className='w-6 h-6 text-livic-pink' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M17 20h5v-2a4 4 0 0 0-4-4h-1M9 20H4v-2a4 4 0 0 1 4-4h1m4-4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                </svg>
              </div>
              <h3 className='text-foreground font-bold text-lg mb-2'>Anfitriones cercanos</h3>
              <p className='text-text-muted text-sm leading-relaxed'>
                Lina y el equipo LIVIC están disponibles antes, durante y después de tu estadía.
              </p>
            </div>
          </div>

          {/* Card 3 — Experiencia real */}
          <div className='relative overflow-hidden rounded-3xl p-7 bg-livic-purple/10 border border-livic-purple/20 group hover:border-livic-purple/50 transition-all duration-300'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-livic-purple/10 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:opacity-70 transition-opacity' />
            <div className='relative z-10'>
              <div className='w-12 h-12 rounded-2xl bg-livic-purple/20 flex items-center justify-center mb-5'>
                <Sparkles className='w-6 h-6 text-livic-purple' />
              </div>
              <h3 className='text-foreground font-bold text-lg mb-2'>Experiencia real</h3>
              <p className='text-text-muted text-sm leading-relaxed'>
                Te contamos todo: lo que tiene, lo que no tiene, y cómo llegar. Sin filtros.
              </p>
            </div>
          </div>
        </div>

        {/* Frase de marca destacada */}
        <div className='relative overflow-hidden rounded-3xl bg-livic-black dark:bg-surface-100 border border-surface-300 p-8 md:p-12 text-center'>
          <div className='absolute inset-0 opacity-5'>
            <div className='absolute top-0 left-1/4 w-64 h-64 bg-livic-pink rounded-full blur-3xl' />
            <div className='absolute bottom-0 right-1/4 w-64 h-64 bg-livic-purple rounded-full blur-3xl' />
          </div>
          <div className='relative z-10'>
            <p
              className='text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-3xl mx-auto'
              style={{
                background: 'linear-gradient(135deg, #E288AE 0%, #AD80B4 55%, #6AB895 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              "En LIVIC creemos que un buen viaje empieza desde el primer mensaje."
            </p>
          </div>
        </div>
      </Section>

      {/* ── Embed de Airbnb ── */}
      <Section titulo='Descubre en Airbnb' acento='yellow'>
        <div className='flex justify-center w-full'>
          <div
            className='airbnb-embed-frame rounded-2xl overflow-hidden shadow-lg'
            data-id='1608385896028957180'
            data-view='home'
            data-hide-price='true'
            style={{ width: '450px', height: '300px' }}
          >
            <a href='https://es-l.airbnb.com/rooms/1608385896028957180?guests=1&adults=1&s=66&source=embed_widget'>Ver en Airbnb</a>
            <a href='https://es-l.airbnb.com/rooms/1608385896028957180?guests=1&adults=1&s=66&source=embed_widget' rel='nofollow'>
              Condo · Gaira · ★5.0 · 2 habitaciones · 2 camas · 2 baños
            </a>
            <Script src='https://www.airbnb.com.co/embeddable/airbnb_jssdk' strategy='lazyOnload' />
          </div>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className='border-t border-surface-300/60 bg-background'>
        <div className='max-w-6xl mx-auto px-5 md:px-10 py-12 md:py-16'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-10'>

            {/* Columna logo + descripcion */}
            <div className='md:col-span-1'>
              <div className='mb-4'>
                <Image
                  src='/logo-livic.png'
                  alt='LIVIC'
                  width={110}
                  height={36}
                  className='h-8 w-auto block dark:hidden'
                />
                <Image
                  src='/logo-livic-white.png'
                  alt='LIVIC'
                  width={110}
                  height={36}
                  className='h-8 w-auto hidden dark:block'
                />
              </div>
              <p className='text-text-muted text-sm leading-relaxed max-w-xs'>
                Apartamentos seleccionados en Santa Marta, Colombia. Anfitriones reales, experiencias reales.
              </p>
            </div>

            {/* Columna links */}
            <div>
              <h4 className='text-foreground text-xs font-bold uppercase tracking-widest mb-4'>Explorar</h4>
              <ul className='space-y-3'>
                <li>
                  <a href='/' className='text-text-muted text-sm hover:text-livic-pink transition-colors'>
                    Catálogo
                  </a>
                </li>
                <li>
                  <a href='/#como-funciona' className='text-text-muted text-sm hover:text-livic-pink transition-colors'>
                    Cómo funciona
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna contacto */}
            <div>
              <h4 className='text-foreground text-xs font-bold uppercase tracking-widest mb-4'>Contacto</h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='https://wa.me/573000000000'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-text-muted text-sm hover:text-livic-green transition-colors'
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href='https://es-l.airbnb.com/rooms/1608385896028957180'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-text-muted text-sm hover:text-livic-pink transition-colors'
                  >
                    Airbnb
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Línea inferior */}
          <div className='pt-8 border-t border-surface-300/50 flex flex-col sm:flex-row items-center justify-between gap-3'>
            <p className='text-text-muted text-xs'>
              © 2026 LIVIC · Santa Marta, Colombia
            </p>
            <div className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-livic-green inline-block' />
              <span className='text-text-muted text-xs'>Disponible ahora</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
