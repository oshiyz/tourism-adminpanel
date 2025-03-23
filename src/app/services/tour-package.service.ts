import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TourPackage {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  private apiUrl = 'https://localhost:44399/api/TourPackage'; 

  constructor(private http: HttpClient) { }

  getTourPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(this.apiUrl);
  }

  getTourPackage(id: number): Observable<TourPackage> {
    return this.http.get<TourPackage>(`${this.apiUrl}/${id}`);
  }

  createTourPackage(tourPackage: TourPackage): Observable<TourPackage> {
    return this.http.post<TourPackage>(this.apiUrl, tourPackage);
  }

  updateTourPackage(id: number, tourPackage: TourPackage): Observable<TourPackage> {
    return this.http.put<TourPackage>(`${this.apiUrl}/${id}`, tourPackage);
  }

  deleteTourPackage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 