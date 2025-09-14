import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import FarmCard from '@/components/FarmCard';
import InteractiveMap from '@/components/InteractiveMap';
import ChatInterface from '@/components/ChatInterface';
import HarvestForecast from '@/components/HarvestForecast';
import ProcessSteps from '@/components/ProcessSteps';
import { Sprout, MapPin, Leaf, Users, Bot } from 'lucide-react';
import heroImage from '@/assets/hero-produce-crate.jpg';
import { mockFarms } from '@/data/farmData';
import { Farm } from '@/types/farm';
const Index = () => {
  const [highlightedFarms, setHighlightedFarms] = useState<Farm[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  // Convert mockFarms to the format needed for FarmCard component
  const featuredFarms = mockFarms.slice(0, 6).map(farm => ({
    name: farm.name,
    distance: farm.distance,
    rating: farm.rating,
    specialties: farm.specialties,
    availability: farm.pickupTimes[0] ? `Available ${farm.pickupTimes[0].toLowerCase()}` : 'Check availability',
    sustainability: farm.ecoScore >= 8.5 ? 'high' as const : farm.ecoScore >= 7.5 ? 'medium' as const : 'low' as const,
    description: farm.description,
    imageUrl: farm.imageUrl
  }));

  return <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }} />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
          <h1 className="font-baskerville text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-wide">
            EAT WITH THE SEASONS
          </h1>
          
          <div className="flex items-center gap-6 md:gap-8 text-lg md:text-xl lg:text-2xl font-light tracking-widest">
            <span>Local</span>
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
            <span>Fresh</span>
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
            <span>Sustainable</span>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <ProcessSteps />

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-16">

        {/* Interactive Map Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-baskerville text-4xl font-bold text-foreground">Find Farms Near You</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search for fresh produce and discover farms in your area offering exactly what you need.
            </p>
          </div>
          
          <div className="w-full">
            <InteractiveMap farms={mockFarms} />
          </div>
        </div>

        {/* Premium AI Assistant Section */}
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <h2 className="font-baskerville text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Meet Your Personal Farm AI Assistant
            </h2>
          </div>
          
          <div className="w-full">
            <ChatInterface
              onFarmsHighlight={setHighlightedFarms}
              onSearchQuery={setSearchQuery}
              selectedFarm={selectedFarm}
            />
          </div>
        </div>

        {/* Local Farms Carousel */}
        <div>
          <h2 className="font-baskerville text-4xl font-bold text-foreground mb-8 text-center">Featured Local Farms</h2>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredFarms.map((farm, index) => <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <FarmCard {...farm} />
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Harvest Forecast Section */}
      <HarvestForecast />
    </div>;
};
export default Index;