import React from 'react';
import { REVIEWS } from '../data/bakeryData';
import { Star, Heart, MessageSquareHeart, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-[#B84D67] text-xs font-cute shadow-xs">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Warm Words</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-handwriting font-bold text-[#4A2F2A]">
          Loved By Our Sweet Family ♡
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#75554F] font-body">
          Nothing warms our hearts more than seeing our desserts brighten your birthdays, anniversaries, and everyday tea breaks.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            id={`review-card-${rev.id}`}
            className="bg-white rounded-[28px] border border-pink-100 p-6 shadow-soft-pink hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden"
          >
            {/* Top Stars & Heart */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-stone-400 font-cute">{rev.date}</span>
            </div>

            {/* Comment */}
            <p className="text-xs sm:text-sm text-[#543834] font-body leading-relaxed mb-4 flex-1 italic">
              "{rev.comment}"
            </p>

            {/* Favorite Item Pill */}
            <div className="mb-4">
              <span className="text-[11px] font-cute text-[#B84D67] bg-pink-50 px-2.5 py-1 rounded-full inline-block border border-pink-100">
                Ordered: {rev.favoriteItem}
              </span>
            </div>

            {/* Author Profile */}
            <div className="pt-3 border-t border-pink-50 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-handwriting text-lg font-bold text-[#543834] border-2 border-white shadow-xs"
                style={{ backgroundColor: rev.avatarBg }}
              >
                {rev.name.charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-cute font-bold text-[#543834] flex items-center gap-1">
                  {rev.name}
                  <CheckCircle2 className="w-3 h-3 text-pink-400" />
                </span>
                <span className="text-[10px] text-[#8C5847] font-body">{rev.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
