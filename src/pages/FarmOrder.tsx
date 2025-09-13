import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ChatInterface from '@/components/ChatInterface';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import OrderSummary from '@/components/OrderSummary';
import { ArrowLeft, MapPin, Star, Leaf } from 'lucide-react';

const FarmOrder = () => {
  const { farmName } = useParams<{ farmName: string }>();
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  // Mock farm data - in real app, this would come from API
  const farmData = {
    name: farmName?.replace('-', ' ') || "Anna's Organic Farm",
    distance: "12km away",
    rating: 4.9,
    specialties: ["Strawberries", "Leafy Greens", "Herbs"],
    availability: "Available today",
    sustainability: "high" as const,
    description: "Family-run organic farm specializing in pesticide-free produce. Growing fresh vegetables for over 20 years."
  };

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
      farm: farmData.name,
      freshness: 'today' as const
    },
    {
      id: '2',
      name: 'Potatoes',
      quantity: '1kg',
      price: 4.25,
      farm: farmData.name,
      freshness: 'yesterday' as const
    }
  ];

  const deliveryOptions = [
    {
      type: 'pickup' as const,
      label: 'Farm Pickup',
      time: 'Today 2-6 PM',
      cost: 0,
      location: farmData.name
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

  const getSustainabilityColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-primary text-primary-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Farms
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Order from {farmData.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{farmData.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span>{farmData.rating}</span>
                </div>
                <Badge className={getSustainabilityColor(farmData.sustainability)}>
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco+
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Left Column - Farm Info and Chat */}
          <div className="space-y-8">
            {/* Farm Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-foreground">About This Farm</h2>
              <p className="text-muted-foreground mb-4">{farmData.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-foreground">Specialties:</span>
                  <div className="flex flex-wrap gap-1">
                    {farmData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-foreground">Availability:</span>
                  <span className="text-muted-foreground ml-2">{farmData.availability}</span>
                </div>
              </div>
            </Card>

            {/* AI Chat Interface */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Order with AI Assistant</h2>
              <ChatInterface />
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
    </main>
  );
};

export default FarmOrder;