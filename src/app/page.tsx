/**
 * page.tsx – Home
 * Server Component: carga los apartamentos y delega el flujo al cliente.
 */

import { getAllApartments } from '@/lib/catalog'
import SearchFlow from '@/components/SearchFlow'

export default function CatalogHome() {
  const apartments = getAllApartments()
  return <SearchFlow apartments={apartments} />
}
