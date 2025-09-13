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
    <Card className="p-6 bg-gradient-subtle border-border shadow-soft">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Your Impact</h3>
        <p className="text-sm text-muted-foreground">Every local purchase makes a difference</p>
      </div>

      {/* 2x2 Grid of Impact Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* CO₂ Saved - Circular Progress */}
        <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-white/60 dark:border-green-800/30">
          <div className="relative w-16 h-16 mx-auto mb-3">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted-foreground/20"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.75)}`}
                className="text-primary transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-lg font-bold text-primary">{data.co2Saved}kg</div>
          <div className="text-xs text-muted-foreground">CO₂ Saved</div>
        </div>

        {/* Miles Saved - Animated Counter */}
        <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-white/60 dark:border-green-800/30">
          <div className="w-16 h-16 mx-auto mb-3 bg-accent/20 rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6 text-accent" />
          </div>
          <div className="text-lg font-bold text-accent animate-fade-in">{data.distanceSaved}</div>
          <div className="text-xs text-muted-foreground">Miles Saved</div>
        </div>

        {/* Local Farms Supported - Badge */}
        <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-white/60 dark:border-green-800/30">
          <div className="w-16 h-16 mx-auto mb-3 bg-primary/20 rounded-full flex items-center justify-center">
            <TreePine className="w-6 h-6 text-primary" />
          </div>
          <div className="text-lg font-bold text-primary">3</div>
          <div className="text-xs text-muted-foreground">Farms Supported</div>
        </div>

        {/* Ecosystem Impact - Progress Bar */}
        <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-white/60 dark:border-green-800/30">
          <div className="w-16 h-16 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-2">
            <Progress value={data.localScore} className="h-2 bg-muted" />
            <div className="text-sm font-medium text-green-600">{data.localScore}% Impact</div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-xl border border-primary/20">
        <p className="text-sm font-medium text-primary">
          🌳 Great choice! You saved the same CO₂ as planting 2 trees
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {data.ecosystemImpact} through your local shopping
        </p>
      </div>
    </Card>
  );
};

export default SustainabilityMetrics;