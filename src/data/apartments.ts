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

  // ── Precio
  /** Precio por noche en USD. Opcional; si no existe la Card muestra ubicación. */
  precioNoche?: number;

  // ── Airbnb calendar
  airbnbCalendarUrl?: string;
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
  { src: `${BASE_1008}/IMG_20260122_160722671.jpg`, alt: "Detalle de mobiliario" },
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

  airbnbCalendarUrl: "https://www.airbnb.com.co/calendar/ical/1608385896028957180.ics?t=088d0e1cf78b4b9cb254562b820c5d24",

  precioNoche: 250000,
};

// ─── Fotos del apartamento 915 ───────────────────────────────────────────────

const BASE_915 = "/source/reservadelmar/915";

const FOTOS_915: ApartmentPhoto[] = [
  { src: `${BASE_915}/IMG_3169-HDR.jpg`, alt: "Vista al mar Caribe desde el balcón del piso 9" },
  { src: `${BASE_915}/IMG_3180.jpg`, alt: "Vista lateral hacia el mar — bahía turquesa" },
  { src: `${BASE_915}/Sin-título-9.jpg`, alt: "Sillas Acapulco con vistas a la Sierra Nevada" },
  { src: `${BASE_915}/Sin-título-10.jpg`, alt: "Vista panorámica Sierra Nevada y vegetación" },
  { src: `${BASE_915}/Sin-título-8.jpg`, alt: "Sofá azul con acceso al balcón y vista a la Sierra" },
  { src: `${BASE_915}/Sin-título-1.jpg`, alt: "Sillones geométricos y puertas corredizas de vidrio" },
  { src: `${BASE_915}/IMG_3000.jpg`, alt: "Estantería con velero y pelícano artesanal" },
  { src: `${BASE_915}/Sin-título-7.jpg`, alt: "Ancla decorativa turquesa, ropa de cama azul y gris" },
  { src: `${BASE_915}/Sin-título-6.jpg`, alt: "Cama doble, espejo tipo sol, acceso al baño en suite" },
  { src: `${BASE_915}/Sin-título-3.jpg`, alt: "Cama doble, ancla azul, TV montada" },
  { src: `${BASE_915}/Sin-título-2.jpg`, alt: "Dos camas individuales, cangrejo artesanal multicolor" },
  { src: `${BASE_915}/Sin-título-4.jpg`, alt: "Armario empotrado, estantería de madera" },
  { src: `${BASE_915}/IMG_3091.jpg`, alt: "Ducha de lluvia, cabina de vidrio, encimera de mármol" },
  { src: `${BASE_915}/Sin-título-5.jpg`, alt: "Velero decorativo colgante, encimera de mármol" },
  { src: `${BASE_915}/IMG_3115.jpg`, alt: "Armario con toallas blancas y segundo baño al fondo" },
  { src: `${BASE_915}/IMG_3092.jpg`, alt: "Detalle decorativo del apartamento 915" },
  { src: `${BASE_915}/IMG_3095.jpg`, alt: "Detalle interior del apartamento 915" },
  { src: `${BASE_915}/IMG_3181.jpg`, alt: "Vista exterior desde el apartamento 915" },
];

// ─── Apartamento 915 – Reserva del Mar ───────────────────────────────────────

const apartment915: Apartment = {
  slug: "reserva-del-mar-915",
  nombre: "Balcón Piso 9 | Caribe + Sierra Nevada | 2 Hab",
  edificio: "Reserva del Mar",
  apartamento: "915",
  piso: 9,
  tipo: "Alojamiento entero",

  huespedes: 4,
  habitaciones: 2,
  camas: 3,
  banos: 2,

  ubicacion: {
    ciudad: "Santa Marta",
    departamento: "Magdalena",
    pais: "Colombia",
    lat: 11.1860,
    lng: -74.2290,
    cercaDe: "Playa Salguero",
    accesoPlaya: true,
    distanciaPlayas: "Acceso directo a la playa",
    descripcionUbicacion:
      "Ubicado en Playa Salguero, Reserva del Mar es un conjunto de lujo valorado con 4.8 estrellas con acceso directo al mar Caribe. A 3 minutos del Rodadero, 20 minutos del centro histórico y 15 minutos del aeropuerto Simón Bolívar.",
  },

  anfitrionPrincipal: {
    nombre: "Lina",
    empresa: "LIVIC",
    calificacion: 4.8,
    resenas: 0,
    anosExperiencia: 3,
  },

  amenidades: [
    {
      titulo: "Dormitorio y Lavandería",
      icono: "🛏️",
      items: [
        { nombre: "Lavadora", icono: "WashingMachine" },
        { nombre: "Armario empotrado", icono: "Archive" },
        { nombre: "Sábanas y toallas", icono: "Bed" },
      ],
    },
    {
      titulo: "Entretenimiento",
      icono: "📺",
      items: [
        { nombre: "TV en habitación principal", icono: "Tv" },
      ],
    },
    {
      titulo: "Climatización",
      icono: "❄️",
      items: [
        { nombre: "Aire acondicionado en habitación principal", icono: "Wind" },
        { nombre: "Aire acondicionado en habitación secundaria", icono: "Wind" },
      ],
    },
    {
      titulo: "Internet",
      icono: "📶",
      items: [
        { nombre: "WiFi (CLARO-332A)", icono: "Wifi" },
      ],
    },
    {
      titulo: "Cocina",
      icono: "🍳",
      items: [
        { nombre: "Refrigerador", icono: "Refrigerator" },
        { nombre: "Microondas", icono: "Microwave" },
        { nombre: "Cafetera", icono: "Coffee" },
        { nombre: "Utensilios básicos de cocina", icono: "UtensilsCrossed" },
      ],
    },
    {
      titulo: "Exterior",
      icono: "🌊",
      items: [
        { nombre: "Balcón con vista dual: Caribe + Sierra Nevada (piso 9)", icono: "Sunrise" },
        { nombre: "Sillas tipo Acapulco", icono: "Armchair" },
      ],
    },
  ],

  servicios: [
    { etiqueta: "Check-in autónomo", disponible: true, nota: "Cerradura inteligente con código de un solo uso" },
    { etiqueta: "Estadías largas", disponible: true, nota: "Hasta 30 noches; más de 30 consultar condiciones" },
    { etiqueta: "Seguridad 24/7", disponible: true, nota: "Portería y vigilancia privada del conjunto" },
    { etiqueta: "Mascotas permitidas", disponible: false },
    { etiqueta: "Parqueadero", disponible: true, nota: "Disponible en el conjunto" },
  ],

  noIncluidos: [
    "Manilla de acceso al resort (se paga en recepción: $57.500 COP/persona desde 9 años, solo tarjeta)",
    "Detector de monóxido de carbono",
    "Calefacción",
  ],

  badges: [
    "Vista al Caribe",
    "Piso 9",
    "4 huéspedes",
    "2 habitaciones",
    "2 baños",
    "Acceso directo a la playa",
  ],

  heroPhoto: FOTOS_915[0],
  galeria: FOTOS_915,

  descripcionCorta:
    "Despierta con el Caribe frente a ti. Piso 9 en Reserva del Mar (4.8★) con balcón de vistas duales al mar y la Sierra Nevada, decoración náutica artesanal y acceso completo al resort.",

  descripcionLarga:
    "99 m² decorados con arte náutico artesanal —anclas, veleros, cangrejos— que crean una identidad caribeña coherente y con carácter. " +
    "La habitación principal tiene cama doble, A/C, TV y baño en suite con encimera de mármol y ducha de lluvia con vista directa al Caribe. " +
    "La habitación secundaria tiene dos camas individuales, A/C y arte caribeño artesanal con vistas a la Sierra Nevada. " +
    "El balcón en piso 9 ofrece vistas duales sin obstrucciones: mar Caribe de un lado, Sierra Nevada del otro. " +
    "El conjunto Reserva del Mar incluye piscina para adultos, piscina infantil, jacuzzi, acceso directo a la playa, gimnasio, spa, parqueadero y seguridad 24 horas.",

  frasePosituelo:
    "Un balcón entre el Caribe y la Sierra Nevada. Pocas vistas así existen.",

  edificioAmenidades: [
    { nombre: "Piscina para adultos", icono: "Waves" },
    { nombre: "Piscina infantil", icono: "Waves" },
    { nombre: "Jacuzzi", icono: "Bath" },
    { nombre: "Acceso directo a la playa", icono: "Anchor" },
    { nombre: "Gimnasio completamente equipado", icono: "Dumbbell" },
    { nombre: "Spa", icono: "Sparkles" },
    { nombre: "Parqueadero", icono: "Car" },
    { nombre: "WiFi en zonas comunes", icono: "Wifi" },
    { nombre: "Portería y seguridad 24 horas", icono: "Shield" },
  ],

  edificioReglas: [
    { nombre: "No se admiten mascotas", icono: "PawPrint" },
    { nombre: "No se permiten fiestas ni eventos", icono: "Music" },
    { nombre: "No fumar (interior ni balcón)", icono: "CigaretteOff" },
    { nombre: "Máximo 4 huéspedes (incluye niños y bebés)", icono: "Users" },
    { nombre: "Silencio desde las 10:00 p.m.", icono: "Moon" },
    { nombre: "Solo personas registradas en la reserva", icono: "Lock" },
  ],

  checkIn: "3:00 p.m.",
  checkOut: "11:00 a.m.",

  precioNoche: 320000,

  notas: [
    "Identificarse en portería con nombre y número de reserva al llegar.",
    "Dirigirse al lobby Torres 3 y 4 para adquirir la manilla de acceso ($57.500 COP por persona desde 9 años, SOLO TARJETA). Este valor no está incluido en la reserva.",
    "Se envía un código de apertura de un solo uso antes de la llegada. Sin llaves, sin esperas.",
    "La tarjeta de energía está sobre el mesón de la cocina — insertarla en el tarjetero de la entrada para activar la electricidad.",
    "Vientos fuertes en el balcón: mantener puertas y ventanas cerradas al entrar y salir.",
  ],
};

// ─── Exportación del catálogo ─────────────────────────────────────────────────

export const APARTMENTS: Apartment[] = [
  apartment1008,
  apartment915,
];
