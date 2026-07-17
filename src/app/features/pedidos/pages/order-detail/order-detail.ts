import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../productos/services/order.service';
import { Order } from '../../../../domain/entities/order.entity';

@Component({
  selector: 'app-order-detail',
  imports: [
    RouterLink,
    DatePipe,
    DecimalPipe,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {
  private service = inject(OrderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly order = signal<Order | null>(null);
  readonly loading = signal(true);
  readonly notFound = signal(false);
  readonly savingStatus = signal(false);

  protected selectedStatus = signal('');
  protected readonly statusOptions = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'CONFIRMED', label: 'Confirmado' },
    { value: 'SHIPPED', label: 'Enviado' },
    { value: 'DELIVERED', label: 'Entregado' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ];

  protected readonly detailColumns = ['product', 'amount', 'subtotal'];

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }
    this.service.getById(id).subscribe({
      next: (o) => {
        this.order.set(o);
        this.selectedStatus.set(o.status);
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
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

  updateStatus(): void {
    const current = this.order();
    if (!current || this.selectedStatus() === current.status) return;

    this.savingStatus.set(true);
    this.service.update(current.id, { status: this.selectedStatus() }).subscribe({
      next: (updated) => {
        this.order.set(updated);
        this.selectedStatus.set(updated.status);
        this.savingStatus.set(false);
      },
      error: () => {
        this.savingStatus.set(false);
      },
    });
  }
}
