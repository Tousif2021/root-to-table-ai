import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Leaf, Star, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Farm } from '@/types/farm';

interface InteractiveMapProps {
  farms: Farm[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  farms
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [highlightedFarms, setHighlightedFarms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [apiKey] = useState('pk.eyJ1IjoidG91c2lmMTIiLCJhIjoiY21maWZ0cmpoMGN5cTJqc2x2d2cwN2ZoOSJ9.z3_sa3Le-SWQp0kSIUWt9Q');
  const navigate = useNavigate();

  const handleFarmSelect = (farm: Farm) => {
    setSelectedFarm(farm);
    // Navigate to farm order page
    navigate(`/order/${encodeURIComponent(farm.name)}`);
  };

  const searchFarms = (query: string) => {
    if (!query.trim()) {
      setHighlightedFarms([]);
      setSearchQuery('');
      return;
    }

    const matchingFarms = farms.filter(farm => 
      farm.produce.some(produce => 
        produce.available && 
        produce.type.toLowerCase().includes(query.toLowerCase())
      )
    );

    setHighlightedFarms(matchingFarms.map(farm => farm.id));
    setSearchQuery(query);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    searchFarms(query);
  };

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

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Filter farms based on search query
    const farmsToShow = searchQuery === '' 
      ? farms 
      : farms.filter(farm => highlightedFarms.includes(farm.id));

    // Add farm markers for filtered farms only
    farmsToShow.forEach((farm) => {
      if (!map.current) return;

      const isHighlighted = highlightedFarms.includes(farm.id);
      
      // Create custom marker element with green theming
      const markerElement = document.createElement('div');
      markerElement.className = `w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isHighlighted 
          ? 'bg-green-600 shadow-glow scale-110' 
          : 'bg-green-500 hover:bg-green-400'
      }`;
      markerElement.innerHTML = `<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>`;

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([farm.coordinates[0], farm.coordinates[1]])
        .addTo(map.current);

      // Store marker reference for cleanup
      markers.current.push(marker);

      // Add hover tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-50';
      tooltip.innerHTML = `${farm.name} • ⭐ ${farm.rating}`;
      markerElement.appendChild(tooltip);

      // Add hover listeners
      markerElement.addEventListener('mouseenter', () => {
        tooltip.classList.remove('opacity-0');
        tooltip.classList.add('opacity-100');
      });

      markerElement.addEventListener('mouseleave', () => {
        tooltip.classList.remove('opacity-100');
        tooltip.classList.add('opacity-0');
      });

      // Add click handler
      markerElement.addEventListener('click', () => {
        handleFarmSelect(farm);
      });
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      // Cleanup markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
    };
  }, [farms, highlightedFarms, searchQuery, apiKey, handleFarmSelect]);

  // Map is always shown since we have the API key hardcoded

  return (
    <div className="relative w-full h-[700px] rounded-lg overflow-hidden shadow-soft">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Search Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-card/95 backdrop-blur-sm border-2 border-green-600 rounded-full px-8 py-3 shadow-soft min-w-[400px]">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-green-600" />
            <Input
              type="text"
              placeholder="Search for produce (e.g. strawberries, carrots...)"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent border-0 h-8 py-1 focus-visible:ring-0"
            />
          </div>
          {highlightedFarms.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground text-center">
              Found {highlightedFarms.length} farm{highlightedFarms.length !== 1 ? 's' : ''} with matching produce
            </div>
          )}
        </div>
      </div>
      
      {selectedFarm && (
        <Card className="absolute top-4 left-4 p-4 bg-card shadow-glow max-w-sm z-10">
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
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-primary text-primary-foreground">
            Searching: {searchQuery}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;