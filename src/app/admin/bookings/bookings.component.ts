import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="bookings-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Bookings Management</mat-card-title>
          <div class="header-actions">
            <mat-form-field>
              <mat-label>Filter by date</mat-label>
              <input matInput [matDatepicker]="picker">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon>
              New Booking
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="bookings">
            <!-- Booking ID Column -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>Booking ID</th>
              <td mat-cell *matCellDef="let booking">{{booking.id}}</td>
            </ng-container>

            <!-- Customer Column -->
            <ng-container matColumnDef="customer">
              <th mat-header-cell *matHeaderCellDef>Customer</th>
              <td mat-cell *matCellDef="let booking">{{booking.customer}}</td>
            </ng-container>

            <!-- Tour Column -->
            <ng-container matColumnDef="tour">
              <th mat-header-cell *matHeaderCellDef>Tour</th>
              <td mat-cell *matCellDef="let booking">{{booking.tour}}</td>
            </ng-container>

            <!-- Date Column -->
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let booking">{{booking.date}}</td>
            </ng-container>

            <!-- Amount Column -->
            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Amount</th>
              <td mat-cell *matCellDef="let booking">{{booking.amount}}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let booking">
                <mat-chip [color]="getStatusColor(booking.status)" selected>
                  {{booking.status}}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let booking">
                <button mat-icon-button color="primary">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button color="warn">
                  <mat-icon>cancel</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .bookings-container {
      padding: 24px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .header-actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    mat-form-field {
      width: 200px;
    }

    table {
      width: 100%;
    }

    .mat-column-actions {
      width: 120px;
      text-align: center;
    }

    button[mat-icon-button] {
      margin: 0 4px;
    }

    .mat-column-amount {
      width: 100px;
    }

    .mat-column-date {
      width: 120px;
    }
  `]
})
export class BookingsComponent {
  displayedColumns: string[] = ['id', 'customer', 'tour', 'date', 'amount', 'status', 'actions'];
  bookings = [
    {
      id: 'BK001',
      customer: 'John Doe',
      tour: 'Mountain Trek Adventure',
      date: '2024-03-20',
      amount: '$299',
      status: 'Confirmed'
    },
    {
      id: 'BK002',
      customer: 'Jane Smith',
      tour: 'Beach Resort Package',
      date: '2024-03-21',
      amount: '$499',
      status: 'Pending'
    },
    {
      id: 'BK003',
      customer: 'Mike Johnson',
      tour: 'City Explorer Tour',
      date: '2024-03-22',
      amount: '$199',
      status: 'Cancelled'
    },
    {
      id: 'BK004',
      customer: 'Sarah Wilson',
      tour: 'Cultural Heritage Tour',
      date: '2024-03-23',
      amount: '$399',
      status: 'Completed'
    }
  ];

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'primary';
      case 'pending':
        return 'accent';
      case 'cancelled':
        return 'warn';
      case 'completed':
        return 'primary';
      default:
        return 'primary';
    }
  }
} 