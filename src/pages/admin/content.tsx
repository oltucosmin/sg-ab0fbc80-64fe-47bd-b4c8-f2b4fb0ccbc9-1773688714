import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Globe, Save, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"];
type PageContent = Database["public"]["Tables"]["page_content"]["Row"];

export default function ContentManagement() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [pageContent, setPageContent] = useState<PageContent[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    if (!user || !isAdmin) {
      router.push("/admin/login");
      return;
    }
    await Promise.all([fetchSettings(), fetchPageContent()]);
  }

  async function fetchSettings() {
    try {
      const { data, error } = await (supabase
        .from("site_settings") as any)
        .select("*")
        .order("key");

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca setările",
        variant: "destructive",
      });
    }
  }

  async function fetchPageContent() {
    try {
      const { data, error } = await (supabase
        .from("page_content") as any)
        .select("*")
        .order("page, section, key");

      if (error) throw error;
      setPageContent(data || []);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut încărca conținutul",
        variant: "destructive",
      });
    }
  }

  async function saveSetting(key: string, value: string) {
    try {
      setSaving(true);
      
      const { error } = await (supabase
        .from("site_settings") as any)
        .update({ value })
        .eq("key", key);

      if (error) throw error;

      toast({
        title: "Succes",
        description: "Setarea a fost salvată",
      });

      await fetchSettings();
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva setarea",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  async function savePageContent(id: string, page: string, section: string, value: string) {
    try {
      setSaving(true);
      
      const { error } = await (supabase
        .from("page_content") as any)
        .update({ value })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Succes",
        description: "Conținutul a fost salvat",
      });

      await fetchPageContent();
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva conținutul",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  const contactSettings = settings.filter(s => s.key.startsWith("contact_"));
  const socialSettings = settings.filter(s => s.key.startsWith("social_"));
  const seoSettings = settings.filter(s => s.key.startsWith("seo_"));
  const homeContent = pageContent.filter(c => c.page === "home");

  const getSettingIcon = (key: string) => {
    if (key.includes("phone")) return Phone;
    if (key.includes("email")) return Mail;
    if (key.includes("address")) return MapPin;
    if (key.includes("facebook")) return Facebook;
    if (key.includes("instagram")) return Instagram;
    if (key.includes("linkedin")) return Linkedin;
    return Globe;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestionare Conținut</h1>
          <p className="text-slate-400">Editează informațiile afișate pe site</p>
        </div>

        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="pages">Conținut Pagini</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informații Contact</CardTitle>
                <CardDescription>
                  Actualizează datele de contact afișate pe site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactSettings.map((setting) => {
                  const SettingIcon = getSettingIcon(setting.key);
                  return (
                    <div key={setting.id} className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <SettingIcon className="h-4 w-4" />
                        {setting.key}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          defaultValue={setting.value || ""}
                          id={`setting-${setting.id}`}
                          placeholder={setting.key}
                        />
                        <Button
                          onClick={() => {
                            const input = document.getElementById(`setting-${setting.id}`) as HTMLInputElement;
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

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Link-uri Social Media</CardTitle>
                <CardDescription>
                  Actualizează link-urile către rețelele sociale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialSettings.map((setting) => {
                  const SettingIcon = getSettingIcon(setting.key);
                  return (
                    <div key={setting.id} className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <SettingIcon className="h-4 w-4" />
                        {setting.key}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          defaultValue={setting.value || ""}
                          id={`setting-${setting.id}`}
                          placeholder={setting.key}
                        />
                        <Button
                          onClick={() => {
                            const input = document.getElementById(`setting-${setting.id}`) as HTMLInputElement;
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

          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conținut Pagini</CardTitle>
                <CardDescription>
                  Editează textele afișate pe diferitele pagini ale site-ului
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {homeContent.map((content) => (
                  <div key={content.id} className="space-y-2">
                    <Label>
                      {content.page} - {content.section} - {content.key}
                    </Label>
                    <div className="flex gap-2">
                      {content.key.includes("description") ? (
                        <Textarea
                          defaultValue={content.value || ""}
                          id={`content-${content.id}`}
                          rows={4}
                        />
                      ) : (
                        <Input
                          defaultValue={content.value || ""}
                          id={`content-${content.id}`}
                        />
                      )}
                      <Button
                        onClick={() => {
                          const element = document.getElementById(`content-${content.id}`) as HTMLInputElement | HTMLTextAreaElement;
                          savePageContent(content.id, content.page, content.section, element.value);
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

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Setări SEO</CardTitle>
                <CardDescription>
                  Optimizează site-ul pentru motoarele de căutare
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {seoSettings.map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      {setting.key}
                    </Label>
                    <div className="flex gap-2">
                      {setting.key === "seo_description" ? (
                        <Textarea
                          defaultValue={setting.value || ""}
                          id={`setting-${setting.id}`}
                          placeholder={setting.key}
                          rows={3}
                        />
                      ) : (
                        <Input
                          defaultValue={setting.value || ""}
                          id={`setting-${setting.id}`}
                          placeholder={setting.key}
                        />
                      )}
                      <Button
                        onClick={() => {
                          const element = document.getElementById(`setting-${setting.id}`) as HTMLInputElement | HTMLTextAreaElement;
                          saveSetting(setting.key, element.value);
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
  );
}