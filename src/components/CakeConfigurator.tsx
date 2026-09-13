import React, { useState, useMemo } from 'react';
import { CakeConfig } from '../types';
import { BAKERY_INFO } from '../data/bakeryData';
import {
  Cake,
  Sparkles,
  Heart,
  Calendar,
  Phone,
  Mail,
  User,
  Check,
  Copy,
  ExternalLink,
  Info,
} from 'lucide-react';

interface CakeConfiguratorProps {
  onPlaceCustomOrder: (config: CakeConfig, totalPrice: number) => void;
}

export const CakeConfigurator: React.FC<CakeConfiguratorProps> = ({
  onPlaceCustomOrder,
}) => {
  const [config, setConfig] = useState<CakeConfig>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    cakeType: 'Minimalist Vintage Cake',
    size: '1 kg',
    flavor: 'Belgian Chocolate',
    filling: 'Nutella Ganache',
    frosting: 'Vanilla Silk Buttercream',
    themeColor: 'Pastel Pink & Pearls',
    isEggless: true,
    cakeMessage: 'Happy Birthday Sunshine! ♡',
    quantity: 1,
    deliveryDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    specialInstructions: '',
    hasSprinkles: true,
    hasCandles: true,
    hasEdibleFlowers: false,
  });

  const [copiedToken, setCopiedToken] = useState(false);

  // Price calculations
  const priceBreakdown = useMemo(() => {
    let base = 899;
    if (config.size === '0.5 kg') base = 499;
    if (config.size === '1 kg') base = 899;
    if (config.size === '1.5 kg') base = 1299;
    if (config.size === '2 kg') base = 1699;

    let flavorExtra = 0;
    if (config.flavor.includes('Belgian Chocolate')) flavorExtra = 80;
    if (config.flavor.includes('Red Velvet')) flavorExtra = 70;
    if (config.flavor.includes('Mango')) flavorExtra = 60;

    let fillingExtra = 0;
    if (config.filling.includes('Nutella')) fillingExtra = 60;
    if (config.filling.includes('Berry')) fillingExtra = 50;
    if (config.filling.includes('Caramel')) fillingExtra = 40;

    let addonsTotal = 0;
    if (config.hasSprinkles) addonsTotal += 30;
    if (config.hasCandles) addonsTotal += 40;
    if (config.hasEdibleFlowers) addonsTotal += 90;

    const singleItemTotal = base + flavorExtra + fillingExtra + addonsTotal;
    const grandTotal = singleItemTotal * (config.quantity || 1);

    return {
      base,
      flavorExtra,
      fillingExtra,
      addonsTotal,
      grandTotal,
    };
  }, [config]);

  const cakeTypes = [
    'Minimalist Vintage Cake',
    'Tiered Floral Birthday Cake',
    'Korean Bento Box Cake',
    'Classic Chocolate Fudge Cake',
    'Heart Shaped Lambeth Cake',
  ];

  const sizes: ('0.5 kg' | '1 kg' | '1.5 kg' | '2 kg')[] = [
    '0.5 kg',
    '1 kg',
    '1.5 kg',
    '2 kg',
  ];

  const flavors = [
    'Belgian Chocolate',
    'Pure Madagascar Vanilla',
    'Fresh Strawberry Cream',
    'Royal Red Velvet',
    'Butterscotch Crunch',
    'Mango Passionfruit',
  ];

  const fillings = [
    'Nutella Ganache',
    'Fresh Berry Compote',
    'Salted Caramel Drizzle',
    'Bavarian Vanilla Cream',
    'Whipped Cream Cheese',
  ];

  const frostings = [
    'Vanilla Silk Buttercream',
    'Whipped Chantilly Cream',
    'Chocolate Ganache Frosting',
    'Strawberry Buttercream',
    'Cream Cheese Frosting',
  ];

  const themeColors = [
    { name: 'Pastel Pink & Pearls', hex: '#FFD1DC', border: '#F48FB1' },
    { name: 'Baby Blue Dream', hex: '#D0E8FF', border: '#90CAF9' },
    { name: 'Warm Cream & Gold', hex: '#FFF3D6', border: '#FFE082' },
    { name: 'Lilac Lavender Blossom', hex: '#EBD8F7', border: '#CE93D8' },
    { name: 'Peachy Sunrise', hex: '#FFE3D8', border: '#FFAB91' },
  ];

  const handleCopyFormAccess = () => {
    navigator.clipboard.writeText(BAKERY_INFO.formAccessCode);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.customerName || !config.customerPhone) {
      alert('Please enter your full name and phone number to place order ♡');
      return;
    }
    onPlaceCustomOrder(config, priceBreakdown.grandTotal);
  };

  const currentTheme =
    themeColors.find((t) => t.name === config.themeColor) || themeColors[0];

  return (
    <section id="configurator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-[#B84D67] text-xs font-cute shadow-xs">
          <Cake className="w-3.5 h-3.5 text-[#B84D67]" />
          <span>Interactive Custom Atelier</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-handwriting font-bold text-[#4A2F2A]">
          Design Your Dream Cake ♡
        </h2>
        <p className="text-sm sm:text-base text-[#75554F] font-body">
          Customize every layer, size, filling, and aesthetic theme. Our master bakers handcraft your dream cake to perfection.
        </p>

        {/* Form Access Link Notice */}
        <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 bg-white/90 border border-pink-200/90 px-3.5 py-1.5 rounded-2xl shadow-xs text-xs font-cute text-[#8C5847]">
          <span>Direct Form Access ID:</span>
          <code className="font-mono bg-pink-50 text-[#B84D67] px-2 py-0.5 rounded-lg border border-pink-100 font-semibold select-all">
            {BAKERY_INFO.formAccessCode}
          </code>
          <button
            type="button"
            onClick={handleCopyFormAccess}
            className="p-1 text-[#B84D67] hover:text-[#8C5847] transition-colors"
            title="Copy Form Access Token"
          >
            {copiedToken ? (
              <span className="text-emerald-600 flex items-center gap-0.5 text-[11px]">
                <Check className="w-3 h-3" /> Copied!
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <span className="text-stone-300">|</span>
          <span className="text-[11px] text-[#B84D67]">
            Responses routed to: {BAKERY_INFO.email}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left 7 Cols: Order Configuration Form */}
        <form
          onSubmit={handleSubmitOrder}
          className="lg:col-span-7 bg-white rounded-[32px] sm:rounded-[40px] border border-pink-100/90 p-6 sm:p-8 md:p-10 shadow-soft-pink space-y-8"
        >
          {/* Customer Details Block */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-handwriting font-bold text-[#543834] flex items-center gap-2 border-b border-pink-100 pb-2">
              <User className="w-5 h-5 text-[#B84D67]" />
              <span>Customer Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fareena Khan"
                    value={config.customerName}
                    onChange={(e) => setConfig({ ...config, customerName: e.target.value })}
                    className="w-full pl-3.5 pr-3.5 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7558239803"
                    value={config.customerPhone}
                    onChange={(e) => setConfig({ ...config, customerPhone: e.target.value })}
                    className="w-full pl-3.5 pr-3.5 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Email Address (for order receipt & updates)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="khanfareena828@gmail.com"
                    value={config.customerEmail}
                    onChange={(e) => setConfig({ ...config, customerEmail: e.target.value })}
                    className="w-full pl-3.5 pr-3.5 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cake Details Block */}
          <div className="space-y-5 pt-2">
            <h3 className="text-xl sm:text-2xl font-handwriting font-bold text-[#543834] flex items-center gap-2 border-b border-pink-100 pb-2">
              <Cake className="w-5 h-5 text-[#B84D67]" />
              <span>Cake Details & Customization</span>
            </h3>

            {/* Cake Type */}
            <div>
              <label className="block text-xs font-cute text-[#6E4F49] mb-2 font-semibold">
                Cake Style & Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cakeTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setConfig({ ...config, cakeType: type })}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-cute text-left border transition-all cursor-pointer ${
                      config.cakeType === type
                        ? 'bg-pink-100/90 border-[#B84D67] text-[#B84D67] font-bold shadow-xs'
                        : 'bg-white border-pink-100 text-[#6E4F49] hover:bg-pink-50/50'
                    }`}
                  >
                    🎂 {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Cake Size */}
            <div>
              <label className="block text-xs font-cute text-[#6E4F49] mb-2 font-semibold">
                Cake Size (Servings)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sizes.map((sz) => {
                  const isSelected = config.size === sz;
                  const priceLabel =
                    sz === '0.5 kg'
                      ? '₹499 (4-6 Servings)'
                      : sz === '1 kg'
                      ? '₹899 (8-12 Servings)'
                      : sz === '1.5 kg'
                      ? '₹1,299 (14-18 Servings)'
                      : '₹1,699 (20-25 Servings)';

                  return (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setConfig({ ...config, size: sz })}
                      className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#B84D67] text-white border-[#B84D67] shadow-soft-pink scale-105 font-bold'
                          : 'bg-pink-50/40 text-[#6E4F49] border-pink-200/60 hover:bg-pink-100/50'
                      }`}
                    >
                      <div className="text-sm font-cute">{sz}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{priceLabel}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Flavor & Filling Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Cake Sponge Flavor
                </label>
                <select
                  value={config.flavor}
                  onChange={(e) => setConfig({ ...config, flavor: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-xs sm:text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40"
                >
                  {flavors.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Filling Layer
                </label>
                <select
                  value={config.filling}
                  onChange={(e) => setConfig({ ...config, filling: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-xs sm:text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40"
                >
                  {fillings.map((fil) => (
                    <option key={fil} value={fil}>
                      {fil}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Frosting & Theme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Frosting Style
                </label>
                <select
                  value={config.frosting}
                  onChange={(e) => setConfig({ ...config, frosting: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-xs sm:text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40"
                >
                  {frostings.map((fr) => (
                    <option key={fr} value={fr}>
                      {fr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Theme Palette
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {themeColors.map((theme) => (
                    <button
                      type="button"
                      key={theme.name}
                      onClick={() => setConfig({ ...config, themeColor: theme.name })}
                      title={theme.name}
                      className={`w-7 h-7 rounded-full transition-transform border-2 ${
                        config.themeColor === theme.name
                          ? 'scale-125 border-[#B84D67] shadow-sm ring-2 ring-pink-200'
                          : 'border-white opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: theme.hex }}
                    />
                  ))}
                  <span className="text-[11px] font-cute text-[#8C5847] ml-1 truncate">
                    {config.themeColor.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Eggless Option (Toggle Button) */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block border-2 border-white shadow-xs"></span>
                <span className="text-xs font-cute font-bold text-emerald-900">
                  100% Eggless Preparation?
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfig({ ...config, isEggless: true })}
                  className={`px-3 py-1 rounded-full text-xs font-cute font-semibold transition-all ${
                    config.isEggless
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-emerald-800'
                  }`}
                >
                  Yes, Eggless ♡
                </button>
                <button
                  type="button"
                  onClick={() => setConfig({ ...config, isEggless: false })}
                  className={`px-3 py-1 rounded-full text-xs font-cute transition-all ${
                    !config.isEggless
                      ? 'bg-[#8C5847] text-white shadow-xs'
                      : 'bg-white text-[#8C5847]'
                  }`}
                >
                  Regular
                </button>
              </div>
            </div>

            {/* Custom Cake Message */}
            <div>
              <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                Message to Pipe on Cake (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Happy 21st Birthday Diya! ♡"
                maxLength={45}
                value={config.cakeMessage}
                onChange={(e) => setConfig({ ...config, cakeMessage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40"
              />
            </div>

            {/* Quantity and Delivery/Pickup Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setConfig({ ...config, quantity: Math.max(1, config.quantity - 1) })
                    }
                    className="w-9 h-9 rounded-full bg-pink-100 text-[#B84D67] font-bold flex items-center justify-center hover:bg-pink-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-base font-bold font-cute text-[#543834]">
                    {config.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, quantity: config.quantity + 1 })}
                    className="w-9 h-9 rounded-full bg-pink-100 text-[#B84D67] font-bold flex items-center justify-center hover:bg-pink-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                  Delivery / Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  value={config.deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setConfig({ ...config, deliveryDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-xs sm:text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40"
                />
              </div>
            </div>

            {/* Add-ons Checkboxes */}
            <div>
              <label className="block text-xs font-cute text-[#6E4F49] mb-2 font-semibold">
                Delightful Add-ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-cute">
                <label className="flex items-center gap-2 p-2.5 rounded-2xl border border-pink-100 bg-pink-50/30 cursor-pointer hover:bg-pink-50">
                  <input
                    type="checkbox"
                    checked={config.hasSprinkles}
                    onChange={(e) => setConfig({ ...config, hasSprinkles: e.target.checked })}
                    className="rounded text-[#B84D67] focus:ring-[#B84D67]"
                  />
                  <span>Rainbow Sprinkles (+₹30)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-2xl border border-pink-100 bg-pink-50/30 cursor-pointer hover:bg-pink-50">
                  <input
                    type="checkbox"
                    checked={config.hasCandles}
                    onChange={(e) => setConfig({ ...config, hasCandles: e.target.checked })}
                    className="rounded text-[#B84D67] focus:ring-[#B84D67]"
                  />
                  <span>Golden Candles (+₹40)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-2xl border border-pink-100 bg-pink-50/30 cursor-pointer hover:bg-pink-50">
                  <input
                    type="checkbox"
                    checked={config.hasEdibleFlowers}
                    onChange={(e) =>
                      setConfig({ ...config, hasEdibleFlowers: e.target.checked })
                    }
                    className="rounded text-[#B84D67] focus:ring-[#B84D67]"
                  />
                  <span>Edible Flowers (+₹90)</span>
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                Special Instructions / Dietary Preferences
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Less sugar, add pastel ribbons, call before delivery at TV Centre..."
                value={config.specialInstructions}
                onChange={(e) => setConfig({ ...config, specialInstructions: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-xs sm:text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40"
              />
            </div>
          </div>

          {/* Place My Order Button */}
          <button
            type="submit"
            id="place-custom-order-btn"
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF94AC] to-[#E56885] hover:from-[#f8859f] hover:to-[#d65775] text-white text-base sm:text-lg font-cute font-bold shadow-soft-pink hover:shadow-card-hover transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 fill-white/90" />
            <span>Place My Order ♡ (₹{priceBreakdown.grandTotal})</span>
          </button>
        </form>

        {/* Right 5 Cols: "Your Sweet Creation ♡" Live Preview Card */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-gradient-to-b from-[#FFF0F4] via-white to-[#FFF5F8] rounded-[36px] border-2 border-pink-200/80 p-6 sm:p-8 shadow-card-hover text-center space-y-5 relative overflow-hidden">
            {/* Top decorative ribbon */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-pink-200 shadow-xs text-xs font-cute text-[#B84D67]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Order Summary</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-handwriting font-bold text-[#543834]">
              Your Sweet Creation ♡
            </h3>

            {/* Visual Cake Simulation Representation */}
            <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center">
              {/* Stand */}
              <div className="absolute bottom-2 w-40 h-4 rounded-full bg-pink-200/70 shadow-xs" />

              {/* Tier 1 Cake Cylinder Representation */}
              <div
                className="w-32 h-20 rounded-2xl border-4 border-white shadow-soft-pink transition-all duration-500 relative flex items-center justify-center"
                style={{ backgroundColor: currentTheme.hex }}
              >
                {/* Frosting drips */}
                <div className="absolute -top-3 w-36 h-6 rounded-full bg-white/90 shadow-xs flex items-center justify-around px-2">
                  <span className="text-[9px]">✨</span>
                  <span className="text-[9px]">🍓</span>
                  <span className="text-[9px]">✨</span>
                </div>

                {/* Cake text message piped */}
                {config.cakeMessage && (
                  <span className="text-[9px] font-handwriting font-bold text-[#8C5847] px-2 text-center truncate">
                    "{config.cakeMessage}"
                  </span>
                )}
              </div>
            </div>

            {/* Parameter List matching prompt specifications */}
            <div className="bg-white/90 rounded-2xl p-4 border border-pink-100 text-left space-y-2 text-xs sm:text-sm font-cute text-[#543834] shadow-xs">
              <div className="flex justify-between border-b border-pink-50 pb-1.5">
                <span className="text-[#8C5847]">Cake:</span>
                <span className="font-bold text-right truncate max-w-[200px]">
                  {config.cakeType}
                </span>
              </div>
              <div className="flex justify-between border-b border-pink-50 pb-1.5">
                <span className="text-[#8C5847]">Size:</span>
                <span className="font-bold">{config.size}</span>
              </div>
              <div className="flex justify-between border-b border-pink-50 pb-1.5">
                <span className="text-[#8C5847]">Flavor:</span>
                <span className="font-bold">{config.flavor}</span>
              </div>
              <div className="flex justify-between border-b border-pink-50 pb-1.5">
                <span className="text-[#8C5847]">Frosting:</span>
                <span className="font-bold truncate max-w-[180px]">{config.frosting}</span>
              </div>
              <div className="flex justify-between border-b border-pink-50 pb-1.5">
                <span className="text-[#8C5847]">Add-ons:</span>
                <span className="font-bold">
                  {[
                    config.hasSprinkles ? 'Sprinkles' : null,
                    config.hasCandles ? 'Candles' : null,
                    config.hasEdibleFlowers ? 'Flowers' : null,
                  ]
                    .filter(Boolean)
                    .join(', ') || 'Standard Decor'}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#8C5847]">Preparation:</span>
                <span className="font-bold text-emerald-700">
                  {config.isEggless ? '100% Eggless' : 'Regular Sponge'}
                </span>
              </div>
            </div>

            {/* Estimated Total Price */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C5847] font-cute block">Estimated Total</span>
                <span className="text-[10px] text-stone-500">Includes artisan craft & packaging</span>
              </div>
              <div className="text-3xl font-cute font-bold text-[#B84D67]">
                ₹{priceBreakdown.grandTotal}
              </div>
            </div>

            {/* Reassurance note */}
            <p className="text-[11px] text-[#8C5847] font-body">
              ♡ Freshly baked on delivery morning. Baked with love at our TV Centre bakery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
