import { motion } from "framer-motion";
import { Home, ShoppingBag, User, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Shop", path: "/farms", icon: Store },
    { name: "Cart", path: "/cart", icon: ShoppingBag },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold tracking-tight text-primary">
            ROOTED
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-muted/50 backdrop-blur-sm rounded-full p-1 border shadow-lg">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative px-6 py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary/20 backdrop-blur-sm rounded-full shadow-lg border border-primary/30"
                      style={{
                        boxShadow: "0 0 20px hsl(var(--primary) / 0.3), inset 0 1px 0 hsl(var(--primary) / 0.1)",
                      }}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-1 bg-muted/50 backdrop-blur-sm rounded-full p-1 border shadow-lg">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative p-2 transition-colors hover:text-primary"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-navbar-indicator"
                      className="absolute inset-0 bg-primary/20 backdrop-blur-sm rounded-full shadow-lg border border-primary/30"
                      style={{
                        boxShadow: "0 0 15px hsl(var(--primary) / 0.3), inset 0 1px 0 hsl(var(--primary) / 0.1)",
                      }}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className={`h-5 w-5 relative z-10 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;