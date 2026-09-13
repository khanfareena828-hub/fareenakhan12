import React, { useState } from 'react';
import { BAKERY_INFO } from '../data/bakeryData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Heart,
  Sparkles,
  Check,
  Copy,
  Navigation,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    // Simulate sending message with direct routing to bakery email
    setIsSent(true);

    // Also offer mailto trigger
    const mailtoUrl = `mailto:${BAKERY_INFO.email}?subject=${encodeURIComponent(
      `Website Message from ${name || 'Customer'} [Token: ${BAKERY_INFO.formAccessCode}]`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nForm Access ID: ${BAKERY_INFO.formAccessCode}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(BAKERY_INFO.formAccessCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-[#B84D67] text-xs font-cute shadow-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span>Visit & Say Hello</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-handwriting font-bold text-[#4A2F2A]">
          Find Our Bakery ♡
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#75554F] font-body">
          We’d love to welcome you to our cozy bakery in Aurangabad or bake something sweet for your upcoming celebration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Cols: Contact Info & Interactive Map Card */}
        <div className="lg:col-span-6 space-y-6">
          {/* Bakery Info Card */}
          <div className="bg-white rounded-[32px] border border-pink-100 p-6 sm:p-8 shadow-soft-pink space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-200 to-rose-100 flex items-center justify-center text-2xl shadow-xs">
                🧁
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-handwriting font-bold text-[#543834] leading-tight">
                  {BAKERY_INFO.name}
                </h3>
                <p className="text-xs font-cute text-[#B84D67]">{BAKERY_INFO.tagline}</p>
              </div>
            </div>

            <div className="space-y-3.5 pt-2 text-xs sm:text-sm font-cute text-[#6E4F49]">
              {/* Address */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-pink-50/50 border border-pink-100">
                <MapPin className="w-5 h-5 text-[#B84D67] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#543834] block">Bakery Location</span>
                  <span>{BAKERY_INFO.address}</span>
                </div>
              </div>

              {/* Phone */}
              <a
                href={`tel:${BAKERY_INFO.phone}`}
                id="contact-phone-link"
                className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50/50 border border-pink-100 hover:bg-pink-100/60 transition-colors group"
              >
                <Phone className="w-5 h-5 text-[#B84D67] shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-[#543834] block">Phone & WhatsApp</span>
                  <span className="text-[#B84D67] font-semibold">{BAKERY_INFO.phone}</span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BAKERY_INFO.email}`}
                id="contact-email-link"
                className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50/50 border border-pink-100 hover:bg-pink-100/60 transition-colors group"
              >
                <Mail className="w-5 h-5 text-[#B84D67] shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold text-[#543834] block">Direct Email</span>
                  <span className="text-[#B84D67] font-semibold">{BAKERY_INFO.email}</span>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50/50 border border-pink-100">
                <Clock className="w-5 h-5 text-[#B84D67] shrink-0" />
                <div>
                  <span className="font-bold text-[#543834] block">Baking Hours</span>
                  <span>{BAKERY_INFO.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Styled Map Card */}
          <div className="bg-gradient-to-b from-[#FFF5F8] to-[#FFF0F4] rounded-[32px] border-2 border-pink-200/90 p-5 shadow-soft-pink space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#B84D67]" />
                <h4 className="text-sm font-cute font-bold text-[#543834]">
                  Find Our Bakery ♡
                </h4>
              </div>
              <span className="text-[11px] font-cute text-[#B84D67] bg-white px-2.5 py-0.5 rounded-full border border-pink-200">
                TV Centre, Aurangabad
              </span>
            </div>

            {/* Simulated Custom Pastel Map Graphic with pin and directions */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-pink-200/70 bg-[#FDF0E6] flex items-center justify-center text-center p-4 group">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#B84D67_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Street road lines aesthetic */}
              <div className="absolute w-full h-6 bg-white/70 rotate-[-12deg] shadow-xs" />
              <div className="absolute w-6 h-full bg-white/70 rotate-[25deg] shadow-xs" />

              {/* Landmark Pin */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="w-12 h-12 rounded-full bg-[#B84D67] text-white flex items-center justify-center shadow-card-hover border-2 border-white text-xl">
                  🧁
                </div>
                <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-cute text-[#543834] font-bold border border-pink-200 shadow-soft-pink mt-1">
                  Sweet Crumbs Bakery
                </div>
              </div>

              {/* Open in Google Maps Link */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=TV+Centre+Aurangabad+Maharashtra"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#B84D67] text-xs font-cute font-bold px-3 py-1.5 rounded-full border border-pink-200 shadow-xs flex items-center gap-1 transition-transform hover:scale-105"
              >
                <span>Get Directions</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Send Sweet Note & Form Access Token Card */}
        <div className="lg:col-span-6 bg-white rounded-[32px] sm:rounded-[40px] border border-pink-100 p-6 sm:p-8 md:p-10 shadow-soft-pink space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-handwriting font-bold text-[#543834]">
              Send Us A Sweet Note ♡
            </h3>
            <p className="text-xs sm:text-sm text-[#75554F] font-body">
              Have a question, bulk catering request, or custom design inquiry? Send us a message and we'll reply right away.
            </p>
          </div>

          {/* Form Access Token Card as explicitly instructed */}
          <div className="p-3.5 rounded-2xl bg-[#FFF5F8] border border-pink-200/80 space-y-1 text-xs font-cute text-[#6E4F49]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#543834]">Form Access Link & Code</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-[11px] text-[#B84D67] hover:underline flex items-center gap-1"
              >
                {copiedCode ? (
                  <span className="text-emerald-600 flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Code
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-white px-2 py-1 rounded-lg border border-pink-200 text-[#B84D67] font-mono text-[11px] select-all flex-1 truncate">
                {BAKERY_INFO.formAccessCode}
              </code>
            </div>
            <p className="text-[10px] text-stone-500 pt-0.5">
              Responses are securely routed to: <strong className="text-[#B84D67]">{BAKERY_INFO.email}</strong>
            </p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Diya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                Your Email Address
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-cute text-[#6E4F49] mb-1 font-semibold">
                Message / Custom Inquiry
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us what you have in mind! (e.g. 2-tier wedding cake, party dessert table, custom flavors...)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/40 border border-pink-200/70 text-sm font-body text-[#543834] focus:outline-none focus:ring-2 focus:ring-[#B84D67]/40 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              id="send-message-btn"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF94AC] to-[#E56885] hover:from-[#f8859f] hover:to-[#d65775] text-white font-cute font-bold text-sm shadow-soft-pink hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to {BAKERY_INFO.email} ♡</span>
            </button>

            {isSent && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-cute text-center flex items-center justify-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your message has been prepared for dispatch ♡</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
