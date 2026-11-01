import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { lang, announcementText } = useStore();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#121214] text-[#FBF9F7] text-xs py-2 px-4 transition-all duration-300 relative z-40 border-b border-[#26242B]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-xs tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#F4A7B9] shrink-0 animate-pulse" />
          <span className="font-medium text-[#F4A7B9] tracking-wider uppercase text-[10px] hidden sm:inline">
            {lang === 'ar' ? 'توصيل فاخر' : 'VIP COURIER'} ·
          </span>
          <span className="text-[#F5F2EE] font-light">
            {lang === 'ar' ? announcementText.ar : announcementText.en}
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#9E9B98] hover:text-[#FBF9F7] transition-colors p-1"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
