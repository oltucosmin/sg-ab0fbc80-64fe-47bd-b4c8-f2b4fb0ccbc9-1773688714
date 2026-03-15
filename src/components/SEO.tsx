import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  type?: string;
  noindex?: boolean;
  canonical?: string;
}

// SEO elements that can be used in _document.tsx (returns JSX without Head wrapper)
export function SEOElements({
  title = "Oikos Energy - Panouri Fotovoltaice & Pompe Căldură România | Energie Verde",
  description = "Oikos Energy - Lider în energie regenerabilă în România. Instalăm panouri fotovoltaice, pompe de căldură și sisteme hibride. Peste 500 proiecte realizate. Consultanță gratuită!",
  image = "/og-image.png",
  url = "https://oikosenergy.ro",
  keywords = "panouri fotovoltaice, pompe caldura, energie solara, energie verde, instalare panouri solare, sisteme fotovoltaice, Romania, economii energie",
  type = "website",
  noindex = false,
  canonical,
}: SEOProps) {
  const fullUrl = url.startsWith('http') ? url : `https://oikosenergy.ro${url}`;
  const fullImage = image.startsWith('http') ? image : `https://oikosenergy.ro${image}`;
  const canonicalUrl = canonical || fullUrl;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Viewport & Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#10b981" />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Oikos Energy" />
      <meta property="og:locale" content="ro_RO" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional SEO */}
      <meta name="author" content="Oikos Energy" />
      <meta name="language" content="Romanian" />
      <meta name="geo.region" content="RO" />
      <meta name="geo.placename" content="Romania" />
    </>
  );
}

// SEO component for use in pages (uses next/head)
export function SEO({
  title = "Oikos Energy - Panouri Fotovoltaice & Pompe Căldură România | Energie Verde",
  description = "Oikos Energy - Lider în energie regenerabilă în România. Instalăm panouri fotovoltaice, pompe de căldură și sisteme hibride. Peste 500 proiecte realizate. Consultanță gratuită!",
  image = "/og-image.png",
  url = "https://oikosenergy.ro",
  keywords = "panouri fotovoltaice, pompe caldura, energie solara, energie verde, instalare panouri solare, sisteme fotovoltaice, Romania, economii energie",
  type = "website",
  noindex = false,
  canonical,
}: SEOProps) {
  const fullUrl = url.startsWith('http') ? url : `https://oikosenergy.ro${url}`;
  const fullImage = image.startsWith('http') ? image : `https://oikosenergy.ro${image}`;
  const canonicalUrl = canonical || fullUrl;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Viewport & Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#10b981" />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Oikos Energy" />
      <meta property="og:locale" content="ro_RO" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional SEO */}
      <meta name="author" content="Oikos Energy" />
      <meta name="language" content="Romanian" />
      <meta name="geo.region" content="RO" />
      <meta name="geo.placename" content="Romania" />
    </Head>
  );
}