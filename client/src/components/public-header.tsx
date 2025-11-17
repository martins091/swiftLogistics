import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export function PublicHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base leading-none">Prime Globe</span>
                <span className="text-xs text-muted-foreground leading-none">Freight</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className={isActive(link.href) ? "bg-accent" : ""}
                data-testid={`button-nav-${link.label.toLowerCase()}`}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {user ? (
              <Button asChild data-testid="button-dashboard">
                <Link href={user.role === "admin" ? "/dashboard" : user.role === "driver" ? "/driver-dashboard" : "/track"}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button asChild variant="ghost" data-testid="button-login">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild data-testid="button-signup">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className={`w-full justify-start ${isActive(link.href) ? "bg-accent" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`button-mobile-nav-${link.label.toLowerCase()}`}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            {!user && (
              <div className="flex flex-col gap-2 pt-2 sm:hidden">
                <Button asChild variant="outline" className="w-full" data-testid="button-mobile-login">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="w-full" data-testid="button-mobile-signup">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
