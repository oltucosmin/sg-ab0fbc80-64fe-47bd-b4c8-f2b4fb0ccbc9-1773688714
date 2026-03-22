-- Tabel pentru setări generale site
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel pentru conținut pagini
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page, section, key)
);

-- Tabel pentru servicii
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- RLS Policies pentru site_settings
CREATE POLICY "Anyone can view settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies pentru page_content
CREATE POLICY "Anyone can view page content" ON page_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update content" ON page_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert content" ON page_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies pentru services
CREATE POLICY "Anyone can view active services" ON services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert services" ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update services" ON services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete services" ON services FOR DELETE USING (auth.role() = 'authenticated');

-- Inserare date inițiale pentru site_settings
INSERT INTO site_settings (key, value, description) VALUES
  ('site_title', 'Oikos Energy', 'Titlul principal al site-ului'),
  ('site_description', 'Soluții profesionale de energie solară și renovare termică', 'Descrierea site-ului pentru SEO'),
  ('contact_phone', '+40 XXX XXX XXX', 'Număr de telefon pentru contact'),
  ('contact_email', 'contact@oikosenergy.ro', 'Email pentru contact'),
  ('contact_address', 'București, România', 'Adresa fizică'),
  ('social_facebook', 'https://facebook.com/oikosenergy', 'Link Facebook'),
  ('social_instagram', 'https://instagram.com/oikosenergy', 'Link Instagram'),
  ('social_linkedin', 'https://linkedin.com/company/oikosenergy', 'Link LinkedIn')
ON CONFLICT (key) DO NOTHING;

-- Inserare date inițiale pentru page_content
INSERT INTO page_content (page, section, key, value) VALUES
  ('home', 'hero', 'title', 'Energia viitorului începe acum'),
  ('home', 'hero', 'subtitle', 'Soluții complete de panouri solare și renovare termică pentrucase și afaceri'),
  ('home', 'hero', 'cta_primary', 'Solicită o ofertă'),
  ('home', 'hero', 'cta_secondary', 'Vezi proiectele noastre'),
  ('home', 'about', 'title', 'De ce Oikos Energy?'),
  ('home', 'about', 'description', 'Suntem specialiști în implementarea soluțiilor de energie regenerabilă, oferind servicii complete de la consultanță la instalare și mentenanță.'),
  ('home', 'services', 'title', 'Serviciile noastre'),
  ('home', 'services', 'description', 'Oferim soluții complete pentru eficiență energetică')
ON CONFLICT (page, section, key) DO NOTHING;

-- Inserare servicii inițiale
INSERT INTO services (title, description, icon, features, display_order, is_active) VALUES
  (
    'Panouri Fotovoltaice',
    'Sisteme complete de panouri solare pentru producția de energie electrică verde',
    'Sun',
    ARRAY['Reducere facturi cu până la 80%', 'Independență energetică', 'Recuperare investiție 5-7 ani', 'Garanție 25 ani performanță'],
    1,
    true
  ),
  (
    'Pompe de Căldură',
    'Soluții eficiente de încălzire și răcire cu pompă de căldură',
    'Thermometer',
    ARRAY['Eficiență energetică ridicată', 'Confort termic constant', 'Costuri reduse de operare', 'Prietenoase cu mediul'],
    2,
    true
  ),
  (
    'Renovare Termică',
    'Izolație termică profesională pentru reducerea consumului energetic',
    'Home',
    ARRAY['Reducere pierderi termice', 'Confort sporit', 'Valoare adăugată proprietății', 'Finisaje de calitate'],
    3,
    true
  ),
  (
    'Baterii Stocare',
    'Sisteme de stocare a energiei pentru autonomie maximă',
    'Battery',
    ARRAY['Stocare surplus energie', 'Utilizare 24/7', 'Backup în caz de pană', 'Optimizare costuri'],
    4,
    true
  )
ON CONFLICT DO NOTHING;