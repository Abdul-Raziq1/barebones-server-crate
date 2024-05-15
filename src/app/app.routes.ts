import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./users/users.component').then(c => c.UsersComponent),
        loadChildren: () => import('./users/users.routes').then(m => m.USER_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'signup',
        loadChildren: () => import('./auth/signup/signup.routes').then(m => m.SIGNUP_ROUTES)
      }
];
