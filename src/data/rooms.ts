/* Habitaciones del hotel (MongoDB) o si el servidor no respondw */


  export interface Room {
     /** Identificador de MongoDB (solo llega cuando los datos vienen de la API). */
    id?: string
    slug: string
    name: string
    category: string
    price: number
    description: string
    amenities: string[]
  }

export const rooms: Room[] = [
  {
    slug: 'madame-d-parlor',
    name: "The Madame D's Parlor",
    category: 'Aristocratic Suite',
    price: 800,
    description:
      'Our most expensive suite, decorated with Renaissance art replicas. Includes a secret safe.',
    amenities: ['Art Collection', 'Champagne Service', 'Private Library'],
  },
  {
    slug: 'mendl-suite',
    name: "The Mendl's Suite",
    category: 'Grand Luxury',
    price: 650,
    description:
      'Drenched in pastel pinks and symmetry, this suite includes a complimentary courtesan and views of the funicular.',
    amenities: ['Private Balcony', 'Pink Marble Bath', 'Personal Valet'],
  },
  {
    slug: 'concierge-master',
    name: 'The Concierge Master',
    category: 'Imperial Double',
    price: 400,
    description:
      "Inspired by Monsieur Gustave H., featuring deep red velvet curtains, a collection of L'Air de Panache, and oak furniture.",
    amenities: ['Bakelite Telephone', 'Silk Robes', 'Gilded Mirror'],
  },
  {
    slug: 'zero-observatory',
    name: 'The Zero Observatory',
    category: 'Superior Single',
    price: 250,
    description:
      'A modest yet perfectly balanced room at the top of the east wing. Ideal for writers.',
    amenities: ['Skylight View', 'Poetry Library', 'Writing Desk'],
  },
  {
    slug: 'alpine-refuge',
    name: 'The Alpine Refuge',
    category: 'Standard Twin',
    price: 180,
    description:
      'Cozy and nostalgic, this room offers a 360-degree view of the snow-capped mountains of the Republic of Zubrowka.',
    amenities: ['Mountain View', 'Wool Blankets', 'Vintage Radio'],
  },
]
