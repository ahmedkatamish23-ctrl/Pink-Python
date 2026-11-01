import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    lang,
    t,
    formatPrice,
    setCurrentView,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const isWishlisted = isInWishlist(product.id);
  const price = product.salePriceEgp || product.priceEgp;

  const handleCardClick = () => {
    setCurrentView('product', product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-[#EAE5DF] overflow-hidden hover:border-[#D0C7BC] hover:shadow-xl transition-all duration-300"
    >
      {/* Imagery Container (65-75% visual weight) */}
      <div className="relative aspect-4/3 w-full bg-[#F5F2EE] overflow-hidden flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={lang === 'ar' ? product.nameAr : product.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Quiet Editorial Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#121214] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs">
              {lang === 'ar' ? 'وصل حديثاً' : 'New In'}
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E01A68] bg-[#FCE7F0]/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs">
              {lang === 'ar' ? 'الأكثر طلباً' : 'Best Seller'}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 end-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#121214] shadow-xs hover:scale-110 transition-all"
          aria-label="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#E01A68] text-[#E01A68]' : 'text-[#333136]'
            }`}
          />
        </button>

        {/* Hover Quick Actions Bar */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#121214]/90 hover:bg-[#E01A68] text-white text-xs font-semibold rounded-lg backdrop-blur-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t('shop.addToBag')}</span>
          </button>
          <button
            onClick={handleQuickView}
            className="p-2.5 bg-white/90 hover:bg-white text-[#121214] rounded-lg backdrop-blur-xs shadow-md transition-colors"
            title={t('shop.quickView')}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Color indicators */}
          <div className="flex items-center justify-between text-xs text-[#7A777E] mb-1.5">
            <span className="uppercase tracking-wider text-[11px] font-medium">
              {t(`categories.${product.category}`)}
            </span>
            {/* Color dots */}
            <div className="flex gap-1">
              {product.colors.map((c) => (
                <span
                  key={c.hex}
                  className="w-2.5 h-2.5 rounded-full border border-black/15"
                  style={{ backgroundColor: c.hex }}
                  title={lang === 'ar' ? c.nameAr : c.nameEn}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[#121214] group-hover:text-[#E01A68] transition-colors line-clamp-1 mb-1">
            {lang === 'ar' ? product.nameAr : product.nameEn}
          </h3>

          {/* Subtitle / Tagline */}
          <p className="text-xs text-[#6B6870] line-clamp-1 mb-3">
            {lang === 'ar' ? product.taglineAr : product.taglineEn}
          </p>
        </div>

        {/* Pricing */}
        <div className="pt-3 border-t border-[#F2ECE4] flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-mono font-bold text-[#121214] tabular-nums">
              {formatPrice(price)}
            </span>
            {product.salePriceEgp && (
              <span className="text-xs font-mono text-[#9E9B98] line-through tabular-nums">
                {formatPrice(product.priceEgp)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#22C55E] font-medium">
            {product.stock > 0 ? (lang === 'ar' ? 'متوفر' : 'In Stock') : (lang === 'ar' ? 'نفد' : 'Sold Out')}
          </span>
        </div>
      </div>
    </div>
  );
};
