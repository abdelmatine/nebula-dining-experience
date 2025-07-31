import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Wine, Crown } from "lucide-react";

const reasons = [
  {
    icon: ChefHat,
    title: "Premium Ingredients",
    description: "Sourced from the finest local farms and international suppliers, ensuring peak flavor and freshness.",
    bgColor: "from-amber-500/20 to-orange-600/20"
  },
  {
    icon: Wine,
    title: "Masterful Cooking", 
    description: "Our expert chefs use traditional techniques combined with modern precision to achieve perfection in every dish.",
    bgColor: "from-red-500/20 to-rose-600/20"
  },
  {
    icon: Crown,
    title: "Elegant Ambiance",
    description: "Dine in a sophisticated atmosphere with warm lighting and classic décor that creates the perfect dining experience.",
    bgColor: "from-yellow-500/20 to-amber-600/20"
  }
];

export const WhyNebula = () => {
  return (
    <section className="py-20 px-6 relative parallax">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-space-grotesk font-bold mb-6">
            Why Choose <span className="text-gradient-nebula">Monda's</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just a restaurant—we're a destination for authentic culinary excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -20, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <Card className="glass border-white/20 h-full group hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className={`mb-6 mx-auto w-20 h-20 bg-gradient-to-br ${reason.bgColor} rounded-2xl flex items-center justify-center shadow-lg border border-primary/20`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <reason.icon size={40} className="text-primary" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-space-grotesk font-bold mb-4 group-hover:text-gradient-primary transition-all">
                    {reason.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};