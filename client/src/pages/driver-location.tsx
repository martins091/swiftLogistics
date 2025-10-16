import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Driver } from "@shared/schema";
import { GoogleMap } from "@/components/google-map";

export default function DriverLocation() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const { data: drivers } = useQuery<Driver[]>({
    queryKey: ["/api/drivers"],
  });

  const driver = drivers?.find(d => d.userId === user?.id);

  const updateLocationMutation = useMutation({
    mutationFn: async (location: { lat: number; lng: number }) => {
      if (!driver) throw new Error("Driver not found");
      return apiRequest("PATCH", `/api/drivers/${driver.id}/location`, location);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/drivers"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating location",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    let watchId: number;

    if (isTracking && "geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          updateLocationMutation.mutate(location);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Location error",
            description: "Could not get your location. Please check permissions.",
            variant: "destructive",
          });
          setIsTracking(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking, driver]);

  const handleStartTracking = () => {
    if ("geolocation" in navigator) {
      setIsTracking(true);
      toast({
        title: "Location tracking started",
        description: "Your location is now being shared with customers.",
      });
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location tracking.",
        variant: "destructive",
      });
    }
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    toast({
      title: "Location tracking stopped",
      description: "Your location is no longer being shared.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Location Tracking</h1>
        <p className="text-muted-foreground mt-2">
          Share your live location with customers during deliveries
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tracking Status</CardTitle>
          <CardDescription>
            {isTracking
              ? "Your location is being shared in real-time"
              : "Start tracking to share your location with customers"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {isTracking ? (
              <Button
                variant="destructive"
                onClick={handleStopTracking}
                data-testid="button-stop-tracking"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Stop Tracking
              </Button>
            ) : (
              <Button
                onClick={handleStartTracking}
                data-testid="button-start-tracking"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Start Tracking
              </Button>
            )}
            {isTracking && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating location...</span>
              </div>
            )}
          </div>

          {currentLocation && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm font-medium mb-1">Current Coordinates</p>
              <p className="text-xs text-muted-foreground font-mono">
                Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {currentLocation && (
        <Card>
          <CardHeader>
            <CardTitle>Your Current Location</CardTitle>
            <CardDescription>This is what customers see on the map</CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleMap
              center={currentLocation}
              markers={[
                {
                  position: currentLocation,
                  title: "Your Location",
                },
              ]}
              zoom={15}
              height="500px"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
