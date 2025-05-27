import { NavItem } from './sidebar.model';

export const NAV_ITEMS: NavItem[] = [
  {
    path: 'dashboard',
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
    path: 'proyectos',
    title: 'Proyectos',
    icon: 'assignment',
    activeClass: 'bg-gray-700 text-white'
  }
];