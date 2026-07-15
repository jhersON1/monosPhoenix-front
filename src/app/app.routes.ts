import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/productos/productos.routes').then(
        (m) => m.productosRoutes
      ),
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];