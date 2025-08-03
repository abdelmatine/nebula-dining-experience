import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    tags: '',
    ingredients: ''
  });
  
  const { toast } = useToast();

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
      ingredients: ''
    });
  };

  const mockStats = {
    totalOrders: 1234,
    revenue: 45678,
    reservations: 89,
    customers: 567
  };

  const mockRecentOrders = [
    { id: '1', customer: 'John Doe', items: 'Mediterranean Bowl, Truffle Pasta', total: 41.98, status: 'delivered' },
    { id: '2', customer: 'Jane Smith', items: 'Grilled Salmon', total: 28.99, status: 'preparing' },
    { id: '3', customer: 'Mike Johnson', items: 'Truffle Pasta x2', total: 49.98, status: 'pending' },
  ];

  const mockReservations = [
    { id: '1', customer: 'Sarah Wilson', date: '2024-03-15', time: '19:00', guests: 4, status: 'confirmed' },
    { id: '2', customer: 'Tom Brown', date: '2024-03-15', time: '20:30', guests: 2, status: 'pending' },
    { id: '3', customer: 'Lisa Davis', date: '2024-03-16', time: '18:00', guests: 6, status: 'confirmed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 px-6 max-w-7xl mx-auto animate-fade-in mb-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-alex-brush text-gradient-primary mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground font-playfair">
            Manage Monda's Restaurant
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="dark:bg-slate-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="dark:bg-slate-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{mockStats.revenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="dark:bg-slate-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reservations</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.reservations}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="dark:bg-slate-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.customers}</div>
                <p className="text-xs text-muted-foreground">Active this month</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
            
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
                  Add New Menu Item
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
                    <Label htmlFor="itemImage">Image URL</Label>
                    <Input
                      id="itemImage"
                      value={newMenuItem.image}
                      onChange={(e) => setNewMenuItem({...newMenuItem, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemTags">Tags (comma separated)</Label>
                    <Input
                      id="itemTags"
                      value={newMenuItem.tags}
                      onChange={(e) => setNewMenuItem({...newMenuItem, tags: e.target.value})}
                      placeholder="vegan, spicy, signature"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="itemIngredients">Ingredients (comma separated)</Label>
                    <Input
                      id="itemIngredients"
                      value={newMenuItem.ingredients}
                      onChange={(e) => setNewMenuItem({...newMenuItem, ingredients: e.target.value})}
                      placeholder="pasta, truffle, parmesan"
                    />
                  </div>
                </div>
                
                <Button onClick={handleAddMenuItem} className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Menu Item
                </Button>
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
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-sm font-medium">€{order.total}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={order.status === 'delivered' ? 'default' : order.status === 'preparing' ? 'secondary' : 'outline'}>
                          {order.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
                    <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Sales</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€15,234</div>
                  <p className="text-xs text-muted-foreground">+22% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Popular Dish</CardTitle>
                  <ChefHat className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">Truffle Pasta</div>
                  <p className="text-xs text-muted-foreground">45 orders this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Based on 127 reviews</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">7:00 - 9:00 PM</div>
                  <p className="text-xs text-muted-foreground">Busiest time today</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Sales chart would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Restaurant Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Restaurant Name</Label>
                    <Input defaultValue="Monda's" />
                  </div>
                  <div>
                    <Label>Opening Hours</Label>
                    <Input defaultValue="Mon - Sun: 10:00 – 23:00" />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input defaultValue="info@mondas.com" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input defaultValue="+49 2223 123456" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Address</Label>
                    <Textarea defaultValue="Hauptstraße 347, Königswinter 53639" />
                  </div>
                  <div>
                    <Label>Delivery Radius (km)</Label>
                    <Input type="number" defaultValue="15" />
                  </div>
                  <div>
                    <Label>Delivery Fee (€)</Label>
                    <Input type="number" step="0.01" defaultValue="3.50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}