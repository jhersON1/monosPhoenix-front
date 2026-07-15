import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto, UpdatePriceStockDto } from '../dto/product.dto';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/products`;

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, dto);
  }

  updatePriceStock(id: string, dto: UpdatePriceStockDto): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, dto);
  }

  deactivate(id: string): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}/deactivate`, {});
  }
}
