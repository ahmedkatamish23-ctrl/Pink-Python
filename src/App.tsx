/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/ToastContainer';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { WishlistView } from './views/WishlistView';
import { AdminDashboardView } from './views/AdminDashboardView';
import {
  AboutView,
  ShippingReturnsView,
  ContactView,
  FaqView,
  PolicyView,
} from './views/InfoViews';

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product':
        return <ProductDetailView />;
      case 'checkout':
        return <CheckoutView />;
      case 'confirmation':
        return <OrderConfirmationView />;
      case 'wishlist':
        return <WishlistView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'about':
        return <AboutView />;
      case 'shipping':
        return <ShippingReturnsView />;
      case 'contact':
        return <ContactView />;
      case 'faq':
        return <FaqView />;
      case 'privacy':
        return <PolicyView type="privacy" />;
      case 'terms':
        return <PolicyView type="terms" />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F7] text-[#121214] font-sans">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />

      {/* Global Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
