export type Language = 'en' | 'ar';

export type Category = 'all' | 'totes' | 'crossbody' | 'shoulder' | 'clutches' | 'mini';

export interface ProductColor {
  nameEn: string;
  nameAr: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  category: 'totes' | 'crossbody' | 'shoulder' | 'clutches' | 'mini';
  priceEgp: number;
  salePriceEgp?: number;
  descriptionEn: string;
  descriptionAr: string;
  materialsEn: string;
  materialsAr: string;
  dimensionsEn: string;
  dimensionsAr: string;
  colors: ProductColor[];
  images: string[];
  stock: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount: number;
  featuresEn: string[];
  featuresAr: string[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'cod' | 'paymob_card';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  governorate: string;
  city: string;
  address: string;
  buildingOrApt?: string;
  deliveryNotes?: string;
}

export interface TrackingStep {
  status: OrderStatus;
  timestamp: string;
  noteEn: string;
  noteAr: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  couponCode?: string;
  createdAt: string;
  trackingUpdates: TrackingStep[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10%, or 300 for 300 EGP
  minOrderAmount: number;
  isActive: boolean;
  descriptionEn: string;
  descriptionAr: string;
}

export interface Governorate {
  id: string;
  nameEn: string;
  nameAr: string;
  shippingFee: number;
  estimatedDaysEn: string;
  estimatedDaysAr: string;
}

export interface Banner {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  badgeEn?: string;
  badgeAr?: string;
  linkTextEn: string;
  linkTextAr: string;
  linkTarget: string;
  imageUrl: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  author: string;
  cityEn: string;
  cityAr: string;
  rating: number;
  titleEn: string;
  titleAr: string;
  commentEn: string;
  commentAr: string;
  productName: string;
  date: string;
  verified: boolean;
}
