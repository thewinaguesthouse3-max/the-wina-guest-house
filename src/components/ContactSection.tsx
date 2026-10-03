import React, { useState } from 'react';
import { Mail, Phone, Instagram, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Property } from '@/src/data/properties';
import { Language, translations } from '@/src/data/translations';
import { ContactConfig, recordTrackingEvent } from '@/src/config/ownerStore';

interface ContactSectionProps {
  properties: Property[];
  contactConfig: ContactConfig;
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  properties,
  contactConfig,
  currentLang,
}) => {
  const t = translations[currentLang];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: properties[0]?.id || '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedProp = properties.find((p) => p.id === form.propertyId);
    const propName = selectedProp ? selectedProp.name : 'The Wina Hospitality';

    // Record tracking event
    recordTrackingEvent({
      type: 'FORM_SUBMIT',
      propertyId: form.propertyId,
      propertyName: propName,
      metadata: `Inquiry by ${form.name} for ${form.guests} guests (${form.checkIn} to ${form.checkOut})`,
    });

    // Format WhatsApp message
    const waText = encodeURIComponent(
      `Hello The Wina Hospitality!\n\nI would like to inquire about a booking:\n- Name: ${form.name}\n- Email: ${form.email}\n- Property: ${propName}\n- Check-in: ${form.checkIn || 'To be decided'}\n- Check-out: ${form.checkOut || 'To be decided'}\n- Guests: ${form.guests}\n- Note: ${form.message || 'None'}\n\nThank you!`
    );

    const waUrl = `https://wa.me/${contactConfig.whatsappRaw}?text=${waText}`;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-2 flex items-center gap-2">
            <span>{t.contact.kicker}</span>
            <span aria-hidden="true" className="w-6 h-px bg-[#B38F56]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-[#7B6E66] mt-3">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Official Contact Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#EFECE6]/50 rounded-2xl border border-[#E5DFC5] p-7 sm:p-8 space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-[#2C221E]">
                Official Guest Services
              </h3>
              <p className="text-xs sm:text-sm text-[#5A4D45] leading-relaxed">
                Connect directly with our on-island team for immediate questions regarding accommodation options, airport pickups, and scooter arrangements.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#D8CBB5]/70 text-sm">
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFC5] text-[#B38F56] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#7B6E66] font-medium block">
                      {t.contact.directEmailTitle}
                    </span>
                    <a
                      href={`mailto:${contactConfig.email}`}
                      className="font-medium text-[#2C221E] hover:text-[#B38F56] transition-colors break-all"
                    >
                      {contactConfig.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFC5] text-[#1F5C3E] shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#7B6E66] font-medium block">
                      {t.contact.phoneTitle}
                    </span>
                    <a
                      href={`https://wa.me/${contactConfig.whatsappRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#2C221E] hover:text-[#B38F56] transition-colors"
                    >
                      {contactConfig.whatsappNumber}
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFC5] text-[#B38F56] shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#7B6E66] font-medium block">
                      {t.contact.instagramTitle}
                    </span>
                    <a
                      href="https://www.instagram.com/the_wina_guesthouse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#2C221E] hover:text-[#B38F56] transition-colors"
                    >
                      {contactConfig.instagram}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFC5] text-[#B38F56] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#7B6E66] font-medium block">
                      {t.contact.locationTitle}
                    </span>
                    <span className="text-[#2C221E] leading-snug block">
                      {contactConfig.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Notice */}
              <div className="p-4 rounded-xl bg-[#FAF3E0] border border-[#E5DFC5] text-xs text-[#5A4D45]">
                <strong className="text-[#8B6B3E] block mb-1">
                  {t.contact.bookingNoticeTitle}
                </strong>
                <span>{t.contact.bookingNoticeText}</span>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E5DFC5] p-7 sm:p-9 shadow-sm">
              <h3 className="font-serif text-2xl font-semibold text-[#2C221E] mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#7B6E66] mb-6">
                Fill in your travel details below and our team will get back to you promptly.
              </p>

              {submitted && (
                <div className="p-4 rounded-xl bg-[#EAF5EF] border border-[#BDE5CE] text-xs text-[#1F5C3E] flex items-start gap-2.5 mb-6 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-[#1F5C3E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold">
                      Inquiry Dispatched to WhatsApp!
                    </strong>
                    <span>
                      Your inquiry has been formulated and opened in WhatsApp. If WhatsApp did not open automatically, please click below or email us directly at {contactConfig.email}.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1.5">
                      {t.contact.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2.5 text-sm text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1.5">
                      {t.contact.formEmail} *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2.5 text-sm text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1.5">
                      {t.contact.formPhone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. +62 812 3456 7890"
                      className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2.5 text-sm text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all"
                    />
                  </div>

                  {/* Preferred Property */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1.5">
                      {t.contact.formProperty} *
                    </label>
                    <select
                      value={form.propertyId}
                      onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2.5 text-sm text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all cursor-pointer"
                    >
                      {properties.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Check-in */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1.5">
                      {t.contact.formCheckIn}
                    </label>
                    <input
                      type="date"
                      value={form.checkIn}
                      onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3 py-2 text-xs text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all"
                    />
                  </div>

                  {/* Check-out */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1.5">
                      {t.contact.formCheckOut}
                    </label>
                    <input
                      type="date"
                      value={form.checkOut}
                      onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3 py-2 text-xs text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1.5">
                      {t.contact.formGuests}
                    </label>
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3 py-2 text-xs text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all cursor-pointer"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3-4">3-4 Guests</option>
                      <option value="5+">5+ Guests (Villa)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] uppercase tracking-wider mb-1.5">
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about special arrival times, airport pickup needs, or questions..."
                    className="w-full bg-[#FAF8F5] border border-[#D8CBB5] rounded-lg px-3.5 py-2.5 text-sm text-[#2C221E] focus:outline-hidden focus:ring-2 focus:ring-[#B38F56] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#1F5C3E] hover:bg-[#16452E] rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submitBtn}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
