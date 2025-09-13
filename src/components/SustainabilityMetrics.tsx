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
    <Card className="p-6 bg-card border-border shadow-medium">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Your Impact</h3>
        <p className="text-sm text-muted-foreground">Every local purchase makes a difference</p>
      </div>

      {/* 2x2 Grid of Impact Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* CO₂ Saved */}
        <div className="text-center p-4 bg-gradient-primary text-primary-foreground rounded-xl">
          <div className="w-16 h-16 mx-auto mb-3 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-lg font-bold">{data.co2Saved}kg</div>
          <div className="text-xs text-primary-foreground/80">CO₂ Saved</div>
        </div>

        {/* Distance Saved */}
        <div className="text-center p-4 bg-card border border-border rounded-xl">
          <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6 text-primary" />
          </div>
          <div className="text-lg font-bold text-foreground animate-fade-in">{data.distanceSaved}km</div>
          <div className="text-xs text-muted-foreground">Transport Saved</div>
        </div>

        {/* Local Score */}
        <div className="text-center p-4 bg-card border border-border rounded-xl">
          <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <TreePine className="w-6 h-6 text-primary" />
          </div>
          <div className="text-lg font-bold text-foreground">{data.localScore}%</div>
          <div className="text-xs text-muted-foreground">Local Score</div>
        </div>

        {/* Ecosystem Impact */}
        <div className="text-center p-4 bg-secondary/50 border border-border rounded-xl">
          <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div className="text-lg font-bold text-foreground">🌱</div>
          <div className="text-xs text-secondary-foreground">{data.ecosystemImpact}</div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-sm font-medium text-primary">
          🌳 Great choice! You're supporting sustainable local farming
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {data.ecosystemImpact} through your conscious shopping
        </p>
      </div>
    </Card>
  );
};

export default SustainabilityMetrics;