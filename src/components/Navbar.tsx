import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Tractor, ShoppingCart, User, Sprout } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Farms', path: '/farms', icon: Tractor },
    { name: 'Cart', path: '/cart', icon: ShoppingCart },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-full bg-primary group-hover:bg-primary-glow transition-smooth">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ROOTED</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={active ? "secondary" : "ghost"}
                  className={`transition-smooth ${active ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent/50'}`}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                    {item.name === 'Cart' && (
                      <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground">
                        0
                      </Badge>
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Button
                  key={item.name}
                  asChild
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 p-2 ${active ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <Link to={item.path}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{item.name}</span>
                    {item.name === 'Cart' && (
                      <Badge variant="secondary" className="absolute -top-1 -right-1 bg-primary text-primary-foreground min-w-5 h-5 text-xs">
                        0
                      </Badge>
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;