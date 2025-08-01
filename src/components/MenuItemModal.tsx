import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/hooks/redux";
import { addItem } from "@/store/cartSlice";
import { closeDetail } from "@/store/menuSlice";
import { MenuItem } from "@/store/menuSlice";
import { X, Plus, Star } from "lucide-react";

interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
}

export const MenuItemModal = ({ item, isOpen }: MenuItemModalProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (item) {
      dispatch(addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      }));
    }
  };

  const handleClose = () => {
    dispatch(closeDetail());
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-alex-brush">{item.name}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional images placeholder */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  <img
                    src={item.image}
                    alt={`${item.name} view ${i}`}
                    className="w-full h-full object-cover opacity-60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground text-lg mb-4">{item.description}</p>
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground">(4.8) • 124 reviews</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="font-semibold mb-2">Ingredients</h4>
              <p className="text-muted-foreground capitalize">
                {item.ingredients.join(', ')}
              </p>
            </div>

            {/* Nutrition */}
            {item.nutrition && (
              <div>
                <h4 className="font-semibold mb-3">Nutritional Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="font-medium">Calories</div>
                    <div className="text-lg font-bold text-primary">{item.nutrition.calories}</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="font-medium">Protein</div>
                    <div className="text-lg font-bold text-primary">{item.nutrition.protein}g</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="font-medium">Carbs</div>
                    <div className="text-lg font-bold text-primary">{item.nutrition.carbs}g</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="font-medium">Fat</div>
                    <div className="text-lg font-bold text-primary">{item.nutrition.fat}g</div>
                  </div>
                </div>
              </div>
            )}

            {/* Allergen Info */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Allergen Information</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Contains gluten, dairy. May contain traces of nuts. Please inform staff of any allergies.
              </p>
            </div>

            {/* Price and Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold">${item.price}</span>
                <div className="text-sm text-muted-foreground">
                  Preparation time: 15-20 min
                </div>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};