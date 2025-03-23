import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: Date;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ],
  template: `
    <div class="card">
      <div class="flex justify-between align-center mb-4">
        <h2 class="text-xl font-semibold">Users Management</h2>
        <div class="flex gap-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <input 
              pInputText 
              [(ngModel)]="globalFilter" 
              (input)="onGlobalFilter($event)"
              placeholder="Search users..."
            />
          </span>
          <p-button 
            icon="pi pi-plus" 
            label="Add User" 
            (onClick)="addUser()"
            styleClass="p-button-primary"
          ></p-button>
        </div>
      </div>

      <p-table 
        #dt
        [value]="users" 
        [rows]="10" 
        [paginator]="true"
        [rowsPerPageOptions]="[10,20,50]"
        [showCurrentPageReport]="true"
        responsiveLayout="scroll"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
        [filters]="filters"
        [globalFilterFields]="['name','email','role']"
        [tableStyle]="{'min-width': '50rem'}"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-user>
          <tr>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.role}}</td>
            <td>
              <span class="badge" [ngClass]="{
                'badge-success': user.status === 'Active',
                'badge-warning': user.status === 'Pending',
                'badge-danger': user.status === 'Inactive'
              }">
                {{user.status}}
              </span>
            </td>
            <td>{{user.lastLogin | date:'medium'}}</td>
            <td>
              <div class="flex gap-2">
                <p-button 
                  icon="pi pi-pencil" 
                  (onClick)="editUser(user)"
                  styleClass="p-button-rounded p-button-text"
                ></p-button>
                <p-button 
                  icon="pi pi-trash" 
                  (onClick)="deleteUser(user)"
                  styleClass="p-button-rounded p-button-text p-button-danger"
                ></p-button>
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="6" class="text-center">No users found</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 1rem;
    }
  `]
})
export class UsersComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  users: User[] = [];
  globalFilter: string = '';
  filters: any = {};

  ngOnInit() {
    // Simulated data - replace with actual API call
    this.users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: new Date()
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Pending',
        lastLogin: new Date()
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'Editor',
        status: 'Inactive',
        lastLogin: new Date()
      }
    ];
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }

  addUser() {
    // Implement add user logic
    console.log('Add user clicked');
  }

  editUser(user: User) {
    // Implement edit user logic
    console.log('Edit user clicked', user);
  }

  deleteUser(user: User) {
    // Implement delete user logic
    console.log('Delete user clicked', user);
  }
} 