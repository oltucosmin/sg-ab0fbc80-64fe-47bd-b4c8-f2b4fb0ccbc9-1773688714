# Deployment Guide - Oikos Energy Website

This guide explains how to deploy the Oikos Energy website to static hosting platforms.

## Prerequisites

- Supabase account (free tier works)
- Vercel/Netlify account (or any static hosting platform)
- Node.js 18+ installed locally

## 1. Supabase Setup

### Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Wait for the database to be provisioned (~2 minutes)

### Run Database Migration

1. Go to SQL Editor in Supabase dashboard
2. Copy the contents of `supabase-setup.sql`
3. Paste and run the SQL script
4. This creates:
   - `projects` table with all necessary columns
   - `contact_submissions` table for contact form
   - Row Level Security (RLS) policies
   - Storage bucket for project images

### Get Your Credentials

1. Go to Project Settings > API
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbG...`)

## 2. Local Development Setup

### Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Install Dependencies & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your site!

## 3. Deploy to Vercel (Recommended)

### One-Click Deploy

1. Click the "Publish" button in Softgen interface
2. OR manually: Push code to GitHub and import in Vercel

### Configure Environment Variables in Vercel

1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
   ```
3. Redeploy the project

### Custom Domain (Optional)

1. Go to Vercel Dashboard > Your Project > Settings > Domains
2. Add `oikosenergy.ro` and `www.oikosenergy.ro`
3. Follow DNS configuration instructions

## 4. Deploy to Netlify (Alternative)

### Deploy

1. Push code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Framework:** Next.js

### Configure Environment Variables in Netlify

1. Go to Site Settings > Environment variables
2. Add the same Supabase variables as above

## 5. Static Export (100% Static - No Server)

If you want a completely static site without server-side features:

### Update next.config.mjs

Add this to the config:
```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // ... rest of config
};
```

### Build & Deploy

```bash
npm run build
```

This creates an `out/` folder with static files. Upload to:
- Netlify (drag & drop `out/` folder)
- GitHub Pages
- Any static hosting service

**Note:** With static export, dynamic features (API routes, ISR) won't work. Supabase client-side queries will still work!

## 6. Supabase Storage Setup (For Image Uploads)

If you want to enable project image uploads in admin panel:

1. Go to Supabase Dashboard > Storage
2. Create a bucket named `project-images`
3. Make it public:
   - Click bucket > Settings
   - Enable "Public bucket"
4. Set up RLS policies (already in `supabase-setup.sql`)

## 7. Admin Panel Access

Default admin credentials (change these in production!):
- **Email:** admin@oikosenergy.ro
- **Password:** Set in Supabase Auth

To create admin user:
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user"
3. Set email and password
4. User can now login at `/admin/login`

## Troubleshooting

### "Supabase error: Invalid API key"

- Check that environment variables are set correctly
- Verify the anon key is complete (very long string)
- Redeploy after adding env variables

### Images not loading

- Check that Supabase Storage bucket is public
- Verify RLS policies are set up
- Check image URLs in database

### Build fails on Vercel

- Check Node.js version (should be 18+)
- Clear build cache and redeploy
- Check build logs for specific errors

## Security Checklist

- [ ] Change admin credentials from defaults
- [ ] Enable RLS on all Supabase tables
- [ ] Set up proper CORS in Supabase
- [ ] Add Content Security Policy headers
- [ ] Enable rate limiting on contact form
- [ ] Regular security updates (`npm audit`)

## Performance Optimization

- ✅ Static generation for most pages
- ✅ Image optimization with Next.js Image
- ✅ CDN caching via Vercel/Netlify
- ✅ Lazy loading for heavy components
- ✅ Compressed assets

## Support

For issues or questions:
- Check Supabase logs in dashboard
- Check Vercel deployment logs
- Contact: office@oikosenergy.ro