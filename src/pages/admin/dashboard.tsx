import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, LogOut, Save, X } from "lucide-react";
import { mockProjects } from "@/lib/mockProjects";
import type { Project } from "@/types/project";

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    location: "",
    image: "",
    category: "solar",
    power: "",
    completedDate: new Date().toISOString().split("T")[0],
    featured: false
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setProjects(projects.map(p => 
        p.id === editingId ? { ...formData as Project, id: editingId } : p
      ));
      setEditingId(null);
    } else {
      const newProject: Project = {
        ...formData as Project,
        id: Date.now().toString()
      };
      setProjects([newProject, ...projects]);
    }
    
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Sigur vrei să ștergi acest proiect?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      image: "",
      category: "solar",
      power: "",
      completedDate: new Date().toISOString().split("T")[0],
      featured: false
    });
    setShowForm(false);
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEO 
        title="Dashboard Admin - Oikos Energy"
        description="Gestionează proiectele Oikos Energy"
      />
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                Dashboard <span className="text-gradient">Admin</span>
              </h1>
              <p className="text-muted-foreground">
                Gestionează proiectele Oikos Energy
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Deconectare
            </Button>
          </div>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="mb-8 bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adaugă Proiect Nou
            </Button>
          )}

          {showForm && (
            <div className="glass-card rounded-2xl p-8 mb-8 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {editingId ? "Editează Proiect" : "Proiect Nou"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titlu *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Locație *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categorie *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: "solar" | "heat-pump" | "hybrid") => 
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="bg-background/50 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solar">Panouri Fotovoltaice</SelectItem>
                        <SelectItem value="heat-pump">Pompă de Căldură</SelectItem>
                        <SelectItem value="hybrid">Sistem Hibrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="power">Putere</Label>
                    <Input
                      id="power"
                      value={formData.power}
                      onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                      placeholder="ex: 10 kW"
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="completedDate">Data Finalizare *</Label>
                    <Input
                      id="completedDate"
                      type="date"
                      value={formData.completedDate}
                      onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                      required
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">URL Imagine *</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      required
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descriere *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="bg-background/50 border-white/10"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Proiect Premium (Featured)
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? "Salvează Modificări" : "Adaugă Proiect"}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="border-white/20"
                  >
                    Anulează
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Proiecte ({projects.length})
            </h2>
            
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="glass-card rounded-xl p-6 hover:scale-[1.01] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-xl text-foreground">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>📍 {project.location}</span>
                      {project.power && <span>⚡ {project.power}</span>}
                      <span>📅 {new Date(project.completedDate).toLocaleDateString("ro-RO", { month: "long", year: "numeric" })}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      onClick={() => handleEdit(project)}
                      variant="outline"
                      size="sm"
                      className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(project.id)}
                      variant="outline"
                      size="sm"
                      className="border-destructive/50 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}