import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setSelectedItem, setActiveCategory } from '@/store/menuSlice';
import { addItem } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MenuItemModal } from '@/components/MenuItemModal';
import { Plus, Star } from 'lucide-react';
export default function Menu() {
  const dispatch = useAppDispatch();
  const { items, selectedItem, isDetailOpen, activeCategory } = useAppSelector(state => state.menu);
  
  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: any) => {
    dispatch(addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-alex-brush text-gradient-primary mb-4">Our Menu</h1>
          <p className="text-xl text-muted-foreground font-playfair">Discover our delicious selection</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => dispatch(setActiveCategory(category))}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => dispatch(setSelectedItem(item))}
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-white text-white" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">${item.price}</span>
                  <Button 
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Item Detail Modal */}
        <MenuItemModal 
          item={selectedItem} 
          isOpen={isDetailOpen} 
        />
      </div>
    </div>
  );
}