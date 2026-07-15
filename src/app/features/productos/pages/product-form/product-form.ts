import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private service = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected isEditMode = signal(false);
  protected productId = signal<string | null>(null);
  protected saving = signal(false);
  protected submitError = signal<string | null>(null);

  protected form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.productId.set(id);
      this.form.get('name')?.disable();
      this.form.get('description')?.disable();
      this.service.getById(id).subscribe({
        next: (product) => {
          this.form.patchValue({
            name: product.name,
            description: product.description ?? '',
            price: product.price,
            stock: product.stock,
          });
        },
        error: () => this.submitError.set('No se pudo cargar el producto.'),
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
        .updatePriceStock(this.productId()!, { price: raw.price!, stock: raw.stock! })
        .subscribe({
          next: () => this.router.navigate(['/products']),
          error: (err) => {
            this.submitError.set(err.message ?? 'Error al guardar.');
            this.saving.set(false);
          },
        });
    } else {
      this.service
        .create({
          name: raw.name!,
          description: raw.description || undefined,
          price: raw.price!,
          stock: raw.stock!,
        })
        .subscribe({
          next: () => this.router.navigate(['/products']),
          error: (err) => {
            this.submitError.set(err.message ?? 'Error al guardar.');
            this.saving.set(false);
          },
        });
    }
  }
}
