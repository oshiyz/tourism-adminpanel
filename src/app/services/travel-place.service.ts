import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TravelPlace } from '../models/travel-place';

@Injectable({
  providedIn: 'root'
})
export class TravelPlaceService {
  private apiUrl = 'https://localhost:44399/api/TravelPlace'; // Ensure this is correct and working.

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Fetch all travel places
  getAllTravelPlaces(): Observable<TravelPlace[]> {
    return this.http.get<TravelPlace[]>(this.apiUrl, { headers: this.headers })
      .pipe(
        tap(data => console.log('GET TravelPlaces Response:', data)),
        catchError(this.handleError)
      );
  }

  // Fetch a single travel place by ID
  getTravelPlaceById(id: number): Observable<TravelPlace> {
    return this.http.get<TravelPlace>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(
        tap(data => console.log(`GET TravelPlace ${id} Response:`, data)),
        catchError(this.handleError)
      );
  }

  // Create a new travel place (POST request)
  createTravelPlace(travelPlace: TravelPlace): Observable<any> {
    console.log('Sending POST TravelPlace:', travelPlace);
    return this.http.post(this.apiUrl, travelPlace, { headers: this.headers })
      .pipe(
        tap(response => console.log('POST TravelPlace Response:', response)),
        catchError(this.handleError)
      );
  }

  // Update an existing travel place (PUT request)
  updateTravelPlace(id: number, travelPlace: TravelPlace): Observable<any> {
    console.log(`Sending PUT TravelPlace ${id}:`, travelPlace);
    return this.http.put(`${this.apiUrl}/${id}`, travelPlace, { headers: this.headers })
      .pipe(
        tap(response => console.log(`PUT TravelPlace ${id} Response:`, response)),
        catchError(this.handleError)
      );
  }

  // Delete a travel place by ID
  deleteTravelPlace(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Error handling function
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
