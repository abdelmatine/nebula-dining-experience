import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Settings, 
  PlusCircle, 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Clock,
  ChefHat,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Package,
  CheckCircle,
  XCircle,
  CalendarPlus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdminTabsProps {
  mockRecentOrders: any[];
  mockReservations: any[];
  mockMenuItems: any[];
  mockEvents: any[];
}

export default function AdminTabs({ 
  mockRecentOrders, 
  mockReservations, 
  mockMenuItems, 
  mockEvents 
}: AdminTabsProps) {
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    tags: '',
    ingredients: '',
    rating: 4.5
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'wine-tasting'
  });

  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.price || !newMenuItem.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Menu Item Added",
      description: `${newMenuItem.name} has been added to the menu.`,
    });

    setNewMenuItem({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      tags: '',
      ingredients: '',
      rating: 4.5
    });
  };

  const handleEditMenuItem = (item: any) => {
    setEditingItem(item);
    setNewMenuItem(item);
  };

  const handleUpdateMenuItem = () => {
    toast({
      title: "Menu Item Updated",
      description: `${newMenuItem.name} has been updated.`,
    });
    setEditingItem(null);
    setNewMenuItem({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      tags: '',
      ingredients: '',
      rating: 4.5
    });
  };

  const handleDeleteMenuItem = (itemId: string) => {
    toast({
      title: "Menu Item Deleted",
      description: "The menu item has been removed.",
      variant: "destructive"
    });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Event Added",
      description: `${newEvent.title} has been scheduled.`,
    });

    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'wine-tasting'
    });
  };

  const handleConfirmOrder = (orderId: string) => {
    toast({
      title: "Order Confirmed",
      description: `Order #${orderId} has been confirmed and is now being prepared.`,
    });
  };

  const handleConfirmReservation = (reservationId: string) => {
    toast({
      title: "Reservation Confirmed",
      description: `Reservation #${reservationId} has been confirmed.`,
    });
  };

  return (
    <Tabs defaultValue="dashboard" className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1 h-auto p-1">
          <TabsTrigger value="dashboard" className="text-xs md:text-sm">{t('admin.dashboard')}</TabsTrigger>
          <TabsTrigger value="menu" className="text-xs md:text-sm">{t('admin.menu')}</TabsTrigger>
          <TabsTrigger value="orders" className="text-xs md:text-sm">{t('admin.orders')}</TabsTrigger>
          <TabsTrigger value="reservations" className="text-xs md:text-sm">{t('admin.reservations')}</TabsTrigger>
          <TabsTrigger value="events" className="text-xs md:text-sm">{t('admin.events')}</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs md:text-sm">{t('admin.analytics')}</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs md:text-sm">{t('admin.settings')}</TabsTrigger>
        </TabsList>
      </motion.div>

      {/* Dashboard Overview */}
      <TabsContent value="dashboard" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Card className="dark:bg-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€2,345</div>
              <p className="text-xs text-muted-foreground">+15% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">3 pending pickup</p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Table Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Today's reservations</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dark:bg-slate-900/50">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">€{order.total}</p>
                    </div>
                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-slate-900/50">
            <CardHeader>
              <CardTitle>Today's Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReservations.slice(0, 3).map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{reservation.customer}</p>
                      <p className="text-sm text-muted-foreground">{reservation.time} - {reservation.guests} guests</p>
                    </div>
                    <Badge variant={reservation.status === 'confirmed' ? 'default' : 'outline'}>
                      {reservation.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Menu Management */}
      <TabsContent value="menu" className="space-y-6">
        <Card className="dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                  placeholder="e.g., Truffle Pasta"
                />
              </div>
              
              <div>
                <Label htmlFor="itemPrice">Price (€) *</Label>
                <Input
                  id="itemPrice"
                  type="number"
                  step="0.01"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({...newMenuItem, price: e.target.value})}
                  placeholder="24.99"
                />
              </div>
              
              <div>
                <Label htmlFor="itemCategory">Category *</Label>
                <Select value={newMenuItem.category} onValueChange={(value) => setNewMenuItem({...newMenuItem, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appetizers">Appetizers</SelectItem>
                    <SelectItem value="pasta">Pasta</SelectItem>
                    <SelectItem value="seafood">Seafood</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="bowls">Bowls</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="itemRating">Rating</Label>
                <Input
                  id="itemRating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={newMenuItem.rating}
                  onChange={(e) => setNewMenuItem({...newMenuItem, rating: parseFloat(e.target.value)})}
                  placeholder="4.5"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="itemDescription">Description</Label>
              <Textarea
                id="itemDescription"
                value={newMenuItem.description}
                onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                placeholder="Delicious description of the dish..."
              />
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={editingItem ? handleUpdateMenuItem : handleAddMenuItem} 
                className="flex-1"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {editingItem ? "Update Menu Item" : "Add Menu Item"}
              </Button>
              {editingItem && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingItem(null);
                    setNewMenuItem({
                      name: '',
                      description: '',
                      price: '',
                      category: '',
                      image: '',
                      tags: '',
                      ingredients: '',
                      rating: 4.5
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Existing Menu Items */}
        <Card className="dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle>Manage Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMenuItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-sm font-medium">€{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditMenuItem(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMenuItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Orders Management */}
      <TabsContent value="orders" className="space-y-6">
        <Card className="dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentOrders.map((order) => (
                <motion.div 
                  key={order.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-1">
                    <p className="font-semibold">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                    <p className="text-sm font-medium">€{order.total}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={order.status === 'delivered' ? 'default' : order.status === 'preparing' ? 'secondary' : 'outline'}>
                      {order.status}
                    </Badge>
                    {order.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfirmOrder(order.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Reservations Management */}
      <TabsContent value="reservations" className="space-y-6">
        <Card className="dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle>Upcoming Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReservations.map((reservation) => (
                <motion.div 
                  key={reservation.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-1">
                    <p className="font-semibold">{reservation.customer}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {reservation.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {reservation.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {reservation.guests} guests
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={reservation.status === 'confirmed' ? 'default' : 'outline'}>
                      {reservation.status}
                    </Badge>
                    {reservation.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfirmReservation(reservation.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Events Management */}
      <TabsContent value="events" className="space-y-6">
        <Card className="dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5" />
              Add New Event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventTitle">Event Title *</Label>
                <Input
                  id="eventTitle"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="e.g., Wine Tasting Event"
                />
              </div>
              
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({...newEvent, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wine-tasting">Wine Tasting</SelectItem>
                    <SelectItem value="cooking-class">Cooking Class</SelectItem>
                    <SelectItem value="live-music">Live Music</SelectItem>
                    <SelectItem value="special-dinner">Special Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="eventDate">Event Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="eventTime">Event Time *</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="eventDescription">Event Description</Label>
              <Textarea
                id="eventDescription"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Describe the event details..."
              />
            </div>
            
            <Button onClick={handleAddEvent} className="w-full">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle>Scheduled Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                    <p className="text-sm text-muted-foreground">{event.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Analytics */}
      <TabsContent value="analytics" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="dark:bg-slate-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Sales Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Truffle Pasta</span>
                  <span className="font-semibold">€1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Grilled Salmon</span>
                  <span className="font-semibold">€967</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mediterranean Bowl</span>
                  <span className="font-semibold">€834</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Reservations per Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Monday</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tuesday</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Wednesday</span>
                  <span className="font-semibold">15</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">€45,678</div>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Settings */}
      <TabsContent value="settings" className="space-y-6 mb-8">
        <Card className="dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Restaurant Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Restaurant Name</Label>
                <Input defaultValue="Monda's Restaurant" />
              </div>
              
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input defaultValue="info@mondasrestaurant.com" />
              </div>
              
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input defaultValue="+49 123 456 7890" />
              </div>
              
              <div className="space-y-2">
                <Label>Operating Hours</Label>
                <Input defaultValue="11:00 AM - 11:00 PM" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Restaurant Address</Label>
              <Textarea defaultValue="123 Gourmet Street, Berlin, Germany" />
            </div>
            
            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
