import React, { useState } from 'react';
import { X, ExternalLink, MessageSquare, ShieldCheck, MapPin, Check, Star } from 'lucide-react';
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
      id: 'echo-beach-sem',
      keyword: 'Accommodation near Echo Beach',
      headline: 'Stay Steps from Echo Beach, Canggu',
      subheadline: 'Comfortable boutique guest house 350m from world-class surf, cafes, and sunset spots.',
      propertyId: 'echo-beach',
    },
    {
      id: 'canggu-villa-sem',
      keyword: 'Villa in Canggu',
      headline: 'Private Pool Villas in Canggu, Bali',
      subheadline: 'Exclusive 100% private pool sanctuary with tropical open-living design and serene privacy.',
      propertyId: 'villa-01',
    },
    {
      id: 'canggu-guesthouse-sem',
      keyword: 'Guest house in Canggu',
      headline: 'Peaceful Guest House Near Batu Bolong',
      subheadline: 'Air-conditioned rooms, crystal pool, fiber WiFi, and quiet sleep in Canggu.',
      propertyId: 'guest-house-2',
    },
    {
      id: 'affordable-bali-sem',
      keyword: 'Affordable accommodation in Bali',
      headline: 'Best Value Quality Stays in Canggu',
      subheadline: 'Transparent pricing, hotel-grade cleanliness, fast internet, and warm Balinese hospitality.',
      propertyId: 'guest-house-3',
    },
  ];

  const [activeCampaignId, setActiveCampaignId] = useState<string>(campaigns[0].id);

  const activeCampaign = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];
  const activeProperty = properties.find((p) => p.id === activeCampaign.propertyId) || properties[0];

  const handleBookNow = () => {
    recordTrackingEvent({
      type: 'BOOKING_CLICK',
      propertyId: activeProperty.id,
      propertyName: activeProperty.name,
      targetUrl: activeProperty.bookingUrl,
      metadata: `Google Ads SEM Campaign: [${activeCampaign.keyword}]`,
    });
    window.open(activeProperty.bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    recordTrackingEvent({
      type: 'WHATSAPP_CLICK',
      propertyId: activeProperty.id,
      propertyName: activeProperty.name,
      metadata: `Google Ads SEM WhatsApp: [${activeCampaign.keyword}]`,
    });
    const text = encodeURIComponent(
      `Hello The Wina Hospitality! I saw your Google Ads page for "${activeCampaign.keyword}" and would like to inquire about booking ${activeProperty.name}.`
    );
    window.open(`https://wa.me/${contactConfig.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E5DFC5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* SEM Switcher Header */}
        <div className="bg-[#2C221E] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
              Google Ads Campaign Landing Simulator
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-white">
              Target Keyword: "{activeCampaign.keyword}"
            </h3>
          </div>

          <button
            onClick={onClose}
            className="self-end sm:self-auto p-1.5 text-white/80 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campaign Pills Switcher */}
        <div className="bg-[#EFECE6] px-6 py-2.5 border-b border-[#E5DFC5] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#7B6E66] font-medium shrink-0">Simulate Ad Adgroup:</span>
          {campaigns.map((camp) => (
            <button
              key={camp.id}
              onClick={() => setActiveCampaignId(camp.id)}
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCampaignId === camp.id
                  ? 'bg-[#2C221E] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A4D45] hover:text-[#2C221E]'
              }`}
            >
              {camp.keyword}
            </button>
          ))}
        </div>

        {/* High Conversion Landing Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B38F56] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Canggu, Bali · Verified Booking.com Listing</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2C221E] leading-tight mb-3">
              {activeCampaign.headline}
            </h1>
            <p className="text-sm sm:text-base text-[#5A4D45]">
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
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded">
                {activeProperty.category === 'villa' ? 'Private Villa' : 'Boutique Guest House'}
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E]">
                {activeProperty.name}
              </h2>
              <p className="text-xs text-[#7B6E66] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B38F56]" />
                <span>{activeProperty.distanceToBeach}</span>
              </p>
              <p className="text-xs sm:text-sm text-[#5A4D45] leading-relaxed">
                {activeProperty.taglineEn}
              </p>

              {/* Verified Checklist */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#2C221E] pt-2">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1F5C3E]" />
                  <span>High-speed fiber WiFi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1F5C3E]" />
                  <span>Swimming Pool</span>
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

              {/* Price & Booking Notice */}
              <div className="pt-3 border-t border-[#D8CBB5]/60 flex items-baseline gap-2">
                <span className="text-xs text-[#7B6E66]">Starting from:</span>
                <span className="font-serif text-lg font-bold text-[#2C221E] tabular-nums">
                  IDR {activeProperty.startingPriceIdr.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-[#A69B93]">/ night</span>
              </div>
            </div>
          </div>

          {/* Primary High-Intent Conversion Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleBookNow}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Now on Booking.com</span>
              <ExternalLink className="w-4 h-4 text-[#E5DFC5]" />
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#1F5C3E] hover:bg-[#16452E] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </button>
          </div>

          {/* Transparency Footer */}
          <div className="text-center text-[11px] text-[#7B6E66] max-w-lg mx-auto pt-2">
            Clicking "Book Now" opens this specific property's verified profile on Booking.com. All reservations and live room availability are confirmed securely on Booking.com.
          </div>
        </div>
      </div>
    </div>
  );
};
