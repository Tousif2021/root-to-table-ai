import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ChatInterface from '@/components/ChatInterface';
import FarmCard from '@/components/FarmCard';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import OrderSummary from '@/components/OrderSummary';
import { Sprout, MapPin, Leaf, Users } from 'lucide-react';
import heroImage from '@/assets/hero-produce.jpg';

const Index = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  // Mock data for demonstration
  const farms = [
    {
      name: "Anna's Organic Farm",
      distance: "12km away",
      rating: 4.9,
      specialties: ["Strawberries", "Leafy Greens", "Herbs"],
      availability: "Available today",
      sustainability: "high" as const,
      description: "Family-run organic farm specializing in pesticide-free produce. Growing fresh vegetables for over 20 years."
    },
    {
      name: "Green Valley Co-op",
      distance: "8km away", 
      rating: 4.7,
      specialties: ["Root Vegetables", "Potatoes", "Onions"],
      availability: "Available tomorrow",
      sustainability: "high" as const,
      description: "Community-supported agriculture providing fresh, local produce to families across the region."
    },
    {
      name: "Sunset Orchards",
      distance: "15km away",
      rating: 4.8,
      specialties: ["Seasonal Fruits", "Apples", "Berries"],
      availability: "Available weekends",
      sustainability: "medium" as const,
      description: "Traditional orchard focusing on heritage varieties and sustainable growing practices."
    }
  ];

  const sustainabilityData = {
    co2Saved: 12.4,
    distanceSaved: 850,
    localScore: 92,
    ecosystemImpact: "Supporting 3 local families"
  };

  const orderItems = [
    {
      id: '1',
      name: 'Strawberries',
      quantity: '2kg',
      price: 14.50,
      farm: "Anna's Farm",
      freshness: 'today' as const
    },
    {
      id: '2',
      name: 'Potatoes',
      quantity: '1kg',
      price: 4.25,
      farm: 'Green Valley Co-op',
      freshness: 'yesterday' as const
    }
  ];

  const deliveryOptions = [
    {
      type: 'pickup' as const,
      label: 'Farm Pickup',
      time: 'Today 2-6 PM',
      cost: 0,
      location: "Anna's Organic Farm"
    },
    {
      type: 'hub' as const,
      label: 'Community Hub',
      time: 'Tomorrow 10-12 PM',
      cost: 2.50,
      location: 'Downtown Farmers Market'
    },
    {
      type: 'delivery' as const,
      label: 'Home Delivery',
      time: 'Tomorrow 3-7 PM',
      cost: 8.00,
      location: 'Your address'
    }
  ];

  const handleConfirmOrder = () => {
    alert('Order confirmed! You will receive updates on your fresh produce delivery.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-4">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-full bg-primary">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                Farm to Table AI
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
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary transition-spring">
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

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Left Column - Chat and Farms */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Order with AI Assistant</h2>
              <ChatInterface />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Local Farms Near You</h2>
              <div className="space-y-4">
                {farms.map((farm, index) => (
                  <FarmCard key={index} {...farm} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sustainability and Order */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Impact</h2>
              <SustainabilityMetrics data={sustainabilityData} />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Current Order</h2>
              <OrderSummary 
                items={orderItems}
                deliveryOptions={deliveryOptions}
                selectedDelivery={selectedDelivery}
                onDeliverySelect={setSelectedDelivery}
                onConfirmOrder={handleConfirmOrder}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;