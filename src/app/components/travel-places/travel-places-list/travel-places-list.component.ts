import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { TravelPlaceService } from '../../../services/travel-place.service';
import { TravelPlace } from '../../../models/travel-place';

@Component({
  selector: 'app-travel-places-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './travel-places-list.component.html',
  styleUrls: ['./travel-places-list.component.scss']
})
export class TravelPlacesListComponent implements OnInit {
  travelPlaces: TravelPlace[] = [];
  loading = true;
  error = '';

  constructor(private travelPlaceService: TravelPlaceService) { }

  ngOnInit(): void {
    this.loadTravelPlaces();
  }

  loadTravelPlaces(): void {
    this.loading = true;
    this.travelPlaceService.getAllTravelPlaces().subscribe({
      next: (places) => {
        this.travelPlaces = places;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load travel places';
        this.loading = false;
      }
    });
  }

  deleteTravelPlace(id: number): void {
    if (confirm('Are you sure you want to delete this travel place?')) {
      this.travelPlaceService.deleteTravelPlace(id).subscribe({
        next: () => {
          this.travelPlaces = this.travelPlaces.filter(place => place.id !== id);
        },
        error: () => {
          this.error = 'Failed to delete travel place';
        }
      });
    }
  }
}
