import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card rounded-2xl p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Cookie-uri și Confidențialitate
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Folosim cookie-uri pentru a îmbunătăți experiența ta pe site-ul nostru, 
                pentru a analiza traficul și pentru a personaliza conținutul. Prin continuarea 
                navigării, ești de acord cu{" "}
                <Link href="/politica-confidentialitate" className="text-emerald-400 hover:underline">
                  Politica de Confidențialitate
                </Link>
                {" "}a noastră.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={acceptCookies}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
                >
                  Accept Cookie-uri
                </Button>
                <Button
                  onClick={declineCookies}
                  variant="outline"
                  className="border-white/20 hover:bg-white/5"
                >
                  Refuz
                </Button>
              </div>
            </div>
            <button
              onClick={declineCookies}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors shrink-0"
              aria-label="Închide"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}