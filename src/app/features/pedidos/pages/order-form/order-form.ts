import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { DecimalPipe } from '@angular/common';
import { OrderService } from '../../../productos/services/order.service';
import { ProductService } from '../../../productos/services/product.service';
import { CustomerService } from '../../../clientes/services/customer.service';

@Component({
  selector: 'app-order-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatSelectModule,
    DecimalPipe,
  ],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  protected productService = inject(ProductService);
  protected customerService = inject(CustomerService);
  private router = inject(Router);

  protected saving = signal(false);
  protected submitError = signal<string | null>(null);

  protected form = this.fb.group({
    customerId: ['', Validators.required],
    details: this.fb.array<ReturnType<typeof this.createDetailGroup>>([]),
  });

  protected get details(): FormArray {
    return this.form.get('details') as FormArray;
  }

  constructor() {
    if (this.customerService.customers().length === 0) {
      this.customerService.loadAll();
    }
    if (this.productService.products().length === 0) {
      this.productService.loadAll();
    }
  }

  private createDetailGroup() {
    return this.fb.group({
      productId: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addDetail(): void {
    this.details.push(this.createDetailGroup());
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) return;
    this.saving.set(true);
    this.submitError.set(null);
    const raw = this.form.getRawValue();

    this.orderService
      .create({
        customerId: raw.customerId!,
        details: raw.details!.map((d) => ({
          productId: d.productId!,
          amount: d.amount!,
        })),
      })
      .subscribe({
        next: () => this.router.navigate(['/orders']),
        error: (err) => {
          this.submitError.set(err.message ?? 'Error al crear el pedido.');
          this.saving.set(false);
        },
      });
  }
}
