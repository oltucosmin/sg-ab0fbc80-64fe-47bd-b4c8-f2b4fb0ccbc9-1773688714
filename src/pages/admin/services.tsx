import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["services"]["Row"];
type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];

export default function ServicesManagement() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState<ServiceInsert>({
    title: "",
    description: "",
    icon: "",
    features: [],
    display_order: 1,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Zap",
    features: "",
    order_index: 0,
    is_active: true
  });

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push("/admin/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .single();

    if (!roleData || !["admin", "super_admin"].includes((roleData as { role: string }).role)) {
      router.push("/admin/login");
      return;
    }

    loadServices();
  }

  async function loadServices() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      if (data) setServices(data);
    } catch (error) {
      console.error("Error loading services:", error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca serviciile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function saveService(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);

      const serviceData = {
        title: newService.title,
        description: newService.description,
        icon: newService.icon,
        features: newService.features,
        display_order: newService.display_order,
        is_active: newService.is_active,
        updated_at: new Date().toISOString(),
      };

      if (editingService) {
        const { error } = await (supabase
          .from("services") as any)
          .update(serviceData)
          .eq("id", editingService.id);

        if (error) throw error;
      } else {
        const { error } = await (supabase
          .from("services") as any)
          .insert([serviceData]);

        if (error) throw error;
      }

      toast({
        title: "Salvat cu succes",
        description: `Serviciul a fost ${editingService ? "actualizat" : "creat"}.`,
      });

      setDialogOpen(false);
      resetForm();
      loadServices();
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva serviciul.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(service: Service) {
    try {
      const { error } = await (supabase
        .from("services") as any)
        .update({ is_active: !service.is_active })
        .eq("id", service.id);

      if (error) throw error;

      toast({
        title: "Status actualizat",
        description: `Serviciul a fost ${!service.is_active ? "activat" : "dezactivat"}.`,
      });

      loadServices();
    } catch (error) {
      console.error("Error toggling service:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut actualiza statusul",
        variant: "destructive",
      });
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Ești sigur că vrei să ștergi acest serviciu?")) return;

    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Șters!",
        description: "Serviciul a fost șters cu succes"
      });

      loadServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge serviciul",
        variant: "destructive"
      });
    }
  }

  function openEditDialog(service: Service) {
    setEditingService(service);
    setNewService({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features,
      display_order: service.display_order,
      is_active: service.is_active
    });
    setDialogOpen(true);
  }

  function resetForm() {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      icon: "Zap",
      features: "",
      order_index: 0,
      is_active: true
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Se încarcă...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Gestionare Servicii - Admin Oikos Energy"
        description="Panou administrare servicii"
      />
      
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Gestionare Servicii</h1>
              <div className="flex gap-2">
                <Dialog open={dialogOpen} onOpenChange={(open) => {
                  setDialogOpen(open);
                  if (!open) resetForm();
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Serviciu Nou
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingService ? "Editează Serviciu" : "Adaugă Serviciu Nou"}
                      </DialogTitle>
                      <DialogDescription>
                        Completează informațiile despre serviciu
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={saveService} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Titlu</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Descriere</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icoană (nume Lucide)</Label>
                        <Input
                          id="icon"
                          value={formData.icon}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                          placeholder="Ex: Sun, Zap, Battery"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="features">Caracteristici (una per linie)</Label>
                        <Textarea
                          id="features"
                          value={formData.features}
                          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                          rows={4}
                          placeholder="Consultanță gratuită&#10;Instalare profesională&#10;Garanție extinsă"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="order">Ordine</Label>
                          <Input
                            id="order"
                            type="number"
                            value={formData.order_index}
                            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="active">Status</Label>
                          <select
                            id="active"
                            value={formData.is_active ? "true" : "false"}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.value === "true" })}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          >
                            <option value="true">Activ</option>
                            <option value="false">Inactiv</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">
                          {editingService ? "Actualizează" : "Adaugă"} Serviciu
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
                  Înapoi la Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Servicii ({services.length})</CardTitle>
              <CardDescription>Gestionează serviciile afișate pe site</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titlu</TableHead>
                    <TableHead>Descriere</TableHead>
                    <TableHead>Caracteristici</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell className="max-w-md truncate">{service.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {service.features.length} caracteristici
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={service.is_active ? "default" : "secondary"}>
                          {service.is_active ? "Activ" : "Inactiv"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleActive(service)}
                          >
                            {service.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {services.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nu există servicii. Adaugă primul serviciu!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}