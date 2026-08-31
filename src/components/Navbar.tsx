import React, { useState } from 'react';
import {
  Sprout,
  ShoppingBag,
  Bell,
  User as UserIcon,
  ShieldCheck,
  TrendingUp,
  Package,
  Users,
  Compass,
  Menu,
  X,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { User, Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentUser: User | null;
  currentLanguage: Language;
  cartCount: number;
  unreadNotificationsCount: number;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenCart: () => void;
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onChangeLanguage: (lang: Language) => void;
  onQuickSwitchUser: (email: string) => void;
  onOpenDemoTour: () => void;
  onOpenPriceInsights: () => void;
  onOpenBulkHub: () => void;
  onOpenGroupHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentLanguage,
  cartCount,
  unreadNotificationsCount,
  activeTab,
  onSelectTab,
  onOpenCart,
  onOpenNotifications,
  onOpenAuth,
  onLogout,
  onChangeLanguage,
  onQuickSwitchUser,
  onOpenDemoTour,
  onOpenPriceInsights,
  onOpenBulkHub,
  onOpenGroupHub
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const t = translations[currentLanguage];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* SIH Top Announcement / Demo Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="hidden sm:inline">Eliminating Unnecessary Intermediaries • 100% Direct Farmer Trade</span>
          <span className="sm:hidden">Direct Farmer Marketplace</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="btn-sih-demo-tour-top"
            onClick={onOpenDemoTour}
            className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>20-Step Demo Tour</span>
          </button>
          <div className="flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50">
            <span className="text-[10px] text-emerald-300">Lang:</span>
            <button
              id="btn-lang-en"
              onClick={() => onChangeLanguage('en')}
              className={`text-[11px] font-bold px-1 rounded transition-colors ${currentLanguage === 'en' ? 'text-amber-300 underline' : 'text-emerald-300 hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-emerald-700">|</span>
            <button
              id="btn-lang-hi"
              onClick={() => onChangeLanguage('hi')}
              className={`text-[11px] font-bold px-1 rounded transition-colors ${currentLanguage === 'hi' ? 'text-amber-300 underline' : 'text-emerald-300 hover:text-white'}`}
            >
              हिंदी
            </button>
            <span className="text-emerald-700">|</span>
            <button
              id="btn-lang-gu"
              onClick={() => onChangeLanguage('gu')}
              className={`text-[11px] font-bold px-1 rounded transition-colors ${currentLanguage === 'gu' ? 'text-amber-300 underline' : 'text-emerald-300 hover:text-white'}`}
            >
              ગુજરાતી
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              id="btn-nav-logo"
              onClick={() => onSelectTab('marketplace')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl sm:text-2xl text-emerald-950 tracking-tight flex items-center gap-1">
                  {t.appName}
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                </span>
                <p className="text-[10px] text-stone-500 font-medium -mt-1 hidden sm:block tracking-wide uppercase">
                  {t.tagline}
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-6">
              <button
                id="nav-tab-marketplace"
                onClick={() => onSelectTab('marketplace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'marketplace'
                    ? 'bg-emerald-100 text-emerald-900 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>{t.exploreProducts}</span>
              </button>

              <button
                id="nav-tab-home-landing"
                onClick={() => onSelectTab('landing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'landing'
                    ? 'bg-emerald-100 text-emerald-900 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>About & Impact</span>
              </button>

              <button
                id="nav-tab-price-insights"
                onClick={onOpenPriceInsights}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1.5"
              >
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span>{t.priceInsights}</span>
              </button>

              <button
                id="nav-tab-bulk-hub"
                onClick={onOpenBulkHub}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>{t.bulkOrders}</span>
              </button>

              <button
                id="nav-tab-group-buying"
                onClick={onOpenGroupHub}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1.5"
              >
                <Users className="w-4 h-4 text-indigo-600" />
                <span>{t.groupBuying}</span>
              </button>

              {/* Role specific links */}
              {currentUser?.role === 'farmer' && (
                <button
                  id="nav-tab-farmer-dashboard"
                  onClick={() => onSelectTab('farmer_dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'farmer_dashboard'
                      ? 'bg-emerald-800 text-white'
                      : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                  }`}
                >
                  <Sprout className="w-4 h-4" />
                  <span>{t.farmerDashboard}</span>
                </button>
              )}

              {currentUser?.role === 'admin' && (
                <button
                  id="nav-tab-admin-dashboard"
                  onClick={() => onSelectTab('admin_dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'admin_dashboard'
                      ? 'bg-purple-900 text-white'
                      : 'text-purple-900 bg-purple-50 hover:bg-purple-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.adminDashboard}</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right Action Icons & Persona Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Persona Switcher for SIH Presentation */}
            <div className="relative">
              <button
                id="btn-persona-switcher"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-stone-300 transition-all cursor-pointer"
                title="Quick switch demo user for SIH presentation"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="hidden md:inline">Demo Role:</span>
                <span className="font-bold text-emerald-800 capitalize">
                  {currentUser ? currentUser.role : 'Guest'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    SIH Demo Switcher
                  </div>
                  <button
                    id="btn-switch-farmer"
                    onClick={() => onQuickSwitchUser('farmer@example.com')}
                    className="w-full px-3 py-2 text-left hover:bg-emerald-50 flex items-center gap-2 text-xs font-medium text-stone-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                      👨‍🌾
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Rajesh Patel (Farmer)</p>
                      <p className="text-[10px] text-stone-500">List produce, manage orders, view earnings</p>
                    </div>
                  </button>

                  <button
                    id="btn-switch-buyer"
                    onClick={() => onQuickSwitchUser('buyer@example.com')}
                    className="w-full px-3 py-2 text-left hover:bg-emerald-50 flex items-center gap-2 text-xs font-medium text-stone-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                      🛒
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Anita Sharma (Buyer)</p>
                      <p className="text-[10px] text-stone-500">Discover fresh produce, order, rate</p>
                    </div>
                  </button>

                  <button
                    id="btn-switch-admin"
                    onClick={() => onQuickSwitchUser('admin@example.com')}
                    className="w-full px-3 py-2 text-left hover:bg-emerald-50 flex items-center gap-2 text-xs font-medium text-stone-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px]">
                      🛡️
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Platform Admin (SIH)</p>
                      <p className="text-[10px] text-stone-500">Verify farmers, analytics, moderation</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Button */}
            <button
              id="btn-notifications-drawer"
              onClick={onOpenNotifications}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="btn-cart-drawer"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">{t.cart}</span>
              {cartCount > 0 && (
                <span className="bg-emerald-700 text-white text-[11px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="btn-profile-tab"
                  onClick={() => {
                    if (currentUser.role === 'farmer') onSelectTab('farmer_dashboard');
                    else if (currentUser.role === 'admin') onSelectTab('admin_dashboard');
                    else onSelectTab('marketplace');
                  }}
                  className="flex items-center gap-2 p-1 pl-2 pr-3 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border border-emerald-600"
                  />
                  <span className="text-xs font-bold text-stone-800 max-w-[90px] truncate hidden sm:inline">
                    {currentUser.name}
                  </span>
                </button>
                <button
                  id="btn-nav-logout"
                  onClick={onLogout}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 hover:bg-rose-50 rounded transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                id="btn-nav-login"
                onClick={onOpenAuth}
                className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t.login}</span>
              </button>
            )}

            {/* Mobile Hamburger Menu */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              onSelectTab('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-100 flex items-center gap-2"
          >
            <Sprout className="w-4 h-4 text-emerald-600" />
            Home
          </button>
          <button
            onClick={() => {
              onSelectTab('marketplace');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-100 flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            {t.exploreProducts}
          </button>
          <button
            onClick={() => {
              onOpenPriceInsights();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-100 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-teal-600" />
            {t.priceInsights}
          </button>
          <button
            onClick={() => {
              onOpenBulkHub();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-100 flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-amber-600" />
            {t.bulkOrders}
          </button>
          <button
            onClick={() => {
              onOpenGroupHub();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-100 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-indigo-600" />
            {t.groupBuying}
          </button>
          {currentUser?.role === 'farmer' && (
            <button
              onClick={() => {
                onSelectTab('farmer_dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-emerald-700" />
              {t.farmerDashboard}
            </button>
          )}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => {
                onSelectTab('admin_dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-purple-950 bg-purple-50 hover:bg-purple-100 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              {t.adminDashboard}
            </button>
          )}
        </div>
      )}
    </header>
  );
};
