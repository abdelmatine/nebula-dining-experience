import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Cart } from "@/components/Cart";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import RestaurantCorners from "./pages/RestaurantCorners";
import Reservations from "./pages/Reservations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="nebula-theme">
        <TooltipProvider>
          <BrowserRouter>
            <Navigation />
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<RestaurantCorners />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Cart />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
