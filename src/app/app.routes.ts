import { Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { LoginComponent } from './pages/auth/LoginComponents/login/login.component';
import { DashboardComponent } from './pages/DashboardComponents/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { UsuariosComponent } from './pages/ClientesComponent/usuarios/usuarios.component';
import { ProyectosComponent } from './pages/ProyectosComponents/proyectos/proyectos.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
      },
            {
        path: 'usuarios',
        component: UsuariosComponent,
        title: 'Usuarios'
      },
                  {
        path: 'proyectos',
        component: ProyectosComponent,
        title: 'Proyectos'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];