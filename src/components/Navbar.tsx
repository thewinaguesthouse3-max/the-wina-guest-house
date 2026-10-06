import React, { useState } from 'react';
import { Menu, X, Globe, Phone, ExternalLink, Calendar } from 'lucide-react';
import { Language, translations } from '@/src/data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
  onOpenOwnerPortal: () => void;
  onOpenSemLanding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onNavigate,
  onOpenOwnerPortal,
  onOpenSemLanding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DFC5]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Logo & Wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-left group cursor-pointer flex items-center gap-2.5"
          >
            <img
              src="/the-wina-logo.svg"
              alt="The Wina Hospitality Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            />
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#2C221E] group-hover:text-[#B38F56] transition-colors">
              The Wina Hospitality
            </span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5A4D45]">
            <button
              onClick={() => handleLinkClick('properties')}
              className="hover:text-[#2C221E] transition-colors cursor-pointer"
            >
              {t.nav.properties}
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="hover:text-[#2C221E] transition-colors cursor-pointer"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleLinkClick('why-us')}
              className="hover:text-[#2C221E] transition-colors cursor-pointer"
            >
              {t.nav.whyUs}
            </button>
            <button
              onClick={() => handleLinkClick('gallery')}
              className="hover:text-[#2C221E] transition-colors cursor-pointer"
            >
              {t.nav.gallery}
            </button>
            <button
              onClick={() => handleLinkClick('blog')}
              className="hover:text-[#2C221E] transition-colors cursor-pointer"
            >
              {t.nav.blog}
            </button>
            <button
              onClick={() => handleLinkClick('offers')}
              className="hover:text-[#2C221E] transition-colors cursor-pointer"
            >
              {t.nav.offers}
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="hover:text-[#2C221E] transition-colors cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions & Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center bg-[#EFECE6] rounded-md p-0.5 border border-[#E5DFC5]">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                  currentLang === 'en'
                    ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                    : 'text-[#7B6E66] hover:text-[#2C221E]'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('id')}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                  currentLang === 'id'
                    ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                    : 'text-[#7B6E66] hover:text-[#2C221E]'
                }`}
                title="Ganti ke Bahasa Indonesia"
              >
                ID
              </button>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => handleLinkClick('search')}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C221E] hover:bg-[#3E2F28] rounded-md transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E5DFC5]" />
              {t.nav.bookNow}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick lang for mobile */}
            <button
              onClick={() => onLanguageChange(currentLang === 'en' ? 'id' : 'en')}
              className="px-2 py-1 text-xs font-bold border border-[#D8CBB5] rounded text-[#2C221E] bg-[#FAF8F5]"
            >
              {currentLang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2C221E] hover:text-[#B38F56] transition-colors focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E5DFC5] px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-2.5 text-base font-medium text-[#2C221E]">
            <button
              onClick={() => handleLinkClick('properties')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              {t.nav.properties}
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleLinkClick('why-us')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              {t.nav.whyUs}
            </button>
            <button
              onClick={() => handleLinkClick('gallery')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              {t.nav.gallery}
            </button>
            <button
              onClick={() => handleLinkClick('blog')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              {t.nav.blog}
            </button>
            <button
              onClick={() => handleLinkClick('offers')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              {t.nav.offers}
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#EFECE6] transition-colors"
            >
              {t.nav.contact}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSemLanding();
              }}
              className="text-left py-2 px-3 rounded-md text-xs font-semibold text-[#8B6B3E] bg-[#FAF3E0] hover:bg-[#F2E7C9] transition-colors flex items-center justify-between"
            >
              <span>{t.nav.semLanding}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </nav>

          <div className="pt-3 border-t border-[#E5DFC5] flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('search')}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold uppercase tracking-wider text-white bg-[#2C221E] rounded-md transition-all shadow-xs"
            >
              {t.nav.bookNow}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOwnerPortal();
              }}
              className="text-xs text-center text-[#7B6E66] hover:text-[#2C221E] py-1 underline cursor-pointer"
            >
              {t.nav.ownerPortal}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
