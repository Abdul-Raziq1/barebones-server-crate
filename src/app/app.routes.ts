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
    }
];
