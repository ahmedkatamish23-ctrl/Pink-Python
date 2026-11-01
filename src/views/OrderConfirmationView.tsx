import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ShoppingBag,
  Clock,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { lang, t, formatPrice, orders, latestOrderId, setCurrentView } = useStore();

  const currentOrder = orders.find((o) => o.id === latestOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold mb-4">No order found</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2.5 bg-[#121214] text-white text-xs font-semibold rounded-xl"
        >
          {t('cart.continueShopping')}
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { key: 'pending', labelEn: 'Order Received', labelAr: 'تم استلام الطلب' },
    { key: 'confirmed', labelEn: 'Order Confirmed', labelAr: 'تم التأكيد' },
    { key: 'processing', labelEn: 'Atelier Preparation', labelAr: 'جاري التجهيز بالمشغل' },
    { key: 'shipped', labelEn: 'Dispatched to Courier', labelAr: 'مع مندوب الشحن' },
    { key: 'delivered', labelEn: 'Delivered', labelAr: 'تم التسليم' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentOrder.status);
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Top Success Banner */}
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-fashion font-bold text-[#121214]">
          {t('confirmation.title')}
        </h1>
        <p className="text-xs sm:text-sm text-[#374151] max-w-lg mx-auto leading-relaxed">
          {t('confirmation.subtitle')}
        </p>
        <div className="inline-block px-4 py-2 bg-white rounded-xl border border-[#86EFAC] font-mono text-sm font-bold text-[#121214] shadow-xs">
          {t('confirmation.orderNumber')}: <span className="text-[#E01A68]">{currentOrder.orderNumber}</span>
        </div>
      </div>

      {/* Progress Timeline Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DF] shadow-xs space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#121214]">
          {t('confirmation.trackingTitle')}
        </h3>

        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {steps.map((step, idx) => {
              const isCompleted = idx <= activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-[#121214] text-[#F4A7B9] shadow-sm'
                        : 'bg-[#F5F2EE] text-[#9E9B98]'
                    } ${isCurrent ? 'ring-4 ring-[#FCE7F0]' : ''}`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-xs font-medium leading-tight ${
                      isCompleted ? 'text-[#121214] font-semibold' : 'text-[#9E9B98]'
                    }`}
                  >
                    {lang === 'ar' ? step.labelAr : step.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest Tracking Log Note */}
        {currentOrder.trackingUpdates && currentOrder.trackingUpdates.length > 0 && (
          <div className="p-4 bg-[#FBF9F7] rounded-xl border border-[#EAE5DF] flex items-start gap-3 text-xs text-[#5F5C64]">
            <Clock className="w-4 h-4 text-[#E01A68] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#121214] block">
                {lang === 'ar' ? 'آخر تحديث للحالة:' : 'Latest Update:'}
              </span>
              <span>
                {lang === 'ar'
                  ? currentOrder.trackingUpdates[currentOrder.trackingUpdates.length - 1].noteAr
                  : currentOrder.trackingUpdates[currentOrder.trackingUpdates.length - 1].noteEn}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Order Details & Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination & Payment Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DF] shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#121214] pb-2 border-b border-[#F0EBE5]">
            {t('confirmation.deliveryAddress')}
          </h3>
          <div className="space-y-2 text-xs text-[#5F5C64]">
            <p className="font-bold text-sm text-[#121214]">{currentOrder.customer.fullName}</p>
            <p className="flex items-center gap-1.5 font-mono text-[#121214]">
              <Phone className="w-3.5 h-3.5 text-[#E01A68]" />
              <span>{currentOrder.customer.phone}</span>
            </p>
            <p className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E01A68] shrink-0 mt-0.5" />
              <span>
                {currentOrder.customer.governorate}, {currentOrder.customer.city},{' '}
                {currentOrder.customer.address}
                {currentOrder.customer.buildingOrApt ? ` (${currentOrder.customer.buildingOrApt})` : ''}
              </span>
            </p>
            {currentOrder.customer.deliveryNotes && (
              <p className="p-2 bg-[#FBF9F7] rounded-lg border border-[#EAE5DF] text-[11px] italic">
                "{currentOrder.customer.deliveryNotes}"
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-[#F0EBE5] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#7A777E]">{t('confirmation.paymentMethod')}:</span>
              <span className="font-medium text-[#121214] flex items-center gap-1">
                {currentOrder.paymentMethod === 'cod' ? (
                  <>
                    <Banknote className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>Cash on Delivery (COD)</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-3.5 h-3.5 text-[#E01A68]" />
                    <span>Paymob Gateway</span>
                  </>
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A777E]">{t('confirmation.paymentStatus')}:</span>
              <span
                className={`font-semibold capitalize px-2 py-0.5 rounded text-[11px] ${
                  currentOrder.paymentStatus === 'paid'
                    ? 'bg-[#F0FDF4] text-[#15803D]'
                    : 'bg-[#FEF3C7] text-[#B45309]'
                }`}
              >
                {currentOrder.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Purchased Pieces Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DF] shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#121214] pb-2 border-b border-[#F0EBE5]">
            {t('confirmation.itemsTitle')}
          </h3>

          <div className="space-y-3 max-h-56 overflow-y-auto">
            {currentOrder.items.map((item, idx) => {
              const price = item.product.salePriceEgp || item.product.priceEgp;
              return (
                <div key={idx} className="flex items-center gap-3 py-2 border-b border-[#F5F2EE]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.nameEn}
                    className="w-12 h-14 object-cover rounded-md bg-[#F5F2EE]"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-[#121214] truncate">
                      {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </h5>
                    <div className="text-[11px] text-[#7A777E]">
                      Qty: {item.quantity} · {lang === 'ar' ? item.selectedColor.nameAr : item.selectedColor.nameEn}
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#121214]">
                    {formatPrice(price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#F0EBE5] text-xs text-[#5F5C64]">
            <div className="flex justify-between">
              <span>{t('cart.subtotal')}</span>
              <span className="font-mono">{formatPrice(currentOrder.subtotal)}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-[#15803D]">
                <span>{t('cart.discount')}</span>
                <span className="font-mono">- {formatPrice(currentOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{t('cart.shipping')}</span>
              <span className="font-mono">
                {currentOrder.shippingFee === 0 ? t('cart.shippingFree') : formatPrice(currentOrder.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#121214] pt-2 border-t border-[#F0EBE5]">
              <span>{t('cart.total')}</span>
              <span className="font-mono text-[#E01A68]">{formatPrice(currentOrder.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EAE5DF]">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F2ECE4] border border-[#E5DFD7] text-xs font-semibold rounded-xl text-[#121214] flex items-center justify-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4 text-[#7A777E]" />
          <span>{t('confirmation.printReceipt')}</span>
        </button>

        <button
          onClick={() => setCurrentView('shop')}
          className="w-full sm:w-auto px-8 py-3 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <span>{t('confirmation.continueShopping')}</span>
          {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Support Concierge Notice */}
      <p className="text-center text-xs text-[#7A777E]">
        {t('confirmation.customerCareNotice')}
      </p>
    </div>
  );
};
