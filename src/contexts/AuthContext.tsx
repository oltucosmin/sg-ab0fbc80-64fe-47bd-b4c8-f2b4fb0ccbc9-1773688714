import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { userService, type UserRole } from "@/services/userService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  userEmail: string | null;
  userId: string | null;
  userRole: UserRole | null;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const isSuperAdmin = userRole === 'super_admin';
  const isAdmin = userRole === 'admin' || userRole === 'super_admin';

  const loadUserRole = async (uid: string) => {
    try {
      const role = await userService.getCurrentUserRole(uid);
      setUserRole(role);
    } catch (error) {
      console.error("Error loading user role:", error);
      setUserRole('admin'); // Default to admin if error
    }
  };

  const refreshRole = async () => {
    if (userId) {
      await loadUserRole(userId);
    }
  };

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
        setUserId(session.user.id);
        await loadUserRole(session.user.id);
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
        setUserId(session.user.id);
        await loadUserRole(session.user.id);
      } else {
        setIsAuthenticated(false);
        setUserEmail(null);
        setUserId(null);
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return false;
      }

      if (data.user) {
        setIsAuthenticated(true);
        setUserEmail(data.user.email || null);
        setUserId(data.user.id);
        await loadUserRole(data.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login exception:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUserEmail(null);
      setUserId(null);
      setUserRole(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user: null,
      isAuthenticated, 
      login, 
      logout, 
      userEmail, 
      userId,
      userRole,
      isSuperAdmin,
      isAdmin,
      refreshRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}