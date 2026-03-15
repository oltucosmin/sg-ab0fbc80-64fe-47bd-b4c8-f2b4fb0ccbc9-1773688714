import { Shield, Award, Users, TrendingUp } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "Siguranță Garantată",
      description: "Instalații certificate conform standardelor europene, garanție extinsă pentru toate produsele."
    },
    {
      icon: Award,
      title: "Expertiză Profesională",
      description: "Echipă cu peste 10 ani experiență în energie regenerabilă și instalații fotovoltaice."
    },
    {
      icon: Users,
      title: "Suport Dedicat",
      description: "Consultanță gratuită, monitorizare 24/7 și asistență tehnică permanentă."
    },
    {
      icon: TrendingUp,
      title: "Eficiență Maximă",
      description: "Tehnologie de ultimă generație pentru randament superior și economii substanțiale."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            De Ce <span className="text-gradient">Oikos Energy?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Suntem lideri în soluții de energie regenerabilă în România, cu sute de 
            proiecte finalizate și mii de clienți mulțumiți. Pasiunea noastră pentru 
            un viitor sustenabil se reflectă în fiecare instalație pe care o realizăm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-lime-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 glow-emerald">
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 glass rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-heading font-bold text-gradient mb-2">2014</div>
              <div className="text-sm text-muted-foreground">An Înființare</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-gradient mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Specialiști</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-gradient mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Județe Acoperite</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-gradient mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Asistență Tehnică</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}