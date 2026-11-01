import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Globe, Menu, X, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    lang,
    toggleLang,
    t,
    currentView,
    setCurrentView,
    cartCount,
    wishlistIds,
    setIsCartDrawerOpen,
    isAdminLoggedIn,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FBF9F7]/95 backdrop-blur-md border-b border-[#EAE5DF] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text element Brand Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl sm:text-3xl font-fashion font-bold tracking-tight text-[#121214] hover:text-[#E01A68] transition-colors whitespace-nowrap shrink-0 focus:outline-none"
            >
              PINK PYTHON
            </button>

            {/* Zone 2: 4-5 concise single-line text links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#333136]">
              <button
                onClick={() => handleNavClick('shop')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#E01A68] ${
                  currentView === 'shop' ? 'text-[#E01A68] font-semibold underline underline-offset-8' : ''
                }`}
              >
                {t('nav.shopAll')}
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-[#E01A68]"
              >
                {t('nav.newArrivals')}
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-[#E01A68]"
              >
                {t('nav.bestSellers')}
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#E01A68] ${
                  currentView === 'about' ? 'text-[#E01A68] font-semibold underline underline-offset-8' : ''
                }`}
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#E01A68] ${
                  currentView === 'contact' ? 'text-[#E01A68] font-semibold underline underline-offset-8' : ''
                }`}
              >
                {t('nav.contact')}
              </button>
            </nav>

            {/* Zone 3: Primary Action Cluster */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-[#E5DFD7] bg-white text-[#121214] hover:border-[#121214] transition-all whitespace-nowrap shrink-0 shadow-xs"
                title={lang === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5 text-[#E01A68]" />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => handleNavClick('wishlist')}
                className="relative p-2 text-[#333136] hover:text-[#E01A68] transition-colors rounded-full hover:bg-[#F2ECE4]"
                aria-label={t('nav.wishlist')}
              >
                <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'fill-[#E01A68] text-[#E01A68]' : ''}`} />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#121214] text-[#FBF9F7] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag CTA */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-[#121214] text-[#FBF9F7] hover:bg-[#E01A68] transition-colors rounded-lg whitespace-nowrap shrink-0 shadow-xs"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.cart')}</span>
                <span className="w-4 h-4 bg-[#F4A7B9] text-[#121214] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>

              {/* Admin Portal Quick Link */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`p-2 transition-colors rounded-full ${
                  isAdminLoggedIn ? 'text-[#E01A68] bg-[#FCE7F0]' : 'text-[#8E8B92] hover:text-[#121214]'
                }`}
                title={t('nav.admin')}
                aria-label={t('nav.admin')}
              >
                <Shield className="w-4 h-4" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#121214] hover:text-[#E01A68] focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EAE5DF] bg-[#FBF9F7] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            <button
              onClick={() => handleNavClick('shop')}
              className="block w-full text-start py-2.5 text-base font-medium text-[#121214] border-b border-[#F0EBE5]"
            >
              {t('nav.shopAll')}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="block w-full text-start py-2.5 text-base font-medium text-[#121214] border-b border-[#F0EBE5]"
            >
              {t('nav.newArrivals')}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="block w-full text-start py-2.5 text-base font-medium text-[#121214] border-b border-[#F0EBE5]"
            >
              {t('nav.bestSellers')}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full text-start py-2.5 text-base font-medium text-[#121214] border-b border-[#F0EBE5]"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-start py-2.5 text-base font-medium text-[#121214] border-b border-[#F0EBE5]"
            >
              {t('nav.contact')}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="block w-full text-start py-2.5 text-base font-medium text-[#E01A68]"
            >
              {t('nav.admin')}
            </button>
          </div>
        )}
      </header>
    </>
  );
};
