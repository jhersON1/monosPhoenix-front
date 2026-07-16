import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductForm } from './pages/product-form/product-form';
import { ProductDetail } from './pages/product-detail/product-detail';

export const productosRoutes: Routes = [
  { path: '', component: ProductList },
  { path: 'new', component: ProductForm },
  { path: ':id', component: ProductDetail },
  { path: ':id/edit', component: ProductForm }
];
