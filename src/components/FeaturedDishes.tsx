import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { addItem } from "@/store/cartSlice";
import { setSelectedItem } from "@/store/menuSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItemModal } from "@/components/MenuItemModal";
import { Star, Plus } from "lucide-react";
import { useState } from "react";

const dishes = [
  {
    id: "1",
    name: "Mediterranean Bowl",
    description: "Fresh quinoa with grilled vegetables, olives, and tahini",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    rating: 4.9,
    isSignature: true,
    category: "bowls",
    tags: ["healthy", "vegetarian"],
    ingredients: ["quinoa", "grilled vegetables", "olives", "tahini"],
    nutritionalInfo: {
      calories: 450,
      protein: 15,
      carbs: 55,
      fat: 18
    },
    allergens: ["sesame"]
  },
  {
    id: "2", 
    name: "Truffle Pasta",
    description: "Handmade pasta with black truffle and parmesan",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    rating: 4.8,
    isSignature: true,
    category: "pasta",
    tags: ["signature", "premium"],
    ingredients: ["handmade pasta", "black truffle", "parmesan"],
    nutritionalInfo: {
      calories: 680,
      protein: 22,
      carbs: 65,
      fat: 35
    },
    allergens: ["gluten", "dairy"]
  },
  {
    id: "3",
    name: "Grilled Salmon",
    description: "Atlantic salmon with herb crust and seasonal vegetables",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    rating: 4.7,
    isSignature: false,
    category: "seafood",
    tags: ["healthy", "omega-3"],
    ingredients: ["atlantic salmon", "herb crust", "seasonal vegetables"],
    nutritionalInfo: {
      calories: 520,
      protein: 42,
      carbs: 15,
      fat: 28
    },
    allergens: ["fish"]
  }
];

export const FeaturedDishes = () => {
  const dispatch = useAppDispatch();
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDishClick = (dish: any) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };
  
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-alex-brush font-bold mb-6">
            <span className="text-gradient-primary">Featured</span> Specialties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our signature dishes crafted with the finest ingredients and traditional techniques
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="glass border-white/20 overflow-hidden hover-scale transition-all duration-300 cursor-pointer" onClick={() => handleDishClick(dish)}>
                <div className="relative overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {dish.isSignature && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-sm font-semibold">
                      Signature
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="text-white fill-white mr-1" size={14} />
                    <span className="text-sm font-medium text-white">{dish.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-2xl font-playfair font-bold mb-2 group-hover:text-gradient-primary transition-all">
                    {dish.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {dish.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gradient-primary">
                      ${dish.price}
                    </span>
                    <Button 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addItem({
                          id: dish.id,
                          name: dish.name,
                          price: dish.price,
                          image: dish.image
                        }));
                      }}
                    >
                      <Plus size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/menu">
            <Button size="lg" className="px-8 py-4">
              View Full Menu
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Menu Item Modal */}
      <MenuItemModal 
        item={selectedDish} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};