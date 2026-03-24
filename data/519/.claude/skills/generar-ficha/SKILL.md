---
name: generar-ficha
description: Genera fichas completas de apartamentos para Airbnb a partir de un archivo JSON de datos (estructura datos1008.json o similar). Úsala siempre que el usuario mencione "generar ficha", "crear ficha", "ficha del apartamento", "actualizar ficha", o cuando quiera documentar/resumir un apartamento a partir de sus datos JSON. También úsala cuando el usuario pregunte por el estado del anuncio, comodidades disponibles o quiera un resumen del apartamento en formato legible.
---

# Generar Ficha de Apartamento

Esta skill genera una ficha completa y estructurada de un apartamento a partir de los datos JSON del proyecto. La ficha resultante sirve como referencia rápida para el anfitrión y como base para actualizar anuncios en Airbnb.

## Proceso

### 1. Localizar el archivo de datos

Busca el archivo JSON del apartamento en esta prioridad:
1. El archivo mencionado explícitamente por el usuario
2. `datos<NUMERO>.json` en el directorio raíz del proyecto
3. `<EDIFICIO>/<APT>/apartamento_<NUMERO>.json`
4. Cualquier JSON que contenga la clave `"Editor de anuncios"`

Usa `Glob` con patrones como `**/datos*.json` o `**/*.json` si no se especifica el archivo.

### 2. Extraer y organizar la información

Lee el JSON y extrae estos bloques en orden:

**Identificación**
- Nombre interno y título del anuncio
- Tipo de propiedad, piso, año, tamaño (m²)
- Capacidad de huéspedes
- Ubicación (ciudad, departamento, país)

**Habitaciones y camas** (desde `photo-tour`)
- Lista cada habitación con su tipo de cama y comodidades seleccionadas (`"seleccionado": true`)
- Omite los items con cantidad 0 o `seleccionado: false`

**Baños**
- Comodidades disponibles en cada baño (`seleccionado: true`)

**Comodidades generales** (desde `comodidades.comodidades`)
- Solo las que tienen `"seleccionado": true`
- Agrupa por categoría: Conectividad, Cocina, Climatización, Entretenimiento, Edificio, Otros

**Precios**
- Precio por noche (COP)
- Precio fin de semana (si existe)
- Descuentos semanales y mensuales

**Disponibilidad**
- Mínimo y máximo de noches
- Tiempo de preaviso
- Horarios de check-in / check-out

**Reglas de la casa**
- Mascotas, eventos, fumar, horario silencio, visitantes
- Reglas adicionales

**Descripción del anuncio**
- Descripción principal (máx 3 líneas del campo `descripcion del anuncio`)
- Acceso de huéspedes (resumen)
- Detalles importantes / cosas a tener en cuenta

**Seguridad del huésped**
- Dispositivos de seguridad instalados
- Consideraciones que aplican (`"aplica": true`)

**Política de cancelación**
- Estadías cortas y largas

### 3. Generar la ficha en Markdown

Usa esta plantilla exacta:

```markdown
# Ficha: [Nombre Interno] — [Título del Anuncio]

**Ubicación:** [Ciudad], [Departamento], [País] · Piso [N] de [Total] · [Año] · [m²] m²
**Capacidad:** [N] huéspedes · [N] hab · [N] baños
**Tipo:** [Tipo propiedad] / [Tipo espacio]

---

## Habitaciones

### [Nombre habitación]
- **Camas:** [lista de camas con cantidad > 0]
- **Comodidades:** [lista seleccionadas]
- **Privacidad:** [si aplica]

(repetir por cada habitación)

---

## Baños

### [Nombre baño]
- [lista de comodidades seleccionadas]

---

## Comodidades

**Conectividad:** [wifi, ethernet, etc.]
**Cocina:** [electrodomésticos disponibles]
**Climatización:** [AC, ventiladores, etc.]
**Entretenimiento:** [TV, sonido, etc.]
**Edificio:** [piscina, gym, jacuzzi, etc.]
**Otros:** [resto de comodidades seleccionadas]

---

## Precios

| Concepto | Valor |
|---|---|
| Noche (entre semana) | $[X] COP |
| Noche (fin de semana) | $[X] COP |
| Descuento semanal (7+ noches) | [X]% |
| Descuento mensual (28+ noches) | [X]% |

---

## Disponibilidad

- **Mínimo de noches:** [N]
- **Check-in:** desde [hora] hasta [hora]
- **Check-out:** antes de las [hora]
- **Preaviso:** [tiempo]

---

## Reglas de la casa

- Mascotas: [Sí / No] (máx. [N])
- Eventos: [Permitidos / No permitidos]
- Fumar: [Permitido / No permitido]
- Silencio: [hora inicio] – [hora fin]
- [Otras reglas relevantes en viñetas]

---

## Seguridad

**Dispositivos instalados:**
- [lista de dispositivos con `instalado: true`]

**Consideraciones activas:**
- [lista de las que tienen `aplica: true`, con su info adicional si existe]

---

## Política de cancelación

- **Estadías cortas:** [nombre de política] — [condiciones]
- **Estadías largas:** [nombre de política] — [condiciones]

---

## Descripción del anuncio

[Campo `descripcion del anuncio` completo]

**Acceso:**
[Resumen de `acceso de los huéspedes`]

**Importante:**
[Campo `otros detalles a destacar` completo]
```

### 4. Guardar la ficha

Guarda el archivo en la ruta: `<DIRECTORIO_DEL_JSON>/ficha/ficha.md`

Si ya existe un `ficha.md`, sobrescríbelo solo si el usuario lo confirma o si el contenido del JSON es más reciente que la ficha existente (compara el título o precios para detectar diferencias).

Informa al usuario la ruta donde se guardó.

---

## Notas de calidad

- Solo incluye comodidades con `"seleccionado": true` o `"cantidad" > 0`. No listes las que no aplican.
- Si algún campo está vacío o es `null`, omítelo en la ficha (no escribas "N/A" ni "sin datos").
- Mantén los precios en COP sin conversión.
- Si hay fotos en el recorrido fotográfico, menciona cuántas hay por ambiente al final de la sección de habitaciones (ej: "4 fotos disponibles").
- Si el JSON tiene el campo `"sobre el anfitrión"`, agrega al final una sección opcional "## Sobre el anfitrión" con la información de perfil.
