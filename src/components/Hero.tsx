import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wine, Utensils, Crown, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";
import heroImage from "@/assets/hero-nebula.jpg";

export const Hero = () => {
  // Set target date for next wine tasting (7 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  targetDate.setHours(19, 30, 0, 0); // 7:30 PM
  
  const { hours, minutes, seconds } = useCountdown(targetDate);
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/95 to-background/70"></div>
      
      {/* Floating Elements - Top Right */}
      <motion.div 
        className="absolute top-16 right-16 text-primary/40"
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Wine size={40} />
      </motion.div>
      
      <motion.div 
        className="absolute top-32 right-32 text-accent/30"
        animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Utensils size={32} />
      </motion.div>
      
      <motion.div 
        className="absolute top-20 right-48 text-primary/20"
        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Crown size={28} />
      </motion.div>

      {/* Decorative Elements - Center */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/10"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-96 h-96 border border-primary/20 rounded-full flex items-center justify-center">
          <div className="w-64 h-64 border border-primary/10 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 border border-primary/5 rounded-full"></div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Bottom Left */}
      <div className="relative z-10 px-6 pb-20 pl-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-left"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-space-grotesk font-bold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span className="text-gradient-primary">Monda's</span>
            <br />
            <span className="text-foreground">Restaurant</span>
          </motion.h1>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="text-xl md:text-2xl font-space-grotesk text-muted-foreground">
              Restaurant • Bar • Vinothek
            </p>
            <p className="text-lg md:text-xl text-muted-foreground/80 mt-2">
              Classic Elegance • Timeless Flavors
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
              className="px-8 py-4 text-lg font-semibold hover-scale"
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
              className="px-8 py-4 text-lg font-semibold hover-scale border-primary/30 hover:bg-primary/10"
              asChild
            >
              <Link to="/reservations">
                Book a Table
                <Wine className="ml-2" size={20} />
              </Link>
            </Button>
          </motion.div>
          
          {/* Wine Tasting Event */}
          <motion.div
            className="glass p-6 rounded-2xl max-w-sm backdrop-blur-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <div className="text-primary font-space-grotesk font-semibold">
                Next Wine Tasting Event
              </div>
            </div>
            <div className="text-2xl font-bold text-gradient-primary mb-2">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground">
              Limited to 20 seats • Premium selection
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};