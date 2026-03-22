import { supabase } from "@/lib/supabase";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createProject(project: ProjectInsert): Promise<Project> {
  const { data: projectData, error } = await (supabase
    .from("projects") as any)
    .insert([project])
    .select()
    .single();

  if (error || !projectData) {
    throw new Error(error?.message || "Failed to create project");
  }

  return projectData;
}

export async function updateProject(
  id: string,
  updates: ProjectUpdate
): Promise<Project> {
  const { data, error } = await (supabase
    .from("projects") as any)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to update project");
  }

  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await (supabase
    .from("projects") as any)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message || "Failed to delete project");
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return data || [];
}

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(uploadError.message || "Failed to upload image");
  }

  const { data } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function toggleFeatured(
  id: string,
  isFeatured: boolean
): Promise<void> {
  const { error } = await (supabase
    .from("projects") as any)
    .update({ is_featured: isFeatured })
    .eq("id", id);

  if (error) {
    throw new Error(error.message || "Failed to update featured status");
  }
}