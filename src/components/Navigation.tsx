import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { toggleCart } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reservations", href: "/reservations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-cta rounded-lg flex items-center justify-center shadow-glow">
                <span className="text-xl font-bold text-white">N</span>
              </div>
              <span className="text-xl font-space-grotesk font-bold bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
                Nebula Bistro
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href}>
                <motion.span
                  className={`font-medium transition-colors ${
                    location.pathname === item.href 
                      ? "text-primary font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => dispatch(toggleCart())}
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <User size={20} />
            </Button>
            <Button className="bg-primary hover:bg-primary/90" size="sm">
              Reserve
            </Button>
          </div>

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
              <Button className="bg-primary hover:bg-primary/90 flex-1" size="sm">
                Reserve
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};