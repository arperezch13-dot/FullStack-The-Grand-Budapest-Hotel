/* Enlaces del menú lateral (drawer)*/

export interface NavItem {
  key: 'mendls' | 'suites' | 'letter' | 'checkIn'
  to: string
  icon: string // clase de Remix Icon
}

export const navItems: NavItem[] = [
  { key: 'mendls', to: '/mendls', icon: 'ri-restaurant-2-line' },
  { key: 'suites', to: '/suites', icon: 'ri-hotel-bed-line' },
  { key: 'letter', to: '/letter', icon: 'ri-mail-line' },
  { key: 'checkIn', to: '/check-in', icon: 'ri-key-line' },
]
