import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/bakeryData';
import { GalleryItem } from '../types';
import { Heart, Camera, Sparkles, X, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-[#B84D67] text-xs font-cute shadow-xs">
          <Camera className="w-3.5 h-3.5" />
          <span>Sweet Snapshots</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-handwriting font-bold text-[#4A2F2A]">
          Our Sweet Creation Gallery ♡
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#75554F] font-body">
          A glimpse into the artisan creations baked in our TV Centre kitchen. Every design is crafted with passion and sweet attention to detail.
        </p>
      </div>

      {/* Pinterest-Style Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {GALLERY_ITEMS.map((item) => {
          const currentLikes = item.likes + (likes[item.id] || 0);

          return (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setActiveItem(item)}
              className="break-inside-avoid group relative rounded-[28px] overflow-hidden bg-white border border-pink-100/90 shadow-soft-pink hover:shadow-card-hover transition-all duration-500 cursor-pointer hover:-translate-y-1.5"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                  item.aspect === 'tall'
                    ? 'h-80 sm:h-96'
                    : item.aspect === 'wide'
                    ? 'h-48 sm:h-60'
                    : 'h-64 sm:h-72'
                }`}
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#543834]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                <span className="text-[11px] font-cute uppercase tracking-wider text-pink-200 font-semibold">
                  {item.category}
                </span>
                <h3 className="text-lg sm:text-xl font-handwriting font-bold drop-shadow-sm">
                  {item.title}
                </h3>
              </div>

              {/* Floating like pill button */}
              <button
                type="button"
                onClick={(e) => handleLike(e, item.id)}
                className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-100 shadow-xs flex items-center gap-1.5 text-xs font-cute text-[#B84D67] hover:scale-110 active:scale-90 transition-transform"
              >
                <Heart className="w-3.5 h-3.5 fill-[#B84D67]" />
                <span>{currentLikes}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#543834]/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-[32px] p-4 sm:p-6 shadow-card-hover border-2 border-pink-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-pink-50 text-[#8C5847] hover:bg-pink-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden mb-4 bg-pink-50">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-handwriting font-bold text-[#543834]">
              {activeItem.title}
            </h3>
            <p className="text-xs font-cute text-[#B84D67] mt-0.5">{activeItem.category} • Sweet Crumbs Bakery</p>
          </div>
        </div>
      )}
    </section>
  );
};
