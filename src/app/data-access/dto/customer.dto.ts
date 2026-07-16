export interface CreateCustomerDto {
  fullName: string;
  email: string;
  phone?: string | null;
}

export interface UpdateCustomerDto {
  fullName?: string;
  email?: string;
  phone?: string | null;
}
