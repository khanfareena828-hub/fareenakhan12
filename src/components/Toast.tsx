import React from 'react';
import { Heart, Check, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  itemImage?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, itemImage }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-white/95 backdrop-blur-md border-2 border-pink-200 rounded-full px-4 py-2.5 shadow-card-hover flex items-center gap-3">
        {itemImage ? (
          <img
            src={itemImage}
            alt="Treat"
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover border border-pink-200"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-sm">
            🧁
          </div>
        )}

        <div className="text-xs font-cute text-[#543834] flex items-center gap-1.5 font-bold">
          <span>{message}</span>
          <Heart className="w-3.5 h-3.5 text-[#B84D67] fill-[#B84D67]" />
        </div>
      </div>
    </div>
  );
};
