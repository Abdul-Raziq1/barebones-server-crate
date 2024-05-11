import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
];
