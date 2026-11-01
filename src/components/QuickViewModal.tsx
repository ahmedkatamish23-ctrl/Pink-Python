import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { ProductColor } from '../types';

export const QuickViewModal: React.FC = () => {
  const {
    lang,
    t,
    formatPrice,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    setCurrentView,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentColor = selectedColor || quickViewProduct.colors[0];
  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentColor, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    const pId = quickViewProduct.id;
    setQuickViewProduct(null);
    setCurrentView('product', pId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FBF9F7] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#EAE5DF] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 end-4 z-20 p-2 bg-white/80 hover:bg-white text-[#121214] rounded-full shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Gallery */}
          <div className="relative bg-[#F5F2EE] p-6 flex flex-col justify-center items-center">
            <img
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={lang === 'ar' ? quickViewProduct.nameAr : quickViewProduct.nameEn}
              className="w-full max-h-[380px] object-cover rounded-xl shadow-xs"
            />
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#E01A68]' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#7A777E] mb-1.5">
                <span className="uppercase tracking-widest font-medium">
                  {t(`categories.${quickViewProduct.category}`)}
                </span>
                <span className="font-mono">{quickViewProduct.sku}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-fashion font-bold text-[#121214] mb-2">
                {lang === 'ar' ? quickViewProduct.nameAr : quickViewProduct.nameEn}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-[#F59E0B]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold ms-1 text-[#121214]">{quickViewProduct.rating}</span>
                </div>
                <span className="text-xs text-[#7A777E]">({quickViewProduct.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-mono font-bold text-[#121214]">
                  {formatPrice(quickViewProduct.salePriceEgp || quickViewProduct.priceEgp)}
                </span>
                {quickViewProduct.salePriceEgp && (
                  <span className="text-sm font-mono text-[#9E9B98] line-through">
                    {formatPrice(quickViewProduct.priceEgp)}
                  </span>
                )}
              </div>

              {/* Tagline */}
              <p className="text-xs text-[#5F5C64] leading-relaxed mb-5">
                {lang === 'ar' ? quickViewProduct.taglineAr : quickViewProduct.taglineEn}
              </p>

              {/* Colors */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-[#121214] mb-2">
                  {t('product.color')}:{' '}
                  <span className="font-normal text-[#5F5C64]">
                    {lang === 'ar' ? currentColor.nameAr : currentColor.nameEn}
                  </span>
                </label>
                <div className="flex gap-2">
                  {quickViewProduct.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        currentColor.hex === color.hex ? 'scale-110 border-[#121214]' : 'border-black/20'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={lang === 'ar' ? color.nameAr : color.nameEn}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#EAE5DF]">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('shop.addToBag')}</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border border-[#E5DFD7] hover:border-[#121214] transition-colors ${
                    isWishlisted ? 'text-[#E01A68] bg-[#FCE7F0]' : 'text-[#121214] bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full py-2.5 text-xs font-medium text-[#5F5C64] hover:text-[#121214] hover:underline flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'عرض كافة المواصفات والصور' : 'View Full Specifications & Story'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
