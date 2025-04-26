import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { PuestosComponent } from './puestos/puestos.component';


export const routes: Routes = [
    { 
      path: 'dashboard', 
      component: DashboardComponent,
      data: { title: 'Dashboard' }
    },
    { 
      path: 'products', 
      component: ProductsComponent,
      data: { title: 'Productos' }
    },
    { 
        path: 'puestos', 
        component: PuestosComponent,
        data: { title: 'Puestos' }
      },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
  ];
  