import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Plus } from "lucide-react";

const dishes = [
  {
    id: 1,
    name: "Quantum Wagyu",
    description: "Molecularly enhanced A5 wagyu with holographic seasoning",
    price: "$89",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    rating: 4.9,
    isSignature: true
  },
  {
    id: 2,
    name: "Nebula Sashimi",
    description: "Color-changing tuna with edible aurora effects",
    price: "$76",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    rating: 4.8,
    isSignature: true
  },
  {
    id: 3,
    name: "Cosmic Risotto",
    description: "Levitating grains with stardust truffle foam",
    price: "$54",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    rating: 4.7,
    isSignature: false
  }
];

export const FeaturedDishes = () => {
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
          <h2 className="text-5xl font-space-grotesk font-bold mb-6">
            <span className="text-gradient-nebula">Featured</span> Experiences
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our signature dishes crafted with ingredients from across the galaxy
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
              <Card className="glass border-white/20 overflow-hidden hover-scale transition-all duration-300">
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
                    <Star className="text-yellow-400 fill-current mr-1" size={14} />
                    <span className="text-sm font-medium">{dish.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-2xl font-space-grotesk font-bold mb-2 group-hover:text-gradient-primary transition-all">
                    {dish.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {dish.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gradient-nebula">
                      {dish.price}
                    </span>
                    <Button 
                      variant="glass" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
          <Button variant="nebula" size="lg" className="px-8 py-4">
            View Full Menu
          </Button>
        </motion.div>
      </div>
    </section>
  );
};