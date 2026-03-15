import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Sun, Flame, LineChart, Wrench, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: Sun,
      title: "Panouri Fotovoltaice",
      description: "Instalații complete de panouri solare pentru producerea de energie electrică din surse regenerabile.",
      benefits: [
        "Reducere de până la 90% a facturii de energie",
        "Independență energetică și autonomie",
        "Protecție împotriva creșterii prețurilor",
        "Contribuție la reducerea amprentei de carbon",
        "Creșterea valorii proprietății"
      ],
      includes: [
        "Panouri monocristaline premium cu randament ridicat",
        "Invertoare inteligente cu monitorizare WiFi",
        "Structuri de montaj certificate anti-coroziune",
        "Sistem de protecție și siguranțe",
        "Montaj profesional și punere în funcțiune",
        "Garanție extinsă 25 ani pentru panouri"
      ],
      color: "emerald"
    },
    {
      icon: Flame,
      title: "Pompe de Căldură",
      description: "Soluții eficiente pentru încălzire, răcire și apă caldă menajeră, reducând dramatic costurile energetice.",
      benefits: [
        "Economii de 70-75% la costurile de încălzire",
        "Funcționare 4 anotimpuri (încălzire + răcire)",
        "Comfort termic superior și constant",
        "Energie curată, fără emisii locale",
        "Costuri de întreținere minime"
      ],
      includes: [
        "Pompă de căldură aer-apă cu tehnologie inverter",
        "Unitate interioară și exterioară",
        "Vas de expansiune și accesorii complete",
        "Control WiFi pentru gestionare remotă",
        "Instalare profesională și configurare",
        "Garanție 5 ani și service autorizat"
      ],
      color: "lime"
    },
    {
      icon: LineChart,
      title: "Consultanță Energetică",
      description: "Analiză completă a consumului energetic și recomandări personalizate pentru eficientizare maximă.",
      benefits: [
        "Identificarea potențialului de economisire",
        "Plan personalizat de eficientizare",
        "Calcul ROI transparent și detaliat",
        "Optimizarea investiției",
        "Asistență pentru accesarea programelor de finanțare"
      ],
      includes: [
        "Audit energetic profesional la fața locului",
        "Analiza consumului actual și proiecții",
        "Raport detaliat cu recomandări concrete",
        "Dimensionarea optimă a sistemelor",
        "Calcul economii și perioada de recuperare",
        "Consultanță gratuită pentru clienți"
      ],
      color: "emerald"
    },
    {
      icon: Wrench,
      title: "Întreținere & Service",
      description: "Mentenanță profesională și intervenții rapide pentru toate sistemele de energie regenerabilă.",
      benefits: [
        "Performanță constantă a sistemului",
        "Creșterea duratei de viață a echipamentelor",
        "Prevenirea defecțiunilor costisitoare",
        "Intervenție rapidă în caz de problemă",
        "Monitorizare continuă a performanței"
      ],
      includes: [
        "Service autorizat pentru toate mărcile",
        "Piese de schimb originale în stoc",
        "Intervenție tehnician certificat în 24h",
        "Curățare și verificare periodică",
        "Rapoarte de mentenanță detaliate",
        "Contracte de service personalizate"
      ],
      color: "lime"
    }
  ];

  return (
    <>
      <SEO 
        title="Servicii - Oikos Energy"
        description="Soluții complete de energie regenerabilă: panouri fotovoltaice, pompe de căldură, consultanță energetică și service profesional. Economii garantate și tehnologie de ultimă generație."
        url="https://oikosenergy.ro/servicii"
      />
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Servicii <span className="text-gradient">Complete</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              De la consultanță și proiectare, până la instalare și service post-vânzare. 
              Oferim soluții integrate pentru toate nevoile tale energetice.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className="glass-card rounded-3xl p-8 lg:p-12 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                    <div className={!isEven ? 'lg:col-start-2' : ''}>
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${service.color}-500/20 to-${service.color}-400/10 flex items-center justify-center mb-6 ${service.color === 'emerald' ? 'glow-emerald' : 'glow-lime'}`}>
                        <Icon className={`w-10 h-10 text-${service.color}-400`} />
                      </div>
                      
                      <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                        {service.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                        Beneficii Cheie:
                      </h3>
                      <ul className="space-y-3 mb-8">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className={`w-5 h-5 text-${service.color}-400 shrink-0 mt-0.5`} />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <div className="glass rounded-2xl p-6">
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                          Ce Include:
                        </h3>
                        <ul className="space-y-3">
                          {service.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className={`w-1.5 h-1.5 rounded-full bg-${service.color}-400 shrink-0 mt-2`} />
                              <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center glass-card rounded-3xl p-12 animate-fade-in">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Pregătit să Faci Pasul către <span className="text-gradient">Energie Verde?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contactează-ne pentru o consultație gratuită și o ofertă personalizată. 
              Echipa noastră de experți te va ghida în alegerea celei mai bune soluții pentru tine.
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 glow-emerald transition-all duration-300 hover:scale-105"
              >
                Solicită o Consultație Gratuită
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}