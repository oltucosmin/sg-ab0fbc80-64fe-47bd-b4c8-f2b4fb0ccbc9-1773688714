import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SEO } from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO 
        title="Oikos Energy - Energie Verde pentru Viitorul Tău"
        description="Soluții profesionale în energie regenerabilă: panouri fotovoltaice, pompe de căldură, consultanță energetică. Peste 500 de instalații realizate în România."
        url="https://oikosenergy.ro"
      />
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}