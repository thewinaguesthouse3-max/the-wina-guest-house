import React from 'react';
import { Sparkles, MapPin, Compass, ShieldCheck } from 'lucide-react';
import ambienceImage from '@/src/assets/images/bali_canggu_ambience_1791004314788.jpg';
import { Language, translations } from '@/src/data/translations';

interface AboutSectionProps {
  currentLang: Language;
  onExplore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang, onExplore }) => {
  const t = translations[currentLang];

  return (
    <section id="about" className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E5DFC5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5DFC5]">
              <img
                src={ambienceImage}
                alt="Tropical pathway and boutique hospitality ambiance at The Wina Canggu Bali"
                className="w-full h-[460px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#E5DFC5] font-semibold block mb-1">
                  Canggu · Bali
                </span>
                <p className="font-serif text-xl sm:text-2xl font-medium leading-snug">
                  Your Stay, Your Comfort, Your Bali Experience.
                </p>
              </div>
            </div>

            {/* Subtle editorial card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#FAF8F5] border border-[#E5DFC5] p-5 rounded-xl shadow-md max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3E0] flex items-center justify-center text-[#B38F56] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
                    Hospitality Management
                  </h4>
                  <p className="text-xs text-[#7B6E66] mt-0.5">
                    Dedicated local team & verified property standards
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Column */}
          <div className="lg:col-span-7">
            {/* Unboxed editorial kicker */}
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-3 flex items-center gap-2">
              <span>{t.about.kicker}</span>
              <span aria-hidden="true" className="w-6 h-px bg-[#B38F56]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight mb-6 leading-[1.15]" style={{ textWrap: 'balance' }}>
              {t.about.title}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5A4D45] leading-relaxed mb-8">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            {/* Editorial Stats (Zero-pill discipline: unboxed figures with tabular-nums) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#E5DFC5] mb-8">
              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] tabular-nums">
                  {t.about.stat1Number}
                </span>
                <span className="text-xs text-[#7B6E66] mt-1 block">
                  {t.about.stat1Label}
                </span>
              </div>

              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] tabular-nums">
                  {t.about.stat2Number}
                </span>
                <span className="text-xs text-[#7B6E66] mt-1 block">
                  {t.about.stat2Label}
                </span>
              </div>

              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] tabular-nums">
                  {t.about.stat3Number}
                </span>
                <span className="text-xs text-[#7B6E66] mt-1 block">
                  {t.about.stat3Label}
                </span>
              </div>

              <div>
                <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] tabular-nums">
                  {t.about.stat4Number}
                </span>
                <span className="text-xs text-[#7B6E66] mt-1 block">
                  {t.about.stat4Label}
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={onExplore}
                className="px-6 py-3 bg-[#2C221E] hover:bg-[#3E2F28] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{currentLang === 'id' ? 'Lihat 5 Properti Kami' : 'View Our 5 Properties'}</span>
                <Compass className="w-4 h-4 text-[#E5DFC5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
