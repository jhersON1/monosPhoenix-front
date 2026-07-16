export interface CreateOrderDetailDto {
  productId: string;
  amount: number;
}

export interface CreateOrderDto {
  customerId: string;
  details: CreateOrderDetailDto[];
}

export interface UpdateOrderDto {
  status?: string;
}
