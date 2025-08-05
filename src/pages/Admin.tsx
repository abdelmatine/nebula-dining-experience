import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign,
  Calendar,
  Users,
  Package
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AdminTabs from "@/components/AdminTabs";

export default function Admin() {
  const { t } = useLanguage();

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

  const mockMenuItems = [
    { id: '1', name: 'Truffle Pasta', category: 'pasta', price: '24.99', rating: 4.8, description: 'Rich truffle pasta with cream sauce' },
    { id: '2', name: 'Grilled Salmon', category: 'seafood', price: '28.99', rating: 4.6, description: 'Fresh grilled salmon with herbs' },
    { id: '3', name: 'Mediterranean Bowl', category: 'bowls', price: '18.99', rating: 4.7, description: 'Healthy Mediterranean bowl' },
  ];

  const mockEvents = [
    { id: '1', title: 'Wine Tasting Event', date: '2024-03-20', time: '21:00', type: 'wine-tasting', description: 'Premium wine selection' },
    { id: '2', title: 'Cooking Class', date: '2024-03-25', time: '18:00', type: 'cooking-class', description: 'Learn from our chef' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 px-6 max-w-7xl mx-auto animate-fade-in mb-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-alex-brush text-gradient-primary mb-4">
            {t('admin.title')}
          </h1>
          <p className="text-xl text-muted-foreground font-playfair">
            {t('admin.subtitle')}
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

        {/* Admin Tabs Component */}
        <AdminTabs 
          mockRecentOrders={mockRecentOrders}
          mockReservations={mockReservations}
          mockMenuItems={mockMenuItems}
          mockEvents={mockEvents}
        />
      </div>
    </div>
  );
}