import { MapPin } from 'lucide-react';

export const SimpleMap = () => {
  const address = "Hauptstraße 347, 53639 Königswinter, Germany";
  const encodedAddress = encodeURIComponent(address);
  
  return (
    <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-lg border">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dw901SwHHqfeaM&q=${encodedAddress}&zoom=15`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Monda's Restaurant Location"
        className="w-full h-full"
      />
      
      {/* Fallback for when maps don't load */}
      <div className="absolute inset-0 bg-muted rounded-lg hidden map-fallback">
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <MapPin className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Find Us Here</h3>
          <p className="text-muted-foreground mb-4">{address}</p>
          <a 
            href={`https://maps.google.com/?q=${encodedAddress}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
};