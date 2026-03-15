import type { Project } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Instalație Fotovoltaică Rezidențială Premium",
    description: "Sistem complet de 10kW cu panouri monocristaline de ultimă generație și invertor hibrid cu baterii de stocare. Economii de 85% la factura de energie.",
    location: "București, Sector 1",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    category: "solar",
    power: "10 kW",
    completedDate: "2024-11-15",
    featured: true
  },
  {
    id: "2",
    title: "Sistem Fotovoltaic Industrial",
    description: "Parc solar de 150kW pentru fabrică de producție. Sistem on-grid cu monitorizare în timp real și optimizare automată a consumului.",
    location: "Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    category: "solar",
    power: "150 kW",
    completedDate: "2024-10-20",
    featured: true
  },
  {
    id: "3",
    title: "Pompă de Căldură Aer-Apă",
    description: "Instalație completă pentru încălzire și apă caldă menajeră într-o vilă de 250mp. COP 4.5, reducere de 70% a costurilor de încălzire.",
    location: "Brașov",
    imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
    category: "heat-pump",
    completedDate: "2024-09-10"
  },
  {
    id: "4",
    title: "Sistem Hibrid Fotovoltaic + Pompă de Căldură",
    description: "Soluție completă de eficientizare energetică: 8kW panouri + pompă de căldură 12kW + baterii 10kWh. Independență energetică de 90%.",
    location: "Sibiu",
    imageUrl: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
    category: "hybrid",
    power: "8 kW solar + 12 kW pompă",
    completedDate: "2024-08-25",
    featured: true
  },
  {
    id: "5",
    title: "Panou Fotovoltaic Agricol",
    description: "Sistem de irigație alimentat solar pentru fermă ecologică de 5 hectare. Autonomie completă și costuri zero de operare.",
    location: "Timișoara",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    category: "solar",
    power: "25 kW",
    completedDate: "2024-07-18"
  },
  {
    id: "6",
    title: "Instalație Rezidențială cu Stocare",
    description: "Sistem fotovoltaic 6kW cu baterii Tesla Powerwall 13.5kWh. Backup automat în caz de pană de curent.",
    location: "Iași",
    imageUrl: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80",
    category: "solar",
    power: "6 kW + 13.5 kWh stocare",
    completedDate: "2024-06-30"
  }
];