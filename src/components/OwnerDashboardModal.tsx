import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  RotateCcw,
  BarChart3,
  Link as LinkIcon,
  Phone,
  Mail,
  Home,
  CheckCircle,
  ExternalLink,
  Download,
  Upload,
  Info,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { Property } from '@/src/data/properties';
import {
  BookingUrlsConfig,
  ContactConfig,
  TrackingEvent,
  getTrackingEvents,
  recordTrackingEvent,
} from '@/src/config/ownerStore';

interface OwnerDashboardModalProps {
  properties: Property[];
  bookingUrls: BookingUrlsConfig;
  contactConfig: ContactConfig;
  onClose: () => void;
  onSaveBookingUrls: (urls: BookingUrlsConfig) => void;
  onSaveContact: (contact: ContactConfig) => void;
  onSaveProperties: (properties: Property[]) => void;
  onResetDefaults: () => void;
}

export const OwnerDashboardModal: React.FC<OwnerDashboardModalProps> = ({
  properties,
  bookingUrls,
  contactConfig,
  onClose,
  onSaveBookingUrls,
  onSaveContact,
  onSaveProperties,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'booking-urls' | 'contact' | 'analytics' | 'pricing'>('booking-urls');
  const [urlsForm, setUrlsForm] = useState<BookingUrlsConfig>({ ...bookingUrls });
  const [contactForm, setContactForm] = useState<ContactConfig>({ ...contactConfig });
  const [propertiesState, setPropertiesState] = useState<Property[]>([...properties]);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setEvents(getTrackingEvents());

    const handleUpdate = () => {
      setEvents(getTrackingEvents());
    };
    window.addEventListener('wina_tracking_update', handleUpdate);
    return () => window.removeEventListener('wina_tracking_update', handleUpdate);
  }, []);

  const handleSaveUrls = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBookingUrls(urlsForm);
    // Also update individual property bookingUrls in properties array
    const updatedProps = propertiesState.map((p) => {
      if (p.id === 'echo-beach') return { ...p, bookingUrl: urlsForm.bookingUrlEchoBeach };
      if (p.id === 'guest-house-2') return { ...p, bookingUrl: urlsForm.bookingUrlGuestHouse2 };
      if (p.id === 'guest-house-3') return { ...p, bookingUrl: urlsForm.bookingUrlGuestHouse3 };
      if (p.id === 'villa-01') return { ...p, bookingUrl: urlsForm.bookingUrlVilla01 };
      if (p.id === 'villa-02') return { ...p, bookingUrl: urlsForm.bookingUrlVilla02 };
      return p;
    });
    onSaveProperties(updatedProps);

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveContact(contactForm);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleExportJson = () => {
    const backup = {
      bookingUrls: urlsForm,
      contact: contactForm,
      properties: propertiesState,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thewina-config-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Compute analytics summaries
  const bookingClicks = events.filter((e) => e.type === 'BOOKING_CLICK').length;
  const waClicks = events.filter((e) => e.type === 'WHATSAPP_CLICK').length;
  const formSubmissions = events.filter((e) => e.type === 'FORM_SUBMIT').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#E5DFC5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#2C221E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FAF3E0] flex items-center justify-center text-[#2C221E]">
              <Layers className="w-5 h-5 text-[#B38F56]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                The Wina Hospitality — Owner Portal
              </h2>
              <p className="text-xs text-[#E5DFC5]">
                Manage Booking.com links, direct WhatsApp, and view real-time click analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#FAF8F5] rounded transition-colors"
              title="Download backup configuration JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#EFECE6] border-b border-[#E5DFC5] px-6 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('booking-urls')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'booking-urls'
                ? 'border-[#B38F56] text-[#2C221E] bg-[#FAF8F5]'
                : 'border-transparent text-[#7B6E66] hover:text-[#2C221E]'
            }`}
          >
            <LinkIcon className="w-4 h-4 text-[#B38F56]" />
            <span>Booking.com URLs (5 Properties)</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'border-[#B38F56] text-[#2C221E] bg-[#FAF8F5]'
                : 'border-transparent text-[#7B6E66] hover:text-[#2C221E]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#B38F56]" />
            <span>Analytics & SEM Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'border-[#B38F56] text-[#2C221E] bg-[#FAF8F5]'
                : 'border-transparent text-[#7B6E66] hover:text-[#2C221E]'
            }`}
          >
            <Phone className="w-4 h-4 text-[#B38F56]" />
            <span>Contact & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'pricing'
                ? 'border-[#B38F56] text-[#2C221E] bg-[#FAF8F5]'
                : 'border-transparent text-[#7B6E66] hover:text-[#2C221E]'
            }`}
          >
            <Home className="w-4 h-4 text-[#B38F56]" />
            <span>Starting Rates & Descriptions</span>
          </button>
        </div>

        {/* Saved feedback toast */}
        {savedNotice && (
          <div className="bg-[#EAF5EF] border-b border-[#BDE5CE] px-6 py-2.5 text-xs text-[#1F5C3E] flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle className="w-4 h-4" />
              Settings saved successfully! Website has been updated.
            </span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-6">
          {/* TAB 1: Booking.com URLs */}
          {activeTab === 'booking-urls' && (
            <form onSubmit={handleSaveUrls} className="space-y-6">
              <div className="bg-[#FAF3E0] border border-[#E5DFC5] p-4 rounded-xl text-xs text-[#5A4D45]">
                <strong className="text-[#8B6B3E] block mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  Independent Property URL Configuration
                </strong>
                <span>
                  Each property must retain its own distinct Booking.com listing link. When users click "Book Now" or "Check Availability", they will be directed specifically to the URL configured here.
                </span>
              </div>

              <div className="space-y-4">
                {/* 1. Echo Beach */}
                <div className="bg-[#FAF8F5] border border-[#E5DFC5] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2C221E]">
                      1. The Wina Echo Beach Guest House (`bookingUrlEchoBeach`)
                    </label>
                    <a
                      href={urlsForm.bookingUrlEchoBeach}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#B38F56] hover:underline flex items-center gap-1"
                    >
                      <span>Test link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="url"
                    required
                    value={urlsForm.bookingUrlEchoBeach}
                    onChange={(e) => setUrlsForm({ ...urlsForm, bookingUrlEchoBeach: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs font-mono text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                </div>

                {/* 2. Guest House 2 */}
                <div className="bg-[#FAF8F5] border border-[#E5DFC5] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2C221E]">
                      2. The Wina Guest House 2 (`bookingUrlGuestHouse2`)
                    </label>
                    <a
                      href={urlsForm.bookingUrlGuestHouse2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#B38F56] hover:underline flex items-center gap-1"
                    >
                      <span>Test link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="url"
                    required
                    value={urlsForm.bookingUrlGuestHouse2}
                    onChange={(e) => setUrlsForm({ ...urlsForm, bookingUrlGuestHouse2: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs font-mono text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                </div>

                {/* 3. Guest House 3 */}
                <div className="bg-[#FAF8F5] border border-[#E5DFC5] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2C221E]">
                      3. The Wina Guest House 3 (`bookingUrlGuestHouse3`)
                    </label>
                    <a
                      href={urlsForm.bookingUrlGuestHouse3}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#B38F56] hover:underline flex items-center gap-1"
                    >
                      <span>Test link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="url"
                    required
                    value={urlsForm.bookingUrlGuestHouse3}
                    onChange={(e) => setUrlsForm({ ...urlsForm, bookingUrlGuestHouse3: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs font-mono text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                </div>

                {/* 4. Villa 01 */}
                <div className="bg-[#FAF8F5] border border-[#E5DFC5] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2C221E]">
                      4. The Wina Villa 01 (`bookingUrlVilla01`)
                    </label>
                    <a
                      href={urlsForm.bookingUrlVilla01}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#B38F56] hover:underline flex items-center gap-1"
                    >
                      <span>Test link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="url"
                    required
                    value={urlsForm.bookingUrlVilla01}
                    onChange={(e) => setUrlsForm({ ...urlsForm, bookingUrlVilla01: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs font-mono text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                </div>

                {/* 5. Villa 02 */}
                <div className="bg-[#FAF8F5] border border-[#E5DFC5] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2C221E]">
                      5. The Wina Villa 02 (`bookingUrlVilla02`)
                    </label>
                    <a
                      href={urlsForm.bookingUrlVilla02}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#B38F56] hover:underline flex items-center gap-1"
                    >
                      <span>Test link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="url"
                    required
                    value={urlsForm.bookingUrlVilla02}
                    onChange={(e) => setUrlsForm({ ...urlsForm, bookingUrlVilla02: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs font-mono text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E5DFC5]">
                <button
                  type="button"
                  onClick={onResetDefaults}
                  className="px-4 py-2 text-xs font-semibold text-[#7B6E66] hover:text-[#2C221E] flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Original Defaults</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4 text-[#E5DFC5]" />
                  <span>Save Booking URLs</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Analytics & Tracking */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5]">
                  <span className="text-xs text-[#7B6E66] uppercase tracking-wider font-semibold block">
                    Booking.com Clicks
                  </span>
                  <span className="font-serif text-3xl font-semibold text-[#2C221E] mt-1 block tabular-nums">
                    {bookingClicks}
                  </span>
                  <span className="text-[11px] text-[#A69B93] mt-1 block">
                    Clicks on Book Now CTA buttons
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5]">
                  <span className="text-xs text-[#7B6E66] uppercase tracking-wider font-semibold block">
                    WhatsApp Conversations
                  </span>
                  <span className="font-serif text-3xl font-semibold text-[#1F5C3E] mt-1 block tabular-nums">
                    {waClicks}
                  </span>
                  <span className="text-[11px] text-[#A69B93] mt-1 block">
                    Direct inquiries initiated
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5]">
                  <span className="text-xs text-[#7B6E66] uppercase tracking-wider font-semibold block">
                    Inquiry Forms Sent
                  </span>
                  <span className="font-serif text-3xl font-semibold text-[#8B6B3E] mt-1 block tabular-nums">
                    {formSubmissions}
                  </span>
                  <span className="text-[11px] text-[#A69B93] mt-1 block">
                    Completed booking inquiry forms
                  </span>
                </div>
              </div>

              {/* SEM & GA4 Setup Information */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5] space-y-3">
                <h4 className="text-sm font-semibold text-[#2C221E] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#B38F56]" />
                  Google Ads (SEM) & GA4 Event Tracking Status
                </h4>
                <p className="text-xs text-[#5A4D45] leading-relaxed">
                  All interactive conversion buttons fire standard browser and analytics events (`click_booking_com`, `click_whatsapp`, `submit_inquiry`). This allows Google Tag Manager (GTM) and Google Analytics 4 (GA4) to distinguish high-intent booking clicks from casual page views without misreporting them as guaranteed room purchases.
                </p>
                <div className="p-3 bg-[#EFECE6] rounded-lg font-mono text-[11px] text-[#5A4D45]">
                  gtag('event', 'conversion', &#123; event_category: 'booking_link', event_label: property_name &#125;)
                </div>
              </div>

              {/* Live Events Log */}
              <div>
                <h4 className="text-sm font-semibold text-[#2C221E] mb-3">
                  Recent Visitor Conversion Events Log ({events.length})
                </h4>
                {events.length === 0 ? (
                  <p className="text-xs text-[#7B6E66] italic bg-[#EFECE6]/40 p-4 rounded-lg">
                    No conversion clicks recorded yet. Clicks on Book Now or WhatsApp will appear here in real time.
                  </p>
                ) : (
                  <div className="bg-[#FAF8F5] border border-[#E5DFC5] rounded-xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-[#E5DFC5]">
                    {events.map((evt) => (
                      <div key={evt.id} className="p-3 text-xs flex items-center justify-between gap-4">
                        <div>
                          <span
                            className={`font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider mr-2 ${
                              evt.type === 'BOOKING_CLICK'
                                ? 'bg-[#FAF3E0] text-[#8B6B3E]'
                                : evt.type === 'WHATSAPP_CLICK'
                                ? 'bg-[#EAF5EF] text-[#1F5C3E]'
                                : 'bg-[#EFECE6] text-[#2C221E]'
                            }`}
                          >
                            {evt.type}
                          </span>
                          <strong className="text-[#2C221E]">{evt.propertyName || 'General Inquiry'}</strong>
                          {evt.metadata && (
                            <span className="text-[#7B6E66] block text-[11px] mt-0.5 truncate max-w-md">
                              {evt.metadata}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#A69B93] tabular-nums shrink-0">
                          {new Date(evt.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Contact & WhatsApp */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveContact} className="space-y-4">
              <div className="bg-[#FAF8F5] border border-[#E5DFC5] p-5 rounded-xl space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1">
                    Official WhatsApp Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.whatsappNumber}
                    onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                  <span className="text-[11px] text-[#7B6E66] block mt-1">
                    Displayed to visitors across the site.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1">
                    WhatsApp International Digits Only (for wa.me redirect)
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.whatsappRaw}
                    onChange={(e) => setContactForm({ ...contactForm, whatsappRaw: e.target.value })}
                    placeholder="e.g. 6281239876543"
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] font-mono focus:ring-2 focus:ring-[#B38F56]"
                  />
                  <span className="text-[11px] text-[#7B6E66] block mt-1">
                    Numbers only without '+' or dashes. Used for direct WhatsApp messaging links.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1">
                    Official Instagram Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.instagram}
                    onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1">
                    Primary Office Address
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:ring-2 focus:ring-[#B38F56]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4 text-[#E5DFC5]" />
                  <span>Update Contact Settings</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: Starting Rates */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <p className="text-xs text-[#5A4D45] leading-relaxed">
                Update indicative starting rates (in IDR) displayed on the property cards. Live rates and seasonal discounts are always verified through Booking.com.
              </p>

              <div className="space-y-3">
                {propertiesState.map((prop, idx) => (
                  <div key={prop.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-[#2C221E]">{prop.name}</h4>
                      <span className="text-[11px] text-[#7B6E66]">{prop.neighborhood}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7B6E66]">IDR</span>
                      <input
                        type="number"
                        step={10000}
                        value={prop.startingPriceIdr}
                        onChange={(e) => {
                          const updated = [...propertiesState];
                          updated[idx] = { ...updated[idx], startingPriceIdr: Number(e.target.value) };
                          setPropertiesState(updated);
                        }}
                        className="w-36 bg-[#FAF8F5] border border-[#D8CBB5] rounded px-2.5 py-1.5 text-xs font-mono text-[#2C221E] text-right"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end pt-3">
                <button
                  type="button"
                  onClick={() => {
                    onSaveProperties(propertiesState);
                    setSavedNotice(true);
                    setTimeout(() => setSavedNotice(false), 3000);
                  }}
                  className="px-6 py-2.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4 text-[#E5DFC5]" />
                  <span>Save Rates</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
