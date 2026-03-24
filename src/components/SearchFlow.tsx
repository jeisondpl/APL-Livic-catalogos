'use client'

/**
 * SearchFlow.tsx
 * Orquesta el flujo de búsqueda de disponibilidad:
 *   idle      → solo Hero visible
 *   searching → animación de búsqueda
 *   results   → barra de resumen + grid de alojamientos + footer
 */

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Check, SlidersHorizontal, X } from 'lucide-react'
import AvailabilityBar from '@/components/AvailabilityBar'
import Card from '@/components/Card'
import Section from '@/components/Section'
import type { Apartment } from '@/data/apartments'

// ─── Bullets del hero ──────────────────────────────────────────────────────────
const HERO_BULLETS = ['Apartamentos frente al mar Caribe', 'Check-in autónomo 24/7', 'Atención personalizada']

type FlowState = 'idle' | 'searching' | 'results'

interface SearchParams {
  range: string
  guests: number
}

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

/* ── Animación de búsqueda ─────────────────────────────────────────────────── */
function SearchingScreen() {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)

  const steps = [
    'Verificando disponibilidad...',
    'Consultando precios...',
    'Preparando resultados...',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 2
        if (next >= 33 && step === 0) setStep(1)
        if (next >= 66 && step === 1) setStep(2)
        return Math.min(next, 98)
      })
    }, 30)
    return () => clearInterval(interval)
  }, [step])

  return (
    <div className='flex flex-col items-center justify-center py-28 px-4 animate-in fade-in duration-500'>
      {/* Icono pulsante */}
      <div className='relative mb-8'>
        <div className='w-20 h-20 rounded-full bg-livic-pink/10 flex items-center justify-center animate-pulse'>
          <div className='w-14 h-14 rounded-full bg-livic-pink/20 flex items-center justify-center'>
            <Search className='w-7 h-7 text-livic-pink' />
          </div>
        </div>
        {/* Anillo giratorio */}
        <div className='absolute inset-0 rounded-full border-2 border-livic-pink/30 border-t-livic-pink animate-spin' />
      </div>

      <h3 className='text-xl font-bold text-gray-900 mb-2'>{steps[step]}</h3>
      <p className='text-sm text-gray-400 mb-8'>Santa Marta, Colombia</p>

      {/* Barra de progreso */}
      <div className='w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden'>
        <div
          className='h-full bg-livic-pink rounded-full transition-all duration-300'
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className='text-xs text-gray-400 mt-3'>{progress}%</p>
    </div>
  )
}

/* ── Barra de resumen de búsqueda ──────────────────────────────────────────── */
function SearchSummaryBar({
  params,
  onModify,
}: {
  params: SearchParams
  onModify: () => void
}) {
  const dateLabel = params.range ? formatRange(params.range) : 'Fechas flexibles'
  const guestLabel = params.guests > 0
    ? `${params.guests} huésped${params.guests !== 1 ? 'es' : ''}`
    : 'Huéspedes'

  return (
    <div className='sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm'>
      <div className='max-w-6xl mx-auto px-4 md:px-8 xl:px-14 py-3 flex items-center justify-between gap-4'>
        {/* Info de búsqueda */}
        <div className='flex items-center gap-3 text-sm text-gray-700 flex-wrap'>
          <Search className='w-4 h-4 text-livic-pink flex-shrink-0' />
          <span className='font-semibold'>{dateLabel}</span>
          <span className='w-px h-4 bg-gray-200 hidden sm:block' />
          <span className='text-gray-500'>{guestLabel}</span>
          <span className='w-px h-4 bg-gray-200 hidden sm:block' />
          <span className='text-gray-400 text-xs'>{new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })}</span>
        </div>

        {/* Botón modificar */}
        <button
          onClick={onModify}
          className='flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full px-3.5 py-2 hover:border-livic-pink hover:text-livic-pink transition-colors duration-200 flex-shrink-0'
        >
          <SlidersHorizontal className='w-3.5 h-3.5' />
          Modificar
        </button>
      </div>
    </div>
  )
}

/* ── Componente principal ──────────────────────────────────────────────────── */
interface SearchFlowProps {
  apartments: Apartment[]
}

export default function SearchFlow({ apartments }: SearchFlowProps) {
  const [flow, setFlow] = useState<FlowState>('idle')
  const [params, setParams] = useState<SearchParams>({ range: '', guests: 0 })
  const [heroVisible, setHeroVisible] = useState(true)

  function handleSearch(range: string, guests: number) {
    setParams({ range, guests })
    // 1. Fade out hero
    setHeroVisible(false)
    // 2. Después del fade, mostrar searching
    setTimeout(() => {
      setFlow('searching')
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }, 350)
    // 3. Mostrar resultados
    setTimeout(() => setFlow('results'), 2400)
  }

  function handleModify() {
    setFlow('idle')
    setHeroVisible(true)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  return (
    <div className='min-h-screen bg-white overflow-x-hidden'>

      {/* ═══════════════════════════════════════════════════════
          A) HERO — se oculta al buscar
      ═══════════════════════════════════════════════════════ */}
      {flow === 'idle' && (
      <header
        className={`w-full h-screen px-4 md:px-8 xl:px-14 py-6 bg-white flex items-center transition-opacity duration-300 ${
          heroVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='relative w-full max-w-6xl mx-auto rounded-3xl flex-1 h-full flex items-center shadow-xl animate-in fade-in zoom-in-95 duration-1000 fill-mode-both' style={{ minHeight: 0 }}>

          {/* Capa de fondo */}
          <div className='absolute inset-0 rounded-3xl overflow-hidden'>
            <img
              src='/portada.png'
              alt='Alojamientos en Santa Marta, Colombia'
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10' />
          </div>

          {/* Contenido */}
          <div className='relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-8 md:px-14 py-14'>

            {/* ── Columna izquierda: texto ── */}
            <div>
              <img
                src='/logo-livic-white.png'
                alt='LIVIC'
                className='h-16 w-auto mb-5 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-both delay-100'
              />
              <span className='inline-block bg-livic-yellow text-livic-black text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide animate-in fade-in slide-in-from-top-3 duration-700 fill-mode-both delay-200'>
                Alojamientos verificados
              </span>
              <h1 className='text-4xl md:text-5xl font-black text-white leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-300'>
                Tu alojamiento ideal
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #E288AE, #AD80B4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
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
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className='inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both delay-700'
              >
                <MapPin className='w-4 h-4' />
                Ver todos los alojamientos
              </button>
            </div>

            {/* ── Columna derecha: panel de búsqueda ── */}
            <div className='bg-white rounded-2xl shadow-2xl p-6 md:p-7 w-full max-w-sm ml-auto animate-in fade-in slide-in-from-right-6 duration-700 fill-mode-both delay-400'>
              <h3 className='text-base font-bold text-gray-900 mb-1'>Consulta disponibilidad</h3>
              <p className='text-xs text-gray-500 mb-4'>Selecciona fechas y número de huéspedes</p>
              <AvailabilityBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </header>
      )}

      {/* ═══════════════════════════════════════════════════════
          SEARCHING — pantalla completa, sin hero
      ═══════════════════════════════════════════════════════ */}
      {flow === 'searching' && (
        <div className='min-h-screen bg-white flex items-center justify-center animate-in fade-in duration-400'>
          <SearchingScreen />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          RESULTS — Barra resumen + Grid + Footer
      ═══════════════════════════════════════════════════════ */}
      {flow === 'results' && (
        <div className='animate-in fade-in slide-in-from-bottom-3 duration-500'>

          {/* Barra sticky de resumen */}
          <SearchSummaryBar params={params} onModify={handleModify} />

          {/* Grid de alojamientos */}
          <div className='bg-gray-50'>
            <Section
              id='alojamientos'
              titulo='Alojamientos disponibles'
              subtitulo='Encuentra el apartamento ideal para tu estadía en Santa Marta'
              acento='pink'
              etiqueta='Resultados'
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {apartments.map((apt) => (
                  <Card key={apt.slug} apartment={apt} />
                ))}
              </div>
              {apartments.length === 0 && (
                <div className='text-center py-24 border border-dashed border-gray-200 rounded-3xl'>
                  <p className='text-gray-400 text-lg'>No hay alojamientos disponibles para esas fechas.</p>
                </div>
              )}
            </Section>
          </div>

      
        </div>
      )}
    </div>
  )
}
