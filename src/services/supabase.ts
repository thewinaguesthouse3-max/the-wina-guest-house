import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { initialProperties, Property } from '@/src/data/properties';
import { blogPosts, BlogPost } from '@/src/data/blog';
import { generalFaqs, FAQItem } from '@/src/data/faqs';
import { guestReviews, Review } from '@/src/data/reviews';
import { specialOffers, SpecialOffer } from '@/src/data/offers';
import { ContactConfig, BookingUrlsConfig, getStoredBookingUrls, getStoredContact } from '@/src/config/ownerStore';

export interface SiteSettings {
  heroTitleEn: string;
  heroTitleId: string;
  heroSubtitleEn: string;
  heroSubtitleId: string;
  heroKickerEn: string;
  heroKickerId: string;
  heroImageUrl: string;
  aboutTitleEn: string;
  aboutTitleId: string;
  aboutDescriptionEn: string;
  aboutDescriptionId: string;
  aboutImageUrl: string;
  contact: ContactConfig;
  bookingUrls: BookingUrlsConfig;
}

export interface CmsDataset {
  properties: Property[];
  siteSettings: SiteSettings;
  blogPosts: BlogPost[];
  reviews: Review[];
  faqs: FAQItem[];
  offers: SpecialOffer[];
  updatedAt?: string;
  updatedBy?: string;
  publishedAt?: string;
  publishedBy?: string;
}

export interface CmsRevision {
  id: string;
  published_at: string;
  published_by: string;
  summary: string;
  snapshot?: CmsDataset;
}

const STORAGE_KEY_SUPABASE_OVERRIDE = 'thewina_supabase_config_override';

export function isValidSupabaseUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (
    trimmed.includes('<') ||
    trimmed.includes('>') ||
    trimmed.includes('your-project-id') ||
    trimmed.includes('project-id')
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

export function isValidSupabaseAnonKey(key: string): boolean {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  if (
    trimmed.includes('<') ||
    trimmed.includes('>') ||
    trimmed.includes('your-anon-key') ||
    trimmed.endsWith('...')
  ) {
    return false;
  }
  return trimmed.length > 20;
}

export function getSupabaseEnvConfig(): { url: string; anonKey: string } {
  let url = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  let anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  // If the env variable contains placeholder values, ignore them
  if (!isValidSupabaseUrl(url)) {
    url = '';
  }
  if (!isValidSupabaseAnonKey(anonKey)) {
    anonKey = '';
  }

  if (!url || !anonKey) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SUPABASE_OVERRIDE);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.url && isValidSupabaseUrl(parsed.url)) {
          url = parsed.url;
        }
        if (parsed.anonKey && isValidSupabaseAnonKey(parsed.anonKey)) {
          anonKey = parsed.anonKey;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  return { url, anonKey };
}

export function saveSupabaseRuntimeConfig(url: string, anonKey: string): void {
  try {
    localStorage.setItem(
      STORAGE_KEY_SUPABASE_OVERRIDE,
      JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
    );
    cachedClient = null; // reset client
  } catch (e) {
    console.error('Failed to save Supabase config in localStorage', e);
  }
}

export function clearSupabaseRuntimeConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_SUPABASE_OVERRIDE);
    cachedClient = null;
  } catch (e) {
    console.error('Failed to clear Supabase config', e);
  }
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseEnvConfig();
  return isValidSupabaseUrl(url) && isValidSupabaseAnonKey(anonKey);
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const { url, anonKey } = getSupabaseEnvConfig();
  if (!isValidSupabaseUrl(url) || !isValidSupabaseAnonKey(anonKey)) {
    return null;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return cachedClient;
  } catch (e) {
    console.warn('Skipping Supabase client initialization (invalid configuration):', e);
    cachedClient = null;
    return null;
  }
}

// Curated default dataset (used when database has no records yet or is offline)
export function getDefaultCmsDataset(): CmsDataset {
  const urls = getStoredBookingUrls();
  const contact = getStoredContact();

  const synchronizedProperties = initialProperties.map((p) => {
    if (p.id === 'echo-beach') return { ...p, bookingUrl: urls.bookingUrlEchoBeach };
    if (p.id === 'guest-house-2') return { ...p, bookingUrl: urls.bookingUrlGuestHouse2 };
    if (p.id === 'guest-house-3') return { ...p, bookingUrl: urls.bookingUrlGuestHouse3 };
    if (p.id === 'villa-01') return { ...p, bookingUrl: urls.bookingUrlVilla01 };
    if (p.id === 'villa-02') return { ...p, bookingUrl: urls.bookingUrlVilla02 };
    return p;
  });

  return {
    properties: synchronizedProperties,
    siteSettings: {
      heroTitleEn: 'Hospitality Perfected in Canggu, Bali',
      heroTitleId: 'Keramahan Otentik Terbaik di Canggu, Bali',
      heroSubtitleEn:
        'Discover refined guest houses and private boutique villas near Echo Beach and Batu Bolong. Thoughtfully curated for restful stays, surf getaways, and extended island living.',
      heroSubtitleId:
        'Temukan penginapan butik dan villa privat dekat Pantai Echo Beach dan Batu Bolong. Dirancang untuk liburan santai, selancar, dan tinggal jangka panjang.',
      heroKickerEn: 'Canggu, Bali · Boutique Guest Houses & Private Villas',
      heroKickerId: 'Canggu, Bali · Penginapan Butik & Villa Privat',
      heroImageUrl: '', // defaults to local asset
      aboutTitleEn: 'Your Stay, Your Comfort, Your Bali Experience.',
      aboutTitleId: 'Kenyamanan Istirahat & Pengalaman Terbaik Anda di Bali.',
      aboutDescriptionEn:
        'The Wina Hospitality manages boutique accommodations across Canggu. We focus on tranquil garden settings, comfortable beds, spotless en-suite bathrooms, high-speed fiber internet, and attentive Balinese hospitality.',
      aboutDescriptionId:
        'The Wina Hospitality mengelola penginapan butik di kawasan Canggu. Kami mengedepankan lingkungan taman yang asri, kasur nyaman, kamar mandi bersih, Wi-Fi fiber optik kencang, dan pelayanan hangat khas Bali.',
      aboutImageUrl: '',
      contact,
      bookingUrls: urls,
    },
    blogPosts,
    reviews: guestReviews,
    faqs: generalFaqs,
    offers: specialOffers,
    updatedAt: new Date().toISOString(),
    updatedBy: 'System Default',
  };
}

// --- CMS Database Operations ---

export async function fetchPublishedCms(): Promise<{ data: CmsDataset; isLive: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  const defaultData = getDefaultCmsDataset();

  if (!supabase) {
    return { data: defaultData, isLive: false };
  }

  try {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('id', 'published')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch published error (falling back to defaults):', error.message);
      return { data: defaultData, isLive: false, error: error.message };
    }

    if (!data) {
      return { data: defaultData, isLive: false };
    }

    // Merge database record with defaults in case new fields were added
    const merged: CmsDataset = {
      properties: Array.isArray(data.properties) && data.properties.length > 0 ? data.properties : defaultData.properties,
      siteSettings: { ...defaultData.siteSettings, ...(data.site_settings || {}) },
      blogPosts: Array.isArray(data.blog_posts) && data.blog_posts.length > 0 ? data.blog_posts : defaultData.blogPosts,
      reviews: Array.isArray(data.reviews) && data.reviews.length > 0 ? data.reviews : defaultData.reviews,
      faqs: Array.isArray(data.faqs) && data.faqs.length > 0 ? data.faqs : defaultData.faqs,
      offers: Array.isArray(data.offers) && data.offers.length > 0 ? data.offers : defaultData.offers,
      publishedAt: data.updated_at,
      publishedBy: data.updated_by,
      updatedAt: data.updated_at,
      updatedBy: data.updated_by,
    };

    return { data: merged, isLive: true };
  } catch (err: any) {
    console.error('Unexpected error fetching from Supabase:', err);
    return { data: defaultData, isLive: false, error: err.message };
  }
}

export async function fetchDraftCms(): Promise<{ data: CmsDataset; isLive: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  const defaultData = getDefaultCmsDataset();

  if (!supabase) {
    // Check local draft fallback
    try {
      const local = localStorage.getItem('thewina_cms_draft_cache');
      if (local) return { data: { ...defaultData, ...JSON.parse(local) }, isLive: false };
    } catch (e) {}
    return { data: defaultData, isLive: false };
  }

  try {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('id', 'draft')
      .maybeSingle();

    if (error) {
      return { data: defaultData, isLive: false, error: error.message };
    }

    if (!data) {
      // If no draft exists yet, check if published exists, else return default
      const published = await fetchPublishedCms();
      return { data: published.data, isLive: published.isLive };
    }

    const merged: CmsDataset = {
      properties: Array.isArray(data.properties) && data.properties.length > 0 ? data.properties : defaultData.properties,
      siteSettings: { ...defaultData.siteSettings, ...(data.site_settings || {}) },
      blogPosts: Array.isArray(data.blog_posts) && data.blog_posts.length > 0 ? data.blog_posts : defaultData.blogPosts,
      reviews: Array.isArray(data.reviews) && data.reviews.length > 0 ? data.reviews : defaultData.reviews,
      faqs: Array.isArray(data.faqs) && data.faqs.length > 0 ? data.faqs : defaultData.faqs,
      offers: Array.isArray(data.offers) && data.offers.length > 0 ? data.offers : defaultData.offers,
      updatedAt: data.updated_at,
      updatedBy: data.updated_by,
    };

    return { data: merged, isLive: true };
  } catch (err: any) {
    return { data: defaultData, isLive: false, error: err.message };
  }
}

export async function saveDraftCms(dataset: CmsDataset, userEmail: string): Promise<{ success: boolean; error?: string }> {
  // Always cache locally first for resilience
  try {
    localStorage.setItem('thewina_cms_draft_cache', JSON.stringify(dataset));
  } catch (e) {}

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: true }; // saved to local cache
  }

  try {
    const payload = {
      id: 'draft',
      properties: dataset.properties,
      site_settings: dataset.siteSettings,
      blog_posts: dataset.blogPosts,
      reviews: dataset.reviews,
      faqs: dataset.faqs,
      offers: dataset.offers,
      updated_at: new Date().toISOString(),
      updated_by: userEmail || 'admin',
    };

    const { error } = await supabase
      .from('cms_content')
      .upsert(payload, { onConflict: 'id' });

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Failed to save draft to Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function publishDraftCms(
  dataset: CmsDataset,
  userEmail: string,
  summary: string = 'Published updates from CMS'
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();

  // Save to local cache as well
  try {
    localStorage.setItem('thewina_cms_published_cache', JSON.stringify(dataset));
  } catch (e) {}

  if (!supabase) {
    return {
      success: false,
      error: 'Supabase is not configured yet. Please configure Supabase URL & Anon Key in the Setup tab.',
    };
  }

  try {
    const timestamp = new Date().toISOString();
    const payload = {
      id: 'published',
      properties: dataset.properties,
      site_settings: dataset.siteSettings,
      blog_posts: dataset.blogPosts,
      reviews: dataset.reviews,
      faqs: dataset.faqs,
      offers: dataset.offers,
      updated_at: timestamp,
      updated_by: userEmail || 'admin',
    };

    // 1. Update published document
    const { error: publishError } = await supabase
      .from('cms_content')
      .upsert(payload, { onConflict: 'id' });

    if (publishError) throw publishError;

    // 2. Also keep draft in sync
    await supabase.from('cms_content').upsert({ ...payload, id: 'draft' }, { onConflict: 'id' });

    // 3. Record revision history snapshot
    try {
      await supabase.from('cms_revisions').insert({
        published_at: timestamp,
        published_by: userEmail || 'admin',
        summary,
        snapshot: dataset,
      });
    } catch (revErr) {
      console.warn('Could not record revision history (cms_revisions table optional):', revErr);
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to publish draft to Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function fetchRevisions(): Promise<CmsRevision[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('cms_revisions')
      .select('id, published_at, published_by, summary')
      .order('published_at', { ascending: false })
      .limit(20);

    if (error || !data) return [];
    return data;
  } catch (e) {
    return [];
  }
}

export async function uploadMediaToStorage(file: File, folder: string = 'uploads'): Promise<{ url: string | null; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      url: null,
      error: 'Supabase is not connected. Configure Supabase URL & Anon Key in the Setup tab.',
    };
  }

  try {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const fileName = `${folder}/${Date.now()}_${cleanName}`;
    const bucketName = 'cms-media';

    // Attempt upload
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '31536000',
        upsert: true,
      });

    if (error) {
      // If error is bucket not found, inform clearly
      if (error.message.includes('not found') || error.message.includes('Bucket')) {
        return {
          url: null,
          error: `Storage bucket "${bucketName}" not found. Please create a public bucket named "${bucketName}" in Supabase Storage.`,
        };
      }
      return { url: null, error: error.message };
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return { url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { url: null, error: err.message || 'Image upload failed' };
  }
}

// --- Ready-to-Run SQL Schema Helper ---
export function getSupabaseSetupSql(): string {
  return `-- ==============================================================================
-- THE WINA HOSPITALITY: CMS DATABASE SCHEMA & STORAGE SETUP
-- Run this script in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create CMS Content Table (Stores published and draft state)
CREATE TABLE IF NOT EXISTS public.cms_content (
  id TEXT PRIMARY KEY,
  properties JSONB NOT NULL DEFAULT '[]'::jsonb,
  site_settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  blog_posts JSONB NOT NULL DEFAULT '[]'::jsonb,
  reviews JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  offers JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_by TEXT DEFAULT 'admin'
);

-- 2. Create Revisions History Table
CREATE TABLE IF NOT EXISTS public.cms_revisions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  published_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  published_by TEXT NOT NULL,
  summary TEXT DEFAULT 'Published content updates',
  snapshot JSONB
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_revisions ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies:
-- Allow anyone (public visitors) to READ published content
DROP POLICY IF EXISTS "Public can view published content" ON public.cms_content;
CREATE POLICY "Public can view published content" 
  ON public.cms_content 
  FOR SELECT 
  USING (id = 'published' OR auth.role() = 'authenticated');

-- Allow authenticated admins to do everything (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Authenticated users full access to content" ON public.cms_content;
CREATE POLICY "Authenticated users full access to content" 
  ON public.cms_content 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Allow authenticated admins to manage revisions
DROP POLICY IF EXISTS "Authenticated users manage revisions" ON public.cms_revisions;
CREATE POLICY "Authenticated users manage revisions" 
  ON public.cms_revisions 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- 5. Create Storage Bucket for Images (Public Bucket)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cms-media', 'cms-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS: Public can view images
DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
CREATE POLICY "Public can view media" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'cms-media');

-- Storage RLS: Authenticated users can upload media
DROP POLICY IF EXISTS "Authenticated can upload media" ON storage.objects;
CREATE POLICY "Authenticated can upload media" 
  ON storage.objects 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'cms-media');

DROP POLICY IF EXISTS "Authenticated can update media" ON storage.objects;
CREATE POLICY "Authenticated can update media" 
  ON storage.objects 
  FOR UPDATE 
  TO authenticated 
  USING (bucket_id = 'cms-media');
`;
}
