export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  category: "solar" | "heat-pump" | "hybrid";
  power?: string;
  completedDate: string;
  featured?: boolean;
}