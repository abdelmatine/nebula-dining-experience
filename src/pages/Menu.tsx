import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setSelectedItem, setActiveCategory } from '@/store/menuSlice';
import { addItem } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-muted-foreground">Discover our delicious selection</p>
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
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Item Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={() => dispatch({ type: 'menu/closeDetail' })}>
          <DialogContent className="max-w-2xl">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedItem.name}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Ingredients:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.ingredients.map(ingredient => (
                          <Badge key={ingredient} variant="outline">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedItem.nutrition && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Nutrition per serving:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span>Calories: {selectedItem.nutrition.calories}</span>
                          <span>Protein: {selectedItem.nutrition.protein}g</span>
                          <span>Carbs: {selectedItem.nutrition.carbs}g</span>
                          <span>Fat: {selectedItem.nutrition.fat}g</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xl">${selectedItem.price}</span>
                      <Button onClick={() => handleAddToCart(selectedItem)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}