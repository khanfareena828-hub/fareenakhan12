import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Check, ArrowRight, X, Mail, Phone, Calendar } from 'lucide-react';
import { CakeConfig } from '../types';
import { BAKERY_INFO } from '../data/bakeryData';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  orderConfig: CakeConfig | null;
  totalPrice: number;
  onClose: () => void;
  onEditOrder: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  orderConfig,
  totalPrice,
  onClose,
  onEditOrder,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsConfirmed(false);
      // Generate a cute random order ID
      const randomId = 'SCB-' + Math.floor(1000 + Math.random() * 9000);
      setOrderNumber(randomId);

      // Trigger soft kawaii pastel confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFB6C1', '#FFD1DC', '#FFE4E1', '#FFF0F5', '#E6E6FA'],
      });
    }
  }, [isOpen]);

  if (!isOpen || !orderConfig) return null;

  const handleFinalConfirm = () => {
    setIsConfirmed(true);
    // Big confetti celebration!
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FF69B4', '#FFB6C1', '#FFD700', '#FF85A2', '#FFA07A'],
    });

    // Also trigger mailto in background or provide direct email button
    const emailSubject = encodeURIComponent(`New Sweet Crumbs Order #${orderNumber} [${BAKERY_INFO.formAccessCode}]`);
    const emailBody = encodeURIComponent(
      `Sweet Crumbs Bakery Order Details:\n` +
      `Order ID: #${orderNumber}\n` +
      `Form Access ID: ${BAKERY_INFO.formAccessCode}\n\n` +
      `Customer Name: ${orderConfig.customerName}\n` +
      `Mobile: ${orderConfig.customerPhone}\n` +
      `Email: ${orderConfig.customerEmail || 'Not provided'}\n\n` +
      `Cake Style: ${orderConfig.cakeType}\n` +
      `Size: ${orderConfig.size}\n` +
      `Flavor: ${orderConfig.flavor}\n` +
      `Filling: ${orderConfig.filling}\n` +
      `Frosting: ${orderConfig.frosting}\n` +
      `Theme: ${orderConfig.themeColor}\n` +
      `Eggless: ${orderConfig.isEggless ? 'Yes' : 'No'}\n` +
      `Message: "${orderConfig.cakeMessage}"\n` +
      `Delivery Date: ${orderConfig.deliveryDate}\n` +
      `Estimated Total: ₹${totalPrice}\n\n` +
      `Special Instructions: ${orderConfig.specialInstructions || 'None'}\n`
    );

    // Save to localStorage order history
    try {
      const existing = JSON.parse(localStorage.getItem('scb_orders') || '[]');
      existing.unshift({
        orderNumber,
        config: orderConfig,
        totalPrice,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('scb_orders', JSON.stringify(existing.slice(0, 10)));
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#543834]/40 backdrop-blur-sm animate-fadeIn">
      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-[#FFF9F9] rounded-[36px] sm:rounded-[44px] border-2 border-pink-200 p-6 sm:p-9 shadow-card-hover text-center overflow-hidden">
        {/* Decorative Floating Sprinkles Background */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-pink-100 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-100 rounded-full blur-xl pointer-events-none" />

        {/* Floating Stars and Hearts */}
        <div className="absolute top-4 left-6 text-xl animate-float-slow select-none">✨</div>
        <div className="absolute top-8 right-8 text-xl animate-float-reverse select-none">♡</div>
        <div className="absolute bottom-6 right-8 text-lg animate-sparkle select-none">🍓</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#8C5847] hover:bg-pink-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          // Pre-confirmation State
          <div className="space-y-5">
            {/* Small Bouncing 3D-styled Cupcake */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-gradient-to-tr from-pink-200 to-rose-100 rounded-full p-2 shadow-soft-pink animate-bounce">
              <span className="text-4xl select-none">🧁</span>
            </div>

            {/* Kawaii Heading & Subtext */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-handwriting font-bold text-[#543834] leading-tight">
                Yay! Your Sweet Order is Ready! ♡
              </h3>
              <p className="text-xs sm:text-sm text-[#75554F] font-body mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you for choosing Sweet Crumbs Bakery! Your delicious creation is being prepared with lots of love.
              </p>
            </div>

            {/* Quick Order Snapshot */}
            <div className="bg-white/90 rounded-2xl p-4 border border-pink-100 text-xs font-cute text-[#543834] text-left space-y-1.5 shadow-xs">
              <div className="flex justify-between font-bold text-sm text-[#B84D67] border-b border-pink-50 pb-1">
                <span>{orderConfig.cakeType}</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-[#8C5847]">
                <span>Customer:</span>
                <span>{orderConfig.customerName} ({orderConfig.customerPhone})</span>
              </div>
              <div className="flex justify-between text-[#8C5847]">
                <span>Size & Flavor:</span>
                <span>{orderConfig.size} • {orderConfig.flavor}</span>
              </div>
              <div className="flex justify-between text-[#8C5847]">
                <span>Delivery Date:</span>
                <span>{orderConfig.deliveryDate}</span>
              </div>
              {orderConfig.cakeMessage && (
                <div className="text-[11px] text-[#B84D67] italic pt-1">
                  Message: "{orderConfig.cakeMessage}"
                </div>
              )}
            </div>

            {/* Buttons: ♡ Confirm Order and Edit Order */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                id="modal-confirm-order-btn"
                onClick={handleFinalConfirm}
                className="w-full sm:flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#FF94AC] to-[#E56885] hover:from-[#f8859f] hover:to-[#d65775] text-white font-cute font-bold text-sm shadow-soft-pink hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>♡ Confirm Order</span>
              </button>

              <button
                id="modal-edit-order-btn"
                onClick={onEditOrder}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-pink-50 text-[#8C5847] border border-pink-200 font-cute font-medium text-sm transition-all cursor-pointer"
              >
                Edit Order
              </button>
            </div>
          </div>
        ) : (
          // Post-confirmation Success Animation & Details
          <div className="space-y-5 animate-fadeIn">
            {/* Success Check Badge */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-emerald-100 to-pink-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 shadow-soft-pink">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="inline-block bg-pink-100 text-[#B84D67] text-xs font-cute font-bold px-3 py-1 rounded-full mb-1">
                Order #{orderNumber}
              </span>
              <h3 className="text-3xl font-handwriting font-bold text-[#543834]">
                Order Confirmed with Love! ♡
              </h3>
              <p className="text-xs sm:text-sm text-[#75554F] font-body mt-2 leading-relaxed">
                We have received your custom cake request! A confirmation summary is linked to our bakery kitchen at TV Centre, Aurangabad.
              </p>
            </div>

            <div className="bg-pink-50/70 border border-pink-200/80 rounded-2xl p-3.5 text-xs font-cute text-[#6E4F49] text-left space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B84D67]" />
                <span>Bakery Contact: {BAKERY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B84D67]" />
                <span>Kitchen Helpline: {BAKERY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#B84D67]">
                <span>Form Access Token: {BAKERY_INFO.formAccessCode}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-[#B84D67] text-white font-cute font-bold text-sm shadow-soft-pink hover:bg-[#a23d55] transition-all cursor-pointer"
            >
              Sweet, Thank You! ♡
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
