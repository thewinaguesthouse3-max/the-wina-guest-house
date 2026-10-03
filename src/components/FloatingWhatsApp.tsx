import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { ContactConfig, recordTrackingEvent } from '@/src/config/ownerStore';
import { Language } from '@/src/data/translations';

interface FloatingWhatsAppProps {
  contactConfig: ContactConfig;
  currentLang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  contactConfig,
  currentLang,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    recordTrackingEvent({
      type: 'WHATSAPP_CLICK',
      metadata: `Floating WhatsApp Widget: ${message || 'Direct Click'}`,
    });

    const text = encodeURIComponent(
      message || 'Hello The Wina Hospitality! I would like to inquire about accommodation availability in Canggu Bali.'
    );
    window.open(`https://wa.me/${contactConfig.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Quick Chat Card */}
      {open && (
        <div className="mb-3 w-80 bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#E5DFC5] overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#1F5C3E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold leading-tight">The Wina Hospitality</h4>
                <span className="text-[10px] text-white/80">Online · Guest Concierge</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF8F5] text-xs text-[#5A4D45] space-y-2">
            <div className="bg-[#EAF5EF] p-2.5 rounded-lg border border-[#BDE5CE] text-[11px] text-[#1F5C3E]">
              {currentLang === 'id'
                ? 'Halo! Ada yang bisa kami bantu mengenai reservasi kamar, villa, atau penjemputan di Bali?'
                : 'Hello! How may we assist with your stay, villa inquiries, or airport transfer in Canggu?'}
            </div>

            <form onSubmit={handleSend} className="space-y-2 pt-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={currentLang === 'id' ? 'Tulis pesan Anda...' : 'Type your question...'}
                className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-md px-3 py-2 text-xs text-[#2C221E] focus:outline-hidden focus:ring-1 focus:ring-[#1F5C3E]"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 bg-[#1F5C3E] hover:bg-[#16452E] text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{currentLang === 'id' ? 'Kirim ke WhatsApp' : 'Chat via WhatsApp'}</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-13 h-13 rounded-full bg-[#1F5C3E] hover:bg-[#16452E] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer focus:outline-hidden ring-4 ring-[#1F5C3E]/20"
        aria-label="Chat with The Wina Hospitality on WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};
