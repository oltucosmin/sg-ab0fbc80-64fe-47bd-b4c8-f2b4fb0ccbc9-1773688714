-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index for faster role lookups
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);

-- Enable RLS on user_roles table
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read all roles
CREATE POLICY "Authenticated users can read roles"
ON user_roles FOR SELECT
USING (auth.role() = 'authenticated');

-- Policy: Only super_admins can insert roles
CREATE POLICY "Super admins can insert roles"
ON user_roles FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'super_admin'
  )
);

-- Policy: Only super_admins can update roles
CREATE POLICY "Super admins can update roles"
ON user_roles FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'super_admin'
  )
);

-- Policy: Only super_admins can delete roles
CREATE POLICY "Super admins can delete roles"
ON user_roles FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'super_admin'
  )
);

-- Function to update updated_at on user_roles
CREATE OR REPLACE FUNCTION update_user_roles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_roles
CREATE TRIGGER update_user_roles_timestamp
  BEFORE UPDATE ON user_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_roles_updated_at();

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('solar', 'heat-pump', 'hybrid')),
  power TEXT,
  completed_date DATE NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  gdpr_consent BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read projects
CREATE POLICY "Public projects are viewable by everyone"
ON projects FOR SELECT
USING (true);

-- Policy: Authenticated users can insert projects
CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users can update projects
CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
USING (auth.role() = 'authenticated');

-- Policy: Authenticated users can delete projects
CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
USING (auth.role() = 'authenticated');

-- Enable RLS on contact_submissions table
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert contact submissions
CREATE POLICY "Anyone can submit contact form"
ON contact_submissions FOR INSERT
WITH CHECK (true);

-- Policy: Only authenticated users can read submissions
CREATE POLICY "Authenticated users can read submissions"
ON contact_submissions FOR SELECT
USING (auth.role() = 'authenticated');

-- Storage policy: Anyone can read project images
CREATE POLICY "Public project images are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Storage policy: Authenticated users can upload images
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Storage policy: Authenticated users can delete images
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample project data
INSERT INTO projects (title, description, location, image_url, category, power, completed_date, featured)
VALUES
  (
    'Sistem Fotovoltaic Rezidențial Premium',
    'Instalație fotovoltaică de 8 kW cu sistem de stocare energie Tesla Powerwall 2. Proiect realizat pe acoperișul unei case unifamiliale cu orientare sud-vest optimă.',
    'București, Sector 1',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    'solar',
    '8 kW + 13.5 kWh stocare',
    '2024-11-15',
    true
  ),
  (
    'Pompă de Căldură Aer-Apă Comercială',
    'Sistem de încălzire și răcire cu pompă de căldură de înaltă eficiență pentru clădire de birouri. Include controlere inteligente și management energetic avansat.',
    'Cluj-Napoca',
    'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
    'heat-pump',
    '45 kW',
    '2024-10-22',
    true
  ),
  (
    'Sistem Hibrid Solar + Pompă Căldură',
    'Soluție completă de energie verde: panouri fotovoltaice 12 kW integrate cu pompă de căldură geotermală pentru o vilă de lux. Autonomie energetică de peste 90%.',
    'Brașov',
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800',
    'hybrid',
    '12 kW solar + 16 kW pompă',
    '2024-09-30',
    true
  ),
  (
    'Panou Fotovoltaic Industrial',
    'Centrală fotovoltaică 250 kW pentru complex industrial. Reducere a costurilor energetice cu 65% și amortizare în 4.5 ani.',
    'Timișoara',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    'solar',
    '250 kW',
    '2024-08-18',
    false
  ),
  (
    'Sistem Rezidențial cu Stocare',
    'Instalație fotovoltaică 6 kW cu baterii de stocare pentru gospodărie cu consum mediu. Include monitorizare în timp real și aplicație mobilă.',
    'Sibiu',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    'solar',
    '6 kW + 10 kWh stocare',
    '2024-07-05',
    false
  ),
  (
    'Pompă de Căldură Rezidențială',
    'Sistem modern de încălzire cu pompă de căldură aer-apă pentru casă de 180 mp. Eficiență SCOP 4.8 și reducere costuri cu 70% față de gaz.',
    'Oradea',
    'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
    'heat-pump',
    '12 kW',
    '2024-06-30',
    false
  );

-- Site Settings Table (Contact info, social media, etc.)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text', -- text, email, phone, url, json
  category VARCHAR(50), -- contact, social, general, seo
  label VARCHAR(200),
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_by UUID REFERENCES auth.users(id)
);

-- Page Content Table (Editable page sections)
CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page VARCHAR(100) NOT NULL, -- home, about, services, contact
  section VARCHAR(100) NOT NULL, -- hero, about, services, footer
  key VARCHAR(100) NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text', -- text, html, markdown, image
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(page, section, key)
);

-- Services Table (Already exists, updating if needed)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  features TEXT[], -- Array of feature points
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR(200) NOT NULL,
  client_position VARCHAR(200),
  client_company VARCHAR(200),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default site settings
INSERT INTO public.site_settings (key, value, type, category, label, description) VALUES
  ('company_name', 'Oikos Energy', 'text', 'general', 'Nume Companie', 'Numele companiei afișat pe site'),
  ('contact_phone', '+40 XXX XXX XXX', 'phone', 'contact', 'Telefon', 'Număr de telefon principal'),
  ('contact_email', 'contact@oikosenergy.ro', 'email', 'contact', 'Email', 'Adresa de email principală'),
  ('contact_address', 'București, România', 'text', 'contact', 'Adresă', 'Adresa fizică a companiei'),
  ('social_facebook', '', 'url', 'social', 'Facebook', 'Link profil Facebook'),
  ('social_instagram', '', 'url', 'social', 'Instagram', 'Link profil Instagram'),
  ('social_linkedin', '', 'url', 'social', 'LinkedIn', 'Link profil LinkedIn'),
  ('social_twitter', '', 'url', 'social', 'Twitter/X', 'Link profil Twitter'),
  ('seo_title', 'Oikos Energy - Soluții Energetice Sustenabile', 'text', 'seo', 'Titlu SEO', 'Titlu pentru motoarele de căutare'),
  ('seo_description', 'Experți în energie solară, eficiență energetică și soluții verzi pentru case și afaceri.', 'text', 'seo', 'Descriere SEO', 'Descriere pentru motoarele de căutare'),
  ('hero_title', 'Viitorul Energiei Este Verde', 'text', 'content', 'Titlu Hero', 'Titlu principal pe pagina de start'),
  ('hero_subtitle', 'Transformăm energia solară în economii reale pentru casa și afacerea ta', 'text', 'content', 'Subtitlu Hero', 'Subtitlu pe pagina de start')
ON CONFLICT (key) DO NOTHING;

-- Insert default page content
INSERT INTO public.page_content (page, section, key, value, type) VALUES
  ('home', 'hero', 'title', 'Viitorul Energiei Este Verde', 'text'),
  ('home', 'hero', 'subtitle', 'Transformăm energia solară în economii reale pentru casa și afacerea ta', 'text'),
  ('home', 'about', 'title', 'Despre Oikos Energy', 'text'),
  ('home', 'about', 'description', 'Suntem lideri în soluții energetice sustenabile, aducând tehnologie de vârf și expertise locală pentru a transforma modul în care consumăm energia.', 'html'),
  ('about', 'mission', 'title', 'Misiunea Noastră', 'text'),
  ('about', 'mission', 'content', 'Să accelerăm tranziția către energie curată prin soluții personalizate și accesibile pentru fiecare client.', 'html'),
  ('about', 'vision', 'title', 'Viziunea Noastră', 'text'),
  ('about', 'vision', 'content', 'O Românie alimentată 100% de energie regenerabilă, unde fiecare casă și afacere contribuie la un viitor sustenabil.', 'html')
ON CONFLICT (page, section, key) DO NOTHING;

-- Insert default services
INSERT INTO public.services (title, description, icon, features, order_index) VALUES
  ('Panouri Solare', 'Instalare și mentenanță sisteme fotovoltaice de ultimă generație', 'Sun', ARRAY['Consultanță gratuită', 'Instalare profesională', 'Garanție extinsă', 'Monitorizare remotă'], 1),
  ('Eficiență Energetică', 'Audit și optimizare consum energetic pentru case și afaceri', 'Zap', ARRAY['Audit energetic complet', 'Recomandări personalizate', 'ROI garantat', 'Suport continuu'], 2),
  ('Sisteme de Stocare', 'Baterii și soluții de stocare energie pentru independență totală', 'Battery', ARRAY['Baterii Tesla Powerwall', 'Backup automat', 'Optimizare costuri', 'Integrare smart home'], 3),
  ('Smart Energy Management', 'Sisteme inteligente de monitorizare și control energetic', 'Gauge', ARRAY['Monitorizare în timp real', 'Aplicație mobilă', 'Rapoarte detaliate', 'Automatizări'], 4)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policies for site_settings (read public, write admin)
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Only admins can update site settings" ON public.site_settings FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);

-- Policies for page_content (read public, write admin)
CREATE POLICY "Anyone can view page content" ON public.page_content FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all page content" ON public.page_content FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);
CREATE POLICY "Only admins can manage page content" ON public.page_content FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);

-- Policies for services (read public, write admin)
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all services" ON public.services FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);
CREATE POLICY "Only admins can manage services" ON public.services FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);

-- Policies for testimonials (read public, write admin)
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Only admins can manage testimonials" ON public.testimonials FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);