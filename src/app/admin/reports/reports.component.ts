import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  template: `
    <div class="reports-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Reports & Analytics</mat-card-title>
          <div class="header-actions">
            <mat-form-field>
              <mat-label>Report Type</mat-label>
              <mat-select>
                <mat-option value="bookings">Booking Reports</mat-option>
                <mat-option value="revenue">Revenue Reports</mat-option>
                <mat-option value="tours">Tour Performance</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Date Range</mat-label>
              <input matInput [matDatepicker]="picker">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
            <button mat-raised-button color="primary">
              <mat-icon>download</mat-icon>
              Export Report
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div class="reports-grid">
            <!-- Summary Cards -->
            <mat-card class="summary-card">
              <mat-card-content>
                <h3>Total Bookings</h3>
                <p class="number">1,234</p>
                <p class="trend positive">+12.5% from last month</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="summary-card">
              <mat-card-content>
                <h3>Total Revenue</h3>
                <p class="number">$45,678</p>
                <p class="trend positive">+8.3% from last month</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="summary-card">
              <mat-card-content>
                <h3>Average Booking Value</h3>
                <p class="number">$370</p>
                <p class="trend negative">-2.1% from last month</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="summary-card">
              <mat-card-content>
                <h3>Customer Satisfaction</h3>
                <p class="number">4.8/5</p>
                <p class="trend positive">+0.2 from last month</p>
              </mat-card-content>
            </mat-card>
          </div>

          <!-- Placeholder for charts -->
          <div class="charts-container">
            <mat-card>
              <mat-card-content>
                <h3>Revenue Overview</h3>
                <div class="chart-placeholder">
                  Chart will be implemented here
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-content>
                <h3>Booking Trends</h3>
                <div class="chart-placeholder">
                  Chart will be implemented here
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .reports-container {
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

    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .summary-card {
      text-align: center;
      padding: 16px;

      h3 {
        margin: 0;
        color: #666;
        font-size: 16px;
      }

      .number {
        font-size: 32px;
        font-weight: bold;
        margin: 8px 0;
        color: #333;
      }

      .trend {
        font-size: 14px;
        margin: 0;

        &.positive {
          color: #2e7d32;
        }

        &.negative {
          color: #c62828;
        }
      }
    }

    .charts-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .chart-placeholder {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border-radius: 4px;
      color: #666;
    }
  `]
})
export class ReportsComponent {} 