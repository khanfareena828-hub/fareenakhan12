import React from 'react';
import { EDITORIAL_STORIES } from '../data/bakeryData';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const BakeryStory: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 sm:space-y-28">
      {/* Intro Subtitle */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100/70 border border-pink-200/80 text-[#B84D67] text-xs font-cute">
          <Heart className="w-3.5 h-3.5 fill-[#B84D67]" />
          <span>Our Heartfelt Craft</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-handwriting font-bold text-[#4A2F2A]">
          The Sweet Crumbs Story ♡
        </h2>
        <p className="text-sm sm:text-base text-[#75554F] font-body">
          Step into our bakery where every recipe is guided by a devotion to wholesome sweetness, playful aesthetics, and warm smiles.
        </p>
      </div>

      {/* Alternating Editorial Sections */}
      {EDITORIAL_STORIES.map((story, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div
            key={story.id}
            id={`story-section-${story.id}`}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
              isReversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Text Content */}
            <div
              className={`lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left ${
                isReversed ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-pink-200 text-[#B84D67] text-xs font-cute shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B84D67]" />
                <span>{story.badge}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-handwriting font-bold text-[#543834] leading-tight">
                {story.heading}
              </h3>

              <h4 className="text-base sm:text-lg font-cute text-[#B84D67] font-semibold">
                {story.subheading}
              </h4>

              <p className="text-sm sm:text-base text-[#6E4F49] font-body leading-relaxed max-w-xl mx-auto lg:mx-0">
                {story.text}
              </p>

              {/* Cute check bullet points */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-cute text-[#543834]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B84D67]" />
                  <span>Small Batch Bakes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B84D67]" />
                  <span>Finest Local & Imported Cocoa</span>
                </div>
              </div>

              {/* Accent Note Pill */}
              <div className="pt-2">
                <span className="inline-block bg-[#FFF0F4] border border-pink-200/80 px-4 py-2 rounded-2xl text-xs font-cute text-[#8C5847] shadow-xs">
                  {story.accent}
                </span>
              </div>
            </div>

            {/* Organic/Circular Pastel Image Frame */}
            <div
              className={`lg:col-span-6 flex items-center justify-center relative ${
                isReversed ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              {/* Background Blob */}
              <div
                className={`absolute w-72 sm:w-96 h-72 sm:h-96 ${story.shape} shadow-soft-pink opacity-80 -z-10 transition-transform duration-700 hover:scale-105`}
                style={{ backgroundColor: story.bgColor }}
              />

              {/* Image Container with organic border radius */}
              <div className="relative w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full sm:rounded-[40px] p-3 sm:p-4 bg-white shadow-card-hover border-4 border-white overflow-hidden group">
                <img
                  src={story.image}
                  alt={story.heading}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full sm:rounded-[32px] group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating cute stamp badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-200 shadow-soft-pink text-[11px] font-cute text-[#B84D67] flex items-center gap-1.5">
                  <span>♡</span>
                  <span>Baked with Love</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
