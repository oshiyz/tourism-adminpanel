export interface TravelPlace {
  id?: number;
  ownerName: string;
  ownerEmail: string;
  placeName: string;
  description: string;
  locationLink: string;
  images: string;
  bookingInstructions: string;
  discountNotices?: string;
  contactInfo: string;
  bookedDates: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  facilities: TravelPlaceFacility[];
}

export interface TravelPlaceFacility {
  id?: number;
  travelPlaceId?: number;
  name: string;
  description: string;
  averagePrice: number;
  pricePerPerson: number;
  duration: string;
  availability: string;
  specialNotices?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
