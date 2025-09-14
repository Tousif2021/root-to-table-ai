import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import HarvestForecastCard from './HarvestForecastCard';
import { harvestForecastData, topRequestedCrops, HarvestForecastItem } from '@/data/harvestData';

const HarvestForecast: React.FC = () => {
  const [forecastItems, setForecastItems] = useState<HarvestForecastItem[]>(harvestForecastData);

  const handleInterestClick = (itemId: string) => {
    setForecastItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, interestCount: item.interestCount + 1 }
          : item
      )
    );
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-background via-background/95 to-muted/20">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="font-baskerville text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Harvest Forecast
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Shape next season's harvest by showing interest in the produce you love.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">
              Less waste. Smarter farming. Fresher food.
            </span>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-5"></div>
          <div className="relative bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {forecastItems.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <HarvestForecastCard 
                      item={item}
                      onInterestClick={handleInterestClick}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-card border-primary/20 hover:bg-primary/10" />
              <CarouselNext className="bg-card border-primary/20 hover:bg-primary/10" />
            </Carousel>
          </div>
        </div>

        {/* Farmer Insight Preview */}
        <div className="text-center space-y-6">
          <h3 className="text-xl font-semibold text-foreground">
            Top 3 Requested Crops This Month
          </h3>
          
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {topRequestedCrops.map((crop, index) => (
              <div key={crop.name} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{crop.name}</p>
                  <p className="text-sm text-muted-foreground">{crop.requests} requests</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HarvestForecast;