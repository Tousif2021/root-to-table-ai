import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star, Leaf } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface Farm {
  id: string;
  name: string;
  distance: string;
  rating: number;
  ecoScore: number;
  specialties: string[];
  pickupTimes: string[];
  description: string;
  imageUrl: string;
  coordinates: [number, number];
  deliveryAvailable: boolean;
  produce: Array<{
    type: string;
    price: number;
    unit: string;
    available: boolean;
    organic?: boolean;
  }>;
}

interface InteractiveMapProps {
  farms: Farm[];
  highlightedFarms?: string[];
  onFarmSelect?: (farm: Farm) => void;
  searchQuery?: string;
  onSearchQuery?: (query: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  farms, 
  highlightedFarms = [], 
  onFarmSelect,
  searchQuery = '',
  onSearchQuery
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();
  
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [internalSearchQuery, setInternalSearchQuery] = useState(searchQuery);

  const currentSearchQuery = onSearchQuery ? searchQuery : internalSearchQuery;

  // Filter farms based on search query
  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
    farm.specialties.some(specialty => 
      specialty.toLowerCase().includes(currentSearchQuery.toLowerCase())
    ) ||
    farm.produce.some(item => 
      item.type.toLowerCase().includes(currentSearchQuery.toLowerCase())
    )
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (onSearchQuery) {
      onSearchQuery(query);
    } else {
      setInternalSearchQuery(query);
    }
  };

  const handleFarmSelect = (farm: Farm) => {
    if (onFarmSelect) {
      onFarmSelect(farm);
    } else {
      navigate(`/farm/${farm.id}`);
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with a placeholder token - user needs to add their own
    mapboxgl.accessToken = 'pk.your-token-here';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [18.0686, 59.3293], // Stockholm coordinates
      zoom: 10
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add farm markers
    farms.forEach(farm => {
      const el = document.createElement('div');
      el.className = 'farm-marker';
      el.style.cssText = `
        background-color: hsl(var(--primary));
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat(farm.coordinates)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedFarm(farm);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [farms]);

  return (
    <div className="relative w-full h-[700px] rounded-2xl overflow-hidden shadow-xl">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Search Bar */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-xl">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-full px-5 py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for produce... 🍓🥔🥬"
              value={currentSearchQuery}
              onChange={handleSearchChange}
              className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-base"
            />
          </div>
          {filteredFarms.length > 0 && currentSearchQuery && (
            <div className="mt-2 text-sm text-center text-muted-foreground">
              ✅ Found <span className="font-medium">{filteredFarms.length}</span> farm{filteredFarms.length !== 1 ? 's' : ''} matching your search
            </div>
          )}
        </div>
      </div>

      {/* Selected Farm Card */}
      {selectedFarm && (
        <Card className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md p-5 bg-card/95 backdrop-blur-md shadow-2xl rounded-xl border border-border z-10">
          <div className="space-y-4">
            {/* Farm Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{selectedFarm.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedFarm.distance}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{selectedFarm.rating}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary">Eco {selectedFarm.ecoScore}/10</Badge>
            </div>

            {/* Produce List */}
            <div>
              <h4 className="text-sm font-medium mb-2">Available Produce:</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedFarm.produce.filter(p => p.available).slice(0, 4).map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm bg-muted/40 px-3 py-2 rounded-md">
                    <span className="flex items-center gap-1">
                      {item.type} {item.organic && <Leaf className="w-3 h-3 text-green-500" />}
                    </span>
                    <span className="font-medium">{item.price} SEK/{item.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              {selectedFarm.deliveryAvailable && (
                <Badge variant="outline">🚚 Delivery</Badge>
              )}
              <button
                onClick={() => handleFarmSelect(selectedFarm)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Visit Farm →
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Search Query Badge */}
      {currentSearchQuery && (
        <div className="absolute top-6 right-6 z-10">
          <Badge className="bg-primary text-primary-foreground shadow-md">
            Searching: {currentSearchQuery}
          </Badge>
        </div>
      )}

      {/* Mapbox Token Notice */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground">
          Add your Mapbox token to see the map
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;