import React, { useState } from 'react';
import { Gift, Sparkles, Copy, Check, ArrowRight, Heart } from 'lucide-react';

interface SpecialOfferProps {
  onOrderNow: () => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ onOrderNow }) => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'SWEETFIRST20';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative bg-gradient-to-r from-[#FFE5EC] via-[#FFF3F6] to-[#FFE8E0] rounded-[36px] sm:rounded-[48px] border-2 border-pink-200/90 p-8 sm:p-12 lg:p-14 shadow-card-hover overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-300/30 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text & Coupon Details */}
          <div className="lg:col-span-8 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-pink-200 shadow-xs text-xs font-cute text-[#B84D67]">
              <Gift className="w-4 h-4 text-[#B84D67]" />
              <span>Special Sweet Welcome</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-handwriting font-bold text-[#4A2F2A] leading-tight">
              A Little Extra Sweetness! ♡
            </h2>

            <p className="text-base sm:text-lg text-[#75554F] font-body max-w-xl mx-auto lg:mx-0">
              Get <span className="font-bold text-[#B84D67]">20% OFF</span> on your first custom cake order. Celebrate your precious moments with personalized artisanal delight.
            </p>

            {/* Promo Code Pill & Copy Button */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border-2 border-dashed border-[#B84D67]/70 shadow-xs">
                <span className="text-xs text-[#8C5847] font-cute">Use Code:</span>
                <span className="font-mono font-bold text-sm sm:text-base text-[#B84D67] tracking-wider">
                  {promoCode}
                </span>
                <button
                  type="button"
                  id="copy-promo-code"
                  onClick={handleCopy}
                  className="p-1 text-[#8C5847] hover:text-[#B84D67] transition-colors ml-1"
                  title="Copy Promo Code"
                >
                  {copied ? (
                    <span className="text-emerald-600 flex items-center text-xs font-cute gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Order Now Button */}
              <button
                id="special-offer-order-btn"
                onClick={onOrderNow}
                className="px-6 py-3 rounded-full bg-[#B84D67] hover:bg-[#a23d55] text-white font-cute font-bold text-sm sm:text-base shadow-soft-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Cute Animated Dessert Mascot */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative group">
              {/* Pulsing Aura */}
              <div className="absolute inset-0 rounded-full bg-pink-300/40 blur-xl animate-pulse" />

              {/* Animated Dessert Card */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white p-3 shadow-card-hover border-4 border-white flex flex-col items-center justify-center text-center animate-float-slow">
                <div className="text-6xl sm:text-7xl select-none animate-bounce">
                  🎂
                </div>
                <div className="mt-1">
                  <span className="text-sm font-handwriting font-bold text-[#543834] block">
                    Custom Dream Cakes
                  </span>
                  <span className="text-[11px] font-cute text-[#B84D67]">
                    Handmade fresh daily ♡
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
