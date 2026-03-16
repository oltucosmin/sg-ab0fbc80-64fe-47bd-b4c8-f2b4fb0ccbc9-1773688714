import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Key, LogOut, ArrowLeft, Loader2, User, Mail, Calendar, Clock, Shield } from "lucide-react";
import { userService, type AdminUser } from "@/services/userService";
import Link from "next/link";

export default function AdminUsers() {
  const { isAuthenticated, logout, userEmail } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [newUserData, setNewUserData] = useState({
    email: "",
    password: ""
  });

  const [resetPasswordData, setResetPasswordData] = useState({
    userId: "",
    newPassword: ""
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      loadUsers();
    }
  }, [isAuthenticated, router]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
      alert("Eroare la încărcarea utilizatorilor. Verifică configurația Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUserData.email || !newUserData.password) {
      alert("Te rog completează toate câmpurile.");
      return;
    }

    if (newUserData.password.length < 6) {
      alert("Parola trebuie să aibă minim 6 caractere.");
      return;
    }

    try {
      setSubmitting(true);
      const result = await userService.createUser(newUserData.email, newUserData.password);
      
      if (result.success) {
        await loadUsers();
        setNewUserData({ email: "", password: "" });
        setShowAddForm(false);
        alert("✅ Utilizator creat cu succes!");
      } else {
        alert(`❌ Eroare: ${result.error}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Eroare la crearea utilizatorului.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetPasswordData.newPassword) {
      alert("Te rog introdu noua parolă.");
      return;
    }

    if (resetPasswordData.newPassword.length < 6) {
      alert("Parola trebuie să aibă minim 6 caractere.");
      return;
    }

    try {
      setSubmitting(true);
      const result = await userService.resetPassword(resetPasswordData.userId, resetPasswordData.newPassword);
      
      if (result.success) {
        setResetPasswordData({ userId: "", newPassword: "" });
        setShowResetForm(null);
        alert("✅ Parolă resetată cu succes!");
      } else {
        alert(`❌ Eroare: ${result.error}`);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Eroare la resetarea parolei.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (email === userEmail) {
      alert("❌ Nu poți șterge propriul cont!");
      return;
    }

    if (!confirm(`Sigur vrei să ștergi utilizatorul ${email}?\n\nAcțiunea este permanentă și nu poate fi anulată.`)) {
      return;
    }

    try {
      const result = await userService.deleteUser(userId);
      
      if (result.success) {
        await loadUsers();
        alert("✅ Utilizator șters cu succes!");
      } else {
        alert(`❌ Eroare: ${result.error}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Eroare la ștergerea utilizatorului.");
    }
  };

  const openResetForm = (userId: string) => {
    setResetPasswordData({ userId, newPassword: "" });
    setShowResetForm(userId);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Niciodată";
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEO 
        title="Gestionare Utilizatori - Admin - Oikos Energy"
        description="Gestionează utilizatorii admin ai platformei Oikos Energy"
      />
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Link href="/admin/dashboard">
                  <Button variant="outline" size="sm" className="border-white/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Înapoi la Dashboard
                  </Button>
                </Link>
              </div>
              <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                <Shield className="inline-block w-8 h-8 mr-3 text-emerald-500" />
                Gestionare <span className="text-gradient">Utilizatori</span>
              </h1>
              <p className="text-muted-foreground">
                Administrează conturile admin ale platformei Oikos Energy
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Deconectare
            </Button>
          </div>

          {!showAddForm && (
            <Button
              onClick={() => setShowAddForm(true)}
              className="mb-8 bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adaugă Admin Nou
            </Button>
          )}

          {showAddForm && (
            <div className="glass-card rounded-2xl p-8 mb-8 animate-slide-up">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Adaugă Administrator Nou
              </h2>

              <form onSubmit={handleAddUser} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="inline-block w-4 h-4 mr-2" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                      placeholder="admin@oikosenergy.ro"
                      required
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">
                      <Key className="inline-block w-4 h-4 mr-2" />
                      Parolă *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUserData.password}
                      onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                      placeholder="Minim 6 caractere"
                      required
                      minLength={6}
                      className="bg-background/50 border-white/10"
                    />
                    <p className="text-xs text-muted-foreground">
                      Parola trebuie să aibă minim 6 caractere
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Se creează...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Creează Administrator
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewUserData({ email: "", password: "" });
                    }}
                    variant="outline"
                    className="border-white/20"
                  >
                    Anulează
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Administratori ({users.length})
              </h2>
              <div className="text-sm text-muted-foreground">
                Conectat ca: <span className="text-emerald-400 font-semibold">{userEmail}</span>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-4" />
                <p className="text-muted-foreground">Se încarcă utilizatorii...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-20 glass-card rounded-2xl">
                <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-4">
                  Nu există utilizatori înregistrați.
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white glow-emerald"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adaugă Primul Administrator
                </Button>
              </div>
            ) : (
              users.map((user, index) => (
                <div
                  key={user.id}
                  className="glass-card rounded-xl p-6 hover:scale-[1.01] transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg text-foreground">
                            {user.email}
                          </h3>
                          {user.email === userEmail && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400">
                              Tu
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span>Creat: {formatDate(user.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          <span>Ultima autentificare: {formatDate(user.last_sign_in_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-emerald-500" />
                          <span>
                            Status: {user.email_confirmed_at ? (
                              <span className="text-emerald-400 font-semibold">✓ Confirmat</span>
                            ) : (
                              <span className="text-yellow-400 font-semibold">⏳ În așteptare</span>
                            )}
                          </span>
                        </div>
                      </div>

                      {showResetForm === user.id && (
                        <form onSubmit={handleResetPassword} className="mt-4 p-4 rounded-lg bg-background/30 border border-white/10">
                          <Label htmlFor={`reset-${user.id}`} className="text-sm mb-2 block">
                            Parolă Nouă (minim 6 caractere)
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id={`reset-${user.id}`}
                              type="password"
                              value={resetPasswordData.newPassword}
                              onChange={(e) => setResetPasswordData({ ...resetPasswordData, newPassword: e.target.value })}
                              placeholder="Introdu parola nouă"
                              required
                              minLength={6}
                              className="bg-background/50 border-white/10"
                            />
                            <Button
                              type="submit"
                              disabled={submitting}
                              size="sm"
                              className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            >
                              {submitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Salvează"
                              )}
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                setShowResetForm(null);
                                setResetPasswordData({ userId: "", newPassword: "" });
                              }}
                              size="sm"
                              variant="outline"
                              className="border-white/20"
                            >
                              Anulează
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Button
                        onClick={() => openResetForm(user.id)}
                        variant="outline"
                        size="sm"
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                        title="Resetează Parolă"
                      >
                        <Key className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteUser(user.id, user.email)}
                        variant="outline"
                        size="sm"
                        className="border-destructive/50 text-destructive hover:bg-destructive/10"
                        disabled={user.email === userEmail}
                        title={user.email === userEmail ? "Nu poți șterge propriul cont" : "Șterge Utilizator"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}