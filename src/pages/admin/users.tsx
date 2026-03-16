import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { userService, type AdminUser, type UserRole } from "@/services/userService";
import { User, Plus, Key, Trash2, Shield, ShieldCheck, X, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminUsers() {
  const router = useRouter();
  const { isAuthenticated, userId, userRole, isSuperAdmin, refreshRole } = useAuth();
  
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Add user state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("admin");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  
  // Reset password state
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  
  // Change role state
  const [roleChangeUserId, setRoleChangeUserId] = useState<string | null>(null);
  const [roleChangeLoading, setRoleChangeLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    // Check if user has permission to view users page
    if (userRole && userRole !== 'super_admin') {
      router.push("/admin/dashboard");
      return;
    }

    loadUsers();
  }, [isAuthenticated, userRole, router]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
      setError("Eroare la încărcarea utilizatorilor");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail || !newPassword) {
      setAddError("Completează toate câmpurile");
      return;
    }

    if (newPassword.length < 6) {
      setAddError("Parola trebuie să aibă minim 6 caractere");
      return;
    }

    setAddLoading(true);
    setAddError(null);

    const result = await userService.createUser(newEmail, newPassword, newRole);

    if (result.success) {
      setNewEmail("");
      setNewPassword("");
      setNewRole("admin");
      setShowAddForm(false);
      await loadUsers();
    } else {
      setAddError(result.error || "Eroare la crearea utilizatorului");
    }

    setAddLoading(false);
  };

  const handleResetPassword = async (targetUserId: string) => {
    if (!resetPassword || resetPassword.length < 6) {
      setError("Parola trebuie să aibă minim 6 caractere");
      return;
    }

    setResetLoading(true);
    setError(null);

    const result = await userService.resetPassword(targetUserId, resetPassword);

    if (result.success) {
      setResetUserId(null);
      setResetPassword("");
      alert("Parola a fost resetată cu succes!");
    } else {
      setError(result.error || "Eroare la resetarea parolei");
    }

    setResetLoading(false);
  };

  const handleChangeRole = async (targetUserId: string, newTargetRole: UserRole) => {
    setRoleChangeLoading(true);
    setError(null);

    const result = await userService.updateUserRole(targetUserId, newTargetRole);

    if (result.success) {
      setRoleChangeUserId(null);
      await loadUsers();
      
      // If changing own role, refresh auth context
      if (targetUserId === userId) {
        await refreshRole();
      }
      
      alert(`Rolul a fost actualizat la ${newTargetRole === 'super_admin' ? 'Super Admin' : 'Admin'}`);
    } else {
      setError(result.error || "Eroare la schimbarea rolului");
    }

    setRoleChangeLoading(false);
  };

  const handleDeleteUser = async (targetUserId: string, targetUserEmail: string) => {
    if (targetUserId === userId) {
      alert("Nu poți șterge propriul cont!");
      return;
    }

    if (!confirm(`Ești sigur că vrei să ștergi utilizatorul ${targetUserEmail}?`)) {
      return;
    }

    setError(null);
    const result = await userService.deleteUser(targetUserId, userRole || 'admin');

    if (result.success) {
      await loadUsers();
    } else {
      setError(result.error || "Eroare la ștergerea utilizatorului");
    }
  };

  const getRoleBadge = (role: UserRole) => {
    if (role === 'super_admin') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30">
          <Crown className="w-3 h-3" />
          Super Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
        <Shield className="w-3 h-3" />
        Admin
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Se încarcă...</div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Gestionare Utilizatori - Admin Oikos Energy"
        description="Panou administrare utilizatori"
      />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-white">
                Gestionare Utilizatori
              </h1>
            </div>
            
            {isSuperAdmin && (
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showAddForm ? "Anulează" : "Adaugă Admin Nou"}
              </Button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 animate-fade-in">
              {error}
            </div>
          )}

          {/* Add User Form */}
          {showAddForm && isSuperAdmin && (
            <div className="mb-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4">Adaugă Administrator Nou</h2>
              
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="admin@oikosenergy.ro"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Parolă (minim 6 caractere)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="••••••"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rol
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-400">
                    Admin: Gestionează proiecte | Super Admin: Control complet (inclusiv utilizatori)
                  </p>
                </div>

                {addError && (
                  <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                    {addError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={addLoading}
                  className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  {addLoading ? "Se creează..." : "Creează Administrator"}
                </Button>
              </form>
            </div>
          )}

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-400">
                <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Nu există utilizatori înregistrați</p>
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in"
                >
                  {/* User Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.email}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(user.created_at).toLocaleDateString("ro-RO")}
                        </p>
                      </div>
                    </div>
                    {user.id === userId && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        Tu
                      </span>
                    )}
                  </div>

                  {/* Role Badge */}
                  <div className="mb-4">
                    {getRoleBadge(user.role)}
                  </div>

                  {/* User Info */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Status:</span>
                      <span className={user.email_confirmed_at ? "text-green-400" : "text-yellow-400"}>
                        {user.email_confirmed_at ? "✓ Confirmat" : "⏳ În așteptare"}
                      </span>
                    </div>
                    {user.last_sign_in_at && (
                      <div className="flex justify-between text-gray-400">
                        <span>Ultima autentificare:</span>
                        <span className="text-gray-300">
                          {new Date(user.last_sign_in_at).toLocaleDateString("ro-RO")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Reset Password Form */}
                  {resetUserId === user.id ? (
                    <div className="space-y-3 p-3 bg-white/5 rounded-lg border border-white/10 mb-3">
                      <input
                        type="password"
                        value={resetPassword}
                        onChange={(e) => setResetPassword(e.target.value)}
                        placeholder="Parolă nouă (min 6 caractere)"
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        minLength={6}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleResetPassword(user.id)}
                          disabled={resetLoading}
                          size="sm"
                          className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600"
                        >
                          <Save className="w-3 h-3" />
                          Salvează
                        </Button>
                        <Button
                          onClick={() => {
                            setResetUserId(null);
                            setResetPassword("");
                          }}
                          size="sm"
                          variant="outline"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {/* Actions */}
                  {isSuperAdmin && (
                    <div className="flex gap-2">
                      {/* Change Role Button */}
                      {user.id !== userId && (
                        <Button
                          onClick={() => {
                            const newTargetRole = user.role === 'super_admin' ? 'admin' : 'super_admin';
                            if (confirm(`Schimbi rolul lui ${user.email} la ${newTargetRole === 'super_admin' ? 'Super Admin' : 'Admin'}?`)) {
                              handleChangeRole(user.id, newTargetRole);
                            }
                          }}
                          disabled={roleChangeLoading}
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                        >
                          {user.role === 'super_admin' ? <Shield className="w-4 h-4" /> : <Crown className="w-4 h-4" />}
                          {user.role === 'super_admin' ? 'Retrogradează' : 'Promovează'}
                        </Button>
                      )}

                      {/* Reset Password Button */}
                      <Button
                        onClick={() => {
                          setResetUserId(user.id);
                          setResetPassword("");
                        }}
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
                      >
                        <Key className="w-4 h-4" />
                        Resetează
                      </Button>

                      {/* Delete Button */}
                      {user.id !== userId && (
                        <Button
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          size="sm"
                          variant="outline"
                          className="gap-2 border-red-500/50 text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}