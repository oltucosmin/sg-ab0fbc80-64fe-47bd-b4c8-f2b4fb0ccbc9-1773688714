import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO 
        title="Politica de Confidențialitate - Oikos Energy"
        description="Politica de confidențialitate și protecția datelor personale Oikos Energy, conform GDPR."
        url="https://oikosenergy.ro/politica-confidentialitate"
      />
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8">
              Politica de <span className="text-gradient">Confidențialitate</span>
            </h1>

            <div className="glass-card rounded-2xl p-8 space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  1. Introducere
                </h2>
                <p className="leading-relaxed">
                  Oikos Energy („noi", „ne" sau „al nostru") respectă confidențialitatea vizitatorilor 
                  site-ului web oikosenergy.ro și se angajează să protejeze datele personale pe care 
                  le colectăm. Această politică de confidențialitate explică cum colectăm, folosim și 
                  protejăm informațiile dumneavoastră personale, în conformitate cu Regulamentul General 
                  privind Protecția Datelor (GDPR).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  2. Date Personale pe care le Colectăm
                </h2>
                <p className="leading-relaxed mb-4">
                  Colectăm următoarele categorii de date personale:
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>Date de identificare: nume, prenume</li>
                  <li>Date de contact: adresă de email, număr de telefon</li>
                  <li>Date de navigare: adresă IP, cookies, istoricul paginilor vizitate</li>
                  <li>Date furnizate voluntar: mesaje trimise prin formularul de contact</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  3. Scopul Prelucrării Datelor
                </h2>
                <p className="leading-relaxed mb-4">
                  Folosim datele dumneavoastră personale pentru:
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>Răspunsul la solicitările primite prin formularul de contact</li>
                  <li>Furnizarea de informații despre produsele și serviciile noastre</li>
                  <li>Îmbunătățirea experienței pe site-ul nostru</li>
                  <li>Analiza traficului și a comportamentului utilizatorilor</li>
                  <li>Respectarea obligațiilor legale</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  4. Cookies
                </h2>
                <p className="leading-relaxed">
                  Site-ul nostru folosește cookies pentru a îmbunătăți experiența de navigare. 
                  Cookie-urile sunt mici fișiere text stocate pe dispozitivul dumneavoastră. 
                  Puteți configura browserul pentru a refuza cookie-urile, dar unele funcționalități 
                  ale site-ului ar putea să nu funcționeze corect. Prin continuarea navigării pe site, 
                  sunteți de acord cu utilizarea cookie-urilor conform acestei politici.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  5. Partajarea Datelor
                </h2>
                <p className="leading-relaxed">
                  Nu vindem, nu închiriem și nu partajăm datele dumneavoastră personale cu terțe 
                  părți în scopuri de marketing. Datele pot fi partajate doar cu furnizorii de 
                  servicii care ne ajută să operăm site-ul (hosting, analiză), cu respectarea 
                  strictă a confidențialității.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  6. Drepturile Dumneavoastră
                </h2>
                <p className="leading-relaxed mb-4">
                  În conformitate cu GDPR, aveți următoarele drepturi:
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>Dreptul de acces la datele personale</li>
                  <li>Dreptul de rectificare a datelor incorecte</li>
                  <li>Dreptul de ștergere a datelor („dreptul de a fi uitat")</li>
                  <li>Dreptul de a restricționa prelucrarea</li>
                  <li>Dreptul la portabilitatea datelor</li>
                  <li>Dreptul de a vă opune prelucrării</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Pentru exercitarea acestor drepturi, ne puteți contacta la{" "}
                  <a href="mailto:contact@oikosenergy.ro" className="text-emerald-400 hover:underline">
                    contact@oikosenergy.ro
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  7. Securitatea Datelor
                </h2>
                <p className="leading-relaxed">
                  Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele 
                  dumneavoastră personale împotriva accesului neautorizat, pierderii sau distrugerii. 
                  Datele sunt stocate pe servere securizate și sunt accesibile doar personalului autorizat.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  8. Păstrarea Datelor
                </h2>
                <p className="leading-relaxed">
                  Păstrăm datele dumneavoastră personale doar atât timp cât este necesar pentru 
                  îndeplinirea scopurilor pentru care au fost colectate sau conform cerințelor legale.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  9. Modificări ale Politicii
                </h2>
                <p className="leading-relaxed">
                  Ne rezervăm dreptul de a modifica această politică de confidențialitate. 
                  Modificările vor fi publicate pe această pagină cu data actualizării.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  10. Contact
                </h2>
                <p className="leading-relaxed">
                  Pentru întrebări legate de această politică de confidențialitate sau despre modul 
                  în care prelucrăm datele dumneavoastră, ne puteți contacta la:
                </p>
                <div className="mt-4 space-y-2">
                  <p>Email: <a href="mailto:contact@oikosenergy.ro" className="text-emerald-400 hover:underline">contact@oikosenergy.ro</a></p>
                  <p>Telefon: +40 XXX XXX XXX</p>
                </div>
              </section>

              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-muted-foreground">
                  Ultima actualizare: {new Date().toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}