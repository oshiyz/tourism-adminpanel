import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Place {
  id?: number;
  name: string;
  description: string;
  images: string;
  price: number;
  packages: string;
  capacity: number;
  timeSlots: string;
  specialFunctions: string;
  location: string;
  contactInfo: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private apiUrl = 'https://localhost:44399/api/places';

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
  }

  getPlaceById(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/${id}`);
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(this.apiUrl, place);
  }

  updatePlace(id: number, place: Place): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, place);
  }

  deletePlace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 