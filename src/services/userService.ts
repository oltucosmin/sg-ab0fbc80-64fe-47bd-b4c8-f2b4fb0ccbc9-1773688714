import { supabase } from "@/lib/supabase";

export type UserRole = 'super_admin' | 'admin';

export interface AdminUser {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
}

export const userService = {
  // Get all admin users with their roles
  async getAllUsers(): Promise<AdminUser[]> {
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error("Error fetching users:", authError);
      throw new Error(authError.message);
    }

    // Fetch roles for all users
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('user_id, role') as any;

    if (rolesError) {
      console.error("Error fetching roles:", rolesError);
      throw new Error(rolesError.message);
    }

    // Create a map of user_id to role
    const rolesMap = new Map(rolesData?.map((r: any) => [r.user_id, r.role]) || []);

    return authData.users.map(user => ({
      id: user.id,
      email: user.email || "",
      role: rolesMap.get(user.id) || 'admin', // Default to 'admin' if no role set
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at || null,
      email_confirmed_at: user.email_confirmed_at || null
    }));
  },

  // Get current user's role
  async getCurrentUserRole(userId: string): Promise<UserRole> {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single() as any;

    if (error) {
      // If no role exists, default to 'admin'
      if (error.code === 'PGRST116') {
        return 'admin';
      }
      throw new Error(error.message);
    }

    return data?.role || 'admin';
  },

  // Check if user is super admin
  async isSuperAdmin(userId: string): Promise<boolean> {
    const role = await this.getCurrentUserRole(userId);
    return role === 'super_admin';
  },

  // Create new admin user with role
  async createUser(email: string, password: string, role: UserRole = 'admin'): Promise<{ success: boolean; error?: string }> {
    try {
      // Create the auth user
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: "Failed to create user" };
      }

      // Assign role to the user
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: data.user.id,
          role: role
        } as any);

      if (roleError) {
        // Rollback: delete the auth user if role assignment fails
        await supabase.auth.admin.deleteUser(data.user.id);
        return { success: false, error: `User created but role assignment failed: ${roleError.message}` };
      }

      return { success: true };
    } catch (error) {
      console.error("Create user error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  },

  // Update user role (super_admin only)
  async updateUserRole(userId: string, newRole: UserRole): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: newRole
        } as any);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Update role error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  },

  // Reset user password
  async resetPassword(userId: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        password: newPassword
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  },

  // Delete user (cannot delete super_admins unless you are super_admin)
  async deleteUser(userId: string, currentUserRole: UserRole): Promise<{ success: boolean; error?: string }> {
    try {
      // Get the target user's role
      const targetRole = await this.getCurrentUserRole(userId);

      // Only super_admins can delete super_admins
      if (targetRole === 'super_admin' && currentUserRole !== 'super_admin') {
        return { success: false, error: "Doar Super Admins pot șterge alți Super Admins" };
      }

      // Delete the user (cascade will delete the role)
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Delete user error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }
};