import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import { blogPosts, BlogPost } from '@/src/data/blog';
import { Language } from '@/src/data/translations';

interface BlogSectionProps {
  currentLang: Language;
  onReadPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ currentLang, onReadPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', labelEn: 'All Guides', labelId: 'Semua Artikel' },
    { key: 'Bali Travel Guide', labelEn: 'Bali Travel Guide', labelId: 'Panduan Wisata Bali' },
    { key: 'Canggu Accommodation Guide', labelEn: 'Accommodation Guide', labelId: 'Panduan Akomodasi' },
    { key: 'The Wina Hospitality', labelEn: 'The Wina Hospitality', labelId: 'The Wina Hospitality' },
    { key: 'Bali Stay Tips', labelEn: 'Bali Stay Tips', labelId: 'Tips Menginap di Bali' },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.categoryEn === selectedCategory;
  });

  return (
    <section id="blog" className="py-20 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E5DFC5]/80 pb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#B38F56] mb-2 flex items-center gap-2">
              <span>{currentLang === 'id' ? 'Blog & Panduan Wisata' : 'Bali Travel Guides & Tips'}</span>
              <span aria-hidden="true" className="w-6 h-px bg-[#B38F56]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C221E] tracking-tight">
              {currentLang === 'id' ? 'Inspirasi & Tips Wisata Canggu' : 'Canggu Insights & Travel Stories'}
            </h2>
            <p className="text-sm sm:text-base text-[#7B6E66] max-w-xl mt-2">
              {currentLang === 'id'
                ? 'Panduan autentik untuk memaksimalkan liburan Anda di Canggu, Echo Beach, dan sekitarnya.'
                : 'Curated articles to help you discover the finest beaches, local warungs, and tranquil accommodations in Bali.'}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFECE6] rounded-lg border border-[#E5DFC5] self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#FAF8F5] text-[#2C221E] shadow-xs'
                    : 'text-[#7B6E66] hover:text-[#2C221E]'
                }`}
              >
                {currentLang === 'id' ? cat.labelId : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadPost(post)}
              className="group bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#E5DFC5] hover:border-[#B38F56]/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#EFECE6]">
                  <img
                    src={post.coverImage}
                    alt={currentLang === 'id' ? post.titleId : post.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                    {currentLang === 'id' ? post.categoryId : post.categoryEn}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-[#7B6E66] mb-2.5">
                    <span>{post.publishDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2C221E] group-hover:text-[#B38F56] transition-colors leading-snug mb-3">
                    {currentLang === 'id' ? post.titleId : post.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A4D45] line-clamp-3 leading-relaxed">
                    {currentLang === 'id' ? post.metaDescId : post.metaDescEn}
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-[#E5DFC5]/60 flex items-center justify-between text-xs font-semibold text-[#2C221E] group-hover:text-[#B38F56]">
                <span>{currentLang === 'id' ? 'Baca Selengkapnya' : 'Read Full Guide'}</span>
                <ChevronRight className="w-4 h-4 text-[#B38F56] group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
