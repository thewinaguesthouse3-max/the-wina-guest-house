import React from 'react';
import { Calendar, Compass, MessageSquare, ArrowRight } from 'lucide-react';
import { Language, translations } from '@/src/data/translations';

interface CallToActionProps {
  currentLang: Language;
  onExplore: () => void;
  onBook: () => void;
  onWhatsApp: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  currentLang,
  onExplore,
  onBook,
  onWhatsApp,
}) => {
  const t = translations[currentLang];

  return (
    <section className="py-20 sm:py-24 bg-[#2C221E] text-white relative overflow-hidden">
      {/* Subtle organic pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5DFC5_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-3 inline-block">
          The Wina Hospitality · Bali
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 leading-tight" style={{ textWrap: 'balance' }}>
          {t.cta.title}
        </h2>

        <p className="text-sm sm:text-base text-[#FAF8F5]/80 max-w-xl mx-auto mb-10 leading-relaxed">
          {t.cta.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-6 py-3 bg-transparent border border-[#FAF8F5]/30 hover:border-[#FAF8F5] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#C5A880]" />
            <span>{t.cta.exploreBtn}</span>
          </button>

          <button
            onClick={onBook}
            className="w-full sm:w-auto px-6 py-3 bg-[#B38F56] hover:bg-[#A37E45] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.cta.bookBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onWhatsApp}
            className="w-full sm:w-auto px-5 py-3 bg-[#1F5C3E] hover:bg-[#16452E] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
