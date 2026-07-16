import { Customer } from './customer.entity';

export interface Order {
  id: string;
  customerId: string;
  customer: Customer | null;
  total: number;
  status: string;
  details: OrderDetail[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetail {
  id: string;
  orderId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
  } | null;
  amount: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}
