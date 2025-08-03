import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wine, Utensils, Crown, Clock, Sparkles, Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";
import { useHappyHour } from "@/hooks/useHappyHour";
import heroImage from "@/assets/hero-nebula.jpg";

export const Hero = () => {
  // Calculate next Saturday at 9 PM
  const getNextSaturday9PM = () => {
    const now = new Date();
    const nextSaturday = new Date();
    const daysUntilSaturday = (6 - now.getDay()) % 7;
    
    if (daysUntilSaturday === 0 && now.getHours() >= 21) {
      // If it's Saturday after 9 PM, get next Saturday
      nextSaturday.setDate(now.getDate() + 7);
    } else {
      nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    }
    
    nextSaturday.setHours(21, 0, 0, 0);
    return nextSaturday;
  };

  const [targetDate, setTargetDate] = useState(getNextSaturday9PM());
  const [showEventModal, setShowEventModal] = useState(false);
  const { hours, minutes, seconds } = useCountdown(targetDate);
  const { isHappyHour, happyHourInfo } = useHappyHour();

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetDate(getNextSaturday9PM());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 dark:opacity-60"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/70 to-background/50 dark:from-background/80 dark:via-background/60 dark:to-background/40"></div>
      
      {/* Floating Elements - Top Right */}
      <motion.div 
        className="absolute top-24 right-20 text-primary/40"
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Wine size={40} />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 right-40 text-accent/30"
        animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Utensils size={32} />
      </motion.div>
      
      <motion.div 
        className="absolute top-28 right-56 text-primary/20"
        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Crown size={28} />
      </motion.div>

      {/* Happy Hour Banner - Top Center */}
      {isHappyHour && (
        <motion.div
          className="absolute top-28 md:top-32 left-1/2 transform -translate-x-1/2 z-20 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 shadow-lg text-sm md:text-base">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-semibold">Happy Hour Active! {happyHourInfo.discount}</span>
            <span className="text-xs md:text-sm opacity-90 hidden sm:inline">• {happyHourInfo.timeRemaining}</span>
          </div>
        </motion.div>
      )}

      {/* Next Event - Center Right */}
      <motion.div
        className="absolute top-1/3 md:top-1/2 right-4 md:right-12 lg:right-20 transform -translate-y-1/2 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => setShowEventModal(true)}
      >
        <div className="relative">
          {/* Clock Circle Background */}
          <motion.div 
            className="w-32 h-32 md:w-48 md:h-48 border-2 border-primary/30 rounded-full flex items-center justify-center bg-background/20 backdrop-blur-sm hover:bg-background/30 transition-colors"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Clock markers */}
            <div className="absolute inset-4 border border-primary/20 rounded-full"></div>
            <div className="absolute top-2 left-1/2 w-0.5 h-6 bg-primary/40 transform -translate-x-1/2"></div>
            <div className="absolute bottom-2 left-1/2 w-0.5 h-6 bg-primary/40 transform -translate-x-1/2"></div>
            <div className="absolute left-2 top-1/2 h-0.5 w-6 bg-primary/40 transform -translate-y-1/2"></div>
            <div className="absolute right-2 top-1/2 h-0.5 w-6 bg-primary/40 transform -translate-y-1/2"></div>
          </motion.div>
          
          {/* Event Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 md:p-4">
            <Clock className="h-4 w-4 md:h-6 md:w-6 text-primary mb-1 md:mb-2" />
            <div className="text-xs md:text-sm font-space-grotesk font-semibold text-primary mb-1">
              Next Event
            </div>
            <div className="text-lg md:text-2xl font-bold text-gradient-primary mb-1">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground">
              Click for details
            </div>
          </div>
        </div>
      </motion.div>

      {/* Event Details Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-alex-brush text-center text-gradient-primary">
              Wine Tasting Experience
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wine className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Premium Wine Selection</h3>
              <p className="text-muted-foreground">
                Join us for an exclusive wine tasting featuring carefully selected premium wines from renowned vineyards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Every Saturday</p>
                  <p className="text-sm text-muted-foreground">9:00 PM - 11:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Private Tasting Room</p>
                  <p className="text-sm text-muted-foreground">Hauptstraße 347, Königswinter</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Limited Seating</p>
                  <p className="text-sm text-muted-foreground">20 seats only - Reservation required</p>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold">€45 per person</p>
              <p className="text-sm text-muted-foreground">
                Includes 5 wine tastings, artisan cheese selection, and expert sommelier guidance
              </p>
              
              <Button className="w-full" asChild>
                <Link to="/reservations">
                  Reserve Your Spot
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Decorative Elements - Background */}
      <motion.div 
        className="absolute top-1/3 left-1/3 text-primary/5"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-64 h-64 border border-primary/10 rounded-full flex items-center justify-center">
          <div className="w-32 h-32 border border-primary/5 rounded-full"></div>
        </div>
      </motion.div>

      {/* Main Content - Bottom Left */}
      <div className="relative z-10 px-4 md:px-6 pb-24 md:pb-32 pl-6 md:pl-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-left"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-alex-brush mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span className="text-gradient-primary text-6xl md:text-8xl lg:text-9xl">Monda's</span>
            <br />
            
          </motion.h1>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="text-xl md:text-2xl font-playfair text-foreground dark:text-muted-foreground">
              Restaurant • Bar • Vinothek
            </p>
            <p className="text-lg md:text-xl text-foreground/90 dark:text-muted-foreground/80 mt-2 font-playfair">
              Classic Elegance • Timeless Flavors
            </p>
            <p className="text-base md:text-lg text-foreground/80 dark:text-muted-foreground/70 mt-3 font-inter">
              Mon - Sun: 10:00 – 23:00 • Hauptstraße 347, Königswinter
            </p>
          </motion.div>
          
          <motion.p
            className="text-lg text-foreground/80 dark:text-muted-foreground mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Experience authentic cuisine in an elegant atmosphere where tradition meets excellence. 
            A timeless destination for refined dining and exceptional wines.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Button 
              variant="default" 
              size="lg" 
              className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover-scale font-playfair"
              asChild
            >
              <Link to="/menu">
                Explore Menu
                <Utensils className="ml-2" size={20} />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover-scale border-primary/30 hover:bg-primary/10 font-playfair"
              asChild
            >
              <Link to="/reservations">
                Book a Table
                <Wine className="ml-2" size={20} />
              </Link>
            </Button>
          </motion.div>
          
        </motion.div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};