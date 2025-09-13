export interface Farm {
  id: string;
  name: string;
  coordinates: [number, number];
  distance: string;
  rating: number;
  produce: Array<{
    type: string;
    price: number;
    unit: string;
    available: boolean;
    organic: boolean;
  }>;
  ecoScore: number;
  pickupTimes: string[];
  deliveryAvailable: boolean;
  imageUrl: string;
  description: string;
  specialties: string[];
}