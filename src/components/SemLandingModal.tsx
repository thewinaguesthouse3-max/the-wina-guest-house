import React, { useState, useEffect } from 'react';
import { X, ExternalLink, MessageSquare, ShieldCheck, MapPin, Check, ChevronRight, Info } from 'lucide-react';
import { Property } from '@/src/data/properties';
import { Language } from '@/src/data/translations';
import { ContactConfig, recordTrackingEvent } from '@/src/config/ownerStore';

interface SemLandingModalProps {
  properties: Property[];
  contactConfig: ContactConfig;
  currentLang: Language;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
}

export const SemLandingModal: React.FC<SemLandingModalProps> = ({
  properties,
  contactConfig,
  currentLang,
  onClose,
  onSelectProperty,
}) => {
  const campaigns = [
    {
      id: 'campaign-1-echo-beach',
      propertyId: 'echo-beach',
      title: 'Campaign 1: Echo Beach',
      keyword: 'guest house near Echo Beach',
      allKeywords: ['guest house near Echo Beach', 'guest house Canggu', 'cheap accommodation Canggu', 'stay near Batu Bolong'],
      landingUrl: '/properties/the-wina-echo-beach-guest-house',
      headline: 'The Wina Echo Beach Guest House | Stay in Canggu, Bali',
      subheadline: 'Comfortable boutique guest house located just 350 meters from Echo Beach surf and Batu Bolong.',
      ctaText: 'BOOK NOW',
      ctaChannel: 'Booking.com Echo Beach',
    },
    {
      id: 'campaign-2-guest-house-2',
      propertyId: 'guest-house-2',
      title: 'Campaign 2: Guest House 2',
      keyword: 'cheap guest house Canggu',
      allKeywords: ['cheap guest house Canggu', 'affordable stay Canggu', 'accommodation near Jalan Nelayan'],
      landingUrl: '/properties/the-wina-guest-house-2',
      headline: 'The Wina Guest House 2 | Affordable Stay in Canggu',
      subheadline: 'Discover an affordable stay in Canggu, Bali at The Wina Guest House 2, located near Jalan Nelayan (Property ID: 2037301).',
      ctaText: 'BOOK NOW',
      ctaChannel: 'Booking.com Guest House 2 (ID: 2037301)',
    },
    {
      id: 'campaign-3-guest-house-3',
      propertyId: 'guest-house-3',
      title: 'Campaign 3: Guest House 3',
      keyword: 'guest house Batu Bolong',
      allKeywords: ['guest house Batu Bolong', 'affordable accommodation Canggu', 'stay in Canggu Bali'],
      landingUrl: '/properties/the-wina-guest-house-3',
      headline: 'The Wina Guest House 3 | Comfortable Stay in Canggu',
      subheadline: 'Enjoy a comfortable stay in Canggu, Bali at The Wina Guest House 3, conveniently located near Batu Bolong.',
      ctaText: 'BOOK NOW',
      ctaChannel: 'Booking.com Guest House 3',
    },
    {
      id: 'campaign-4-villa-01',
      propertyId: 'villa-01',
      title: 'Campaign 4: Villa 01',
      keyword: 'villa Canggu',
      allKeywords: ['villa Canggu', 'villa near Batu Bolong', 'Bali villa Canggu'],
      landingUrl: '/properties/the-wina-villa-01',
      headline: 'The Wina Villa 01 | Villa Stay in Canggu, Bali',
      subheadline: 'Exclusive private pool villa offering understated luxury, tropical open living, and total seclusion in Subak Canggu.',
      ctaText: 'BOOK NOW',
      ctaChannel: 'Trip.com Villa 01 (ID: 120788345)',
    },
    {
      id: 'campaign-5-villa-02',
      propertyId: 'villa-02',
      title: 'Campaign 5: Villa 02',
      keyword: 'villa in Canggu Bali',
      allKeywords: ['villa in Canggu Bali', 'villa near Batu Bolong', 'Bali villa accommodation', 'Canggu villa'],
      landingUrl: '/properties/the-wina-villa-02',
      headline: 'The Wina Villa 02 | Bali Villa in Canggu',
      subheadline: 'Spacious modern tropical villa with private plunge pool and lush courtyard in Subak Canggu (Online OTA listing coming soon).',
      ctaText: 'LEARN MORE / CONTACT US',
      ctaChannel: 'Direct WhatsApp Concierge',
    },
  ];

  const [activeCampaignId, setActiveCampaignId] = useState<string>(campaigns[0].id);

  const activeCampaign = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];
  const activeProperty = properties.find((p) => p.id === activeCampaign.propertyId) || properties[0];

  // Track property_view when switching campaigns
  useEffect(() => {
    recordTrackingEvent({
      type: 'property_view',
      property: activeProperty.id,
      propertyId: activeProperty.id,
      propertyName: activeProperty.name,
      metadata: `SEM Landing Campaign View: ${activeCampaign.title}`,
    });
  }, [activeCampaignId, activeProperty.id, activeProperty.name, activeCampaign.title]);

  const handleBookNow = () => {
    if (activeProperty.id === 'villa-02' || !activeProperty.bookingUrl) {
      handleWhatsApp();
      return;
    }

    recordTrackingEvent({
      type: 'booking_click',
      property: activeProperty.id,
      propertyId: activeProperty.id,
      propertyName: activeProperty.name,
      targetUrl: activeProperty.bookingUrl,
      metadata: `Google Ads SEM Booking Click: [${activeCampaign.keyword}] -> ${activeCampaign.ctaChannel}`,
    });
    window.open(activeProperty.bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    recordTrackingEvent({
      type: 'whatsapp_click',
      property: activeProperty.id,
      propertyId: activeProperty.id,
      propertyName: activeProperty.name,
      metadata: `Google Ads SEM WhatsApp Click: [${activeCampaign.keyword}]`,
    });
    const text = encodeURIComponent(
      `Hello The Wina Hospitality! I am inquiring about ${activeProperty.name} via your Google Ads link for "${activeCampaign.keyword}".`
    );
    window.open(`https://wa.me/${contactConfig.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E5DFC5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* SEM Switcher Header */}
        <div className="bg-[#2C221E] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold px-2 py-0.5 bg-white/10 rounded">
                Google Ads Landing Page Architecture
              </span>
              <span className="text-[11px] text-[#A69B93]">Property-Specific Routing</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-white mt-1">
              {activeCampaign.title}: "{activeCampaign.keyword}"
            </h3>
          </div>

          <button
            onClick={onClose}
            className="self-end sm:self-auto p-1.5 text-white/80 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close SEM simulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campaign Pills Switcher (All 5 properties separate) */}
        <div className="bg-[#EFECE6] px-6 py-2.5 border-b border-[#E5DFC5] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#7B6E66] font-semibold shrink-0">Switch Adgroup:</span>
          {campaigns.map((camp) => (
            <button
              key={camp.id}
              onClick={() => setActiveCampaignId(camp.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCampaignId === camp.id
                  ? 'bg-[#2C221E] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A4D45] hover:text-[#2C221E]'
              }`}
            >
              {camp.title.replace('Campaign ', 'Ad ')}
            </button>
          ))}
        </div>

        {/* High Conversion Landing Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Target keywords badge banner */}
          <div className="bg-[#FAF3E0] rounded-xl p-3 border border-[#E5DFC5] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#8B6B3E] font-medium">
              <span className="font-bold">Target Keywords:</span>
              <span>{activeCampaign.allKeywords.join(' · ')}</span>
            </div>
            <div className="text-[#7B6E66] text-[11px] font-mono">
              Landing URL: <span className="font-bold text-[#2C221E]">{activeCampaign.landingUrl}</span>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B38F56] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activeProperty.neighborhood} · The Wina Hospitality</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2C221E] leading-tight mb-3">
              {activeCampaign.headline}
            </h1>
            <p className="text-sm sm:text-base text-[#5A4D45] leading-relaxed">
              {activeCampaign.subheadline}
            </p>
          </div>

          {/* Featured Property Hero Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#EFECE6]/50 rounded-xl p-5 sm:p-6 border border-[#E5DFC5]">
            <div className="md:col-span-5 relative aspect-4/3 rounded-lg overflow-hidden">
              <img
                src={activeProperty.heroImage}
                alt={activeProperty.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded">
                {activeProperty.category === 'villa' ? 'Private Villa' : 'Boutique Guest House'}
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E]">
                {activeProperty.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#7B6E66]">
                {activeProperty.location}
              </p>

              {/* Verified Value Props */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#5A4D45] pt-2">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1F5C3E]" />
                  <span>High-speed fiber WiFi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1F5C3E]" />
                  <span>
                    {activeProperty.category === 'villa' ? 'Exclusive Private Pool' : 'Swimming Pool Access'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1F5C3E]" />
                  <span>Air conditioning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1F5C3E]" />
                  <span>Quiet residential lane</span>
                </div>
              </div>

              {/* Price Rule: Display "From RpXXX/night" without forbidden claims */}
              <div className="pt-3 border-t border-[#D8CBB5]/60 flex items-baseline gap-2">
                <span className="text-xs text-[#7B6E66]">Starting from:</span>
                <span className="font-serif text-xl font-bold text-[#2C221E] tabular-nums">
                  From Rp{activeProperty.startingPriceIdr.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-[#A69B93]">/ night</span>
              </div>
            </div>
          </div>

          {/* Primary High-Intent Conversion Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {activeProperty.id === 'villa-02' ? (
              /* Campaign 5: LEARN MORE / CONTACT US (No fake direct Book Now claiming immediate OTA availability) */
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#E5DFC5]" />
                <span>LEARN MORE / CONTACT US</span>
              </button>
            ) : (
              /* Campaigns 1-4: Direct BOOK NOW -> Property's Verified OTA */
              <button
                onClick={handleBookNow}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BOOK NOW ({activeCampaign.ctaChannel})</span>
                <ExternalLink className="w-4 h-4 text-[#E5DFC5]" />
              </button>
            )}

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#1F5C3E] hover:bg-[#16452E] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectProperty(activeProperty);
              }}
              className="w-full sm:w-auto px-5 py-3.5 bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#2C221E] border border-[#D8CBB5] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tracking architecture notice */}
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5DFC5] text-center text-[11px] text-[#7B6E66]">
            Events tracked: <code className="text-[#2C221E] bg-[#EFECE6] px-1 py-0.5 rounded">property_view</code>, <code className="text-[#2C221E] bg-[#EFECE6] px-1 py-0.5 rounded">booking_click</code>, <code className="text-[#2C221E] bg-[#EFECE6] px-1 py-0.5 rounded">whatsapp_click</code> with property tag: <code className="text-[#B38F56] font-bold font-mono">property: "{activeProperty.id}"</code>.
          </div>
        </div>
      </div>
    </div>
  );
};
