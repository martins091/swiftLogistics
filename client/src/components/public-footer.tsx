import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import logoUrl from "@assets/prime-globe-freight-logo.png";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoUrl} alt="Prime Globe Freight" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              Redefining global logistics with innovation, reliability, and customer-focused excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" data-testid="link-footer-about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" data-testid="link-footer-services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="link-footer-contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track" data-testid="link-footer-track" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Track Shipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">International Freight Forwarding</li>
              <li className="text-sm text-muted-foreground">Customs Clearance</li>
              <li className="text-sm text-muted-foreground">Warehousing & Distribution</li>
              <li className="text-sm text-muted-foreground">Door-to-Door Delivery</li>
              <li className="text-sm text-muted-foreground">Logistics Consulting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Canada (Head Office)</p>
                  <p>120 Adelaide Street West, Suite 2500</p>
                  <p>Toronto, Ontario M5H 1T1</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <a href="mailto:info@primeglobefreight.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-email">
                  info@primeglobefreight.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+1 (416) 555-0100</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Prime Globe Freight. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
