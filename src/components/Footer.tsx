import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MapPin, Clock, MessageSquare, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t, setCurrentView } = useStore();

  return (
    <footer className="bg-[#121214] text-[#FBF9F7] pt-16 pb-12 border-t border-[#26242B] transition-colors">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#26242B]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#232127] flex items-center justify-center text-[#F4A7B9] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {lang === 'ar' ? 'توصيل لجميع المحافظات' : 'All-Egypt Delivery'}
              </h4>
              <p className="text-xs text-[#9E9B98] leading-relaxed">
                {lang === 'ar'
                  ? 'شحن سريع ومجاني للطلبات أكثر من ٣,٥٠٠ جنيه'
                  : 'Fast doorstep courier across all 27 governorates.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#232127] flex items-center justify-center text-[#F4A7B9] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {lang === 'ar' ? 'معاينة قبل الدفع واستبدال' : 'Inspect Before Pay & 14D Returns'}
              </h4>
              <p className="text-xs text-[#9E9B98] leading-relaxed">
                {lang === 'ar'
                  ? 'حق المعاينة مع المندوب وضمان ١٤ يوماً للاستبدال'
                  : 'Open the box with courier + 14-day exchange.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#232127] flex items-center justify-center text-[#F4A7B9] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {lang === 'ar' ? 'دفع عند الاستلام وبطاقات' : 'Cash on Delivery & Cards'}
              </h4>
              <p className="text-xs text-[#9E9B98] leading-relaxed">
                {lang === 'ar'
                  ? 'سداد نقدي عند الباب أو عبر بوابة Paymob المعتمدة'
                  : 'Cash at door or Paymob card processing.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#232127] flex items-center justify-center text-[#F4A7B9] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {lang === 'ar' ? 'كونسيرج القاهرة المباشر' : 'Cairo WhatsApp Concierge'}
              </h4>
              <p className="text-xs text-[#9E9B98] leading-relaxed">
                {lang === 'ar'
                  ? 'دعم مخصص واستشارات موضة عبر واتساب يومياً'
                  : 'Daily styling advice and order support.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-fashion font-bold tracking-tight text-white">
              PINK PYTHON
            </h3>
            <p className="text-xs font-medium text-[#F4A7B9] tracking-widest uppercase">
              {t('brand.tagline')}
            </p>
            <p className="text-xs text-[#9E9B98] leading-relaxed max-w-sm">
              {t('footer.story')}
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#C5C2BD]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F4A7B9] shrink-0" />
                <span>{t('footer.showroomAddress')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F4A7B9] shrink-0" />
                <span>{t('footer.conciergeHours')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F4A7B9] shrink-0" />
                <span className="font-mono">{t('footer.whatsappConcierge')}</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer.shopLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-[#9E9B98]">
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors"
                >
                  {t('categories.totes')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors"
                >
                  {t('categories.crossbody')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors"
                >
                  {t('categories.shoulder')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors"
                >
                  {t('categories.clutches')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors"
                >
                  {t('categories.mini')}
                </button>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer.serviceLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-[#9E9B98]">
              <li>
                <button
                  onClick={() => setCurrentView('shipping')}
                  className="hover:text-white transition-colors"
                >
                  {t('footer.shippingReturns')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('faq')}
                  className="hover:text-white transition-colors"
                >
                  {t('footer.faq')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-white transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-[#F4A7B9] transition-colors"
                >
                  {t('nav.admin')}
                </button>
              </li>
            </ul>
          </div>

          {/* Egyptian Payment Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer.paymentPartners')}
            </h4>
            <p className="text-xs text-[#9E9B98]">
              {lang === 'ar'
                ? 'مدفوعات مصرية معتمدة وآمنة'
                : 'Trusted Egyptian payment processors'}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-1 bg-[#232127] rounded text-[11px] font-mono text-[#F5F2EE] border border-[#35333B]">
                Cash on Delivery
              </span>
              <span className="px-2 py-1 bg-[#232127] rounded text-[11px] font-mono text-[#F4A7B9] border border-[#35333B]">
                Paymob
              </span>
              <span className="px-2 py-1 bg-[#232127] rounded text-[11px] font-mono text-[#F5F2EE] border border-[#35333B]">
                Meeza (ميزة)
              </span>
              <span className="px-2 py-1 bg-[#232127] rounded text-[11px] font-mono text-[#F5F2EE] border border-[#35333B]">
                Visa / MC
              </span>
              <span className="px-2 py-1 bg-[#232127] rounded text-[11px] font-mono text-[#F5F2EE] border border-[#35333B]">
                valU
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#26242B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A777E]">
        <p>{t('footer.copyright')}</p>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView('privacy')}
            className="hover:text-white transition-colors"
          >
            {t('footer.privacy')}
          </button>
          <span>·</span>
          <button
            onClick={() => setCurrentView('terms')}
            className="hover:text-white transition-colors"
          >
            {t('footer.terms')}
          </button>
        </div>
      </div>
    </footer>
  );
};
