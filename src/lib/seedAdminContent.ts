/**
 * Script pentru inițializarea conținutului admin
 * Rulează acest script pentru a popula tabelele cu date inițiale
 */

import { supabase } from "./supabase";

export async function seedSiteSettings() {
  const settings = [
    // Contact Settings
    {
      key: "contact_phone",
      value: "+40 XXX XXX XXX",
      type: "tel",
      category: "contact",
      label: "Telefon",
      description: "Număr de telefon afișat pe site"
    },
    {
      key: "contact_email",
      value: "contact@oikosenergy.ro",
      type: "email",
      category: "contact",
      label: "Email",
      description: "Adresa de email principală"
    },
    {
      key: "contact_address",
      value: "București, România",
      type: "text",
      category: "contact",
      label: "Adresă",
      description: "Adresa companiei"
    },
    
    // Social Media
    {
      key: "social_facebook",
      value: "https://facebook.com/oikosenergy",
      type: "url",
      category: "social",
      label: "Facebook",
      description: "Link profil Facebook"
    },
    {
      key: "social_instagram",
      value: "https://instagram.com/oikosenergy",
      type: "url",
      category: "social",
      label: "Instagram",
      description: "Link profil Instagram"
    },
    {
      key: "social_linkedin",
      value: "https://linkedin.com/company/oikosenergy",
      type: "url",
      category: "social",
      label: "LinkedIn",
      description: "Link profil LinkedIn"
    },
    
    // SEO Settings
    {
      key: "seo_title",
      value: "Oikos Energy - Soluții Energetice Durabile",
      type: "text",
      category: "seo",
      label: "Titlu SEO",
      description: "Titlul principal al site-ului pentru motoarele de căutare"
    },
    {
      key: "seo_description",
      value: "Furnizor premium de soluții energetice durabile în România. Panouri solare, sisteme de stocare energie și consultanță specializată.",
      type: "textarea",
      category: "seo",
      label: "Descriere SEO",
      description: "Descrierea site-ului pentru motoarele de căutare"
    }
  ];

  const { error } = await supabase
    .from("site_settings")
    .upsert(settings, { onConflict: "key" });

  if (error) {
    console.error("Error seeding site settings:", error);
    return false;
  }

  return true;
}

export async function seedPageContent() {
  const content = [
    // Home - Hero Section
    {
      page: "home",
      section: "hero",
      key: "title",
      value: "Energie Curată pentru Viitorul Tău",
      type: "text"
    },
    {
      page: "home",
      section: "hero",
      key: "subtitle",
      value: "Soluții energetice durabile și inovatoare pentru case și business-uri moderne",
      type: "text"
    },
    {
      page: "home",
      section: "hero",
      key: "cta_primary",
      value: "Explorează Soluțiile",
      type: "text"
    },
    {
      page: "home",
      section: "hero",
      key: "cta_secondary",
      value: "Contactează-ne",
      type: "text"
    },
    
    // Home - About Section
    {
      page: "home",
      section: "about",
      key: "title",
      value: "De Ce Oikos Energy?",
      type: "text"
    },
    {
      page: "home",
      section: "about",
      key: "description",
      value: "Transformăm modul în care România folosește energia. Cu soluții inovatoare și sustenabile, aducem viitorul energiei în prezent.",
      type: "textarea"
    },
    
    // Home - Services Section
    {
      page: "home",
      section: "services",
      key: "title",
      value: "Soluțiile Noastre",
      type: "text"
    },
    {
      page: "home",
      section: "services",
      key: "description",
      value: "Oferim o gamă completă de servicii energetice pentru nevoile tale",
      type: "text"
    }
  ];

  const { error } = await supabase
    .from("page_content")
    .upsert(content, { onConflict: "page,section,key" });

  if (error) {
    console.error("Error seeding page content:", error);
    return false;
  }

  return true;
}

export async function seedServices() {
  const services = [
    {
      title: "Sisteme Fotovoltaice",
      description: "Soluții complete de panouri solare pentru case și business-uri, cu eficiență maximă și garanție extinsă.",
      icon: "Sun",
      features: [
        "Consultanță gratuită și analiză energetică",
        "Instalare profesională certificată",
        "Monitorizare în timp real",
        "Garanție 25 ani pe panouri",
        "Service și mentenanță inclusă"
      ],
      order_index: 1,
      is_active: true
    },
    {
      title: "Stocare Energie",
      description: "Sisteme avansate de baterii pentru independență energetică completă și reducerea costurilor.",
      icon: "Battery",
      features: [
        "Baterii de ultimă generație",
        "Capacitate personalizabilă",
        "Integrare smart home",
        "Backup automat în caz de pană",
        "Monitorizare aplicație mobilă"
      ],
      order_index: 2,
      is_active: true
    },
    {
      title: "Stații Încărcare EV",
      description: "Infrastructură completă pentru încărcarea vehiculelor electrice, pentru casă sau afacere.",
      icon: "Zap",
      features: [
        "Wallbox-uri inteligente",
        "Încărcare rapidă și eficientă",
        "Programare automată",
        "Integrare cu sistem solar",
        "Management costuri energie"
      ],
      order_index: 3,
      is_active: true
    },
    {
      title: "Smart Energy Management",
      description: "Sisteme inteligente de monitorizare și optimizare a consumului energetic.",
      icon: "Activity",
      features: [
        "Dashboard în timp real",
        "Rapoarte detaliate consum",
        "Predicții și recomandări AI",
        "Alerte și notificări",
        "Optimizare automată"
      ],
      order_index: 4,
      is_active: true
    }
  ];

  const { error } = await supabase
    .from("services")
    .upsert(services, { onConflict: "title" });

  if (error) {
    console.error("Error seeding services:", error);
    return false;
  }

  return true;
}

// Funcție pentru rularea tuturor seed-urilor
export async function seedAllAdminContent() {
  console.log("🌱 Starting admin content seeding...");
  
  const results = await Promise.all([
    seedSiteSettings(),
    seedPageContent(),
    seedServices()
  ]);

  if (results.every(r => r === true)) {
    console.log("✅ Admin content seeded successfully!");
    return true;
  } else {
    console.error("❌ Some seeds failed");
    return false;
  }
}