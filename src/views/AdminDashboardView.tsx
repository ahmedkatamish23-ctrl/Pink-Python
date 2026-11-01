import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, Category, Coupon } from '../types';
import {
  Shield,
  Key,
  TrendingUp,
  Package,
  ShoppingBag,
  Tag,
  Download,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  LogOut,
  Image,
  ExternalLink,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    lang,
    t,
    formatPrice,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    toggleCouponActive,
    announcementText,
    setAnnouncementText,
    showToast,
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'products' | 'coupons' | 'settings'>('analytics');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields for Product
  const [pNameEn, setPNameEn] = useState('');
  const [pNameAr, setPNameAr] = useState('');
  const [pSku, setPSku] = useState('');
  const [pCategory, setPCategory] = useState<Category>('totes');
  const [pPrice, setPPrice] = useState<number>(3800);
  const [pSalePrice, setPSalePrice] = useState<number | undefined>(undefined);
  const [pStock, setPStock] = useState<number>(10);
  const [pDimensionsEn, setPDimensionsEn] = useState('28cm x 20cm x 10cm');
  const [pDimensionsAr, setPDimensionsAr] = useState('٢٨ سم × ٢٠ سم × ١٠ سم');
  const [pMaterialsEn, setPMaterialsEn] = useState('Exotic embossed Italian leather, gold hardware');
  const [pMaterialsAr, setPMaterialsAr] = useState('جلد إيطالي محفور بنقشة البايثون، إكسسوارات ذهبية');
  const [pImage, setPImage] = useState('/src/assets/images/product_tote_blush_python_1793549857261.jpg');

  // Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponValue, setNewCouponValue] = useState<number>(15);
  const [newCouponMin, setNewCouponMin] = useState<number>(2500);

  // Status Filter for Orders
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Analytics Math
  const analytics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.total : sum), 0);
    const avgOrder = orders.length > 0 ? Math.round(totalRev / orders.length) : 0;
    const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'confirmed').length;
    const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
    const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

    return { totalRev, avgOrder, pendingOrders, shippedOrders, deliveredOrders };
  }, [orders]);

  // Orders Filtered
  const filteredOrders = useMemo(() => {
    if (orderStatusFilter === 'all') return orders;
    return orders.filter((o) => o.status === orderStatusFilter);
  }, [orders, orderStatusFilter]);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(pinInput);
  };

  // Open Edit Product Modal
  const openEditModal = (product: Product) => {
    setEditingProductId(product.id);
    setPNameEn(product.nameEn);
    setPNameAr(product.nameAr);
    setPSku(product.sku);
    setPCategory(product.category);
    setPPrice(product.priceEgp);
    setPSalePrice(product.salePriceEgp);
    setPStock(product.stock);
    setPDimensionsEn(product.dimensionsEn);
    setPDimensionsAr(product.dimensionsAr);
    setPMaterialsEn(product.materialsEn);
    setPMaterialsAr(product.materialsAr);
    setPImage(product.images[0] || '');
    setIsProductModalOpen(true);
  };

  // Open Add Product Modal
  const openAddModal = () => {
    setEditingProductId(null);
    setPNameEn('');
    setPNameAr('');
    setPSku(`PP-NEW-${Math.floor(10 + Math.random() * 90)}`);
    setPCategory('crossbody');
    setPPrice(3500);
    setPSalePrice(undefined);
    setPStock(8);
    setPDimensionsEn('24cm x 18cm x 8cm');
    setPDimensionsAr('٢٤ سم × ١٨ سم × ٨ سم');
    setPMaterialsEn('Exotic python embossed calfskin with brushed pale gold fittings');
    setPMaterialsAr('جلد عجل فاخر بنقشة البايثون البارزة وإكسسوارات ذهبية مطفية');
    setPImage('/src/assets/images/product_crossbody_hotpink_1793549858380.jpg');
    setIsProductModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pNameEn || !pNameAr) {
      showToast('Please provide both English and Arabic names', 'error');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, {
        nameEn: pNameEn,
        nameAr: pNameAr,
        sku: pSku,
        category: pCategory as any,
        priceEgp: Number(pPrice),
        salePriceEgp: pSalePrice ? Number(pSalePrice) : undefined,
        stock: Number(pStock),
        dimensionsEn: pDimensionsEn,
        dimensionsAr: pDimensionsAr,
        materialsEn: pMaterialsEn,
        materialsAr: pMaterialsAr,
        images: [pImage],
      });
    } else {
      addProduct({
        sku: pSku,
        nameEn: pNameEn,
        nameAr: pNameAr,
        taglineEn: 'Sculpted exotic statement luxury handbag.',
        taglineAr: 'حقيبة يد استثنائية من جلد البايثون الفاخر.',
        category: pCategory as any,
        priceEgp: Number(pPrice),
        salePriceEgp: pSalePrice ? Number(pSalePrice) : undefined,
        stock: Number(pStock),
        descriptionEn: 'Meticulously handcrafted in Cairo atelier.',
        descriptionAr: 'مصنوعة يدوياً بدقة فائقة في مشغل القاهرة.',
        materialsEn: pMaterialsEn,
        materialsAr: pMaterialsAr,
        dimensionsEn: pDimensionsEn,
        dimensionsAr: pDimensionsAr,
        colors: [
          { nameEn: 'Blush Python', nameAr: 'وردي بايثون', hex: '#EBB4C0' },
          { nameEn: 'Noir Black', nameAr: 'أسود ملوكي', hex: '#161618' },
        ],
        images: [pImage],
        rating: 5.0,
        reviewsCount: 1,
        featuresEn: ['Hand-finished python embossing', 'Protective gold base feet'],
        featuresAr: ['نقشة بايثون بارزة ومصقولة يدوياً', 'قواعد ذهبية لحماية القاعدة'],
      });
    }

    setIsProductModalOpen(false);
  };

  // Add Coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      value: Number(newCouponValue),
      minOrderAmount: Number(newCouponMin),
      isActive: true,
      descriptionEn: `${newCouponValue}${newCouponType === 'percentage' ? '%' : ' EGP'} off orders above ${newCouponMin} EGP`,
      descriptionAr: `خصم ${newCouponValue}${newCouponType === 'percentage' ? '٪' : ' جنيه'} للطلبات أكثر من ${newCouponMin} جنيه`,
    });

    setNewCouponCode('');
  };

  // CSV Export for Orders
  const exportOrdersCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer Name', 'Phone', 'Governorate', 'City', 'Payment Method', 'Payment Status', 'Order Status', 'Total EGP'];
    const rows = orders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customer.fullName.replace(/"/g, '""')}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.governorate}"`,
      `"${o.customer.city}"`,
      o.paymentMethod,
      o.paymentStatus,
      o.status,
      o.total,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PinkPython_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders report downloaded as CSV', 'success');
  };

  // CSV Export for Products
  const exportProductsCSV = () => {
    const headers = ['SKU', 'Name (EN)', 'Category', 'Price (EGP)', 'Sale Price (EGP)', 'Stock', 'Rating'];
    const rows = products.map((p) => [
      p.sku,
      `"${p.nameEn.replace(/"/g, '""')}"`,
      p.category,
      p.priceEgp,
      p.salePriceEgp || '',
      p.stock,
      p.rating,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PinkPython_Inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inventory report downloaded as CSV', 'success');
  };

  // 1. PIN Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl p-8 border border-[#EAE5DF] shadow-xl text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#121214] text-[#F4A7B9] mx-auto flex items-center justify-center shadow-md">
            <Shield className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl font-fashion font-bold text-[#121214]">
              {t('admin.loginTitle')}
            </h2>
            <p className="text-xs text-[#7A777E] mt-1">
              {t('admin.loginDesc')}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="relative">
              <Key className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9B98]" />
              <input
                type="password"
                placeholder={t('admin.pinPlaceholder')}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full ps-10 pe-4 py-3 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              {t('admin.loginBtn')}
            </button>
          </form>

          <div className="pt-4 border-t border-[#F0EBE5]">
            <button
              type="button"
              onClick={() => adminLogin('pinkpython2026')}
              className="text-xs text-[#E01A68] hover:underline font-semibold"
            >
              ⚡ {t('admin.quickDemoBtn')} (PIN: pinkpython2026)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Full Admin Dashboard Screen
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE5DF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#E01A68]">
              Pink Python Atelier Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-fashion font-bold text-[#121214]">
            {t('admin.title')}
          </h1>
          <p className="text-xs text-[#7A777E]">
            {t('admin.subtitle')}
          </p>
        </div>

        <button
          onClick={adminLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F2ECE4] border border-[#E5DFD7] rounded-xl text-xs font-semibold text-[#DC2626] transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('admin.logout')}</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#EAE5DF]">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'analytics' ? 'bg-[#121214] text-white' : 'bg-white text-[#5F5C64] hover:bg-[#F5F2EE]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{t('admin.tabAnalytics')}</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'orders' ? 'bg-[#121214] text-white' : 'bg-white text-[#5F5C64] hover:bg-[#F5F2EE]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{t('admin.tabOrders')} ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'products' ? 'bg-[#121214] text-white' : 'bg-white text-[#5F5C64] hover:bg-[#F5F2EE]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t('admin.tabProducts')} ({products.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'coupons' ? 'bg-[#121214] text-white' : 'bg-white text-[#5F5C64] hover:bg-[#F5F2EE]'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>{t('admin.tabCoupons')} ({coupons.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'settings' ? 'bg-[#121214] text-white' : 'bg-white text-[#5F5C64] hover:bg-[#F5F2EE]'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>{t('admin.tabExport')} & Banners</span>
        </button>
      </div>

      {/* TAB 1: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EAE5DF] shadow-xs">
              <span className="text-xs text-[#7A777E] font-medium block mb-1">
                {t('admin.totalRevenue')}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#121214]">
                {formatPrice(analytics.totalRev)}
              </span>
              <span className="text-[11px] text-[#22C55E] block mt-1">
                +18.4% vs last month (Egypt)
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE5DF] shadow-xs">
              <span className="text-xs text-[#7A777E] font-medium block mb-1">
                {t('admin.totalOrders')}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#121214]">
                {orders.length}
              </span>
              <span className="text-[11px] text-[#7A777E] block mt-1">
                Across 27 governorates
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE5DF] shadow-xs">
              <span className="text-xs text-[#7A777E] font-medium block mb-1">
                {t('admin.avgOrderValue')}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#121214]">
                {formatPrice(analytics.avgOrder)}
              </span>
              <span className="text-[11px] text-[#E01A68] block mt-1">
                Luxury statement basket
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE5DF] shadow-xs">
              <span className="text-xs text-[#7A777E] font-medium block mb-1">
                {t('admin.pendingShipments')}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#E01A68]">
                {analytics.pendingOrders}
              </span>
              <span className="text-[11px] text-[#7A777E] block mt-1">
                Ready for Cairo courier dispatch
              </span>
            </div>
          </div>

          {/* Quick Recent Orders */}
          <div className="bg-white rounded-3xl p-6 border border-[#EAE5DF] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#121214]">
              {lang === 'ar' ? 'أحدث طلبات العميلات في مصر' : 'Recent Egyptian Orders'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-[#FBF9F7] text-[#7A777E] border-b border-[#EAE5DF]">
                  <tr>
                    <th className="p-3 text-start">{t('admin.orderStatus')}</th>
                    <th className="p-3 text-start">{t('admin.customer')}</th>
                    <th className="p-3 text-start">{t('admin.governorate')}</th>
                    <th className="p-3 text-start">{t('admin.total')}</th>
                    <th className="p-3 text-start">{t('admin.date')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE5]">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-[#FBF9F7]">
                      <td className="p-3">
                        <span className="font-mono font-bold text-[#121214] block">{o.orderNumber}</span>
                        <span className="text-[10px] text-[#7A777E] capitalize">{o.status}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-[#121214] block">{o.customer.fullName}</span>
                        <span className="text-[11px] font-mono text-[#7A777E]">{o.customer.phone}</span>
                      </td>
                      <td className="p-3 text-[#5F5C64]">{o.customer.governorate}</td>
                      <td className="p-3 font-mono font-bold text-[#121214]">{formatPrice(o.total)}</td>
                      <td className="p-3 text-[#7A777E]">{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                    orderStatusFilter === st
                      ? 'bg-[#121214] text-white'
                      : 'bg-white text-[#5F5C64] hover:bg-[#F5F2EE] border border-[#EAE5DF]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              onClick={exportOrdersCSV}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#F2ECE4] border border-[#E5DFD7] rounded-xl text-xs font-semibold text-[#121214] self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('admin.exportOrdersCsv')}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-[#EAE5DF] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-[#FBF9F7] text-[#7A777E] border-b border-[#EAE5DF]">
                  <tr>
                    <th className="p-3 text-start">Reference</th>
                    <th className="p-3 text-start">Customer Details</th>
                    <th className="p-3 text-start">Delivery Address</th>
                    <th className="p-3 text-start">Items</th>
                    <th className="p-3 text-start">Payment</th>
                    <th className="p-3 text-start">Status</th>
                    <th className="p-3 text-start">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE5]">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FBF9F7] transition-colors">
                      <td className="p-3">
                        <span className="font-mono font-bold text-[#121214] block">{ord.orderNumber}</span>
                        <span className="text-[10px] text-[#7A777E]">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-[#121214] block">{ord.customer.fullName}</span>
                        <span className="font-mono text-[#E01A68] block">{ord.customer.phone}</span>
                        <span className="text-[11px] text-[#7A777E]">{ord.customer.email}</span>
                      </td>
                      <td className="p-3 max-w-xs text-[#5F5C64]">
                        <span className="font-semibold text-[#121214] block">
                          {ord.customer.governorate} · {ord.customer.city}
                        </span>
                        <span className="text-[11px] line-clamp-1">{ord.customer.address}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-[#121214] block">{ord.items.length} pcs</span>
                        <span className="font-mono font-bold text-[#121214]">{formatPrice(ord.total)}</span>
                      </td>
                      <td className="p-3">
                        <span className="uppercase text-[10px] font-bold block text-[#121214]">
                          {ord.paymentMethod}
                        </span>
                        <span
                          className={`text-[10px] font-semibold capitalize px-1.5 py-0.5 rounded ${
                            ord.paymentStatus === 'paid' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#B45309]'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`text-xs font-bold capitalize px-2.5 py-1 rounded-md ${
                            ord.status === 'delivered'
                              ? 'bg-[#DCFCE7] text-[#15803D]'
                              : ord.status === 'shipped'
                              ? 'bg-[#E0E7FF] text-[#4338CA]'
                              : ord.status === 'processing'
                              ? 'bg-[#FCE7F0] text-[#E01A68]'
                              : ord.status === 'cancelled'
                              ? 'bg-[#FEE2E2] text-[#DC2626]'
                              : 'bg-[#F5F2EE] text-[#121214]'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={ord.status}
                          onChange={(e: any) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="px-2 py-1 text-[11px] bg-white border border-[#E5DFD7] rounded-md focus:outline-none focus:border-[#121214]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Products & Inventory Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#121214]">
              {products.length} {lang === 'ar' ? 'حقائب بالكتالوج' : 'Handbags in Catalog'}
            </h3>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t('admin.addProduct')}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-[#EAE5DF] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-[#FBF9F7] text-[#7A777E] border-b border-[#EAE5DF]">
                  <tr>
                    <th className="p-3 text-start">Photo</th>
                    <th className="p-3 text-start">SKU / Bag Name</th>
                    <th className="p-3 text-start">Category</th>
                    <th className="p-3 text-start">Price (EGP)</th>
                    <th className="p-3 text-start">Stock</th>
                    <th className="p-3 text-start">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE5]">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FBF9F7] transition-colors">
                      <td className="p-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.nameEn}
                          className="w-12 h-14 object-cover rounded-md bg-[#F5F2EE]"
                        />
                      </td>
                      <td className="p-3">
                        <span className="font-mono text-[11px] text-[#7A777E]">{prod.sku}</span>
                        <h4 className="font-semibold text-sm text-[#121214]">{prod.nameEn}</h4>
                        <span className="text-xs text-[#5F5C64]">{prod.nameAr}</span>
                      </td>
                      <td className="p-3 uppercase text-[11px] font-semibold text-[#5F5C64]">
                        {prod.category}
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-[#121214] block">
                          {formatPrice(prod.salePriceEgp || prod.priceEgp)}
                        </span>
                        {prod.salePriceEgp && (
                          <span className="text-[10px] font-mono text-[#9E9B98] line-through">
                            {formatPrice(prod.priceEgp)}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-mono font-bold text-xs ${
                            prod.stock < 5 ? 'text-[#DC2626]' : 'text-[#121214]'
                          }`}
                        >
                          {prod.stock} units
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(prod)}
                            className="p-1.5 text-[#5F5C64] hover:text-[#121214] rounded-md hover:bg-[#F2ECE4] transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 text-[#DC2626] hover:bg-[#FEE2E2] rounded-md transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Coupons Management */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Coupon Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#EAE5DF] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#121214]">
              {t('admin.addCoupon')}
            </h3>

            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP20"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono uppercase bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">
                    Discount Type
                  </label>
                  <select
                    value={newCouponType}
                    onChange={(e: any) => setNewCouponType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed EGP (جنيه)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    required
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1">
                  Minimum Order (EGP)
                </label>
                <input
                  type="number"
                  required
                  value={newCouponMin}
                  onChange={(e) => setNewCouponMin(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
              >
                Create Promo Voucher
              </button>
            </form>
          </div>

          {/* Existing Coupons List (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#EAE5DF] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#121214]">
              Active Discount Coupons ({coupons.length})
            </h3>

            <div className="space-y-3">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-4 rounded-2xl border border-[#EAE5DF] flex items-center justify-between bg-[#FBF9F7]"
                >
                  <div>
                    <span className="font-mono text-sm font-bold text-[#121214] block">{c.code}</span>
                    <span className="text-xs text-[#5F5C64]">
                      {c.discountType === 'percentage' ? `${c.value}% off` : `${c.value} EGP off`} · Min order: {formatPrice(c.minOrderAmount)}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleCouponActive(c.code)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      c.isActive ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#DC2626]'
                    }`}
                  >
                    {c.isActive ? 'Active' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Settings, Banners & CSV Export */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Announcement Bar Customizer */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DF] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#121214]">
              Store Announcement Bar Text
            </h3>
            <p className="text-xs text-[#7A777E]">
              Customize the message shown to Egyptian shoppers across the top banner.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1">
                  English Text
                </label>
                <input
                  type="text"
                  value={announcementText.en}
                  onChange={(e) => setAnnouncementText({ ...announcementText, en: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1">
                  Arabic Text (النص العربي)
                </label>
                <input
                  type="text"
                  value={announcementText.ar}
                  onChange={(e) => setAnnouncementText({ ...announcementText, ar: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5DFD7] rounded-xl focus:outline-none focus:border-[#121214]"
                />
              </div>

              <button
                onClick={() => showToast('Announcement bar updated', 'success')}
                className="py-2.5 px-4 bg-[#121214] text-white text-xs font-semibold rounded-xl hover:bg-[#E01A68] transition-colors"
              >
                Save Announcement
              </button>
            </div>
          </div>

          {/* Export Reports Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DF] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#121214]">
              Data Export & Backups
            </h3>
            <p className="text-xs text-[#7A777E]">
              Download full boutique transaction logs and inventory status in CSV format for Excel/accounting.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={exportOrdersCSV}
                className="w-full py-3.5 px-4 bg-[#FBF9F7] hover:bg-[#F2ECE4] border border-[#E5DFD7] rounded-xl text-xs font-semibold text-[#121214] flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-[#E01A68]" />
                <span>Download All Customer Orders (CSV)</span>
              </button>

              <button
                onClick={exportProductsCSV}
                className="w-full py-3.5 px-4 bg-[#FBF9F7] hover:bg-[#F2ECE4] border border-[#E5DFD7] rounded-xl text-xs font-semibold text-[#121214] flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-[#121214]" />
                <span>Download Handbag Catalog & Stock (CSV)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            onClick={() => setIsProductModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="relative bg-[#FBF9F7] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EAE5DF] z-10 space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-fashion font-bold text-[#121214]">
              {editingProductId ? t('admin.editProduct') : t('admin.addProduct')}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">
                    Bag Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pNameEn}
                    onChange={(e) => setPNameEn(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD7] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">
                    Bag Name (Arabic) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pNameAr}
                    onChange={(e) => setPNameAr(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD7] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={pSku}
                    onChange={(e) => setPSku(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#E5DFD7] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">Category</label>
                  <select
                    value={pCategory}
                    onChange={(e: any) => setPCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD7] rounded-xl focus:outline-none"
                  >
                    <option value="totes">Grand Totes</option>
                    <option value="crossbody">Crossbody Bags</option>
                    <option value="shoulder">Shoulder Bags</option>
                    <option value="clutches">Evening Clutches</option>
                    <option value="mini">Mini & Vanity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">Price (EGP) *</label>
                  <input
                    type="number"
                    required
                    value={pPrice}
                    onChange={(e) => setPPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#E5DFD7] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">
                    Sale Price (EGP - Optional)
                  </label>
                  <input
                    type="number"
                    value={pSalePrice || ''}
                    onChange={(e) => setPSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#E5DFD7] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={pStock}
                    onChange={(e) => setPStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#E5DFD7] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121214] mb-1">Image URL</label>
                  <input
                    type="text"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#E5DFD7] rounded-xl focus:outline-none truncate"
                  />
                </div>
              </div>

              {/* Sample Quick Image Pickers */}
              <div>
                <label className="block text-xs font-semibold text-[#121214] mb-1.5">
                  Or Pick Existing Luxury Photo Asset:
                </label>
                <div className="flex gap-2">
                  {[
                    '/src/assets/images/product_tote_blush_python_1793549857261.jpg',
                    '/src/assets/images/product_crossbody_hotpink_1793549858380.jpg',
                    '/src/assets/images/product_clutch_noir_python_1793549858581.jpg',
                    '/src/assets/images/product_shoulder_sand_python_1793549859075.jpg',
                  ].map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPImage(img)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${
                        pImage === img ? 'border-[#E01A68]' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EAE5DF]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5F5C64] hover:text-[#121214]"
                >
                  {t('admin.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#121214] hover:bg-[#E01A68] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                >
                  {t('admin.saveChanges')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
