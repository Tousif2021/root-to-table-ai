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
  thumbnail?: string;
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
    <Card className="p-6 space-y-6 bg-card shadow-soft border border-border">
      <div>
        <h3 className="font-semibold text-xl text-foreground mb-4">Order Summary</h3>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center gap-4">
                {/* Product Thumbnail */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-lg flex items-center justify-center border border-green-200 dark:border-green-700">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <Package className="w-6 h-6 text-green-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{item.quantity} {item.name}</span>
                    <Badge 
                      className={`${getFreshnessColor(item.freshness)} text-xs px-2 py-1`}
                      variant="secondary"
                    >
                      {item.freshness === 'today' ? 'Fresh Today' : 
                       item.freshness === 'yesterday' ? 'Yesterday' : 'Fresh'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">from {item.farm}</p>
                </div>
                
                <span className="font-semibold text-lg text-foreground">${item.price.toFixed(2)}</span>
              </div>
              {index < items.length - 1 && (
                <div className="mt-4 border-b border-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Package className="w-4 h-4" />
          Delivery Options
        </h4>
        
        <div className="space-y-3">
          {deliveryOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => onDeliverySelect(option)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-medium relative overflow-hidden ${
                selectedDelivery?.type === option.type
                  ? 'border-primary bg-gradient-to-r from-primary/5 to-green-500/5 shadow-glow ring-1 ring-primary/20'
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              {selectedDelivery?.type === option.type && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
              
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${selectedDelivery?.type === option.type ? 'bg-primary/20' : 'bg-muted'}`}>
                      <MapPin className={`w-4 h-4 ${selectedDelivery?.type === option.type ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <span className="font-semibold text-foreground">{option.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{option.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{option.location}</p>
                </div>
                <div className={`px-3 py-1 rounded-full font-medium text-sm ${
                  option.cost === 0 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {option.cost === 0 ? 'Free' : `$${option.cost.toFixed(2)}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Totals Section */}
      <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery:</span>
          <span className="text-foreground font-medium">
            {deliveryCost === 0 ? 'Free' : `$${deliveryCost.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-foreground">Total:</span>
            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Premium Confirm Button */}
      <Button 
        onClick={onConfirmOrder}
        disabled={!selectedDelivery}
        className="w-full h-14 bg-gradient-to-r from-primary to-green-600 hover:from-primary-glow hover:to-green-500 text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        size="lg"
      >
        🔒 Confirm Order Securely →
      </Button>
    </Card>
  );
};

export default OrderSummary;