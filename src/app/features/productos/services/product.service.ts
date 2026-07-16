import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../../../domain/entities/product.entity';
import { ProductApi } from '../../../data-access/api/product.api';
import { CreateProductDto, UpdatePriceStockDto } from '../../../data-access/dto/product.dto';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = inject(ProductApi);

  private _products = signal<Product[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadAll(): void {
    this._loading.set(true);
    this._error.set(null);
    this.api.getAll().subscribe({
      next: (res) => {
        this._products.set(res);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message ?? 'Error al cargar productos');
        this._loading.set(false);
      }
    });
  }

  getById(id: string) {
    return this.api.getById(id);
  }

  create(dto: CreateProductDto) {
    return this.api.create(dto);
  }

  updatePriceStock(id: string, dto: UpdatePriceStockDto) {
    return this.api.updatePriceStock(id, dto);
  }

  deactivate(id: string) {
    return this.api.deactivate(id);
  }
}
