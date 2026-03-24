/**
 * [slug]/page.tsx – Página de detalle de apartamento
 * Server Component. Genera las páginas estáticamente con generateStaticParams.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getApartmentBySlug, getAllSlugs } from '@/lib/catalog'
import ApartmentDetailClient from '@/components/ApartmentDetailClient'

// ── Params type ──────────────────────────────────────────────────────────────
interface SlugParams {
  slug: string
}

// ── generateStaticParams (pre-renderiza todas las páginas conocidas) ────────
export async function generateStaticParams(): Promise<SlugParams[]> {
  return getAllSlugs().map((slug) => ({ slug }))
}

// ── Metadata dinámica ────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<SlugParams>
}): Promise<Metadata> {
  const { slug } = await params
  const apartment = getApartmentBySlug(slug)
  if (!apartment) return { title: 'Apartamento no encontrado' }

  return {
    title: `${apartment.nombre} – LIVIC`,
    description: apartment.descripcionCorta,
  }
}

// ── Componente de página ─────────────────────────────────────────────────────
export default async function ApartmentDetailPage({
  params,
}: {
  params: Promise<SlugParams>
}) {
  const { slug } = await params
  const apartment = getApartmentBySlug(slug)

  if (!apartment) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ApartmentDetailClient apartment={apartment} />
    </div>
  )
}
