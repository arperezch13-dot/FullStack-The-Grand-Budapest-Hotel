/* Imágenes de cada habitación, indexadas por "slug" */

export interface RoomImages {
  front: string
  back: string
}

export const roomImages: Record<string, RoomImages> = {
  'madame-d-parlor': {
    front: '/Media/Rooms/TheMadameDParlor.jpg',
    back: '/Media/Rooms/TheMadameDParlor(living).jpg',
  },
  'mendl-suite': {
    front: "/Media/Rooms/TheMendl'sSuite.jpg",
    back: "/Media/Rooms/TheMendl'sSuite(living).jpg",
  },
  'concierge-master': {
    front: '/Media/Rooms/TheConciergeMaster.png',
    back: '/Media/Rooms/TheConciergeMaster(living).png',
  },
  'zero-observatory': {
    front: '/Media/Rooms/TheZeroObservatory.png',
    back: '/Media/Rooms/TheZeroObservatory(living).png',
  },
  'alpine-refuge': {
    front: '/Media/Rooms/TheAlpineRefuge.webp',
    back: '/Media/Rooms/TheAlpineRefuge(living).png',
  },
}
