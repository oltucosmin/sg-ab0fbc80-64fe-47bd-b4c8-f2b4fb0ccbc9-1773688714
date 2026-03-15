import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SEO } from "@/components/SEO";
import Head from "next/head";

export default function Home() {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Oikos Energy",
    "url": "https://oikosenergy.ro",
    "logo": "https://oikosenergy.ro/og-image.png",
    "description": "Lider în soluții de energie regenerabilă în România - panouri fotovoltaice, pompe de căldură, consultanță energetică",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+40-740-688-686",
      "contactType": "Customer Service",
      "areaServed": "RO",
      "availableLanguage": "Romanian"
    },
    "sameAs": [
      "https://www.facebook.com/oikosenergy",
      "https://www.linkedin.com/company/oikosenergy"
    ]
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Oikos Energy",
    "image": "https://oikosenergy.ro/og-image.png",
    "url": "https://oikosenergy.ro",
    "telephone": "+40-740-688-686",
    "email": "office@oikosenergy.ro",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RO",
      "addressRegion": "Romania"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.9432",
      "longitude": "24.9668"
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Oikos Energy - Panouri Fotovoltaice & Pompe Căldură România | Energie Verde"
        description="Lider în energie regenerabilă. Instalăm panouri fotovoltaice, pompe de căldură și sisteme hibride. Peste 500 proiecte finalizate în România. Consultanță gratuită și garanție extinsă!"
        url="https://oikosenergy.ro"
        keywords="panouri fotovoltaice Romania, pompe caldura, instalare panouri solare, energie verde, sisteme fotovoltaice, economii energie electrica, consultanta energetica, Oikos Energy"
        type="website"
      />
      
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
      </Head>

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