-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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