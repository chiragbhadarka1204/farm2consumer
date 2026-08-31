import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  Users,
  Building,
  Store,
  ChevronRight,
  Info
} from 'lucide-react';
import { Language, PriceInsight } from '../types';
import { translations } from '../translations';

interface HeroLandingProps {
  currentLanguage: Language;
  priceInsights: PriceInsight[];
  onExploreMarketplace: () => void;
  onSellProduce: () => void;
  onOpenPriceInsights: () => void;
  onOpenDemoTour: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  currentLanguage,
  priceInsights,
  onExploreMarketplace,
  onSellProduce,
  onOpenPriceInsights,
  onOpenDemoTour
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="space-y-16 pb-16">
      {/* SIH Problem Statement Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-stone-900 to-teal-950 text-white py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-sm flex-shrink-0">
              SIH
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Smart India Hackathon Problem Statement
              </p>
              <p className="text-sm font-medium text-stone-200">
                “Multiple intermediaries reduce farmers’ earnings and increase consumer prices.”
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              id="btn-hero-take-tour"
              onClick={onOpenDemoTour}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch 20-Step Live Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>100% Direct Farmer-to-Buyer Digital Bridge</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-[1.15] tracking-tight">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-hero-explore-products"
                onClick={onExploreMarketplace}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-700/25 flex items-center gap-2 transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <span>{t.exploreProducts}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-sell-produce"
                onClick={onSellProduce}
                className="bg-white hover:bg-stone-50 text-emerald-900 border-2 border-emerald-700 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm transition-all hover:bg-emerald-50 cursor-pointer"
              >
                {t.sellProduce}
              </button>

              <button
                id="btn-hero-price-transparency"
                onClick={onOpenPriceInsights}
                className="text-stone-700 hover:text-emerald-800 px-4 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>{t.priceInsights}</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 max-w-lg">
              <div>
                <p className="font-display text-2xl font-black text-emerald-800">40%+</p>
                <p className="text-xs text-stone-500 font-medium">Higher Farmer Realization</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-stone-900">0%</p>
                <p className="text-xs text-stone-500 font-medium">Middlemen Brokerage</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-teal-800">24-48h</p>
                <p className="text-xs text-stone-500 font-medium">Harvest to Kitchen Freshness</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card: Supply Chain Comparison */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-stone-200 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-60 -mr-10 -mt-10"></div>
              
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  Supply Chain Comparison
                </span>
                <span className="text-[11px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                  e.g., Tomato 1 kg
                </span>
              </div>

              {/* Traditional 5-Layer Model (The Problem) */}
              <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Traditional Multi-Tier System
                  </span>
                  <span className="text-xs font-extrabold text-rose-800">5 Intermediaries</span>
                </div>

                <div className="grid grid-cols-5 gap-1 text-center text-[10px] font-semibold text-stone-600 py-1">
                  <div className="bg-white p-1 rounded border border-rose-100">
                    <p className="text-[9px] text-stone-400">Farmer</p>
                    <p className="font-bold text-rose-700">₹20</p>
                  </div>
                  <div className="bg-white p-1 rounded border border-rose-100">
                    <p className="text-[9px] text-stone-400">Trader</p>
                    <p className="font-bold text-stone-700">+₹4</p>
                  </div>
                  <div className="bg-white p-1 rounded border border-rose-100">
                    <p className="text-[9px] text-stone-400">Mandi</p>
                    <p className="font-bold text-stone-700">+₹3</p>
                  </div>
                  <div className="bg-white p-1 rounded border border-rose-100">
                    <p className="text-[9px] text-stone-400">Wholesale</p>
                    <p className="font-bold text-stone-700">+₹5</p>
                  </div>
                  <div className="bg-rose-100 p-1 rounded border border-rose-300">
                    <p className="text-[9px] text-rose-900">Retail</p>
                    <p className="font-black text-rose-900">₹42</p>
                  </div>
                </div>
                <p className="text-[11px] text-rose-800 italic">
                  Farmer receives only 47% of final retail price. Produce travels for 3-4 days losing freshness.
                </p>
              </div>

              {/* KisanSetu Direct Model (The Solution) */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    KisanSetu Direct Platform
                  </span>
                  <span className="text-xs font-extrabold text-emerald-800">Zero Middlemen</span>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-emerald-200">
                  <div className="text-center">
                    <p className="text-[10px] text-stone-500 font-bold uppercase">Farmer Earns</p>
                    <p className="font-display text-xl font-black text-emerald-800">₹25/kg</p>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      +25% Higher
                    </span>
                  </div>

                  <div className="flex flex-col items-center px-2">
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mb-1">
                      Direct Trade
                    </span>
                    <ArrowRight className="w-5 h-5 text-emerald-600" />
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-stone-500 font-bold uppercase">Buyer Pays</p>
                    <p className="font-display text-xl font-black text-stone-900">₹28/kg</p>
                    <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                      -33% Cheaper
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-900 font-medium">
                  Direct connection creates an opportunity for fair compensation to farmers and lower cost for fresh produce to buyers.
                </p>
              </div>

              {/* Informational Disclaimer as per guidelines */}
              <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg text-[11px] text-stone-500 border border-stone-200">
                <Info className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                <span>
                  Prices shown are informational benchmarks and may vary by location, quality, season, and market conditions.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Price Ticker Strip */}
      <section className="bg-stone-900 text-white py-3 px-4 overflow-hidden border-y border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider flex-shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Live Price Benchmarks:</span>
          </div>
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-1 text-stone-300 font-medium whitespace-nowrap">
            {priceInsights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-bold text-white">{item.productName}</span>
                <span className="text-emerald-400 font-semibold">Farm Direct: ₹{item.farmerDirectPrice}/{item.unit}</span>
                <span className="text-stone-400">APMC Mandi: ₹{item.referenceMandiPrice}</span>
                <span className="text-rose-400">Supermarket: ₹{item.retailSupermarketPrice}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Major Benefits (As mandated by prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900">
            How KisanSetu Empowers Agricultural Trade
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Replacing rigid traditional distribution chains with transparent digital connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-emerald-500 shadow-sm transition-all hover:shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Better Market Access
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Farmers can reach individual consumers, restaurants, retailers, and bulk purchasers without depending entirely on local village traders or restrictive monopolistic yards.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-teal-500 shadow-sm transition-all hover:shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Price Transparency
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Farmers and buyers can view benchmark marketplace prices, compare mandi reference data, and eliminate arbitrary price cuts by commission agents.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-amber-500 shadow-sm transition-all hover:shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Direct Connections & Trust
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Buyers discover verified growers with documented farm locations, harvest dates, organic authenticity badges, and transparent buyer reviews.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works (6 Stages) */}
      <section className="bg-stone-100/80 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              Seamless Workflow
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900">
              How KisanSetu Works
            </h2>
            <p className="text-stone-600 text-sm">
              Simple 6-step cycle from crop harvesting to doorstep delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { step: '1', title: 'Farmer Lists Produce', desc: 'Farmer uploads crop photo, expected harvest date, unit price, and MOQ.' },
              { step: '2', title: 'Buyer Discovers', desc: 'Buyers search by distance, crop category, organic grade, and compare prices.' },
              { step: '3', title: 'Places Direct Order', desc: 'Buyer selects individual or bulk quantity with delivery or farm pickup option.' },
              { step: '4', title: 'Farmer Confirms', desc: 'Farmer receives real-time order alert and confirms dispatch preparation.' },
              { step: '5', title: 'Delivery Coordinated', desc: 'Direct farm vehicle, buyer pickup, or verified logistics partner routes order.' },
              { step: '6', title: 'Fresh Produce Received', desc: 'Buyer inspects fresh harvest, completes payment, and submits rating & review.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm relative space-y-2">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
                  {item.step}
                </div>
                <h4 className="font-bold text-stone-900 text-sm">{item.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Buyer Audiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Built for All Agricultural Stakeholders
            </h3>
            <p className="text-stone-300 text-sm">
              Whether you are an individual household or commercial purchaser, KisanSetu tailors the procurement flow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <Store className="w-6 h-6 text-amber-300" />
              <h4 className="font-bold text-base">Retail Grocery Stores</h4>
              <p className="text-xs text-stone-300">
                Source 50-200 kg daily fresh produce directly with zero early-morning mandi bidding hassle.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <Building className="w-6 h-6 text-emerald-300" />
              <h4 className="font-bold text-base">Restaurants & Hostels</h4>
              <p className="text-xs text-stone-300">
                Post custom bulk requirements and receive direct quotes from nearby commercial farmers.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <Users className="w-6 h-6 text-teal-300" />
              <h4 className="font-bold text-base">Housing Society Groups</h4>
              <p className="text-xs text-stone-300">
                Combine community orders into 100+ kg group orders for wholesale pricing and shared logistics.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <Truck className="w-6 h-6 text-blue-300" />
              <h4 className="font-bold text-base">Bulk Processors</h4>
              <p className="text-xs text-stone-300">
                Contract directly with farmer groups for wheat, groundnut, spices, and cotton with quality grade testing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
