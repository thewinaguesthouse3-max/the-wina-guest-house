import React from 'react';
import { X, Calendar, Clock, BookOpen, ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { BlogPost } from '@/src/data/blog';
import { Property } from '@/src/data/properties';
import { Language } from '@/src/data/translations';

interface BlogReaderModalProps {
  post: BlogPost | null;
  properties: Property[];
  currentLang: Language;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  properties,
  currentLang,
  onClose,
  onSelectProperty,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E5DFC5] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header with Title & Close Button */}
        <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E5DFC5] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B38F56]">
            <BookOpen className="w-4 h-4" />
            <span>{category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7B6E66] hover:text-[#2C221E] hover:bg-[#EFECE6] rounded-full transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Article Header */}
          <div>
            <div className="flex items-center gap-3 text-xs text-[#7B6E66] mb-3">
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

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2C221E] leading-tight mb-4" style={{ textWrap: 'balance' }}>
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#5A4D45] leading-relaxed italic border-l-2 border-[#B38F56] pl-4 py-1 bg-[#EFECE6]/30 rounded-r-md">
              {metaDesc}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-[#EFECE6] border border-[#E5DFC5] shadow-xs">
            <img
              src={post.coverImage}
              alt={title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Structured Content Sections */}
          <div className="prose prose-stone max-w-none text-sm sm:text-base text-[#40352F] space-y-6">
            {content.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                {sec.heading && (
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221E] pt-4 border-t border-[#E5DFC5]/60">
                    {sec.heading}
                  </h2>
                )}
                {sec.subheading && (
                  <h3 className="font-serif text-lg font-semibold text-[#2C221E] text-[#8B6B3E]">
                    {sec.subheading}
                  </h3>
                )}
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
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

          {/* Internal Link / Recommended Property CTA */}
          {recommendedProp && (
            <div className="p-6 rounded-xl bg-[#FAF3E0] border border-[#E5DFC5] mt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8B6B3E] font-semibold block mb-1">
                  Recommended Accommodation for this Guide
                </span>
                <h4 className="font-serif text-xl font-semibold text-[#2C221E]">
                  {recommendedProp.name}
                </h4>
                <p className="text-xs text-[#5A4D45] mt-1 max-w-md">
                  {currentLang === 'id' ? recommendedProp.taglineId : recommendedProp.taglineEn}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => {
                    onClose();
                    onSelectProperty(recommendedProp);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#2C221E] hover:bg-[#B38F56] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5DFC5]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
