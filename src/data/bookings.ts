/* Reservas de ejemplo para probar el check-in online*/

export interface Booking {
  lastName: string // en minúsculas, para comparar sin distinguir mayúsculas
  suiteSlug: string
  checkIn: string // formato AAAA-MM-DD
  checkOut: string
  adults: number
  children: number
}

export const bookings: Record<string, Booking> = {
  'GBH-1932-48': {
    lastName: 'moustafa',
    suiteSlug: 'mendl-suite',
    checkIn: '2026-11-14',
    checkOut: '2026-11-17',
    adults: 2,
    children: 0,
  },
  'GBH-1932-07': {
    lastName: 'gustave',
    suiteSlug: 'concierge-master',
    checkIn: '2026-12-02',
    checkOut: '2026-12-04',
    adults: 1,
    children: 0,
  },
}
