import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setSelectedItem, setActiveCategory } from '@/store/menuSlice';
import { addItem } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { MenuItemModal } from '@/components/MenuItemModal';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Star } from 'lucide-react';
export default function Menu() {
  const dispatch = useAppDispatch();
  const { items, selectedItem, isDetailOpen, activeCategory } = useAppSelector(state => state.menu);
  
  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleItemClick = (item: any) => {
    dispatch(setSelectedItem(item));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 px-6 max-w-7xl mx-auto animate-fade-in">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-alex-brush text-gradient-primary mb-4">
            <span className="text-white font-bold">Our</span> Menu
          </h1>
          <p className="text-xl text-muted-foreground font-playfair">Discover our delicious selection</p>
        </motion.div>

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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filteredItems.map((item, index) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onClick={handleItemClick}
              index={index}
            />
          ))}
        </motion.div>

        {/* Item Detail Modal */}
        <MenuItemModal 
          item={selectedItem} 
          isOpen={isDetailOpen} 
        />
      </div>
    </div>
  );
}