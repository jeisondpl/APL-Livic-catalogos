/**
 * Nav.tsx
 * Barra de navegación superior — Server Component (sin estado).
 * Estilo Travila: fondo sólido blanco, links directos con hover livic-pink,
 * botón CTA pill derecha.
 */

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 bg-white dark:bg-livic-black border-b border-gray-100 dark:border-surface-300/30 transition-colors duration-300">

      {/* Logo / Marca */}
      <Link
        href="/"
        className="flex items-center hover:opacity-75 transition-opacity"
      >
        {/* Logo modo claro */}
        <Image
          src="/logo-livic.png"
          alt="LIVIC"
          width={110}
          height={37}
          className="h-8 w-auto block dark:hidden"
          priority
        />
        {/* Logo modo oscuro */}
        <Image
          src="/logo-livic-white.png"
          alt="LIVIC"
          width={110}
          height={37}
          className="h-8 w-auto hidden dark:block"
          priority
        />
      </Link>

      {/* Links de navegación centrados (desktop) */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="text-foreground/70 text-sm font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Inicio
        </Link>
        <Link
          href="/#alojamientos"
          className="text-foreground/70 text-sm font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Alojamientos
        </Link>
        <a
          href="https://wa.me/573000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 text-sm font-medium hover:text-livic-pink transition-colors duration-200"
        >
          Contacto
        </a>
      </div>

      {/* Derecha: toggle + CTA */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="https://wa.me/573000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center bg-livic-pink text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-livic-pink/90 transition-colors duration-200"
        >
          Consultar
        </a>
      </div>
    </nav>
  );
}
