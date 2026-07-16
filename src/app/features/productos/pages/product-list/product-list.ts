import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-product-list',
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
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private service = inject(ProductService);
  private dialog = inject(MatDialog);

  readonly products = this.service.products;
  readonly loading = this.service.loading;
  readonly error = this.service.error;

  protected readonly displayedColumns = [
    'name',
    'description',
    'price',
    'stock',
    'isActive',
    'createdAt',
    'actions',
  ];

  constructor() {
    this.service.loadAll();
  }

  confirmDeactivate(id: string): void {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        message: '¿Está seguro de que desea desactivar este producto? Esta acción no elimina el producto.',
        confirmLabel: 'Desactivar',
      },
    });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deactivate(id).subscribe({
          next: () => this.service.loadAll(),
          error: (err) => console.error(err),
        });
      }
    });
  }
}
