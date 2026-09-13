import React from 'react';
import { Heart, Sparkles, ArrowRight, Star, Cake, Award } from 'lucide-react';
import { ThreeCupcakeCanvas } from './ThreeCupcakeCanvas';
import { BAKERY_INFO } from '../data/bakeryData';

interface HeroSectionProps {
  onExploreTreats: () => void;
  onOpenConfigurator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTreats,
  onOpenConfigurator,
}) => {
  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-12 sm:pb-20 overflow-hidden">
      {/* Pastel background organic gradient shapes */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-pink-200/50 via-rose-100/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-amber-100/50 via-pink-100/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Floating background decorative sprinkle emojis */}
      <div className="absolute top-16 left-10 text-xl animate-float-slow opacity-60 pointer-events-none select-none">
        🧁
      </div>
      <div className="absolute top-32 right-12 text-2xl animate-float-reverse opacity-70 pointer-events-none select-none">
        ✨
      </div>
      <div className="absolute bottom-20 left-1/4 text-lg animate-sparkle opacity-50 pointer-events-none select-none">
        ♡
      </div>
      <div className="absolute top-1/2 right-1/4 text-xl animate-float-slow opacity-60 pointer-events-none select-none">
        🍓
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Story CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE8EE] border border-[#FFB6C1]/60 text-[#B84D67] text-xs sm:text-sm font-cute shadow-xs">
              <Sparkles className="w-4 h-4 text-[#B84D67] animate-sparkle" />
              <span>{BAKERY_INFO.tagline}</span>
            </div>

            {/* Large Handwritten Heading */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-handwriting font-bold text-[#4A2F2A] leading-[1.05] tracking-tight">
                Freshly Baked <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D85A79] via-[#E87391] to-[#F28B82] inline-flex items-center gap-2">
                  Happiness!
                  <span className="text-4xl sm:text-5xl animate-bounce">♡</span>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#75554F] max-w-lg mx-auto lg:mx-0 font-body leading-relaxed">
              Sweet little treats made with love, just for you. Handcrafted artisan cakes, fluffy whipped cupcakes, and melt-in-the-mouth cookies baked fresh every single morning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-explore-cta"
                onClick={onExploreTreats}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF94AC] to-[#E56885] hover:from-[#f8859f] hover:to-[#d65775] text-white font-cute font-medium text-sm sm:text-base shadow-soft-pink hover:shadow-card-hover transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Our Treats</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-custom-cake-cta"
                onClick={onOpenConfigurator}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-pink-50/90 text-[#8C5847] border-2 border-pink-200/90 font-cute font-medium text-sm sm:text-base shadow-xs hover:shadow-soft-pink transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Cake className="w-4 h-4 text-[#B84D67]" />
                <span>Design Dream Cake ♡</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 border-t border-pink-100/90 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#8C5847] font-cute">
              <div className="flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-full border border-pink-100 shadow-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-[#543834]">4.9 / 5.0</span>
                <span className="text-[#8C5847]">(2,500+ happy foodies)</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-pink-100 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                <span>100% Pure Butter & Eggless Options</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Cupcake with Pink Plate & Sprinkles */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Background circular pastel aura */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#FFE4E9] to-[#FFF1DE] -z-10 shadow-soft-pink border border-white" />

            {/* 3D WebGL Cupcake Canvas */}
            <div className="w-full">
              <ThreeCupcakeCanvas flavorColor="#FFADC0" interactiveControls={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
