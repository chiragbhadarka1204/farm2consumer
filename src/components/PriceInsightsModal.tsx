import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  Scale,
  Info,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { PriceInsight } from '../types';

interface PriceInsightsModalProps {
  priceInsights: PriceInsight[];
  onClose: () => void;
}

export const PriceInsightsModal: React.FC<PriceInsightsModalProps> = ({
  priceInsights,
  onClose
}) => {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const activeInsight = priceInsights[selectedCropIndex] || priceInsights[0];

  // Intermediary cost breakdown data for visualization
  const intermediaryBreakdownData = [
    { name: 'Direct Farmgate Realization', cost: activeInsight.farmerDirectPrice, category: 'Farmer Share', fill: '#059669' },
    { name: 'Village Middleman / Aggregator', cost: 4, category: 'Intermediary Cut', fill: '#f87171' },
    { name: 'APMC Yard Mandi Fee / Tax', cost: 3, category: 'Intermediary Cut', fill: '#fb923c' },
    { name: 'Wholesaler Cold Storage & Transit', cost: 5, category: 'Intermediary Cut', fill: '#facc15' },
    { name: 'Final City Retailer Margin', cost: 8, category: 'Intermediary Cut', fill: '#ec4899' }
  ];

  // Historical price trends comparison
  const priceTrendsData = [
    { week: 'Week 1', farmPrice: activeInsight.farmerDirectPrice - 3, mandiPrice: activeInsight.referenceMandiPrice - 2, supermarketPrice: activeInsight.retailSupermarketPrice - 2 },
    { week: 'Week 2', farmPrice: activeInsight.farmerDirectPrice - 1, mandiPrice: activeInsight.referenceMandiPrice, supermarketPrice: activeInsight.retailSupermarketPrice },
    { week: 'Week 3', farmPrice: activeInsight.farmerDirectPrice + 1, mandiPrice: activeInsight.referenceMandiPrice + 1, supermarketPrice: activeInsight.retailSupermarketPrice + 3 },
    { week: 'Current', farmPrice: activeInsight.farmerDirectPrice, mandiPrice: activeInsight.referenceMandiPrice, supermarketPrice: activeInsight.retailSupermarketPrice }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="price-insights-modal-container"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Price Transparency & Market Intelligence Hub
              </h3>
              <p className="text-xs text-stone-500">
                Compare direct farmgate prices against APMC Mandis and Supermarket benchmarks
              </p>
            </div>
          </div>
          <button
            id="btn-close-price-insights"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold">Transparent Pricing Notice: </span>
            <span>
              Prices shown are informational benchmarks and reference approximations based on regional agricultural markets. Actual transaction prices are set directly by individual farmers and negotiated freely based on quality, variety, and harvest conditions.
            </span>
          </div>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {priceInsights.map((insight, idx) => (
            <button
              key={idx}
              id={`tab-price-insight-${idx}`}
              onClick={() => setSelectedCropIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCropIndex === idx
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {insight.productName}
            </button>
          ))}
        </div>

        {/* Selected Crop Price Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* KisanSetu Farmgate Price */}
          <div className="bg-emerald-50/80 border-2 border-emerald-500/80 rounded-2xl p-4 space-y-1 relative">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-white px-2 py-0.5 rounded-full inline-block border border-emerald-300">
              KisanSetu Direct
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-display text-3xl font-black text-emerald-950">
                ₹{activeInsight.farmerDirectPrice}
              </span>
              <span className="text-xs font-semibold text-emerald-800">/ {activeInsight.unit}</span>
            </div>
            <p className="text-xs text-emerald-900 font-semibold pt-1">
              Farmer gets 100% payout • Buyer saves ~28%
            </p>
          </div>

          {/* APMC Mandi Reference */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              APMC Mandi Yard Reference
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-display text-3xl font-black text-stone-800">
                ₹{activeInsight.referenceMandiPrice}
              </span>
              <span className="text-xs font-semibold text-stone-500">/ {activeInsight.unit}</span>
            </div>
            <p className="text-xs text-stone-500 pt-1">
              Includes trader commissions & mandi market cess
            </p>
          </div>

          {/* Supermarket Retail */}
          <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
              City Retail Supermarket
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-display text-3xl font-black text-rose-950">
                ₹{activeInsight.retailSupermarketPrice}
              </span>
              <span className="text-xs font-semibold text-rose-700">/ {activeInsight.unit}</span>
            </div>
            <p className="text-xs text-rose-800 pt-1">
              Inflated by 5 intermediary markups & handling
            </p>
          </div>
        </div>

        {/* Recharts Price Trends Visualization */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm">
              Historical Price Trajectory Comparison ({activeInsight.productName})
            </h4>
            <span className="text-xs text-stone-500">₹ / {activeInsight.unit}</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(val: any, name: any) => [`₹${val}`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', border: 'none' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="farmPrice"
                  name="Farmer Direct (KisanSetu)"
                  stroke="#059669"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="mandiPrice"
                  name="APMC Mandi Avg"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Line
                  type="monotone"
                  dataKey="supermarketPrice"
                  name="Supermarket Retail"
                  stroke="#e11d48"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Why the Middleman Markup Exists & How KisanSetu Fixes It */}
        <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              Economic Impact Analysis
            </h4>
            <span className="text-xs bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded font-bold">
              SIH Core Mandate
            </span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            In the traditional supply chain for <strong>{activeInsight.productName}</strong>, only {Math.round((activeInsight.farmerDirectPrice / activeInsight.retailSupermarketPrice) * 100)}% of the consumer's payment reaches the actual grower. By facilitating direct farmer-to-buyer transactions, KisanSetu restores fair income to producers while making fresh food affordable for households and commercial kitchens.
          </p>
        </div>
      </div>
    </div>
  );
};
