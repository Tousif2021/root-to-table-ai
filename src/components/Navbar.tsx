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
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Company Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-smooth">
              <Sprout className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-baskerville font-bold text-foreground tracking-wide">ROOTED</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-smooth py-2 px-1 relative group ${
                    active 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                  {item.name === 'Cart' && (
                    <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground text-xs min-w-5 h-5">
                      0
                    </Badge>
                  )}
                  {active && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
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