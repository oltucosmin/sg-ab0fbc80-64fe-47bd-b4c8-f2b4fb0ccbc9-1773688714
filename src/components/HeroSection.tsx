import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sun, Wind } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Floating Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="p-3 rounded-xl glass-card glow-emerald animate-slide-up">
              <Sun className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="p-3 rounded-xl glass-card glow-lime animate-slide-up delay-100">
              <Zap className="w-6 h-6 text-lime-400" />
            </div>
            <div className="p-3 rounded-xl glass-card glow-emerald animate-slide-up delay-200">
              <Wind className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-tight">
            Energie Verde pentru
            <span className="block text-gradient mt-2">Viitorul Tău</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transformăm energia soarelui în soluții sustenabile pentru casa ta. 
            Tehnologie avansată, eficiență maximă, viitor mai verde.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 glow-emerald transition-all duration-300 hover:scale-105"
              >
                Solicită Ofertă
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/proiecte">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 text-lg px-8 py-6 transition-all duration-300"
              >
                Vezi Proiecte
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-heading font-bold text-gradient mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Instalații Realizate</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-heading font-bold text-gradient mb-2">15MW</div>
              <div className="text-sm text-muted-foreground">Energie Produsă</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-heading font-bold text-gradient mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Clienți Mulțumiți</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-emerald-400/50 flex justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}