/* Funciones pequeñas de formato de texto y números */

/* Convierte un número (1-39) en número romano: 1 = "I", 4 = "IV" */
export function toRoman(value: number): string {
  const table: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let rest = value
  let result = ''
  for (const [amount, symbol] of table) {
    while (rest >= amount) {
      result += symbol
      rest -= amount
    }
  }
  return result
}

/* Pone en mayúscula la primera letra: "colección de arte" ="Colección de arte" */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/* Une los servicios con "." y capitaliza cada uno. */
export function formatAmenities(amenities: string[]): string {
  return amenities.map(capitalize).join(' · ')
}

/* "2026-11-14" = "14 Nov" */
export function formatShortDate(key: string, locale: string): string {
  const [year, month, day] = key.split('-').map(Number)
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, day)))
    .replace('.', '')
}

/* Número de noches entre dos fechas AAAA-MM-DD */
export function nightsBetween(from: string, to: string): number {
  const [y1, m1, d1] = from.split('-').map(Number)
  const [y2, m2, d2] = to.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000)
}

/* "1 night" / "3 nights" */
export function pluralize(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`
}

/* "2026-10-30" = "Fri, 30 Oct 2026" / "vie, 30 oct 2026" (fecha larga con día de la semana). */
export function formatLongDate(key: string, locale: string): string {
  const [year, month, day] = key.split('-').map(Number)
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, day)))
    .replace('.', '')
  return `${weekday}, ${formatShortDate(key, locale)} ${year}`
}

/* "October 2026" / "Octubre 2026" para la cabecera de cada mes del calendario */
export function formatMonthName(year: number, month: number, locale: string): string {
  const name = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(year, month, 1)),
  )
  return `${capitalize(name)} ${year}`
}

/* Fecha completa para lectores de pantalla: "Friday, 30 October 2026" */
export function formatFullDate(key: string, locale: string): string {
  const [year, month, day] = key.split('-').map(Number)
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

/* Precio con separador de miles y símbolo: 1300 = "1,300 €" / "1300 €". */
export function formatPrice(amount: number, locale: string): string {
  return `${amount.toLocaleString(locale)} €`
}
