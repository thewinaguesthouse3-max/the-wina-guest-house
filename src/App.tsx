/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { SearchWidget } from '@/src/components/SearchWidget';
import { AboutSection } from '@/src/components/AboutSection';
import { PropertiesSection } from '@/src/components/PropertiesSection';
import { PropertyDetailModal } from '@/src/components/PropertyDetailModal';
import { WhyChooseUs } from '@/src/components/WhyChooseUs';
import { GallerySection } from '@/src/components/GallerySection';
import { ReviewsSection } from '@/src/components/ReviewsSection';
import { BlogSection } from '@/src/components/BlogSection';
import { BlogReaderModal } from '@/src/components/BlogReaderModal';
import { SpecialOffersSection } from '@/src/components/SpecialOffersSection';
import { ContactSection } from '@/src/components/ContactSection';
import { FaqSection } from '@/src/components/FaqSection';
import { CallToAction } from '@/src/components/CallToAction';
import { Footer } from '@/src/components/Footer';
import { FloatingWhatsApp } from '@/src/components/FloatingWhatsApp';
import { OwnerDashboardModal } from '@/src/components/OwnerDashboardModal';
import { SemLandingModal } from '@/src/components/SemLandingModal';
import { LegalModals } from '@/src/components/LegalModals';

import { Property, initialProperties } from '@/src/data/properties';
import { BlogPost, blogPosts } from '@/src/data/blog';
import { Language } from '@/src/data/translations';
import { AdminDashboard } from '@/src/components/admin/AdminDashboard';
import { fetchPublishedCms, CmsDataset } from '@/src/services/supabase';
import {
  BookingUrlsConfig,
  ContactConfig,
  getStoredBookingUrls,
  getStoredContact,
  getStoredProperties,
  recordTrackingEvent,
} from '@/src/config/ownerStore';
import { updatePageSeo, generatePropertySchema, generateBlogSchema } from '@/src/utils/seo';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  // Load properties with saved booking URLs
  const [bookingUrls, setBookingUrls] = useState<BookingUrlsConfig>(getStoredBookingUrls());
  const [contactConfig, setContactConfig] = useState<ContactConfig>(getStoredContact());
  const [properties, setProperties] = useState<Property[]>(() => {
    const stored = getStoredProperties();
    const urls = getStoredBookingUrls();
    // Synchronize URLs into properties array
    return stored.map((p) => {
      if (p.id === 'echo-beach') return { ...p, bookingUrl: urls.bookingUrlEchoBeach };
      if (p.id === 'guest-house-2') return { ...p, bookingUrl: urls.bookingUrlGuestHouse2 };
      if (p.id === 'guest-house-3') return { ...p, bookingUrl: urls.bookingUrlGuestHouse3 };
      if (p.id === 'villa-01') return { ...p, bookingUrl: urls.bookingUrlVilla01 };
      if (p.id === 'villa-02') return { ...p, bookingUrl: urls.bookingUrlVilla02 };
      return p;
    });
  });

  // Modals & Navigation state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [ownerPortalOpen, setOwnerPortalOpen] = useState(false);
  const [semLandingOpen, setSemLandingOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  // CMS Admin & Preview States
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin') || window.location.search.includes('admin=1');
    }
    return false;
  });
  const [previewDraftData, setPreviewDraftData] = useState<CmsDataset | null>(null);
  const [activeBlogPosts, setActiveBlogPosts] = useState<BlogPost[]>(blogPosts);

  // Synchronize published content from Supabase cloud database
  useEffect(() => {
    fetchPublishedCms().then(({ data, isLive }) => {
      if (isLive && data.properties && data.properties.length > 0) {
        setProperties(data.properties);
        if (data.siteSettings?.bookingUrls) setBookingUrls(data.siteSettings.bookingUrls);
        if (data.siteSettings?.contact) setContactConfig(data.siteSettings.contact);
        if (data.blogPosts && data.blogPosts.length > 0) setActiveBlogPosts(data.blogPosts);
      }
    });
  }, []);

  // Synchronize language with local storage
  useEffect(() => {
    const savedLang = localStorage.getItem('thewina_lang');
    if (savedLang === 'en' || savedLang === 'id') {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('thewina_lang', lang);
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SEO & URL Navigation Handlers
  const handleSelectProperty = (prop: Property) => {
    setSelectedProperty(prop);
    setSelectedPost(null);
    setSemLandingOpen(false);

    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({ type: 'property', id: prop.id }, '', prop.canonicalUrl);
      } catch (e) {
        // Fallback for sandboxed iframe
      }
      updatePageSeo({
        title: prop.seoTitle,
        description: prop.seoDescription,
        canonicalPath: prop.canonicalUrl,
        schemaJson: generatePropertySchema(prop),
        image: prop.heroImage,
      });
    }

    recordTrackingEvent({
      type: 'property_view',
      property: prop.id,
      propertyId: prop.id,
      propertyName: prop.name,
      metadata: `Property Details Page View: ${prop.name}`,
    });
  };

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setSelectedProperty(null);
    setSemLandingOpen(false);

    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({ type: 'blog', id: post.id }, '', post.canonicalUrl);
      } catch (e) {
        // Fallback for sandboxed iframe
      }
      updatePageSeo({
        title: `${post.titleEn} | The Wina Hospitality`,
        description: post.metaDescEn,
        canonicalPath: post.canonicalUrl,
        schemaJson: generateBlogSchema(post),
        image: post.coverImage,
      });
    }
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setSelectedPost(null);
    setLegalModal(null);

    if (typeof window !== 'undefined') {
      try {
        window.history.pushState(null, '', '/');
      } catch (e) {}
      updatePageSeo({});
    }
  };

  // Synchronize initial URL and listen for browser back/forward buttons
  useEffect(() => {
    const handleUrlRoute = () => {
      if (typeof window === 'undefined') return;
      const pathname = window.location.pathname;

      // Check Admin CMS URL
      if (pathname === '/admin' || pathname.startsWith('/admin') || window.location.search.includes('admin=1')) {
        setIsAdminRoute(true);
        setSelectedProperty(null);
        setSelectedPost(null);
        return;
      } else {
        setIsAdminRoute(false);
      }

      // Check property URL
      if (pathname.startsWith('/properties/')) {
        const slug = pathname.replace('/properties/', '');
        const matchedProp = properties.find((p) => p.canonicalSlug === slug || p.canonicalUrl === pathname);
        if (matchedProp) {
          setSelectedProperty(matchedProp);
          setSelectedPost(null);
          updatePageSeo({
            title: matchedProp.seoTitle,
            description: matchedProp.seoDescription,
            canonicalPath: matchedProp.canonicalUrl,
            schemaJson: generatePropertySchema(matchedProp),
            image: matchedProp.heroImage,
          });
          return;
        }
      }

      // Check blog URL
      if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '');
        const matchedPost = activeBlogPosts.find((p) => p.slug === slug || p.canonicalUrl === pathname);
        if (matchedPost) {
          setSelectedPost(matchedPost);
          setSelectedProperty(null);
          updatePageSeo({
            title: `${matchedPost.titleEn} | The Wina Hospitality`,
            description: matchedPost.metaDescEn,
            canonicalPath: matchedPost.canonicalUrl,
            schemaJson: generateBlogSchema(matchedPost),
            image: matchedPost.coverImage,
          });
          return;
        }
      }

      // Check SEM campaign URL
      if (pathname === '/sem' || window.location.search.includes('sem=1') || window.location.search.includes('gclid=')) {
        setSemLandingOpen(true);
      }

      // Reset to root SEO if on home
      if (pathname === '/' || pathname === '') {
        setSelectedProperty(null);
        setSelectedPost(null);
        updatePageSeo({});
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, [properties, activeBlogPosts]);

  const handleOpenAdmin = () => {
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState(null, '', '/admin');
      } catch (e) {}
    }
    setIsAdminRoute(true);
  };

  const handleOpenWhatsAppInquiry = (prop?: Property) => {
    const propId = prop?.id || 'general';
    recordTrackingEvent({
      type: 'whatsapp_click',
      property: propId,
      propertyId: prop?.id,
      propertyName: prop?.name || 'General Inquiry',
      metadata: 'Direct WhatsApp Concierge Inquiry',
    });

    const text = encodeURIComponent(
      prop
        ? `Hello The Wina Hospitality! I would like to inquire about booking ${prop.name} in Canggu, Bali.`
        : `Hello The Wina Hospitality! I would like to inquire about accommodation availability in Bali.`
    );
    window.open(`https://wa.me/${contactConfig.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Owner dashboard actions
  const handleSaveBookingUrls = (newUrls: BookingUrlsConfig) => {
    setBookingUrls(newUrls);
    localStorage.setItem('thewina_booking_urls_v2', JSON.stringify(newUrls));
    // Update properties in state and local storage
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === 'echo-beach') return { ...p, bookingUrl: newUrls.bookingUrlEchoBeach, otaName: 'Booking.com' as const, otaStatus: 'verified' as const };
        if (p.id === 'guest-house-2') return { ...p, bookingUrl: newUrls.bookingUrlGuestHouse2, otaName: 'Booking.com' as const, otaStatus: 'verified' as const, otaPropertyId: '2037301' };
        if (p.id === 'guest-house-3') return { ...p, bookingUrl: newUrls.bookingUrlGuestHouse3, otaName: 'Booking.com' as const, otaStatus: 'verified' as const };
        if (p.id === 'villa-01') return { ...p, bookingUrl: newUrls.bookingUrlVilla01, otaName: 'Trip.com' as const, otaStatus: 'verified' as const, otaPropertyId: '120788345' };
        if (p.id === 'villa-02') return { ...p, bookingUrl: newUrls.bookingUrlVilla02, otaName: (newUrls.bookingUrlVilla02 ? 'Booking.com' : 'Coming Soon') as 'Booking.com' | 'Coming Soon', otaStatus: (newUrls.bookingUrlVilla02 ? 'verified' : 'coming_soon') as 'verified' | 'coming_soon' };
        return p;
      })
    );
  };

  const handleSaveContact = (newContact: ContactConfig) => {
    setContactConfig(newContact);
    localStorage.setItem('thewina_contact_v2', JSON.stringify(newContact));
  };

  const handleSaveProperties = (newProps: Property[]) => {
    setProperties(newProps);
    localStorage.setItem('thewina_properties_v2', JSON.stringify(newProps));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('thewina_booking_urls_v2');
    localStorage.removeItem('thewina_contact_v2');
    localStorage.removeItem('thewina_properties_v2');
    setBookingUrls(getStoredBookingUrls());
    setContactConfig(getStoredContact());
    setProperties(initialProperties);
  };

  if (isAdminRoute) {
    return (
      <AdminDashboard
        onBackToSite={() => {
          if (typeof window !== 'undefined') {
            try {
              window.history.pushState(null, '', '/');
            } catch (e) {}
          }
          setIsAdminRoute(false);
        }}
        onPreviewDraft={(draft) => {
          setPreviewDraftData(draft);
          setIsAdminRoute(false);
          if (typeof window !== 'undefined') {
            try {
              window.history.pushState(null, '', '/?preview=draft');
            } catch (e) {}
          }
        }}
        onPublishSuccess={(published) => {
          setProperties(published.properties);
          setContactConfig(published.siteSettings.contact);
          setBookingUrls(published.siteSettings.bookingUrls);
          if (published.blogPosts) setActiveBlogPosts(published.blogPosts);
          setPreviewDraftData(null);
        }}
      />
    );
  }

  // Choose between active live data or draft preview
  const displayProperties = previewDraftData?.properties || properties;
  const displayBlogPosts = previewDraftData?.blogPosts || activeBlogPosts;
  const displayContact = previewDraftData?.siteSettings?.contact || contactConfig;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C221E] flex flex-col font-sans">
      {/* Draft Preview Bar Banner (when in preview mode) */}
      {previewDraftData && (
        <div className="sticky top-0 z-50 bg-[#1B2A4A] text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-[#C5A880]/50 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-[#E5DFC5]">PREVIEW MODE:</span>
            <span className="text-[#FAF8F5] hidden sm:inline">Viewing Unpublished Draft Changes</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleOpenAdmin}
              className="bg-[#C5A880] text-[#111A2E] px-3 py-1 rounded font-bold hover:bg-[#B38F56] transition-colors cursor-pointer"
            >
              Return to Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setPreviewDraftData(null);
                if (typeof window !== 'undefined') {
                  try {
                    window.history.pushState(null, '', '/');
                  } catch (e) {}
                }
              }}
              className="text-white/80 hover:text-white underline cursor-pointer"
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onNavigate={handleNavigate}
        onOpenOwnerPortal={handleOpenAdmin}
        onOpenSemLanding={() => setSemLandingOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onExplore={() => handleNavigate('properties')}
          onBook={() => handleNavigate('search')}
        />

        {/* Search & Reservation Bar */}
        <SearchWidget
          properties={displayProperties}
          currentLang={currentLang}
          onSelectPropertyDetails={handleSelectProperty}
        />

        {/* About Section */}
        <AboutSection
          currentLang={currentLang}
          onExplore={() => handleNavigate('properties')}
        />

        {/* Our 5 Properties */}
        <PropertiesSection
          properties={displayProperties}
          currentLang={currentLang}
          onSelectProperty={handleSelectProperty}
          onOpenWhatsAppInquiry={handleOpenWhatsAppInquiry}
        />

        {/* Why Choose Us */}
        <WhyChooseUs currentLang={currentLang} />

        {/* Photo Gallery */}
        <GallerySection currentLang={currentLang} />

        {/* Guest Reviews */}
        <ReviewsSection currentLang={currentLang} />

        {/* Special Offers */}
        <SpecialOffersSection
          currentLang={currentLang}
          properties={displayProperties}
          onSelectProperty={handleSelectProperty}
          onOpenWhatsAppInquiry={handleOpenWhatsAppInquiry}
        />

        {/* Blog & Travel Guides */}
        <BlogSection
          currentLang={currentLang}
          onReadPost={handleSelectPost}
        />

        {/* Call to Action Banner */}
        <CallToAction
          currentLang={currentLang}
          onExplore={() => handleNavigate('properties')}
          onBook={() => handleNavigate('search')}
          onWhatsApp={() => handleOpenWhatsAppInquiry()}
        />

        {/* Contact Us & Direct Inquiry Form */}
        <ContactSection
          properties={displayProperties}
          contactConfig={displayContact}
          currentLang={currentLang}
        />

        {/* FAQ Section */}
        <FaqSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        properties={displayProperties}
        contactConfig={displayContact}
        currentLang={currentLang}
        onSelectProperty={handleSelectProperty}
        onNavigate={handleNavigate}
        onOpenTerms={() => setLegalModal('terms')}
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenOwnerPortal={handleOpenAdmin}
        onOpenSemLanding={() => setSemLandingOpen(true)}
      />

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp
        contactConfig={contactConfig}
        currentLang={currentLang}
      />

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          currentLang={currentLang}
          onClose={handleCloseModal}
          onOpenWhatsAppInquiry={handleOpenWhatsAppInquiry}
        />
      )}

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <BlogReaderModal
          post={selectedPost}
          properties={properties}
          currentLang={currentLang}
          onClose={handleCloseModal}
          onSelectProperty={handleSelectProperty}
          onExploreProperties={() => {
            handleCloseModal();
            handleNavigate('properties');
          }}
        />
      )}

      {/* Full CMS Owner Admin Dashboard */}
      {ownerPortalOpen && (
        <AdminDashboard
          onBackToSite={() => setOwnerPortalOpen(false)}
          onPreviewDraft={(draft) => {
            setPreviewDraftData(draft);
            setOwnerPortalOpen(false);
          }}
          onPublishSuccess={(published) => {
            setProperties(published.properties);
            setContactConfig(published.siteSettings.contact);
            setBookingUrls(published.siteSettings.bookingUrls);
            if (published.blogPosts) setActiveBlogPosts(published.blogPosts);
            setPreviewDraftData(null);
          }}
        />
      )}

      {/* Google Ads SEM Campaign Simulator Modal */}
      {semLandingOpen && (
        <SemLandingModal
          properties={properties}
          contactConfig={contactConfig}
          currentLang={currentLang}
          onClose={() => setSemLandingOpen(false)}
          onSelectProperty={(prop) => {
            setSemLandingOpen(false);
            setSelectedProperty(prop);
          }}
        />
      )}

      {/* Terms and Privacy Modals */}
      <LegalModals
        type={legalModal}
        currentLang={currentLang}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}
