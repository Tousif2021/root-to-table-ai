import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { HarvestForecastItem } from '@/data/harvestData';
import { toast } from '@/hooks/use-toast';

interface HarvestForecastCardProps {
  item: HarvestForecastItem;
  onInterestClick: (id: string) => void;
}

const HarvestForecastCard: React.FC<HarvestForecastCardProps> = ({
  item,
  onInterestClick
}) => {
  const [hasShownInterest, setHasShownInterest] = useState(false);
  const [animateCount, setAnimateCount] = useState(false);

  const handleInterestClick = () => {
    if (!hasShownInterest) {
      setHasShownInterest(true);
      setAnimateCount(true);
      onInterestClick(item.id);
      
      toast({
        title: "Interest Recorded!",
        description: `Interest sent to ${item.farmName} for ${item.name}!`,
        duration: 3000,
      });

      // Reset animation after it completes
      setTimeout(() => setAnimateCount(false), 600);
    }
  };

  return (
    <Card className="group h-full overflow-hidden bg-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-baskerville text-xl font-bold text-foreground">
              {item.name}
            </h3>
            <Badge variant="secondary" className="text-xs font-medium">
              {item.seasonalTag}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground font-medium">
            {item.season}
          </p>
          
          <p className="text-sm text-primary font-semibold">
            Grown by {item.farmName}
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className={`font-medium transition-all duration-300 ${
            animateCount ? 'text-primary scale-110' : ''
          }`}>
            {item.interestCount + (hasShownInterest ? 1 : 0)} people want this
          </span>
        </div>

        <Button 
          onClick={handleInterestClick}
          disabled={hasShownInterest}
          className={`w-full font-medium transition-all duration-300 ${
            hasShownInterest 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow'
          }`}
        >
          {hasShownInterest ? "Interest Recorded ✓" : "I'm Interested"}
        </Button>
      </div>
    </Card>
  );
};

export default HarvestForecastCard;