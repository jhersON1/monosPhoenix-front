import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-customer-list',
  imports: [
    RouterLink,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList {
  private service = inject(CustomerService);
  private dialog = inject(MatDialog);

  readonly customers = this.service.customers;
  readonly loading = this.service.loading;
  readonly error = this.service.error;

  protected readonly displayedColumns = [
    'fullName',
    'email',
    'phone',
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
        message: '¿Está seguro de que desea desactivar este cliente?',
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
