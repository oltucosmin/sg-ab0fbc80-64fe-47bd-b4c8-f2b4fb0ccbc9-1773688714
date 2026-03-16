import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, LogOut, Save, X, Upload, Loader2, Users, Crown, Shield } from "lucide-react";
import { projectService } from "@/services/projectService";
import type { Project } from "@/types/project";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, userEmail, userRole, isSuperAdmin, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    category: "solar",
    power: "",
    completedDate: new Date().toISOString().split("T")[0],
    featured: false
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      loadProjects();
    }
  }, [isAuthenticated, router]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
      
      // Don't logout on error, just show message
      const errorMessage = error instanceof Error ? error.message : "Eroare necunoscută";
      alert(`Eroare la încărcarea proiectelor: ${errorMessage}\n\nVerifică:\n1. Dacă ai rulat SQL-ul în Supabase\n2. Dacă tabelul 'projects' există\n3. Conexiunea la internet`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await projectService.uploadImage(file);
      setFormData({ ...formData, imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Eroare la încărcarea imaginii. Încearcă din nou.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location || !formData.imageUrl || !formData.completedDate) {
      alert("Te rog completează toate câmpurile obligatorii.");
      return;
    }

    try {
      setSubmitting(true);
      
      if (editingId) {
        await projectService.updateProject(editingId, formData);
      } else {
        await projectService.createProject(formData as Omit<Project, "id">);
      }
      
      await loadProjects();
      resetForm();
      alert(editingId ? "Proiect actualizat cu succes!" : "Proiect adăugat cu succes!");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Eroare la salvarea proiectului. Încearcă din nou.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      location: project.location,
      imageUrl: project.imageUrl,
      category: project.category,
      power: project.power || "",
      completedDate: project.completedDate,
      featured: project.featured || false
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest proiect? Acțiunea este permanentă.")) {
      return;
    }

    try {
      await projectService.deleteProject(id);
      await loadProjects();
      alert("Proiect șters cu succes!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Eroare la ștergerea proiectului. Încearcă din nou.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      imageUrl: "",
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
              <h1 className="text-3xl font-bold text-white mb-2">
                Panou de Administrare
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-blue-200">Bine ai revenit, {userEmail}</p>
                {userRole === 'super_admin' ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30">
                    <Crown className="w-3 h-3" />
                    Super Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              {isSuperAdmin && (
                <Link href="/admin/users">
                  <Button variant="outline" className="gap-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                    <Users className="w-4 h-4" />
                    Utilizatori
                  </Button>
                </Link>
              )}
              <Button
                onClick={logout}
                variant="outline"
                className="gap-2 border-red-500/50 text-red-300 hover:bg-red-500/20"
              >
                <LogOut className="w-4 h-4" />
                Deconectare
              </Button>
            </div>
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
                    <Label htmlFor="image">Imagine Proiect *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="bg-background/50 border-white/10"
                      />
                      {uploadingImage && <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />}
                    </div>
                    {formData.imageUrl && (
                      <p className="text-xs text-emerald-400">✓ Imagine încărcată</p>
                    )}
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
                    disabled={submitting || uploadingImage}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Se salvează...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingId ? "Salvează Modificări" : "Adaugă Proiect"}
                      </>
                    )}
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
            
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-4" />
                <p className="text-muted-foreground">Se încarcă proiectele...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 glass-card rounded-2xl">
                <p className="text-muted-foreground text-lg mb-4">
                  Nu există proiecte încă.
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adaugă Primul Proiect
                </Button>
              </div>
            ) : (
              projects.map((project, index) => (
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
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}