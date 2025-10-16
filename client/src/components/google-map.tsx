import { useEffect, useRef } from "react";

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  markers?: Array<{
    position: { lat: number; lng: number };
    title?: string;
    icon?: string;
  }>;
  zoom?: number;
  height?: string;
}

export function GoogleMap({ 
  center = { lat: 40.7128, lng: -74.0060 }, 
  markers = [], 
  zoom = 12,
  height = "400px" 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!window.google) {
        console.error("Google Maps API not loaded");
        return;
      }

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current!, {
          center,
          zoom,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b7280" }],
            },
          ],
        });
      }

      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      markers.forEach(({ position, title, icon }) => {
        const marker = new google.maps.Marker({
          position,
          map: mapInstanceRef.current!,
          title,
          icon: icon || undefined,
        });
        markersRef.current.push(marker);
      });

      if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.position));
        mapInstanceRef.current!.fitBounds(bounds);
      } else {
        mapInstanceRef.current!.setCenter(center);
        mapInstanceRef.current!.setZoom(zoom);
      }
    };

    if (window.google) {
      initMap();
    } else {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'DEMO_KEY';
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => console.error("Failed to load Google Maps");
      document.head.appendChild(script);
    }
  }, [center, markers, zoom]);

  return <div ref={mapRef} style={{ width: "100%", height }} className="rounded-lg" />;
}
