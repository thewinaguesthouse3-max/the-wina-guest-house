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
import { BlogPost } from '@/src/data/blog';
import { Language } from '@/src/data/translations';
import {
  BookingUrlsConfig,
  ContactConfig,
  getStoredBookingUrls,
  getStoredContact,
  getStoredProperties,
  recordTrackingEvent,
} from '@/src/config/ownerStore';

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

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [ownerPortalOpen, setOwnerPortalOpen] = useState(false);
  const [semLandingOpen, setSemLandingOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

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

  const handleOpenWhatsAppInquiry = (prop?: Property) => {
    recordTrackingEvent({
      type: 'WHATSAPP_CLICK',
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
    localStorage.setItem('thewina_booking_urls_v1', JSON.stringify(newUrls));
    // Update properties in state and local storage
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === 'echo-beach') return { ...p, bookingUrl: newUrls.bookingUrlEchoBeach };
        if (p.id === 'guest-house-2') return { ...p, bookingUrl: newUrls.bookingUrlGuestHouse2 };
        if (p.id === 'guest-house-3') return { ...p, bookingUrl: newUrls.bookingUrlGuestHouse3 };
        if (p.id === 'villa-01') return { ...p, bookingUrl: newUrls.bookingUrlVilla01 };
        if (p.id === 'villa-02') return { ...p, bookingUrl: newUrls.bookingUrlVilla02 };
        return p;
      })
    );
  };

  const handleSaveContact = (newContact: ContactConfig) => {
    setContactConfig(newContact);
    localStorage.setItem('thewina_contact_v1', JSON.stringify(newContact));
  };

  const handleSaveProperties = (newProps: Property[]) => {
    setProperties(newProps);
    localStorage.setItem('thewina_properties_v1', JSON.stringify(newProps));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('thewina_booking_urls_v1');
    localStorage.removeItem('thewina_contact_v1');
    localStorage.removeItem('thewina_properties_v1');
    setBookingUrls(getStoredBookingUrls());
    setContactConfig(getStoredContact());
    setProperties(initialProperties);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C221E] flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onNavigate={handleNavigate}
        onOpenOwnerPortal={() => setOwnerPortalOpen(true)}
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
          properties={properties}
          currentLang={currentLang}
          onSelectPropertyDetails={(prop) => setSelectedProperty(prop)}
        />

        {/* About Section */}
        <AboutSection
          currentLang={currentLang}
          onExplore={() => handleNavigate('properties')}
        />

        {/* Our 5 Properties */}
        <PropertiesSection
          properties={properties}
          currentLang={currentLang}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
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
          properties={properties}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onOpenWhatsAppInquiry={handleOpenWhatsAppInquiry}
        />

        {/* Blog & Travel Guides */}
        <BlogSection
          currentLang={currentLang}
          onReadPost={(post) => setSelectedPost(post)}
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
          properties={properties}
          contactConfig={contactConfig}
          currentLang={currentLang}
        />

        {/* FAQ Section */}
        <FaqSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        properties={properties}
        contactConfig={contactConfig}
        currentLang={currentLang}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onNavigate={handleNavigate}
        onOpenTerms={() => setLegalModal('terms')}
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenOwnerPortal={() => setOwnerPortalOpen(true)}
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
          onClose={() => setSelectedProperty(null)}
          onOpenWhatsAppInquiry={handleOpenWhatsAppInquiry}
        />
      )}

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <BlogReaderModal
          post={selectedPost}
          properties={properties}
          currentLang={currentLang}
          onClose={() => setSelectedPost(null)}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
        />
      )}

      {/* Owner Dashboard Modal */}
      {ownerPortalOpen && (
        <OwnerDashboardModal
          properties={properties}
          bookingUrls={bookingUrls}
          contactConfig={contactConfig}
          onClose={() => setOwnerPortalOpen(false)}
          onSaveBookingUrls={handleSaveBookingUrls}
          onSaveContact={handleSaveContact}
          onSaveProperties={handleSaveProperties}
          onResetDefaults={handleResetDefaults}
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
