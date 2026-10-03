import React from 'react';
import { Compass, Calendar, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import heroImage from '@/src/assets/images/hero_bali_resort_1791004276796.jpg';
import { Language, translations } from '@/src/data/translations';

interface HeroProps {
  currentLang: Language;
  onExplore: () => void;
  onBook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onExplore, onBook }) => {
  const t = translations[currentLang];

  return (
    <section id="hero" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="The Wina Hospitality Bali resort swimming pool and tropical lush sanctuary in Canggu"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Anti-Slop Measured Scrim: ensures WCAG AA 4.5:1 legibility across all screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        {/* Clean unboxed kicker / trust marker (Zero-pill discipline) */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#E5DFC5] mb-5">
          <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Canggu, Bali</span>
          <span aria-hidden="true" className="text-[#C5A880]">·</span>
          <span>Boutique Guest Houses & Private Villas</span>
        </div>

        {/* Primary Headline with text-wrap: balance */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.1] max-w-4xl mx-auto" style={{ textWrap: 'balance' }}>
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#FAF8F5]/90 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Two CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#FAF8F5] text-[#2C221E] hover:bg-[#EFECE6] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#B38F56]" />
            <span>{t.hero.exploreBtn}</span>
          </button>
          
          <button
            onClick={onBook}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#B38F56] hover:bg-[#A37E45] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>{t.hero.bookBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Editorial Trust Markers */}
        <div className="mt-12 pt-6 border-t border-white/20 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/80">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>5 Distinct Properties</span>
          </span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>Verified Booking.com Partners</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>Official WhatsApp Concierge</span>
        </div>
      </div>
    </section>
  );
};
