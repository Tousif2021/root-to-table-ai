import strawberriesImage from '@/assets/produce-strawberries-bag.jpg';
import tomatoesImage from '@/assets/produce-tomatoes.jpg';
import carrotsImage from '@/assets/produce-carrots-fresh.jpg';
import cornImage from '@/assets/produce-corn-hanging.jpg';
import spinachImage from '@/assets/produce-spinach-fresh.jpg';
import peppersImage from '@/assets/produce-peppers-basket.jpg';

export interface HarvestForecastItem {
  id: string;
  name: string;
  season: string;
  imageUrl: string;
  interestCount: number;
  seasonalTag: string;
  description: string;
  farmName: string;
}

export const harvestForecastData: HarvestForecastItem[] = [
  {
    id: 'strawberries-2025',
    name: 'Strawberries',
    season: 'Summer 2025',
    imageUrl: strawberriesImage,
    interestCount: 132,
    seasonalTag: 'Peak Season',
    description: 'Sweet, juicy strawberries perfect for summer treats',
    farmName: 'Berry Fields Farm'
  },
  {
    id: 'tomatoes-2025',
    name: 'Heirloom Tomatoes',
    season: 'Summer 2025',
    imageUrl: tomatoesImage,
    interestCount: 89,
    seasonalTag: 'Premium',
    description: 'Vine-ripened heirloom varieties with rich, complex flavors',
    farmName: 'Tomato Garden Farm'
  },
  {
    id: 'carrots-2025',
    name: 'Rainbow Carrots',
    season: 'Fall 2025',
    imageUrl: carrotsImage,
    interestCount: 156,
    seasonalTag: 'High Demand',
    description: 'Colorful, sweet carrots in purple, orange, and yellow',
    farmName: 'Anders\' Organic Farm'
  },
  {
    id: 'corn-2025',
    name: 'Sweet Corn',
    season: 'Late Summer 2025',
    imageUrl: cornImage,
    interestCount: 203,
    seasonalTag: 'Popular',
    description: 'Farm-fresh sweet corn, picked at peak sweetness',
    farmName: 'Harvest Market Farm'
  },
  {
    id: 'spinach-2025',
    name: 'Baby Spinach',
    season: 'Spring 2025',
    imageUrl: spinachImage,
    interestCount: 94,
    seasonalTag: 'Nutritious',
    description: 'Tender, nutrient-rich baby spinach leaves',
    farmName: 'Lettuce Love Farm'
  },
  {
    id: 'peppers-2025',
    name: 'Bell Peppers',
    season: 'Summer 2025',
    imageUrl: peppersImage,
    interestCount: 67,
    seasonalTag: 'Colorful',
    description: 'Crisp, sweet bell peppers in vibrant colors',
    farmName: 'Lena\'s Heritage Farm'
  }
];

export const topRequestedCrops = [
  { name: 'Sweet Corn', requests: 203 },
  { name: 'Rainbow Carrots', requests: 156 },
  { name: 'Strawberries', requests: 132 }
];