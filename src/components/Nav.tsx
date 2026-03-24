/**
 * Nav.tsx
 * Barra de navegación superior — Server Component (sin estado).
 * Fondo blanco puro, links centrados, sin ThemeToggle, sin CTA pill.
 */

import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 bg-white border-b border-gray-100">

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center hover:opacity-75 transition-opacity"
      >
        <Image
          src="/logo-livic.png"
          alt="LIVIC"
          width={110}
          height={37}
          className="h-8 w-auto"
          priority
        />
      </Link>

      {/* Links de navegación centrados (desktop) */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Inicio
        </Link>
        <Link
          href="/#alojamientos"
          className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Alojamientos
        </Link>
        <a
          href="https://wa.me/573000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Contacto
        </a>
      </div>

      {/* Derecha: solo WhatsApp link */}
      <a
        href="https://wa.me/573000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center text-sm text-gray-600 font-medium hover:text-livic-green transition-colors duration-200"
      >
        WhatsApp
      </a>
    </nav>
  );
}
