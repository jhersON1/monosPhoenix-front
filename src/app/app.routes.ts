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
    path: 'orders',
    loadChildren: () =>
      import('./features/pedidos/pedidos.routes').then(
        (m) => m.pedidosRoutes
      ),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/clientes/clientes.routes').then(
        (m) => m.clientesRoutes
      ),
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];