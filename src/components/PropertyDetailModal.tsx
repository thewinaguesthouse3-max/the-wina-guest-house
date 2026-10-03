import React, { useState } from 'react';
import {
  X,
  MapPin,
  Users,
  Calendar,
  Clock,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Info,
  Check,
  Wifi,
  Waves,
  Bath,
  AirVent,
  Sparkles,
  Coffee,
  Bike,
  UtensilsCrossed,
  Car,
  Tv,
  Refrigerator
} from 'lucide-react';
import { Property } from '@/src/data/properties';
import { Language, translations } from '@/src/data/translations';
import { recordTrackingEvent } from '@/src/config/ownerStore';

interface PropertyDetailModalProps {
  property: Property | null;
  currentLang: Language;
  onClose: () => void;
  onOpenWhatsAppInquiry: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currentLang,
  onClose,
  onOpenWhatsAppInquiry,
}) => {
  if (!property) return null;

  const t = translations[currentLang];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleBookNow = () => {
    recordTrackingEvent({
      type: 'BOOKING_CLICK',
      propertyId: property.id,
      propertyName: property.name,
      targetUrl: property.bookingUrl,
      metadata: `PropertyDetailModal - ${property.bookingUrlKey}`,
    });
    window.open(property.bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    recordTrackingEvent({
      type: 'WHATSAPP_CLICK',
      propertyId: property.id,
      propertyName: property.name,
      metadata: 'PropertyDetailModal WhatsApp CTA',
    });
    onOpenWhatsAppInquiry(property);
  };

  // Helper icon map
  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-4 h-4 text-[#B38F56]" />;
      case 'Waves': return <Waves className="w-4 h-4 text-[#B38F56]" />;
      case 'Bath': return <Bath className="w-4 h-4 text-[#B38F56]" />;
      case 'AirVent': return <AirVent className="w-4 h-4 text-[#B38F56]" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#B38F56]" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-[#B38F56]" />;
      case 'Bike': return <Bike className="w-4 h-4 text-[#B38F56]" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4 text-[#B38F56]" />;
      case 'Car': return <Car className="w-4 h-4 text-[#B38F56]" />;
      case 'Tv': return <Tv className="w-4 h-4 text-[#B38F56]" />;
      case 'Refrigerator': return <Refrigerator className="w-4 h-4 text-[#B38F56]" />;
      default: return <ShieldCheck className="w-4 h-4 text-[#B38F56]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#E5DFC5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header with Title & Close Button */}
        <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E5DFC5] flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B38F56] font-semibold flex items-center gap-1.5">
              <span>{property.category === 'villa' ? 'Private Villa' : 'Boutique Guest House'}</span>
              <span aria-hidden="true" className="text-[#D8CBB5]">·</span>
              <span>{property.neighborhood}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E]">
              {property.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7B6E66] hover:text-[#2C221E] hover:bg-[#EFECE6] rounded-full transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Photo Gallery & Thumbnail Carousel */}
          <div>
            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-black/5 border border-[#E5DFC5] shadow-sm mb-3">
              <img
                src={property.gallery[activeImageIndex] || property.heroImage}
                alt={`${property.name} showcase`}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded">
                {activeImageIndex + 1} / {property.gallery.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-2.5">
              {property.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-16/9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#B38F56] ring-2 ring-[#B38F56]/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#EFECE6]/60 border border-[#E5DFC5] text-xs">
            <div>
              <span className="text-[#7B6E66] block font-medium">Capacity</span>
              <span className="font-semibold text-[#2C221E] text-sm mt-0.5 block">{property.capacity}</span>
            </div>
            <div>
              <span className="text-[#7B6E66] block font-medium">Location</span>
              <span className="font-semibold text-[#2C221E] text-sm mt-0.5 block truncate">{property.neighborhood}</span>
            </div>
            <div>
              <span className="text-[#7B6E66] block font-medium">Check-In</span>
              <span className="font-semibold text-[#2C221E] text-sm mt-0.5 block">{property.checkIn}</span>
            </div>
            <div>
              <span className="text-[#7B6E66] block font-medium">Check-Out</span>
              <span className="font-semibold text-[#2C221E] text-sm mt-0.5 block">{property.checkOut}</span>
            </div>
          </div>

          {/* Booking Notice & Dual Direct CTAs */}
          <div className="p-5 rounded-xl bg-[#FAF3E0] border border-[#E5DFC5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8B6B3E] uppercase tracking-wider mb-1">
                <Info className="w-4 h-4 text-[#B38F56]" />
                <span>{t.propertyDetail.bookingChannelNotice}</span>
              </div>
              <p className="text-xs text-[#5A4D45]">
                {currentLang === 'id' ? property.priceNoteId : property.priceNoteEn}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold text-[#1F5C3E] bg-[#EAF5EF] hover:bg-[#D9EFE2] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.propertyDetail.chatWaBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleBookNow}
                className="flex-1 sm:flex-initial py-2.5 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C221E] hover:bg-[#B38F56] rounded-md transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>{t.propertyDetail.bookOnBookingBtn}</span>
                <ExternalLink className="w-4 h-4 text-[#E5DFC5]" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E] mb-3">
              {currentLang === 'id' ? 'Tentang Properti Ini' : 'About This Property'}
            </h3>
            <p className="text-sm text-[#5A4D45] leading-relaxed">
              {currentLang === 'id' ? property.descriptionId : property.descriptionEn}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#2C221E] mb-3">
              {t.propertyDetail.highlightsTitle}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(currentLang === 'id' ? property.highlightsId : property.highlightsEn).map((hl, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#5A4D45]">
                  <Check className="w-4 h-4 text-[#B38F56] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#2C221E] mb-3">
              {t.propertyDetail.amenitiesTitle}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5DFC5] flex items-center gap-2.5 text-xs text-[#2C221E] font-medium"
                >
                  <div className="p-1.5 rounded-md bg-[#EFECE6]">
                    {renderAmenityIcon(item.icon)}
                  </div>
                  <span className="truncate">{currentLang === 'id' ? item.nameId : item.nameEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Configurations */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#2C221E] mb-3">
              {t.propertyDetail.roomTypesTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(currentLang === 'id' ? property.roomTypesId : property.roomTypesEn).map((room, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#EFECE6]/40 border border-[#E5DFC5] flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[#2C221E] mb-1">{room}</h4>
                    <p className="text-xs text-[#7B6E66]">
                      {property.category === 'villa' ? 'Private villa sanctuary' : 'En-suite bathroom & AC'}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E5DFC5] flex items-center justify-between text-xs">
                    <span className="text-[#8B6B3E] font-medium">Confirmed on Booking.com</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#B38F56]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Map Section */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#2C221E] mb-2">
              {t.propertyDetail.locationTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#7B6E66] mb-4 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#B38F56]" />
              <span>{property.location}</span>
            </p>

            {/* Clean Map Preview / Directions link */}
            <div className="rounded-xl border border-[#E5DFC5] bg-[#EFECE6] p-6 text-center">
              <MapPin className="w-8 h-8 text-[#B38F56] mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-[#2C221E] mb-1">
                {property.name} on Google Maps
              </h4>
              <p className="text-xs text-[#7B6E66] max-w-md mx-auto mb-4">
                {currentLang === 'id'
                  ? 'Buka rute Google Maps untuk petunjuk arah langsung ke lokasi properti.'
                  : 'Open Google Maps for precise GPS coordinates and driving directions.'}
              </p>
              <a
                href={property.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2C221E] hover:bg-[#3E2F28] text-white text-xs font-semibold rounded-md transition-colors"
              >
                <span>{currentLang === 'id' ? 'Buka Google Maps' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Property Specific FAQs */}
          {property.faqs && property.faqs.length > 0 && (
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#2C221E] mb-3">
                {t.propertyDetail.faqTitle}
              </h3>
              <div className="space-y-3">
                {property.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5]">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#2C221E] mb-1">
                      {currentLang === 'id' ? faq.questionId : faq.questionEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5A4D45] leading-relaxed">
                      {currentLang === 'id' ? faq.answerId : faq.answerEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="sticky bottom-0 z-20 bg-[#FAF8F5] px-6 py-4 border-t border-[#E5DFC5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#7B6E66]">
            <span>Starting from </span>
            <strong className="text-[#2C221E] text-sm tabular-nums">
              IDR {property.startingPriceIdr.toLocaleString('id-ID')}
            </strong>
            <span> / night</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold text-[#1F5C3E] bg-[#EAF5EF] hover:bg-[#D9EFE2] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </button>
            <button
              type="button"
              onClick={handleBookNow}
              className="flex-1 sm:flex-initial py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C221E] hover:bg-[#B38F56] rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.propertyDetail.bookOnBookingBtn}</span>
              <ExternalLink className="w-4 h-4 text-[#E5DFC5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
