import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Truck, MapPin, Clock, Leaf, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, CartItem } from '@/contexts/CartContext';

interface DeliveryOption {
  type: 'pickup' | 'hub' | 'delivery';
  label: string;
  time: string;
  cost: number;
  location: string;
}

interface MiniCartProps {
  deliveryOptions: DeliveryOption[];
  onCheckout: (deliveryOption?: DeliveryOption) => void;
}

const MiniCart: React.FC<MiniCartProps> = ({
  deliveryOptions,
  onCheckout,
}) => {
  const { cartItems, totalItems, totalAmount, updateQuantity, removeFromCart } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);

  const deliveryCost = selectedDelivery ? selectedDelivery.cost : 0;
  const total = totalAmount + deliveryCost;

  const getDeliveryIcon = (type: string) => {
    switch (type) {
      case 'pickup': return <MapPin className="w-4 h-4" />;
      case 'hub': return <Truck className="w-4 h-4" />;
      case 'delivery': return <Truck className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card className="shadow-medium">
        <CardContent className="p-6 text-center">
          <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground">Add some fresh produce to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-medium">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Your Cart ({totalItems} items)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
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
              
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => 
                        item.quantity === 1 
                          ? removeFromCart(item.id)
                          : updateQuantity(item.id, item.quantity - 1)
                      }
                      className="h-7 w-7 p-0 hover:bg-background"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="px-2 py-1 min-w-[30px] text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-7 w-7 p-0 hover:bg-background"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right min-w-[60px]">
                    <div className="font-medium text-foreground">
                      {(item.price * item.quantity).toFixed(0)} SEK
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Delivery Options */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Choose Delivery Method</h4>
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

        {/* Order Summary */}
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
            <span className="text-foreground">{total.toFixed(0)} SEK</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={() => onCheckout(selectedDelivery || undefined)}
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
      </CardContent>
    </Card>
  );
};

export default MiniCart;