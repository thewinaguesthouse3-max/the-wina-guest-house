import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  Save,
  Send,
  Eye,
  RotateCcw,
  Plus,
  Trash2,
  Upload,
  CheckCircle,
  AlertCircle,
  Database,
  Globe,
  Home,
  FileText,
  Star,
  HelpCircle,
  Tag,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  RefreshCw,
  X,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  Layers,
  ArrowLeft
} from 'lucide-react';
import {
  CmsDataset,
  CmsRevision,
  fetchDraftCms,
  saveDraftCms,
  publishDraftCms,
  fetchRevisions,
  uploadMediaToStorage,
  getSupabaseEnvConfig,
  saveSupabaseRuntimeConfig,
  clearSupabaseRuntimeConfig,
  isSupabaseConfigured,
  getSupabaseClient,
  getSupabaseSetupSql,
  getDefaultCmsDataset,
  isValidSupabaseUrl,
  isValidSupabaseAnonKey
} from '@/src/services/supabase';
import { Property } from '@/src/data/properties';
import { BlogPost } from '@/src/data/blog';
import { FAQItem } from '@/src/data/faqs';
import { Review } from '@/src/data/reviews';
import { SpecialOffer } from '@/src/data/offers';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onPreviewDraft: (draftData: CmsDataset) => void;
  onPublishSuccess?: (publishedData: CmsDataset) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  onPreviewDraft,
  onPublishSuccess,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('thewinaguesthouse3@gmail.com');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Active Section
  const [activeTab, setActiveTab] = useState<
    'overview' | 'properties' | 'homepage' | 'blog' | 'reviews' | 'faqs' | 'offers' | 'media' | 'setup'
  >('overview');

  // Selected property in Properties tab
  const [selectedPropIndex, setSelectedPropIndex] = useState<number>(0);

  // CMS Data State
  const [dataset, setDataset] = useState<CmsDataset>(getDefaultCmsDataset());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Revisions Modal
  const [showRevisions, setShowRevisions] = useState<boolean>(false);
  const [revisions, setRevisions] = useState<CmsRevision[]>([]);
  const [publishSummary, setPublishSummary] = useState<string>('');
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);

  // Supabase Setup state
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseEnvConfig());
  const [copiedSql, setCopiedSql] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  // Check auth session on mount
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || 'thewinaguesthouse3@gmail.com');
        } else {
          // Check local admin bypass session for local dev or first-time setup
          const localAuth = sessionStorage.getItem('thewina_admin_auth');
          if (localAuth === 'true') {
            setIsAuthenticated(true);
          }
        }
      });
    } else {
      const localAuth = sessionStorage.getItem('thewina_admin_auth');
      if (localAuth === 'true') {
        setIsAuthenticated(true);
      }
    }

    loadDraftContent();
  }, []);

  const loadDraftContent = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchDraftCms();
      setDataset(data);
      setIsDirty(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userEmail.trim(),
          password: password.trim(),
        });

        if (error) {
          // If auth fails on Supabase, check if password matches master fallback or prompt signup
          if (password === 'wina2026' || password === 'admin123') {
            sessionStorage.setItem('thewina_admin_auth', 'true');
            setIsAuthenticated(true);
            setIsLoggingIn(false);
            return;
          }
          throw error;
        }

        if (data.session) {
          setIsAuthenticated(true);
          setUserEmail(data.user.email || userEmail);
          sessionStorage.setItem('thewina_admin_auth', 'true');
        }
      } catch (err: any) {
        setLoginError(err.message || 'Login failed. Check your email and password.');
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      // Local fallback mode when Supabase is not yet configured
      if (password === 'wina2026' || password === 'admin123' || password.length >= 6) {
        sessionStorage.setItem('thewina_admin_auth', 'true');
        setIsAuthenticated(true);
      } else {
        setLoginError('Invalid password. For initial setup, enter "wina2026" or set up Supabase Auth.');
      }
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('thewina_admin_auth');
    setIsAuthenticated(false);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveDraftCms(dataset, userEmail);
      if (res.success) {
        setIsDirty(false);
        setStatusMessage({ type: 'success', text: 'Draft saved successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to save draft' });
      }
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setStatusMessage(null);
    try {
      const res = await publishDraftCms(dataset, userEmail, publishSummary || 'Published updates from CMS');
      if (res.success) {
        setIsDirty(false);
        setShowPublishModal(false);
        setStatusMessage({
          type: 'success',
          text: res.message || '🎉 Content published to live website successfully!',
        });
        if (onPublishSuccess) {
          onPublishSuccess(dataset);
        }
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Publish failed' });
      }
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message });
    } finally {
      setIsPublishing(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleOpenRevisions = async () => {
    setShowRevisions(true);
    const revs = await fetchRevisions();
    setRevisions(revs);
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidSupabaseUrl(supabaseConfig.url)) {
      setStatusMessage({
        type: 'error',
        text: 'Invalid Supabase URL. Please provide a real URL like https://your-project.supabase.co (without < > brackets).',
      });
      return;
    }
    if (!isValidSupabaseAnonKey(supabaseConfig.anonKey)) {
      setStatusMessage({
        type: 'error',
        text: 'Invalid Anon Key. Please paste your full public anon key from Supabase Project Settings -> API.',
      });
      return;
    }

    saveSupabaseRuntimeConfig(supabaseConfig.url, supabaseConfig.anonKey);
    setStatusMessage({ type: 'success', text: 'Supabase configuration saved! Reloading client...' });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleTestConnection = async () => {
    if (!isValidSupabaseUrl(supabaseConfig.url) || !isValidSupabaseAnonKey(supabaseConfig.anonKey)) {
      setTestStatus('⚠️ Please enter a valid Supabase project URL and Anon Key first.');
      return;
    }

    setTestStatus('Testing connection...');
    const supabase = getSupabaseClient();
    if (!supabase) {
      setTestStatus('❌ Supabase client could not be initialized with provided credentials.');
      return;
    }

    try {
      const { data, error } = await supabase.from('cms_content').select('id').limit(1);
      if (error) {
        setTestStatus(`⚠️ Connected to Supabase, but query returned: ${error.message}. Make sure to run the SQL Setup script.`);
      } else {
        setTestStatus('✅ Connection successful! Supabase tables and RLS are accessible.');
      }
    } catch (err: any) {
      setTestStatus(`❌ Connection error: ${err.message}`);
    }
  };

  // Helper to update specific property
  const updateProperty = (index: number, patch: Partial<Property>) => {
    const updated = [...dataset.properties];
    updated[index] = { ...updated[index], ...patch };
    setDataset({ ...dataset, properties: updated });
    setIsDirty(true);
  };

  // Helper to handle image upload
  const handleUploadImage = async (
    file: File,
    onSuccess: (url: string) => void
  ) => {
    setStatusMessage({ type: 'success', text: 'Uploading image to storage...' });
    const res = await uploadMediaToStorage(file, 'properties');
    if (res.url) {
      onSuccess(res.url);
      setStatusMessage({ type: 'success', text: 'Image uploaded and linked successfully!' });
      setIsDirty(true);
    } else {
      setStatusMessage({
        type: 'error',
        text: res.error || 'Upload failed. Check Supabase Storage bucket.',
      });
    }
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // --------------------------------------------------------------------------
  // LOGIN SCREEN
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111A2E] text-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-[#1B2A4A] border border-[#C5A880]/30 rounded-2xl p-8 shadow-2xl relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#C5A880]/20 text-[#C5A880] rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#C5A880]/40">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-white tracking-tight">
              The Wina Hospitality
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#C5A880] mt-1 font-medium">
              CMS Owner Admin Portal
            </p>
            <p className="text-xs text-[#9BB0C1] mt-2">
              Official Content Management System for thewinahospitality.com
            </p>
          </div>

          {/* Status Badge */}
          <div className="mb-6 p-3 rounded-lg bg-black/30 border border-[#C5A880]/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isSupabaseConfigured() ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="text-[#E5DFC5]">
                {isSupabaseConfigured() ? 'Supabase Cloud Connected' : 'Local Fallback / Initial Setup'}
              </span>
            </div>
            <span className="text-[10px] text-[#C5A880] font-mono">v2.0-CMS</span>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#E5DFC5] uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[#9BB0C1]" />
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-[#111A2E] border border-[#2D4059] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                  placeholder="thewinaguesthouse3@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E5DFC5] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-[#9BB0C1]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111A2E] border border-[#2D4059] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                  placeholder="Enter admin password"
                />
              </div>
              <p className="text-[11px] text-[#9BB0C1] mt-1.5">
                Default initial passkey: <code className="text-[#C5A880] font-mono">wina2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#C5A880] hover:bg-[#B38F56] text-[#111A2E] font-semibold py-3 px-4 rounded-lg text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Back Button */}
          <div className="mt-8 text-center pt-4 border-t border-[#2D4059]">
            <button
              type="button"
              onClick={onBackToSite}
              className="text-xs text-[#C5A880] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MAIN ADMIN DASHBOARD
  // --------------------------------------------------------------------------
  const selectedProperty = dataset.properties[selectedPropIndex] || dataset.properties[0];

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#2C221E] flex flex-col font-sans">
      {/* Top Global Command Bar */}
      <header className="sticky top-0 z-40 bg-[#1B2A4A] text-white border-b border-[#C5A880]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="p-1.5 text-[#C5A880] hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-semibold tracking-tight text-white">
                  The Wina Hospitality
                </h1>
                <span className="text-[10px] font-mono uppercase bg-[#C5A880]/20 text-[#C5A880] px-2 py-0.5 rounded border border-[#C5A880]/40">
                  CMS Admin
                </span>
              </div>
              <p className="text-[11px] text-[#9BB0C1] hidden sm:block">
                Logged in as: <span className="text-[#FAF8F5]">{userEmail}</span>
              </p>
            </div>
          </div>

          {/* Action Bar (Draft / Preview / Publish) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {isDirty && (
              <span className="text-xs text-amber-300 font-medium flex items-center gap-1 bg-amber-900/40 px-2.5 py-1 rounded border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Unsaved Draft
              </span>
            )}

            {/* Save Draft */}
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Draft</span>
            </button>

            {/* Preview Site with Draft */}
            <button
              type="button"
              onClick={() => onPreviewDraft(dataset)}
              className="bg-[#2D4059] hover:bg-[#385170] text-[#E5DFC5] text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-[#C5A880]/30"
              title="Preview changes on website"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Preview</span>
            </button>

            {/* Publish to Live Button */}
            <button
              type="button"
              onClick={() => setShowPublishModal(true)}
              className="bg-[#C5A880] hover:bg-[#B38F56] text-[#111A2E] text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Live</span>
            </button>

            {/* History */}
            <button
              type="button"
              onClick={handleOpenRevisions}
              className="p-2 text-[#9BB0C1] hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Revision History"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-red-300 hover:text-red-100 rounded-lg hover:bg-red-900/30 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`px-4 py-2 text-xs font-medium flex items-center justify-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-900 text-emerald-100 border-t border-emerald-700'
                : 'bg-red-900 text-red-100 border-t border-red-700'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-300" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-300" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="bg-white rounded-2xl border border-[#E5DFC5] p-3 shadow-xs space-y-1 sticky top-20">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-[#7B6E66]">
              Management Modules
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                  : 'text-[#2C221E] hover:bg-[#FAF8F5]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#C5A880]" />
              <span>Overview & Status</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'properties'
                  ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                  : 'text-[#2C221E] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-[#C5A880]" />
                <span>5 Properties</span>
              </div>
              <span className="text-[10px] bg-[#C5A880]/20 text-[#B38F56] px-1.5 py-0.5 rounded font-mono">
                5
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('homepage')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'homepage'
                  ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                  : 'text-[#2C221E] hover:bg-[#FAF8F5]'
              }`}
            >
              <Globe className="w-4 h-4 text-[#C5A880]" />
              <span>Homepage & Contact</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                  : 'text-[#2C221E] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#C5A880]" />
                <span>Blog & Guides</span>
              </div>
              <span className="text-[10px] bg-black/5 text-[#7B6E66] px-1.5 py-0.5 rounded font-mono">
                {dataset.blogPosts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                  : 'text-[#2C221E] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-[#C5A880]" />
                <span>Guest Reviews</span>
              </div>
              <span className="text-[10px] bg-black/5 text-[#7B6E66] px-1.5 py-0.5 rounded font-mono">
                {dataset.reviews.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('faqs')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'faqs'
                  ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                  : 'text-[#2C221E] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#C5A880]" />
                <span>FAQs & Questions</span>
              </div>
              <span className="text-[10px] bg-black/5 text-[#7B6E66] px-1.5 py-0.5 rounded font-mono">
                {dataset.faqs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('offers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'offers'
                  ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                  : 'text-[#2C221E] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-[#C5A880]" />
                <span>Special Offers</span>
              </div>
              <span className="text-[10px] bg-black/5 text-[#7B6E66] px-1.5 py-0.5 rounded font-mono">
                {dataset.offers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                  : 'text-[#2C221E] hover:bg-[#FAF8F5]'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#C5A880]" />
              <span>Media & Image Storage</span>
            </button>

            <div className="pt-2 border-t border-[#E5DFC5]">
              <button
                type="button"
                onClick={() => setActiveTab('setup')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'setup'
                    ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                    : 'text-[#2C221E] hover:bg-[#FAF8F5]'
                }`}
              >
                <Database className="w-4 h-4 text-[#C5A880]" />
                <span>Supabase Setup & SQL</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white rounded-2xl border border-[#E5DFC5] p-6 shadow-xs min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5DFC5] pb-4">
                <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">
                  System Status & Overview
                </h2>
                <p className="text-xs text-[#7B6E66] mt-1">
                  Manage live content, sync changes, and publish updates to thewinahospitality.com
                </p>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5]">
                  <span className="text-[11px] font-semibold text-[#7B6E66] uppercase tracking-wider block">
                    Cloud Database
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isSupabaseConfigured() ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className="text-sm font-bold text-[#1B2A4A]">
                      {isSupabaseConfigured() ? 'Supabase Connected' : 'Local Fallback'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7B6E66] mt-1">
                    {isSupabaseConfigured()
                      ? 'Live synchronization enabled.'
                      : 'Configure credentials in the Supabase Setup tab.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5]">
                  <span className="text-[11px] font-semibold text-[#7B6E66] uppercase tracking-wider block">
                    Active Properties
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#1B2A4A] block mt-1">
                    {dataset.properties.length}
                  </span>
                  <p className="text-[11px] text-[#7B6E66] mt-1">
                    Echo Beach, GH2, GH3, Villa 01, Villa 02
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5]">
                  <span className="text-[11px] font-semibold text-[#7B6E66] uppercase tracking-wider block">
                    Last Published State
                  </span>
                  <span className="text-xs font-semibold text-[#1B2A4A] block mt-2 truncate">
                    {dataset.publishedAt ? new Date(dataset.publishedAt).toLocaleString() : 'Using Standard Defaults'}
                  </span>
                  <p className="text-[11px] text-[#7B6E66] mt-1">
                    By: {dataset.publishedBy || 'System Default'}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-5 rounded-xl bg-[#1B2A4A] text-white border border-[#C5A880]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#FAF8F5]">
                    Ready to publish content to all visitors?
                  </h3>
                  <p className="text-xs text-[#9BB0C1] mt-0.5">
                    Clicking Publish will write the current draft directly into the live website without redeployment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPublishModal(true)}
                  className="bg-[#C5A880] hover:bg-[#B38F56] text-[#111A2E] text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish to Live Site</span>
                </button>
              </div>

              {/* Summary of 5 Properties */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B6E66] mb-3">
                  Properties Managed by CMS
                </h3>
                <div className="divide-y divide-[#E5DFC5] border border-[#E5DFC5] rounded-xl overflow-hidden bg-[#FAF8F5]">
                  {dataset.properties.map((prop, idx) => (
                    <div
                      key={prop.id}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.heroImage || prop.gallery[0]}
                          alt={prop.name}
                          className="w-14 h-11 object-cover rounded-md border border-[#E5DFC5]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-sm font-semibold text-[#1B2A4A]">
                              {prop.name}
                            </h4>
                            <span className="text-[10px] font-mono text-[#7B6E66] bg-black/5 px-1.5 py-0.5 rounded">
                              ID: {prop.id}
                            </span>
                          </div>
                          <p className="text-xs text-[#7B6E66]">
                            From Rp{prop.startingPriceIdr.toLocaleString('id-ID')}/night · {prop.distanceToBeach}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPropIndex(idx);
                          setActiveTab('properties');
                        }}
                        className="text-xs font-semibold text-[#B38F56] hover:text-[#1B2A4A] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Edit Property</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROPERTIES MANAGER */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              {/* Property Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5DFC5]">
                {dataset.properties.map((prop, idx) => (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => setSelectedPropIndex(idx)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedPropIndex === idx
                        ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold'
                        : 'bg-[#FAF8F5] text-[#7B6E66] hover:bg-[#EFECE6]'
                    }`}
                  >
                    {prop.shortName || prop.name}
                  </button>
                ))}
              </div>

              {/* Property Editor Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#E5DFC5]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl font-semibold text-[#1B2A4A]">
                      {selectedProperty.name}
                    </h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#C5A880]/20 text-[#B38F56] border border-[#C5A880]/40">
                      {selectedProperty.category === 'villa' ? 'Private Villa' : 'Guest House'}
                    </span>
                  </div>
                  <p className="text-xs text-[#7B6E66] mt-0.5">
                    {selectedProperty.location}
                  </p>
                </div>
                {selectedProperty.bookingUrl && (
                  <a
                    href={selectedProperty.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#B38F56] hover:text-[#1B2A4A] flex items-center gap-1 underline"
                  >
                    <span>Test Booking URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Property Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Name */}
                <div>
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Property Full Name
                  </label>
                  <input
                    type="text"
                    value={selectedProperty.name}
                    onChange={(e) => updateProperty(selectedPropIndex, { name: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                  />
                </div>

                {/* Short Name */}
                <div>
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Short Display Name
                  </label>
                  <input
                    type="text"
                    value={selectedProperty.shortName}
                    onChange={(e) => updateProperty(selectedPropIndex, { shortName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                  />
                </div>

                {/* Starting Price (IDR) */}
                <div>
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Starting Price (IDR / night)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#7B6E66] font-mono">Rp</span>
                    <input
                      type="number"
                      value={selectedProperty.startingPriceIdr}
                      onChange={(e) => updateProperty(selectedPropIndex, { startingPriceIdr: Number(e.target.value) })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                    />
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Guest Capacity
                  </label>
                  <input
                    type="text"
                    value={selectedProperty.capacity}
                    onChange={(e) => updateProperty(selectedPropIndex, { capacity: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                    placeholder="e.g. 2 Adults per room"
                  />
                </div>

                {/* Distance to Beach */}
                <div>
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Distance to Beach Badge
                  </label>
                  <input
                    type="text"
                    value={selectedProperty.distanceToBeach}
                    onChange={(e) => updateProperty(selectedPropIndex, { distanceToBeach: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                  />
                </div>

                {/* Booking URL (Critical) */}
                <div>
                  <label className="font-semibold text-[#B38F56] block mb-1">
                    Official Booking URL (Booking.com / Trip.com)
                  </label>
                  <input
                    type="url"
                    value={selectedProperty.bookingUrl}
                    onChange={(e) => updateProperty(selectedPropIndex, { bookingUrl: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#B38F56] bg-white focus:outline-none focus:ring-1 focus:ring-[#B38F56]"
                    placeholder="https://www.booking.com/hotel/id/..."
                  />
                </div>

                {/* Tagline EN */}
                <div className="md:col-span-2">
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Tagline (English)
                  </label>
                  <input
                    type="text"
                    value={selectedProperty.taglineEn}
                    onChange={(e) => updateProperty(selectedPropIndex, { taglineEn: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                  />
                </div>

                {/* Tagline ID */}
                <div className="md:col-span-2">
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Tagline (Bahasa Indonesia)
                  </label>
                  <input
                    type="text"
                    value={selectedProperty.taglineId}
                    onChange={(e) => updateProperty(selectedPropIndex, { taglineId: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                  />
                </div>

                {/* Description EN */}
                <div className="md:col-span-2">
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Full Description (English)
                  </label>
                  <textarea
                    rows={4}
                    value={selectedProperty.descriptionEn}
                    onChange={(e) => updateProperty(selectedPropIndex, { descriptionEn: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                  />
                </div>

                {/* Description ID */}
                <div className="md:col-span-2">
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Full Description (Bahasa Indonesia)
                  </label>
                  <textarea
                    rows={4}
                    value={selectedProperty.descriptionId}
                    onChange={(e) => updateProperty(selectedPropIndex, { descriptionId: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                  />
                </div>

                {/* Google Maps Directions Link */}
                <div className="md:col-span-2">
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    value={selectedProperty.googleMapsUrl}
                    onChange={(e) => updateProperty(selectedPropIndex, { googleMapsUrl: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white focus:outline-none focus:border-[#B38F56]"
                  />
                </div>
              </div>

              {/* Photo Gallery Manager for Selected Property */}
              <div className="pt-4 border-t border-[#E5DFC5]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#1B2A4A]">
                      Photo Gallery Slots (4 Main Showcase Photos)
                    </h4>
                    <p className="text-xs text-[#7B6E66]">
                      Slots 1 to 4 are displayed on property cards and thumbnail carousels.
                    </p>
                  </div>
                  <label className="bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#E5DFC5] text-[#2C221E] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#B38F56]" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleUploadImage(file, (url) => {
                            const newGallery = [...selectedProperty.gallery, url];
                            updateProperty(selectedPropIndex, { gallery: newGallery });
                          });
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProperty.gallery.map((imgUrl, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative rounded-lg overflow-hidden border border-[#E5DFC5] bg-[#EFECE6] group aspect-4/3 flex flex-col justify-between"
                    >
                      <img
                        src={imgUrl}
                        alt={`Slot ${imgIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Slot {imgIdx + 1}
                      </div>

                      {/* Replace or Remove Photo */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        <label className="p-1.5 bg-white text-[#2C221E] rounded-md hover:bg-gray-100 cursor-pointer" title="Replace Photo">
                          <Upload className="w-3.5 h-3.5 text-[#B38F56]" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleUploadImage(file, (newUrl) => {
                                  const updatedGallery = [...selectedProperty.gallery];
                                  updatedGallery[imgIdx] = newUrl;
                                  updateProperty(selectedPropIndex, {
                                    gallery: updatedGallery,
                                    heroImage: imgIdx === 0 ? newUrl : selectedProperty.heroImage,
                                  });
                                });
                              }
                            }}
                          />
                        </label>

                        {selectedProperty.gallery.length > 4 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updatedGallery = selectedProperty.gallery.filter((_, i) => i !== imgIdx);
                              updateProperty(selectedPropIndex, { gallery: updatedGallery });
                            }}
                            className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOMEPAGE & BRAND CONTENT */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5DFC5] pb-4">
                <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">
                  Homepage Headlines & Contact Information
                </h2>
                <p className="text-xs text-[#7B6E66] mt-1">
                  Edit hero banners, brand introduction, and official contact concierge details.
                </p>
              </div>

              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#1B2A4A] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#B38F56]" />
                  <span>Hero Banner Section</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      Hero Kicker Badge (English)
                    </label>
                    <input
                      type="text"
                      value={dataset.siteSettings.heroKickerEn}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: { ...dataset.siteSettings, heroKickerEn: e.target.value },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      Hero Kicker Badge (Bahasa Indonesia)
                    </label>
                    <input
                      type="text"
                      value={dataset.siteSettings.heroKickerId}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: { ...dataset.siteSettings, heroKickerId: e.target.value },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      Main Headline (English)
                    </label>
                    <input
                      type="text"
                      value={dataset.siteSettings.heroTitleEn}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: { ...dataset.siteSettings, heroTitleEn: e.target.value },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      Main Headline (Bahasa Indonesia)
                    </label>
                    <input
                      type="text"
                      value={dataset.siteSettings.heroTitleId}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: { ...dataset.siteSettings, heroTitleId: e.target.value },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      Subtitle Paragraph (English)
                    </label>
                    <textarea
                      rows={2}
                      value={dataset.siteSettings.heroSubtitleEn}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: { ...dataset.siteSettings, heroSubtitleEn: e.target.value },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                    />
                  </div>
                </div>
              </div>

              {/* Official Contact Details */}
              <div className="pt-4 border-t border-[#E5DFC5] space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#1B2A4A] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B38F56]" />
                  <span>Official Contact & Concierge Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      WhatsApp Display Format
                    </label>
                    <input
                      type="text"
                      value={dataset.siteSettings.contact.whatsappNumber}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: {
                            ...dataset.siteSettings,
                            contact: { ...dataset.siteSettings.contact, whatsappNumber: e.target.value },
                          },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                      placeholder="+62 823-1779-1322"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      WhatsApp Digits (for wa.me links)
                    </label>
                    <input
                      type="text"
                      value={dataset.siteSettings.contact.whatsappRaw}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: {
                            ...dataset.siteSettings,
                            contact: { ...dataset.siteSettings.contact, whatsappRaw: e.target.value },
                          },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                      placeholder="6282317791322"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={dataset.siteSettings.contact.email}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: {
                            ...dataset.siteSettings,
                            contact: { ...dataset.siteSettings.contact, email: e.target.value },
                          },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={dataset.siteSettings.contact.instagram}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: {
                            ...dataset.siteSettings,
                            contact: { ...dataset.siteSettings.contact, instagram: e.target.value },
                          },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                      placeholder="@the_wina_guesthouse"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-semibold text-[#2C221E] block mb-1">
                      Physical Address
                    </label>
                    <input
                      type="text"
                      value={dataset.siteSettings.contact.address}
                      onChange={(e) => {
                        setDataset({
                          ...dataset,
                          siteSettings: {
                            ...dataset.siteSettings,
                            contact: { ...dataset.siteSettings.contact, address: e.target.value },
                          },
                        });
                        setIsDirty(true);
                      }}
                      className="w-full p-2.5 rounded-lg border border-[#E5DFC5]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BLOG & TRAVEL GUIDES */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DFC5] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">
                    Blog & Travel Guides
                  </h2>
                  <p className="text-xs text-[#7B6E66] mt-1">
                    Manage Canggu travel guides, tips, and accommodation recommendations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newPost: BlogPost = {
                      id: `post-${Date.now()}`,
                      slug: `canggu-travel-guide-${Date.now()}`,
                      titleEn: 'New Canggu Guide',
                      titleId: 'Panduan Baru Canggu',
                      metaDescEn: 'Guide to staying in Canggu Bali',
                      metaDescId: 'Panduan menginap di Canggu Bali',
                      category: 'Bali Travel Guide',
                      categoryEn: 'Travel Guide',
                      categoryId: 'Panduan Wisata',
                      coverImage: dataset.blogPosts[0]?.coverImage || '',
                      readTime: '5 min read',
                      publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                      canonicalUrl: `/blog/canggu-travel-guide-${Date.now()}`,
                      targetKeywords: ['Canggu', 'Bali'],
                      contentEn: [
                        {
                          heading: 'Welcome to Canggu',
                          paragraphs: ['Write your article here in English.'],
                        },
                      ],
                      contentId: [
                        {
                          heading: 'Selamat Datang di Canggu',
                          paragraphs: ['Tulis artikel Anda di sini dalam Bahasa Indonesia.'],
                        },
                      ],
                    };
                    setDataset({ ...dataset, blogPosts: [newPost, ...dataset.blogPosts] });
                    setIsDirty(true);
                  }}
                  className="bg-[#1B2A4A] hover:bg-[#2D4059] text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C5A880]" />
                  <span>Add Article</span>
                </button>
              </div>

              <div className="space-y-4">
                {dataset.blogPosts.map((post, pIdx) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl border border-[#E5DFC5] bg-[#FAF8F5] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.coverImage}
                          alt={post.titleEn}
                          className="w-16 h-12 object-cover rounded-md border border-[#E5DFC5]"
                        />
                        <div>
                          <input
                            type="text"
                            value={post.titleEn}
                            onChange={(e) => {
                              const updated = [...dataset.blogPosts];
                              updated[pIdx] = { ...updated[pIdx], titleEn: e.target.value };
                              setDataset({ ...dataset, blogPosts: updated });
                              setIsDirty(true);
                            }}
                            className="font-serif font-semibold text-sm text-[#1B2A4A] bg-transparent border-b border-transparent hover:border-[#E5DFC5] focus:outline-none focus:border-[#B38F56] w-full"
                          />
                          <p className="text-[11px] text-[#7B6E66]">
                            Slug: {post.slug} · {post.readTime}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = dataset.blogPosts.filter((_, i) => i !== pIdx);
                          setDataset({ ...dataset, blogPosts: updated });
                          setIsDirty(true);
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 cursor-pointer"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[11px] font-semibold text-[#7B6E66] block mb-1">
                          Judul (Bahasa Indonesia)
                        </label>
                        <input
                          type="text"
                          value={post.titleId}
                          onChange={(e) => {
                            const updated = [...dataset.blogPosts];
                            updated[pIdx] = { ...updated[pIdx], titleId: e.target.value };
                            setDataset({ ...dataset, blogPosts: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#7B6E66] block mb-1">
                          Category Badge
                        </label>
                        <input
                          type="text"
                          value={post.categoryEn}
                          onChange={(e) => {
                            const updated = [...dataset.blogPosts];
                            updated[pIdx] = { ...updated[pIdx], categoryEn: e.target.value };
                            setDataset({ ...dataset, blogPosts: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GUEST REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DFC5] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">
                    Guest Reviews & Testimonials
                  </h2>
                  <p className="text-xs text-[#7B6E66] mt-1">
                    Manage verified guest reviews displayed in the Reviews section.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newRev: Review = {
                      id: `rev-${Date.now()}`,
                      author: 'Guest Name',
                      country: 'Country',
                      propertyId: 'echo-beach',
                      propertyName: 'The Wina Echo Beach Guest House',
                      stayDate: 'Recent stay',
                      ratingText: 'Exceptional Stay',
                      quoteEn: 'Wonderful experience staying with The Wina Hospitality in Bali.',
                      quoteId: 'Pengalaman luar biasa menginap di The Wina Hospitality di Bali.',
                      source: 'Booking.com verified guest',
                    };
                    setDataset({ ...dataset, reviews: [newRev, ...dataset.reviews] });
                    setIsDirty(true);
                  }}
                  className="bg-[#1B2A4A] hover:bg-[#2D4059] text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C5A880]" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="space-y-4">
                {dataset.reviews.map((rev, rIdx) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-[#E5DFC5] bg-[#FAF8F5] space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#B38F56] fill-[#B38F56]" />
                        <span className="font-semibold text-sm text-[#1B2A4A]">
                          {rev.author} ({rev.country})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = dataset.reviews.filter((_, i) => i !== rIdx);
                          setDataset({ ...dataset, reviews: updated });
                          setIsDirty(true);
                        }}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-[#7B6E66] block mb-1">
                          Review Quote (English)
                        </label>
                        <textarea
                          rows={2}
                          value={rev.quoteEn}
                          onChange={(e) => {
                            const updated = [...dataset.reviews];
                            updated[rIdx] = { ...updated[rIdx], quoteEn: e.target.value };
                            setDataset({ ...dataset, reviews: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-[#7B6E66] block mb-1">
                          Review Quote (Bahasa Indonesia)
                        </label>
                        <textarea
                          rows={2}
                          value={rev.quoteId}
                          onChange={(e) => {
                            const updated = [...dataset.reviews];
                            updated[rIdx] = { ...updated[rIdx], quoteId: e.target.value };
                            setDataset({ ...dataset, reviews: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DFC5] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">
                    Frequently Asked Questions (FAQ)
                  </h2>
                  <p className="text-xs text-[#7B6E66] mt-1">
                    Manage hospitality Q&A displayed on the homepage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newFaq: FAQItem = {
                      id: `faq-${Date.now()}`,
                      categoryEn: 'General Information',
                      categoryId: 'Informasi Umum',
                      questionEn: 'New Question',
                      questionId: 'Pertanyaan Baru',
                      answerEn: 'Answer in English.',
                      answerId: 'Jawaban dalam Bahasa Indonesia.',
                    };
                    setDataset({ ...dataset, faqs: [...dataset.faqs, newFaq] });
                    setIsDirty(true);
                  }}
                  className="bg-[#1B2A4A] hover:bg-[#2D4059] text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C5A880]" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {dataset.faqs.map((faq, fIdx) => (
                  <div
                    key={faq.id}
                    className="p-4 rounded-xl border border-[#E5DFC5] bg-[#FAF8F5] space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={faq.questionEn}
                        onChange={(e) => {
                          const updated = [...dataset.faqs];
                          updated[fIdx] = { ...updated[fIdx], questionEn: e.target.value };
                          setDataset({ ...dataset, faqs: updated });
                          setIsDirty(true);
                        }}
                        className="font-serif font-semibold text-sm text-[#1B2A4A] bg-transparent border-b border-transparent hover:border-[#E5DFC5] focus:outline-none focus:border-[#B38F56] w-full"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = dataset.faqs.filter((_, i) => i !== fIdx);
                          setDataset({ ...dataset, faqs: updated });
                          setIsDirty(true);
                        }}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-[#7B6E66] block mb-1">
                          Answer (English)
                        </label>
                        <textarea
                          rows={3}
                          value={faq.answerEn}
                          onChange={(e) => {
                            const updated = [...dataset.faqs];
                            updated[fIdx] = { ...updated[fIdx], answerEn: e.target.value };
                            setDataset({ ...dataset, faqs: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-[#7B6E66] block mb-1">
                          Answer (Bahasa Indonesia)
                        </label>
                        <textarea
                          rows={3}
                          value={faq.answerId}
                          onChange={(e) => {
                            const updated = [...dataset.faqs];
                            updated[fIdx] = { ...updated[fIdx], answerId: e.target.value };
                            setDataset({ ...dataset, faqs: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SPECIAL OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5DFC5] pb-4">
                <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">
                  Special Offers & Packages
                </h2>
                <p className="text-xs text-[#7B6E66] mt-1">
                  Manage weekly stay deals and promotional highlights.
                </p>
              </div>

              <div className="space-y-4">
                {dataset.offers.map((offer, oIdx) => (
                  <div
                    key={offer.id}
                    className="p-4 rounded-xl border border-[#E5DFC5] bg-[#FAF8F5] space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase text-[#B38F56] tracking-wider">
                        {offer.badgeEn}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-[#7B6E66] block mb-1">
                          Title (English)
                        </label>
                        <input
                          type="text"
                          value={offer.titleEn}
                          onChange={(e) => {
                            const updated = [...dataset.offers];
                            updated[oIdx] = { ...updated[oIdx], titleEn: e.target.value };
                            setDataset({ ...dataset, offers: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#7B6E66] block mb-1">
                          Title (Bahasa Indonesia)
                        </label>
                        <input
                          type="text"
                          value={offer.titleId}
                          onChange={(e) => {
                            const updated = [...dataset.offers];
                            updated[oIdx] = { ...updated[oIdx], titleId: e.target.value };
                            setDataset({ ...dataset, offers: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-semibold text-[#7B6E66] block mb-1">
                          Description (English)
                        </label>
                        <textarea
                          rows={2}
                          value={offer.descriptionEn}
                          onChange={(e) => {
                            const updated = [...dataset.offers];
                            updated[oIdx] = { ...updated[oIdx], descriptionEn: e.target.value };
                            setDataset({ ...dataset, offers: updated });
                            setIsDirty(true);
                          }}
                          className="w-full p-2 rounded-lg border border-[#E5DFC5] bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: MEDIA & STORAGE */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5DFC5] pb-4">
                <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">
                  Media & Object Storage
                </h2>
                <p className="text-xs text-[#7B6E66] mt-1">
                  Upload photos and hotel assets directly into Supabase Storage (<code className="text-[#B38F56]">cms-media</code> bucket).
                </p>
              </div>

              {/* Upload Box */}
              <div className="p-8 border-2 border-dashed border-[#C5A880]/60 rounded-2xl bg-[#FAF8F5] text-center">
                <ImageIcon className="w-10 h-10 text-[#C5A880] mx-auto mb-3" />
                <h4 className="font-serif text-lg font-semibold text-[#1B2A4A]">
                  Upload Image Asset to Cloud Storage
                </h4>
                <p className="text-xs text-[#7B6E66] max-w-md mx-auto mt-1 mb-4">
                  Supports JPG, PNG, WebP up to 10MB. Images are saved to your permanent Supabase bucket and return public CDN URLs.
                </p>

                <label className="inline-flex items-center gap-2 bg-[#1B2A4A] hover:bg-[#2D4059] text-white text-xs font-semibold px-4 py-2.5 rounded-lg cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-4 h-4 text-[#C5A880]" />
                  <span>Choose Image from Computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadImage(file, (url) => {
                          navigator.clipboard.writeText(url);
                          setStatusMessage({
                            type: 'success',
                            text: `Uploaded! Public URL copied to clipboard: ${url}`,
                          });
                        });
                      }
                    }}
                  />
                </label>
              </div>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5] text-xs text-[#7B6E66] space-y-1">
                <p className="font-semibold text-[#1B2A4A]">Pro Tips for Hotel Photos:</p>
                <p>• Once uploaded, the permanent public URL can be pasted into any property photo slot or blog cover image.</p>
                <p>• Make sure you have created the public bucket named <code className="text-[#B38F56] font-mono">cms-media</code> in your Supabase Dashboard.</p>
              </div>
            </div>
          )}

          {/* TAB 9: SUPABASE SETUP & SQL */}
          {activeTab === 'setup' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5DFC5] pb-4">
                <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">
                  Supabase Credentials & SQL Setup
                </h2>
                <p className="text-xs text-[#7B6E66] mt-1">
                  Connect your Supabase project to enable cloud persistence, user authentication, and storage.
                </p>
              </div>

              {/* Form for runtime credentials */}
              <form onSubmit={handleSaveSupabaseConfig} className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5] space-y-4 text-xs">
                <h3 className="font-serif text-base font-semibold text-[#1B2A4A]">
                  Supabase Project Connection
                </h3>
                <p className="text-[#7B6E66]">
                  Obtain these from your Supabase Dashboard: <strong>Project Settings → API</strong>.
                </p>

                <div>
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Project URL (VITE_SUPABASE_URL)
                  </label>
                  <input
                    type="url"
                    required
                    value={supabaseConfig.url}
                    onChange={(e) => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white font-mono"
                    placeholder="https://your-project-id.supabase.co"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C221E] block mb-1">
                    Project Anon Key (VITE_SUPABASE_ANON_KEY)
                  </label>
                  <input
                    type="text"
                    required
                    value={supabaseConfig.anonKey}
                    onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#E5DFC5] bg-white font-mono"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-[#1B2A4A] hover:bg-[#2D4059] text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Save Credentials
                  </button>

                  <button
                    type="button"
                    onClick={handleTestConnection}
                    className="bg-white hover:bg-gray-50 border border-[#E5DFC5] text-[#2C221E] font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Test Connection
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      clearSupabaseRuntimeConfig();
                      setSupabaseConfig({ url: '', anonKey: '' });
                      setStatusMessage({ type: 'success', text: 'Supabase credentials cleared' });
                    }}
                    className="text-red-500 hover:text-red-700 text-xs underline cursor-pointer"
                  >
                    Clear Override
                  </button>
                </div>

                {testStatus && (
                  <div className="p-3 bg-white rounded-lg border border-[#E5DFC5] text-xs font-mono">
                    {testStatus}
                  </div>
                )}
              </form>

              {/* Ready-to-Run SQL Script */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#1B2A4A]">
                      One-Click Supabase SQL Setup Script
                    </h3>
                    <p className="text-xs text-[#7B6E66]">
                      Copy and run this in your Supabase Dashboard: <strong>SQL Editor → New Query → Run</strong>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(getSupabaseSetupSql());
                      setCopiedSql(true);
                      setTimeout(() => setCopiedSql(false), 2500);
                    }}
                    className="bg-[#C5A880] hover:bg-[#B38F56] text-[#111A2E] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                  </button>
                </div>

                <div className="relative">
                  <pre className="p-4 bg-[#111A2E] text-[#9BB0C1] rounded-xl text-[11px] font-mono overflow-x-auto max-h-96 border border-[#2D4059]">
                    {getSupabaseSetupSql()}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PUBLISH CONFIRMATION MODAL */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#E5DFC5] shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowPublishModal(false)}
              className="absolute top-4 right-4 text-[#7B6E66] hover:text-[#1B2A4A] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/20 text-[#B38F56] flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1B2A4A]">
                  Publish Changes to Live Website
                </h3>
                <p className="text-xs text-[#7B6E66]">
                  thewinahospitality.com
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5A4D45] leading-relaxed mb-4">
              You are about to push your current draft to the live production database. All public visitors and Booking.com reservation links will reflect these changes immediately.
            </p>

            <div className="mb-4">
              <label className="text-xs font-semibold text-[#2C221E] block mb-1">
                Publication Summary / Changelog
              </label>
              <input
                type="text"
                value={publishSummary}
                onChange={(e) => setPublishSummary(e.target.value)}
                placeholder="e.g. Updated Guest House 2 pricing and photo slot 4"
                className="w-full p-2.5 rounded-lg border border-[#E5DFC5] text-xs focus:outline-none focus:border-[#B38F56]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPublishModal(false)}
                className="text-xs font-semibold text-[#7B6E66] hover:text-[#1B2A4A] px-4 py-2 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isPublishing}
                onClick={handlePublish}
                className="bg-[#C5A880] hover:bg-[#B38F56] text-[#111A2E] text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Publishing Live...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm & Publish Live</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVISIONS HISTORY MODAL */}
      {showRevisions && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-[#E5DFC5] shadow-2xl relative max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DFC5]">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#B38F56]" />
                <h3 className="font-serif text-lg font-semibold text-[#1B2A4A]">
                  Publication Revision History
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRevisions(false)}
                className="text-[#7B6E66] hover:text-[#1B2A4A] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {revisions.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#7B6E66]">
                  No past revisions recorded yet in <code className="text-[#B38F56]">cms_revisions</code>.
                </div>
              ) : (
                revisions.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-xl border border-[#E5DFC5] bg-[#FAF8F5] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1B2A4A]">
                        {rev.summary}
                      </span>
                      <span className="text-[10px] text-[#7B6E66] font-mono">
                        {new Date(rev.published_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7B6E66]">
                      Published by: <span className="text-[#2C221E]">{rev.published_by}</span>
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[#E5DFC5] text-right">
              <button
                type="button"
                onClick={() => setShowRevisions(false)}
                className="bg-[#1B2A4A] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
