import React from 'react';
import {
  X,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  ExternalLink,
  MapPin,
  ChevronRight,
  Home,
  MessageSquare,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { BlogPost } from '@/src/data/blog';
import { Property } from '@/src/data/properties';
import { Language } from '@/src/data/translations';
import { recordTrackingEvent } from '@/src/config/ownerStore';

interface BlogReaderModalProps {
  post: BlogPost | null;
  properties: Property[];
  currentLang: Language;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  onExploreProperties: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  properties,
  currentLang,
  onClose,
  onSelectProperty,
  onExploreProperties,
}) => {
  if (!post) return null;

  const content = currentLang === 'id' ? post.contentId : post.contentEn;
  const title = currentLang === 'id' ? post.titleId : post.titleEn;
  const category = currentLang === 'id' ? post.categoryId : post.categoryEn;
  const metaDesc = currentLang === 'id' ? post.metaDescId : post.metaDescEn;

  const recommendedProp = post.recommendedPropertyId
    ? properties.find((p) => p.id === post.recommendedPropertyId)
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E5DFC5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header with Title & Close Button */}
        <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E5DFC5] flex items-center justify-between">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#7B6E66] truncate max-w-[80%]">
            <span className="flex items-center gap-1 text-[#2C221E] font-medium shrink-0">
              <Home className="w-3.5 h-3.5 text-[#B38F56]" />
              <span>Home</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D8CBB5] shrink-0" />
            <span className="text-[#8B6B3E] font-medium shrink-0">{category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D8CBB5] shrink-0 hidden sm:inline" />
            <span className="truncate text-[#7B6E66] hidden sm:inline">{title}</span>
          </nav>

          <button
            onClick={onClose}
            className="p-2 text-[#7B6E66] hover:text-[#2C221E] hover:bg-[#EFECE6] rounded-full transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Article Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#7B6E66] mb-3">
              <span className="px-2.5 py-0.5 rounded bg-[#EFECE6] text-[#8B6B3E] font-semibold uppercase tracking-wider text-[10px]">
                {category}
              </span>
              <span aria-hidden="true" className="text-[#D8CBB5]">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#B38F56]" />
                <span>{post.publishDate}</span>
              </span>
              <span aria-hidden="true" className="text-[#D8CBB5]">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B38F56]" />
                <span>{post.readTime}</span>
              </span>
            </div>

            {/* Exactly One H1 as required by SEO best practices */}
            <h1
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2C221E] leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#5A4D45] leading-relaxed italic border-l-2 border-[#B38F56] pl-4 py-2 bg-[#EFECE6]/30 rounded-r-md">
              {metaDesc}
            </p>
          </div>

          {/* Featured Image with SEO Alt Text */}
          <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-[#EFECE6] border border-[#E5DFC5] shadow-xs">
            <img
              src={post.coverImage}
              alt={`${title} - The Wina Hospitality Canggu Bali`}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Structured Content Sections with H2/H3 */}
          <div className="prose prose-stone max-w-none text-sm sm:text-base text-[#40352F] space-y-6">
            {content.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                {sec.heading && (
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E] pt-4 border-t border-[#E5DFC5]/60">
                    {sec.heading}
                  </h2>
                )}
                {sec.subheading && (
                  <h3 className="font-serif text-lg font-semibold text-[#8B6B3E] mt-3">
                    {sec.subheading}
                  </h3>
                )}
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-[#5A4D45]">
                    {para}
                  </p>
                ))}
                {sec.listItems && (
                  <ul className="space-y-2 pl-5 list-disc text-xs sm:text-sm text-[#5A4D45]">
                    {sec.listItems.map((li, lIdx) => (
                      <li key={lIdx}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Internal Linking: Natural Accommodation Suggestions */}
          <div className="p-6 rounded-2xl bg-[#EFECE6]/60 border border-[#E5DFC5] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6B3E]">
                  Explore Canggu Accommodations
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#2C221E]">
                  Curated Stays by The Wina Hospitality
                </h4>
              </div>
              <span className="text-xs text-[#7B6E66] hidden sm:inline">Canggu, Bali</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {properties.map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => {
                    onClose();
                    onSelectProperty(prop);
                  }}
                  className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFC5] hover:border-[#B38F56] transition-colors flex items-center justify-between text-left cursor-pointer group"
                >
                  <div className="pr-2">
                    <span className="font-semibold text-[#2C221E] group-hover:text-[#B38F56] transition-colors block">
                      {prop.name}
                    </span>
                    <span className="text-[11px] text-[#7B6E66] block truncate">
                      From Rp{prop.startingPriceIdr.toLocaleString('id-ID')}/night · {prop.category === 'villa' ? 'Private Villa' : 'Guest House'}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#B38F56] shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Section 10: Blog Call to Action (CTA) */}
          {post.isPropertySpecific && recommendedProp ? (
            /* Property-Specific CTA */
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF3E0] border border-[#E5DFC5] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8B6B3E] font-semibold block mb-1">
                  Stay at {recommendedProp.name}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E]">
                  Ready to Book Your Canggu Stay?
                </h3>
                <p className="text-xs sm:text-sm text-[#5A4D45] mt-1 max-w-lg">
                  {currentLang === 'id' ? recommendedProp.taglineId : recommendedProp.taglineEn}
                </p>
                <div className="mt-2 text-xs font-semibold text-[#2C221E]">
                  Starting from Rp{recommendedProp.startingPriceIdr.toLocaleString('id-ID')}/night
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => {
                    onClose();
                    onSelectProperty(recommendedProp);
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Property Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* General Blog CTA (Section 10 Requirement) */
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF3E0] border border-[#E5DFC5] text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#8B6B3E] font-semibold block">
                The Wina Hospitality
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C221E]">
                Looking for a place to stay in Canggu?
              </h3>
              <p className="text-xs sm:text-sm text-[#5A4D45] max-w-xl mx-auto leading-relaxed">
                Explore The Wina Hospitality properties and find the accommodation that fits your Bali trip.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onExploreProperties();
                  }}
                  className="px-7 py-3.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs font-bold tracking-wider uppercase rounded-md transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>EXPLORE OUR PROPERTIES</span>
                  <ArrowRight className="w-4 h-4 text-[#E5DFC5]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
