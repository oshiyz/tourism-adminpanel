import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  fullName: string;
  email: string;
  telephone: string;
  role: string;
  isEmailVerified: boolean;
  profilePhoto: string;
}

export interface UpdateUserRequest {
  id: number;
  fullName: string;
  email: string;
  telephone: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.apiUrl}/users`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    });
  }

  updateUser(userId: number, userData: UpdateUserRequest): Observable<any> {
    console.log('Sending update request:', {
      userId,
      userData
    });

    // Map the frontend data to match backend expectations
    const requestData = {
      id: userId,
      fullName: userData.fullName,
      email: userData.email,
      telephoneNumber: userData.telephone, // Note: backend expects telephoneNumber
      role: userData.role
    };

    console.log('Mapped request data:', requestData);

    return this.http.put(`${this.apiUrl}/users/${userId}`, requestData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    });
  }
} 