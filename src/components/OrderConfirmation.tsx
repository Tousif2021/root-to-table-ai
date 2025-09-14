import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Leaf, Truck, Heart, Clock, TreePine } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  organic: boolean;
  farmName: string;
}

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  farmName: string;
  farmDistance: number;
  deliveryOption: {
    label: string;
    cost: number;
  } | null;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  cartItems,
  farmName,
  farmDistance,
  deliveryOption
}) => {
  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCost = deliveryOption?.cost || 0;
  const total = subtotal + deliveryCost;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate environmental impact based on actual order
  const calculateImpact = () => {
    const orderMultiplier = Math.max(0.5, totalItems / 5); // Scale based on order size
    const baseDistance = farmDistance * 2; // Round trip
    
    return {
      co2Saved: Math.round((3.2 * orderMultiplier + baseDistance * 0.1) * 10) / 10,
      distanceSaved: baseDistance,
      localSupport: subtotal,
      freshnessDays: 3 + Math.floor(orderMultiplier)
    };
  };

  const impact = calculateImpact();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="text-center space-y-6 p-6">
          {/* Success Animation */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-foreground">
              Order Placed Successfully! 🎉
            </DialogTitle>
          </DialogHeader>

          {/* Order Summary */}
          <Card className="p-6 text-left">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Order Summary
            </h3>
            
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    {item.organic && (
                      <Badge className="ml-2 bg-green-100 text-green-700 border-green-200">
                        Organic
                      </Badge>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {item.quantity} × SEK {item.price}/{item.unit}
                    </div>
                  </div>
                  <span className="font-medium">SEK {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>SEK {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{deliveryOption?.label || 'Farm Pickup'}</span>
                <span>{deliveryCost === 0 ? 'FREE' : `SEK ${deliveryCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                <span>Total</span>
                <span>SEK {total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {/* Environmental Impact */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-800">
              <TreePine className="w-5 h-5" />
              Your Environmental Impact 🌱
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-white rounded-lg border border-green-100">
                <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">{impact.co2Saved}kg</div>
                <div className="text-sm text-green-600">CO₂ Saved</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">{impact.distanceSaved}km</div>
                <div className="text-sm text-blue-600">Transport Reduced</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border border-pink-100">
                <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-pink-700">SEK {impact.localSupport.toFixed(0)}</div>
                <div className="text-sm text-pink-600">Local Support</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border border-orange-100">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-700">{impact.freshnessDays} days</div>
                <div className="text-sm text-orange-600">Fresher Produce</div>
              </div>
            </div>

            <div className="text-center text-sm text-green-700 bg-white/70 rounded-lg p-3 border border-green-200">
              🌿 <strong>Amazing!</strong> By choosing {farmName}, you're supporting local rooted farming, 
              reducing carbon footprint, and getting the freshest possible produce. Keep making a difference! 
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>📧 You'll receive a confirmation email with pickup/delivery details</p>
              <p>📱 We'll send SMS updates about your order status</p>
              <p>🚚 {deliveryOption?.label === 'Farm Pickup' 
                ? `Pick up your order at ${farmName}` 
                : `Your order will be ${deliveryOption?.label?.toLowerCase()}`}</p>
            </div>
          </Card>

          {/* Action Button */}
          <Button 
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg"
          >
            Continue Shopping 🛒
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmation;