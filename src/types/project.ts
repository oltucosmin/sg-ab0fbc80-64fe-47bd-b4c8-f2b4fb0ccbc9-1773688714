export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  category: "solar" | "heat-pump" | "hybrid";
  power?: string;
  completedDate: string;
  featured?: boolean;
}