import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Plane, 
  Ship, 
  Truck, 
  Package, 
  Globe, 
  Shield,
  FileText,
  Warehouse,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast and reliable air transportation for time-sensitive shipments across continents.",
      features: [
        "Express delivery options",
        "Temperature-controlled cargo",
        "Door-to-airport service",
        "Real-time flight tracking"
      ]
    },
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective ocean shipping solutions for large-scale international cargo.",
      features: [
        "Full Container Load (FCL)",
        "Less than Container Load (LCL)",
        "Roll-on/Roll-off services",
        "Port-to-port delivery"
      ]
    },
    {
      icon: Truck,
      title: "Land Transport",
      description: "Efficient ground transportation and door-to-door delivery services.",
      features: [
        "Cross-border trucking",
        "Last-mile delivery",
        "Dedicated fleet options",
        "GPS-enabled tracking"
      ]
    },
    {
      icon: FileText,
      title: "Customs Clearance",
      description: "Smooth, compliant handling of all import/export documentation.",
      features: [
        "Duty and tax calculation",
        "Documentation preparation",
        "Regulatory compliance",
        "Customs consulting"
      ]
    },
    {
      icon: Warehouse,
      title: "Warehousing & Distribution",
      description: "Secure storage facilities and efficient global delivery services.",
      features: [
        "Climate-controlled storage",
        "Inventory management",
        "Pick and pack services",
        "Distribution centers"
      ]
    },
    {
      icon: MapPin,
      title: "Door-to-Door Delivery",
      description: "End-to-end shipment solutions from pickup to final destination.",
      features: [
        "Complete logistics coverage",
        "Single point of contact",
        "Transparent pricing",
        "Delivery confirmation"
      ]
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description: "Comprehensive protection for your valuable shipments.",
      features: [
        "All-risk coverage",
        "Competitive premiums",
        "Claims assistance",
        "Global coverage"
      ]
    },
    {
      icon: Globe,
      title: "Logistics Consulting",
      description: "Tailored strategies to streamline your supply chain operations.",
      features: [
        "Supply chain optimization",
        "Cost reduction strategies",
        "Route planning",
        "Technology integration"
      ]
    }
  ];

  const advantages = [
    {
      icon: Clock,
      title: "Fast & Reliable",
      description: "98% on-time delivery rate with expedited options available"
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "Industry-leading security protocols for your cargo"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Coverage across 50+ countries on 6 continents"
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "ISO-certified processes and quality management"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="px-4 py-1.5" data-testid="badge-services">
              <Package className="w-3 h-3 mr-2" />
              Our Services
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold" data-testid="text-services-title">
              Comprehensive Logistics Solutions
            </h1>
            <p className="text-lg text-muted-foreground">
              From air to sea, we provide end-to-end freight forwarding services designed to meet your specific transport needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover-elevate" data-testid={`card-service-${index}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-advantages-title">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with Prime Globe Freight's commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="text-center space-y-3" data-testid={`advantage-${index}`}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{advantage.title}</h3>
                  <p className="text-sm text-muted-foreground">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-coverage-title">
                Global Service Coverage
              </h2>
              <p className="text-lg text-muted-foreground">
                We operate across major trade routes and markets worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  region: "North America",
                  countries: ["United States", "Canada", "Mexico", "Caribbean"]
                },
                {
                  region: "Europe",
                  countries: ["United Kingdom", "Germany", "France", "Netherlands"]
                },
                {
                  region: "Asia Pacific",
                  countries: ["Australia", "China", "Japan", "Singapore"]
                }
              ].map((region, index) => (
                <Card key={index} data-testid={`card-region-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{region.region}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {region.countries.map((country, countryIndex) => (
                        <li key={countryIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-primary" />
                          {country}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-cta-title">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90">
              Contact us today for a personalized quote and discover how we can optimize your logistics operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" data-testid="button-get-quote">
                  Get a Quote
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
