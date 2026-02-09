/**
 * Nav.tsx
 * Barra de navegación superior. Server Component (sin estado).
 */

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 bg-background/80 backdrop-blur-md border-b border-surface-300 transition-colors duration-300">
      {/* Logo / Marca */}
      <Link
        href="/"
        className="flex items-center hover:opacity-80 transition-opacity group"
      >
        <div className="relative h-10 w-auto">
          {/* Logo para modo claro: logo-livic.png */}
          <Image
            src="/logo-livic.png"
            alt="LIVIC"
            width={150}
            height={48}
            className="h-10 w-auto block dark:hidden"
            priority
          />
          {/* Logo para modo oscuro: logo-livic-white.png */}
          <Image
            src="/logo-livic-white.png"
            alt="LIVIC"
            width={150}
            height={48}
            className="h-10 w-auto hidden dark:block"
            priority
          />
        </div>
      </Link>

      {/* Links de navegación + Toggle */}
      <div className="flex items-center gap-4 md:gap-6">
        <Link
          href="/"
          className="text-text-muted text-sm hover:text-foreground transition-colors"
        >
          Catálogo
        </Link>
        <Link
          href="/#como-funciona"
          className="text-text-muted text-sm hover:text-foreground transition-colors"
        >
          Cómo funciona
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
