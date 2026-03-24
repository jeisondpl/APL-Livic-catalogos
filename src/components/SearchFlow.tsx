'use client'

/**
 * SearchFlow.tsx
 * Mobile  → scroll vertical, navbar fijo
 * Desktop → dos paneles side-by-side, transición horizontal con translateX
 *           scroll vertical solo dentro del panel de resultados
 */

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AvailabilityBar from '@/components/AvailabilityBar'
import Card from '@/components/Card'
import Section from '@/components/Section'
import { Search, Check, SlidersHorizontal } from 'lucide-react'
import type { Apartment } from '@/data/apartments'

// ── Constantes ──────────────────────────────────────────────────────────────────
const HERO_BULLETS = [
  'Apartamentos frente al mar Caribe',
  'Check-in autónomo 24/7',
  'Atención personalizada',
]

type FlowState = 'idle' | 'searching' | 'results'
interface SearchParams { range: string; guests: number }

function formatRange(value: string): string {
  if (!value?.includes('/')) return ''
  const [s, e] = value.split('/')
  if (!s || !e) return ''
  const fmt = (d: string) =>
    new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' }).format(
      new Date(d + 'T00:00:00'),
    )
  return `${fmt(s)} – ${fmt(e)}`
}

// ── SearchingScreen ──────────────────────────────────────────────────────────────
function SearchingScreen() {
  const [progress, setProgress] = useState(0)
  const [step, setStep]         = useState(0)
  const steps = ['Verificando disponibilidad...', 'Consultando precios...', 'Preparando resultados...']

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        const next = p + 2
        if (next >= 33 && step === 0) setStep(1)
        if (next >= 66 && step === 1) setStep(2)
        return Math.min(next, 98)
      })
    }, 30)
    return () => clearInterval(id)
  }, [step])

  return (
    <div className='flex flex-col items-center justify-center h-full px-4 animate-in fade-in duration-500'>
      <div className='relative mb-8'>
        <div className='w-20 h-20 rounded-full bg-livic-pink/10 flex items-center justify-center animate-pulse'>
          <div className='w-14 h-14 rounded-full bg-livic-pink/20 flex items-center justify-center'>
            <Search className='w-7 h-7 text-livic-pink' />
          </div>
        </div>
        <div className='absolute inset-0 rounded-full border-2 border-livic-pink/30 border-t-livic-pink animate-spin' />
      </div>
      <h3 className='text-xl font-bold text-gray-900 mb-2'>{steps[step]}</h3>
      <p className='text-sm text-gray-400 mb-8'>Santa Marta, Colombia</p>
      <div className='w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden'>
        <div className='h-full bg-livic-pink rounded-full transition-all duration-300' style={{ width: `${progress}%` }} />
      </div>
      <p className='text-xs text-gray-400 mt-3'>{progress}%</p>
    </div>
  )
}

// ── SearchSummaryBar ─────────────────────────────────────────────────────────────
function SearchSummaryBar({ params, onModify }: { params: SearchParams; onModify: () => void }) {
  const dateLabel  = params.range   ? formatRange(params.range)                                      : 'Fechas flexibles'
  const guestLabel = params.guests > 0 ? `${params.guests} huésped${params.guests !== 1 ? 'es' : ''}` : 'Huéspedes'

  return (
    <div className='sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm'>
      <div className='max-w-6xl mx-auto px-4 md:px-8 xl:px-14 py-3 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-3 text-sm text-gray-700 flex-wrap'>
          <Search className='w-4 h-4 text-livic-pink flex-shrink-0' />
          <span className='font-semibold'>{dateLabel}</span>
          <span className='w-px h-4 bg-gray-200 hidden sm:block' />
          <span className='text-gray-500'>{guestLabel}</span>
        </div>
        <button
          onClick={onModify}
          className='flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full px-3.5 py-2 hover:border-livic-pink hover:text-livic-pink transition-colors flex-shrink-0'
        >
          <SlidersHorizontal className='w-3.5 h-3.5' />
          Modificar
        </button>
      </div>
    </div>
  )
}

// ── HeroPanel ────────────────────────────────────────────────────────────────────
function HeroPanel({ onSearch }: { onSearch: (range: string, guests: number) => void }) {
  return (
    <div className='w-full h-full overflow-y-auto px-4 md:px-8 xl:px-14 py-6 flex items-start lg:items-center'>
      <div
        className='relative w-full max-w-6xl mx-auto rounded-3xl flex items-center shadow-xl animate-in fade-in zoom-in-95 duration-1000 fill-mode-both'
        style={{ minHeight: '560px' }}
      >
        {/* Fondo */}
        <div className='absolute inset-0 rounded-3xl overflow-hidden'>
          <img src='/portada.png' alt='Alojamientos Santa Marta' className='absolute inset-0 w-full h-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10' />
        </div>

        {/* Contenido */}
        <div className='relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center px-6 md:px-14 py-10 lg:py-14'>
          {/* Izquierda */}
          <div>
            <img
              src='/logo-livic-white.png'
              alt='LIVIC'
              className='h-14 w-auto mb-5 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-both delay-100'
            />
            <span className='inline-block bg-livic-yellow text-livic-black text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide animate-in fade-in slide-in-from-top-3 duration-700 fill-mode-both delay-200'>
              Alojamientos verificados
            </span>
            <h1 className='text-4xl md:text-5xl font-black text-white leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-300'>
              Tu alojamiento ideal
              <br />
              <span style={{ background: 'linear-gradient(135deg,#E288AE,#AD80B4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                en Santa Marta
              </span>
            </h1>
            <ul className='space-y-3 mb-8'>
              {HERO_BULLETS.map((item, i) => (
                <li
                  key={item}
                  style={{ animationDelay: `${400 + i * 100}ms` }}
                  className='flex items-center gap-3 text-white/85 animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both'
                >
                  <span className='w-5 h-5 rounded-full bg-livic-green/30 border border-livic-green/50 flex items-center justify-center flex-shrink-0'>
                    <Check className='w-3 h-3 text-livic-green' />
                  </span>
                  <span className='text-sm'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel de búsqueda */}
          <div className='bg-white rounded-2xl shadow-2xl p-6 md:p-7 w-full max-w-sm lg:ml-auto animate-in fade-in slide-in-from-right-6 duration-700 fill-mode-both delay-400'>
            <h3 className='text-base font-bold text-gray-900 mb-1'>Consulta disponibilidad</h3>
            <p className='text-xs text-gray-500 mb-4'>Selecciona fechas y número de huéspedes</p>
            <AvailabilityBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── ResultsPanel ─────────────────────────────────────────────────────────────────
function ResultsPanel({
  flow,
  params,
  apartments,
  onModify,
}: {
  flow: FlowState
  params: SearchParams
  apartments: Apartment[]
  onModify: () => void
}) {
  return (
    <div className='w-full h-full overflow-y-auto bg-white'>
      {flow === 'searching' && (
        <div className='h-full flex items-center justify-center'>
          <SearchingScreen />
        </div>
      )}

      {flow === 'results' && (
        <div className='animate-in fade-in duration-500'>
          <SearchSummaryBar params={params} onModify={onModify} />
          <div className='bg-gray-50'>
            <Section id='alojamientos' titulo='Alojamientos disponibles' acento='pink' etiqueta='Resultados'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {apartments.map((apt) => <Card key={apt.slug} apartment={apt} />)}
              </div>
              {apartments.length === 0 && (
                <div className='text-center py-24 border border-dashed border-gray-200 rounded-3xl'>
                  <p className='text-gray-400 text-lg'>No hay alojamientos disponibles para esas fechas.</p>
                </div>
              )}
            </Section>
          </div>

          {/* Footer */}
          <footer className='bg-white border-t border-gray-100'>
            <div className='max-w-6xl mx-auto px-6 md:px-12 xl:px-16 py-14 md:py-16'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12'>
                <div>
                  <Image src='/logo-livic.png' alt='LIVIC' width={100} height={33} className='h-8 w-auto mb-4' />
                  <p className='text-gray-500 text-sm leading-relaxed mb-5 max-w-xs'>
                    Alojamientos verificados en Santa Marta, Colombia.
                  </p>
                  <div className='flex items-center gap-3'>
                    <a href='https://wa.me/573000000000' target='_blank' rel='noopener noreferrer'
                      className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-livic-green hover:text-white text-gray-500 transition-colors'>
                      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/></svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className='font-bold text-gray-900 text-sm uppercase tracking-wider mb-5'>Alojamientos</h4>
                  <ul className='space-y-3'>
                    {apartments.map((apt) => (
                      <li key={apt.slug}>
                        <Link href={`/apartamentos/${apt.slug}`} className='text-gray-500 text-sm hover:text-livic-pink transition-colors'>{apt.nombre}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className='font-bold text-gray-900 text-sm uppercase tracking-wider mb-5'>Contacto</h4>
                  <ul className='space-y-3'>
                    <li><a href='https://wa.me/573000000000' target='_blank' rel='noopener noreferrer' className='text-gray-500 text-sm hover:text-livic-green transition-colors flex items-center gap-2'><span className='w-1.5 h-1.5 rounded-full bg-livic-green inline-block' />WhatsApp</a></li>
                    <li><a href='https://es-l.airbnb.com/rooms/1608385896028957180' target='_blank' rel='noopener noreferrer' className='text-gray-500 text-sm hover:text-livic-pink transition-colors flex items-center gap-2'><span className='w-1.5 h-1.5 rounded-full bg-livic-pink inline-block' />Airbnb</a></li>
                  </ul>
                </div>
              </div>
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
      )}
    </div>
  )
}

// ── SearchFlow (componente raíz) ─────────────────────────────────────────────────
export default function SearchFlow({ apartments }: { apartments: Apartment[] }) {
  const [flow,   setFlow]   = useState<FlowState>('idle')
  const [params, setParams] = useState<SearchParams>({ range: '', guests: 0 })
  const desktopRef          = useRef<HTMLDivElement>(null)

  // ── Transición horizontal en desktop ──
  const isRight = flow !== 'idle'

  function handleSearch(range: string, guests: number) {
    setParams({ range, guests })
    setFlow('searching')
    setTimeout(() => setFlow('results'), 2400)
  }

  function handleModify() {
    setFlow('idle')
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          MOBILE  (< lg) — scroll vertical normal
      ══════════════════════════════════════════════════════════════ */}
      <div className='lg:hidden min-h-screen bg-white'>
        {flow === 'idle' && (
          <div className='h-screen'>
            <HeroPanel onSearch={handleSearch} />
          </div>
        )}
        {flow === 'searching' && (
          <div className='min-h-screen flex items-center justify-center animate-in fade-in duration-400'>
            <SearchingScreen />
          </div>
        )}
        {flow === 'results' && (
          <div className='animate-in fade-in duration-500'>
            <SearchSummaryBar params={params} onModify={handleModify} />
            <div className='bg-gray-50'>
              <Section id='alojamientos' titulo='Alojamientos disponibles' acento='pink' etiqueta='Resultados'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  {apartments.map((apt) => <Card key={apt.slug} apartment={apt} />)}
                </div>
              </Section>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP (≥ lg) — scroll horizontal entre paneles
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={desktopRef}
        className='hidden lg:block h-screen overflow-hidden'
      >
        {/* Track de dos paneles que se desplaza horizontalmente */}
        <div
          className='flex flex-row h-full'
          style={{
            width: '200vw',
            transform: isRight ? 'translateX(-50%)' : 'translateX(0)',
            transition: 'transform 0.65s cubic-bezier(0.77,0,0.175,1)',
          }}
        >
          {/* Panel 0 — Hero */}
          <div className='w-screen h-full flex-shrink-0'>
            <HeroPanel onSearch={handleSearch} />
          </div>

          {/* Panel 1 — Searching / Results */}
          <div className='w-screen h-full flex-shrink-0 overflow-y-auto'>
            <ResultsPanel flow={flow} params={params} apartments={apartments} onModify={handleModify} />
          </div>
        </div>
      </div>
    </>
  )
}
