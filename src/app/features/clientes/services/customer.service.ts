import { Injectable, inject, signal } from '@angular/core';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerApi } from '../../../data-access/api/customer.api';
import { CreateCustomerDto, UpdateCustomerDto } from '../../../data-access/dto/customer.dto';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private api = inject(CustomerApi);

  private _customers = signal<Customer[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly customers = this._customers.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadAll(): void {
    this._loading.set(true);
    this._error.set(null);
    this.api.getAll().subscribe({
      next: (res) => {
        this._customers.set(res);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message ?? 'Error al cargar clientes');
        this._loading.set(false);
      },
    });
  }

  getById(id: string) {
    return this.api.getById(id);
  }

  create(dto: CreateCustomerDto) {
    return this.api.create(dto);
  }

  update(id: string, dto: UpdateCustomerDto) {
    return this.api.update(id, dto);
  }

  deactivate(id: string) {
    return this.api.deactivate(id);
  }
}
