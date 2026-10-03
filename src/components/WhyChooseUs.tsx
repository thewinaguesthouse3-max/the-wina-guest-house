import React from 'react';
import { BedDouble, MapPin, HeartHandshake, Layers, ShieldCheck } from 'lucide-react';
import { Language, translations } from '@/src/data/translations';

interface WhyChooseUsProps {
  currentLang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const features = [
    {
      number: '01',
      icon: BedDouble,
      title: t.whyUs.item1Title,
      description: t.whyUs.item1Desc,
    },
    {
      number: '02',
      icon: MapPin,
      title: t.whyUs.item2Title,
      description: t.whyUs.item2Desc,
    },
    {
      number: '03',
      icon: HeartHandshake,
      title: t.whyUs.item3Title,
      description: t.whyUs.item3Desc,
    },
    {
      number: '04',
      icon: Layers,
      title: t.whyUs.item4Title,
      description: t.whyUs.item4Desc,
    },
    {
      number: '05',
      icon: ShieldCheck,
      title: t.whyUs.item5Title,
      description: t.whyUs.item5Desc,
    },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-24 bg-[#EFECE6]/40 border-y border-[#E5DFC5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-2 inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-4 h-px bg-[#B38F56]" />
            <span>{t.whyUs.kicker}</span>
            <span aria-hidden="true" className="w-4 h-px bg-[#B38F56]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight">
            {t.whyUs.title}
          </h2>
          <p className="text-sm sm:text-base text-[#7B6E66] mt-3">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid (Asymmetric & Clean) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-7 rounded-xl border border-[#E5DFC5] shadow-xs hover:border-[#B38F56]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF3E0] flex items-center justify-center text-[#B38F56]">
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Editorial Numbering (Clean human editorial numbering, no mechanical //) */}
                    <span className="font-serif text-xl font-medium text-[#D8CBB5] tabular-nums">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#2C221E] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A4D45] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
