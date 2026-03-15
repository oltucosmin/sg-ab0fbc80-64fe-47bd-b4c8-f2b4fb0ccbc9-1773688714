import Image from "next/image";
import { MapPin, Calendar, Zap } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const categoryLabels = {
    solar: "Panouri Fotovoltaice",
    "heat-pump": "Pompă de Căldură",
    hybrid: "Sistem Hibrid"
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 animate-fade-in">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-semibold text-emerald-400 glow-emerald">
            Proiect Premium
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-2">
            {categoryLabels[project.category]}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-gradient transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{project.location}</span>
          </div>
          {project.power && (
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-lime-400" />
              <span>{project.power}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{new Date(project.completedDate).toLocaleDateString("ro-RO", { month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}