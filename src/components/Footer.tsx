import React from 'react';
import { Property } from '@/src/data/properties';
import { Language, translations } from '@/src/data/translations';
import { MapPin, Mail, Instagram, MessageSquare, ShieldCheck, Lock } from 'lucide-react';
import { ContactConfig } from '@/src/config/ownerStore';

interface FooterProps {
  properties: Property[];
  contactConfig: ContactConfig;
  currentLang: Language;
  onSelectProperty: (property: Property) => void;
  onNavigate: (sectionId: string) => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenOwnerPortal: () => void;
  onOpenSemLanding: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  properties,
  contactConfig,
  currentLang,
  onSelectProperty,
  onNavigate,
  onOpenTerms,
  onOpenPrivacy,
  onOpenOwnerPortal,
  onOpenSemLanding,
}) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-[#241B18] text-[#EFECE6] border-t border-[#3E2F28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/the-wina-logo.svg"
                alt="The Wina Hospitality Logo"
                className="w-9 h-9 object-contain brightness-0 invert opacity-90"
              />
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#FAF8F5]">
                The Wina Hospitality
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-[#C5A880] font-medium">
              {t.footer.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#BDB5AE] leading-relaxed">
              {t.footer.description}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/the_wina_guesthouse"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#352823] hover:bg-[#B38F56] text-white flex items-center justify-center transition-colors"
                title="Instagram @the_wina_guesthouse"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${contactConfig.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#352823] hover:bg-[#1F5C3E] text-white flex items-center justify-center transition-colors"
                title="WhatsApp Concierge"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contactConfig.email}`}
                className="w-8 h-8 rounded-full bg-[#352823] hover:bg-[#B38F56] text-white flex items-center justify-center transition-colors"
                title="Official Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-[#BDB5AE]">
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.properties}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.whyUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.offers}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSemLanding}
                  className="text-[#C5A880] hover:text-[#FAF8F5] transition-colors cursor-pointer block mt-1"
                >
                  Google Ads Landing
                </button>
              </li>
            </ul>
          </div>

          {/* The 5 Properties */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] mb-4">
              {t.footer.properties}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#BDB5AE]">
              {properties.map((prop) => (
                <li key={prop.id}>
                  <button
                    onClick={() => onSelectProperty(prop)}
                    className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer block"
                  >
                    <span className="font-medium text-[#EFECE6] block">{prop.name}</span>
                    <span className="text-[11px] text-[#8E847D]">{prop.neighborhood}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparency & Disclaimer */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] mb-4">
              Booking Policy Notice
            </h4>
            <div className="bg-[#2D221E] p-4 rounded-xl border border-[#3E2F28] text-xs text-[#BDB5AE] leading-relaxed space-y-2">
              <p>
                Each property possesses an independent verified OTA listing (Booking.com & Trip.com). Live rates, promotions, and real-time room availability are confirmed exclusively via the respective official OTA platform. For properties with OTA listings in preparation (The Wina Villa 02), direct inquiries are available via WhatsApp.
              </p>
              <p className="text-[11px] text-[#8E847D]">
                The Wina Hospitality does not fabricate placeholder ratings or claim synchronization without verified platform confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#3E2F28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E847D]">
          <div>{t.footer.copyright}</div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.privacy}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.terms}
            </button>
            <span aria-hidden="true">·</span>
            {/* Owner portal link */}
            <button
              onClick={onOpenOwnerPortal}
              className="hover:text-[#C5A880] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>{t.footer.ownerPortal}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
