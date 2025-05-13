import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/DashboardComponents/dashboard/dashboard.component';
import { IndexComponent } from './layout/index/index.component';
import { LoginComponent } from './pages/auth/LoginComponents/login/login.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
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