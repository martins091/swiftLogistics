import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, MapPin, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import type { Order } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function DriverDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: myOrders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders/driver", user?.id],
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return apiRequest("PATCH", `/api/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders/driver"] });
      toast({
        title: "Status updated",
        description: "Order status has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getNextStatus = (currentStatus: string) => {
    const statusFlow: Record<string, string> = {
      assigned: "in-transit",
      "in-transit": "delivered",
    };
    return statusFlow[currentStatus] || null;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      assigned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "in-transit": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return colors[status] || colors.assigned;
  };

  const activeOrders = myOrders?.filter(o => o.status !== "delivered" && o.status !== "cancelled") || [];
  const completedOrders = myOrders?.filter(o => o.status === "delivered") || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Deliveries</h1>
        <p className="text-muted-foreground mt-2">
          Manage your assigned delivery orders
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{myOrders?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : activeOrders.length > 0 ? (
            <div className="space-y-4">
              {activeOrders.map((order) => {
                const nextStatus = getNextStatus(order.status);
                return (
                  <Card key={order.id} className="hover-elevate">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          {nextStatus && (
                            <Button
                              onClick={() => updateOrderMutation.mutate({ orderId: order.id, status: nextStatus })}
                              disabled={updateOrderMutation.isPending}
                              data-testid={`button-update-status-${order.id}`}
                            >
                              Mark as {nextStatus}
                            </Button>
                          )}
                        </div>
                        <div className="grid gap-3 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-muted-foreground text-xs">Pickup</p>
                              <p>{order.pickupAddress}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-muted-foreground text-xs">Delivery</p>
                              <p>{order.deliveryAddress}</p>
                            </div>
                          </div>
                        </div>
                        {order.packageDetails && (
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs font-medium mb-1">Package Details</p>
                            <p className="text-sm text-muted-foreground">{order.packageDetails}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active deliveries</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : completedOrders.length > 0 ? (
            <div className="space-y-3">
              {completedOrders.map((order) => (
                <div key={order.id} className="p-4 border rounded-lg flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Order #{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground truncate">{order.deliveryAddress}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No completed deliveries yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
