import { Routes } from '@angular/router';
import { OrderList } from './pages/order-list/order-list';
import { OrderForm } from './pages/order-form/order-form';
import { OrderDetail } from './pages/order-detail/order-detail';

export const pedidosRoutes: Routes = [
  { path: '', component: OrderList },
  { path: 'new', component: OrderForm },
  { path: ':id', component: OrderDetail },
];
