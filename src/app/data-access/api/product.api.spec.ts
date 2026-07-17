import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductApi } from './product.api';
import { environment } from '../../../environments/environment';

describe('ProductApi', () => {
  let api: ProductApi;
  let http: HttpTestingController;
  const baseUrl = `${environment.apiUrl}/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    api = TestBed.inject(ProductApi);
    http = TestBed.inject(HttpTestingController);
  });

  it('GET /products', () => {
    api.getAll().subscribe();
    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
  });

  it('GET /products/:id', () => {
    api.getById('abc').subscribe();
    http.expectOne(`${baseUrl}/abc`);
  });

  it('POST /products', () => {
    api.create({ name: 'Test', price: 10, stock: 5 }).subscribe();
    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'Test', price: 10, stock: 5 });
  });

  it('PATCH /products/:id', () => {
    api.updatePriceStock('x', { price: 20, stock: 3 }).subscribe();
    const req = http.expectOne(`${baseUrl}/x`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ price: 20, stock: 3 });
  });

  it('PATCH /products/:id/deactivate', () => {
    api.deactivate('x').subscribe();
    const req = http.expectOne(`${baseUrl}/x/deactivate`);
    expect(req.request.method).toBe('PATCH');
  });
});
