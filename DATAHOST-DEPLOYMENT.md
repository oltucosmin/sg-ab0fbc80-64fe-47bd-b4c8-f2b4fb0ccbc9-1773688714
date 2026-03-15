# Deployment pe DataHost.ro cu cPanel

Ghid complet pentru deployment pe hosting tradițional DataHost.ro.

## Cerințe

- Cont hosting DataHost.ro cu cPanel
- Acces FTP sau File Manager în cPanel
- Domeniu configurat (ex: oikosenergy.ro)

## Pasul 1: Build Static Export Local

### 1.1 Instalează Dependențele (doar prima dată)

```bash
npm install
```

### 1.2 Build pentru Production

```bash
npm run build
```

Acest command creează folder-ul `out/` cu toate fișierele statice.

**Conținutul folderului `out/`:**
- `index.html` - homepage
- `despre-noi.html` - pagina despre noi
- `proiecte.html` - pagina proiecte
- `contact.html` - pagina contact
- `_next/` - assets (CSS, JS, fonts)
- `public/` - imagini și favicon

## Pasul 2: Upload pe DataHost.ro

### Opțiunea A: File Manager (cel mai ușor)

1. **Login în cPanel**
   - Mergi la https://cpanel.datahost.ro (sau link-ul primit de la DataHost)
   - Introdu username și password

2. **Deschide File Manager**
   - Caută "File Manager" în cPanel
   - Click pe icon

3. **Navighează la folderul corect**
   - Du-te la `public_html/` (pentru domeniul principal)
   - SAU `public_html/subfolder/` (dacă vrei în subdirectory)

4. **Șterge fișierele existente** (dacă există)
   - Selectează tot din `public_html/`
   - Click "Delete"
   - **ATENȚIE:** Păstrează `.htaccess` dacă există (e important!)

5. **Upload fișierele**
   - Click butonul "Upload" din File Manager
   - Selectează **TOT** din folder-ul `out/` de pe computerul tău
   - Drag & drop sau "Select File" și upload
   - Așteaptă să se încarce totul

6. **Verifică structura**
   - În `public_html/` ar trebui să vezi:
     ```
     public_html/
     ├── index.html
     ├── despre-noi.html
     ├── proiecte.html
     ├── contact.html
     ├── servicii.html
     ├── admin/
     ├── _next/
     ├── favicon.ico
     └── .htaccess (opțional - vezi mai jos)
     ```

### Opțiunea B: FTP (FileZilla)

1. **Instalează FileZilla Client**
   - Download: https://filezilla-project.org/

2. **Conectează-te la server**
   - **Host:** ftp.datahost.ro (sau IP-ul primit)
   - **Username:** username cPanel
   - **Password:** password cPanel
   - **Port:** 21

3. **Upload fișierele**
   - Panou stânga: navighează la folder-ul `out/` local
   - Panou dreapta: navighează la `public_html/`
   - Selectează tot din `out/` și drag la dreapta
   - Așteaptă upload (poate dura câteva minute)

## Pasul 3: Configurare .htaccess (IMPORTANT!)

Creează fișier `.htaccess` în `public_html/` cu următorul conținut:

```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Remove .html extension from URLs
RewriteEngine On

# Redirect www to non-www (opțional)
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Force HTTPS (IMPORTANT pentru securitate!)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Handle trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} (.+)/$
RewriteRule ^ %1 [R=301,L]

# Custom error pages
ErrorDocument 404 /404.html
</IfModule>
```

**Cum creezi .htaccess în cPanel:**
1. File Manager → public_html/
2. Click "New File"
3. Numele: `.htaccess` (cu punct!)
4. Right click → "Edit"
5. Paste conținutul de mai sus
6. Save

## Pasul 4: Configurare Environment Variables

Pentru Supabase, fișierele `.env.local` **NU** funcționează în static export!

**Soluția:** Credentialele sunt hardcodate în build-time.

### Verifică în `src/lib/supabase.ts`:

Ar trebui să ai:
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://deuuhyvjbxamxeabmhql.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbG...';
```

Dacă vrei să schimbi credentials, editează și fă rebuild:
1. Modifică în `src/lib/supabase.ts`
2. `npm run build`
3. Re-upload folder-ul `out/`

## Pasul 5: Configurare SSL (HTTPS)

### În cPanel:

1. **Mergi la "SSL/TLS Status"**
2. **Selectează domeniul** (oikosenergy.ro)
3. **Click "Run AutoSSL"** - instalează certificat gratuit Let's Encrypt
4. Așteaptă 2-5 minute
5. Verifică că ai `https://` funcțional

### Forțare HTTPS:

Deja configurat în `.htaccess` mai sus! Toate request-urile HTTP vor fi redirect la HTTPS.

## Pasul 6: Verificare Deployment

### Teste de funcționare:

1. **Homepage:** https://oikosenergy.ro
2. **Despre Noi:** https://oikosenergy.ro/despre-noi
3. **Proiecte:** https://oikosenergy.ro/proiecte
4. **Contact:** https://oikosenergy.ro/contact
5. **Servicii:** https://oikosenergy.ro/servicii

### Verifică funcționalități:

- ✅ Toate paginile se încarcă corect
- ✅ Navigarea între pagini funcționează
- ✅ Imaginile se încarcă
- ✅ Formular de contact trimite (verifică în Supabase)
- ✅ Admin login funcționează (dacă e nevoie)
- ✅ Design responsive pe mobil

## Troubleshooting

### Problema: Paginile arată fără CSS

**Cauză:** Path-uri greșite la assets

**Soluție:**
1. Verifică dacă folder-ul `_next/` există în `public_html/`
2. Verifică permisiunile (755 pentru foldere, 644 pentru fișiere)
3. Clear browser cache (Ctrl+Shift+R)

### Problema: 404 Not Found la pagini

**Cauză:** `.htaccess` lipsește sau e greșit

**Soluție:**
1. Verifică că `.htaccess` există în `public_html/`
2. Verifică că mod_rewrite e enabled (contactează DataHost support)
3. Verifică că fișierele `.html` există (despre-noi.html, etc.)

### Problema: Imagini nu se încarcă

**Cauză:** Path-uri greșite sau lipsă fișiere

**Soluție:**
1. Verifică că folder-ul `public/` e în `public_html/`
2. Verifică permisiuni (644 pentru imagini)
3. Verifică că imaginile există în `public/`

### Problema: Contact form nu trimite

**Cauză:** Supabase credentials greșite sau CORS

**Soluție:**
1. Verifică credentials în Supabase Dashboard
2. Adaugă domeniul în Supabase → Settings → API → URL Configuration
3. Permite domeniul în CORS settings

### Problema: Site încărcare lentă

**Soluție:**
1. Verifică că `.htaccess` are GZIP compression
2. Enable browser caching (deja în `.htaccess`)
3. Optimizează imaginile (folosește TinyPNG)
4. Consideră CDN (Cloudflare - gratuit)

## Update Site (Re-deployment)

Când faci modificări și vrei să actualizezi site-ul:

1. **Local:** Editează fișierele
2. **Build:** `npm run build`
3. **Upload:** Upload doar fișierele modificate din `out/`
   - Sau șterge tot și upload totul din nou (safest)
4. **Clear cache:** Ctrl+Shift+R în browser

**TIP:** Ține un backup al folderului `public_html/` înainte de fiecare update!

## Optimizări Recomandate

### 1. Cloudflare (CDN Gratuit)

- Viteza mai mare de încărcare
- Protecție DDoS
- SSL gratuit
- Cache automat

**Setup:**
1. Creează cont Cloudflare
2. Adaugă domeniul (oikosenergy.ro)
3. Schimbă nameservers la DataHost (Cloudflare îți dă instrucțiuni)
4. Enable "Auto Minify" pentru CSS/JS
5. Enable "Brotli" compression

### 2. Image Optimization

Înainte de upload, optimizează imaginile:
- **TinyPNG:** https://tinypng.com
- **Squoosh:** https://squoosh.app
- Target: sub 500KB per imagine

### 3. Performance Monitoring

- **Google PageSpeed Insights:** https://pagespeed.web.dev
- Target: 90+ score
- Fix issues recomandate

## Costuri

- **Hosting DataHost.ro:** ~15-30 RON/lună (în funcție de plan)
- **Domeniu .ro:** ~50-100 RON/an
- **SSL Certificate:** GRATUIT (Let's Encrypt via cPanel)
- **Supabase:** GRATUIT (până la 500MB database)
- **Total estimat:** ~250-400 RON/an

## Support

- **DataHost.ro Support:** https://datahost.ro/contact
- **Supabase Support:** https://supabase.com/support
- **Next.js Docs:** https://nextjs.org/docs

---

**Deployment Timeline:**
- ⏱️ Build local: 2-3 minute
- ⏱️ Upload FTP: 5-10 minute (în funcție de internet)
- ⏱️ Configurare .htaccess: 2 minute
- ⏱️ SSL setup: 2-5 minute
- **TOTAL: ~15-20 minute** 🚀

Succes cu deployment-ul! 🎉