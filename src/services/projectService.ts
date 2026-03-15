import { supabase } from '@/lib/supabase';
import type { Project } from '@/types/project';

export const projectService = {
  async getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('completed_date', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return (data || []).map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      location: project.location,
      imageUrl: project.image_url,
      category: project.category,
      power: project.power || undefined,
      completedDate: project.completed_date,
      featured: project.featured || false
    }));
  },

  async getProjectById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching project:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      location: data.location,
      imageUrl: data.image_url,
      category: data.category,
      power: data.power || undefined,
      completedDate: data.completed_date,
      featured: data.featured || false
    };
  },

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        title: project.title,
        description: project.description,
        location: project.location,
        image_url: project.imageUrl,
        category: project.category,
        power: project.power || null,
        completed_date: project.completedDate,
        featured: project.featured || false
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating project:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      location: data.location,
      imageUrl: data.image_url,
      category: data.category,
      power: data.power || undefined,
      completedDate: data.completed_date,
      featured: data.featured || false
    };
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const updateData: any = {};
    
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.power !== undefined) updateData.power = updates.power || null;
    if (updates.completedDate !== undefined) updateData.completed_date = updates.completedDate;
    if (updates.featured !== undefined) updateData.featured = updates.featured;
    
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating project:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      location: data.location,
      imageUrl: data.image_url,
      category: data.category,
      power: data.power || undefined,
      completedDate: data.completed_date,
      featured: data.featured || false
    };
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};