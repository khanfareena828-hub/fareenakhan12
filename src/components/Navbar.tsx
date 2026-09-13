import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Heart, Sparkles, Cake } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCakeConfigurator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenCakeConfigurator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Cakes', href: '#cakes' },
    { label: 'Cupcakes', href: '#cupcakes' },
    { label: 'Cookies', href: '#cookies' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto">
      <nav className="bg-white/90 backdrop-blur-md border border-pink-100/90 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-soft-pink flex items-center justify-between transition-all">
        {/* Bakery Logo */}
        <a
          href="#hero"
          id="nav-logo"
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFD1DC] to-[#FFE8EE] flex items-center justify-center shadow-xs border border-pink-200 group-hover:scale-105 transition-transform">
            <span className="text-xl select-none">🧁</span>
          </div>
          <div className="flex flex-col">
            <span className="font-handwriting text-2xl sm:text-[26px] font-bold text-[#543834] leading-none group-hover:text-[#B84D67] transition-colors">
              Sweet Crumbs
            </span>
            <span className="text-[10px] tracking-widest text-[#B84D67] uppercase font-bold font-cute">
              Artisan Bakery
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className="px-3 py-1.5 rounded-full text-xs font-cute text-[#6E4F49] hover:text-[#B84D67] hover:bg-pink-50/80 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Custom Cake Configurator Trigger */}
          <button
            id="nav-custom-cake"
            onClick={onOpenCakeConfigurator}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-cute bg-gradient-to-r from-amber-50 to-pink-50 text-[#8C5847] border border-amber-200/70 hover:border-pink-300 hover:bg-pink-100/50 transition-all shadow-xs"
            title="Design Your Dream Cake"
          >
            <Cake className="w-3.5 h-3.5 text-[#B84D67]" />
            <span>Design Cake</span>
          </button>

          {/* Cart Icon & Badge */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
            className="relative p-2.5 rounded-full bg-pink-50/80 hover:bg-pink-100/90 text-[#8C5847] hover:text-[#B84D67] transition-all border border-pink-200/60 shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B84D67] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Pink Rounded Order Now Button */}
          <a
            href="#configurator"
            id="nav-order-now-btn"
            className="hidden md:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FF98B0] to-[#E87391] hover:from-[#f0859f] hover:to-[#da6180] text-white text-xs sm:text-sm font-cute font-medium shadow-soft-pink hover:shadow-card-hover transition-all hover:scale-105 active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-white/80" />
            <span>Order Now</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#6E4F49] hover:bg-pink-50 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl border border-pink-100 rounded-3xl p-4 shadow-soft-pink flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-2xl text-xs font-cute text-[#6E4F49] hover:bg-pink-50 hover:text-[#B84D67] transition-colors text-center"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-pink-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCakeConfigurator();
              }}
              className="w-full py-2.5 rounded-full bg-pink-50 text-[#8C5847] text-xs font-cute flex items-center justify-center gap-2 border border-pink-200"
            >
              <Cake className="w-4 h-4 text-[#B84D67]" />
              Design Your Dream Cake ♡
            </button>

            <a
              href="#configurator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-[#B84D67] text-white text-xs font-cute text-center shadow-soft-pink font-semibold"
            >
              Order Now ♡
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
