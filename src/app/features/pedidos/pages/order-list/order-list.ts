import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderService } from '../../../productos/services/order.service';

@Component({
  selector: 'app-order-list',
  imports: [
    RouterLink,
    DatePipe,
    DecimalPipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  private service = inject(OrderService);

  readonly orders = this.service.orders;
  readonly loading = this.service.loading;
  readonly error = this.service.error;

  protected readonly displayedColumns = [
    'customer',
    'total',
    'status',
    'createdAt',
    'actions',
  ];

  constructor() {
    this.service.loadAll();
  }

  protected statusLabel(status: string): string {
    const labels: Record<string, string> = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmado',
      SHIPPED: 'Enviado',
      DELIVERED: 'Entregado',
      CANCELLED: 'Cancelado',
    };
    return labels[status] ?? status;
  }
}
