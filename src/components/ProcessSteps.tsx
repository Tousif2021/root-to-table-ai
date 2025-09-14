import React from 'react';
import { Search, MapPin, Truck } from 'lucide-react';

const ProcessSteps: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Find",
      description: "Search or type what you need (eg. \"Strawberries, potatoes\")",
      icon: Search
    },
    {
      number: 2,
      title: "Select", 
      description: "Pick a nearby farm on the map (See price, freshness, eco-score)",
      icon: MapPin
    },
    {
      number: 3,
      title: "Order",
      description: "Pick up or get it delivered (Fresh, local, sustainable)",
      icon: Truck
    }
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-background via-background/95 to-muted/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-12">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            How It Works
          </h2>
          
          <div className="flex justify-center items-center gap-8 lg:gap-16 flex-wrap">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="flex items-center gap-4 max-w-xs">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full text-lg font-bold shrink-0">
                    {step.number}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <p className="font-bold text-foreground text-lg">{step.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;