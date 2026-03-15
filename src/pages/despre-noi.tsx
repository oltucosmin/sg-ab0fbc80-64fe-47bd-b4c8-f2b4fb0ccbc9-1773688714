import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Target, Eye, Hammer, Lightbulb, Package, Cog } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function DespreNoi() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Acasă",
        "item": "https://oikosenergy.ro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Despre Noi",
        "item": "https://oikosenergy.ro/despre-noi"
      }
    ]
  };

  return (
    <>
      <SEO
        title="Despre Noi - Oikos Energy | Companie Energie Solară din 2014 | Peste 500 Instalații"
        description="Oikos Energy - Companie privată înființată în 2014, specializată în construcția parcurilor fotovoltaice. Peste 500 de instalații realizate cu echipamente premium și tehnologie avansată."
        url="https://oikosenergy.ro/despre-noi"
        keywords="Oikos Energy, companie panouri fotovoltaice, parcuri solare Romania, echipamente fotovoltaice, experienta instalare panouri, firma energie verde"
        type="article"
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Cine suntem?
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Suntem o <span className="text-cyan-400 font-semibold">companie privată înființată în 2014</span>, cu o viziune concentrată pe inovație și dezvoltare durabilă.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="p-8 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 hover:scale-105 hover:border-cyan-500/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <Hammer className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Activitatea Principală</h2>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Construcția de parcuri fotovoltaice cu scopul de a implementa soluții energetice moderne și eficiente care contribuie la tranziția către surse de energie regenerabilă.
                </p>
              </Card>

              <Card className="p-8 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Cog className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Echipamente Avansate</h2>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Compania noastră dispune de echipamente avansate care ne permit să livrăm lucrări de înaltă calitate respectând termenele stabilite.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              Misiune & Viziune
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-cyan-500/20 rounded-full">
                    <Target className="w-10 h-10 text-cyan-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Misiunea Noastră</h3>
                </div>
                <p className="text-slate-200 text-lg leading-relaxed">
                  Misiunea noastră este de a construi parcuri fotovoltaice de înaltă performanță folosind tehnologie avansată și cele mai bune practici din industrie. Livrăm soluții personalizate cu impact minim asupra mediului, asigurând standarde de top în ceea ce privește calitatea și siguranța.
                </p>
              </Card>

              <Card className="p-10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-blue-500/20 rounded-full">
                    <Eye className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Viziunea Noastră</h3>
                </div>
                <p className="text-slate-200 text-lg leading-relaxed">
                  Viziunea noastră este de a conduce în energie regenerabilă prin dezvoltarea de parcuri fotovoltaice sustenabile care să susțină comunitățile și să protejeze mediul pentru generațiile viitoare.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-20 px-4 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
              Echipamentele Noastre
            </h2>
            <p className="text-xl text-slate-300 text-center mb-16 max-w-3xl mx-auto">
              Construim parcuri fotovoltaice folosind propriul echipament și personal calificat, asigurând ca fiecare fază a proiectului să fie executată cu precizie și să îndeplinească cele mai înalte standarde de calitate.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: "Baterii hidraulice",
                  description: "2 buc Turenki 260 P, cu coloane echipate cu extensie, înălțime maximă de instalare 4.5 m"
                },
                {
                  title: "Baterii hidraulice 300",
                  description: "4 buc Turenki 300, cu coloane echipate cu extensie, înălțime maximă de instalare 4 m"
                },
                {
                  title: "Excavator Case 580",
                  description: "3 buc Bosshoss Case 580 ST, echipate cu cupe de excavare, furci și burghie (hidromotor + burghiu)"
                },
                {
                  title: "Excavator Case 31",
                  description: "Excavator 31 tone Case CX300C, echipat cu hidromotor, cupe de excavare, furci și burghie (hidromotor + burghiu)"
                },
                {
                  title: "Excavator Case 9",
                  description: "Excavator 9 tone Case CX90D, echipat cu cupe de excavare, furci și burghie (hidromotor + burghiu)"
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-3 mb-3">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
              <p className="text-lg text-slate-200 text-center leading-relaxed">
                Aceste echipamente ne permit să realizăm proiecte complexe adaptate cerințelor specifice ale fiecărui proiect, asigurând <span className="text-cyan-400 font-semibold">eficiență și calitate</span>.
              </p>
            </Card>
          </div>
        </section>

        {/* Installation Methods */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
              Metode de Instalare
            </h2>
            <p className="text-xl text-slate-300 text-center mb-16 max-w-3xl mx-auto">
              În funcție de cerințele proiectului și caracteristicile solului, instalăm stâlpi folosind diverse metode.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <span className="text-3xl font-bold text-cyan-400">01</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Batere Hidraulică</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Prin ciocănirea lor în sol folosind baterii cu pile hidraulice - o metodă eficientă de instalare a stâlpilor în diverse parcuri fotovoltaice, care implică utilizarea echipamentelor specializate, cum ar fi baterii hidraulice și excavatoare pentru a fora gauri în sol.
                </p>
              </Card>

              <Card className="p-8 bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <span className="text-3xl font-bold text-blue-400">02</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Forare & Înșurubare</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Prin forare sau înșurubare, folosind excavatoare și benzi transportoare echipate cu hidromori și burghie - o metodă precisă, rapidă și versatilă de instalare a stâlpilor în sol, care permite forarea sau înșurubarea stâlpului direct în sol, asigurând o fundație stabilă și durabilă.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Complete Solutions */}
        <section className="py-20 px-4 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
              Soluții Complete pentru Proiectele Dumneavoastră
            </h2>
            <p className="text-xl text-slate-300 text-center mb-16 max-w-4xl mx-auto">
              În colaborare cu partenerii noștri, oferim soluții complete pentru proiectele dumneavoastră, inclusiv: design, consultanță specializată, furnizare completă de materiale, testare complexă a sarcinilor, execuție și punere în funcțiune.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Consultanță",
                  description: "Consultanță specializată pentru optimizarea proiectelor"
                },
                {
                  icon: Eye,
                  title: "Soluții de Design",
                  description: "Design profesional adaptat nevoilor specifice"
                },
                {
                  icon: Package,
                  title: "Furnizare Materiale",
                  description: "Aprovizionare completă cu materiale de calitate"
                },
                {
                  icon: Cog,
                  title: "Execuție & Punere în Funcțiune",
                  description: "Implementare și comisionare profesională"
                }
              ].map((service, index) => (
                <Card key={index} className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-400 text-sm">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-12 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
              <p className="text-lg text-slate-200 text-center leading-relaxed">
                Astfel, asigurăm <span className="text-cyan-400 font-semibold">implementarea cu succes a fiecărui proiect</span>, respectând cele mai înalte standarde de calitate.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Împreună creăm un viitor mai verde!
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Să discutăm cum putem colabora
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg">
                  Contactează-ne
                </Button>
              </Link>
              <Link href="/proiecte">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg">
                  Vezi Proiectele Noastre
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <p className="text-slate-400 mb-2">Telefon</p>
                <a href="tel:0740-688-686" className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg">
                  0740-688-686
                </a>
              </Card>
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <p className="text-slate-400 mb-2">Email</p>
                <a href="mailto:office@oikosenergy.ro" className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg">
                  office@oikosenergy.ro
                </a>
              </Card>
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <p className="text-slate-400 mb-2">Website</p>
                <a href="https://www.oikosenergy.ro" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg">
                  www.oikosenergy.ro
                </a>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}