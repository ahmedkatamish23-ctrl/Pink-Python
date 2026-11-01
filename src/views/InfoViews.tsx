import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Truck,
  ShieldCheck,
  Send,
  HelpCircle,
  FileText,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { lang, t } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest uppercase text-[#E01A68]">
          {t('brand.badge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-fashion font-bold text-[#121214]">
          {t('infoPages.aboutTitle')}
        </h1>
        <p className="text-sm sm:text-base text-[#7A777E] italic">
          "{t('infoPages.aboutSubtitle')}"
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden aspect-16/9 bg-[#F5F2EE] border border-[#EAE5DF] shadow-md">
        <img
          src="/src/assets/images/hero_campaign_pink_python_1793549856907.jpg"
          alt="Pink Python Campaign Egypt"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-neutral max-w-none space-y-6 text-sm text-[#5F5C64] leading-relaxed">
        <p className="text-base font-medium text-[#121214]">
          {t('infoPages.aboutP1')}
        </p>
        <p>{t('infoPages.aboutP2')}</p>
        <p>{t('infoPages.aboutP3')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#EAE5DF]">
        <div className="p-6 bg-white rounded-2xl border border-[#EAE5DF] text-center space-y-2">
          <span className="text-2xl font-fashion font-bold text-[#121214]">Zamalek, Cairo</span>
          <p className="text-xs text-[#7A777E]">Design Studio & Flagship</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-[#EAE5DF] text-center space-y-2">
          <span className="text-2xl font-fashion font-bold text-[#E01A68]">Cruelty-Free</span>
          <p className="text-xs text-[#7A777E]">Vegan Exotic Embossing</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-[#EAE5DF] text-center space-y-2">
          <span className="text-2xl font-fashion font-bold text-[#121214]">27 Governorates</span>
          <p className="text-xs text-[#7A777E]">Direct Doorstep Courier</p>
        </div>
      </div>
    </div>
  );
};

export const ShippingReturnsView: React.FC = () => {
  const { lang, t } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#E01A68]">
          {lang === 'ar' ? 'معلومات الشحن' : 'Delivery & Returns'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-fashion font-bold text-[#121214]">
          {t('infoPages.shippingTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#7A777E]">
          {t('infoPages.shippingSubtitle')}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DF] shadow-xs space-y-6">
        <p className="text-sm text-[#5F5C64] leading-relaxed">
          {t('infoPages.shippingIntro')}
        </p>

        <div className="space-y-4 pt-4 border-t border-[#F0EBE5]">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#E01A68] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#121214]">
                {lang === 'ar' ? 'القاهرة الكبرى والجيزة' : 'Greater Cairo & Giza'}
              </h4>
              <p className="text-xs text-[#5F5C64] mt-0.5">
                {t('infoPages.cairoDelivery')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#E01A68] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#121214]">
                {lang === 'ar' ? 'الإسكندرية والساحل ومدن القناة' : 'Alexandria & Canal Cities'}
              </h4>
              <p className="text-xs text-[#5F5C64] mt-0.5">
                {t('infoPages.alexDelivery')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#E01A68] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#121214]">
                {lang === 'ar' ? 'محافظات الدلتا والصعيد' : 'Delta & Upper Egypt Governorates'}
              </h4>
              <p className="text-xs text-[#5F5C64] mt-0.5">
                {t('infoPages.upperEgyptDelivery')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#E01A68] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#121214]">
                {lang === 'ar' ? 'البحر الأحمر وشرم الشيخ والجونة والمحافظات الحدودية' : 'Red Sea, Sharm & Frontiers'}
              </h4>
              <p className="text-xs text-[#5F5C64] mt-0.5">
                {t('infoPages.redSeaDelivery')}
              </p>
            </div>
          </div>
        </div>

        {/* COD inspection badge */}
        <div className="p-4 bg-[#F0FDF4] rounded-2xl border border-[#BBF7D0] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
          <p className="text-xs text-[#166534] leading-relaxed">
            {t('infoPages.codAssurance')}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { lang, t, showToast } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast(
      lang === 'ar'
        ? 'تم إرسال رسالتكِ لكونسيرج بينك بايثون بنجاح'
        : 'Your message has been sent to our concierge team',
      'success'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#E01A68]">
          {t('nav.contact')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-fashion font-bold text-[#121214]">
          {t('infoPages.contactTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#7A777E]">
          {t('infoPages.contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-2xl border border-[#EAE5DF] space-y-3">
            <div className="flex items-center gap-2 text-[#E01A68]">
              <MapPin className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#121214]">
                {t('footer.showroomTitle')}
              </h4>
            </div>
            <p className="text-xs text-[#5F5C64] leading-relaxed">
              {t('footer.showroomAddress')}
            </p>
            <p className="text-[11px] text-[#7A777E]">
              {t('footer.conciergeHours')}
            </p>
          </div>

          <a
            href="https://wa.me/201001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <div>
                <span className="text-xs font-bold text-[#121214] block">
                  {t('infoPages.contactWhatsApp')}
                </span>
                <span className="text-xs font-mono text-[#5F5C64]">+20 100 123 4567</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#15803D]">
              {lang === 'ar' ? 'محادثة فورية' : 'Chat Now'}
            </span>
          </a>

          <div className="p-5 bg-white rounded-2xl border border-[#EAE5DF] flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#121214]" />
            <div>
              <span className="text-xs font-bold text-[#121214] block">
                {t('infoPages.contactPhone')}
              </span>
              <span className="text-xs font-mono text-[#5F5C64]">+20 100 123 4567</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DF] shadow-xs">
          <h3 className="text-base font-bold text-[#121214] mb-4">
            {lang === 'ar' ? 'أرسلي رسالة مباشرة للكونسيرج' : 'Send Direct Message to Concierge'}
          </h3>

          {sent ? (
            <div className="p-6 bg-[#F0FDF4] rounded-xl text-center space-y-2 border border-[#BBF7D0]">
              <p className="text-xs font-semibold text-[#15803D]">
                {lang === 'ar'
                  ? 'تم استلام رسالتكِ بنجاح! سيتواصل معكِ فريق الكونسيرج خلال ساعتين.'
                  : 'Message received! Our Cairo atelier concierge will contact you within 2 hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1">
                  {t('checkout.fullName')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1">
                  {t('checkout.phone')}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1">
                  {lang === 'ar' ? 'رسالتكِ أو استفساركِ' : 'Your Message / Inquiry'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const FaqView: React.FC = () => {
  const { lang, t } = useStore();

  const faqs = [
    { q: t('infoPages.faqQ1'), a: t('infoPages.faqA1') },
    { q: t('infoPages.faqQ2'), a: t('infoPages.faqA2') },
    { q: t('infoPages.faqQ3'), a: t('infoPages.faqA3') },
    { q: t('infoPages.faqQ4'), a: t('infoPages.faqA4') },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#E01A68]">
          {t('footer.faq')}
        </span>
        <h1 className="text-3xl font-fashion font-bold text-[#121214]">
          {t('infoPages.faqTitle')}
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#EAE5DF] shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-[#121214] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#E01A68] shrink-0" />
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs text-[#5F5C64] leading-relaxed ps-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PolicyView: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { lang, t } = useStore();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="text-center space-y-2">
        <FileText className="w-8 h-8 text-[#E01A68] mx-auto" />
        <h1 className="text-3xl font-fashion font-bold text-[#121214]">
          {type === 'privacy' ? t('footer.privacy') : t('footer.terms')}
        </h1>
        <p className="text-xs text-[#7A777E]">Updated October 2026 · Arab Republic of Egypt</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EAE5DF] shadow-xs space-y-6 text-xs text-[#5F5C64] leading-relaxed">
        {type === 'privacy' ? (
          <>
            <p>
              PINK PYTHON Egypt respects your personal privacy. Customer information collected during checkout
              (including name, phone number, and delivery address) is used solely for the fulfillment of orders
              via authorized couriers and transactional updates.
            </p>
            <p>
              We do not store credit or debit card security codes. Payment card transactions are processed securely
              via bank-grade encrypted channels through Paymob in adherence with Egyptian Central Bank standards.
            </p>
          </>
        ) : (
          <>
            <p>
              By accessing and placing an order on PINK PYTHON Egypt, you agree to our terms of service and guarantee
              of authentic handcrafted goods.
            </p>
            <p>
              In accordance with Egyptian Consumer Protection Agency regulations (Law No. 181 of 2018), customers are
              entitled to inspect delivery parcels and request an exchange or full refund within 14 calendar days of delivery.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
