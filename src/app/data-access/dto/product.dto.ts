export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface UpdatePriceStockDto {
  price: number;
  stock: number;
}
