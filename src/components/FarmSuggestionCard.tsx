import { Star, MapPin, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Farm } from "@/types/farm";

interface FarmSuggestionCardProps {
  farm: Farm;
  onVisitFarm: (farm: Farm) => void;
}

export const FarmSuggestionCard = ({ farm, onVisitFarm }: FarmSuggestionCardProps) => {
  return (
    <div className="bg-background border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 max-w-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-1">{farm.name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{farm.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{farm.rating}</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          Eco: {farm.ecoScore}/10
        </Badge>
      </div>

      {/* Produce */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-2">Fresh Produce:</p>
        <div className="space-y-1">
          {farm.produce.slice(0, 2).map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-foreground">{item.type}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">${item.price}/{item.unit}</span>
                {item.organic && <Badge variant="outline" className="text-xs px-1 py-0">Organic</Badge>}
              </div>
            </div>
          ))}
          {farm.produce.length > 2 && (
            <p className="text-xs text-muted-foreground">+{farm.produce.length - 2} more items</p>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Pickup available</span>
        </div>
        {farm.deliveryAvailable && (
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>Delivery</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <Button 
        size="sm" 
        className="w-full rounded-xl text-xs"
        onClick={() => onVisitFarm(farm)}
      >
        View Farm →
      </Button>
    </div>
  );
};