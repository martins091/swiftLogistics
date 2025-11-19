import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { 
  Plane, 
  Ship, 
  Truck, 
  Package, 
  Globe, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowRight,
  MapPin,
  TrendingUp
} from "lucide-react";
import heroImage from "@assets/stock_images/logistics_freight_ca_8dd1d306.jpg";

export default function Landing() {
  const services = [
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast and reliable air transportation for time-sensitive shipments across continents."
    },
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective ocean shipping solutions for large-scale international cargo."
    },
    {
      icon: Truck,
      title: "Land Transport",
      description: "Efficient ground transportation and door-to-door delivery services."
    },
    {
      icon: Package,
      title: "Warehousing",
      description: "Secure storage facilities and distribution centers for your inventory."
    },
    {
      icon: Globe,
      title: "Customs Clearance",
      description: "Smooth handling of all import/export documentation and compliance."
    },
    {
      icon: Shield,
      title: "Logistics Consulting",
      description: "Expert strategies to optimize your supply chain operations."
    }
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Network",
      description: "Offices in Canada, UK, and Australia serving worldwide destinations"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service and shipment tracking"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Industry-leading security protocols for your valuable cargo"
    },
    {
      icon: TrendingUp,
      title: "Advanced Technology",
      description: "Real-time tracking and cutting-edge logistics management"
    }
  ];

  const stats = [
    { value: "50+", label: "Countries Served" },
    { value: "10K+", label: "Shipments Delivered" },
    { value: "98%", label: "On-Time Delivery" },
    { value: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="px-4 py-1.5 bg-background/20 backdrop-blur-sm border-white/30 text-white" data-testid="badge-tagline">
              <Globe className="w-3 h-3 mr-2" />
              Global Logistics Excellence
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white" data-testid="text-hero-title">
              Your Trusted Partner in{" "}
              <span className="text-primary">Global Freight</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-description">
              At Prime Globe Freight, we redefine logistics with innovation, reliability, and customer-focused excellence. 
              Seamless freight solutions across Europe, North America, and Australia.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="default" className="w-full sm:w-auto bg-primary border-primary-border" data-testid="button-get-quote">
                  Get a Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/track">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/20 backdrop-blur-sm border-white/30 text-white" data-testid="button-track-shipment">
                  Track Shipment
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center" data-testid={`card-stat-${index}`}>
                <CardContent className="pt-6">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-services-title">
              Comprehensive Logistics Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From air to sea, we provide end-to-end freight forwarding services tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover-elevate" data-testid={`card-service-${index}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg" data-testid="button-view-all-services">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-features-title">
              Why Choose Prime Globe Freight?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with personalized service to deliver excellence at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center space-y-3" data-testid={`feature-${index}`}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-values-title">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Integrity", description: "We operate with honesty and transparency, ensuring every transaction and partnership is built on trust." },
                { title: "Excellence", description: "We continuously strive for operational excellence and innovation in every service we provide." },
                { title: "Reliability", description: "Our clients count on us for timely, secure, and efficient freight delivery — every time." },
                { title: "Customer Focus", description: "We listen, adapt, and deliver solutions that align perfectly with your logistics goals." },
                { title: "Global Reach", description: "Our extensive international network allows us to move your shipments across continents with ease and confidence." }
              ].map((value, index) => (
                <Card key={index} data-testid={`card-value-${index}`}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-offices-title">
              Global Presence, Local Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategically located offices connecting industries and streamlining trade worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                country: "Canada",
                badge: "Head Office",
                city: "Toronto",
                address: "120 Adelaide Street West, Suite 2500",
                postal: "Toronto, Ontario M5H 1T1"
              },
              {
                country: "United Kingdom",
                city: "London",
                address: "20 St Dunstan's Hill",
                postal: "London EC3R 8HL"
              },
              {
                country: "Australia",
                city: "Queensland",
                address: "72 Elphinstone Street, Berserker",
                postal: "QLD 4701"
              }
            ].map((office, index) => (
              <Card key={index} data-testid={`card-office-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {office.badge && (
                      <Badge variant="secondary" className="text-xs">{office.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{office.country}</CardTitle>
                  <CardDescription className="space-y-1">
                    <p className="font-medium text-foreground">{office.city}</p>
                    <p>{office.address}</p>
                    <p>{office.postal}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-cta-title">
              Ready to Ship with Confidence?
            </h2>
            <p className="text-lg opacity-90">
              Join thousands of businesses that trust Prime Globe Freight for their international logistics needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" data-testid="button-contact-us">
                  Contact Us Today
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-create-account">
                  Create an Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
