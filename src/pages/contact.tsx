import { useState, FormEvent } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { submitContactForm } from "@/services/contactService";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    gdprConsent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        gdprConsent: formData.gdprConsent,
      });

      if (result.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          gdprConsent: false,
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("A apărut o eroare. Vă rugăm încercați din nou.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO 
        title="Contact - Oikos Energy"
        description="Contactează-ne pentru o consultație gratuită. Echipa Oikos Energy este aici să îți răspundă la toate întrebările despre energia verde."
        url="https://oikosenergy.ro/contact"
      />
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Hai să <span className="text-gradient">Vorbim</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Suntem aici pentru a răspunde la întrebările tale și pentru a-ți oferi 
              o consultație gratuită personalizată pentru nevoile tale energetice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6 animate-slide-up">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Informații de Contact
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 glow-emerald">
                      <Mail className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                      <a href="mailto:contact@oikosenergy.ro" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                        contact@oikosenergy.ro
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lime-400/20 flex items-center justify-center shrink-0 glow-lime">
                      <Phone className="w-6 h-6 text-lime-400" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">Telefon</h3>
                      <a href="tel:+40XXXXXXXXX" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                        +40 XXX XXX XXX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 glow-emerald">
                      <MapPin className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">Locație</h3>
                      <p className="text-muted-foreground">
                        România<br />
                        Acoperire națională
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                  Program de Lucru
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Luni - Vineri:</span>
                    <span className="text-foreground font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sâmbătă:</span>
                    <span className="text-foreground font-semibold">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duminică:</span>
                    <span className="text-muted-foreground">Închis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 animate-slide-up delay-100">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Trimite un Mesaj
              </h2>

              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-400">
                    Mesajul tău a fost trimis cu succes! Te vom contacta în curând.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nume Complet *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Ion Popescu"
                    className="bg-background/50 border-white/10 focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="ion@example.com"
                    className="bg-background/50 border-white/10 focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+40 XXX XXX XXX"
                    className="bg-background/50 border-white/10 focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mesaj *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Spune-ne cum te putem ajuta..."
                    className="bg-background/50 border-white/10 focus:border-emerald-500/50"
                  />
                </div>

                {/* GDPR Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-cyan-500/30 bg-slate-900/50 text-cyan-500 focus:ring-2 focus:ring-cyan-500/50"
                    required
                  />
                  <label htmlFor="gdprConsent" className="text-sm text-slate-300">
                    Sunt de acord cu{" "}
                    <Link href="/politica-confidentialitate" className="text-cyan-400 hover:text-cyan-300 underline">
                      politica de confidențialitate
                    </Link>{" "}
                    și procesarea datelor personale.*
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Trimite Mesaj
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}