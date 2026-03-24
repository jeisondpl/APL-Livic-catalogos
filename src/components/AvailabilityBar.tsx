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
  const calendarRef  = useRef<HTMLDivElement>(null)   // contenedor del calendario imperativo
  const rangeRef     = useRef('')                      // valor actual sin stale closure

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
      calRange.setAttribute('months', '2')       // navegar de a 2 meses
      calRange.style.setProperty('--color-accent', '#E288AE')
      calRange.style.display = 'grid'
      calRange.style.gridTemplateColumns = '1fr 1fr'
      calRange.style.gap = '1.5rem'

      if (rangeRef.current) calRange.setAttribute('value', rangeRef.current)

      const month1 = document.createElement('calendar-month')
      const month2 = document.createElement('calendar-month')
      month2.setAttribute('offset', '1')

      calRange.appendChild(month1)
      calRange.appendChild(month2)

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
    <div ref={wrapRef} className="relative w-full max-w-2xl mx-auto">

      {/* ── Barra pill ── */}
      <div className="flex items-center bg-white dark:bg-surface-100 rounded-full shadow-xl border border-surface-300">

        {/* Fechas */}
        <button
          onClick={() => setPanel(p => p === 'fechas' ? null : 'fechas')}
          className={`flex-1 flex flex-col items-start px-6 py-3.5 rounded-l-full transition-colors min-w-0
            ${panel === 'fechas' ? 'bg-surface-200' : 'hover:bg-surface-100 dark:hover:bg-surface-200'}`}
        >
          <span className="text-xs font-semibold text-foreground tracking-wide">Fechas</span>
          <span className="text-sm text-text-muted truncate w-full mt-0.5">
            {range ? formatRange(range) : 'Agrega fechas'}
          </span>
        </button>

        {/* Divisor */}
        <div className="w-px h-8 bg-surface-300 shrink-0" />

        {/* Quién */}
        <button
          onClick={() => setPanel(p => p === 'quien' ? null : 'quien')}
          className={`flex-1 flex flex-col items-start px-6 py-3.5 transition-colors min-w-0
            ${panel === 'quien' ? 'bg-surface-200' : 'hover:bg-surface-100 dark:hover:bg-surface-200'}`}
        >
          <span className="text-xs font-semibold text-foreground tracking-wide">Quién</span>
          <span className="text-sm text-text-muted mt-0.5">
            {total > 0 ? `${total} huésped${total !== 1 ? 'es' : ''}` : '¿Cuántos?'}
          </span>
        </button>

        {/* Botón buscar */}
        <div className="pr-2 shrink-0">
          <button
            onClick={() => setPanel(null)}
            aria-label="Buscar disponibilidad"
            className="bg-livic-pink hover:bg-livic-pink/85 active:scale-95 text-white rounded-full p-3.5 transition-all flex items-center justify-center shadow-md"
          >
            <Search size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ── Panel calendario (siempre en DOM, visible/oculto) ── */}
      <div
        className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white dark:bg-surface-100
          rounded-2xl shadow-2xl border border-surface-300 z-50 p-5 w-max
          transition-all duration-200
          ${panel === 'fechas' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Contenedor donde se monta cally de forma imperativa */}
        <div ref={calendarRef} />
      </div>

      {/* ── Panel huéspedes ── */}
      {panel === 'quien' && (
        <div className="absolute top-full mt-3 right-0 w-80 bg-white dark:bg-surface-100 rounded-2xl shadow-2xl border border-surface-300 z-50 p-5">
          {GUEST_ROWS.map((row, i) => (
            <div
              key={row.key}
              className={`flex items-center justify-between py-4
                ${i < GUEST_ROWS.length - 1 ? 'border-b border-surface-300' : ''}`}
            >
              <div>
                <p className="text-sm font-medium text-foreground">{row.label}</p>
                <p className="text-xs text-text-muted mt-0.5">{row.sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjust(row.key, -1)}
                  disabled={guests[row.key] === 0}
                  className="w-8 h-8 rounded-full border border-surface-300 flex items-center justify-center text-foreground text-lg leading-none disabled:opacity-25 hover:border-foreground transition-colors"
                >–</button>
                <span className="w-5 text-center text-sm font-medium text-foreground tabular-nums">
                  {guests[row.key]}
                </span>
                <button
                  onClick={() => adjust(row.key, 1)}
                  className="w-8 h-8 rounded-full border border-surface-300 flex items-center justify-center text-foreground text-lg leading-none hover:border-foreground transition-colors"
                >+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
