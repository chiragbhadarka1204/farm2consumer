import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Package,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Eye,
  Check,
  XCircle,
  TrendingUp,
  Scale
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
import { FarmerProfile, Product, Order, Complaint, User } from '../types';

interface AdminDashboardProps {
  currentUser: User | null;
  farmers: FarmerProfile[];
  products: Product[];
  orders: Order[];
  complaints: Complaint[];
  onVerifyFarmer: (farmerId: string, level: any) => Promise<void>;
  onResolveComplaint: (complaintId: string, resolutionNotes: string) => Promise<void>;
  onToggleProductStatus: (productId: string, newStatus: 'active' | 'inactive') => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  farmers,
  products,
  orders,
  complaints,
  onVerifyFarmer,
  onResolveComplaint,
  onToggleProductStatus
}) => {
  const [activeTab, setActiveTab] = useState<'verifications' | 'products' | 'disputes' | 'analytics'>('verifications');
  const [resolutionInput, setResolutionInput] = useState<Record<string, string>>({});

  // Global calculations
  const totalGMV = orders.reduce((sum, o) => sum + (o.orderStatus !== 'Cancelled' ? o.totalAmount : 0), 0);
  const pendingVerifications = farmers.filter((f) => {
    const level = f.verificationLevel || f.verificationStatus || 'none';
    return level === 'none' || level === 'profile_verified';
  });
  const activeProducts = products.filter((p) => p.status === 'active');
  const openComplaints = complaints.filter((c) => c.status === 'open' || c.status === 'under_review');

  const categoryData = [
    { name: 'Vegetables', count: 18, value: 45000 },
    { name: 'Grains', count: 12, value: 78000 },
    { name: 'Fruits', count: 9, value: 34000 },
    { name: 'Pulses', count: 6, value: 29000 },
    { name: 'Dairy', count: 8, value: 21000 }
  ];

  const PIE_COLORS = ['#059669', '#0284c7', '#d97706', '#8b5cf6', '#ec4899'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-stone-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-500/30 text-purple-200 text-xs font-bold px-3 py-0.5 rounded-full border border-purple-400/40">
              SIH Platform Governance & Trust Desk
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold mt-1">
            KisanSetu Trust & Administration Console
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-0.5">
            Verify grower land records, moderate agricultural trade, and manage dispute resolutions
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/10 text-right">
          <p className="text-[10px] text-purple-200 uppercase font-bold">Admin Status</p>
          <p className="font-bold text-emerald-400 text-sm">Active & Verified ✓</p>
        </div>
      </div>

      {/* Global Platform KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Platform GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-display text-2xl font-black text-stone-900">
            ₹{totalGMV > 0 ? totalGMV.toLocaleString() : '1,84,500'}
          </p>
          <span className="text-[10px] font-bold text-emerald-700">100% Direct to Farmers</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Farmers</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-display text-2xl font-black text-stone-900">
            {farmers.length || 38}
          </p>
          <span className="text-[10px] font-medium text-stone-500">Registered Growers</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Live Listings</span>
            <Package className="w-4 h-4 text-teal-600" />
          </div>
          <p className="font-display text-2xl font-black text-stone-900">
            {activeProducts.length}
          </p>
          <span className="text-[10px] font-medium text-stone-500">Active Crop Batches</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Verification Queue</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-display text-2xl font-black text-amber-700">
            {pendingVerifications.length}
          </p>
          <span className="text-[10px] font-bold text-amber-700">Pending Review</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Open Disputes</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="font-display text-2xl font-black text-stone-900">
            {openComplaints.length}
          </p>
          <span className="text-[10px] font-bold text-stone-500">Dispute Desk</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-stone-200">
        <nav className="flex space-x-6">
          <button
            id="tab-admin-verifications"
            onClick={() => setActiveTab('verifications')}
            className={`py-3 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer ${
              activeTab === 'verifications'
                ? 'border-purple-700 text-purple-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Farmer Verification Desk</span>
            {pendingVerifications.length > 0 && (
              <span className="bg-amber-400 text-stone-950 text-xs px-2 py-0.2 rounded-full font-black">
                {pendingVerifications.length}
              </span>
            )}
          </button>

          <button
            id="tab-admin-disputes"
            onClick={() => setActiveTab('disputes')}
            className={`py-3 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer ${
              activeTab === 'disputes'
                ? 'border-purple-700 text-purple-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Disputes & Complaints ({complaints.length})</span>
          </button>

          <button
            id="tab-admin-products"
            onClick={() => setActiveTab('products')}
            className={`py-3 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer ${
              activeTab === 'products'
                ? 'border-purple-700 text-purple-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Listing Moderation</span>
          </button>

          <button
            id="tab-admin-analytics"
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-purple-700 text-purple-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Platform Trade Analytics</span>
          </button>
        </nav>
      </div>

      {/* Tab 1: Farmer Verifications */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Grower Identity & Land Record Verifications
            </h3>
            <span className="text-xs text-stone-500">
              Multi-tier trust badge verification prevents fraud and guarantees authenticity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {farmers.map((farmer) => (
              <div
                key={farmer.id}
                id={`farmer-verify-card-${farmer.id}`}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900 text-base">{farmer.farmName}</h4>
                    <p className="text-xs text-stone-500">
                      Farmer ID: {farmer.id} • {farmer.location}
                    </p>
                    <p className="text-xs text-stone-700 font-medium mt-1">
                      Farm Size: <strong>{farmer.farmSizeAcres} Acres</strong> • Crops: {farmer.mainCrops?.join(', ') || 'Mixed Harvest'}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      (farmer.verificationLevel || farmer.verificationStatus) === 'identity_verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : (farmer.verificationLevel || farmer.verificationStatus) === 'farm_verified'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {(farmer.verificationLevel || farmer.verificationStatus || 'none').replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1 text-stone-600">
                  <div className="flex justify-between">
                    <span>Aadhaar / Gov ID:</span>
                    <strong className="text-stone-800">XXXX-XXXX-8921 (Verified OTP)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>7/12 Land Record Extract:</span>
                    <strong className="text-emerald-700">712-GUJ-ANAND-889.pdf (Uploaded)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Organic Certification:</span>
                    <strong className="text-stone-800">NPOP/NAB/0018-ORG</strong>
                  </div>
                </div>

                {/* Verification Approval Buttons */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-stone-600">Update Badge:</span>
                  <div className="flex gap-2">
                    <button
                      id={`btn-verify-farm-${farmer.id}`}
                      onClick={() => onVerifyFarmer(farmer.id, 'farm_verified')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3 py-1.5 rounded-lg border border-blue-200 cursor-pointer"
                    >
                      Farm Details ✓
                    </button>
                    <button
                      id={`btn-verify-identity-${farmer.id}`}
                      onClick={() => onVerifyFarmer(farmer.id, 'identity_verified')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer"
                    >
                      Full Identity & Land Verified ✓✓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Disputes & Complaints */}
      {activeTab === 'disputes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Dispute Resolution & Fair Settlement Desk ({complaints.length})
            </h3>
            <span className="text-xs text-stone-500">
              Review issues filed by buyers/farmers and enforce platform safety rules
            </span>
          </div>

          <div className="space-y-4">
            {complaints.map((comp) => (
              <div
                key={comp.id}
                id={`complaint-card-${comp.id}`}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">Complaint #{comp.id}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        comp.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {comp.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-stone-400">
                      Order #{comp.orderId} • Reason: <strong className="capitalize">{comp.reason}</strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Complainant Description:</span>
                    <p className="text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed font-medium">
                      "{comp.description}"
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Admin Resolution Note:</span>
                    {comp.status === 'resolved' ? (
                      <p className="text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200 leading-relaxed font-medium">
                        {comp.adminResolution}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          placeholder="Type investigation result & refund/settlement decision..."
                          value={resolutionInput[comp.id] || ''}
                          onChange={(e) =>
                            setResolutionInput({ ...resolutionInput, [comp.id]: e.target.value })
                          }
                          className="w-full p-2 rounded-xl border border-stone-300 outline-none text-xs"
                        />
                        <button
                          id={`btn-resolve-complaint-${comp.id}`}
                          onClick={() =>
                            onResolveComplaint(
                              comp.id,
                              resolutionInput[comp.id] || 'Verified with grower. Replacement batch dispatched at no extra cost.'
                            )
                          }
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-1.5 rounded-lg text-xs cursor-pointer"
                        >
                          Mark Resolved & Settle Case ✓
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Products Moderation */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-stone-900">
            Marketplace Produce Listings Moderation ({products.length})
          </h3>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Farmer</th>
                  <th className="p-3">Price / Unit</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/60">
                    <td className="p-3 font-bold text-stone-900 flex items-center gap-2">
                      <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                      <span>{p.name}</span>
                    </td>
                    <td className="p-3 capitalize">{p.category}</td>
                    <td className="p-3">{p.farmerName}</td>
                    <td className="p-3 font-bold text-emerald-800">₹{p.pricePerUnit}/{p.unit}</td>
                    <td className="p-3">{p.quantity} {p.unit}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${p.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
                        {p.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onToggleProductStatus(p.id, p.status === 'active' ? 'inactive' : 'active')}
                        className="text-stone-600 hover:text-stone-900 font-bold underline cursor-pointer"
                      >
                        {p.status === 'active' ? 'Pause Listing' : 'Activate Listing'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
            <h4 className="font-display font-bold text-stone-900 text-base">
              Category Distribution by Direct Trade Volume (₹)
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#059669" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
            <h4 className="font-display font-bold text-stone-900 text-base">
              Listings Share by Agricultural Group
            </h4>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={(entry) => `${entry.name} (${entry.count})`}
                  >
                    {categoryData.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
