import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Coupon,
  Language,
  ProductColor,
  OrderStatus,
  Banner,
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_BANNERS } from '../data/products';
import { FREE_SHIPPING_THRESHOLD_EGP, EGYPTIAN_GOVERNORATES } from '../data/governorates';
import { translations } from '../i18n/translations';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatPrice: (amount: number) => string;
  currentView: string;
  setCurrentView: (view: string, productId?: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, colorHex: string) => void;
  updateCartQuantity: (productId: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingUpdates'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, noteEn?: string, noteAr?: string) => void;
  latestOrderId: string | null;
  // Admin
  isAdminLoggedIn: boolean;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
  // Banners & Announcement
  banners: Banner[];
  updateBanner: (id: string, banner: Partial<Banner>) => void;
  announcementText: { en: string; ar: string };
  setAnnouncementText: (val: { en: string; ar: string }) => void;
  // Coupons list
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCouponActive: (code: string) => void;
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-10482',
    orderNumber: 'PP-EG-10482',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        quantity: 1,
      },
    ],
    subtotal: 4250,
    shippingFee: 0,
    discount: 400,
    total: 3850,
    customer: {
      fullName: 'Farida El-Gazzar',
      phone: '01019283746',
      email: 'farida.gazzar@example.com',
      governorate: 'Cairo',
      city: 'Zamalek',
      address: 'Boutique 4, Brazil Street',
      deliveryNotes: 'Call before arriving',
    },
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'shipped',
    couponCode: 'CAIROVIP',
    createdAt: '2026-10-30T14:32:00Z',
    trackingUpdates: [
      {
        status: 'pending',
        timestamp: '2026-10-30T14:32:00Z',
        noteEn: 'Order received and logged in Cairo atelier queue',
        noteAr: 'تم استلام الطلب وتأكيده في مشغل القاهرة',
      },
      {
        status: 'confirmed',
        timestamp: '2026-10-30T15:10:00Z',
        noteEn: 'Customer details verified by concierge',
        noteAr: 'تم التحقق من بيانات العنوان والاتصال مع العميل',
      },
      {
        status: 'processing',
        timestamp: '2026-10-30T17:45:00Z',
        noteEn: 'Handbag hand-buffed, packed in gift box and dust bag',
        noteAr: 'تم تلميع الحقيبة وتغليفها داخل صندوق الهدايا وكيس الحفظ المخملي',
      },
      {
        status: 'shipped',
        timestamp: '2026-10-31T09:15:00Z',
        noteEn: 'Handed to Cairo Express Courier for delivery',
        noteAr: 'تم تسليم الشحنة لمندوب التوصيل السريع بالقاهرة',
      },
    ],
  },
  {
    id: 'ord-10483',
    orderNumber: 'PP-EG-10483',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        selectedColor: INITIAL_PRODUCTS[1].colors[0],
        quantity: 1,
      },
    ],
    subtotal: 3450,
    shippingFee: 75,
    discount: 0,
    total: 3525,
    customer: {
      fullName: 'Mariam Zahran',
      phone: '01228491029',
      email: 'mariam.z@example.com',
      governorate: 'Alexandria',
      city: 'Roushdy',
      address: 'Villa 12, Syria Street',
    },
    paymentMethod: 'paymob_card',
    paymentStatus: 'paid',
    status: 'processing',
    createdAt: '2026-10-31T18:20:00Z',
    trackingUpdates: [
      {
        status: 'confirmed',
        timestamp: '2026-10-31T18:20:00Z',
        noteEn: 'Card payment verified via Paymob Gateway (EGP 3,525)',
        noteAr: 'تم سداد المبلغ بنجاح عبر بوابة Paymob (٣,٥٢٥ ج.م)',
      },
      {
        status: 'processing',
        timestamp: '2026-11-01T08:00:00Z',
        noteEn: 'Quality inspection underway before Alexandria dispatch',
        noteAr: 'جاري الفحص النهائي للجودة قبل الشحن للإسكندرية',
      },
    ],
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language & Direction state
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('pink_python_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('pink_python_lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // Translation helper
  const t = (path: string, params?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let current: any = translations[lang];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback: any = translations['en'];
        for (const fKey of keys) {
          if (fallback && typeof fallback === 'object' && fKey in fallback) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current !== 'string') return path;

    if (params) {
      let result = current;
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
      return result;
    }
    return current;
  };

  // Egyptian Currency Formatter
  const formatPrice = (amount: number): string => {
    const formatted = new Intl.NumberFormat('en-US').format(amount);
    if (lang === 'ar') {
      return `${formatted} ج.م`;
    }
    return `${formatted} EGP`;
  };

  // View Routing
  const [currentView, setCurrentViewState] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const setCurrentView = (view: string, productId?: string) => {
    setCurrentViewState(view);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pink_python_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('pink_python_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `pp-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(lang === 'ar' ? 'تمت إضافة الحقيبة للكتالوج بنجاح' : 'Handbag added to catalog', 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast(lang === 'ar' ? 'تم حفظ تعديلات الحقيبة' : 'Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(lang === 'ar' ? 'تم حذف الحقيبة من الكتالوج' : 'Product removed from catalog', 'info');
  };

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pink_python_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('pink_python_cart', JSON.stringify(cart));
  }, [cart]);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const addToCart = (product: Product, color: ProductColor, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.hex === color.hex
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, selectedColor: color, quantity }];
      }
    });
    showToast(
      lang === 'ar'
        ? `أضيفت ${product.nameAr} إلى حقيبتكِ`
        : `Added ${product.nameEn} to your bag`,
      'success'
    );
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, colorHex: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor.hex === colorHex)
      )
    );
    showToast(lang === 'ar' ? 'تمت إزالة القطعة من الحقيبة' : 'Item removed from bag', 'info');
  };

  const updateCartQuantity = (productId: string, colorHex: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorHex);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor.hex === colorHex) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    const price = item.product.salePriceEgp || item.product.priceEgp;
    return acc + price * item.quantity;
  }, 0);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('pink_python_coupons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!coupon) {
      return {
        success: false,
        message: lang === 'ar' ? 'كود الخصم غير صحيح أو غير مفعّل' : 'Invalid or expired voucher code',
      };
    }

    if (cartSubtotal < coupon.minOrderAmount) {
      return {
        success: false,
        message:
          lang === 'ar'
            ? `الحد الأدنى لاستخدام هذا الكود هو ${formatPrice(coupon.minOrderAmount)}`
            : `Minimum order value for this code is ${formatPrice(coupon.minOrderAmount)}`,
      };
    }

    setAppliedCoupon(coupon);
    showToast(
      lang === 'ar'
        ? `تم تفعيل كود الخصم ${coupon.code} بنجاح!`
        : `Voucher ${coupon.code} applied successfully!`,
      'success'
    );
    return {
      success: true,
      message: lang === 'ar' ? 'تم تطبيق الخصم' : 'Discount applied',
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast(lang === 'ar' ? 'تمت إزالة كود الخصم' : 'Voucher removed', 'info');
  };

  const cartDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedCoupon.value) / 100)
      : appliedCoupon.value
    : 0;

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('pink_python_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('pink_python_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(lang === 'ar' ? 'تمت الإزالة من قائمة المفضلة' : 'Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(lang === 'ar' ? 'أضيفت الحقيبة إلى مفضلتكِ' : 'Added to wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('pink_python_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return SAMPLE_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('pink_python_orders', JSON.stringify(orders));
  }, [orders]);

  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

  const createOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingUpdates'>
  ): Order => {
    const orderNum = `PP-EG-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      trackingUpdates: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          noteEn: 'Order received and logged in Cairo atelier queue',
          noteAr: 'تم استلام الطلب وتأكيده في مشغل القاهرة',
        },
      ],
    };

    // Decrement stock for ordered items
    setProducts((prev) =>
      prev.map((product) => {
        const orderedItem = orderData.items.find((item) => item.product.id === product.id);
        if (orderedItem) {
          return {
            ...product,
            stock: Math.max(0, product.stock - orderedItem.quantity),
          };
        }
        return product;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrderId(newOrder.id);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    noteEn?: string,
    noteAr?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updateStep = {
            status,
            timestamp: new Date().toISOString(),
            noteEn: noteEn || `Status updated to ${status}`,
            noteAr: noteAr || `تم تحديث حالة الطلب إلى ${status}`,
          };
          return {
            ...order,
            status,
            paymentStatus: status === 'delivered' ? 'paid' : order.paymentStatus,
            trackingUpdates: [...order.trackingUpdates, updateStep],
          };
        }
        return order;
      })
    );
    showToast(lang === 'ar' ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated', 'success');
  };

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('pink_python_admin_auth') === 'true';
  });

  const adminLogin = (pin: string): boolean => {
    if (pin === 'pinkpython2026' || pin === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('pink_python_admin_auth', 'true');
      showToast(lang === 'ar' ? 'مرحباً بكِ في لوحة التحكم' : 'Welcome to Store Admin', 'success');
      return true;
    }
    showToast(lang === 'ar' ? 'رمز الدخول غير صحيح' : 'Invalid PIN code', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pink_python_admin_auth');
    showToast(lang === 'ar' ? 'تم تسجيل الخروج من الإدارة' : 'Logged out of admin', 'info');
  };

  // Banners & Announcement
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);

  const updateBanner = (id: string, updates: Partial<Banner>) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    showToast(lang === 'ar' ? 'تم حفظ إعدادات البنر' : 'Banner updated', 'success');
  };

  const [announcementText, setAnnouncementText] = useState({
    en: 'Complimentary Express Delivery across Egypt on orders over 3,500 EGP · Cash on Delivery Available',
    ar: 'توصيل مجاني سريع لجميع محافظات مصر للطلبات أكثر من ٣,٥٠٠ جنيه · الدفع عند الاستلام متاح',
  });

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showToast(lang === 'ar' ? 'تمت إضافة قسيمة التخفيض' : 'Coupon voucher created', 'success');
  };

  const toggleCouponActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        formatPrice,
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        latestOrderId,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        banners,
        updateBanner,
        announcementText,
        setAnnouncementText,
        coupons,
        addCoupon,
        toggleCouponActive,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
