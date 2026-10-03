import React from 'react';
import { Quote, Star, ShieldCheck, MapPin } from 'lucide-react';
import { guestReviews } from '@/src/data/reviews';
import { Language, translations } from '@/src/data/translations';

interface ReviewsSectionProps {
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="py-20 sm:py-24 bg-[#EFECE6]/40 border-b border-[#E5DFC5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-2 inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-4 h-px bg-[#B38F56]" />
            <span>{t.reviews.kicker}</span>
            <span aria-hidden="true" className="w-4 h-px bg-[#B38F56]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight">
            {t.reviews.title}
          </h2>
          <p className="text-sm sm:text-base text-[#7B6E66] mt-3">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guestReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] p-7 sm:p-8 rounded-xl border border-[#E5DFC5] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#7B6E66]">
                    <ShieldCheck className="w-4 h-4 text-[#B38F56]" />
                    <span className="font-medium text-[#2C221E]">{rev.source}</span>
                  </div>
                  <span className="text-xs text-[#A69B93]">{rev.stayDate}</span>
                </div>

                <h4 className="font-serif text-lg font-semibold text-[#2C221E] mb-2">
                  "{rev.ratingText}"
                </h4>

                <p className="text-xs sm:text-sm text-[#5A4D45] leading-relaxed italic mb-6">
                  "{currentLang === 'id' ? rev.quoteId : rev.quoteEn}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-[#E5DFC5]/70 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#2C221E] block font-semibold">{rev.author}</strong>
                  <span className="text-[#7B6E66]">{rev.country}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-medium text-[#8B6B3E] block">
                    {rev.propertyName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
