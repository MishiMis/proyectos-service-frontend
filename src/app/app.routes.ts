import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/DashboardComponents/dashboard/dashboard.component';
import { IndexComponent } from './layout/index/index.component';

export const routes: Routes = [
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
  { path: '**', redirectTo: '' }
];
