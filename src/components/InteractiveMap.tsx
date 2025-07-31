import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from 'lucide-react';

// Restaurant locations
const locations = [
  {
    id: 1,
    name: "Monda's Downtown",
    coordinates: [-74.006, 40.7128], // NYC
    address: "123 Main St, New York, NY 10001",
    phone: "(555) 123-4567"
  },
  {
    id: 2,
    name: "Monda's Uptown", 
    coordinates: [-74.0059, 40.7589], // NYC Uptown
    address: "456 Park Ave, New York, NY 10016",
    phone: "(555) 987-6543"
  },
  {
    id: 3,
    name: "Monda's Brooklyn",
    coordinates: [-73.9442, 40.6782], // Brooklyn
    address: "789 Brooklyn St, Brooklyn, NY 11201", 
    phone: "(555) 456-7890"
  }
];

export const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // Center on NYC
      zoom: 11,
      pitch: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each location
    locations.forEach(location => {
      const marker = new mapboxgl.Marker({
        color: '#8B5CF6', // Primary color
        scale: 1.2
      })
        .setLngLat(location.coordinates as [number, number])
        .addTo(map.current!);

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-3">
            <h3 class="font-bold text-lg mb-2">${location.name}</h3>
            <p class="text-sm text-gray-600 mb-1">${location.address}</p>
            <p class="text-sm text-gray-600">${location.phone}</p>
          </div>
        `);

      marker.setPopup(popup);
    });

    setIsMapReady(true);
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex flex-col items-center justify-center p-8">
        <MapPin className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-4">Interactive Map</h3>
        <p className="text-muted-foreground text-center mb-4">
          Enter your Mapbox token to view our restaurant locations on an interactive map
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter Mapbox Public Token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={initializeMap} disabled={!mapboxToken}>
            Load Map
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Get your token at{' '}
          <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            mapbox.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      {!isMapReady && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};