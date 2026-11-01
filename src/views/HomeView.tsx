import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ArrowLeft, Sparkles, Check, Star, ShieldCheck, Mail, Instagram } from 'lucide-react';
import { REVIEWS_DATA } from '../data/products';

export const HomeView: React.FC = () => {
  const { lang, t, products, setCurrentView, showToast } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Top signature products for homepage
  const featuredProducts = products.filter((p) => p.isBestSeller || p.isNewArrival).slice(0, 6);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast(lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast(t('newsletter.success'), 'success');
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. Hero Fashion Campaign */}
      <section className="relative overflow-hidden bg-[#FBF9F7] border-b border-[#EAE5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy (5 cols) */}
            <div className="lg:col-span-5 space-y-6 text-start z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5EDF0] text-[#E01A68] rounded-full text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'المجموعة الفاخرة الجديدة' : 'New Exotic Capsule'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-fashion font-extrabold tracking-tight text-[#121214] leading-[1.08] text-balance">
                {t('hero.headline')}
              </h1>

              <p className="text-sm sm:text-base text-[#5F5C64] leading-relaxed max-w-lg">
                {t('hero.subheadline')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="py-4 px-8 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold tracking-widest uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{t('hero.ctaPrimary')}</span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="py-4 px-6 bg-white hover:bg-[#F2ECE4] text-[#121214] border border-[#E5DFD7] text-xs font-semibold tracking-wider rounded-xl transition-colors"
                >
                  {t('hero.ctaSecondary')}
                </button>
              </div>

              {/* Trust Metric */}
              <div className="pt-4 border-t border-[#EAE5DF] flex items-center gap-2 text-xs text-[#7A777E]">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>{t('hero.guarantee')}</span>
              </div>
            </div>

            {/* Right Large Campaign Editorial Photograph (7 cols) */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-16/10 lg:aspect-16/9 bg-[#F5F2EE] border border-[#EAE5DF]">
                <img
                  src="/src/assets/images/hero_campaign_pink_python_1793549856907.jpg"
                  alt="Pink Python Campaign Egypt"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 start-6 end-6 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#F4A7B9]">
                      Autumn / Winter Edition
                    </span>
                    <h3 className="text-lg sm:text-xl font-fashion font-bold">
                      {lang === 'ar' ? 'حقيبة جراند توت · التدرج الوردي الملوكي' : 'The Grand Tote in Blush Python'}
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-mono text-white/90 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30">
                    {lang === 'ar' ? '٤,٢٥٠ ج.م' : '4,250 EGP'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Signature Collection / Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#EAE5DF]">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#E01A68] mb-1 block">
              {lang === 'ar' ? 'إصدار محدود' : 'Curated Capsule'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-fashion font-bold text-[#121214]">
              {t('featured.title')}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A777E] mt-1 max-w-xl">
              {t('featured.subtitle')}
            </p>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-semibold text-[#121214] hover:text-[#E01A68] underline underline-offset-4 transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            {t('featured.viewAll')}
          </button>
        </div>

        {/* 3-Column Luxury Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Cairo Atelier Craftsmanship & Story */}
      <section className="bg-[#121214] text-[#FBF9F7] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#26242B] bg-python-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-4/5 bg-[#232127] border border-[#35333B] shadow-xl">
                  <img
                    src="/src/assets/images/product_tote_blush_python_1793549857261.jpg"
                    alt="Blush Python Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-4/5 bg-[#232127] border border-[#35333B] shadow-xl mt-8">
                  <img
                    src="/src/assets/images/product_crossbody_hotpink_1793549858380.jpg"
                    alt="Hot Pink Python Crossbody"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Narrative & Metrics */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F4A7B9]">
                {t('craftsmanship.eyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-fashion font-bold text-white text-balance">
                {t('craftsmanship.title')}
              </h2>
              <p className="text-sm text-[#C5C2BD] leading-relaxed">
                {t('craftsmanship.p1')}
              </p>
              <p className="text-sm text-[#C5C2BD] leading-relaxed">
                {t('craftsmanship.p2')}
              </p>

              {/* Editorial Stat Cards */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#26242B]">
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F4A7B9] block">
                    {t('craftsmanship.metric1Value')}
                  </span>
                  <span className="text-xs text-[#9E9B98] mt-1 block">
                    {t('craftsmanship.metric1Label')}
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F4A7B9] block">
                    {t('craftsmanship.metric2Value')}
                  </span>
                  <span className="text-xs text-[#9E9B98] mt-1 block">
                    {t('craftsmanship.metric2Label')}
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F4A7B9] block">
                    {t('craftsmanship.metric3Value')}
                  </span>
                  <span className="text-xs text-[#9E9B98] mt-1 block">
                    {t('craftsmanship.metric3Label')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Verified Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#E01A68] mb-2 block">
            {lang === 'ar' ? 'تجارب موثوقة' : 'Client Impressions'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-fashion font-bold text-[#121214]">
            {t('reviewsSection.title')}
          </h2>
          <p className="text-xs sm:text-sm text-[#7A777E] mt-1">
            {t('reviewsSection.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#EAE5DF] shadow-xs flex flex-col justify-between hover:border-[#D0C7BC] transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h4 className="text-sm font-semibold text-[#121214] mb-2">
                  "{lang === 'ar' ? rev.titleAr : rev.titleEn}"
                </h4>
                <p className="text-xs text-[#5F5C64] leading-relaxed">
                  {lang === 'ar' ? rev.commentAr : rev.commentEn}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F2ECE4] flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-[#121214]">{rev.author}</h5>
                  <span className="text-[11px] text-[#7A777E]">
                    {lang === 'ar' ? rev.cityAr : rev.cityEn}
                  </span>
                </div>
                <span className="text-[10px] text-[#22C55E] bg-[#F0FDF4] px-2 py-0.5 rounded font-medium border border-[#BBF7D0]">
                  {t('reviewsSection.verifiedBadge')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Instagram Lookbook Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-fashion font-bold text-[#121214]">
              {t('instagramSection.title')}
            </h3>
            <p className="text-xs text-[#7A777E]">
              {t('instagramSection.subtitle')}
            </p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#E01A68] hover:underline"
          >
            <Instagram className="w-4 h-4" />
            <span>{t('instagramSection.followCta')}</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="relative aspect-square rounded-xl overflow-hidden group">
            <img
              src="/src/assets/images/hero_campaign_pink_python_1793549856907.jpg"
              alt="Pink Python Style"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Instagram className="w-6 h-6" />
            </div>
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden group">
            <img
              src="/src/assets/images/product_tote_blush_python_1793549857261.jpg"
              alt="Pink Python Style"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Instagram className="w-6 h-6" />
            </div>
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden group">
            <img
              src="/src/assets/images/product_crossbody_hotpink_1793549858380.jpg"
              alt="Pink Python Style"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Instagram className="w-6 h-6" />
            </div>
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden group">
            <img
              src="/src/assets/images/product_clutch_noir_python_1793549858581.jpg"
              alt="Pink Python Style"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Instagram className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. VIP Salon Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-[#F5EDF0] border border-[#F4A7B9]/40 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="w-10 h-10 rounded-full bg-white text-[#E01A68] mx-auto flex items-center justify-center shadow-xs">
              <Mail className="w-5 h-5" />
            </span>
            <h3 className="text-2xl sm:text-3xl font-fashion font-bold text-[#121214]">
              {t('newsletter.title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#5F5C64] leading-relaxed">
              {t('newsletter.subtitle')}
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 bg-white rounded-xl border border-[#BBF7D0] text-xs text-[#15803D] font-medium flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#15803D]" />
                <span>{t('newsletter.success')}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder={t('newsletter.placeholder')}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-xs bg-white border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214] text-[#121214]"
                />
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                >
                  {t('newsletter.button')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
