import { NavItem } from './sidebar.model';

export const NAV_ITEMS: NavItem[] = [
  {
    path: 'index/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    activeClass: 'bg-gray-700 text-white'
  },
  {
    path: '/products',
    title: 'Productos',
    icon: 'inventory_2',
    activeClass: 'bg-gray-700 text-white'
  },
  {
    path: '/puestos',
    title: 'Puestos',
    icon: 'badge',
    activeClass: 'bg-gray-700 text-white'
  }
];