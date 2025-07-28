import { Navigation } from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';

const corners = [
  {
    id: 1,
    title: 'Exterior View',
    description: 'Beautiful facade with modern architecture',
    image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Main Dining Area',
    description: 'Elegant indoor dining with ambient lighting',
    image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'VIP Lounge',
    description: 'Exclusive private dining space',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Outdoor Terrace',
    description: 'Al fresco dining under the stars',
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Glass Atrium',
    description: 'Natural light streaming through our signature glass roof',
    image: 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Bar Area',
    description: 'Craft cocktails and premium wines',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop'
  }
];

export default function RestaurantCorners() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Restaurant Gallery</h1>
          <p className="text-muted-foreground text-lg">
            Explore the different spaces of our restaurant
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corners.map(corner => (
            <Card key={corner.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={corner.image}
                  alt={corner.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">{corner.title}</h3>
                <p className="text-muted-foreground">{corner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience our carefully designed spaces that blend modern aesthetics with warm hospitality. 
            Each corner of our restaurant tells a story and creates the perfect atmosphere for any occasion.
          </p>
        </div>
      </div>
    </div>
  );
}