import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import FarmerChat from '@/components/FarmerChat';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import OrderSummary from '@/components/OrderSummary';
import { ArrowLeft, MapPin, Star, Leaf, CheckCircle } from 'lucide-react';

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
      {/* Breadcrumb Navigation */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1 text-primary hover:text-primary-glow transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Farms
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-medium">
                  {farmData.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content - Premium 2-Column Layout */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Farm Info, Chat, and Impact */}
          <div className="space-y-8">
            {/* About This Farm - Enhanced */}
            <Card className="overflow-hidden shadow-medium">
              {/* Farm Photo Banner */}
              <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        {farmData.name}
                        <CheckCircle className="w-6 h-6 text-green-300" />
                      </h2>
                      <div className="flex items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{farmData.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{farmData.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      <Leaf className="w-3 h-3 mr-1" />
                      Verified Organic ✅
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">{farmData.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="font-medium text-foreground min-w-[80px]">Specialties:</span>
                    <div className="flex flex-wrap gap-2">
                      {farmData.specialties.map((specialty, index) => (
                        <Badge key={index} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground min-w-[80px]">Status:</span>
                    <Badge className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200">
                      🟢 {farmData.availability}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Chat with Farmer - Replace AI Assistant */}
            <FarmerChat 
              farmerName="Anna Thompson" 
              farmName={farmData.name}
              farmerAvatar="/placeholder.svg" 
            />
          </div>

          {/* Right Column - Impact and Order Summary */}
          <div className="space-y-8">
            {/* Your Impact - Enhanced 2x2 Grid */}
            <SustainabilityMetrics data={sustainabilityData} />
            
            {/* Order Summary - Premium Checkout */}
            <OrderSummary 
              items={orderItems}
              deliveryOptions={deliveryOptions}
              selectedDelivery={selectedDelivery}
              onDeliverySelect={setSelectedDelivery}
              onConfirmOrder={handleConfirmOrder}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default FarmOrder;