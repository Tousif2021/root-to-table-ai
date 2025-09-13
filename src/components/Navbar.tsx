import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Store, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/farms', icon: Store },
    { name: 'Cart', path: '/cart', icon: ShoppingCart },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Name - Far Left */}
          <Link to="/" className="group">
            <span className="text-3xl font-baskerville font-black text-foreground tracking-tight hover:text-primary transition-colors duration-300">
              ROOTED
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center relative bg-background/60 backdrop-blur-xl rounded-full p-2 border border-border/30 shadow-xl"
               style={{
                 boxShadow: '0 8px 32px hsl(var(--primary) / 0.1), inset 0 1px 0 hsl(var(--background) / 0.8)'
               }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative z-10 flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-full group"
                >
                  {active && (
                    <motion.div
                      layoutId="tubelight-indicator"
                      className="absolute inset-0 bg-primary/20 backdrop-blur-sm rounded-full shadow-lg"
                      style={{
                        boxShadow: '0 0 20px hsl(var(--primary) / 0.3), inset 0 1px 0 hsl(var(--primary) / 0.2)'
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6
                      }}
                    />
                  )}
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`w-4 h-4 transition-colors ${
                      active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                    <span className={`transition-colors ${
                      active ? 'text-primary font-semibold' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {item.name}
                    </span>
                    {item.name === 'Cart' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative"
                      >
                        <Badge 
                          variant="secondary" 
                          className="ml-1 bg-primary text-primary-foreground text-xs min-w-5 h-5 shadow-md"
                        >
                          0
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>
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
        <div className="md:hidden border-t border-border/30 bg-background/60 backdrop-blur-lg">
          <div className="flex items-center justify-around py-3 mx-3 my-2 bg-background/40 rounded-2xl border border-border/30">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <motion.div
                  key={item.name}
                  className="relative flex-1 flex justify-center"
                  whileTap={{ scale: 0.9 }}
                >
                  {active && (
                    <motion.div
                      layoutId="mobile-tubelight-indicator"
                      className="absolute inset-0 bg-primary/15 rounded-xl mx-1"
                      style={{
                        boxShadow: '0 0 15px hsl(var(--primary) / 0.2)'
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6
                      }}
                    />
                  )}
                  <Link
                    to={item.path}
                    className="relative z-10 flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200"
                  >
                    <Icon className={`w-5 h-5 transition-colors ${
                      active ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-xs transition-colors ${
                      active ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}>
                      {item.name}
                    </span>
                    {item.name === 'Cart' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-primary text-primary-foreground min-w-5 h-5 text-xs shadow-lg"
                        >
                          0
                        </Badge>
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;