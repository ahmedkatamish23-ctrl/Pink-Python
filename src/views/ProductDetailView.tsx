import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductColor } from '../types';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Zap,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    lang,
    t,
    formatPrice,
    products,
    selectedProductId,
    setCurrentView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'reviews'>('details');

  const isWishlisted = isInWishlist(product.id);
  const currentPrice = product.salePriceEgp || product.priceEgp;

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
  };

  const handleInstantBuy = () => {
    addToCart(product, selectedColor, quantity);
    setCurrentView('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#7A777E]">
        <button onClick={() => setCurrentView('home')} className="hover:text-[#121214] transition-colors">
          {t('nav.home')}
        </button>
        {lang === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <button onClick={() => setCurrentView('shop')} className="hover:text-[#121214] transition-colors">
          {t('nav.shopAll')}
        </button>
        {lang === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <span className="text-[#121214] font-medium truncate max-w-xs">
          {lang === 'ar' ? product.nameAr : product.nameEn}
        </span>
      </nav>

      {/* Main Two-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-1/1 bg-[#F5F2EE] rounded-3xl overflow-hidden border border-[#EAE5DF] shadow-md flex items-center justify-center">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={lang === 'ar' ? product.nameAr : product.nameEn}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {/* Wishlist quick toggle */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 end-4 p-3 rounded-full bg-white/90 hover:bg-white text-[#121214] shadow-md hover:scale-105 transition-all"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? 'fill-[#E01A68] text-[#E01A68]' : 'text-[#121214]'}`}
              />
            </button>
          </div>

          {/* Thumbnails strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#E01A68] shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DF] shadow-sm space-y-6 lg:sticky lg:top-28">
          <div>
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-xs text-[#7A777E] mb-2">
              <span className="uppercase tracking-widest font-semibold text-[#E01A68]">
                {t(`categories.${product.category}`)}
              </span>
              <span className="font-mono text-[#9E9B98]">
                {t('product.sku')}: {product.sku}
              </span>
            </div>

            {/* Bag Title */}
            <h1 className="text-2xl sm:text-3xl font-fashion font-bold text-[#121214] leading-snug">
              {lang === 'ar' ? product.nameAr : product.nameEn}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-[#E5DFD7]'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#121214]">{product.rating}</span>
              <span className="text-xs text-[#7A777E]">({product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Pricing Module */}
          <div className="p-4 bg-[#FBF9F7] rounded-2xl border border-[#EAE5DF] flex items-baseline justify-between">
            <div>
              <span className="text-xs text-[#7A777E] block mb-0.5">
                {lang === 'ar' ? 'السعر الحالي (شامل الضريبة)' : 'Current Price (Incl. VAT)'}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#121214]">
                  {formatPrice(currentPrice)}
                </span>
                {product.salePriceEgp && (
                  <span className="text-sm font-mono text-[#9E9B98] line-through">
                    {formatPrice(product.priceEgp)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs font-semibold text-[#22C55E] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
              {product.stock > 0
                ? t('product.inStock')
                : t('product.outOfStock')}
            </span>
          </div>

          {/* Colorway Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#121214] flex justify-between">
              <span>{t('product.color')}</span>
              <span className="font-normal text-[#5F5C64]">
                {lang === 'ar' ? selectedColor.nameAr : selectedColor.nameEn}
              </span>
            </label>
            <div className="flex items-center gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                    selectedColor.hex === color.hex
                      ? 'border-[#121214] bg-[#F5F2EE] font-semibold text-[#121214] shadow-xs'
                      : 'border-[#EAE5DF] bg-white text-[#5F5C64] hover:border-[#121214]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{lang === 'ar' ? color.nameAr : color.nameEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-[#121214]">{t('product.quantity')}</span>
            <div className="flex items-center border border-[#E5DFD7] rounded-xl bg-[#FBF9F7]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-[#5F5C64] hover:text-[#121214] transition-colors"
                aria-label="Decrease"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-xs font-mono font-bold text-[#121214]">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 text-[#5F5C64] hover:text-[#121214] transition-colors"
                aria-label="Increase"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Purchase Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('product.addToCart')}</span>
            </button>

            <button
              onClick={handleInstantBuy}
              className="w-full py-3.5 px-6 bg-[#F5EDF0] hover:bg-[#F2BAC8] text-[#E01A68] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors border border-[#F4A7B9]/40 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>{t('product.buyNow')}</span>
            </button>
          </div>

          {/* Delivery & Egyptian Trust Notice */}
          <div className="pt-4 border-t border-[#F0EBE5] space-y-2 text-xs text-[#5F5C64]">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <Truck className="w-4 h-4 shrink-0" />
              <span>{t('product.freeShippingNotice')}</span>
            </div>
            <div className="flex items-center gap-2 text-[#7A777E]">
              <RefreshCw className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'معاينة الحقيبة مع المندوب وضمان ١٤ يوماً للاستبدال'
                  : 'Open & inspect parcel with courier before paying'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#7A777E]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'دفع عند الاستلام متاح لجميع الـ ٢٧ محافظة'
                  : 'Cash on Delivery (COD) supported in 27 governorates'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Accordion Tabs */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE5DF] shadow-xs">
        <div className="flex items-center gap-6 border-b border-[#EAE5DF] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`text-sm font-semibold pb-2 transition-colors ${
              activeTab === 'details'
                ? 'text-[#E01A68] border-b-2 border-[#E01A68] -mb-4'
                : 'text-[#7A777E] hover:text-[#121214]'
            }`}
          >
            {t('product.specifications')}
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`text-sm font-semibold pb-2 transition-colors ${
              activeTab === 'materials'
                ? 'text-[#E01A68] border-b-2 border-[#E01A68] -mb-4'
                : 'text-[#7A777E] hover:text-[#121214]'
            }`}
          >
            {t('product.materialsTitle')}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-semibold pb-2 transition-colors ${
              activeTab === 'reviews'
                ? 'text-[#E01A68] border-b-2 border-[#E01A68] -mb-4'
                : 'text-[#7A777E] hover:text-[#121214]'
            }`}
          >
            {t('product.customerReviews', { count: product.reviewsCount })}
          </button>
        </div>

        {/* Tab 1: Details */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <p className="text-sm text-[#5F5C64] leading-relaxed max-w-3xl">
              {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F0EBE5]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#121214] mb-2">
                  {t('product.dimensionsLabel')}
                </h4>
                <p className="text-xs font-mono text-[#5F5C64]">
                  {lang === 'ar' ? product.dimensionsAr : product.dimensionsEn}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#121214] mb-2">
                  {t('product.featuresTitle')}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#5F5C64]">
                  {(lang === 'ar' ? product.featuresAr : product.featuresEn).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E01A68]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Materials & Care */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#121214] mb-2">
                {t('product.materialsLabel')}
              </h4>
              <p className="text-sm text-[#5F5C64] leading-relaxed">
                {lang === 'ar' ? product.materialsAr : product.materialsEn}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EBE5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#121214] mb-2">
                {lang === 'ar' ? 'إرشادات العناية بجلد البايثون' : 'Python Leather Care Guide'}
              </h4>
              <p className="text-xs text-[#5F5C64] leading-relaxed">
                {t('product.careGuide')}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#FBF9F7] rounded-xl border border-[#EAE5DF] flex items-center justify-between">
              <div>
                <span className="text-xl font-bold font-fashion text-[#121214]">{product.rating} / 5.0</span>
                <p className="text-xs text-[#7A777E]">Based on verified Egyptian buyers</p>
              </div>
              <span className="text-xs text-[#22C55E] bg-[#F0FDF4] px-3 py-1 rounded-md font-medium border border-[#BBF7D0]">
                100% Authenticity Verified
              </span>
            </div>
            <p className="text-xs text-[#5F5C64] italic">
              {lang === 'ar'
                ? 'جميع تقييمات العميلات مأخوذة من عميلات قمن باستلام ومعاينة الحقيبة في مصر.'
                : 'All reviews are submitted by verified Egyptian customers post-delivery inspection.'}
            </p>
          </div>
        )}
      </section>

      {/* Related Statement Bags */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-fashion font-bold text-[#121214]">
            {t('product.relatedTitle')}
          </h3>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-semibold text-[#E01A68] hover:underline"
          >
            {t('shop.title')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {fallbackRelated.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>
    </div>
  );
};
