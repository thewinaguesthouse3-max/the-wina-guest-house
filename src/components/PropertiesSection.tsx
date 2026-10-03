import React, { useState } from 'react';
import { MapPin, Users, Wifi, Waves, ArrowRight, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';
import { Property } from '@/src/data/properties';
import { Language, translations } from '@/src/data/translations';
import { recordTrackingEvent } from '@/src/config/ownerStore';

interface PropertiesSectionProps {
  properties: Property[];
  currentLang: Language;
  onSelectProperty: (property: Property) => void;
  onOpenWhatsAppInquiry: (property: Property) => void;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  properties,
  currentLang,
  onSelectProperty,
  onOpenWhatsAppInquiry,
}) => {
  const [filter, setFilter] = useState<'all' | 'guesthouse' | 'villa'>('all');
  const t = translations[currentLang];

  const filteredProperties = properties.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const handleBookNowClick = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    // Record tracking event for SEM / Analytics
    recordTrackingEvent({
      type: 'BOOKING_CLICK',
      propertyId: prop.id,
      propertyName: prop.name,
      targetUrl: prop.bookingUrl,
      metadata: `PropertiesSection Card CTA - ${prop.bookingUrlKey}`,
    });

    window.open(prop.bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    recordTrackingEvent({
      type: 'WHATSAPP_CLICK',
      propertyId: prop.id,
      propertyName: prop.name,
      metadata: 'PropertiesSection Card WhatsApp Button',
    });
    onOpenWhatsAppInquiry(prop);
  };

  return (
    <section id="properties" className="py-20 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E5DFC5]/80 pb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-2 flex items-center gap-2">
              <span>{t.propertiesSection.kicker}</span>
              <span aria-hidden="true" className="w-6 h-px bg-[#B38F56]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight">
              {t.propertiesSection.title}
            </h2>
            <p className="text-sm sm:text-base text-[#7B6E66] max-w-2xl mt-2">
              {t.propertiesSection.subtitle}
            </p>
          </div>

          {/* Interactive Filter Controls (Segmented control style) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFECE6] rounded-lg border border-[#E5DFC5] self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                  : 'text-[#7B6E66] hover:text-[#2C221E]'
              }`}
            >
              {t.propertiesSection.filterAll}
            </button>
            <button
              onClick={() => setFilter('guesthouse')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filter === 'guesthouse'
                  ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                  : 'text-[#7B6E66] hover:text-[#2C221E]'
              }`}
            >
              {t.propertiesSection.filterGuesthouse}
            </button>
            <button
              onClick={() => setFilter('villa')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filter === 'villa'
                  ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                  : 'text-[#7B6E66] hover:text-[#2C221E]'
              }`}
            >
              {t.propertiesSection.filterVilla}
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => onSelectProperty(property)}
              className="group bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#E5DFC5] hover:border-[#B38F56]/60 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col cursor-pointer"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#EFECE6]">
                <img
                  src={property.heroImage}
                  alt={property.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Quiet Category & Beach Distance (Zero-pill discipline) */}
                <div className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded">
                  {property.category === 'villa' ? 'Private Villa' : 'Boutique Guest House'}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-[#E5DFC5] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span className="truncate">{property.distanceToBeach}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E] group-hover:text-[#B38F56] transition-colors leading-tight mb-2">
                    {property.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#7B6E66] line-clamp-2 leading-relaxed mb-4">
                    {currentLang === 'id' ? property.taglineId : property.taglineEn}
                  </p>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-[#5A4D45] py-2 border-y border-[#E5DFC5]/70 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#B38F56]" />
                      <span>{property.capacity}</span>
                    </span>
                    <span aria-hidden="true" className="text-[#D8CBB5]">·</span>
                    <span className="flex items-center gap-1">
                      <Waves className="w-3.5 h-3.5 text-[#B38F56]" />
                      <span>{property.category === 'villa' ? 'Private Pool' : 'Pool Access'}</span>
                    </span>
                    <span aria-hidden="true" className="text-[#D8CBB5]">·</span>
                    <span className="flex items-center gap-1">
                      <Wifi className="w-3.5 h-3.5 text-[#B38F56]" />
                      <span>Fiber WiFi</span>
                    </span>
                  </div>

                  {/* Pricing indication (Transparent, non-misleading) */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-[#7B6E66]">
                        {t.propertiesSection.startingFrom}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-semibold text-[#2C221E] tabular-nums">
                        IDR {property.startingPriceIdr.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-[#7B6E66]">
                        {t.propertiesSection.perNight}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#A69B93] block mt-0.5">
                      {currentLang === 'id'
                        ? 'Tarif langsung & ketersediaan terverifikasi di Booking.com'
                        : 'Real-time rates & dates confirmed on Booking.com'}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons: View Details & Distinct Booking.com Link */}
                <div className="pt-2 border-t border-[#E5DFC5]/60 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProperty(property)}
                      className="py-2 px-3 text-xs font-semibold text-[#2C221E] bg-[#EFECE6] hover:bg-[#E5DFC5] rounded-md transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>{t.propertiesSection.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#7B6E66]" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleWhatsAppClick(e, property)}
                      className="py-2 px-3 text-xs font-semibold text-[#1F5C3E] bg-[#EAF5EF] hover:bg-[#D9EFE2] rounded-md transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                      title="Direct inquiry via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>

                  {/* Primary Direct Booking.com Button - Specific to this property */}
                  <button
                    type="button"
                    onClick={(e) => handleBookNowClick(e, property)}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C221E] hover:bg-[#B38F56] rounded-md transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.propertiesSection.bookOnBooking}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#E5DFC5]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
