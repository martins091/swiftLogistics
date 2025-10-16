import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, MapPin, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Order, Driver } from "@shared/schema";
import { GoogleMap } from "@/components/google-map";

export default function Track() {
  const [orderNumber, setOrderNumber] = useState("");
  const { toast } = useToast();

  const trackOrderMutation = useMutation({
    mutationFn: async (orderNum: string) => {
      return apiRequest("GET", `/api/orders/track/${orderNum}`, undefined);
    },
    onError: (error: Error) => {
      toast({
        title: "Order not found",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleTrack = () => {
    if (!orderNumber.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter an order number",
        variant: "destructive",
      });
      return;
    }
    trackOrderMutation.mutate(orderNumber);
  };

  const order = trackOrderMutation.data as Order | undefined;

  const { data: driver } = useQuery<Partial<Driver> | null>({
    queryKey: ["/api/orders/track", order?.orderNumber, "driver"],
    enabled: !!order?.orderNumber && !!order?.driverId,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-6 w-6 text-red-600" />;
      case "in-transit":
        return <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />;
      default:
        return <Package className="h-6 w-6 text-amber-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      assigned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "in-transit": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[status] || colors.pending;
  };

  const statusSteps = [
    { key: "pending", label: "Order Placed" },
    { key: "assigned", label: "Driver Assigned" },
    { key: "in-transit", label: "In Transit" },
    { key: "delivered", label: "Delivered" },
  ];

  const getCurrentStepIndex = (status: string) => {
    const index = statusSteps.findIndex((step) => step.key === status);
    return index === -1 ? 0 : index;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-primary/10">
            <Package className="h-12 w-12 text-primary" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Track Your Order</h1>
          <p className="text-muted-foreground mt-2">
            Enter your order number to see real-time delivery status
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Enter order number (e.g., ORD-123456)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              data-testid="input-track-order"
              className="text-lg"
            />
            <Button 
              onClick={handleTrack} 
              disabled={trackOrderMutation.isPending}
              size="lg"
              data-testid="button-track-order"
            >
              <Search className="h-4 w-4 mr-2" />
              Track
            </Button>
          </div>
        </CardContent>
      </Card>

      {order && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-2xl">Order #{order.orderNumber}</CardTitle>
                  <CardDescription className="mt-2">
                    Placed on {new Date(order.createdAt!).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pickup Address</p>
                      <p className="font-medium">{order.pickupAddress}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Delivery Address</p>
                      <p className="font-medium">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {order.packageDetails && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium mb-1">Package Details</p>
                  <p className="text-sm text-muted-foreground">{order.packageDetails}</p>
                </div>
              )}

              {order.estimatedDeliveryTime && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Estimated delivery:</span>
                  <span className="font-medium">
                    {new Date(order.estimatedDeliveryTime).toLocaleString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {driver?.currentLocation && order.status !== "delivered" && order.status !== "cancelled" && (
            <Card>
              <CardHeader>
                <CardTitle>Live Driver Location</CardTitle>
                <CardDescription>Real-time tracking of your delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <GoogleMap
                  center={driver.currentLocation as { lat: number; lng: number }}
                  markers={[
                    {
                      position: driver.currentLocation as { lat: number; lng: number },
                      title: "Driver Location",
                    },
                    ...(order.deliveryLocation
                      ? [{
                          position: order.deliveryLocation as { lat: number; lng: number },
                          title: "Delivery Destination",
                        }]
                      : []),
                  ]}
                  zoom={13}
                  height="400px"
                />
              </CardContent>
            </Card>
          )}

          {order.status !== "cancelled" && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="flex justify-between mb-8">
                    {statusSteps.map((step, index) => {
                      const currentIndex = getCurrentStepIndex(order.status);
                      const isComplete = index <= currentIndex;
                      const isCurrent = index === currentIndex;

                      return (
                        <div key={step.key} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                              isComplete
                                ? "bg-primary border-primary text-primary-foreground"
                                : "bg-background border-border"
                            }`}
                          >
                            {isComplete ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                            )}
                          </div>
                          <p className={`mt-2 text-sm text-center ${isCurrent ? "font-medium" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{
                        width: `${(getCurrentStepIndex(order.status) / (statusSteps.length - 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {trackOrderMutation.isError && !order && (
        <Card className="border-destructive">
          <CardContent className="pt-6 text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="font-medium">Order not found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Please check your order number and try again
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
