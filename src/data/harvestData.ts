import strawberriesImage from '@/assets/produce-strawberries.jpg';
import tomatoesImage from '@/assets/produce-tomatoes.jpg';
import carrotsImage from '@/assets/produce-carrots.jpg';
import cornImage from '@/assets/produce-corn.jpg';
import spinachImage from '@/assets/produce-spinach.jpg';
import peppersImage from '@/assets/produce-peppers.jpg';

export interface HarvestForecastItem {
  id: string;
  name: string;
  season: string;
  imageUrl: string;
  interestCount: number;
  seasonalTag: string;
  description: string;
}

export const harvestForecastData: HarvestForecastItem[] = [
  {
    id: 'strawberries-2025',
    name: 'Strawberries',
    season: 'Summer 2025',
    imageUrl: strawberriesImage,
    interestCount: 132,
    seasonalTag: 'Peak Season',
    description: 'Sweet, juicy strawberries perfect for summer treats'
  },
  {
    id: 'tomatoes-2025',
    name: 'Heirloom Tomatoes',
    season: 'Summer 2025',
    imageUrl: tomatoesImage,
    interestCount: 89,
    seasonalTag: 'Premium',
    description: 'Vine-ripened heirloom varieties with rich, complex flavors'
  },
  {
    id: 'carrots-2025',
    name: 'Rainbow Carrots',
    season: 'Fall 2025',
    imageUrl: carrotsImage,
    interestCount: 156,
    seasonalTag: 'High Demand',
    description: 'Colorful, sweet carrots in purple, orange, and yellow'
  },
  {
    id: 'corn-2025',
    name: 'Sweet Corn',
    season: 'Late Summer 2025',
    imageUrl: cornImage,
    interestCount: 203,
    seasonalTag: 'Popular',
    description: 'Farm-fresh sweet corn, picked at peak sweetness'
  },
  {
    id: 'spinach-2025',
    name: 'Baby Spinach',
    season: 'Spring 2025',
    imageUrl: spinachImage,
    interestCount: 94,
    seasonalTag: 'Nutritious',
    description: 'Tender, nutrient-rich baby spinach leaves'
  },
  {
    id: 'peppers-2025',
    name: 'Bell Peppers',
    season: 'Summer 2025',
    imageUrl: peppersImage,
    interestCount: 67,
    seasonalTag: 'Colorful',
    description: 'Crisp, sweet bell peppers in vibrant colors'
  }
];

export const topRequestedCrops = [
  { name: 'Sweet Corn', requests: 203 },
  { name: 'Rainbow Carrots', requests: 156 },
  { name: 'Strawberries', requests: 132 }
];