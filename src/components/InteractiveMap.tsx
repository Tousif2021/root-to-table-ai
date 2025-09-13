import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Leaf, Star } from 'lucide-react';

export interface Farm {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  distance: string;
  rating: number;
  produce: Array<{
    type: string;
    price: number;
    unit: string;
    available: boolean;
    organic: boolean;
  }>;
  ecoScore: number;
  pickupTimes: string[];
  deliveryAvailable: boolean;
}

interface InteractiveMapProps {
  farms: Farm[];
  highlightedFarms?: string[];
  onFarmSelect: (farm: Farm) => void;
  searchQuery?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  farms,
  highlightedFarms = [],
  onFarmSelect,
  searchQuery
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    // Initialize map
    mapboxgl.accessToken = apiKey;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [18.0686, 59.3293], // Stockholm coordinates
      zoom: 10,
    });

    // Add farm markers
    farms.forEach((farm) => {
      if (!map.current) return;

      const isHighlighted = highlightedFarms.includes(farm.id);
      
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = `w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isHighlighted 
          ? 'bg-primary shadow-glow scale-110' 
          : 'bg-secondary hover:bg-accent'
      }`;
      markerElement.innerHTML = `<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>`;

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([farm.location.lng, farm.location.lat])
        .addTo(map.current);

      // Add click handler
      markerElement.addEventListener('click', () => {
        setSelectedFarm(farm);
        onFarmSelect(farm);
      });
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [farms, highlightedFarms, apiKey, onFarmSelect]);

  if (showApiInput) {
    return (
      <Card className="p-6 text-center bg-card shadow-soft">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <h3 className="font-semibold">Setup Interactive Map</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            To display the interactive farm map, please enter your Mapbox public token.
            You can get one free at{' '}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              mapbox.com
            </a>
          </p>
          <div className="max-w-md mx-auto space-y-2">
            <Input
              placeholder="Paste your Mapbox public token here..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="text-center"
            />
            <button
              onClick={() => setShowApiInput(false)}
              disabled={!apiKey.trim()}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-glow transition-smooth disabled:opacity-50"
            >
              Load Map
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-soft">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {selectedFarm && (
        <Card className="absolute top-4 left-4 p-4 bg-card shadow-glow max-w-sm">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground">{selectedFarm.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{selectedFarm.distance}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{selectedFarm.rating}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Available Produce:</h4>
              <div className="space-y-1">
                {selectedFarm.produce.filter(p => p.available).slice(0, 3).map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1">
                      {item.type}
                      {item.organic && <Leaf className="w-3 h-3 text-accent" />}
                    </span>
                    <span className="font-medium">{item.price} SEK/{item.unit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Eco Score: {selectedFarm.ecoScore}/10
              </Badge>
              {selectedFarm.deliveryAvailable && (
                <Badge variant="outline">Delivery Available</Badge>
              )}
            </div>
          </div>
        </Card>
      )}
      
      {searchQuery && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-primary-foreground">
            Searching: {searchQuery}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;