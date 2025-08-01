import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { SimpleMap } from "@/components/SimpleMap";

const locations = [
  {
    id: 1,
    name: "Monda's Restaurant",
    address: "Hauptstraße 347, 53639 Königswinter, Germany",
    phone: "+49 (0) 2223 123-456",
    hours: "Mon - Sun: 10:00 – 23:00",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    mapUrl: "https://maps.google.com/?q=Hauptstraße+347+53639+Königswinter+Germany"
  }
];

export default function Locations() {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-4">
              Our <span className="text-gradient-nebula">Locations</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visit any of our elegant locations for an unforgettable dining experience
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 gap-8 mb-16 max-w-2xl mx-auto">
            {locations.map((location) => (
              <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-space-grotesk">{location.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{location.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{location.phone}</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{location.hours}</span>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => window.open(location.mapUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Map
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/reservations">Make Reservation</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Map Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Find Us on the Map</h2>
            <SimpleMap />
          </div>
        </div>
      </div>
    </div>
  );
}