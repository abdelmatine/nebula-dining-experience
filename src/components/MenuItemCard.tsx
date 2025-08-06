import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    tags: string[];
    ingredients: string[];
    nutrition?: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  onClick: (item: any) => void;
  index?: number;
}

export const MenuItemCard = ({ item, onClick, index = 0 }: MenuItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => onClick(item)}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl dark:bg-slate-900/50">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-playfair text-xl font-semibold group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <span className="text-xl font-bold text-primary">${item.price}</span>
          </div>
          
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => {
                const rating = 4.8;
                const filled = i < Math.floor(rating);
                const halfFilled = i === Math.floor(rating) && rating % 1 !== 0;
                
                return (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 transition-colors ${
                      filled 
                        ? "fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" 
                        : halfFilled 
                        ? "fill-yellow-400/50 text-yellow-400 dark:fill-yellow-500/50 dark:text-yellow-500" 
                        : "fill-none text-muted-foreground"
                    }`} 
                  />
                );
              })}
              <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};