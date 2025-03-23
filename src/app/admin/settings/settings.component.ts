import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule
  ],
  template: `
    <div class="settings-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>System Settings</mat-card-title>
          <button mat-raised-button color="primary">
            <mat-icon>save</mat-icon>
            Save Changes
          </button>
        </mat-card-header>
        <mat-card-content>
          <div class="settings-section">
            <h2>General Settings</h2>
            <mat-form-field>
              <mat-label>Company Name</mat-label>
              <input matInput value="Tourism Admin">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Default Currency</mat-label>
              <mat-select value="USD">
                <mat-option value="USD">USD ($)</mat-option>
                <mat-option value="EUR">EUR (€)</mat-option>
                <mat-option value="GBP">GBP (£)</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Time Zone</mat-label>
              <mat-select value="UTC">
                <mat-option value="UTC">UTC</mat-option>
                <mat-option value="EST">EST</mat-option>
                <mat-option value="PST">PST</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="settings-section">
            <h2>Email Settings</h2>
            <mat-form-field>
              <mat-label>SMTP Server</mat-label>
              <input matInput value="smtp.example.com">
            </mat-form-field>

            <mat-form-field>
              <mat-label>SMTP Port</mat-label>
              <input matInput type="number" value="587">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Email Username</mat-label>
              <input matInput value="noreply@example.com">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Email Password</mat-label>
              <input matInput type="password" value="********">
            </mat-form-field>
          </div>

          <div class="settings-section">
            <h2>Notification Settings</h2>
            <div class="toggle-group">
              <mat-slide-toggle checked>Email Notifications</mat-slide-toggle>
              <mat-slide-toggle checked>SMS Notifications</mat-slide-toggle>
              <mat-slide-toggle>Push Notifications</mat-slide-toggle>
            </div>
          </div>

          <div class="settings-section">
            <h2>Backup Settings</h2>
            <mat-form-field>
              <mat-label>Backup Frequency</mat-label>
              <mat-select value="daily">
                <mat-option value="daily">Daily</mat-option>
                <mat-option value="weekly">Weekly</mat-option>
                <mat-option value="monthly">Monthly</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Backup Time</mat-label>
              <input matInput type="time" value="00:00">
            </mat-form-field>

            <div class="toggle-group">
              <mat-slide-toggle checked>Enable Automatic Backups</mat-slide-toggle>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 24px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .settings-section {
      margin-bottom: 32px;

      h2 {
        margin: 0 0 16px 0;
        color: #333;
        font-size: 20px;
      }
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .toggle-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    mat-slide-toggle {
      margin-bottom: 8px;
    }
  `]
})
export class SettingsComponent {} 