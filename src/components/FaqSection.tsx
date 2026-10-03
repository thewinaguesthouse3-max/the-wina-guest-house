import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { generalFaqs } from '@/src/data/faqs';
import { Language, translations } from '@/src/data/translations';

interface FaqSectionProps {
  currentLang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [openId, setOpenId] = useState<string | null>(generalFaqs[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#EFECE6]/30 border-y border-[#E5DFC5]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-2 inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-4 h-px bg-[#B38F56]" />
            <span>{t.faq.kicker}</span>
            <span aria-hidden="true" className="w-4 h-px bg-[#B38F56]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-sm sm:text-base text-[#7B6E66] mt-3">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3.5">
          {generalFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FAF8F5] rounded-xl border border-[#E5DFC5] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/80 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#2C221E]">
                    {currentLang === 'id' ? faq.questionId : faq.questionEn}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B38F56] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5A4D45] leading-relaxed border-t border-[#E5DFC5]/40 animate-fadeIn">
                    {currentLang === 'id' ? faq.answerId : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
