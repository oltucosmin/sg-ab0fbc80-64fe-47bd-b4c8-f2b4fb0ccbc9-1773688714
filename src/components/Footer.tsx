import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";
import { OikosLogo } from "@/components/OikosLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/50 border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <OikosLogo 
                size="md" 
                className="drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]" 
              />
              <span className="text-lg font-heading font-bold text-gradient">
                Oikos Energy
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Energie verde pentru viitorul tău. Soluții profesionale în energie regenerabilă.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Link-uri Rapide</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                  Acasă
                </Link>
              </li>
              <li>
                <Link href="/proiecte" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                  Proiecte
                </Link>
              </li>
              <li>
                <Link href="/servicii" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                  Servicii
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Servicii</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Panouri Solare</li>
              <li className="text-sm text-muted-foreground">Pompe de Căldură</li>
              <li className="text-sm text-muted-foreground">Consultanță Energetică</li>
              <li className="text-sm text-muted-foreground">Întreținere & Suport</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <span>contact@oikosenergy.ro</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <span>+40 XXX XXX XXX</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <span>România</span>
              </li>
            </ul>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/10 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-emerald-400" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/10 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-emerald-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Oikos Energy. Toate drepturile rezervate.
          </p>
          <div className="flex space-x-6">
            <Link href="/politica-confidentialitate" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
              Politica de Confidențialitate
            </Link>
            <Link href="/termeni" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
              Termeni și Condiții
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}