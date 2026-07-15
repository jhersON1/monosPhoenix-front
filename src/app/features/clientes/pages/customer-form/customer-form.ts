import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  private fb = inject(FormBuilder);
  private service = inject(CustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected isEditMode = signal(false);
  protected customerId = signal<string | null>(null);
  protected saving = signal(false);
  protected submitError = signal<string | null>(null);

  protected form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.customerId.set(id);
      this.service.getById(id).subscribe({
        next: (customer) => {
          this.form.patchValue({
            fullName: customer.fullName,
            email: customer.email,
            phone: customer.phone ?? '',
          });
        },
        error: () => this.submitError.set('No se pudo cargar el cliente.'),
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.saving.set(true);
    this.submitError.set(null);
    const raw = this.form.getRawValue();

    if (this.isEditMode()) {
      this.service
        .update(this.customerId()!, {
          fullName: raw.fullName!,
          email: raw.email!,
          phone: raw.phone || null,
        })
        .subscribe({
          next: () => this.router.navigate(['/customers']),
          error: (err) => {
            this.submitError.set(err.message ?? 'Error al guardar.');
            this.saving.set(false);
          },
        });
    } else {
      this.service
        .create({
          fullName: raw.fullName!,
          email: raw.email!,
          phone: raw.phone || undefined,
        })
        .subscribe({
          next: () => this.router.navigate(['/customers']),
          error: (err) => {
            this.submitError.set(err.message ?? 'Error al guardar.');
            this.saving.set(false);
          },
        });
    }
  }
}
