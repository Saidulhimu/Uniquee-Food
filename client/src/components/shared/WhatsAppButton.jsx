import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const phoneNumber = '8801341180530';
  const defaultMessage = encodeURIComponent(
    'Hello Uniquee Food! I am interested in ordering pure and organic groceries. Can you help me?'
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Uniquee Food"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 bg-[#2E5A36] hover:bg-[#25492b] text-white py-3 px-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
      </div>
      <span className="hidden sm:inline text-xs font-semibold tracking-wide">
        WhatsApp Order: 01341-180530
      </span>
    </a>
  );
};

export default WhatsAppButton;
