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
    'nav.auth': 'Sign In',
    'nav.logout': 'Logout',
    'nav.admin': 'Admin',
    
    // Home Page
    'home.hero.title': 'Experience Fine Dining at Monda\'s',
    'home.hero.subtitle': 'Where culinary artistry meets exceptional service in an atmosphere of refined elegance.',
    'home.hero.tagline1': 'Restaurant • Bar • Vinothek',
    'home.hero.tagline2': 'Classic Elegance • Timeless Flavors',
    'home.hero.tagline3': 'Mon - Sun: 10:00 – 23:00 • Hauptstraße 347, Königswinter',
    'home.hero.description': 'Experience authentic cuisine in an elegant atmosphere where tradition meets excellence. A timeless destination for refined dining and exceptional wines.',
    'home.hero.explore': 'Explore Menu',
    'home.hero.book': 'Book a Table',
    'home.featured.title': 'Featured Dishes',
    'home.featured.subtitle': 'Discover our chef\'s signature creations',
    'home.next.event': 'Next Event',
    'home.wine.tasting': 'Wine Tasting Event',
    'home.wine.description': 'Join us for an exclusive wine tasting experience featuring premium selections from renowned vineyards.',
    'home.event.wine.title': 'Wine Tasting Experience',
    'home.event.wine.subtitle': 'Premium Wine Selection',
    'home.event.wine.description': 'Join us for an exclusive wine tasting featuring carefully selected premium wines from renowned vineyards.',
    'home.event.every.saturday': 'Every Saturday',
    'home.event.time': '9:00 PM - 11:00 PM',
    'home.event.location': 'Private Tasting Room',
    'home.event.address': 'Hauptstraße 347, Königswinter',
    'home.event.seating': 'Limited Seating',
    'home.event.seats': '20 seats only - Reservation required',
    'home.event.price': '€45 per person',
    'home.event.includes': 'Includes 5 wine tastings, artisan cheese selection, and expert sommelier guidance',
    'home.event.reserve': 'Reserve Your Spot',
    'home.event.click.details': 'Click for details',
    'home.why.title': 'Why Choose Monda\'s',
    'home.why.subtitle': 'Experience the finest dining in an elegant atmosphere',
    'home.reviews.title': 'What Our Guests Say',
    'home.reviews.subtitle': 'Testimonials from our valued customers',
    'home.newsletter.title': 'Stay Connected',
    'home.newsletter.subtitle': 'Subscribe to receive updates about special events and seasonal menus',
    
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
    
    // Auth
    'auth.title': 'Welcome to Monda\'s',
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.firstname': 'First Name',
    'auth.lastname': 'Last Name',
    'auth.already.account': 'Already have an account? Sign in',
    'auth.no.account': 'Don\'t have an account? Sign up',
    'auth.signing.in': 'Signing in...',
    'auth.signing.up': 'Signing up...',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.view': 'View',
    'common.update': 'Update',
    'common.create': 'Create',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.menu': 'Speisekarte',
    'nav.locations': 'Standorte',
    'nav.reservations': 'Reservierungen',
    'nav.contact': 'Kontakt',
    'nav.about': 'Über uns',
    'nav.auth': 'Anmelden',
    'nav.logout': 'Abmelden',
    'nav.admin': 'Admin',
    
    // Home Page
    'home.hero.title': 'Erleben Sie Fine Dining bei Monda\'s',
    'home.hero.subtitle': 'Wo kulinarische Kunstfertigkeit auf außergewöhnlichen Service in einer Atmosphäre raffinierter Eleganz trifft.',
    'home.hero.tagline1': 'Restaurant • Bar • Vinothek',
    'home.hero.tagline2': 'Klassische Eleganz • Zeitlose Aromen',
    'home.hero.tagline3': 'Mo - So: 10:00 – 23:00 • Hauptstraße 347, Königswinter',
    'home.hero.description': 'Erleben Sie authentische Küche in eleganter Atmosphäre, wo Tradition auf Exzellenz trifft. Ein zeitloser Ort für raffiniertes Dining und außergewöhnliche Weine.',
    'home.hero.explore': 'Speisekarte entdecken',
    'home.hero.book': 'Tisch reservieren',
    'home.featured.title': 'Empfohlene Gerichte',
    'home.featured.subtitle': 'Entdecken Sie die Signature-Kreationen unseres Küchenchefs',
    'home.next.event': 'Nächstes Event',
    'home.wine.tasting': 'Weinverkostung',
    'home.wine.description': 'Begleiten Sie uns zu einem exklusiven Weinverkostungserlebnis mit Premium-Auswahlen von renommierten Weingütern.',
    'home.event.wine.title': 'Weinverkostungserlebnis',
    'home.event.wine.subtitle': 'Premium Weinauswahl',
    'home.event.wine.description': 'Begleiten Sie uns zu einer exklusiven Weinverkostung mit sorgfältig ausgewählten Premium-Weinen von renommierten Weingütern.',
    'home.event.every.saturday': 'Jeden Samstag',
    'home.event.time': '21:00 - 23:00 Uhr',
    'home.event.location': 'Privater Verkostungsraum',
    'home.event.address': 'Hauptstraße 347, Königswinter',
    'home.event.seating': 'Begrenzte Plätze',
    'home.event.seats': 'Nur 20 Plätze - Reservierung erforderlich',
    'home.event.price': '€45 pro Person',
    'home.event.includes': 'Inklusive 5 Weinverkostungen, Artisan-Käseauswahl und fachkundige Sommelier-Beratung',
    'home.event.reserve': 'Platz reservieren',
    'home.event.click.details': 'Für Details klicken',
    'home.why.title': 'Warum Monda\'s wählen',
    'home.why.subtitle': 'Erleben Sie das feinste Dining in eleganter Atmosphäre',
    'home.reviews.title': 'Was unsere Gäste sagen',
    'home.reviews.subtitle': 'Testimonials unserer geschätzten Kunden',
    'home.newsletter.title': 'Bleiben Sie verbunden',
    'home.newsletter.subtitle': 'Abonnieren Sie Updates über besondere Events und saisonale Menüs',
    
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
    
    // Auth
    'auth.title': 'Willkommen bei Monda\'s',
    'auth.signin': 'Anmelden',
    'auth.signup': 'Registrieren',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.firstname': 'Vorname',
    'auth.lastname': 'Nachname',
    'auth.already.account': 'Bereits ein Konto? Anmelden',
    'auth.no.account': 'Noch kein Konto? Registrieren',
    'auth.signing.in': 'Anmeldung läuft...',
    'auth.signing.up': 'Registrierung läuft...',
    
    // Common
    'common.loading': 'Laden...',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.confirm': 'Bestätigen',
    'common.close': 'Schließen',
    'common.view': 'Ansehen',
    'common.update': 'Aktualisieren',
    'common.create': 'Erstellen',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
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