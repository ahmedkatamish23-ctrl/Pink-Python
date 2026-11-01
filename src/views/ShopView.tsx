import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { lang, t, products } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Available unique colors across all bags
  const allColors = useMemo(() => {
    const map = new Map<string, { hex: string; nameEn: string; nameAr: string }>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.hex)) {
          map.set(c.hex, c);
        }
      });
    });
    return Array.from(map.values());
  }, [products]);

  // Categories list
  const categoriesList: Category[] = ['all', 'totes', 'crossbody', 'shoulder', 'clutches', 'mini'];

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesEn = p.nameEn.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.descriptionEn.toLowerCase().includes(q);
          const matchesAr = p.nameAr.toLowerCase().includes(q) || p.descriptionAr.toLowerCase().includes(q);
          if (!matchesEn && !matchesAr) return false;
        }

        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Color
        if (selectedColor !== 'all' && !p.colors.some((c) => c.hex === selectedColor)) {
          return false;
        }

        // Stock
        if (inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePriceEgp || a.priceEgp;
        const priceB = b.salePriceEgp || b.priceEgp;

        if (sortBy === 'price_asc') return priceA - priceB;
        if (sortBy === 'price_desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Featured
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, selectedColor, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedColor('all');
    setSortBy('featured');
    setInStockOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#E01A68]">
          {lang === 'ar' ? 'المتجر الإلكتروني' : 'The Boutique'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-fashion font-bold text-[#121214]">
          {t('shop.title')}
        </h1>
        <p className="text-xs sm:text-sm text-[#7A777E]">
          {t('shop.subtitle')}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#EAE5DF] shadow-xs space-y-5">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9B98]" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'ابحثي عن حقيبة، كود الموديل، الخامة...' : 'Search statement bags, SKU, leather...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-9 pe-4 py-2.5 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-[#7A777E] hover:text-[#121214]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort & In-stock Toggle */}
          <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
            <label className="flex items-center gap-2 text-xs text-[#5F5C64] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#E01A68] rounded cursor-pointer"
              />
              <span>{t('shop.inStockOnly')}</span>
            </label>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#9E9B98]" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-lg focus:outline-none focus:border-[#121214] text-[#121214]"
              >
                <option value="featured">{t('shop.sortFeatured')}</option>
                <option value="price_asc">{t('shop.sortPriceAsc')}</option>
                <option value="price_desc">{t('shop.sortPriceDesc')}</option>
                <option value="rating">{t('shop.sortRating')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Category Tabs (Interactive Filter Controls as permitted by constitution) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#F0EBE5] pt-4">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#121214] text-white shadow-xs'
                  : 'bg-[#F5F2EE] text-[#5F5C64] hover:bg-[#EAE5DF] hover:text-[#121214]'
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Row 3: Color Shade Filter */}
        <div className="flex items-center gap-3 pt-1 text-xs text-[#5F5C64]">
          <span className="font-semibold text-[#121214]">{t('shop.filterColor')}:</span>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedColor('all')}
              className={`px-2.5 py-1 text-[11px] rounded-md transition-colors ${
                selectedColor === 'all'
                  ? 'bg-[#121214] text-white'
                  : 'bg-[#F5F2EE] text-[#5F5C64] hover:text-[#121214]'
              }`}
            >
              {lang === 'ar' ? 'الكل' : 'All'}
            </button>
            {allColors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setSelectedColor(c.hex)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-md border transition-all ${
                  selectedColor === c.hex
                    ? 'border-[#121214] bg-white font-semibold text-[#121214] shadow-xs'
                    : 'border-[#EAE5DF] bg-[#FBF9F7] text-[#5F5C64] hover:border-[#121214]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                <span>{lang === 'ar' ? c.nameAr : c.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#7A777E]">
        <span>{t('shop.showingCount', { count: filteredProducts.length })}</span>
        {(selectedCategory !== 'all' || selectedColor !== 'all' || searchQuery || inStockOnly) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[#E01A68] hover:underline font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('shop.clearFilters')}</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#EAE5DF] space-y-4">
          <p className="text-sm font-medium text-[#121214]">{t('shop.noProducts')}</p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 text-xs font-semibold bg-[#121214] text-white rounded-lg hover:bg-[#E01A68] transition-colors"
          >
            {t('shop.clearFilters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
