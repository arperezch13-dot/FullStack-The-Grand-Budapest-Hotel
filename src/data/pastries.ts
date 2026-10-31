/* Pasteles de la carta de Mendl's Bakery. Aquí solo van los datos que no cambian con el idioma (imagen y precio) */

export interface Pastry {
  slug: string
  image: string
  priceEur: number
  priceUsd: number
}

export const pastries: Pastry[] = [
  { slug: 'courtesan-au-chocolat', image: '/Media/Mendls/courtesan-au-chocolat.png', priceEur: 34, priceUsd: 38 },
  { slug: 'zubrowka-redcurrant-tart', image: '/Media/Mendls/tarta-grosellas-zubrowka.png', priceEur: 21, priceUsd: 24 },
  { slug: 'crossed-keys-macarons', image: '/Media/Mendls/macarons-llaves-cruzadas.png', priceEur: 38, priceUsd: 43 },
  { slug: 'eclair-madame-d', image: '/Media/Mendls/madame-chocolate .png', priceEur: 22, priceUsd: 25 },
  { slug: 'checkpoint-19-chocolates', image: '/Media/Mendls/checkpoint-19.png', priceEur: 58, priceUsd: 65 },
  { slug: 'alpine-mille-feuille', image: '/Media/Mendls/mil-hojas.png', priceEur: 35, priceUsd: 39 },
]
