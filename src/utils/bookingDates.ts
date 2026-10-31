/* Fechas del calendario de reservas */

const pad = (value: number) => String(value).padStart(2, '0')

/* Clave "AAAA-MM-DD" de un día concreto (mes de 0 a 11) */
export function makeKey(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

/* Clave de hoy con la fecha local del visitante */
export function todayKey(): string {
  const now = new Date()
  return makeKey(now.getFullYear(), now.getMonth(), now.getDate())
}

/* Suma (o resta) días a una clave */
export function addDays(key: string, amount: number): string {
  const [year, month, day] = key.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + amount))
  return makeKey(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

/* Número de días del mes (mes de 0 a 11) */
export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
}

/* Huecos vacíos antes del día 1 (la semana empieza en lunes) */
export function startOffset(year: number, month: number): number {
  return (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7
}

/* Mes y año siguientes a uno dado */
export function shiftMonth(year: number, month: number, amount: number): { year: number; month: number } {
  const date = new Date(Date.UTC(year, month + amount, 1))
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() }
}
