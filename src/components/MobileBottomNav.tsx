import React from 'react';
import {
  Compass,
  TrendingUp,
  Layers,
  ShoppingBag,
  User as UserIcon,
  Sprout,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { User, Language } from '../types';
import { translations } from '../translations';

interface MobileBottomNavProps {
  currentUser: User | null;
  activeTab: string;
  cartCount: number;
  currentLanguage: Language;
  onSelectTab: (tab: string) => void;
  onOpenCart: () => void;
  onOpenPriceInsights: () => void;
  onOpenBulkHub: () => void;
  onOpenAuth: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentUser,
  activeTab,
  cartCount,
  currentLanguage,
  onSelectTab,
  onOpenCart,
  onOpenPriceInsights,
  onOpenBulkHub,
  onOpenAuth
}) => {
  const t = translations[currentLanguage];

  const handleDashboardClick = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (currentUser.role === 'farmer') {
      onSelectTab('farmer_dashboard');
    } else if (currentUser.role === 'admin') {
      onSelectTab('admin_dashboard');
    } else {
      onSelectTab('marketplace');
    }
  };

  const isDashboardActive =
    (currentUser?.role === 'farmer' && activeTab === 'farmer_dashboard') ||
    (currentUser?.role === 'admin' && activeTab === 'admin_dashboard');

  return (
    <nav
      id="mobile-bottom-navigation-bar"
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-40 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        {/* Tab 1: Explore Fresh Produce */}
        <button
          id="btn-mobile-nav-explore"
          onClick={() => onSelectTab('marketplace')}
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors cursor-pointer ${
            activeTab === 'marketplace'
              ? 'text-emerald-800 font-bold'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              activeTab === 'marketplace' ? 'bg-emerald-100 text-emerald-900 scale-110' : ''
            }`}
          >
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[58px]">
            {t.exploreProducts || 'Explore'}
          </span>
        </button>

        {/* Tab 2: Mandi Price Insights */}
        <button
          id="btn-mobile-nav-prices"
          onClick={onOpenPriceInsights}
          className="flex flex-col items-center justify-center h-full py-1 text-stone-500 hover:text-teal-700 font-medium transition-colors cursor-pointer"
        >
          <div className="p-1 rounded-xl transition-all">
            <TrendingUp className="w-5 h-5 text-teal-600" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[58px]">
            {t.priceInsights || 'Mandi Prices'}
          </span>
        </button>

        {/* Tab 3: Bulk / Group Hub */}
        <button
          id="btn-mobile-nav-bulk"
          onClick={onOpenBulkHub}
          className="flex flex-col items-center justify-center h-full py-1 text-stone-500 hover:text-amber-700 font-medium transition-colors cursor-pointer"
        >
          <div className="p-1 rounded-xl transition-all">
            <Layers className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[58px]">
            {t.bulkOrders || 'Bulk Hub'}
          </span>
        </button>

        {/* Tab 4: Cart with Real-time Count */}
        <button
          id="btn-mobile-nav-cart"
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center h-full py-1 text-stone-500 hover:text-emerald-800 font-medium transition-colors cursor-pointer"
        >
          <div className="relative p-1 rounded-xl transition-all">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-emerald-700 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[58px]">
            {t.cart || 'Cart'}
          </span>
        </button>

        {/* Tab 5: User Dashboard / Auth */}
        <button
          id="btn-mobile-nav-profile"
          onClick={handleDashboardClick}
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors cursor-pointer ${
            isDashboardActive
              ? 'text-emerald-800 font-bold'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              isDashboardActive ? 'bg-emerald-100 text-emerald-900 scale-110' : ''
            }`}
          >
            {currentUser?.role === 'farmer' ? (
              <Sprout className="w-5 h-5 text-emerald-700" />
            ) : currentUser?.role === 'admin' ? (
              <ShieldCheck className="w-5 h-5 text-purple-700" />
            ) : (
              <UserIcon className="w-5 h-5 text-stone-600" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[58px]">
            {currentUser?.role === 'farmer'
              ? 'Farm Desk'
              : currentUser?.role === 'admin'
              ? 'Admin'
              : currentUser
              ? 'Account'
              : t.login || 'Login'}
          </span>
        </button>
      </div>
    </nav>
  );
};
