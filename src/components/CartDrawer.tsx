import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Heart, Sparkles, Tag, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (discountTotal: number) => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onExplore,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const discountAmount = discountApplied ? Math.round(subtotal * 0.2) : 0;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SWEETFIRST20') {
      setDiscountApplied(true);
    } else {
      alert('Invalid code. Try "SWEETFIRST20" for 20% off ♡');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#543834]/40 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#FFF9F9] h-full shadow-2xl flex flex-col z-10 border-l border-pink-200 animate-slideLeft overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-pink-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-lg">
              🧁
            </div>
            <div>
              <h3 className="text-xl font-handwriting font-bold text-[#543834]">
                Your Sweet Basket ♡
              </h3>
              <p className="text-[11px] font-cute text-[#8C5847]">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-pink-100 text-[#8C5847] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-20 h-20 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-4xl animate-bounce">
                🧁
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-handwriting font-bold text-[#543834]">
                  Your Basket is Empty
                </h4>
                <p className="text-xs text-[#8C5847] font-body max-w-xs">
                  Sweet treats are waiting to bring a smile to your day!
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="px-6 py-2.5 rounded-full bg-[#B84D67] text-white font-cute font-bold text-xs shadow-soft-pink hover:bg-[#a23d55] transition-all"
              >
                Browse Best Sellers ✨
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-pink-100 shadow-xs flex items-center gap-3.5"
              >
                {/* Product thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-pink-50 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-handwriting font-bold text-[#543834] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-cute font-bold text-[#B84D67]">
                    ₹{item.product.price}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-6 h-6 rounded-full bg-pink-50 border border-pink-200 text-[#8C5847] flex items-center justify-center text-xs font-bold hover:bg-pink-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-cute font-bold text-[#543834] w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-6 h-6 rounded-full bg-pink-50 border border-pink-200 text-[#8C5847] flex items-center justify-center text-xs font-bold hover:bg-pink-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-pink-100 bg-white/95 space-y-3.5 shadow-lg">
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (SWEETFIRST20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3.5 py-1.5 rounded-xl border border-pink-200 text-xs font-cute text-[#543834] focus:outline-none focus:ring-1 focus:ring-[#B84D67]"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-3 py-1.5 bg-pink-100 text-[#B84D67] rounded-xl text-xs font-cute font-bold hover:bg-pink-200 transition-colors"
              >
                Apply
              </button>
            </div>

            {discountApplied && (
              <div className="text-[11px] text-emerald-700 font-cute flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>20% Sweet discount applied! (-₹{discountAmount})</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs font-cute text-[#6E4F49]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery / Packaging</span>
                <span className="font-bold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount (20%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#543834] pt-2 border-t border-pink-100">
                <span>Total Amount</span>
                <span className="text-xl text-[#B84D67]">₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onCheckout(total)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF94AC] to-[#E56885] hover:from-[#f8859f] hover:to-[#d65775] text-white font-cute font-bold text-sm shadow-soft-pink hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white/80" />
              <span>Checkout Order ♡ (₹{total})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
