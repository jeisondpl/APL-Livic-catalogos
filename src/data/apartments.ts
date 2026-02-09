/**
 * apartments.ts
 * Fuente estática de datos de apartamentos del catálogo LIVIC.
 * Agregar nuevos apartamentos aquí mismo; catalog.ts los expone.
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ApartmentPhoto {
  /** Ruta relativa desde /public (se sirve desde la raíz) */
  src: string;
  /** Descripción accesible de la imagen */
  alt: string;
}

export interface ApartmentHost {
  nombre: string;
  empresa?: string;
  calificacion?: number;
  resenas?: number;
  anosExperiencia?: number;
  /** Ruta a foto de perfil (placeholder si no existe) */
  avatarSrc?: string;
}

export interface ApartmentAmenityItem {
  nombre: string;
  icono: string;
}

export interface ApartmentAmenityCategory {
  /** Etiqueta visible en la UI */
  titulo: string;
  /** Icono emoji representativo */
  icono: string;
  /** Lista de amenidades en esa categoría */
  items: ApartmentAmenityItem[];
}

export interface ApartmentLocation {
  ciudad: string;
  departamento: string;
  pais: string;
  lat: number;
  lng: number;
  cercaDe?: string;
  descripcionUbicacion?: string;
  accesoPlaya?: boolean;
  distanciaPlayas?: string;
}

export interface ApartmentService {
  etiqueta: string;
  disponible: boolean;
  nota?: string;
}

export interface Apartment {
  /** Slug único para la URL: /apartamentos/{slug} */
  slug: string;
  /** Nombre de marketing */
  nombre: string;
  /** Edificio / conjunto */
  edificio: string;
  /** Número de apartamento */
  apartamento: string;
  /** Piso */
  piso: number;
  /** Tipo de propiedad */
  tipo: string;

  // ── Capacidad
  huespedes: number;
  habitaciones: number;
  camas: number;
  banos: number;

  // ── Ubicación
  ubicacion: ApartmentLocation;

  // ── Hosts
  anfitrionPrincipal: ApartmentHost;
  coanfitrion?: ApartmentHost;

  // ── Amenidades por categoría
  amenidades: ApartmentAmenityCategory[];

  // ── Servicios / políticas
  servicios: ApartmentService[];

  // ── Cosas que NO incluye (transparencias)
  noIncluidos: string[];

  // ── Características badge-level
  badges: string[];

  // ── Multimedia
  /** Foto principal (hero) */
  heroPhoto: ApartmentPhoto;
  /** Galería completa */
  galeria: ApartmentPhoto[];

  // ── Copy marketing (estilo Lina)
  descripcionCorta: string;
  descripcionLarga: string;
  frasePosituelo: string;

  // ── Edificio
  edificioAmenidades: ApartmentAmenityItem[];
  edificioReglas: ApartmentAmenityItem[];

  // ── Check-in / Check-out
  checkIn: string;
  checkOut: string;
  notas: string[];
}

// ─── Fotos del apartamento 1008 ──────────────────────────────────────────────
// Rutas relativas al directorio public/

const BASE_1008 = "/source/salgerosuite/1008";

const FOTOS_1008: ApartmentPhoto[] = [
  { src: `${BASE_1008}/IMG_20260122_160229826_HDR.jpg`, alt: "Vista general del apartamento 1008" },
  { src: `${BASE_1008}/IMG_20260122_160254458_HDR.jpg`, alt: "Sala principal con mobiliario moderno" },
  { src: `${BASE_1008}/IMG_20260122_160306742_HDR.jpg`, alt: "Comedor con mesa central" },
  { src: `${BASE_1008}/IMG_20260122_160317794_HDR.jpg`, alt: "Habitación principal con cama queen" },
  { src: `${BASE_1008}/IMG_20260122_160332581_HDR.jpg`, alt: "Baño principal" },
  { src: `${BASE_1008}/IMG_20260122_160352336_HDR.jpg`, alt: "Cocina equipada" },
  { src: `${BASE_1008}/IMG_20260122_160402238_HDR.jpg`, alt: "Balcón con vista parcial al mar" },
  { src: `${BASE_1008}/IMG_20260122_160505901_HDR.jpg`, alt: "Espacio social convertible" },
  { src: `${BASE_1008}/IMG_20260122_160600698_HDR.jpg`, alt: "Cama abatible doble en sala" },
  { src: `${BASE_1008}/IMG_20260122_160604316_HDR.jpg`, alt: "Puerta corrediza del segundo dormitorio" },
  { src: `${BASE_1008}/IMG_20260122_160616948_HDR.jpg`, alt: "Aire acondicionado en habitación" },
  { src: `${BASE_1008}/IMG_20260122_160722671.jpg`,     alt: "Detalle de mobiliario" },
  { src: `${BASE_1008}/IMG_20260122_161019869_HDR.jpg`, alt: "Entrada y recepción del edificio" },
  { src: `${BASE_1008}/IMG_20260122_161125216_HDR.jpg`, alt: "Zona de lavandería con lavadora" },
  { src: `${BASE_1008}/IMG_20260122_161216126_HDR.jpg`, alt: "Mesa del comedor como estación de trabajo" },
  { src: `${BASE_1008}/IMG_20260122_162142366_HDR.jpg`, alt: "Piscina del edificio Salguero Suite" },
  { src: `${BASE_1008}/IMG_20260122_162406550_HDR.jpg`, alt: "Jacuzzi del edificio" },
  { src: `${BASE_1008}/IMG_20260122_162500201_HDR.jpg`, alt: "Gimnasio del edificio" },
  { src: `${BASE_1008}/IMG_20260122_164452424_HDR.jpg`, alt: "Vista desde el balcón piso 10" },
  { src: `${BASE_1008}/IMG_20260122_164714758_HDR.jpg`, alt: "Exterior del edificio Salguero Suite" },
];

// ─── Apartamento 1008 – Salguero Suite ───────────────────────────────────────

const apartment1008: Apartment = {
  slug: "salguero-suite-1008",
  nombre: "Suite en Salguero: Piso 10, Vista al Mar",
  edificio: "Salguero Suite",
  apartamento: "1008",
  piso: 10,
  tipo: "Apartamento entero",

  huespedes: 4,
  habitaciones: 2,
  camas: 2,
  banos: 2,

  ubicacion: {
    ciudad: "Gaira",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1875643,
    lng: -74.2312825,
    cercaDe: "Santa Marta",
    accesoPlaya: true,
    distanciaPlayas: "~200 m (aprox. 5 min caminando)",
    descripcionUbicacion:
      "Ubicado en Playa Salguero, una zona tranquila y vacacional. La playa está a unos 200 metros de la recepción. No hay salida directa al mar, pero el acceso es caminando, rápido y tranquilo.",
  },

  anfitrionPrincipal: {
    nombre: "Lina",
    empresa: "LIVIC",
    calificacion: 4.6,
    resenas: 5,
    anosExperiencia: 3,
  },
  coanfitrion: {
    nombre: "Zharick",
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Lavadora", icono: "WashingMachine" },
        { nombre: "Ganchos para la ropa", icono: "Shirt" },
        { nombre: "Sábanas", icono: "Bed" },
        { nombre: "Almohadas y mantas adicionales", icono: "Sparkles" },
        { nombre: "Persianas o cortinas opacas (blackout)", icono: "Blinds" },
        { nombre: "Armario", icono: "Archive" },
        { nombre: "Plancha de ropa", icono: "Shirt" },
      ],
    },
    {
      titulo: "Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "2 televisores (habitación y sala)", icono: "Tv" },
        { nombre: "Sistema de sonido Bluetooth", icono: "Speaker" },
        { nombre: "Conexión Ethernet", icono: "Network" },
        { nombre: "Equipo para hacer ejercicio", icono: "Dumbbell" },
      ],
    },
    {
      titulo: "Climatización",
      icono: "❄️",
      items: [
        { nombre: "2 aires acondicionados (habitación y sala)", icono: "Wind" },
      ],
    },
    {
      titulo: "Internet y Oficina",
      icono: "📶",
      items: [
        { nombre: "WiFi estable (fibra óptica en el edificio)", icono: "Wifi" },
        { nombre: "Coworking disponible en el primer piso del edificio", icono: "Network" },
        { nombre: "Mesa del comedor como estación de trabajo", icono: "Laptop" },
      ],
    },
    {
      titulo: "Cocina",
      icono: "🍳",
      items: [
        { nombre: "Cocina completa", icono: "ChefHat" },
        { nombre: "Estufa a gas Challenger con horno", icono: "Flame" },
        { nombre: "Microondas Samsung", icono: "Microwave" },
        { nombre: "Air fryer", icono: "Wind" },
        { nombre: "Cafetera de filtro", icono: "Coffee" },
        { nombre: "Licuadora", icono: "Blend" },
        { nombre: "Sanduchera", icono: "UtensilsCrossed" },
        { nombre: "Utensilios básicos para cocinar", icono: "UtensilsCrossed" },
        { nombre: "Platos y cubiertos", icono: "Utensils" },
      ],
    },
    {
      titulo: "Exterior",
      icono: "🌊",
      items: [
        { nombre: "Balcón con vista parcial al mar (piso 10)", icono: "Sunrise" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "Check-in autónomo", disponible: true, nota: "Cerradura electrónica con PIN" },
    { etiqueta: "Estadías largas", disponible: true, nota: "Desde 28 días" },
    { etiqueta: "Seguridad 24/7", disponible: true, nota: "Seguridad privada del edificio" },
    { etiqueta: "Mascotas permitidas", disponible: false },
    { etiqueta: "Agua caliente", disponible: false, nota: "El apartamento no cuenta con agua caliente" },
    { etiqueta: "Parqueadero", disponible: false, nota: "Por disponibilidad, no garantizado" },
  ],

  noIncluidos: [
    "Secadora",
    "Detector de humo",
    "Detector de monóxido de carbono",
    "Calefacción",
    "Agua caliente",
    "Café ni azúcar (no se deja en el kit)",
  ],

  badges: [
    "Vista al mar",
    "Piso 10",
    "4 huéspedes",
    "2 habitaciones",
    "2 baños",
  ],

  heroPhoto: FOTOS_1008[0],
  galeria: FOTOS_1008,

  descripcionCorta:
    "Refugio en el piso 10 de Salguero Suite con balcón y vista parcial al mar. Ideal para escapadas en pareja, viajes en familia y workations.",

  descripcionLarga:
    "Apartamento completo para hasta 4 huéspedes con 2 baños. Cuenta con una habitación principal cerrada con cama queen y baño privado, y una segunda habitación flexible: la sala se convierte con cama abatible doble y puerta corrediza para mayor privacidad. " +
    "El edificio ofrece piscina, jacuzzi, gimnasio, sauna y coworking. El mar está a unos 200 metros, y el ambiente de Playa Salguero es tranquilo y vacacional.",

  frasePosituelo:
    "Un lugar donde realmente te sientes en casa, no solo de visita.",

  edificioAmenidades: [
    { nombre: "Piscina (horario 9 a.m. – 8 p.m.)", icono: "Waves" },
    { nombre: "Jacuzzi", icono: "Bath" },
    { nombre: "Gimnasio", icono: "Dumbbell" },
    { nombre: "Sauna", icono: "Wind" },
    { nombre: "Coworking (primer piso)", icono: "Network" },
    { nombre: "Minimarket (local externo)", icono: "Store" },
    { nombre: "Ascensor", icono: "ArrowUpDown" },
    { nombre: "Estacionamiento (por disponibilidad)", icono: "Car" },
  ],

  edificioReglas: [
    { nombre: "No se permiten mascotas", icono: "PawPrint" },
    { nombre: "No se permite fumar", icono: "CigaretteOff" },
    { nombre: "No se permiten visitantes (durante la estadía)", icono: "Users" },
    { nombre: "No se permiten fiestas", icono: "Music" },
    { nombre: "Silencio desde las 10:00 p.m.", icono: "Moon" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  notas: [
    "Registro obligatorio en recepción con documento físico.",
    "La administración cobra una manilla obligatoria: $20.000 COP por persona (niños desde 9 años), pago único en check-in. Solo tarjeta o transferencia.",
    "Se entrega un PIN de uso único para el primer ingreso; la tarjeta queda dentro del apartamento para ingresos posteriores.",
  ],
};

// ─── Exportación del catálogo ─────────────────────────────────────────────────

export const APARTMENTS: Apartment[] = [
  apartment1008,
];
