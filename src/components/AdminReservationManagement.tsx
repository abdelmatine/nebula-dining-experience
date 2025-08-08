import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Users, Phone, Mail, Eye, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  guests: number;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'simple' | 'event';
  specialRequests?: string;
}

export const AdminReservationManagement = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const mapReservations = (rows: any[]): Reservation[] =>
    rows.map((r) => ({
      id: r.id,
      customerName: r.customer_name ?? 'Guest',
      email: r.customer_email ?? '',
      phone: r.customer_phone ?? '',
      guests: r.guests ?? 0,
      date: new Date(r.date),
      time: r.time,
      status: r.status,
      type: 'simple',
      specialRequests: r.special_requests ?? undefined,
    }));

  const loadReservations = async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select('id, customer_name, customer_email, customer_phone, guests, date, time, status, special_requests')
      .order('date', { ascending: true });
    if (error) {
      toast({ title: 'Failed to load reservations', description: error.message, variant: 'destructive' });
      return;
    }
    setReservations(mapReservations(data || []));
  };

  useEffect(() => {
    loadReservations();
    const channel = supabase
      .channel('reservations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => loadReservations())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateReservationStatus = async (reservationId: string, newStatus: Reservation['status']) => {
    const { error } = await supabase.from('reservations').update({ status: newStatus }).eq('id', reservationId);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Reservation updated', description: `Status changed to ${newStatus}.` });
      await loadReservations();
    }
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'completed': return 'bg-gray-500';
    }
  };

  const filterReservationsByStatus = (status: Reservation['status'] | 'all') => {
    return status === 'all' ? reservations : reservations.filter(reservation => reservation.status === status);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Reservations</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {(['all', 'pending', 'confirmed', 'cancelled', 'completed'] as const).map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4">
              {filterReservationsByStatus(status).map((reservation, index) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{reservation.id}</CardTitle>
                        <div className="flex items-center gap-2">
                          {reservation.type === 'event' && (
                            <Badge variant="outline">Event</Badge>
                          )}
                          <Badge className={`${getStatusColor(reservation.status)} text-white`}>
                            {reservation.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {reservation.customerName}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(reservation.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{reservation.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{reservation.guests} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{reservation.phone}</span>
                          </div>
                        </div>
                        
                        {reservation.specialRequests && (
                          <div className="text-sm">
                            <span className="font-medium">Special Requests: </span>
                            <span className="text-muted-foreground">{reservation.specialRequests}</span>
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReservation(reservation)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          
                          {reservation.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </>
                          )}
                          
                          {reservation.status === 'confirmed' && (
                            <Button
                              size="sm"
                              onClick={() => updateReservationStatus(reservation.id, 'completed')}
                            >
                              Mark Completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {filterReservationsByStatus(status).length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No reservations found for this status.
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Reservation Details Modal */}
      <Dialog open={!!selectedReservation} onOpenChange={() => setSelectedReservation(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reservation Details - {selectedReservation?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedReservation && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedReservation.customerName}</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedReservation.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedReservation.phone}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Reservation Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(selectedReservation.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedReservation.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedReservation.guests} guests</span>
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {selectedReservation.type === 'event' ? 'Event Reservation' : 'Simple Reservation'}
                  </div>
                </div>
              </div>
              
              {selectedReservation.specialRequests && (
                <div>
                  <h4 className="font-semibold mb-2">Special Requests</h4>
                  <p className="text-sm text-muted-foreground">{selectedReservation.specialRequests}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge className={`${getStatusColor(selectedReservation.status)} text-white`}>
                  {selectedReservation.status}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};