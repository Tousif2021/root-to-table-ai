import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Leaf, Truck, Globe, TreePine } from 'lucide-react';

interface SustainabilityData {
  co2Saved: number;
  distanceSaved: number;
  localScore: number;
  ecosystemImpact: string;
}

const SustainabilityMetrics: React.FC<{ data: SustainabilityData }> = ({ data }) => {
  return (
    <Card className="p-4 bg-gradient-subtle border-border shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Your Environmental Impact</h3>
          <p className="text-sm text-muted-foreground">Shopping local makes a difference</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">CO₂ Saved</span>
            </div>
            <span className="text-lg font-bold text-primary">{data.co2Saved}kg</span>
          </div>
          <p className="text-xs text-muted-foreground">vs imported produce</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Miles Saved</span>
            </div>
            <span className="text-lg font-bold text-accent">{data.distanceSaved}</span>
          </div>
          <p className="text-xs text-muted-foreground">transport distance</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Local Impact Score</span>
          </div>
          <div className="space-y-1">
            <Progress value={data.localScore} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Good</span>
              <span className="font-medium">{data.localScore}%</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary"></div>
            <span className="text-sm font-medium">Ecosystem Impact</span>
          </div>
          <p className="text-sm text-primary font-medium">{data.ecosystemImpact}</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-sm text-primary font-medium">
          🌱 Great choice! Your order supports {Math.floor(data.co2Saved / 2)} local farming families
        </p>
      </div>
    </Card>
  );
};

export default SustainabilityMetrics;