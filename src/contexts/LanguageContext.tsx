import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'de';
  setLanguage: (lang: 'en' | 'de') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.locations': 'Locations',
    'nav.reservations': 'Reservations',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    
    // Home Page
    'home.hero.title': 'Experience Fine Dining at Monda\'s',
    'home.hero.subtitle': 'Where culinary artistry meets exceptional service in an atmosphere of refined elegance.',
    'home.featured.title': 'Featured Dishes',
    'home.featured.subtitle': 'Discover our chef\'s signature creations',
    'home.next.event': 'Next Event',
    'home.wine.tasting': 'Wine Tasting Event',
    'home.wine.description': 'Join us for an exclusive wine tasting experience featuring premium selections from renowned vineyards.',
    
    // Menu Page
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Discover our delicious selection',
    'menu.all': 'All',
    'menu.appetizers': 'Appetizers',
    'menu.pasta': 'Pasta',
    'menu.seafood': 'Seafood',
    'menu.meat': 'Meat',
    'menu.bowls': 'Bowls',
    'menu.desserts': 'Desserts',
    'menu.beverages': 'Beverages',
    'menu.add.to.cart': 'Add to Cart',
    
    // Locations Page
    'locations.title': 'Our Locations',
    'locations.subtitle': 'Find us in premium locations',
    
    // Reservations Page
    'reservations.title': 'Reserve Your Table',
    'reservations.subtitle': 'Experience culinary excellence in our modern dining space. Book your table for an unforgettable meal.',
    'reservations.details': 'Reservation Details',
    'reservations.type': 'Reservation Type',
    'reservations.simple': 'Simple Reservation',
    'reservations.event': 'Event Reservation',
    'reservations.name': 'Full Name',
    'reservations.email': 'Email Address',
    'reservations.phone': 'Phone Number',
    'reservations.guests': 'Number of Guests',
    'reservations.date': 'Preferred Date',
    'reservations.time': 'Preferred Time',
    'reservations.special': 'Special Requests',
    'reservations.submit': 'Reserve Table',
    
    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.subtitle': 'Manage Monda\'s Restaurant',
    'admin.dashboard': 'Dashboard',
    'admin.menu': 'Menu',
    'admin.orders': 'Orders',
    'admin.reservations': 'Reservations',
    'admin.analytics': 'Analytics',
    'admin.settings': 'Settings',
    'admin.events': 'Events',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.menu': 'Speisekarte',
    'nav.locations': 'Standorte',
    'nav.reservations': 'Reservierungen',
    'nav.contact': 'Kontakt',
    'nav.about': 'Über uns',
    
    // Home Page
    'home.hero.title': 'Erleben Sie Fine Dining bei Monda\'s',
    'home.hero.subtitle': 'Wo kulinarische Kunstfertigkeit auf außergewöhnlichen Service in einer Atmosphäre raffinierter Eleganz trifft.',
    'home.featured.title': 'Empfohlene Gerichte',
    'home.featured.subtitle': 'Entdecken Sie die Signature-Kreationen unseres Küchenchefs',
    'home.next.event': 'Nächstes Event',
    'home.wine.tasting': 'Weinverkostung',
    'home.wine.description': 'Begleiten Sie uns zu einem exklusiven Weinverkostungserlebnis mit Premium-Auswahlen von renommierten Weingütern.',
    
    // Menu Page
    'menu.title': 'Unsere Speisekarte',
    'menu.subtitle': 'Entdecken Sie unsere köstliche Auswahl',
    'menu.all': 'Alle',
    'menu.appetizers': 'Vorspeisen',
    'menu.pasta': 'Pasta',
    'menu.seafood': 'Meeresfrüchte',
    'menu.meat': 'Fleisch',
    'menu.bowls': 'Bowls',
    'menu.desserts': 'Desserts',
    'menu.beverages': 'Getränke',
    'menu.add.to.cart': 'In den Warenkorb',
    
    // Locations Page
    'locations.title': 'Unsere Standorte',
    'locations.subtitle': 'Finden Sie uns an Premium-Standorten',
    
    // Reservations Page
    'reservations.title': 'Reservieren Sie Ihren Tisch',
    'reservations.subtitle': 'Erleben Sie kulinarische Exzellenz in unserem modernen Speiseraum. Buchen Sie Ihren Tisch für ein unvergessliches Essen.',
    'reservations.details': 'Reservierungsdetails',
    'reservations.type': 'Reservierungstyp',
    'reservations.simple': 'Einfache Reservierung',
    'reservations.event': 'Event-Reservierung',
    'reservations.name': 'Vollständiger Name',
    'reservations.email': 'E-Mail-Adresse',
    'reservations.phone': 'Telefonnummer',
    'reservations.guests': 'Anzahl der Gäste',
    'reservations.date': 'Bevorzugtes Datum',
    'reservations.time': 'Bevorzugte Zeit',
    'reservations.special': 'Sonderwünsche',
    'reservations.submit': 'Tisch reservieren',
    
    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.subtitle': 'Monda\'s Restaurant verwalten',
    'admin.dashboard': 'Dashboard',
    'admin.menu': 'Speisekarte',
    'admin.orders': 'Bestellungen',
    'admin.reservations': 'Reservierungen',
    'admin.analytics': 'Analytik',
    'admin.settings': 'Einstellungen',
    'admin.events': 'Events',
    
    // Common
    'common.loading': 'Laden...',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.confirm': 'Bestätigen',
    'common.close': 'Schließen',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'de'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};