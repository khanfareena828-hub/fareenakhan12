import React from 'react';
import { BAKERY_INFO } from '../data/bakeryData';
import { Heart, Sparkles, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent via-[#FFF0F4] to-[#FFE8EE] border-t border-pink-100 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Story */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFD1DC] to-[#FFE8EE] flex items-center justify-center text-xl shadow-xs border border-pink-200">
                🧁
              </div>
              <div>
                <span className="font-handwriting text-2xl font-bold text-[#543834] leading-none block">
                  {BAKERY_INFO.name}
                </span>
                <span className="text-[10px] tracking-widest text-[#B84D67] uppercase font-bold font-cute">
                  Artisan Bakery & Cake Studio
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#75554F] font-body leading-relaxed max-w-sm">
              {BAKERY_INFO.tagline} Handcrafting delightful moments with silky buttercreams, fresh fruit compotes, and heartfelt recipes daily.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white text-[#B84D67] flex items-center justify-center border border-pink-200 hover:scale-110 transition-transform shadow-xs"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white text-[#B84D67] flex items-center justify-center border border-pink-200 hover:scale-110 transition-transform shadow-xs"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-cute text-[#8C5847]">
                @sweetcrumbsbakery.in
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-cute font-bold text-[#543834] uppercase tracking-wider">
              Explore Menu
            </h4>
            <ul className="space-y-2 text-xs font-cute text-[#6E4F49]">
              <li>
                <a href="#best-sellers" className="hover:text-[#B84D67] transition-colors">
                  🧁 Fresh Cupcakes
                </a>
              </li>
              <li>
                <a href="#best-sellers" className="hover:text-[#B84D67] transition-colors">
                  🎂 Celebration Cakes
                </a>
              </li>
              <li>
                <a href="#best-sellers" className="hover:text-[#B84D67] transition-colors">
                  🍪 Chewy Cookies
                </a>
              </li>
              <li>
                <a href="#best-sellers" className="hover:text-[#B84D67] transition-colors">
                  🍩 Glazed Donuts
                </a>
              </li>
              <li>
                <a href="#best-sellers" className="hover:text-[#B84D67] transition-colors">
                  🧇 Belgian Waffles
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Custom Atelier */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-cute font-bold text-[#543834] uppercase tracking-wider">
              Custom Atelier
            </h4>
            <ul className="space-y-2 text-xs font-cute text-[#6E4F49]">
              <li>
                <a href="#configurator" className="hover:text-[#B84D67] transition-colors">
                  ✨ Design Your Dream Cake
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#B84D67] transition-colors">
                  📸 Customer Creation Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#B84D67] transition-colors">
                  ♡ Our Baking Philosophy
                </a>
              </li>
              <li>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  100% Eggless Certified
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Visit & Direct Contact */}
          <div className="lg:col-span-3 space-y-3 text-xs font-cute text-[#6E4F49]">
            <h4 className="text-sm font-cute font-bold text-[#543834] uppercase tracking-wider">
              Bakery Visit
            </h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#B84D67] shrink-0 mt-0.5" />
              <span>{BAKERY_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#B84D67] shrink-0" />
              <a href={`tel:${BAKERY_INFO.phone}`} className="hover:underline">
                {BAKERY_INFO.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#B84D67] shrink-0" />
              <a href={`mailto:${BAKERY_INFO.email}`} className="hover:underline">
                {BAKERY_INFO.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar with Form Access Link & Copyright */}
        <div className="pt-8 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-cute text-[#8C5847]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {BAKERY_INFO.name}. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#B84D67] flex items-center gap-1">
              Baked with <Heart className="w-3 h-3 fill-[#B84D67]" /> for you
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] bg-white/80 px-3 py-1 rounded-full border border-pink-200">
            <span>Form Access Token:</span>
            <code className="font-mono text-[#B84D67] font-semibold">
              {BAKERY_INFO.formAccessCode}
            </code>
          </div>
        </div>
      </div>
    </footer>
  );
};
