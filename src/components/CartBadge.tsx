import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const CartBadge: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="relative">
      <Button
        variant="ghost"
        size="default"
        className="relative p-3 hover:bg-muted/50 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow-medium"
          >
            {totalItems > 99 ? '99+' : totalItems}
          </motion.div>
        )}
      </Button>
    </Link>
  );
};

export default CartBadge;