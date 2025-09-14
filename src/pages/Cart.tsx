import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Truck, MapPin, Clock, Leaf, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderConfirmation from '@/components/OrderConfirmation';

interface DeliveryOption {
  type: 'pickup' | 'hub' | 'delivery';
  label: string;
  time: string;
  cost: number;
  location: string;
  farmName?: string;
}

const Cart: React.FC = () => {
  const { cartItems, totalItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  // Group items by farm
  const itemsByFarm = cartItems.reduce((acc, item) => {
    if (!acc[item.farmName]) {
      acc[item.farmName] = [];
    }
    acc[item.farmName].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  // Generate delivery options for all farms
  const deliveryOptions: DeliveryOption[] = [
    {
      type: 'pickup',
      label: 'Farm Pickup',
      time: 'Today 2-6 PM',
      cost: 0,
      location: 'Multiple Farms'
    },
    {
      type: 'hub',
      label: 'Community Hub',
      time: 'Tomorrow 10-12 PM',
      cost: 25,
      location: 'Downtown Farmers Market'
    },
    {
      type: 'delivery',
      label: 'Home Delivery',
      time: 'Tomorrow 3-7 PM',
      cost: 85,
      location: 'Your address'
    }
  ];

  const deliveryCost = selectedDelivery ? selectedDelivery.cost : 0;
  const finalTotal = totalAmount + deliveryCost;

  const getDeliveryIcon = (type: string) => {
    switch (type) {
      case 'pickup': return <MapPin className="w-4 h-4" />;
      case 'hub': return <Truck className="w-4 h-4" />;
      case 'delivery': return <Truck className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    setShowOrderConfirmation(true);
  };

  const handleOrderConfirmationClose = () => {
    setShowOrderConfirmation(false);
    clearCart();
    setSelectedDelivery(null);
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Link 
              to="/farms" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
          </div>

          <Card className="shadow-medium">
            <CardContent className="p-8 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Discover fresh, local produce from our verified farms
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/farms">Browse Farms</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/farms" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Your Cart ({totalItems} items)</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(itemsByFarm).map(([farmName, items]) => (
              <motion.div
                key={farmName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Card className="shadow-medium">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-primary" />
                      {farmName}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{item.name}</span>
                            {item.organic && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                <Leaf className="w-3 h-3 mr-1" />
                                Organic
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.price} SEK per {item.unit}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => 
                                item.quantity === 1 
                                  ? removeFromCart(item.id)
                                  : updateQuantity(item.id, item.quantity - 1)
                              }
                              className="h-8 w-8 p-0 hover:bg-background"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 min-w-[40px] text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 hover:bg-background"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right min-w-[80px]">
                            <div className="font-semibold text-foreground">
                              {(item.price * item.quantity).toFixed(0)} SEK
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-medium sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Delivery Options */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Delivery Method</h4>
                  <div className="space-y-2">
                    {deliveryOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDelivery(option)}
                        className={`w-full p-3 rounded-lg border text-left transition-smooth ${
                          selectedDelivery?.type === option.type
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getDeliveryIcon(option.type)}
                            <div>
                              <div className="font-medium text-foreground">{option.label}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {option.time}
                              </div>
                              <div className="text-sm text-muted-foreground">{option.location}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-foreground">
                              {option.cost === 0 ? 'Free' : `${option.cost} SEK`}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="text-foreground">{totalAmount.toFixed(0)} SEK</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span className="text-foreground">
                      {deliveryCost === 0 ? 'Free' : `${deliveryCost} SEK`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-foreground">Total:</span>
                    <span className="text-foreground">{finalTotal.toFixed(0)} SEK</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={!selectedDelivery}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                {!selectedDelivery && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please select a delivery method to continue
                  </p>
                )}

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full"
                  size="sm"
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <OrderConfirmation
        isOpen={showOrderConfirmation}
        onClose={handleOrderConfirmationClose}
        cartItems={cartItems}
        farmName="Multiple Farms"
        farmDistance={5}
        deliveryOption={selectedDelivery}
      />
    </main>
  );
};

export default Cart;