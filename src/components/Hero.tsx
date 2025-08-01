import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wine, Utensils, Crown, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";
import { useHappyHour } from "@/hooks/useHappyHour";
import heroImage from "@/assets/hero-nebula.jpg";

export const Hero = () => {
  // Set fixed target date for next wine tasting (December 31, 2024 at 7:30 PM)
  const targetDate = new Date('2024-12-31T19:30:00');
  
  const { hours, minutes, seconds } = useCountdown(targetDate);
  const { isHappyHour, happyHourInfo } = useHappyHour();
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 dark:opacity-60"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/60 to-background/40"></div>
      
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
          className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">Happy Hour Active! {happyHourInfo.discount}</span>
            <span className="text-sm opacity-90">• {happyHourInfo.timeRemaining}</span>
          </div>
        </motion.div>
      )}

      {/* Wine Tasting Event - Center Right */}
      <motion.div
        className="absolute top-1/2 right-12 md:right-20 transform -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="relative">
          {/* Clock Circle Background */}
          <motion.div 
            className="w-48 h-48 border-2 border-primary/30 rounded-full flex items-center justify-center bg-background/20 backdrop-blur-sm"
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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <Clock className="h-6 w-6 text-primary mb-2" />
            <div className="text-sm font-space-grotesk font-semibold text-primary mb-1">
              Wine Tasting
            </div>
            <div className="text-2xl font-bold text-gradient-primary mb-1">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground">
              20 seats only
            </div>
          </div>
        </div>
      </motion.div>

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
            <span className="text-foreground font-playfair font-medium text-2xl md:text-3xl lg:text-4xl tracking-wider">Restaurant</span>
          </motion.h1>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="text-xl md:text-2xl font-playfair text-muted-foreground">
              Restaurant • Bar • Vinothek
            </p>
            <p className="text-lg md:text-xl text-muted-foreground/80 mt-2 font-playfair">
              Classic Elegance • Timeless Flavors
            </p>
            <p className="text-base md:text-lg text-muted-foreground/70 mt-3 font-inter">
              Mon - Sun: 10:00 – 23:00 • Hauptstraße 347, Königswinter
            </p>
          </motion.div>
          
          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed"
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