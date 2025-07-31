import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate newsletter signup
    setTimeout(() => {
      setIsSubscribed(true);
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest news and special offers.",
      });
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-space-grotesk font-bold mb-4">
            Stay Updated with Monda's
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, wine tasting events, 
            and the latest culinary news from our kitchen.
          </p>

          <Card className="max-w-md mx-auto glass border-primary/20">
            <CardContent className="p-6">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full hover-scale"
                    disabled={!email}
                  >
                    Subscribe to Newsletter
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-lg mb-1">Welcome aboard!</h3>
                  <p className="text-muted-foreground text-sm">
                    Check your email for confirmation.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};