import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/bakeryData';
import { Star, Plus, Check, ShoppingBag, Sparkles } from 'lucide-react';

interface BestSellersProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onAddToCart: (product: Product) => void;
  cartItemIds: Record<string, number>;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  cartItemIds,
}) => {
  // Filter products if a category is selected (unless 'all')
  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const filterTabs = [
    { id: 'all', label: 'All Treats ✨' },
    { id: 'cupcakes', label: 'Cupcakes 🧁' },
    { id: 'cakes', label: 'Cakes 🎂' },
    { id: 'cookies', label: 'Cookies 🍪' },
    { id: 'pastries', label: 'Pastries 🥐' },
    { id: 'donuts', label: 'Donuts 🍩' },
    { id: 'waffles', label: 'Waffles 🧇' },
  ];

  return (
    <section id="best-sellers" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-100/70 border border-rose-200 text-[#B84D67] text-xs font-cute shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Customer Favorites</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-handwriting font-bold text-[#4A2F2A]">
          Our Sweet Best Sellers ♡
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#75554F] font-body">
          Indulge in our most cherished creations. Handcrafted with rich creams, farm fresh butter, and delicate confection sugar.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              id={`filter-btn-${tab.id}`}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-cute transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#B84D67] text-white shadow-soft-pink scale-105'
                  : 'bg-white text-[#6E4F49] hover:bg-pink-50 border border-pink-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          const inCartCount = cartItemIds[product.id] || 0;

          return (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="group bg-white rounded-3xl border border-pink-100/80 p-5 shadow-soft-pink hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:rotate-[0.5deg] relative overflow-hidden"
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-pink-100/80 text-[#B84D67] font-cute">
                  {product.badge || product.tag}
                </span>

                {/* Rating */}
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 text-xs font-cute text-amber-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-[10px] text-amber-600">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Realistic Dessert Image Container with gentle hover zoom */}
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#FFF0F4] to-[#FFF8F0] p-3 mb-4 group-hover:bg-[#FFE8EE] transition-colors flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500 shadow-xs"
                />

                {/* Calorie Pill if available */}
                {product.calories && (
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-cute text-[#8C5847] border border-pink-100">
                    {product.calories}
                  </div>
                )}
              </div>

              {/* Name & Details */}
              <div className="space-y-1.5 flex-1">
                <h3 className="text-xl sm:text-2xl font-handwriting font-bold text-[#543834] group-hover:text-[#B84D67] transition-colors leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-[#75554F] font-body line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-4 mt-4 border-t border-pink-100/80 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#8C5847] font-cute block uppercase">Price</span>
                  <span className="text-xl sm:text-2xl font-cute font-bold text-[#B84D67]">
                    ₹{product.price}
                  </span>
                </div>

                <button
                  id={`add-to-cart-${product.id}`}
                  onClick={() => onAddToCart(product)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-cute font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    inCartCount > 0
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-[#B84D67] text-white hover:bg-[#a23d55] shadow-soft-pink hover:scale-105 active:scale-95'
                  }`}
                >
                  {inCartCount > 0 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Added ({inCartCount})</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
