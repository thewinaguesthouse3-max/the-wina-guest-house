import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ExternalLink, MessageSquare, ShieldCheck, Camera } from 'lucide-react';
import { PropertyGalleryPhoto } from '@/src/data/properties';
import { Language } from '@/src/data/translations';

interface PhotoLightboxProps {
  isOpen: boolean;
  currentIndex: number;
  photos: PropertyGalleryPhoto[];
  propertyName: string;
  bookingUrl?: string;
  otaName?: string;
  currentLang: Language;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onOpenWhatsAppInquiry?: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  currentIndex,
  photos,
  propertyName,
  bookingUrl,
  otaName = 'Booking.com',
  currentLang,
  onClose,
  onNavigate,
  onOpenWhatsAppInquiry,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  const total = photos.length;
  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  if (!isOpen || !currentPhoto) return null;

  const photoTitle = currentLang === 'id' ? currentPhoto.titleId : currentPhoto.titleEn;
  const photoCaption = currentLang === 'id' ? currentPhoto.captionId : currentPhoto.captionEn;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${propertyName} photo gallery`}
      className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex flex-col justify-between animate-fadeIn text-white select-none"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="w-full px-4 sm:px-6 py-3.5 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between z-20 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#B38F56]/20 text-[#D8CBB5]">
              <Camera className="w-4 h-4 text-[#D8CBB5]" />
            </span>
            <div>
              <div className="text-xs sm:text-sm font-medium tracking-wide text-[#FAF8F5] truncate max-w-[200px] sm:max-w-md">
                {propertyName}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#A69B93]">
                <ShieldCheck className="w-3 h-3 text-[#52B788]" />
                <span>
                  {currentLang === 'id' ? 'Foto Asli Terverifikasi' : 'Authentic Verified Photos'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Counter & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-medium tracking-wider text-[#FAF8F5]">
            {currentIndex + 1} / {total}
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 rounded-full hover:bg-white/15 transition-colors text-white/80 hover:text-white cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer flex items-center gap-1 text-xs"
            aria-label="Close photo gallery"
            title="Press Esc to close"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline pr-1 text-[11px] text-white/70">ESC</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center px-2 sm:px-16 py-2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#B38F56] border border-white/20 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Photo Display with complete view without cutting off details */}
        <div className="relative max-w-full max-h-[70vh] sm:max-h-[74vh] flex items-center justify-center">
          <img
            key={currentPhoto.src}
            src={currentPhoto.src}
            alt={photoTitle}
            decoding="async"
            className="max-h-[70vh] sm:max-h-[74vh] w-auto max-w-[94vw] sm:max-w-[85vw] object-contain rounded-lg shadow-2xl transition-all duration-300 select-none animate-fadeIn"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#B38F56] border border-white/20 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Info Bar & Thumbnails Strip */}
      <div
        className="w-full bg-gradient-to-t from-black/95 via-black/90 to-transparent pt-3 pb-4 px-4 sm:px-8 z-20 shrink-0 border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#B38F56] text-white">
                {currentPhoto.category || 'Photo'}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#FAF8F5]">
                {photoTitle}
              </h3>
            </div>
            {photoCaption && (
              <p className="text-xs sm:text-sm text-[#D8CBB5] max-w-2xl leading-relaxed">
                {photoCaption}
              </p>
            )}
          </div>

          {/* Quick CTA Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenWhatsAppInquiry && (
              <button
                type="button"
                onClick={onOpenWhatsAppInquiry}
                className="py-1.5 px-3 rounded-md bg-[#1F5C3E] hover:bg-[#287A52] text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            )}

            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3.5 rounded-md bg-[#FAF8F5] hover:bg-[#D8CBB5] text-[#2C221E] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>{currentLang === 'id' ? `Pesan di ${otaName}` : `Book on ${otaName}`}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Horizontal Thumbnails Strip */}
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-thin">
          {photos.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate(idx)}
              className={`relative h-13 sm:h-16 aspect-4/3 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-[#B38F56] ring-2 ring-[#B38F56]/60 scale-105 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-90 hover:scale-100'
              }`}
              title={currentLang === 'id' ? p.titleId : p.titleEn}
              aria-label={`Jump to ${currentLang === 'id' ? p.titleId : p.titleEn}`}
            >
              <img
                src={p.src}
                alt={currentLang === 'id' ? p.titleId : p.titleEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
