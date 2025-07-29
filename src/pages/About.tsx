import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Award, Heart, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: ChefHat, label: "Expert Chefs", value: "15+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Heart, label: "Happy Customers", value: "10K+" },
    { icon: Clock, label: "Years Experience", value: "8+" },
  ];

  const team = [
    {
      name: "Marco Rodriguez",
      role: "Head Chef",
      description: "Michelin-starred chef with 15 years of experience in modern cuisine.",
      image: "https://images.unsplash.com/photo-1583394293214-28a5cfb1daea?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Sofia Chen",
      role: "Pastry Chef",
      description: "Award-winning pastry chef specializing in innovative dessert creations.",
      image: "https://images.unsplash.com/photo-1594736797933-d0711ba6e543?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "David Thompson",
      role: "Sous Chef",
      description: "Expert in fusion cuisine with a passion for locally sourced ingredients.",
      image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-space-grotesk font-bold mb-6">
              About <span className="text-gradient-primary">Nebula Bistro</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Founded in 2015, Nebula Bistro has been serving exceptional cuisine that combines traditional flavors 
              with modern innovation. Our commitment to quality ingredients and artistic presentation has made us 
              a destination for food lovers.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="text-center glass border-border/50">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gradient-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-space-grotesk font-bold mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                What started as a small family restaurant has grown into a culinary destination. 
                Our founder, inspired by travels across the globe, wanted to create a space where 
                diverse flavors could come together in harmony.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every dish tells a story, every ingredient is carefully selected, and every meal 
                is crafted with passion. We believe that food has the power to bring people 
                together and create lasting memories.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Nebula Bistro continues to push culinary boundaries while staying true 
                to our core values of quality, creativity, and exceptional service.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
                alt="Restaurant interior"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-space-grotesk font-bold mb-6">
              Meet Our <span className="text-gradient-primary">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our passionate chefs bring decades of experience and creativity to every dish.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-border/50 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-space-grotesk font-bold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;