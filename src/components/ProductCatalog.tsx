import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Leaf, AlertCircle } from 'lucide-react';
import { Farm } from '@/types/farm';
import { useCart, CartItem } from '@/contexts/CartContext';

interface ProductCatalogProps {
  farm: Farm;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ farm }) => {
  const { addToCart, updateQuantity, removeFromCart, getCartItemQuantity } = useCart();

  return (
    <Card className="shadow-medium">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-foreground mb-2">Available Produce</h3>
          <p className="text-muted-foreground">Fresh from {farm.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {farm.produce.map((product, index) => {
            const productId = `${farm.id}-${product.type}`;
            const cartQuantity = getCartItemQuantity(productId);

            return (
              <Card 
                key={index} 
                className={`transition-smooth hover:shadow-soft ${
                  !product.available ? 'opacity-60' : 'hover:border-primary/20'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{product.type}</h4>
                        {product.organic && (
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                            <Leaf className="w-3 h-3 mr-1" />
                            Organic
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-foreground">
                          {product.price} SEK
                        </span>
                        <span className="text-sm text-muted-foreground">per {product.unit}</span>
                      </div>
                    </div>
                    
                    {!product.available && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  {product.available && (
                    <div className="flex items-center justify-between">
                      {cartQuantity === 0 ? (
                        <Button
                          onClick={() => addToCart({
                            id: productId,
                            name: product.type,
                            price: product.price,
                            unit: product.unit,
                            organic: product.organic,
                            farmName: farm.name
                          })}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => 
                                cartQuantity === 1 
                                  ? removeFromCart(productId)
                                  : updateQuantity(productId, cartQuantity - 1)
                              }
                              className="h-8 w-8 p-0 hover:bg-muted"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 min-w-[40px] text-center text-sm font-medium">
                              {cartQuantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(productId, cartQuantity + 1)}
                              className="h-8 w-8 p-0 hover:bg-muted"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {cartQuantity} {product.unit}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCatalog;