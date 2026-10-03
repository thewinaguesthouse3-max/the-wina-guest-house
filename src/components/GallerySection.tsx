import React, { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg from '@/src/assets/images/hero_bali_resort_1791004276796.jpg';
import echoBeachImg from '@/src/assets/images/wina_echo_beach_room_1791004290768.jpg';
import villaPoolImg from '@/src/assets/images/wina_villa_pool_1791004304004.jpg';
import ambienceImg from '@/src/assets/images/bali_canggu_ambience_1791004314788.jpg';
import { Language, translations } from '@/src/data/translations';

interface GallerySectionProps {
  currentLang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeCategory, setActiveCategory] = useState<'all' | 'villas' | 'guesthouses' | 'rooms' | 'ambience'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      src: heroImg,
      title: 'Tropical Swimming Pool & Sun Deck',
      category: 'ambience',
      property: 'The Wina Hospitality Sanctuary',
    },
    {
      src: echoBeachImg,
      title: 'Deluxe King Bedroom with Natural Light',
      category: 'rooms',
      property: 'The Wina Echo Beach Guest House',
    },
    {
      src: villaPoolImg,
      title: 'Private Pool & Sun Loungers',
      category: 'villas',
      property: 'The Wina Villa 01',
    },
    {
      src: ambienceImg,
      title: 'Lush Garden Pathway & Lantern Ambience',
      category: 'ambience',
      property: 'The Wina Guest House 3',
    },
    {
      src: echoBeachImg,
      title: 'Minimalist Balinese Interiors & Fine Linens',
      category: 'guesthouses',
      property: 'The Wina Guest House 2',
    },
    {
      src: villaPoolImg,
      title: 'Exclusive Tropical Living & Plunge Pool',
      category: 'villas',
      property: 'The Wina Villa 02',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E5DFC5]/80 pb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-2 flex items-center gap-2">
              <span>{t.gallery.kicker}</span>
              <span aria-hidden="true" className="w-6 h-px bg-[#B38F56]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight">
              {t.gallery.title}
            </h2>
            <p className="text-sm sm:text-base text-[#7B6E66] max-w-xl mt-2">
              {t.gallery.subtitle}
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFECE6] rounded-lg border border-[#E5DFC5] self-start md:self-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                  : 'text-[#7B6E66] hover:text-[#2C221E]'
              }`}
            >
              {t.gallery.tabAll}
            </button>
            <button
              onClick={() => setActiveCategory('villas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeCategory === 'villas'
                  ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                  : 'text-[#7B6E66] hover:text-[#2C221E]'
              }`}
            >
              {t.gallery.tabVillas}
            </button>
            <button
              onClick={() => setActiveCategory('guesthouses')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeCategory === 'guesthouses'
                  ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                  : 'text-[#7B6E66] hover:text-[#2C221E]'
              }`}
            >
              {t.gallery.tabGuesthouses}
            </button>
            <button
              onClick={() => setActiveCategory('rooms')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeCategory === 'rooms'
                  ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                  : 'text-[#7B6E66] hover:text-[#2C221E]'
              }`}
            >
              {t.gallery.tabRooms}
            </button>
            <button
              onClick={() => setActiveCategory('ambience')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeCategory === 'ambience'
                  ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                  : 'text-[#7B6E66] hover:text-[#2C221E]'
              }`}
            >
              {t.gallery.tabAmbience}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-4/3 rounded-xl overflow-hidden bg-[#EFECE6] border border-[#E5DFC5] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-[#E5DFC5] font-medium mb-1">
                  {item.property}
                </span>
                <h4 className="font-serif text-lg font-medium leading-snug">
                  {item.title}
                </h4>
                <div className="mt-2 flex items-center gap-1 text-xs text-[#E5DFC5]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption */}
            <div className="mt-4 text-center text-white">
              <p className="text-xs uppercase tracking-widest text-[#C5A880]">
                {filteredItems[lightboxIndex].property}
              </p>
              <h3 className="font-serif text-lg sm:text-xl font-medium mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
