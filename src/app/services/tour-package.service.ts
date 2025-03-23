import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TourPackage } from '../models/tour-package'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  private apiUrl = 'https://localhost:44399/api/TourPackage'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  addTourPackage(tourPackage: TourPackage): Observable<TourPackage> {
    return this.http.post<TourPackage>(this.apiUrl, tourPackage);
  }
}