import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { Language } from '@/src/data/translations';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  currentLang: Language;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, currentLang, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E5DFC5] overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#FAF8F5] px-6 py-4 border-b border-[#E5DFC5] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2C221E]">
            {type === 'terms' ? <FileText className="w-4 h-4 text-[#B38F56]" /> : <ShieldCheck className="w-4 h-4 text-[#B38F56]" />}
            <span>{type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7B6E66] hover:text-[#2C221E] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-[#5A4D45] leading-relaxed">
          {type === 'terms' ? (
            <>
              <h3 className="font-serif text-lg font-semibold text-[#2C221E]">
                1. Booking & Reservation Policy
              </h3>
              <p>
                The Wina Hospitality operates boutique guest houses and private villas in Canggu, Bali. Individual room reservations and real-time confirmations are managed through authorized third-party channel partners including Booking.com. All cancellation rules, check-in policies, and deposits adhere to the specific terms selected on your Booking.com reservation.
              </p>
              <h3 className="font-serif text-lg font-semibold text-[#2C221E]">
                2. Check-In & House Rules
              </h3>
              <p>
                Standard check-in is from 14:00 WITA and check-out is by 12:00 WITA. We maintain a respectful, quiet atmosphere across all guest houses between 22:00 and 08:00 to ensure restful sleep for all guests. Smoking is strictly prohibited inside enclosed bedrooms.
              </p>
              <h3 className="font-serif text-lg font-semibold text-[#2C221E]">
                3. Direct Inquiries & WhatsApp Concierge
              </h3>
              <p>
                Direct inquiries made via WhatsApp for scooter hire or extended stays are subject to written mutual confirmation by our local Bali operations team.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-lg font-semibold text-[#2C221E]">
                1. Information We Collect
              </h3>
              <p>
                When submitting an inquiry form or contacting us via WhatsApp, we collect basic details (such as your name, email address, phone number, and intended dates of stay) solely to facilitate your reservation questions and provide concierge assistance.
              </p>
              <h3 className="font-serif text-lg font-semibold text-[#2C221E]">
                2. Use of Information
              </h3>
              <p>
                Your personal details are never sold, rented, or shared with unauthorized commercial third parties. They are used exclusively by The Wina Hospitality team to respond to inquiries and coordinate your stay in Bali.
              </p>
              <h3 className="font-serif text-lg font-semibold text-[#2C221E]">
                3. Cookies and Analytics
              </h3>
              <p>
                We use privacy-respecting client analytics to monitor conversion button interactions and improve website performance. No sensitive payment information is processed or stored on this website.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
