import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    TableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Statistics Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">people</mat-icon>
              <div class="stat-info">
                <h3>Total Users</h3>
                <p class="stat-number">1,234</p>
                <span class="stat-change positive">+12% from last month</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">card_travel</mat-icon>
              <div class="stat-info">
                <h3>Active Tours</h3>
                <p class="stat-number">45</p>
                <span class="stat-change positive">+5% from last month</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">book_online</mat-icon>
              <div class="stat-info">
                <h3>Bookings</h3>
                <p class="stat-number">789</p>
                <span class="stat-change negative">-3% from last month</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">payments</mat-icon>
              <div class="stat-info">
                <h3>Revenue</h3>
                <p class="stat-number">$45,678</p>
                <span class="stat-change positive">+8% from last month</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Charts Section -->
      <div class="charts-grid">
        <p-card header="Booking Trends">
          <p-chart type="line" [data]="bookingData" [options]="chartOptions"></p-chart>
        </p-card>

        <p-card header="Revenue Distribution">
          <p-chart type="pie" [data]="revenueData" [options]="chartOptions"></p-chart>
        </p-card>
      </div>

      <!-- Recent Bookings Table -->
      <p-card header="Recent Bookings">
        <p-table [value]="recentBookings" [paginator]="true" [rows]="5">
          <ng-template pTemplate="header">
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Tour</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-booking>
            <tr>
              <td>{{booking.id}}</td>
              <td>{{booking.customer}}</td>
              <td>{{booking.tour}}</td>
              <td>{{booking.date}}</td>
              <td>
                <span [class]="'status-badge ' + booking.status.toLowerCase()">
                  {{booking.status}}
                </span>
              </td>
              <td>{{booking.amount}}</td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-5px);
      }

      .stat-content {
        display: flex;
        align-items: center;
        padding: 16px;
      }

      .stat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #1976d2;
        margin-right: 16px;
      }

      .stat-info {
        h3 {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .stat-number {
          margin: 8px 0;
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .stat-change {
          font-size: 12px;
          
          &.positive {
            color: #4caf50;
          }
          
          &.negative {
            color: #f44336;
          }
        }
      }
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.completed {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      &.pending {
        background-color: #fff3e0;
        color: #ef6c00;
      }

      &.cancelled {
        background-color: #ffebee;
        color: #c62828;
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 16px;
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  bookingData: any;
  revenueData: any;
  chartOptions: any;
  recentBookings: any[] = [];

  ngOnInit() {
    // Sample data for charts
    this.bookingData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Bookings',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: '#1976d2',
          tension: 0.4
        }
      ]
    };

    this.revenueData = {
      labels: ['Tours', 'Hotels', 'Transportation', 'Activities'],
      datasets: [
        {
          data: [300, 50, 100, 150],
          backgroundColor: ['#1976d2', '#4caf50', '#ff9800', '#f44336']
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    // Sample data for recent bookings table
    this.recentBookings = [
      {
        id: 'BK001',
        customer: 'John Doe',
        tour: 'Mountain Trek',
        date: '2024-03-20',
        status: 'Completed',
        amount: '$299'
      },
      {
        id: 'BK002',
        customer: 'Jane Smith',
        tour: 'Beach Resort',
        date: '2024-03-21',
        status: 'Pending',
        amount: '$499'
      },
      {
        id: 'BK003',
        customer: 'Mike Johnson',
        tour: 'City Tour',
        date: '2024-03-22',
        status: 'Cancelled',
        amount: '$199'
      }
    ];
  }
} 