import { Button } from "@/components/ui/button";
import { Sun, Flame, LineChart, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ServicesSection() {
  const services = [
    {
      icon: Sun,
      title: "Panouri Fotovoltaice",
      description: "Instalații complete de panouri solare pentru case, afaceri și industrie. Tehnologie de ultimă generație cu randament maxim.",
      features: [
        "Panouri monocristaline premium",
        "Invertoare inteligente",
        "Sisteme de monitorizare",
        "Garanție 25 ani"
      ],
      color: "emerald"
    },
    {
      icon: Flame,
      title: "Pompe de Căldură",
      description: "Soluții eficiente pentru încălzire și răcire. Reduceri de până la 75% la costurile de energie.",
      features: [
        "Tehnologie inverter",
        "COP ridicat (>4.0)",
        "Climatizare 4 anotimpuri",
        "Control WiFi integrat"
      ],
      color: "lime"
    },
    {
      icon: LineChart,
      title: "Consultanță Energetică",
      description: "Analiză detaliată a consumului tău de energie și recomandări personalizate pentru eficientizare.",
      features: [
        "Audit energetic gratuit",
        "Calcul economii reale",
        "Plan de implementare",
        "ROI transparent"
      ],
      color: "emerald"
    },
    {
      icon: Wrench,
      title: "Întreținere & Service",
      description: "Mentenanță profesională pentru toate sistemele de energie regenerabilă. Intervenții rapide, piese originale.",
      features: [
        "Service autorizat",
        "Piese de schimb originale",
        "Intervenție în 24h",
        "Contracte de mentenanță"
      ],
      color: "lime"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Serviciile <span className="text-gradient">Noastre</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Oferim soluții complete de energie regenerabilă, de la consultanță și proiectare, 
            până la instalare și service post-vânzare.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const glowClass = service.color === "emerald" ? "glow-emerald" : "glow-lime";
            
            return (
              <div 
                key={index}
                className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${service.color}-500/20 to-${service.color}-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${glowClass}`}>
                  <Icon className={`w-8 h-8 text-${service.color}-400`} />
                </div>

                <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${service.color}-400 mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/servicii">
                  <Button 
                    variant="ghost" 
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-0 h-auto font-semibold group/btn"
                  >
                    Află Mai Multe
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
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
    </section>
  );
}