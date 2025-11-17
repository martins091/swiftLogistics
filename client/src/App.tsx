import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthProvider, useAuth } from "@/lib/auth-context";

import Landing from "@/pages/landing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Orders from "@/pages/orders";
import Drivers from "@/pages/drivers";
import Vehicles from "@/pages/vehicles";
import Analytics from "@/pages/analytics";
import Track from "@/pages/track";
import DriverDashboard from "@/pages/driver-dashboard";
import DriverLocation from "@/pages/driver-location";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component, allowedRoles }: { component: React.ComponentType; allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Redirect to="/track" />;
  }

  return <Component />;
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (!user || user.role === "customer") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 p-4 border-b sticky top-0 bg-background z-10">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/services" component={Services} />
      
      {/* Auth Pages */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Protected Admin Routes */}
      <Route path="/dashboard">
        <AuthenticatedLayout>
          <ProtectedRoute component={Dashboard} allowedRoles={["admin"]} />
        </AuthenticatedLayout>
      </Route>
      
      <Route path="/orders">
        <AuthenticatedLayout>
          <ProtectedRoute component={Orders} allowedRoles={["admin"]} />
        </AuthenticatedLayout>
      </Route>
      
      <Route path="/drivers">
        <AuthenticatedLayout>
          <ProtectedRoute component={Drivers} allowedRoles={["admin"]} />
        </AuthenticatedLayout>
      </Route>
      
      <Route path="/vehicles">
        <AuthenticatedLayout>
          <ProtectedRoute component={Vehicles} allowedRoles={["admin"]} />
        </AuthenticatedLayout>
      </Route>
      
      <Route path="/analytics">
        <AuthenticatedLayout>
          <ProtectedRoute component={Analytics} allowedRoles={["admin"]} />
        </AuthenticatedLayout>
      </Route>
      
      {/* Protected Driver Routes */}
      <Route path="/driver-dashboard">
        <AuthenticatedLayout>
          <ProtectedRoute component={DriverDashboard} allowedRoles={["driver"]} />
        </AuthenticatedLayout>
      </Route>
      
      <Route path="/driver-location">
        <AuthenticatedLayout>
          <ProtectedRoute component={DriverLocation} allowedRoles={["driver"]} />
        </AuthenticatedLayout>
      </Route>
      
      {/* Protected Customer Routes */}
      <Route path="/track">
        <AuthenticatedLayout>
          <ProtectedRoute component={Track} />
        </AuthenticatedLayout>
      </Route>
      
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
