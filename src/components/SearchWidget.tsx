import React, { useState } from 'react';
import { Calendar, Users, Home, Search, ExternalLink, Info, AlertCircle } from 'lucide-react';
import { Property } from '@/src/data/properties';
import { Language, translations } from '@/src/data/translations';
import { recordTrackingEvent } from '@/src/config/ownerStore';

interface SearchWidgetProps {
  properties: Property[];
  currentLang: Language;
  onSelectPropertyDetails?: (property: Property) => void;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({
  properties,
  currentLang,
  onSelectPropertyDetails,
}) => {
  const t = translations[currentLang];

  // Default dates: tomorrow and +3 days
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDefault = new Date();
  checkoutDefault.setDate(checkoutDefault.getDate() + 4);

  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('all');
  const [checkIn, setCheckIn] = useState<string>(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState<string>(checkoutDefault.toISOString().split('T')[0]);
  const [guests, setGuests] = useState<string>('2');
  const [showRedirectNotice, setShowRedirectNotice] = useState<{
    open: boolean;
    property?: Property;
  }>({ open: false });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPropertyId === 'all') {
      // Scroll to properties section
      const element = document.getElementById('properties');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const targetProp = properties.find((p) => p.id === selectedPropertyId);
    if (targetProp) {
      // Record analytics event
      recordTrackingEvent({
        type: 'BOOKING_CLICK',
        propertyId: targetProp.id,
        propertyName: targetProp.name,
        targetUrl: targetProp.bookingUrl,
        metadata: `Dates: ${checkIn} to ${checkOut} (${guests} guests)`,
      });

      // Show notice and redirect
      setShowRedirectNotice({ open: true, property: targetProp });
    }
  };

  const handleProceedToBooking = () => {
    if (showRedirectNotice.property) {
      window.open(showRedirectNotice.property.bookingUrl, '_blank', 'noopener,noreferrer');
      setShowRedirectNotice({ open: false });
    }
  };

  return (
    <div id="search" className="relative z-20 -mt-10 sm:-mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FAF8F5] rounded-xl shadow-xl border border-[#E5DFC5] p-5 sm:p-7">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFC5]/60 pb-3">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2C221E]">
            {t.search.title}
          </h2>
          <span className="text-xs text-[#7B6E66] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#B38F56]" />
            <span>{t.search.disclaimer}</span>
          </span>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Property Selector */}
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4D45] mb-1.5 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#B38F56]" />
              <span>{t.search.propertyLabel}</span>
            </label>
            <div className="relative">
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all cursor-pointer"
              >
                <option value="all">{t.search.allProperties}</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Check-in Date */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4D45] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B38F56]" />
              <span>{t.search.checkIn}</span>
            </label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all"
            />
          </div>

          {/* Check-out Date */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4D45] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B38F56]" />
              <span>{t.search.checkOut}</span>
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all"
            />
          </div>

          {/* Guests & Search Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#2C221E] hover:bg-[#3E2F28] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer h-[42px]"
            >
              <Search className="w-4 h-4 text-[#E5DFC5]" />
              <span>{t.search.searchBtn}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Redirect Instruction Modal */}
      {showRedirectNotice.open && showRedirectNotice.property && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#FAF8F5] rounded-xl max-w-lg w-full border border-[#E5DFC5] p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2.5 rounded-full bg-[#FAF3E0] text-[#B38F56] shrink-0">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#2C221E]">
                  {showRedirectNotice.property.name}
                </h3>
                <p className="text-xs text-[#7B6E66] mt-0.5">
                  Official Booking.com Listing
                </p>
              </div>
            </div>

            <div className="bg-[#EFECE6]/60 rounded-lg p-3.5 text-xs text-[#5A4D45] space-y-2 mb-5 border border-[#E5DFC5]">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#8B6B3E] shrink-0 mt-0.5" />
                <span>
                  {currentLang === 'id'
                    ? 'Anda akan dialihkan ke halaman resmi Booking.com milik properti ini. Silakan konfirmasi tanggal check-in dan tipe kamar yang Anda inginkan di halaman Booking.com.'
                    : 'You are being redirected to this property’s official Booking.com page. Please confirm your desired check-in dates and select your room type on Booking.com.'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#D8CBB5]/60 text-[11px] text-[#7B6E66]">
                <strong>Selected Property:</strong> {showRedirectNotice.property.name}
                <br />
                <strong>Direct URL:</strong>{' '}
                <span className="font-mono text-[#8B6B3E] break-all">
                  {showRedirectNotice.property.bookingUrl}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRedirectNotice({ open: false })}
                className="px-4 py-2 text-xs font-semibold text-[#7B6E66] hover:text-[#2C221E] transition-colors"
              >
                {currentLang === 'id' ? 'Batal' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleProceedToBooking}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#B38F56] hover:bg-[#A37E45] rounded-md transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentLang === 'id' ? 'Lanjutkan ke Booking.com' : 'Continue to Booking.com'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
