import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Package } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: string;
  price: number;
  farm: string;
  freshness: 'today' | 'yesterday' | 'fresh';
}

interface DeliveryOption {
  type: 'pickup' | 'delivery' | 'hub';
  label: string;
  time: string;
  cost: number;
  location: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  deliveryOptions: DeliveryOption[];
  selectedDelivery?: DeliveryOption;
  onDeliverySelect: (option: DeliveryOption) => void;
  onConfirmOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  deliveryOptions,
  selectedDelivery,
  onDeliverySelect,
  onConfirmOrder
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const deliveryCost = selectedDelivery?.cost || 0;
  const total = subtotal + deliveryCost;

  const getFreshnessColor = (freshness: string) => {
    switch (freshness) {
      case 'today':
        return 'bg-primary text-primary-foreground';
      case 'yesterday':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="p-4 space-y-4 bg-card shadow-soft">
      <div>
        <h3 className="font-semibold text-lg text-foreground mb-2">Order Summary</h3>
        
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{item.quantity} {item.name}</span>
                  <Badge 
                    className={`${getFreshnessColor(item.freshness)} text-xs`}
                    variant="secondary"
                  >
                    {item.freshness === 'today' ? 'Fresh Today' : 
                     item.freshness === 'yesterday' ? 'Yesterday' : 'Fresh'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">from {item.farm}</p>
              </div>
              <span className="font-medium text-foreground">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Package className="w-4 h-4" />
          Delivery Options
        </h4>
        
        <div className="space-y-2">
          {deliveryOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => onDeliverySelect(option)}
              className={`p-3 rounded-lg border cursor-pointer transition-smooth hover:shadow-soft ${
                selectedDelivery?.type === option.type
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{option.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{option.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{option.location}</p>
                </div>
                <span className="font-medium text-foreground">
                  {option.cost === 0 ? 'Free' : `$${option.cost.toFixed(2)}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery:</span>
          <span className="text-foreground">
            {deliveryCost === 0 ? 'Free' : `$${deliveryCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
          <span className="text-foreground">Total:</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button 
        onClick={onConfirmOrder}
        disabled={!selectedDelivery}
        className="w-full bg-primary hover:bg-primary-glow transition-spring"
        size="lg"
      >
        Confirm Order
      </Button>
    </Card>
  );
};

export default OrderSummary;