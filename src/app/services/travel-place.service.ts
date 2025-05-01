import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelPlace } from '../models/travel-place';

@Injectable({
  providedIn: 'root'
})
export class TravelPlaceService {
  private apiUrl = 'https://localhost:44399/api/TravelPlace';

  constructor(private http: HttpClient) { }

  getAllTravelPlaces(): Observable<TravelPlace[]> {
    return this.http.get<TravelPlace[]>(this.apiUrl);
  }

  getTravelPlaceById(id: number): Observable<TravelPlace> {
    return this.http.get<TravelPlace>(`${this.apiUrl}/${id}`);
  }

  createTravelPlace(travelPlace: TravelPlace): Observable<any> {
    return this.http.post(this.apiUrl, travelPlace);
  }

  updateTravelPlace(id: number, travelPlace: TravelPlace): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, travelPlace);
  }

  deleteTravelPlace(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
