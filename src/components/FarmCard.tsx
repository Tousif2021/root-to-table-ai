import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Leaf, Clock } from 'lucide-react';

interface FarmProps {
  name: string;
  distance: string;
  rating: number;
  specialties: string[];
  availability: string;
  sustainability: 'high' | 'medium' | 'low';
  imageUrl?: string;
  description: string;
}

const FarmCard: React.FC<FarmProps> = ({
  name,
  distance,
  rating,
  specialties,
  availability,
  sustainability,
  description
}) => {
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
    <Card className="p-4 hover:shadow-glow transition-spring bg-card border-border">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{distance}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
        <Badge 
          className={`${getSustainabilityColor(sustainability)} transition-smooth`}
          variant="secondary"
        >
          <Leaf className="w-3 h-3 mr-1" />
          {sustainability === 'high' ? 'Eco+' : sustainability === 'medium' ? 'Eco' : 'Standard'}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{description}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-foreground">{availability}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default FarmCard;