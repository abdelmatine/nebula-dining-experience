import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { removeItem, updateQuantity, closeCart } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen, total } = useAppSelector(state => state.cart);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(closeCart())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart ({items.length} items)</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dispatch(removeItem(item.id))}
                          className="ml-auto text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total: ${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};