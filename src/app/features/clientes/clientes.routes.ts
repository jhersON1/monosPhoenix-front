import { Routes } from '@angular/router';
import { CustomerList } from './pages/customer-list/customer-list';
import { CustomerForm } from './pages/customer-form/customer-form';
import { CustomerDetail } from './pages/customer-detail/customer-detail';

export const clientesRoutes: Routes = [
  { path: '', component: CustomerList },
  { path: 'new', component: CustomerForm },
  { path: ':id', component: CustomerDetail },
  { path: ':id/edit', component: CustomerForm },
];
