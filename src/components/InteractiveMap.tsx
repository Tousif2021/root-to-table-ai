import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Leaf, Star, Search, X } from 'lucide-react';
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
  const markersRef = useRef<Map<string, { marker: mapboxgl.Marker; popup: mapboxgl.Popup; element: HTMLElement }>>(new Map());
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [highlightedFarms, setHighlightedFarms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Farm[]>([]);
  const [apiKey] = useState('pk.eyJ1IjoidG91c2lmMTIiLCJhIjoiY21maWZ0cmpoMGN5cTJqc2x2d2cwN2ZoOSJ9.z3_sa3Le-SWQp0kSIUWt9Q');
  const navigate = useNavigate();

  const handleFarmSelect = (farm: Farm) => {
    setSelectedFarm(farm);
    navigate(`/order/${encodeURIComponent(farm.name)}`);
  };

  // Debounced search function
  const debouncedSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setHighlightedFarms([]);
      setSearchResults([]);
      setSearchQuery('');
      
      // Show all markers
      markersRef.current.forEach(({ marker, element }) => {
        element.style.display = 'flex';
      });
      
      return;
    }

    const matchingFarms = farms.filter(farm => 
      farm.produce.some(produce => 
        produce.available && 
        produce.type.toLowerCase().includes(query.toLowerCase())
      ) || farm.name.toLowerCase().includes(query.toLowerCase())
    );

    setHighlightedFarms(matchingFarms.map(farm => farm.id));
    setSearchResults(matchingFarms);
    setSearchQuery(query);

    // Hide/show markers based on search
    markersRef.current.forEach(({ marker, element }, farmId) => {
      const isMatching = matchingFarms.some(farm => farm.id === farmId);
      element.style.display = isMatching ? 'flex' : 'none';
    });

    // Focus map on search results
    if (matchingFarms.length > 0 && map.current) {
      if (matchingFarms.length === 1) {
        // Single farm: center and zoom
        const farm = matchingFarms[0];
        map.current.flyTo({
          center: [farm.coordinates[0], farm.coordinates[1]],
          zoom: 14,
          duration: 1000
        });
      } else {
        // Multiple farms: fit bounds
        const coordinates = matchingFarms.map(farm => farm.coordinates);
        const bounds = new mapboxgl.LngLatBounds();
        coordinates.forEach(coord => bounds.extend(coord as [number, number]));
        
        map.current.fitBounds(bounds, {
          padding: 50,
          duration: 1000
        });
      }
    }
  }, [farms]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setHighlightedFarms([]);
    setSearchResults([]);
    
    // Show all markers
    markersRef.current.forEach(({ marker, element }) => {
      element.style.display = 'flex';
    });

    // Reset map view
    if (map.current) {
      map.current.flyTo({
        center: [18.0686, 59.3293],
        zoom: 10,
        duration: 1000
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [18.0686, 59.3293],
      zoom: 10,
    });

    // Clear existing markers
    markersRef.current.clear();

    // Add farm markers with enhanced tooltips
    farms.forEach((farm) => {
      if (!map.current) return;

      const isHighlighted = highlightedFarms.includes(farm.id);
      const isVisible = searchQuery === '' || searchResults.some(result => result.id === farm.id);
      
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = `w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isHighlighted 
          ? 'bg-green-600 shadow-glow scale-110' 
          : 'bg-green-500 hover:bg-green-600'
      }`;
      markerElement.style.display = isVisible ? 'flex' : 'none';
      markerElement.innerHTML = `<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>`;

      // Create enhanced popup
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: 'bottom',
        offset: [0, -10]
      }).setHTML(`
        <div class="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px]">
          <div class="font-semibold text-foreground mb-1">${farm.name}</div>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="font-medium">${farm.rating}/5</span>
            </div>
            <span>•</span>
            <span>${farm.distance}</span>
          </div>
          <div class="text-xs text-muted-foreground mt-1">Click to view details</div>
        </div>
      `);

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([farm.coordinates[0], farm.coordinates[1]])
        .addTo(map.current);

      // Store marker reference
      markersRef.current.set(farm.id, { marker, popup, element: markerElement });

      // Add hover events for popup
      markerElement.addEventListener('mouseenter', () => {
        popup.setLngLat([farm.coordinates[0], farm.coordinates[1]]).addTo(map.current!);
      });

      markerElement.addEventListener('mouseleave', () => {
        popup.remove();
      });

      // Add click handler
      markerElement.addEventListener('click', () => {
        handleFarmSelect(farm);
      });
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      markersRef.current.forEach(({ popup }) => popup.remove());
      markersRef.current.clear();
      map.current?.remove();
    };
  }, [farms, highlightedFarms, searchQuery, searchResults]);

  // Map is always shown since we have the API key hardcoded

  return (
    <div className="relative w-full h-[700px] rounded-lg overflow-hidden shadow-soft">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Enhanced Search Bar - Wider with Better Styling */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-transparent backdrop-blur-sm border-4 border-black rounded-full px-8 py-3 shadow-glow min-w-[700px]">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for produce (e.g. strawberries, carrots...) or farm name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-lg py-2 flex-1"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="w-8 h-8 p-0 hover:bg-muted rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Search Results Summary */}
          {highlightedFarms.length > 0 && (
            <div className="mt-3 text-sm text-muted-foreground text-center">
              Found {highlightedFarms.length} farm{highlightedFarms.length !== 1 ? 's' : ''} with matching results
            </div>
          )}
          
          {/* No Results State */}
          {searchQuery && highlightedFarms.length === 0 && (
            <div className="mt-3 text-sm text-muted-foreground text-center">
              No farms found matching "{searchQuery}"
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
          <Badge className="bg-primary text-primary-foreground shadow-soft">
            Searching: {searchQuery}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;