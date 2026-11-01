import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { lang, t, products, wishlistIds, setCurrentView } = useStore();

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="w-12 h-12 rounded-full bg-[#FCE7F0] text-[#E01A68] mx-auto flex items-center justify-center mb-2">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h1 className="text-3xl font-fashion font-bold text-[#121214]">
          {t('nav.wishlist')}
        </h1>
        <p className="text-xs sm:text-sm text-[#7A777E]">
          {lang === 'ar'
            ? 'حقائبكِ المفضلة محفوظة هنا لسهولة الرجوع إليها وإضافتها للحقيبة في أي وقت.'
            : 'Your saved statement bags. Review your favorites and add them to your shopping bag anytime.'}
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE5DF] max-w-md mx-auto space-y-4 shadow-xs">
          <p className="text-sm font-medium text-[#121214]">
            {lang === 'ar' ? 'قائمة المفضلة فارغة حالياً' : 'Your wishlist is currently empty.'}
          </p>
          <p className="text-xs text-[#7A777E]">
            {lang === 'ar'
              ? 'تصفحي مجموعات بينك بايثون واضغطي على علامة القلب لحفظ الحقيبة التي تعجبك.'
              : 'Browse our signature python collections and tap the heart icon on any bag to save it here.'}
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 bg-[#121214] text-white text-xs font-semibold rounded-xl hover:bg-[#E01A68] transition-colors"
          >
            {t('cart.continueShopping')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
