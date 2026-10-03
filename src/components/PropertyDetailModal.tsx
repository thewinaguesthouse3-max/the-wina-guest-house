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
  Refrigerator,
  Navigation,
  Snowflake,
  Droplets
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
    if (property.otaStatus === 'coming_soon' || !property.bookingUrl) {
      handleWhatsApp();
      return;
    }

    recordTrackingEvent({
      type: 'BOOKING_CLICK',
      propertyId: property.id,
      propertyName: property.name,
      targetUrl: property.bookingUrl,
      metadata: `PropertyDetailModal - ${property.bookingUrlKey} (${property.otaName})`,
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

  // Helper icon map with consistent premium styling
  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Snowflake':
      case 'AirVent':
        return <Snowflake className="w-5 h-5 text-[#8B6B3E]" />;
      case 'Droplets':
      case 'Bath':
        return <Droplets className="w-5 h-5 text-[#8B6B3E]" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#8B6B3E]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#8B6B3E]" />;
      case 'UtensilsCrossed':
      case 'Kitchen':
        return <UtensilsCrossed className="w-5 h-5 text-[#8B6B3E]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#8B6B3E]" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#1F5C3E]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#8B6B3E]" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-[#8B6B3E]" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#8B6B3E]" />;
      case 'Refrigerator':
        return <Refrigerator className="w-5 h-5 text-[#8B6B3E]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#8B6B3E]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#E5DFC5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header with Title & Close Button */}
        <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E5DFC5] flex items-center justify-between">
          <div>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-[#7B6E66] mb-1">
              <span className="text-[#2C221E] font-medium">Home</span>
              <ChevronRight className="w-3 h-3 text-[#D8CBB5]" />
              <span className="text-[#7B6E66]">Properties</span>
              <ChevronRight className="w-3 h-3 text-[#D8CBB5]" />
              <span className="text-[#8B6B3E] font-semibold truncate max-w-[200px] sm:max-w-none">
                {property.name}
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E]">
                {property.name}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#2C221E] text-white rounded">
                From Rp{property.startingPriceIdr.toLocaleString('id-ID')}/night
              </span>
            </div>
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
                <span>
                  {property.otaStatus === 'coming_soon'
                    ? 'Online OTA Listing: Coming Soon'
                    : `Verified ${property.otaName} Listing${property.otaPropertyId ? ` (ID: ${property.otaPropertyId})` : ''}`}
                </span>
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

              {property.otaStatus === 'coming_soon' || !property.bookingUrl ? (
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="flex-1 sm:flex-initial py-2.5 px-5 text-xs font-semibold uppercase tracking-wider text-[#7B6E66] bg-[#EFECE6] hover:bg-[#E5DFC5] rounded-md transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Online OTA booking coming soon. Inquire directly via WhatsApp."
                >
                  <span className="tracking-widest font-bold">COMING SOON</span>
                  <MessageSquare className="w-3.5 h-3.5 text-[#8B6B3E]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="flex-1 sm:flex-initial py-2.5 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C221E] hover:bg-[#B38F56] rounded-md transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>
                    {currentLang === 'id'
                      ? `Pesan di ${property.otaName}`
                      : `Book on ${property.otaName}`}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#E5DFC5]" />
                </button>
              )}
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

          {/* Facility & Amenities Section - Clean Premium Cards */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B38F56] block">
                  AMENITIES
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E]">
                  {currentLang === 'id' ? 'Fasilitas Terverifikasi' : 'Verified Property Amenities'}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#7B6E66]">
                <ShieldCheck className="w-4 h-4 text-[#1F5C3E]" />
                <span className="font-medium">
                  {currentLang === 'id'
                    ? `${property.amenities.length} Fasilitas Terverifikasi`
                    : `${property.amenities.length} Verified Amenities`}
                </span>
              </div>
            </div>

            {/* Clean Premium Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
              {property.amenities.map((item, idx) => {
                const isPool = item.icon === 'Waves' || item.nameEn.toLowerCase().includes('pool');
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all duration-200 flex items-center gap-3.5 ${
                      isPool
                        ? 'bg-[#FAF3E0]/70 border-[#B38F56]/50 shadow-xs'
                        : 'bg-white border-[#E5DFC5] hover:border-[#D8CBB5] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                        isPool
                          ? 'bg-[#2C221E] text-[#E5DFC5]'
                          : 'bg-[#FAF3E0] text-[#8B6B3E] border border-[#E5DFC5]/70'
                      }`}
                    >
                      {renderAmenityIcon(item.icon)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#2C221E] truncate">
                          {currentLang === 'id' ? item.nameId : item.nameEn}
                        </h4>
                        {isPool && (
                          <span className="shrink-0 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#2C221E] text-[#FAF3E0] rounded">
                            {property.category === 'villa' ? 'Private Pool' : 'Main Feature'}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#7B6E66] block mt-0.5 truncate">
                        {isPool
                          ? currentLang === 'id'
                            ? 'Fasilitas kolam renang'
                            : 'Swimming pool facility'
                          : currentLang === 'id'
                            ? 'Fasilitas terverifikasi'
                            : 'Verified facility'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verification Note for Villa 01 and 02 */}
            {property.category === 'villa' && property.amenities.length === 1 && (
              <div className="mt-3.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5] text-xs text-[#6B5E55] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#B38F56] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {currentLang === 'id'
                    ? 'Fasilitas yang diverifikasi oleh pemilik saat ini adalah Kolam Renang Privat. Fasilitas lainnya hanya akan ditampilkan apabila sudah diverifikasi resmi oleh pemilik.'
                    : 'The currently verified facility confirmed by the owner is the Private Swimming Pool. Additional amenities will be published once officially confirmed by the property owner.'}
                </p>
              </div>
            )}
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

          {/* Find Us - Location & Google Maps Section */}
          <div className="pt-2 border-t border-[#E5DFC5]/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B38F56]" />
                  <span>Location</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C221E]">
                  Find Us
                </h3>
              </div>
              <span className="text-xs text-[#7B6E66] hidden sm:inline-block">
                Canggu, Bali
              </span>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E5DFC5] overflow-hidden shadow-xs">
              {/* Card Header with Property Name, Address & Prominent CTAs */}
              <div className="p-5 sm:p-6 border-b border-[#E5DFC5] bg-[#EFECE6]/40 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#2C221E] text-white rounded">
                      {property.category === 'villa' ? 'Private Villa' : 'Boutique Guest House'}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E]">
                      {property.name}
                    </h4>
                  </div>
                  <div className="flex items-start gap-2 mt-2 text-xs sm:text-sm text-[#5A4D45]">
                    <MapPin className="w-4 h-4 text-[#B38F56] shrink-0 mt-0.5" />
                    <span className="font-medium">{property.location}</span>
                  </div>
                  <p className="text-xs text-[#7B6E66] mt-1 ml-6">
                    {property.distanceToBeach} · {property.neighborhood}
                  </p>
                </div>

                {/* Prominent Action Buttons: VIEW ON GOOGLE MAPS & GET DIRECTIONS */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <a
                    href={property.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs font-bold tracking-wider uppercase rounded-md transition-colors shadow-xs cursor-pointer text-center"
                  >
                    <span>VIEW ON GOOGLE MAPS</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#E5DFC5]" />
                  </a>
                  <a
                    href={property.googleDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF3E0] hover:bg-[#EFECE6] text-[#2C221E] border border-[#D8CBB5] text-xs font-bold tracking-wider uppercase rounded-md transition-colors shadow-xs cursor-pointer text-center"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#8B6B3E]" />
                    <span>GET DIRECTIONS</span>
                  </a>
                </div>
              </div>

              {/* Google Maps Preview / Embed */}
              <div className="relative w-full h-72 sm:h-80 bg-[#EFECE6]">
                <iframe
                  title={`Google Maps preview of ${property.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.googleMapsEmbedQuery || property.location)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Footer info & location verification note */}
              <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#E5DFC5] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7B6E66]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B38F56]" />
                  <span>
                    Accurate GPS coordinates verified for {property.shortName}
                  </span>
                </div>
                {property.id.startsWith('villa') && (
                  <span className="text-[11px] text-[#8B6B3E] font-medium">
                    {property.id === 'villa-01'
                      ? 'Note: The Wina Villa 01 and Villa 02 share the same verified private villa location in Subak Canggu.'
                      : 'Note: The Wina Villa 02 and Villa 01 share the same verified private villa location in Subak Canggu.'}
                  </span>
                )}
              </div>
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
            {property.otaStatus === 'coming_soon' || !property.bookingUrl ? (
              <button
                type="button"
                onClick={handleBookNow}
                className="flex-1 sm:flex-initial py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#7B6E66] bg-[#EFECE6] hover:bg-[#E5DFC5] rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                title="Online OTA booking coming soon. Inquire directly via WhatsApp."
              >
                <span className="tracking-widest font-bold">COMING SOON</span>
                <MessageSquare className="w-3.5 h-3.5 text-[#8B6B3E]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBookNow}
                className="flex-1 sm:flex-initial py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C221E] hover:bg-[#B38F56] rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {currentLang === 'id'
                    ? `Pesan di ${property.otaName}`
                    : `Book on ${property.otaName}`}
                </span>
                <ExternalLink className="w-4 h-4 text-[#E5DFC5]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
