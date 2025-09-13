import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import FarmCard from '@/components/FarmCard';
import InteractiveMap from '@/components/InteractiveMap';
import ChatInterface from '@/components/ChatInterface';
import { Sprout, MapPin, Leaf, Users, Bot } from 'lucide-react';
import heroImage from '@/assets/hero-produce-crate.jpg';
import processSteps from '@/assets/process-steps.png';
import { mockFarms } from '@/data/farmData';
import { Farm } from '@/components/InteractiveMap';
const Index = () => {
  const [highlightedFarms, setHighlightedFarms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  const legacyFarms = [{
    name: "Anna's Organic Farm",
    distance: "12km away",
    rating: 4.9,
    specialties: ["Strawberries", "Leafy Greens", "Herbs"],
    availability: "Available today",
    sustainability: "high" as const,
    description: "Family-run organic farm specializing in pesticide-free produce. Growing fresh vegetables for over 20 years."
  }, {
    name: "Green Valley Co-op",
    distance: "8km away",
    rating: 4.7,
    specialties: ["Root Vegetables", "Potatoes", "Onions"],
    availability: "Available tomorrow",
    sustainability: "high" as const,
    description: "Community-supported agriculture providing fresh, local produce to families across the region."
  }, {
    name: "Sunset Orchards",
    distance: "15km away",
    rating: 4.8,
    specialties: ["Seasonal Fruits", "Apples", "Berries"],
    availability: "Available weekends",
    sustainability: "medium" as const,
    description: "Traditional orchard focusing on heritage varieties and sustainable growing practices."
  }];

  return <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }} />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
          <h1 className="font-baskerville text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-wide">
            EAT WITH THE SEASON
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
      <section className="w-full">
        <img src={processSteps} alt="Process steps: Find, Select, Order" className="w-full h-auto" />
      </section>

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
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary/10 blur-2xl rounded-full"></div>
              <div className="relative flex items-center justify-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
                  <Bot className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-baskerville text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Your AI Farm Assistant
                </h2>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of farm-to-table shopping. Our advanced AI assistant understands your needs and connects you with the perfect local farms for fresh, seasonal produce.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Glassmorphism container */}
              <div className="absolute inset-0 bg-gradient-subtle/20 backdrop-blur-sm rounded-2xl border border-border/50"></div>
              <div className="absolute inset-0 bg-gradient-primary/5 rounded-2xl"></div>
              
              {/* Chat Interface */}
              <div className="relative p-8">
                <ChatInterface
                  onFarmsHighlight={setHighlightedFarms}
                  onSearchQuery={setSearchQuery}
                  selectedFarm={selectedFarm}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Local Farms Carousel */}
        <div>
          <h2 className="font-baskerville text-4xl font-bold text-foreground mb-8 text-center">Featured Local Farms</h2>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {legacyFarms.map((farm, index) => <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <FarmCard {...farm} />
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>;
};
export default Index;