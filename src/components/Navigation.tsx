import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { toggleCart } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Locations", href: "/locations" },
    { name: "Reservations", href: "/reservations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-cta rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-xl font-bold text-white">M</span>
              </div>
              <span className="text-3xl font-alex-brush bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
                Monda's Restaurant
              </span>
            </motion.div>
          </Link>

          {/* Menu Items Section */}
          <motion.div 
            className="hidden md:flex items-center bg-background/20 backdrop-blur-md border border-primary/20 rounded-2xl px-6 py-3 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {navItems.map((item, index) => (
              <Link key={item.name} to={item.href}>
                <motion.div
                  className={`relative px-4 py-2 mx-1 rounded-xl transition-all duration-300 ${
                    location.pathname === item.href 
                      ? "text-primary font-semibold bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(var(--primary-rgb), 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span className="font-playfair font-medium relative z-10">{item.name}</span>
                  {location.pathname === item.href && (
                    <motion.div
                      className="absolute inset-0 bg-primary/20 backdrop-blur-sm rounded-xl"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Action Buttons Section */}
          <motion.div 
            className="hidden md:flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:bg-primary/10 transition-colors"
              onClick={() => dispatch(toggleCart())}
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  {items.length}
                </motion.span>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
              <User size={20} />
            </Button>
            
            <Button 
              className="bg-background/20 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary/10 rounded-2xl px-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105" 
              size="sm" 
              asChild
            >
              <Link to="/reservations">Reserve</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden mt-6 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 transition-colors ${
                  location.pathname === item.href 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex space-x-4 pt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1"
                onClick={() => {
                  dispatch(toggleCart());
                  setIsOpen(false);
                }}
              >
                <ShoppingCart size={20} className="mr-2" />
                Cart ({items.length})
              </Button>
              <Button className="bg-primary hover:bg-primary/90 flex-1" size="sm" asChild>
                <Link to="/reservations">Reserve</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};