import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import FarmCard from '@/components/FarmCard';
import InteractiveMap, { Farm } from '@/components/InteractiveMap';
import ChatInterface from '@/components/ChatInterface';
import { Sprout, MapPin, Leaf, Users } from 'lucide-react';
import heroImage from '@/assets/hero-produce.jpg';
import { mockFarms } from '@/data/farmData';
const Index = () => {
  const [highlightedFarms, setHighlightedFarms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  // Mock data for demonstration - legacy farm cards
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

  const handleFarmsHighlight = (farmIds: string[]) => {
    setHighlightedFarms(farmIds);
  };

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const handleFarmSelect = (farm: Farm) => {
    setSelectedFarm(farm);
  };
  return <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-4">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-full bg-primary">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                ROOTED
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Connect with 
              <span className="text-primary-glow"> Local Farms</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 text-white/90 leading-relaxed">
              Order fresh, sustainable produce directly from farmers in your area. 
              Reduce your carbon footprint while supporting local communities.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-glow transition-spring">
                Start Ordering
              </Button>
              <Button size="lg" variant="outline" className="border-white transition-spring text-zinc-600 bg-gray-300 hover:bg-gray-200">
                Find Local Farms
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-gradient-primary text-primary-foreground">
            <div className="p-3 rounded-full bg-white/20 w-fit mx-auto mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">50+</h3>
            <p>Local Farms Connected</p>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-earth text-white">
            <div className="p-3 rounded-full bg-white/20 w-fit mx-auto mb-4">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">2.5T</h3>
            <p>CO₂ Saved This Month</p>
          </Card>
          
          <Card className="p-6 text-center bg-secondary text-secondary-foreground">
            <div className="p-3 rounded-full bg-primary/20 w-fit mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">1,200+</h3>
            <p>Happy Customers</p>
          </Card>
        </div>

        {/* Interactive Map & AI Assistant */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Find Farms Near You</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our AI assistant to find exactly what you need. Tell it what produce you want, 
              and watch the map highlight matching farms in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <InteractiveMap
                farms={mockFarms}
                highlightedFarms={highlightedFarms}
                onFarmSelect={handleFarmSelect}
                searchQuery={searchQuery}
              />
            </div>
            <div className="lg:col-span-1">
              <ChatInterface
                onFarmsHighlight={handleFarmsHighlight}
                onSearchQuery={handleSearchQuery}
                selectedFarm={selectedFarm}
              />
            </div>
          </div>
        </div>

        {/* Local Farms Carousel */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Featured Local Farms</h2>
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