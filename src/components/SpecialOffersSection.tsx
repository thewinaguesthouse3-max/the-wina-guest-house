import React from 'react';
import { Tag, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { specialOffers, SpecialOffer } from '@/src/data/offers';
import { Property } from '@/src/data/properties';
import { Language, translations } from '@/src/data/translations';
import { recordTrackingEvent } from '@/src/config/ownerStore';

interface SpecialOffersSectionProps {
  currentLang: Language;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenWhatsAppInquiry: (property?: Property) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  currentLang,
  properties,
  onSelectProperty,
  onOpenWhatsAppInquiry,
}) => {
  const t = translations[currentLang];

  const handleOfferClick = (offer: SpecialOffer) => {
    recordTrackingEvent({
      type: 'WHATSAPP_CLICK',
      propertyName: offer.titleEn,
      metadata: `Special Offer CTA - ${offer.id}`,
    });

    if (offer.propertyTargetId) {
      const prop = properties.find((p) => p.id === offer.propertyTargetId);
      if (prop) {
        onSelectProperty(prop);
        return;
      }
    }
    onOpenWhatsAppInquiry();
  };

  return (
    <section id="offers" className="py-20 sm:py-24 bg-[#EFECE6]/40 border-y border-[#E5DFC5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-2 inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-4 h-px bg-[#B38F56]" />
            <span>{t.offers.kicker}</span>
            <span aria-hidden="true" className="w-4 h-px bg-[#B38F56]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight">
            {t.offers.title}
          </h2>
          <p className="text-sm sm:text-base text-[#7B6E66] mt-3">
            {t.offers.subtitle}
          </p>
        </div>

        {/* Offers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-[#FAF8F5] rounded-xl border border-[#E5DFC5] p-7 shadow-xs hover:border-[#B38F56]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6B3E] bg-[#FAF3E0] px-2.5 py-1 rounded inline-block mb-4">
                  {currentLang === 'id' ? offer.badgeId : offer.badgeEn}
                </span>

                <h3 className="font-serif text-xl font-semibold text-[#2C221E] mb-3 leading-snug">
                  {currentLang === 'id' ? offer.titleId : offer.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A4D45] leading-relaxed mb-6">
                  {currentLang === 'id' ? offer.descriptionId : offer.descriptionEn}
                </p>
              </div>

              <div>
                <div className="text-[11px] text-[#A69B93] py-3 border-t border-[#E5DFC5]/60 mb-4">
                  {currentLang === 'id' ? offer.termsId : offer.termsEn}
                </div>

                <button
                  type="button"
                  onClick={() => handleOfferClick(offer)}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#2C221E] bg-[#EFECE6] hover:bg-[#E5DFC5] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#B38F56]" />
                  <span>{currentLang === 'id' ? offer.actionId : offer.actionEn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
