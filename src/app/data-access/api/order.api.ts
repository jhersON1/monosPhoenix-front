import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';

@Injectable({ providedIn: 'root' })
export class OrderApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/orders`;

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateOrderDto): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, dto);
  }

  update(id: string, dto: UpdateOrderDto): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}`, dto);
  }
}
