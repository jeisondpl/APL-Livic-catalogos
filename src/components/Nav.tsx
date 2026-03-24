/**
 * Nav.tsx
 * Barra de navegación superior — Server Component (sin estado).
 * Rediseñada: estilo premium con pill de links, logo más espacio, contraste mejorado.
 */

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 bg-white/80 dark:bg-livic-black/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-surface-300/60 transition-colors duration-300">

      {/* Logo / Marca */}
      <Link
        href="/"
        className="flex items-center hover:opacity-75 transition-opacity"
      >
        <div className="relative">
          {/* Logo modo claro */}
          <Image
            src="/logo-livic.png"
            alt="LIVIC"
            width={130}
            height={44}
            className="h-9 w-auto block dark:hidden"
            priority
          />
          {/* Logo modo oscuro */}
          <Image
            src="/logo-livic-white.png"
            alt="LIVIC"
            width={130}
            height={44}
            className="h-9 w-auto hidden dark:block"
            priority
          />
        </div>
      </Link>

      {/* Links de navegación + Toggle */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Pill de links */}
        <div className="hidden sm:flex items-center gap-1 bg-gray-100/80 dark:bg-surface-100/80 border border-gray-200/60 dark:border-surface-300/60 rounded-full px-2 py-1">
          <Link
            href="/"
            className="text-text-muted text-sm font-medium px-4 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-surface-200 hover:text-foreground transition-all duration-200"
          >
            Alojamientos
          </Link>
        </div>

        {/* Separador visual */}
        <div className="hidden sm:block w-px h-5 bg-surface-300" />

        <ThemeToggle />
      </div>
    </nav>
  );
}
