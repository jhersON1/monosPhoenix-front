import { Injectable, inject, signal } from '@angular/core';
import { Order } from '../../../domain/entities/order.entity';
import { OrderApi } from '../../../data-access/api/order.api';
import { CreateOrderDto, UpdateOrderDto } from '../../../data-access/dto/order.dto';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = inject(OrderApi);

  private _orders = signal<Order[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly orders = this._orders.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadAll(): void {
    this._loading.set(true);
    this._error.set(null);
    this.api.getAll().subscribe({
      next: (res) => {
        this._orders.set(res);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message ?? 'Error al cargar pedidos');
        this._loading.set(false);
      },
    });
  }

  getById(id: string) {
    return this.api.getById(id);
  }

  create(dto: CreateOrderDto) {
    return this.api.create(dto);
  }

  update(id: string, dto: UpdateOrderDto) {
    return this.api.update(id, dto);
  }
}
