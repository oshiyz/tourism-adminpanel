import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-tours',
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
    MatChipsModule
  ],
  template: `
    <div class="tours-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Tours Management</mat-card-title>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Add Tour
          </button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="dataSource">
            <!-- ID Column -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let tour">{{tour.id}}</td>
            </ng-container>

            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let tour">{{tour.name}}</td>
            </ng-container>

            <!-- Duration Column -->
            <ng-container matColumnDef="duration">
              <th mat-header-cell *matHeaderCellDef>Duration</th>
              <td mat-cell *matCellDef="let tour">{{tour.duration}}</td>
            </ng-container>

            <!-- Price Column -->
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let tour">{{tour.price}}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let tour">
                <mat-chip [color]="tour.status === 'Active' ? 'primary' : 'warn'" selected>
                  {{tour.status}}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let tour">
                <button mat-icon-button color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"
                        showFirstLastButtons
                        aria-label="Select page of tours">
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .tours-container {
      padding: 24px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
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

    .mat-column-price {
      width: 100px;
    }

    .mat-column-duration {
      width: 100px;
    }
  `]
})
export class ToursComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['id', 'name', 'duration', 'price', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor() {
    const tours = [
      {
        id: 1,
        name: 'Mountain Trek Adventure',
        duration: '3 days',
        price: '$299',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Beach Resort Package',
        duration: '5 days',
        price: '$499',
        status: 'Active'
      },
      {
        id: 3,
        name: 'City Explorer Tour',
        duration: '2 days',
        price: '$199',
        status: 'Inactive'
      },
      {
        id: 4,
        name: 'Cultural Heritage Tour',
        duration: '4 days',
        price: '$399',
        status: 'Active'
      }
    ];
    this.dataSource = new MatTableDataSource(tours);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
} 