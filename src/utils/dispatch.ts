/* Funciones del envío simulado de la carta */

/* Genera un número de despacho aleatorio */
export function makeDispatchNumber(): string {
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'
  const pick = () => letters[Math.floor(Math.random() * letters.length)]
  const digits = String(Math.floor(Math.random() * 900) + 100)
  return `1932-${pick()}${pick()}-${digits}`
}

/*  Envío simulado (900 ms). Aquí se conectaría un servicio real */
export function sendLetter<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), 900)
  })
}

/* Código de check-in aleatorio, por ejemplo "GBH-4821" */
export function makeCheckinCode(): string {
  return `GBH-${Math.floor(Math.random() * 9000) + 1000}`
}
