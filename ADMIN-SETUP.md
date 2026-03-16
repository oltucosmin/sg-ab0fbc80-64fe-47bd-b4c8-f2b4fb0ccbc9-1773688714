# 🔐 Setup Autentificare Admin - Oikos Energy

Acest ghid te va ajuta să configurezi autentificarea securizată pentru panoul de administrare.

---

## 📋 **PASUL 1: Activează Supabase**

### **În Softgen Interface:**

1. **Click pe butonul "Enable Supabase"** (din chat sau settings)
2. **Sau spune în chat:** "Enable Supabase" / "Activate Supabase"
3. Softgen va conecta automat proiectul la Supabase

---

## 🗄️ **PASUL 2: Configurează Database**

### **A. Rulează SQL pentru Tabelul Projects (Dacă nu l-ai făcut deja):**

1. **Mergi la:** https://supabase.com/dashboard
2. **Selectează proiectul** Oikos Energy
3. **SQL Editor** (left sidebar)
4. **New Query** → Copiază și rulează SQL-ul din `supabase-setup.sql`

---

### **B. Activează Email Authentication:**

1. **În Supabase Dashboard:**
   - **Authentication** → **Providers** (left sidebar)
   - Găsește **"Email"** provider
   - **Enable** dacă nu este deja activat

2. **Configurează Email Templates (Opțional):**
   - **Authentication** → **Email Templates**
   - Personalizează emailurile de confirmare/reset (în română)

---

## 👤 **PASUL 3: Creează Primul Admin**

### **Metoda A - Prin Supabase Dashboard (RECOMANDAT):**

1. **Mergi la:** https://supabase.com/dashboard
2. **Selectează proiectul** Oikos Energy
3. **Authentication** → **Users** (left sidebar)
4. **Click pe "Add User"** (top-right)
5. **Completează:**
   ```
   Email:    admin@oikosenergy.ro (sau alt email)
   Password: [Parola ta sigură - min 6 caractere]
   ```
6. **✅ Auto Confirm User**: ACTIVAT (bifat)
   - Astfel nu trebuie să confirmi emailul manual
7. **Click "Create User"**

**✅ GATA! Primul admin creat!**

---

### **Metoda B - Prin SQL (Alternativă):**

Dacă preferi SQL, rulează în **SQL Editor**:

```sql
-- Creează un admin cu email și parolă
-- IMPORTANT: Înlocuiește cu email-ul și parola ta!

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@oikosenergy.ro', -- SCHIMBĂ CU EMAIL-UL TĂU
  crypt('ParolaTa2024!', gen_salt('bf')), -- SCHIMBĂ CU PAROLA TA
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

**⚠️ ATENȚIE:** Parola trebuie să aibă **minim 6 caractere**.

---

## 🧪 **PASUL 4: Testează Autentificarea**

### **1. Accesează Pagina de Login:**
```
https://oikosenergy.ro/admin/login
SAU
http://localhost:3000/admin/login (local)
```

### **2. Autentifică-te cu Credențialele Noi:**
```
Email:    admin@oikosenergy.ro (sau ce ai setat)
Password: [Parola ta]
```

### **3. Verifică Funcționalitățile:**
- ✅ Login reușit → redirect la `/admin/dashboard`
- ✅ Session persistă (refresh page → rămâi logat)
- ✅ Logout funcționează
- ✅ Login greșit → mesaj de eroare

---

## 🔐 **SECURITATE ȘI BEST PRACTICES**

### **✅ Ce Face Supabase Auth Automat:**

1. **Password Hashing:**
   - Parolele sunt criptate cu bcrypt
   - Nu sunt stocate plain text NICIODATĂ
   - Imposibil de decriptat (one-way hash)

2. **Session Management:**
   - JWT tokens pentru sessions
   - Expire automat după inactivitate
   - Refresh tokens pentru sesiuni lungi

3. **SQL Injection Protection:**
   - Toate query-urile sunt parametrizate
   - Validare input automată

4. **Rate Limiting:**
   - Protecție împotriva brute force attacks
   - Max încercări de login limitate

---

### **🛡️ Recomandări Securitate:**

**1. Parolă Puternică:**
```
✅ BUNĂ: M3uP@r0l@S!gur@2024!
❌ SLABĂ: admin123
❌ SLABĂ: parola

Reguli:
- Minim 12 caractere
- Majuscule + minuscule
- Cifre + simboluri
- Nu folosește cuvinte comune
```

**2. Email Profesional:**
```
✅ admin@oikosenergy.ro
✅ contact@oikosenergy.ro
❌ ionescu.gigel@yahoo.com (email personal)
```

**3. Backup Credențiale:**
- Salvează credențialele într-un password manager (1Password, Bitwarden)
- Nu le împărtăși prin email/chat nesecurizat
- Schimbă parola periodic (3-6 luni)

**4. Multipli Admini (Opțional):**
```sql
-- Poți adăuga mai mulți admini dacă lucrezi în echipă
-- Repetă PASUL 3 pentru fiecare admin
```

---

## 🔄 **Password Reset (Recuperare Parolă)**

### **Dacă uiți parola:**

**Metoda 1 - Prin Supabase Dashboard:**
1. **Authentication** → **Users**
2. Găsește user-ul
3. **Click pe cele 3 puncte** (⋮) → **"Send Magic Link"**
4. Primești email cu link de resetare

**Metoda 2 - SQL Reset:**
```sql
-- Resetează parola manual în SQL Editor
UPDATE auth.users
SET encrypted_password = crypt('ParolaNouă2024!', gen_salt('bf'))
WHERE email = 'admin@oikosenergy.ro';
```

---

## 📊 **Monitorizare Activitate Admin**

### **Vezi Login History:**

1. **Supabase Dashboard** → **Authentication** → **Users**
2. Click pe user → Vezi:
   - Last sign in
   - Created at
   - Email confirmed
   - Active sessions

---

## 🚀 **Deploy cu Supabase Auth**

### **Pe DataHost.ro:**

Asigură-te că `.env.local` este configurat corect:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**⚠️ IMPORTANT:**
- Nu include `.env.local` în Git/public files
- Variabilele `NEXT_PUBLIC_*` sunt incluse în build-ul Next.js
- Supabase Anon Key este safe pentru client-side (RLS protection)

---

## ❓ **Troubleshooting**

### **Problemă: "Invalid login credentials"**

**Cauze posibile:**
1. ✅ Email greșit (verifică typos)
2. ✅ Parolă greșită (caps lock?)
3. ✅ User-ul nu e confirmat (bifa "Auto Confirm" la creare)
4. ✅ Supabase nu e conectat (verifică `.env.local`)

**Soluție:**
```bash
# Verifică în Supabase Dashboard:
Authentication → Users → Găsește user-ul
- Email confirmed: ✅ (trebuie să fie bifat)
- Last sign in: Should update after successful login
```

---

### **Problemă: Session se pierde după refresh**

**Cauză:** Cookie settings

**Soluție:**
- Verifică că browser-ul permite cookies
- Clear browser cache și încearcă din nou
- Verifică că Supabase URL este corect în `.env.local`

---

### **Problemă: Nu pot accesa dashboard-ul**

**Verificări:**
1. ✅ Ești autentificat? (check in browser DevTools → Application → Local Storage)
2. ✅ Session validă? (Supabase Dashboard → Authentication → vezi last sign in)
3. ✅ Route protection funcționează? (vezi `useAuth()` în `dashboard.tsx`)

---

## 📞 **Suport**

**Dacă întâmpini probleme:**

1. **Verifică logs în Supabase:**
   - Dashboard → Logs → Vezi erori auth

2. **Browser Console:**
   - F12 → Console → Vezi erori JavaScript

3. **Contactează Softgen Support:**
   - Chat cu Softgen
   - Email: support@softgen.ai

---

## ✅ **CHECKLIST FINAL**

**Înainte de a merge live:**

- ✅ Supabase conectat și configurat
- ✅ SQL pentru `projects` table rulat
- ✅ Email Authentication activat în Supabase
- ✅ Primul admin creat și confirmat
- ✅ Login testat cu success
- ✅ Session persistence verificată
- ✅ Logout funcționează
- ✅ `.env.local` configurat corect
- ✅ Linia cu credențiale demo ștearsă din `login.tsx`

---

**🎉 Autentificare Securizată Activată!**

Panoul tău de administrare este acum protejat cu autentificare enterprise-level prin Supabase!

**Următorii pași:**
1. ✅ Activează Supabase în Softgen
2. ✅ Rulează SQL-ul pentru tables
3. ✅ Creează primul admin
4. ✅ Testează login-ul
5. ✅ Deploy pe DataHost!

---

**Securitate. Simplitate. Profesionalism.** 🔐✨