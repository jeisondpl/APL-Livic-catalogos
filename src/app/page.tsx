/**
 * page.tsx – Home / Catálogo
 * Server Component. Renderiza el listado de apartamentos.
 */

import Script from 'next/script'
import Nav from '@/components/Nav'
import Card from '@/components/Card'
import Section from '@/components/Section'
import AvailabilityBar from '@/components/AvailabilityBar'
import { getAllApartments } from '@/lib/catalog'

export default function CatalogHome() {
  const apartments = getAllApartments()

  return (
    <div className='min-h-screen bg-background'>
      <Nav />

      {/* ── Hero del catálogo ── */}
      <header className='relative w-full pt-[64px]'>
        {/* Capas de fondo: overflow-hidden solo aquí para no recortar los dropdowns */}
        <div className='absolute inset-0 overflow-hidden bg-background pointer-events-none'>
          {apartments.length > 0 && (
            <img
              src={apartments[0].heroPhoto.src}
              alt='Portada del catálogo LIVIC'
              className='absolute inset-0 w-full h-full object-cover opacity-60'
            />
          )}
          <div className='absolute inset-0 bg-gradient-to-b from-livic-black/20 via-livic-black/50 to-livic-black' />
        </div>

        {/* Contenido: sin overflow-hidden para que los dropdowns no se recorten */}
        <div className='relative z-10 flex flex-col items-center text-center px-5 py-24 md:py-32 max-w-3xl mx-auto'>
          <p className='text-livic-pink text-sm font-semibold uppercase tracking-widest mb-4'>LIVIC</p>

          <h1 className='text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4'>
            Apartamentos en
            <br />
            <span className='text-livic-pink'>Santa Marta</span>
          </h1>

          <p className='text-text-muted text-base md:text-lg max-w-xl leading-relaxed'>
            Espacios reales, anfitriones reales, experiencias reales. Descubre apartamentos cuidadosamente seleccionados para tu descanso.
          </p>

          {/* ── Barra de disponibilidad ── */}
          <div className='w-full mt-8 pb-16'>
            <AvailabilityBar />
          </div>
        </div>
      </header>

      {/* ── Listado de apartamentos ── */}
      <Section titulo='Nuestros apartamentos' acento='pink'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6'>
          {apartments.map((apt) => (
            <Card key={apt.slug} apartment={apt} />
          ))}
        </div>

        {/* Estado vacío (por si la lista estuviera vacía) */}
        {apartments.length === 0 && (
          <div className='text-center py-16'>
            <p className='text-text-muted text-lg'>Pronto estarán disponibles apartamentos. Vuelve después</p>
          </div>
        )}
      </Section>

      {/* ── Embed de Airbnb ── */}
      <Section titulo='Descubre en Airbnb' acento='pink'>
        <div className='flex justify-center w-full'>
          <div className='airbnb-embed-frame' data-id='1608385896028957180' data-view='home' data-hide-price='true' style={{ width: '450px', height: '300px', margin: 'auto' }}>
            <a href='https://es-l.airbnb.com/rooms/1608385896028957180?guests=1&adults=1&s=66&source=embed_widget'>Ver en Airbnb</a>
            <a href='https://es-l.airbnb.com/rooms/1608385896028957180?guests=1&adults=1&s=66&source=embed_widget' rel='nofollow'>
              Condo · Gaira · ★5.0 · 2 habitaciones · 2 camas · 2 baños
            </a>
            <Script src='https://www.airbnb.com.co/embeddable/airbnb_jssdk' strategy='lazyOnload' />
          </div>
        </div>
      </Section>

      {/* ── Sección "Cómo funciona LIVIC" ── */}
      <Section id='como-funciona' titulo='¿Qué hace LIVIC?' acento='green'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            {
              icono: '🏠',
              titulo: 'Espacios curados',
              texto: 'Solo publicamos apartamentos que conocemos de cerca. Sin sorpresas, sin fotos truchas.',
            },
            {
              icono: '🤝',
              titulo: 'Anfitriones cercanos',
              texto: 'Lina y el equipo LIVIC están disponibles antes, durante y después de tu estadía.',
            },
            {
              icono: '✨',
              titulo: 'Experiencia real',
              texto: 'Te contamos todo: lo que tiene, lo que no tiene, y cómo llegar. Sin filtros.',
            },
          ].map((item) => (
            <div key={item.titulo} className='bg-surface-100 border border-surface-300 rounded-xl p-6'>
              <span className='text-2xl'>{item.icono}</span>
              <h3 className='text-foreground font-semibold mt-3 mb-2'>{item.titulo}</h3>
              <p className='text-text-muted text-sm leading-relaxed'>{item.texto}</p>
            </div>
          ))}
        </div>

        {/* Frase de marca */}
        <div className='mt-10 text-center'>
          <p className='text-livic-purple text-lg md:text-xl italic font-light max-w-2xl mx-auto leading-relaxed'>
            "En LIVIC creemos que un buen viaje empieza desde el primer mensaje."
          </p>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className='border-t border-surface-300 py-8 px-5 text-center'>
        <p className='text-text-muted text-xs'>© 2026 LIVIC · Apartamentos en Santa Marta, Colombia</p>
      </footer>
    </div>
  )
}
