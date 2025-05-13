import { NavItem } from './sidebar.model';

export const NAV_ITEMS: NavItem[] = [
  {
    path: 'dashboard', // Solo la ruta relativa
    title: 'Dashboard',
    icon: 'dashboard',
    activeClass: 'bg-gray-700 text-white'
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'people',
    activeClass: 'bg-gray-700 text-white'
  },
  {
    path: 'puestos', // Solo la ruta relativa
    title: 'Puestos',
    icon: 'badge',
    activeClass: 'bg-gray-700 text-white'
  }
];