import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Users, Globe, Award, TrendingUp } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We operate with honesty and transparency, ensuring every transaction and partnership is built on trust."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We continuously strive for operational excellence and innovation in every service we provide."
    },
    {
      icon: Target,
      title: "Reliability",
      description: "Our clients count on us for timely, secure, and efficient freight delivery — every time."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "We listen, adapt, and deliver solutions that align perfectly with your logistics goals."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Our extensive international network allows us to move your shipments across continents with ease and confidence."
    }
  ];

  const milestones = [
    { year: "2015", title: "Company Founded", description: "Started with a vision to transform global logistics" },
    { year: "2017", title: "International Expansion", description: "Opened offices in UK and Australia" },
    { year: "2020", title: "Technology Integration", description: "Launched real-time tracking platform" },
    { year: "2024", title: "Industry Leader", description: "10,000+ successful shipments delivered" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="px-4 py-1.5" data-testid="badge-about">
              <Globe className="w-3 h-3 mr-2" />
              About Prime Globe Freight
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold" data-testid="text-about-title">
              Redefining Global Logistics
            </h1>
            <p className="text-lg text-muted-foreground">
              At Prime Globe Freight, we are redefining global logistics with innovation, reliability, and customer-focused excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold" data-testid="text-mission-title">Our Mission</h2>
                </div>
                <p className="text-muted-foreground">
                  To deliver seamless freight and logistics solutions that empower businesses and individuals to connect across borders with confidence. 
                  We strive to build trust and create value at every stage of the supply chain.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold" data-testid="text-vision-title">Our Vision</h2>
                </div>
                <p className="text-muted-foreground">
                  To be the world's most trusted logistics partner, recognized for innovation, reliability, and creating opportunities 
                  that connect businesses globally. We envision a future where international trade is seamless and accessible to all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-story-title">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                From humble beginnings to global presence
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                From our humble beginnings to our growing global presence, we have remained driven by one mission — to deliver 
                seamless freight and logistics solutions that empower businesses and individuals to connect across borders with confidence.
              </p>
              <p className="text-muted-foreground">
                With operations spanning Europe, North America, and Australia, Prime Globe Freight provides comprehensive transportation 
                and logistics services designed to meet the evolving demands of international trade. Our commitment to precision and 
                transparency ensures that every shipment — regardless of size or destination — receives the highest level of attention and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-values-title">Our Core Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="hover-elevate" data-testid={`card-value-${index}`}>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-milestones-title">Our Journey</h2>
              <p className="text-lg text-muted-foreground">
                Key milestones in our growth story
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6" data-testid={`milestone-${index}`}>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="font-medium text-sm text-muted-foreground mb-1">{milestone.year}</div>
                    <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8 sm:p-12 space-y-6">
                <h2 className="text-3xl font-bold text-center" data-testid="text-commitment-title">Our Commitment</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We understand that logistics is more than just moving goods; it's about building trust and creating value 
                    at every stage of the supply chain. That's why our approach combines advanced technology, strategic partnerships, 
                    and an experienced team dedicated to delivering measurable results.
                  </p>
                  <p>
                    We take pride in offering personalized solutions, ensuring that each client receives a plan tailored to their 
                    business needs — whether it's freight forwarding, customs brokerage, or full-scale logistics management.
                  </p>
                  <p>
                    At Prime Globe Freight, we go beyond transport — we create opportunities. By leveraging cutting-edge logistics 
                    technology, experienced professionals, and a customer-first philosophy, we make freight management simpler, 
                    smarter, and more secure.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
