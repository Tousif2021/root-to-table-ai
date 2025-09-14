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
import { useCart } from '@/contexts/CartContext';
import FarmerChat from '@/components/FarmerChat';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import ProductCatalog from '@/components/ProductCatalog';
import MiniCart from '@/components/MiniCart';
import OrderConfirmation from '@/components/OrderConfirmation';
import { ArrowLeft, MapPin, Star, Leaf, CheckCircle } from 'lucide-react';
import { mockFarms } from '@/data/farmData';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  organic: boolean;
  farmName: string;
}

const FarmOrder = () => {
  const { farmName } = useParams<{ farmName: string }>();
  const { cartItems, addToCart, updateQuantity, removeFromCart, getCartItemQuantity } = useCart();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<any>(null);

  // Find the actual farm data based on URL parameter
  const farm = mockFarms.find(f => 
    f.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === farmName
  ) || mockFarms[0]; // Default to first farm if not found

  const sustainabilityData = {
    co2Saved: 12.4,
    distanceSaved: parseInt(farm.distance.replace('km away', '')) * 2,
    localScore: farm.ecoScore * 10,
    ecosystemImpact: "Supporting local family farming"
  };

  const deliveryOptions = [
    {
      type: 'pickup' as const,
      label: 'Farm Pickup',
      time: farm.pickupTimes[0] || 'Today 2-6 PM',
      cost: 0,
      location: farm.name
    },
    {
      type: 'hub' as const,
      label: 'Community Hub',
      time: 'Tomorrow 10-12 PM',
      cost: 25,
      location: 'Downtown Farmers Market'
    },
    ...(farm.deliveryAvailable ? [{
      type: 'delivery' as const,
      label: 'Home Delivery',
      time: 'Tomorrow 3-7 PM',
      cost: 85,
      location: 'Your address'
    }] : [])
  ];

  const handleCheckout = (deliveryOption?: any) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setSelectedDeliveryOption(deliveryOption);
    setShowOrderConfirmation(true);
  };

  const handleOrderConfirmationClose = () => {
    setShowOrderConfirmation(false);
    setSelectedDeliveryOption(null);
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
                  {farm.name}
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
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={farm.imageUrl} 
                  alt={`${farm.name} farm`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      {farm.name}
                      <CheckCircle className="w-6 h-6 text-green-300" />
                    </h2>
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{farm.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{farm.rating}</span>
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
                <p className="text-muted-foreground mb-4 leading-relaxed">{farm.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="font-medium text-foreground min-w-[80px]">Specialties:</span>
                    <div className="flex flex-wrap gap-2">
                      {farm.specialties.map((specialty, index) => (
                        <Badge key={index} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground min-w-[80px]">Eco Score:</span>
                    <Badge className="bg-primary text-primary-foreground">
                      🌱 {farm.ecoScore}/10
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground min-w-[80px]">Pickup:</span>
                    <Badge className="bg-secondary text-secondary-foreground">
                      🕒 {farm.pickupTimes[0]}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Chat with Farmer */}
            <FarmerChat 
              farmerName={farm.name.split(' ')[0]} 
              farmName={farm.name}
              farmerAvatar="/placeholder.svg" 
            />
          </div>

          {/* Right Column - Product Catalog and Cart */}
          <div className="space-y-8">
            {/* Your Impact - Enhanced 2x2 Grid */}
            <SustainabilityMetrics data={sustainabilityData} />
            
            {/* Product Catalog */}
            <ProductCatalog farm={farm} />
            
            {/* Mini Cart */}
            <MiniCart
              deliveryOptions={deliveryOptions}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </section>

      {/* Order Confirmation Modal */}
      <OrderConfirmation
        isOpen={showOrderConfirmation}
        onClose={handleOrderConfirmationClose}
        cartItems={cartItems}
        farmName={farm.name}
        farmDistance={parseInt(farm.distance.replace('km away', ''))}
        deliveryOption={selectedDeliveryOption}
      />
    </main>
  );
};

export default FarmOrder;