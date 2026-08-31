import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Leaf,
  Star,
  SlidersHorizontal,
  ArrowUpDown,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Layers,
  CheckCircle2,
  Clock,
  Compass,
  X,
  RotateCcw
} from 'lucide-react';
import { Product, ProductCategory, Order, Language } from '../types';
import { translations } from '../translations';
import { ProductCard } from './ProductCard';

interface BuyerDashboardProps {
  products: Product[];
  activeOrders: Order[];
  currentLanguage: Language;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenOrderTracking: (orderId: string) => void;
  onOpenPriceInsights: () => void;
  onOpenBulkHub: () => void;
  onOpenGroupHub: () => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  products,
  activeOrders,
  currentLanguage,
  onViewProduct,
  onAddToCart,
  onOpenOrderTracking,
  onOpenPriceInsights,
  onOpenBulkHub,
  onOpenGroupHub
}) => {
  const t = translations[currentLanguage];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number>(150);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'distance' | 'price_asc' | 'price_desc' | 'rating'>('distance');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: t.allCategories, icon: '🌾' },
    { id: 'vegetables', label: t.vegetables, icon: '🥦' },
    { id: 'fruits', label: t.fruits, icon: '🍎' },
    { id: 'grains', label: t.grains, icon: '🌾' },
    { id: 'pulses', label: t.pulses, icon: '🫘' },
    { id: 'spices', label: t.spices, icon: '🌶️' },
    { id: 'dairy', label: t.dairy, icon: '🥛' },
    { id: 'oilseeds', label: t.oilseeds, icon: '🥜' }
  ];

  const locations = [
    { id: 'all', label: 'All Regions (India)' },
    { id: 'Anand', label: 'Anand District, Gujarat (8 km)' },
    { id: 'Rajkot', label: 'Rajkot, Gujarat (42 km)' },
    { id: 'Junagadh', label: 'Junagadh, Gujarat (120 km)' },
    { id: 'Ahmedabad', label: 'Ahmedabad Direct Zone (15 km)' }
  ];

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (organicOnly) count++;
    if (maxDistance < 150) count++;
    if (maxPrice < 500) count++;
    if (minRating > 0) count++;
    if (selectedLocation !== 'all') count++;
    return count;
  }, [selectedCategory, organicOnly, maxDistance, maxPrice, minRating, selectedLocation]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search text
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesFarmer = p.farmerName.toLowerCase().includes(q);
        const matchesLocation = p.farmerLocation.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesFarmer && !matchesLocation && !matchesDesc) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Organic
      if (organicOnly && !p.isOrganic) {
        return false;
      }

      // Max Price
      if (p.pricePerUnit > maxPrice) {
        return false;
      }

      // Max Distance
      if (p.distanceKm !== undefined && p.distanceKm > maxDistance) {
        return false;
      }

      // Min Rating
      if (p.farmerRating && p.farmerRating < minRating) {
        return false;
      }

      // Location match
      if (selectedLocation !== 'all') {
        if (!p.farmerLocation.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return (a.distanceKm || 0) - (b.distanceKm || 0);
      if (sortBy === 'price_asc') return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === 'price_desc') return b.pricePerUnit - a.pricePerUnit;
      if (sortBy === 'rating') return (b.farmerRating || 0) - (a.farmerRating || 0);
      return 0;
    });
  }, [products, searchTerm, selectedCategory, organicOnly, maxDistance, maxPrice, minRating, sortBy, selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Active Orders Quick Tracker for Buyer */}
      {activeOrders.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-emerald-700/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <Truck className="w-4 h-4 animate-bounce" />
              Active Order in Progress
            </span>
            <span className="text-xs text-stone-300">
              Live updates direct from the grower
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                id={`buyer-active-order-${order.id}`}
                className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 flex items-center justify-between hover:bg-white/15 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">Order #{order.id}</span>
                    <span className="text-[10px] font-bold bg-amber-400 text-emerald-950 px-2 py-0.2 rounded-full">
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    Farmer: {order.farmerName} • ₹{order.totalAmount}
                  </p>
                </div>
                <button
                  id={`btn-track-order-${order.id}`}
                  onClick={() => onOpenOrderTracking(order.id)}
                  className="bg-white text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  Track →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero Header & Search */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Find Fresh Produce Directly from Farmers
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Zero middleman markups. Guaranteed farmgate harvest within 24–48 hours.
        </p>

        {/* Search Bar with Location Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-2 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 flex-1 px-3 w-full">
            <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
            <input
              id="input-marketplace-search"
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm text-stone-900 outline-none placeholder:text-stone-400 font-medium py-1.5"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-stone-400 hover:text-stone-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-stone-200 pt-2 sm:pt-0 sm:pl-3 flex items-center gap-2 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <select
              id="select-marketplace-location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-xs font-bold text-stone-700 bg-transparent outline-none cursor-pointer w-full sm:w-44"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Special SIH Feature Promos: Bulk Demand & Group Buying */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bulk Demand Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
              Restaurants & Bulk Buyers
            </span>
            <h4 className="font-bold text-stone-900 text-sm sm:text-base">
              Post Commercial Bulk Requirement
            </h4>
            <p className="text-xs text-stone-600">
              Need 100–1000 kg for kitchen or retail? Get direct farmer quotes & bids.
            </p>
          </div>
          <button
            id="btn-buyer-open-bulk-hub"
            onClick={onOpenBulkHub}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs flex-shrink-0 cursor-pointer"
          >
            Post Demand →
          </button>
        </div>

        {/* Group Buying Banner */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-200 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-900 bg-indigo-200/70 px-2 py-0.5 rounded">
              Community Savings
            </span>
            <h4 className="font-bold text-stone-900 text-sm sm:text-base">
              Join Nearby Group Orders
            </h4>
            <p className="text-xs text-stone-600">
              Combine orders with neighbors to reach 100 kg threshold for wholesale pricing!
            </p>
          </div>
          <button
            id="btn-buyer-open-group-hub"
            onClick={onOpenGroupHub}
            className="bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs flex-shrink-0 cursor-pointer"
          >
            Join Group →
          </button>
        </div>
      </div>

      {/* Category Chips Bar & Quick Filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`btn-category-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 flex-shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Filter Tags on Mobile & Desktop */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1 text-xs">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold px-3 py-1.5 rounded-lg flex-shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <button
            onClick={() => setOrganicOnly(!organicOnly)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-colors flex-shrink-0 cursor-pointer ${
              organicOnly
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>100% Organic</span>
          </button>

          <button
            onClick={() => setMaxDistance(maxDistance === 25 ? 150 : 25)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-colors flex-shrink-0 cursor-pointer ${
              maxDistance === 25
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <MapPin className="w-3 h-3 text-emerald-500" />
            <span>Local (≤25 km)</span>
          </button>

          <button
            onClick={() => setMaxPrice(maxPrice === 50 ? 500 : 50)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-colors flex-shrink-0 cursor-pointer ${
              maxPrice === 50
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span>Under ₹50</span>
          </button>

          <button
            onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-colors flex-shrink-0 cursor-pointer ${
              minRating === 4.8
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>Top Rated (4.8+)</span>
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setOrganicOnly(false);
                setMaxDistance(150);
                setMaxPrice(500);
                setMinRating(0);
                setSelectedLocation('all');
                setSearchTerm('');
              }}
              className="text-stone-400 hover:text-stone-700 font-bold px-2 py-1 flex-shrink-0 text-[11px]"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Marketplace Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Filter Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                Filters
              </span>
              <button
                id="btn-reset-filters"
                onClick={() => {
                  setSelectedCategory('all');
                  setOrganicOnly(false);
                  setMaxDistance(150);
                  setMaxPrice(500);
                  setMinRating(0);
                  setSelectedLocation('all');
                  setSearchTerm('');
                }}
                className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Organic Switch */}
            <div>
              <label className="flex items-center justify-between font-bold text-xs text-stone-800 cursor-pointer bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                <span className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  100% Organic Only
                </span>
                <input
                  id="filter-toggle-organic"
                  type="checkbox"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </label>
            </div>

            {/* Distance Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">Max Distance</span>
                <span className="font-extrabold text-emerald-800">{maxDistance} km</span>
              </div>
              <input
                id="filter-slider-distance"
                type="range"
                min={5}
                max={150}
                step={5}
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                <span>5 km (Local)</span>
                <span>150 km (Regional)</span>
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">Max Price (₹)</span>
                <span className="font-extrabold text-emerald-800">₹{maxPrice}</span>
              </div>
              <input
                id="filter-slider-price"
                type="range"
                min={10}
                max={500}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Farmer Rating */}
            <div className="space-y-2">
              <span className="block font-bold text-xs text-stone-700">Farmer Rating</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`py-1.5 rounded-lg font-bold border transition-colors cursor-pointer ${
                      minRating === rating
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}+ ⭐`}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Transparency Shortcut */}
            <div className="pt-2 border-t border-stone-100">
              <button
                id="btn-sidebar-price-insights"
                onClick={onOpenPriceInsights}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Compare APMC Mandi Rates</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid & Sort Header */}
        <div className="lg:col-span-9 space-y-4">
          {/* Results Bar */}
          <div className="flex flex-row items-center justify-between gap-3 bg-white p-3 sm:p-3.5 rounded-2xl border border-stone-200">
            <div className="text-xs text-stone-600 font-medium truncate">
              Showing <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> farm listings
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1 text-xs font-bold bg-stone-100 text-stone-800 px-2.5 py-1.5 rounded-lg border border-stone-200"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filter</span>
              </button>

              <select
                id="select-sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-stone-800 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 outline-none cursor-pointer max-w-[150px] sm:max-w-none truncate"
              >
                <option value="distance">Nearest (📍 km)</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated (⭐)</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200 space-y-4">
              <Compass className="w-12 h-12 text-stone-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-stone-900 text-base">No produce found matching your filters</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try adjusting the distance radius, increasing max price, or clearing your search term.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setOrganicOnly(false);
                  setMaxDistance(150);
                  setMaxPrice(500);
                  setMinRating(0);
                  setSelectedLocation('all');
                  setSearchTerm('');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Slide-Up Bottom Sheet / Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-250">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-stone-900 text-base">Filter Produce</h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <span className="block font-bold text-xs text-stone-700">Category</span>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold text-center border truncate ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Organic Switch */}
            <div>
              <label className="flex items-center justify-between font-bold text-xs text-stone-800 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                <span className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  100% Certified Organic Only
                </span>
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Distance Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">Max Distance (from your location)</span>
                <span className="font-extrabold text-emerald-800 text-sm">{maxDistance} km</span>
              </div>
              <input
                type="range"
                min={5}
                max={150}
                step={5}
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                <span>5 km (Nearby Farm)</span>
                <span>150 km (Statewide)</span>
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">Max Price (₹)</span>
                <span className="font-extrabold text-emerald-800 text-sm">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 cursor-pointer"
              />
            </div>

            {/* Farmer Rating */}
            <div className="space-y-2">
              <span className="block font-bold text-xs text-stone-700">Minimum Farmer Rating</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`py-2 rounded-xl font-bold border transition-colors ${
                      minRating === rating
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    {rating === 0 ? 'All Ratings' : `${rating}+ ⭐`}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-100 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setOrganicOnly(false);
                  setMaxDistance(150);
                  setMaxPrice(500);
                  setMinRating(0);
                  setSelectedLocation('all');
                  setSearchTerm('');
                }}
                className="flex-1 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs shadow-md"
              >
                Apply ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
