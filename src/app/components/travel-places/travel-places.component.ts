import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-travel-places',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './travel-places.component.html',
  styleUrl: './travel-places.component.scss'
})
export class TravelPlacesComponent {
  // Component logic will be added here
}
