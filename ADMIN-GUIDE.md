# 📋 Ghid Admin Panel - Oikos Energy

## 🚀 Accesare Admin Panel

**URL:** `https://oikosenergy.ro/admin/login`

**Credențiale Default:**
- Email: `admin@oikosenergy.ro`
- Parolă: Setată în Supabase

---

## 📝 PAȘI INIȚIALI (O SINGURĂ DATĂ)

### 1. Populare Date Inițiale

După prima autentificare, trebuie să populezi baza de date cu setările inițiale:

**Opțiunea A - Prin SQL (Recomandat):**

1. Mergi în **Supabase Dashboard:**
   - https://supabase.com/dashboard/project/xjobgmfbptaxvjhivifx
   
2. Click pe **SQL Editor** (bara stânga)

3. Click **New Query**

4. Copiază și rulează scriptul din `supabase-setup.sql` (secțiunea de INSERT-uri pentru date inițiale)

5. Click **RUN** (sau Ctrl+Enter)

**Opțiunea B - Prin Interfață (Mai Simplu):**

1. Mergi în **Table Editor** în Supabase

2. Pentru fiecare tabel (`site_settings`, `page_content`, `services`), adaugă manual datele din documentație

---

## 🎯 FUNCȚIONALITĂȚI ADMIN PANEL

### 📞 **1. Gestionare Contact & Social Media**

**Pagină:** `/admin/content` → Tab "Contact"

**Ce poți edita:**
- ✅ Număr telefon
- ✅ Email contact
- ✅ Adresă fizică
- ✅ Link-uri social media (Facebook, Instagram, LinkedIn)

**Cum editezi:**
1. Modifici valoarea în câmpul de text
2. Click buton **"Salvează"** lângă câmp
3. Modificarea apare instant pe site

---

### 🎨 **2. Editare Conținut Pagini**

**Pagină:** `/admin/content` → Tab "Conținut Pagini"

**Ce poți edita:**
- ✅ Titluri și subtitluri Hero Section
- ✅ Texte Despre Noi
- ✅ Descrieri servicii
- ✅ Call-to-action buttons

**Structură:**
- **Pagină:** home, despre, servicii, etc.
- **Secțiune:** hero, about, services, etc.
- **Cheie:** title, description, cta_primary, etc.

---

### 🛠️ **3. Gestionare Servicii**

**Pagină:** `/admin/services`

**Funcționalități:**
- ✅ **Adaugă servicii noi** - Click "Serviciu Nou"
- ✅ **Editează servicii** - Click iconița creion
- ✅ **Activează/Dezactivează** - Toggle vizibilitate pe site
- ✅ **Șterge servicii** - Click iconița coș de gunoi
- ✅ **Reordonează** - Schimbă "Ordine" pentru poziționare

**Câmpuri Serviciu:**
- **Titlu:** Numele serviciului
- **Descriere:** Explicație scurtă (2-3 propoziții)
- **Icoană:** Nume icon Lucide (ex: Sun, Battery, Zap, Activity)
- **Caracteristici:** Lista beneficii (una per linie)
- **Ordine:** Poziție pe site (1=primul, 2=al doilea, etc.)
- **Status:** Activ (vizibil) / Inactiv (ascuns)

**Icon-uri Disponibile:**
- `Sun` - Panouri solare
- `Battery` - Stocare energie
- `Zap` - Încărcare rapidă
- `Activity` - Monitorizare
- `Shield` - Siguranță
- `Settings` - Configurare
- Vezi lista completă: https://lucide.dev/icons

---

### 📊 **4. Gestionare Proiecte (Portfolio)**

**Pagină:** `/admin/dashboard` → Card "Proiecte"

**Funcționalități:**
- ✅ Adaugă proiecte noi cu imagini
- ✅ Editează detalii proiect
- ✅ Marchează ca featured (afișat pe prima pagină)
- ✅ Șterge proiecte vechi

---

### 💬 **5. Mesaje de Contact**

**Pagină:** `/admin/dashboard` → Card "Mesaje Primite"

**Funcționalități:**
- ✅ Vezi toate mesajele din formular
- ✅ Marchează ca citite/necitite
- ✅ Răspunde direct din panel
- ✅ Șterge mesaje procesate

---

### 🔍 **6. Setări SEO**

**Pagină:** `/admin/content` → Tab "SEO"

**Ce poți edita:**
- ✅ **Titlu SEO:** Apare în Google și în tab browser
- ✅ **Descriere SEO:** Apare sub titlu în rezultatele Google
- ✅ **Keywords:** Cuvinte cheie (opțional, Google le ignoră)

**Best Practices:**
- Titlu: 50-60 caractere
- Descriere: 150-160 caractere
- Include "Oikos Energy", "panouri solare", "energie solară" pentru SEO local

---

## 👥 **7. Gestionare Utilizatori (Super Admin)**

**Pagină:** `/admin/users`

**Roluri Disponibile:**
- **Super Admin:** Acces complet (gestionează utilizatori)
- **Admin:** Editare conținut, servicii, proiecte
- **Editor:** Doar editare conținut și mesaje
- **Viewer:** Doar vizualizare (fără editare)

**Funcționalități:**
- ✅ Creează conturi noi pentru echipă
- ✅ Schimbă roluri utilizatori
- ✅ Dezactivează conturi
- ✅ Resetează parole

---

## 🔐 SECURITATE

### Protejarea Admin Panel

**Acces Restricționat:**
- Doar utilizatori autentificați cu rol Admin/Super Admin
- Redirect automat la login dacă neautentificat
- Session timeout după inactivitate

**Recomandări:**
1. **Folosește parole puternice:**
   - Minim 12 caractere
   - Combinație litere, cifre, simboluri
   
2. **Activează 2FA în Supabase:**
   - Settings → Authentication → Enable 2FA

3. **Limitează accesul:**
   - Doar câțiva utilizatori cu rol Admin
   - Folosește rolul Editor pentru echipă

---

## 🆘 PROBLEME FRECVENTE

### ❌ "Nu se salvează modificările"

**Soluție:**
1. Verifică conexiunea la internet
2. Reîncarcare pagină (F5)
3. Verifică consola browser (F12) pentru erori
4. Contactează suport tehnic

---

### ❌ "Nu văd modificările pe site"

**Soluție:**
1. Reîmprospătează site-ul (Ctrl+F5)
2. Șterge cache browser
3. Verifică că ai salvat modificarea (buton "Salvează")
4. Unele modificări pot dura 1-2 minute (Vercel cache)

---

### ❌ "Am uitat parola"

**Soluție:**
1. Click "Forgot Password" pe pagina login
2. Introdu email-ul
3. Verifică inbox pentru link resetare
4. Sau contactează super admin pentru resetare manuală

---

## 📞 SUPORT TEHNIC

**Pentru probleme tehnice:**
- Email: dev@oikosenergy.ro
- Telefon: +40 XXX XXX XXX

**Documentație Suplimentară:**
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

## 🎓 TUTORIAL VIDEO (OPȚIONAL)

Pot crea un tutorial video pas-cu-pas pentru:
- ✅ Primul login și configurare inițială
- ✅ Editare informații contact
- ✅ Adăugare servicii noi
- ✅ Upload proiecte portfolio
- ✅ Răspuns la mesaje clienți

**Durată:** ~15-20 minute
**Format:** Screen recording cu explicații audio

---

## ✅ CHECKLIST DUPĂ IMPLEMENTARE

- [ ] Am rulat script-ul SQL pentru populare date inițiale
- [ ] Am verificat că toate setările sunt completate corect
- [ ] Am testat formularul de contact
- [ ] Am adăugat cel puțin un serviciu
- [ ] Am actualizat informațiile de contact (telefon, email)
- [ ] Am configurat link-urile social media
- [ ] Am verificat SEO settings
- [ ] Am creat cont pentru fiecare membru echipă
- [ ] Am activat 2FA pentru contul principal

---

**Ultima actualizare:** 2026-03-16
**Versiune:** 1.0