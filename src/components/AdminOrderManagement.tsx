import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Clock, Package, Eye, Truck, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrderItemUI { name: string; quantity: number; price: number; }
interface Order {
  id: string;
  customerName: string;
  items: OrderItemUI[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  timestamp: Date;
  deliveryAddress?: string;
}

export const AdminOrderManagement = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const mapOrders = (rows: any[]): Order[] =>
    rows.map((o) => ({
      id: o.id,
      customerName: o.customer_name ?? 'Customer',
      items: (o.order_items ?? []).map((it: any) => ({
        name: it.menu_items?.name ?? 'Item',
        quantity: it.quantity,
        price: Number(it.price)
      })),
      total: Number(o.total_amount ?? 0),
      status: o.status,
      timestamp: new Date(o.created_at),
      deliveryAddress: o.delivery_address ?? undefined,
    }));

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`id, customer_name, status, total_amount, created_at, delivery_address,
               order_items(quantity, price, menu_items(name))`)
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Failed to load orders', description: error.message, variant: 'destructive' });
      return;
    }
    setOrders(mapOrders(data || []));
  };

  useEffect(() => {
    loadOrders();
    const channel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => loadOrders())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Order updated', description: `Status changed to ${newStatus}.` });
      await loadOrders();
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'preparing': return <Package className="h-4 w-4" />;
      case 'ready': return <Check className="h-4 w-4" />;
      case 'delivered': return <Truck className="h-4 w-4" />;
      case 'confirmed': return <Check className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-gray-500';
      case 'confirmed': return 'bg-primary';
      case 'cancelled': return 'bg-destructive';
    }
  };

  const filterOrdersByStatus = (status: Order['status'] | 'all') => {
    return status === 'all' ? orders : orders.filter(order => order.status === status);
  };
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        {(['all', 'pending', 'preparing', 'ready', 'delivered'] as const).map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4">
              {filterOrdersByStatus(status).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{order.customerName}</span>
                        <span>{order.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.name}</span>
                              <span>${(item.quantity * item.price).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            
                            {order.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                              >
                                Start Preparing
                              </Button>
                            )}
                            
                            {order.status === 'preparing' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'ready')}
                              >
                                Mark Ready
                              </Button>
                            )}
                            
                            {order.status === 'ready' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                              >
                                Mark Delivered
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {filterOrdersByStatus(status).length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No orders found for this status.
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <p className="text-sm text-muted-foreground">{selectedOrder.customerName}</p>
                {selectedOrder.deliveryAddress && (
                  <p className="text-sm text-muted-foreground">{selectedOrder.deliveryAddress}</p>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge className={`${getStatusColor(selectedOrder.status)} text-white`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </div>
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};