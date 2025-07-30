import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket, ChefHat } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 starfield opacity-30"></div>
      
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 text-primary/30"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles size={32} />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 right-16 text-secondary/40"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Rocket size={28} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 left-20 text-cta/30"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <ChefHat size={36} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-space-grotesk font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span className="text-gradient-nebula">Monda's</span>{" "}
            <span className="text-foreground">Restaurant</span>
          </motion.h1>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="text-2xl md:text-3xl font-space-grotesk text-muted-foreground typewriter">
              Classic Elegance • Timeless Flavors
            </p>
          </motion.div>
          
          <motion.p
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Experience authentic cuisine in an elegant atmosphere where tradition meets excellence. 
            A timeless destination for refined dining.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
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
                <Sparkles className="ml-2" size={20} />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold hover-scale"
              asChild
            >
              <Link to="/reservations">
                Book a Table
                <Rocket className="ml-2" size={20} />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Wine Tasting Event */}
        <motion.div
          className="mt-20 glass p-6 rounded-2xl max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-primary font-space-grotesk font-semibold mb-2">
            Next Wine Tasting Event
          </div>
          <div className="text-3xl font-bold text-gradient-primary">
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Limited to 20 seats
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};