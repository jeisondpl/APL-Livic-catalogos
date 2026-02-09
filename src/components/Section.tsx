/**
 * Section.tsx
 * Contenedor de sección reutilizable con padding y título opcional.
 */

interface SectionProps {
  children: React.ReactNode;
  /** Título de la sección (opcional) */
  titulo?: string;
  /** Acento de color bajo el título */
  acento?: "pink" | "green" | "purple" | "yellow";
  /** id HTML para anchor links */
  id?: string;
  /** Clase extra para el contenedor */
  className?: string;
}

const ACENTO_CLASSES: Record<string, string> = {
  pink:   "bg-livic-pink",
  green:  "bg-livic-green",
  purple: "bg-livic-purple",
  yellow: "bg-livic-yellow",
};

export default function Section({
  children,
  titulo,
  acento = "pink",
  id,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16 ${className}`}
    >
      {titulo && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            {titulo}
          </h2>
          <div className={`w-10 h-0.5 rounded-full ${ACENTO_CLASSES[acento]}`} />
        </div>
      )}
      {children}
    </section>
  );
}
