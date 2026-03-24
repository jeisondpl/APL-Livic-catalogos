'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'

/* ── Tipos ── */
type GuestKey = 'adultos' | 'ninos' | 'bebes' | 'mascotas'
interface Guests { adultos: number; ninos: number; bebes: number; mascotas: number }

/* ── Helpers ── */
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

const GUEST_ROWS: { key: GuestKey; label: string; sub: string }[] = [
  { key: 'adultos', label: 'Adultos', sub: 'Edad: 13 años o más' },
  { key: 'ninos',   label: 'Niños',   sub: 'Edades 2 – 12' },
  { key: 'bebes',   label: 'Bebés',   sub: 'Menos de 2 años' },
  { key: 'mascotas',label: 'Mascotas',sub: '¿Traes a un animal de servicio?' },
]

/* ─────────────────────────────────────────────────────── */

export default function AvailabilityBar() {
  const [range, setRange] = useState('')
  const [guests, setGuests] = useState<Guests>({ adultos: 0, ninos: 0, bebes: 0, mascotas: 0 })
  const [panel, setPanel] = useState<'fechas' | 'quien' | null>(null)

  const wrapRef      = useRef<HTMLDivElement>(null)
  const calendarRef  = useRef<HTMLDivElement>(null)
  const rangeRef     = useRef('')

  rangeRef.current = range

  const today = new Date().toISOString().split('T')[0]
  const total  = Object.values(guests).reduce((a, b) => a + b, 0)

  /* ── Montar calendar-range de forma imperativa ── */
  const mountCalendar = useCallback(() => {
    const container = calendarRef.current
    if (!container) return

    import('cally').then(() => {
      if (!calendarRef.current) return
      container.innerHTML = ''

      const calRange = document.createElement('calendar-range') as HTMLElement & { value: string }
      calRange.setAttribute('locale', 'es-CO')
      calRange.setAttribute('min', today)
      calRange.setAttribute('months', '2')
      calRange.style.setProperty('--color-accent', '#E288AE')
      calRange.style.display = 'block'

      if (rangeRef.current) calRange.setAttribute('value', rangeRef.current)

      const month1 = document.createElement('calendar-month')
      const month2 = document.createElement('calendar-month')
      month2.setAttribute('offset', '1')

      const row = document.createElement('div')
      row.style.display = 'flex'
      row.style.flexDirection = 'row'
      row.style.gap = '2rem'
      row.style.alignItems = 'flex-start'
      row.appendChild(month1)
      row.appendChild(month2)

      calRange.appendChild(row)

      calRange.addEventListener('change', (e: Event) => {
        const val = (e.target as HTMLElement & { value: string }).value ?? ''
        setRange(val)
        rangeRef.current = val
        if (val.includes('/') && val.split('/').every(Boolean)) {
          setTimeout(() => setPanel(null), 180)
        }
      })

      container.appendChild(calRange)
    })
  }, [today])

  /* Montar cuando el panel 'fechas' se abre */
  useEffect(() => {
    if (panel === 'fechas') mountCalendar()
  }, [panel, mountCalendar])

  /* Cerrar al hacer clic fuera */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setPanel(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function adjust(key: GuestKey, delta: number) {
    setGuests(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }))
  }

  /* ── Render ── */
  return (
    <div ref={wrapRef} className="relative w-full">

      {/* ── Secciones apiladas verticalmente ── */}
      <div className="flex flex-col gap-2 mb-4">

        {/* Fechas */}
        <button
          onClick={() => setPanel(p => p === 'fechas' ? null : 'fechas')}
          className={`w-full flex flex-col items-start px-4 py-3 rounded-xl border transition-colors text-left
            ${panel === 'fechas'
              ? 'border-livic-pink bg-livic-pink/5'
              : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
        >
          <span className="text-xs font-semibold text-gray-700 tracking-wide">Fechas</span>
          <span className="text-sm text-gray-400 mt-0.5">
            {range ? formatRange(range) : 'Agrega fechas de entrada y salida'}
          </span>
        </button>

        {/* Quién */}
        <button
          onClick={() => setPanel(p => p === 'quien' ? null : 'quien')}
          className={`w-full flex flex-col items-start px-4 py-3 rounded-xl border transition-colors text-left
            ${panel === 'quien'
              ? 'border-livic-pink bg-livic-pink/5'
              : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
        >
          <span className="text-xs font-semibold text-gray-700 tracking-wide">Huéspedes</span>
          <span className="text-sm text-gray-400 mt-0.5">
            {total > 0 ? `${total} huésped${total !== 1 ? 'es' : ''}` : '¿Cuántos viajan?'}
          </span>
        </button>
      </div>

      {/* Botón buscar full-width */}
      <button
        onClick={() => setPanel(null)}
        aria-label="Buscar disponibilidad"
        className="w-full bg-livic-pink hover:bg-livic-pink/90 active:scale-[0.98] text-white rounded-xl py-3.5 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md"
      >
        <Search size={16} strokeWidth={2.5} />
        Buscar disponibilidad
      </button>

      {/* ── Panel calendario ── */}
      <div
        className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white
          rounded-2xl shadow-2xl border border-gray-200 z-50 p-6
          transition-all duration-200
          ${panel === 'fechas' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ minWidth: 'max-content' }}
      >
        <div ref={calendarRef} />
      </div>

      {/* ── Panel huéspedes ── */}
      {panel === 'quien' && (
        <div className="absolute top-full mt-3 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-5">
          {GUEST_ROWS.map((row, i) => (
            <div
              key={row.key}
              className={`flex items-center justify-between py-4
                ${i < GUEST_ROWS.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{row.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{row.sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjust(row.key, -1)}
                  disabled={guests[row.key] === 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 text-lg leading-none disabled:opacity-25 hover:border-gray-500 transition-colors"
                >–</button>
                <span className="w-5 text-center text-sm font-medium text-gray-900 tabular-nums">
                  {guests[row.key]}
                </span>
                <button
                  onClick={() => adjust(row.key, 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 text-lg leading-none hover:border-gray-500 transition-colors"
                >+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
