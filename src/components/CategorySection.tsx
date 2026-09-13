import React from 'react';
import { CATEGORIES } from '../data/bakeryData';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="menu" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer rounded cream/pink container */}
      <div className="bg-gradient-to-b from-[#FFF5F7] via-[#FFFDF9] to-[#FFF5F7] border border-pink-100 rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 lg:p-12 shadow-soft-pink relative overflow-hidden">
        {/* Soft background blob highlights */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-pink-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-pink-200/80 text-[#B84D67] text-xs font-cute shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B84D67]" />
            <span>Handmade With Heart</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-handwriting font-bold text-[#4A2F2A]">
            Explore By Sweet Category ♡
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#75554F] font-body">
            Browse our joyful bakery collections, made with rich creamy fillings, melt-in-mouth textures, and all-natural flavors.
          </p>
        </div>

        {/* Categories Grid (5 Categories matching prompt: Cakes, Cupcakes, Cookies, Pastries, Donuts) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                id={`cat-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`group text-left p-4 sm:p-5 rounded-3xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-[#FFA8BD] shadow-card-hover scale-105 ring-2 ring-[#FFBACD]/60'
                    : 'bg-white/80 hover:bg-white border-pink-100 hover:border-pink-200 shadow-xs hover:shadow-soft-pink hover:-translate-y-1.5'
                }`}
              >
                {/* Circular dessert image with cute pastel ring */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 bg-gradient-to-tr from-[#FFE4EC] to-[#FFF3E6] shadow-inner mb-3.5 transition-transform group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-xs">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Category Emoji Badge */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-pink-200 shadow-xs flex items-center justify-center text-base">
                    {cat.icon}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg sm:text-xl font-handwriting font-bold text-[#543834] group-hover:text-[#B84D67] transition-colors mb-1">
                  {cat.name}
                </h3>

                {/* Item count */}
                <span className="text-[11px] font-cute text-[#B84D67] font-semibold mb-1.5 bg-pink-50 px-2 py-0.5 rounded-full">
                  {cat.itemCount}
                </span>

                {/* Short description */}
                <p className="text-[11px] sm:text-xs text-[#8C5847] font-body line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* View All Treats pill button */}
        <div className="mt-8 text-center">
          <button
            id="cat-view-all"
            onClick={() => onSelectCategory('all')}
            className={`px-5 py-2 rounded-full text-xs font-cute transition-all inline-flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-[#B84D67] text-white shadow-soft-pink'
                : 'bg-white text-[#8C5847] hover:bg-pink-50 border border-pink-200'
            }`}
          >
            <span>✨ View All Menu Items</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
};
