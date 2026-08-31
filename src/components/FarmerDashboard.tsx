import React, { useState } from 'react';
import {
  Sprout,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Truck,
  MapPin,
  Star,
  Layers,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Product, Order, User, FarmerProfile, OrderStatus } from '../types';

interface FarmerDashboardProps {
  currentUser: User | null;
  farmerProfile?: FarmerProfile;
  products: Product[];
  orders: Order[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  onOpenChat: (buyerId: string, buyerName: string, orderId?: string) => void;
  onOpenPriceInsights: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  currentUser,
  farmerProfile,
  products,
  orders,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onOpenChat,
  onOpenPriceInsights
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'earnings' | 'market_trends'>('orders');

  // Filter farmer specific items
  const myProducts = products.filter(
    (p) => p.farmerId === currentUser?.id || currentUser?.role === 'farmer'
  );
  const myOrders = orders.filter(
    (o) => o.farmerId === currentUser?.id || currentUser?.role === 'farmer'
  );

  // Metrics
  const totalSales = myOrders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrdersCount = myOrders.filter(
    (o) => o.orderStatus === 'Pending' || o.orderStatus === 'Accepted' || o.orderStatus === 'Preparing'
  ).length;

  const completedOrdersCount = myOrders.filter((o) => o.orderStatus === 'Delivered').length;
  const activeProductsCount = myProducts.filter((p) => p.status === 'active').length;
  const totalStockKg = myProducts.reduce((sum, p) => sum + (p.unit === 'kg' ? p.quantity : 0), 0);

  // Analytics Chart Data
  const monthlyRevenueData = [
    { month: 'Apr', revenue: 14500, orders: 12 },
    { month: 'May', revenue: 22800, orders: 18 },
    { month: 'Jun', revenue: 31200, orders: 24 },
    { month: 'Jul', revenue: 42500, orders: 35 },
    { month: 'Aug', revenue: totalSales > 0 ? totalSales : 54000, orders: myOrders.length || 42 }
  ];

  const cropSalesDistribution = myProducts.map((p) => ({
    name: p.name.split(' ')[0],
    value: p.pricePerUnit * (p.quantity > 500 ? 500 : p.quantity)
  }));

  const PIE_COLORS = ['#059669', '#0d9488', '#d97706', '#6366f1', '#ec4899', '#84cc16'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Farmer Profile Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
            alt={currentUser?.name || 'Farmer'}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold">
                {currentUser?.name || 'Rajesh Patel'}
              </h1>
              <span className="bg-emerald-400 text-emerald-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Farmer ✓
              </span>
            </div>
            <p className="text-emerald-200 text-sm font-medium">
              {farmerProfile?.farmName || 'Green Valley Organic Agro'} • {farmerProfile?.location || 'Anand, Gujarat'}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-emerald-100">
              <span className="flex items-center gap-1 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {farmerProfile?.rating || 4.8} ({farmerProfile?.totalReviews || 48} ratings)
              </span>
              <span>•</span>
              <span>Completed Orders: <strong>{completedOrdersCount || 142}</strong></span>
              <span>•</span>
              <span>Farm Size: <strong>{farmerProfile?.farmSizeAcres || 12.5} Acres</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-farmer-list-produce-top"
            onClick={onAddProduct}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>List New Produce</span>
          </button>

          <button
            id="btn-farmer-mandi-benchmarks"
            onClick={onOpenPriceInsights}
            className="bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm border border-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-emerald-300" />
            <span>Mandi Price Trends</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-display text-2xl font-black text-stone-900">
            ₹{totalSales.toLocaleString()}
          </p>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block">
            +32% vs Middlemen Mandi
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Listings</span>
            <Package className="w-4 h-4 text-teal-600" />
          </div>
          <p className="font-display text-2xl font-black text-stone-900">
            {activeProductsCount}
          </p>
          <span className="text-[10px] font-medium text-stone-500">Live on Marketplace</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Orders</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-display text-2xl font-black text-amber-700">
            {pendingOrdersCount}
          </p>
          <span className="text-[10px] font-bold text-amber-700">Requires Action</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Harvest Stock</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="font-display text-2xl font-black text-stone-900">
            {totalStockKg > 0 ? `${totalStockKg} kg` : `${myProducts.length * 400} kg`}
          </p>
          <span className="text-[10px] font-medium text-stone-500">Ready for Dispatch</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Fulfilled Orders</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-display text-2xl font-black text-emerald-800">
            {completedOrdersCount || 142}
          </p>
          <span className="text-[10px] font-bold text-emerald-700">100% On-Time Delivery</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-stone-200">
        <nav className="flex space-x-6">
          <button
            id="tab-farmer-orders"
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Orders Management</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-amber-400 text-emerald-950 text-xs px-2 py-0.2 rounded-full font-black">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            id="tab-farmer-products"
            onClick={() => setActiveTab('products')}
            className={`py-3 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer ${
              activeTab === 'products'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Listed Products ({myProducts.length})</span>
          </button>

          <button
            id="tab-farmer-earnings"
            onClick={() => setActiveTab('earnings')}
            className={`py-3 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer ${
              activeTab === 'earnings'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Earnings & Sales Charts</span>
          </button>

          <button
            id="tab-farmer-trends"
            onClick={() => setActiveTab('market_trends')}
            className={`py-3 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer ${
              activeTab === 'market_trends'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Price Comparison & Advisory</span>
          </button>
        </nav>
      </div>

      {/* Tab 1: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Incoming & Active Orders
            </h3>
            <span className="text-xs text-stone-500 font-medium">
              Accept orders, update preparation stages, and arrange direct dispatch
            </span>
          </div>

          {myOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="font-bold text-stone-800">No incoming orders yet</h4>
              <p className="text-xs text-stone-500">
                New buyer orders will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((order) => (
                <div
                  key={order.id}
                  id={`farmer-order-${order.id}`}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-base text-emerald-900">
                        Order #{order.id}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.orderStatus === 'Out for Delivery'
                            ? 'bg-blue-100 text-blue-800'
                            : order.orderStatus === 'Preparing' || order.orderStatus === 'Accepted'
                            ? 'bg-amber-100 text-amber-800'
                            : order.orderStatus === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-stone-100 text-stone-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(order.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-chat-order-${order.id}`}
                        onClick={() => onOpenChat(order.buyerId, order.buyerName, order.id)}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat with Buyer</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Items & Buyer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    <div className="md:col-span-7 space-y-2">
                      <h4 className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                        Ordered Produce
                      </h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-stone-50 p-2.5 rounded-xl">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-bold text-stone-900">{item.productName}</p>
                              <p className="text-[11px] text-stone-500 font-medium">
                                {item.quantity} {item.unit} × ₹{item.unitPrice}/{item.unit}
                              </p>
                            </div>
                          </div>
                          <span className="font-display font-bold text-sm text-stone-900">
                            ₹{item.totalPrice}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="md:col-span-5 bg-stone-50 p-3.5 rounded-xl space-y-2 border border-stone-200">
                      <h4 className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                        Buyer & Delivery Details
                      </h4>
                      <p className="font-bold text-stone-900 text-sm">{order.buyerName}</p>
                      <p className="text-stone-600 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                        <span>{order.deliveryAddress}</span>
                      </p>
                      <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold">
                        <span className="text-stone-600">Total Payout:</span>
                        <span className="font-display text-base font-black text-emerald-900">
                          ₹{order.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Pipeline Action Controls */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-stone-500 font-medium">
                      Update Order Stage:
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      {order.orderStatus === 'Pending' && (
                        <>
                          <button
                            id={`btn-accept-order-${order.id}`}
                            onClick={() => onUpdateOrderStatus(order.id, 'Accepted', 'Farmer confirmed harvest & packing')}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer"
                          >
                            Accept Order ✓
                          </button>
                          <button
                            id={`btn-reject-order-${order.id}`}
                            onClick={() => onUpdateOrderStatus(order.id, 'Cancelled', 'Stock unavailable at harvest time')}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-lg border border-rose-200 cursor-pointer"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {order.orderStatus === 'Accepted' && (
                        <button
                          id={`btn-prepare-order-${order.id}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'Preparing', 'Produce harvested from field and sorted')}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer"
                        >
                          Mark as Preparing (Harvesting) 🌾
                        </button>
                      )}

                      {order.orderStatus === 'Preparing' && (
                        <button
                          id={`btn-ready-order-${order.id}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'Ready', 'Packed in eco crates, ready for dispatch')}
                          className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer"
                        >
                          Mark as Ready to Dispatch 📦
                        </button>
                      )}

                      {order.orderStatus === 'Ready' && (
                        <button
                          id={`btn-dispatch-order-${order.id}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'Out for Delivery', 'Vehicle dispatched to buyer location')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer"
                        >
                          Dispatch / Out for Delivery 🚚
                        </button>
                      )}

                      {order.orderStatus === 'Out for Delivery' && (
                        <button
                          id={`btn-deliver-order-${order.id}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'Delivered', 'Delivered to buyer and payment settled')}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer"
                        >
                          Confirm Delivery Complete 🎉
                        </button>
                      )}

                      {order.orderStatus === 'Delivered' && (
                        <span className="text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" />
                          Delivered & Settled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                My Farm Listings ({myProducts.length})
              </h3>
              <p className="text-xs text-stone-500">
                Manage stock availability, adjust selling prices, and edit harvest specifications
              </p>
            </div>
            <button
              id="btn-farmer-add-product-table"
              onClick={onAddProduct}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Crop</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map((p) => (
              <div
                key={p.id}
                id={`farmer-listing-${p.id}`}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between p-4 space-y-3"
              >
                <div className="flex gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm leading-tight line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="font-display font-black text-base text-emerald-900">
                      ₹{p.pricePerUnit} <span className="text-xs font-semibold text-stone-500">/ {p.unit}</span>
                    </p>
                    <p className="text-[11px] text-stone-500 font-medium">
                      Stock: <strong className="text-stone-800">{p.quantity} {p.unit}</strong>
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className={`font-bold text-[11px] px-2 py-0.5 rounded-full ${p.quantity > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {p.quantity > 0 ? 'In Stock (Active)' : 'Out of Stock'}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      id={`btn-edit-product-${p.id}`}
                      onClick={() => onEditProduct(p)}
                      className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      id={`btn-delete-product-${p.id}`}
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Earnings & Charts */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Monthly Sales Revenue Bar Chart */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-stone-900 text-base">
                  Monthly Revenue Trajectory (₹)
                </h4>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-md">
                  +42% Growth
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip
                      formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Direct Revenue']}
                      contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '12px', border: 'none' }}
                    />
                    <Bar dataKey="revenue" fill="#059669" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Crop Wise Sales Value */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h4 className="font-display font-bold text-stone-900 text-base">
                Produce Value Share
              </h4>
              <div className="h-64 flex items-center justify-center">
                {cropSalesDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cropSalesDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {cropSalesDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Estimated Value']} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-stone-400">Add products to see value breakdown</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Price Trends & Advisory */}
      {activeTab === 'market_trends' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                Marketplace Price Comparison & Fair Pricing Advisor
              </h3>
              <p className="text-xs text-stone-500">
                Compare your farm listing with APMC Mandi rates to maximize earnings while remaining competitive.
              </p>
            </div>
            <button
              onClick={onOpenPriceInsights}
              className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 cursor-pointer"
            >
              Open Full Mandi Transparency Hub →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {myProducts.slice(0, 3).map((p) => {
              const mandiRef = p.referenceMandiPrice || Math.round(p.pricePerUnit * 1.2);
              const retailRef = p.marketAveragePrice || Math.round(p.pricePerUnit * 1.4);
              return (
                <div key={p.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm">{p.name}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded">
                      ₹{p.pricePerUnit}/{p.unit}
                    </span>
                  </div>

                  <div className="space-y-1 text-stone-600">
                    <div className="flex justify-between">
                      <span>Your Farm Price:</span>
                      <strong className="text-emerald-800">₹{p.pricePerUnit}/{p.unit}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>APMC Mandi Yard:</span>
                      <strong className="text-stone-800">₹{mandiRef}/{p.unit}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>City Retailer Supermarket:</span>
                      <strong className="text-stone-800">₹{retailRef}/{p.unit}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-900 bg-emerald-100/60 p-2 rounded-lg leading-tight font-medium">
                    💡 You earn 100% of ₹{p.pricePerUnit} with zero commission cuts, while buyer saves ~{Math.round(((retailRef - p.pricePerUnit) / retailRef) * 100)}% compared to supermarket.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
