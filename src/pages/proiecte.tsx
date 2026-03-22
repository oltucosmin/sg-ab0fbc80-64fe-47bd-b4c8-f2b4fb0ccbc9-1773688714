import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { SEO } from "@/components/SEO";
import { getProjects } from "@/services/projectService";
import type { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Filter, Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "solar" | "heat-pump" | "hybrid">("all");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      
      const transformedProjects: Project[] = data.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        imageUrl: p.image_url,
        location: p.location,
        power: p.power,
        completedDate: p.completed_date,
        category: p.category as "solar" | "heat-pump" | "hybrid",
        isFeatured: p.featured,
      }));
      
      setProjects(transformedProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const filterButtons = [
    { value: "all" as const, label: "Toate Proiectele" },
    { value: "solar" as const, label: "Panouri Fotovoltaice" },
    { value: "heat-pump" as const, label: "Pompe de Căldură" },
    { value: "hybrid" as const, label: "Sisteme Hibride" }
  ];

  return (
    <>
      <SEO 
        title="Proiecte Realizate - Oikos Energy"
        description="Peste 500 de instalații de energie regenerabilă finalizate în toată România. Panouri fotovoltaice, pompe de căldură și sisteme hibride pentru case și afaceri."
        url="https://oikosenergy.ro/proiecte"
      />
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Proiectele <span className="text-gradient">Noastre</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Descoperă instalațiile de energie regenerabilă pe care le-am realizat pentru 
              clienții noștri din toată România. Fiecare proiect este un pas către un viitor mai verde.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
            <Filter className="w-5 h-5 text-muted-foreground mt-2 mr-2" />
            {filterButtons.map((btn) => (
              <Button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                variant={filter === btn.value ? "default" : "outline"}
                className={
                  filter === btn.value
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
                    : "border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/5"
                }
              >
                {btn.label}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Se încarcă proiectele...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Nu există proiecte în această categorie momentan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="mt-20 glass rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-heading font-bold text-gradient mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Instalații Finalizate</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-gradient mb-2">15 MW</div>
                <div className="text-sm text-muted-foreground">Capacitate Instalată</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-gradient mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacție Clienți</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-gradient mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Județe Acoperite</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}