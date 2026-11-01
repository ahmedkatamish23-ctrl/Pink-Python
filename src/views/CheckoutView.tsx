import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EGYPTIAN_GOVERNORATES, FREE_SHIPPING_THRESHOLD_EGP } from '../data/governorates';
import { PaymentMethod } from '../types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    lang,
    t,
    formatPrice,
    cart,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    createOrder,
    setCurrentView,
    showToast,
  } = useStore();

  // Customer Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGovernorateId, setSelectedGovernorateId] = useState(EGYPTIAN_GOVERNORATES[0].id);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [buildingOrApt, setBuildingOrApt] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  // Card details (for Paymob test sandbox)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isTestMode, setIsTestMode] = useState(true);

  // Validation & Processing
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find selected governorate
  const currentGov = EGYPTIAN_GOVERNORATES.find((g) => g.id === selectedGovernorateId) || EGYPTIAN_GOVERNORATES[0];

  // Shipping calculation
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD_EGP;
  const shippingFee = isFreeShipping ? 0 : currentGov.shippingFee;
  const finalTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee);

  // Validate Egyptian Mobile Number (+20 10 / 11 / 12 / 15 or 010 / 011 / 012 / 015 - 11 digits)
  const validateEgyptianPhone = (val: string): boolean => {
    const cleaned = val.replace(/[\s\-\(\)]/g, '');
    const egRegex = /^(?:\+20|0020|0)?(1[0125]\d{8})$/;
    return egRegex.test(cleaned);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast(lang === 'ar' ? 'حقيبة التسوق فارغة' : 'Your bag is empty', 'error');
      setCurrentView('shop');
      return;
    }

    if (!validateEgyptianPhone(phone)) {
      setPhoneError(t('checkout.phoneError'));
      showToast(t('checkout.phoneError'), 'error');
      return;
    }
    setPhoneError(null);

    if (paymentMethod === 'paymob_card') {
      if (cardNumber.replace(/\s/g, '').length < 15 || !cardExpiry || !cardCvc) {
        showToast(lang === 'ar' ? 'يرجى استكمال بيانات البطاقة البنكية' : 'Please complete your card details', 'error');
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate payment / order processing
    setTimeout(() => {
      const order = createOrder({
        items: cart,
        subtotal: cartSubtotal,
        shippingFee,
        discount: cartDiscount,
        total: finalTotal,
        customer: {
          fullName,
          phone,
          email,
          governorate: lang === 'ar' ? currentGov.nameAr : currentGov.nameEn,
          city,
          address,
          buildingOrApt,
          deliveryNotes,
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'paymob_card' ? 'paid' : 'pending',
        status: paymentMethod === 'paymob_card' ? 'confirmed' : 'pending',
        couponCode: appliedCoupon?.code,
      });

      setIsSubmitting(false);
      showToast(
        lang === 'ar'
          ? `تم تأكيد طلبكِ بنجاح! رقم المرجع: ${order.orderNumber}`
          : `Order placed successfully! Ref: ${order.orderNumber}`,
        'success'
      );
      setCurrentView('confirmation');
    }, 1200);
  };

  const fillTestCard = () => {
    setCardNumber('4111 2222 3333 4444');
    setCardExpiry('12/28');
    setCardCvc('888');
    setCardHolder(fullName || 'Farida Mansour');
    showToast(lang === 'ar' ? 'تمت تعبئة بيانات البطاقة التجريبية' : 'Test card details filled', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-fashion font-bold mb-4">{t('cart.empty')}</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-[#121214] text-white text-xs font-semibold rounded-xl hover:bg-[#E01A68] transition-colors"
        >
          {t('cart.continueShopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-8">
        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs text-[#5F5C64] hover:text-[#121214] flex items-center gap-1.5 transition-colors mb-2"
        >
          {lang === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{t('checkout.backToCart')}</span>
        </button>
        <h1 className="text-3xl font-fashion font-bold text-[#121214]">
          {t('checkout.title')}
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact Info */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DF] shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F0EBE5]">
              <span className="w-6 h-6 rounded-full bg-[#121214] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-base font-bold text-[#121214]">
                {t('checkout.step1Title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  {t('checkout.fullName')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farida Mansour / فريدة منصور"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  {t('checkout.phone')} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01012345678"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError(null);
                  }}
                  className={`w-full px-4 py-2.5 text-xs font-mono bg-[#FBF9F7] border rounded-xl focus:outline-none ${
                    phoneError ? 'border-[#DC2626]' : 'border-[#E5DFD7] focus:border-[#121214]'
                  }`}
                />
                <span className="text-[11px] text-[#7A777E] mt-1 block">
                  {t('checkout.phoneHint')}
                </span>
                {phoneError && <p className="text-[11px] text-[#DC2626] mt-1">{phoneError}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  {t('checkout.email')} *
                </label>
                <input
                  type="email"
                  required
                  placeholder="farida@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
                <span className="text-[11px] text-[#7A777E] mt-1 block">
                  {t('checkout.emailHint')}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Egyptian Delivery Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DF] shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F0EBE5]">
              <span className="w-6 h-6 rounded-full bg-[#121214] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-bold text-[#121214]">
                {t('checkout.step2Title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Governorate Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  {t('checkout.governorate')} *
                </label>
                <select
                  value={selectedGovernorateId}
                  onChange={(e) => setSelectedGovernorateId(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214] text-[#121214]"
                >
                  {EGYPTIAN_GOVERNORATES.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {lang === 'ar' ? gov.nameAr : gov.nameEn} (
                      {isFreeShipping ? 'شحن مجاني' : `${gov.shippingFee} EGP`} -{' '}
                      {lang === 'ar' ? gov.estimatedDaysAr : gov.estimatedDaysEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* City / District */}
              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  {t('checkout.city')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('checkout.cityPlaceholder')}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  {t('checkout.address')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('checkout.addressPlaceholder')}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              {/* Building / Apt (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  {lang === 'ar' ? 'رقم العمارة / الشقة / الدور' : 'Building / Apt / Floor'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bldg 14, Apt 5"
                  value={buildingOrApt}
                  onChange={(e) => setBuildingOrApt(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              {/* Delivery Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  {t('checkout.deliveryNotes')}
                </label>
                <input
                  type="text"
                  placeholder={t('checkout.deliveryNotesPlaceholder')}
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Egyptian Payment Methods */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DF] shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F0EBE5]">
              <span className="w-6 h-6 rounded-full bg-[#121214] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-bold text-[#121214]">
                {t('checkout.step3Title')}
              </h3>
            </div>

            {/* Options Selector */}
            <div className="space-y-3">
              {/* COD Option */}
              <label
                className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#121214] bg-[#FBF9F7] shadow-xs'
                    : 'border-[#EAE5DF] hover:border-[#D0C7BC]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#E01A68]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#121214] flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#22C55E]" />
                      {t('checkout.codOptionTitle')}
                    </span>
                    <span className="text-[10px] text-[#22C55E] bg-[#F0FDF4] px-2 py-0.5 rounded font-semibold border border-[#BBF7D0]">
                      {lang === 'ar' ? 'الأكثر تفضيلاً' : 'Most Popular in Egypt'}
                    </span>
                  </div>
                  <p className="text-xs text-[#5F5C64] mt-1 leading-relaxed">
                    {t('checkout.codOptionDesc')}
                  </p>
                </div>
              </label>

              {/* Paymob Card Option */}
              <label
                className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'paymob_card'
                    ? 'border-[#121214] bg-[#FBF9F7] shadow-xs'
                    : 'border-[#EAE5DF] hover:border-[#D0C7BC]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paymob_card"
                  checked={paymentMethod === 'paymob_card'}
                  onChange={() => setPaymentMethod('paymob_card')}
                  className="mt-1 accent-[#E01A68]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#121214] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#E01A68]" />
                      {t('checkout.cardOptionTitle')}
                    </span>
                    <span className="text-[10px] text-[#7A777E] font-mono">
                      Paymob · Meeza · Visa · MC
                    </span>
                  </div>
                  <p className="text-xs text-[#5F5C64] mt-1 leading-relaxed">
                    {t('checkout.cardOptionDesc')}
                  </p>
                </div>
              </label>
            </div>

            {/* Paymob Card Form / Test Sandbox View */}
            {paymentMethod === 'paymob_card' && (
              <div className="p-5 bg-[#F5F2EE] rounded-2xl border border-[#EAE5DF] space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#121214] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#22C55E]" />
                    {lang === 'ar' ? 'بوابة الدفع الآمنة (Paymob Gateway)' : 'Secure Egyptian Paymob Gateway'}
                  </span>
                  {isTestMode && (
                    <button
                      type="button"
                      onClick={fillTestCard}
                      className="text-[11px] font-semibold text-[#E01A68] hover:underline"
                    >
                      {lang === 'ar' ? 'تعبئة بطاقة تجريبية' : 'Fill Test Sandbox Card'}
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5F5C64] mb-1">
                      {t('checkout.cardNumber')}
                    </label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#E5DFD7] rounded-lg focus:outline-none focus:border-[#121214]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5F5C64] mb-1">
                        {t('checkout.cardExpiry')}
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                        className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#E5DFD7] rounded-lg focus:outline-none focus:border-[#121214]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5F5C64] mb-1">
                        {t('checkout.cardCvc')}
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength={4}
                        className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#E5DFD7] rounded-lg focus:outline-none focus:border-[#121214]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#5F5C64] mb-1">
                      {t('checkout.cardName')}
                    </label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD7] rounded-lg focus:outline-none focus:border-[#121214]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white/70 rounded-xl border border-[#EAE5DF] text-[11px] text-[#7A777E] space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#121214]">
                    <HelpCircle className="w-3.5 h-3.5 text-[#E01A68]" />
                    <span>{lang === 'ar' ? 'إعدادات الإنتاج' : 'Gateway Credentials Config'}</span>
                  </div>
                  <p>
                    {lang === 'ar'
                      ? 'للربط بالبوابة الحية يتم إضافة PAYMOB_API_KEY و PAYMOB_INTEGRATION_ID في ملف .env عبر الخادم الخلفي بدون كشفها للمتصفح.'
                      : 'For live production transactions, set PAYMOB_API_KEY and PAYMOB_INTEGRATION_ID in .env server proxy without exposing secrets to client.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Placement (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DF] shadow-sm space-y-6 lg:sticky lg:top-28">
          <h3 className="text-lg font-fashion font-bold text-[#121214] pb-4 border-b border-[#F0EBE5]">
            {t('checkout.orderSummary')}
          </h3>

          {/* Items Preview */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cart.map((item) => {
              const price = item.product.salePriceEgp || item.product.priceEgp;
              return (
                <div
                  key={`${item.product.id}-${item.selectedColor.hex}`}
                  className="flex items-center gap-3 py-2 border-b border-[#F5F2EE]"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.nameEn}
                    className="w-12 h-14 object-cover rounded-md bg-[#F5F2EE]"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-[#121214] truncate">
                      {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </h5>
                    <div className="flex items-center gap-1 text-[11px] text-[#7A777E]">
                      <span>Qty: {item.quantity}</span>
                      <span>·</span>
                      <span>{lang === 'ar' ? item.selectedColor.nameAr : item.selectedColor.nameEn}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#121214]">
                    {formatPrice(price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Calculations */}
          <div className="space-y-2 text-xs text-[#5F5C64] pt-2">
            <div className="flex justify-between">
              <span>{t('cart.subtotal')}</span>
              <span className="font-mono font-medium text-[#121214]">{formatPrice(cartSubtotal)}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#15803D]">
                <span>{t('cart.discount')} ({appliedCoupon?.code})</span>
                <span className="font-mono font-medium">- {formatPrice(cartDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div>
                <span>{t('cart.shipping')}</span>
                <span className="block text-[11px] text-[#7A777E]">
                  ({lang === 'ar' ? currentGov.nameAr : currentGov.nameEn})
                </span>
              </div>
              <span className="font-mono font-medium text-[#121214]">
                {shippingFee === 0 ? (
                  <span className="text-[#15803D] font-bold">{t('cart.shippingFree')}</span>
                ) : (
                  formatPrice(shippingFee)
                )}
              </span>
            </div>

            <div className="flex justify-between items-baseline text-base font-bold text-[#121214] pt-3 border-t border-[#F0EBE5]">
              <span>{t('cart.total')}</span>
              <span className="text-xl font-mono text-[#E01A68]">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-[#121214] hover:bg-[#E01A68] disabled:bg-[#9E9B98] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>{t('checkout.processingOrder')}</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#F4A7B9]" />
                <span>{t('checkout.placeOrderBtn', { total: formatPrice(finalTotal) })}</span>
              </>
            )}
          </button>

          {/* Security & Warranty Notice */}
          <p className="text-[11px] text-[#7A777E] text-center leading-relaxed">
            {t('checkout.securityNotice')}
          </p>
        </div>
      </form>
    </div>
  );
};
