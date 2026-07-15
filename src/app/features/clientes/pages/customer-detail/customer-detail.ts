import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../../../domain/entities/customer.entity';

@Component({
  selector: 'app-customer-detail',
  imports: [
    RouterLink,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
})
export class CustomerDetail {
  private service = inject(CustomerService);
  private route = inject(ActivatedRoute);

  readonly customer = signal<Customer | null>(null);
  readonly loading = signal(true);
  readonly notFound = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }
    this.service.getById(id).subscribe({
      next: (c) => {
        this.customer.set(c);
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }
}
