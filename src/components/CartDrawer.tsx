import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Tag } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD_EGP } from '../data/governorates';

export const CartDrawer: React.FC = () => {
  const {
    lang,
    t,
    formatPrice,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    setCurrentView,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartDrawerOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_EGP - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD_EGP) * 100));

  const grandTotal = Math.max(0, cartSubtotal - cartDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className={`fixed inset-y-0 ${lang === 'ar' ? 'left-0' : 'right-0'} max-w-full flex pl-0 sm:pl-10`}>
        <div className="w-screen max-w-md bg-[#FBF9F7] shadow-2xl flex flex-col border-s border-[#EAE5DF]">
          {/* Header */}
          <div className="p-5 border-b border-[#EAE5DF] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E01A68]" />
              <h2 className="text-lg font-fashion font-bold text-[#121214]">{t('cart.title')}</h2>
              <span className="text-xs text-[#7A777E]">({cart.length})</span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#5F5C64] hover:text-[#121214] rounded-md hover:bg-[#F2ECE4] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-[#F5F2EE] border-b border-[#EAE5DF]">
            <div className="flex justify-between items-center text-xs font-medium mb-1.5">
              <span className="text-[#333136]">
                {remainingForFreeShipping > 0
                  ? t('cart.freeShippingProgress', { amount: formatPrice(remainingForFreeShipping) })
                  : t('cart.freeShippingUnlocked')}
              </span>
              <span className="font-mono font-bold text-[#E01A68]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E0D9D0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#E01A68] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F5EDF0] flex items-center justify-center text-[#E01A68] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-medium text-[#121214] mb-2">{t('cart.empty')}</p>
                <p className="text-xs text-[#7A777E] max-w-xs mb-6">
                  {lang === 'ar'
                    ? 'اكتشفي تشكيلة حقائب البايثون الفاخرة وأضيفي لمسة جرأة وأناقة لإطلالتكِ.'
                    : 'Discover our exotic statement python collection and sculpt your standout look.'}
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('shop');
                  }}
                  className="px-6 py-2.5 text-xs font-semibold bg-[#121214] text-[#FBF9F7] rounded-lg hover:bg-[#E01A68] transition-colors"
                >
                  {t('cart.continueShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.salePriceEgp || item.product.priceEgp;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedColor.hex}`}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-[#EAE5DF] shadow-xs hover:border-[#D5CDC3] transition-all"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                      className="w-20 h-24 object-cover rounded-lg bg-[#F5F2EE] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-[#121214] line-clamp-1">
                            {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor.hex)}
                            className="text-[#9E9B98] hover:text-[#DC2626] transition-colors p-1"
                            title={t('cart.removeConfirm')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#7A777E]">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{lang === 'ar' ? item.selectedColor.nameAr : item.selectedColor.nameEn}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#E5DFD7] rounded-md bg-[#FBF9F7]">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.selectedColor.hex, item.quantity - 1)
                            }
                            className="p-1 text-[#5F5C64] hover:text-[#121214] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.selectedColor.hex, item.quantity + 1)
                            }
                            className="p-1 text-[#5F5C64] hover:text-[#121214] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-mono font-bold text-[#121214]">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EAE5DF] bg-white space-y-4">
              {/* Promo Coupon Form */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-xs">
                    <div className="flex items-center gap-2 text-[#15803D] font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-[10px] text-[#166534]">
                        ({appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.value}%` : `${appliedCoupon.value} EGP`} off)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#DC2626] hover:underline text-xs font-semibold"
                    >
                      {t('cart.couponRemove')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t('cart.couponPlaceholder')}
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError(null);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-md focus:outline-none focus:border-[#121214]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold bg-[#121214] text-[#FBF9F7] rounded-md hover:bg-[#E01A68] transition-colors"
                    >
                      {t('cart.couponApply')}
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-[#DC2626]">{couponError}</p>}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs text-[#5F5C64] pt-2 border-t border-[#F0EBE5]">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-mono font-medium text-[#121214]">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#15803D]">
                    <span>{t('cart.discount')}</span>
                    <span className="font-mono font-medium">- {formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t('cart.shipping')}</span>
                  <span className="text-[#15803D] font-medium">
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD_EGP
                      ? t('cart.shippingFree')
                      : lang === 'ar'
                      ? 'يُحسب عند إتمام الطلب'
                      : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#121214] pt-2 border-t border-[#F0EBE5]">
                  <span>{t('cart.total')}</span>
                  <span className="font-mono text-[#E01A68]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 bg-[#121214] hover:bg-[#E01A68] text-[#FBF9F7] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>{t('cart.checkoutBtn')}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
