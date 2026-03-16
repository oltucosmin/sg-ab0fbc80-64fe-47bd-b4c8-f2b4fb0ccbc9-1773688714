import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: string;
  category: string;
  label: string;
  description: string;
}

interface PageContent {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
  type: string;
}

export default function ContentManagement() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [pageContent, setPageContent] = useState<PageContent[]>([]);

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

    if (!roleData || !["admin", "super_admin"].includes(roleData.role)) {
      router.push("/admin/login");
      return;
    }

    loadData();
  }

  async function loadData() {
    setLoading(true);
    try {
      const [settingsRes, contentRes] = await Promise.all([
        supabase.from("site_settings").select("*").order("category", { ascending: true }),
        supabase.from("page_content").select("*").order("page", { ascending: true })
      ]);

      if (settingsRes.data) setSettings(settingsRes.data);
      if (contentRes.data) setPageContent(contentRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca datele",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  async function saveSetting(key: string, value: string) {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ value })
        .eq("key", key);

      if (error) throw error;

      setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));

      toast({
        title: "Salvat!",
        description: "Setarea a fost actualizată cu succes"
      });
    } catch (error) {
      console.error("Error saving setting:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva setarea",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  }

  async function savePageContent(id: string, value: string) {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("page_content")
        .update({ value })
        .eq("id", id);

      if (error) throw error;

      setPageContent(prev => prev.map(c => c.id === id ? { ...c, value } : c));

      toast({
        title: "Salvat!",
        description: "Conținutul a fost actualizat cu succes"
      });
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva conținutul",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  }

  const contactSettings = settings.filter(s => s.category === "contact");
  const socialSettings = settings.filter(s => s.category === "social");
  const seoSettings = settings.filter(s => s.category === "seo");
  const homeContent = pageContent.filter(c => c.page === "home");

  const getIcon = (key: string) => {
    const icons: Record<string, any> = {
      contact_phone: Phone,
      contact_email: Mail,
      contact_address: MapPin,
      social_facebook: Facebook,
      social_instagram: Instagram,
      social_linkedin: Linkedin,
      social_twitter: Twitter,
      seo_title: Globe,
      seo_description: Globe
    };
    return icons[key] || Globe;
  };

  if (loading) {
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
        title="Gestionare Conținut - Admin Oikos Energy"
        description="Panou administrare conținut site"
      />
      
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Gestionare Conținut Site</h1>
              <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
                Înapoi la Dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="contact" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="content">Conținut Pagini</TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informații Contact</CardTitle>
                  <CardDescription>
                    Actualizează informațiile de contact afișate pe site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactSettings.map(setting => {
                    const Icon = getIcon(setting.key);
                    return (
                      <div key={setting.id} className="space-y-2">
                        <Label htmlFor={setting.key} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {setting.label}
                        </Label>
                        {setting.description && (
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        )}
                        <div className="flex gap-2">
                          <Input
                            id={setting.key}
                            type={setting.type}
                            defaultValue={setting.value}
                            placeholder={setting.label}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => {
                              const input = document.getElementById(setting.key) as HTMLInputElement;
                              saveSetting(setting.key, input.value);
                            }}
                            disabled={saving}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Salvează
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Link-uri Social Media</CardTitle>
                  <CardDescription>
                    Actualizează link-urile către profilurile de social media
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {socialSettings.map(setting => {
                    const Icon = getIcon(setting.key);
                    return (
                      <div key={setting.id} className="space-y-2">
                        <Label htmlFor={setting.key} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {setting.label}
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id={setting.key}
                            type="url"
                            defaultValue={setting.value}
                            placeholder={`https://...`}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => {
                              const input = document.getElementById(setting.key) as HTMLInputElement;
                              saveSetting(setting.key, input.value);
                            }}
                            disabled={saving}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Salvează
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Setări SEO</CardTitle>
                  <CardDescription>
                    Optimizează site-ul pentru motoarele de căutare
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {seoSettings.map(setting => (
                    <div key={setting.id} className="space-y-2">
                      <Label htmlFor={setting.key}>{setting.label}</Label>
                      {setting.description && (
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      )}
                      <div className="flex gap-2">
                        {setting.key === "seo_description" ? (
                          <Textarea
                            id={setting.key}
                            defaultValue={setting.value}
                            placeholder={setting.label}
                            className="flex-1"
                            rows={3}
                          />
                        ) : (
                          <Input
                            id={setting.key}
                            type="text"
                            defaultValue={setting.value}
                            placeholder={setting.label}
                            className="flex-1"
                          />
                        )}
                        <Button
                          onClick={() => {
                            const input = document.getElementById(setting.key) as HTMLInputElement | HTMLTextAreaElement;
                            saveSetting(setting.key, input.value);
                          }}
                          disabled={saving}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Salvează
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conținut Pagină Principală</CardTitle>
                  <CardDescription>
                    Editează textele de pe pagina principală
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {homeContent.map(content => (
                    <div key={content.id} className="space-y-2">
                      <Label htmlFor={content.id}>
                        {content.section.charAt(0).toUpperCase() + content.section.slice(1)} - {content.key}
                      </Label>
                      <div className="flex gap-2">
                        {content.type === "html" || content.key === "description" ? (
                          <Textarea
                            id={content.id}
                            defaultValue={content.value}
                            className="flex-1"
                            rows={4}
                          />
                        ) : (
                          <Input
                            id={content.id}
                            type="text"
                            defaultValue={content.value}
                            className="flex-1"
                          />
                        )}
                        <Button
                          onClick={() => {
                            const input = document.getElementById(content.id) as HTMLInputElement | HTMLTextAreaElement;
                            savePageContent(content.id, input.value);
                          }}
                          disabled={saving}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Salvează
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}