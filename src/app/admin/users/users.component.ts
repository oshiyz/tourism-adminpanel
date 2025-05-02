import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService, User, UpdateUserRequest, CreateUserRequest } from '../../services/user.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>Edit User</h2>
    <mat-dialog-content>
      <form #editForm="ngForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Full Name</mat-label>
          <input matInput [(ngModel)]="userData.fullName" name="fullName" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="userData.email" name="email" required type="email">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Telephone</mat-label>
          <input matInput [(ngModel)]="userData.telephone" name="telephone" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Role</mat-label>
          <mat-select [(ngModel)]="userData.role" name="role" required>
            <mat-option value="User">User</mat-option>
            <mat-option value="Admin">Admin</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!editForm.form.valid">
        Save Changes
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class EditUserDialogComponent {
  userData: UpdateUserRequest;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    console.log('Received user data:', data);
    this.userData = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      telephone: data.telephone,
      role: data.role
    };
    console.log('Initialized form data:', this.userData);
  }

  onSubmit() {
    if (this.userData.id) {
      console.log('Submitting form with data:', this.userData);
      this.userService.updateUser(this.userData.id, this.userData).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.snackBar.open('User updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            error: error.error
          });
          this.snackBar.open('Error updating user: ' + (error.error?.Message || error.message), 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>Create New User</h2>
    <mat-dialog-content>
      <form #createForm="ngForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Full Name</mat-label>
          <input matInput [(ngModel)]="userData.fullName" name="fullName" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="userData.email" name="email" required type="email">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Telephone</mat-label>
          <input matInput [(ngModel)]="userData.telephone" name="telephone" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Password</mat-label>
          <input matInput [(ngModel)]="userData.password" name="password" required type="password">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Role</mat-label>
          <mat-select [(ngModel)]="userData.role" name="role" required>
            <mat-option value="User">User</mat-option>
            <mat-option value="Admin">Admin</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!createForm.form.valid">
        Create User
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class CreateUserDialogComponent {
  userData: CreateUserRequest = {
    fullName: '',
    email: '',
    telephone: '',
    role: 'User',
    password: ''
  };

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>
  ) {}

  onSubmit() {
    this.userService.createUser(this.userData).subscribe({
      next: () => {
        this.snackBar.open('User created successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.snackBar.open('Error creating user: ' + (error.error?.Message || error.message), 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="users-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Users Management</mat-card-title>
          <button mat-raised-button color="primary" (click)="openCreateDialog()" class="create-button">
            <mat-icon>add</mat-icon>
            Create User
          </button>
        </mat-card-header>
        <mat-card-content>
          <div class="loading-shade" *ngIf="isLoading">
            <mat-spinner></mat-spinner>
          </div>

          <table mat-table [dataSource]="users" matSort>
            <!-- ID Column -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
              <td mat-cell *matCellDef="let user">{{user.id}}</td>
            </ng-container>

            <!-- Name Column -->
            <ng-container matColumnDef="fullName">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
              <td mat-cell *matCellDef="let user">{{user.fullName}}</td>
            </ng-container>

            <!-- Email Column -->
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
              <td mat-cell *matCellDef="let user">{{user.email}}</td>
            </ng-container>

            <!-- Telephone Column -->
            <ng-container matColumnDef="telephone">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Telephone</th>
              <td mat-cell *matCellDef="let user">{{user.telephone}}</td>
            </ng-container>

            <!-- Role Column -->
            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
              <td mat-cell *matCellDef="let user">{{user.role}}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="isEmailVerified">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
              <td mat-cell *matCellDef="let user">
                <span class="status-badge" [class]="user.isEmailVerified ? 'active' : 'inactive'">
                  {{user.isEmailVerified ? 'Verified' : 'Unverified'}}
                </span>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button color="primary" (click)="openEditDialog(user)" matTooltip="Edit User">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="openDeleteDialog(user)" matTooltip="Delete User">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator
            [length]="totalUsers"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 25, 100]"
            (page)="onPageChange($event)">
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 24px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .create-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.active {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      &.inactive {
        background-color: #ffebee;
        color: #c62828;
      }
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

    .loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.15);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'telephone', 'role', 'isEmailVerified', 'actions'];
  users: User[] = [];
  isLoading = false;
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        console.log('Users response:', response);
        this.users = response.users;
        this.totalUsers = response.users.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Reload the users list after create
      }
    });
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Reload the users list after edit
      }
    });
  }

  openDeleteDialog(user: User) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Reload the users list after delete
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <h2 mat-dialog-title>Delete User</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this user?</p>
      <p><strong>Name:</strong> {{data.fullName}}</p>
      <p><strong>Email:</strong> {{data.email}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onDelete()">
        Delete
      </button>
    </mat-dialog-actions>
  `
})
export class DeleteUserDialogComponent {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onDelete() {
    this.userService.deleteUser(this.data.id).subscribe({
      next: () => {
        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.snackBar.open('Error deleting user: ' + (error.error?.Message || error.message), 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
} 