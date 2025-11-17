import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  const offices = [
    {
      country: "Canada",
      badge: "Head Office",
      city: "Toronto",
      address: "120 Adelaide Street West, Suite 2500",
      postal: "Toronto, Ontario M5H 1T1",
      email: "canada@primeglobefreight.com",
      phone: "+1 (416) 555-0100"
    },
    {
      country: "United Kingdom",
      city: "London",
      address: "20 St Dunstan's Hill",
      postal: "London EC3R 8HL",
      email: "uk@primeglobefreight.com",
      phone: "+44 (0)20 7123 4567"
    },
    {
      country: "Australia",
      city: "Queensland",
      address: "72 Elphinstone Street, Berserker",
      postal: "QLD 4701",
      email: "australia@primeglobefreight.com",
      phone: "+61 7 4567 8900"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="px-4 py-1.5" data-testid="badge-contact">
              <Mail className="w-3 h-3 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold" data-testid="text-contact-title">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our services? We'd love to hear from you. Reach out to any of our global offices or send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <div className="space-y-4 mb-8">
                <h2 className="text-3xl font-bold" data-testid="text-form-title">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 123-4567" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Shipping inquiry" {...field} data-testid="input-subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your shipping needs..." 
                            className="min-h-[120px]" 
                            {...field} 
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" data-testid="button-send-message">
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold" data-testid="text-info-title">Contact Information</h2>
                <p className="text-muted-foreground">
                  Reach out to us through any of our global offices. We're here to help 24/7.
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">24/7 Customer Support</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">General Inquiries</p>
                      <a href="mailto:info@primeglobefreight.com" className="text-sm text-primary hover:underline" data-testid="link-email-general">
                        info@primeglobefreight.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Emergency Hotline</p>
                      <p className="text-sm text-muted-foreground">+1 (416) 555-0199</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-offices-title">
              Our Global Offices
            </h2>
            <p className="text-lg text-muted-foreground">
              Visit us at any of our strategically located offices worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {offices.map((office, index) => (
              <Card key={index} data-testid={`card-office-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {office.badge && (
                      <Badge variant="secondary" className="text-xs">{office.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{office.country}</CardTitle>
                  <CardDescription className="space-y-3 pt-2">
                    <div>
                      <p className="font-medium text-foreground mb-1">{office.city}</p>
                      <p className="text-xs">{office.address}</p>
                      <p className="text-xs">{office.postal}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${office.email}`} className="text-xs text-primary hover:underline" data-testid={`link-email-office-${index}`}>
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">{office.phone}</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
