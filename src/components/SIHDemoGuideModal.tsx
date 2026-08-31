import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Play,
  ArrowRight,
  Layers,
  Sprout,
  ShoppingBag,
  ShieldCheck,
  TrendingUp,
  Compass
} from 'lucide-react';

interface SIHDemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onJumpToStep: (stepNumber: number) => void;
}

export const SIHDemoGuideModal: React.FC<SIHDemoGuideModalProps> = ({
  isOpen,
  onClose,
  currentStep,
  onJumpToStep
}) => {
  if (!isOpen) return null;

  const demoSteps = [
    {
      num: 1,
      title: 'Problem Statement & Supply Chain Comparison',
      actor: 'Public Visitor',
      icon: '🌍',
      desc: 'Landing page showcases the core SIH problem: 5-layer intermediaries reduce farmer realization to <47%, while KisanSetu delivers +40% higher income and fresh produce.'
    },
    {
      num: 2,
      title: 'Farmer Authentication & 1-Click Persona',
      actor: 'Farmer (Rajesh Patel)',
      icon: '👨‍🌾',
      desc: 'Farmer logs in seamlessly with direct demo credentials, loading localized dashboard and farm portfolio.'
    },
    {
      num: 3,
      title: 'Farmer Verification & Trust Badge',
      actor: 'Farmer',
      icon: '🛡️',
      desc: 'Farmer views verification status with land record (7/12 extract) authentication and organic certifications.'
    },
    {
      num: 4,
      title: 'Marketplace Price Intelligence & Mandi Comparison',
      actor: 'Farmer',
      icon: '📈',
      desc: 'Farmer opens Mandi price insights to benchmark farm price against APMC Mandi rates and retail supermarket costs.'
    },
    {
      num: 5,
      title: 'Listing New Produce (Single & Bulk Ready)',
      actor: 'Farmer',
      icon: '🌾',
      desc: 'Farmer adds fresh crop batch with image, stock quantity, unit, price/unit, harvest date, and organic certificate.'
    },
    {
      num: 6,
      title: 'Real-Time Inventory Sync to Public Marketplace',
      actor: 'Platform',
      icon: '⚡',
      desc: 'Newly listed crop immediately synchronizes across public marketplace with live stock counter and distance calculation.'
    },
    {
      num: 7,
      title: 'Farmer Modifies Listing / Inventory',
      actor: 'Farmer',
      icon: '✏️',
      desc: 'Farmer edits price or quantity from the dashboard to respond to seasonal harvest yields.'
    },
    {
      num: 8,
      title: 'Buyer Authentication',
      actor: 'Buyer (Anita Sharma)',
      icon: '🛒',
      desc: 'Buyer switches persona or logs in to discover authentic local growers.'
    },
    {
      num: 9,
      title: 'Marketplace Produce Discovery',
      actor: 'Buyer',
      icon: '🥦',
      desc: 'Buyer browses clean, high-contrast produce cards with organic tags, farmer distance, and ratings.'
    },
    {
      num: 10,
      title: 'Multi-Criteria Search & Proximity Filtering',
      actor: 'Buyer',
      icon: '🔍',
      desc: 'Buyer filters by category (Vegetables, Grains), distance radius (5-150 km), organic status, and price limits.'
    },
    {
      num: 11,
      title: 'Product Details Inspection',
      actor: 'Buyer',
      icon: '🔍',
      desc: 'Buyer examines detailed harvest dates, grower farm information, quality grade, and stock level.'
    },
    {
      num: 12,
      title: 'Transparent Price Breakdown Inspection',
      actor: 'Buyer',
      icon: '⚖️',
      desc: 'Buyer reads transparent price breakdown chart and mandatory informational disclaimer.'
    },
    {
      num: 13,
      title: 'Direct Order Placement & Flexible Logistics',
      actor: 'Buyer',
      icon: '🛍️',
      desc: 'Buyer selects quantities and chooses Farmer Direct Delivery, Farm Pickup, or Partner Logistics.'
    },
    {
      num: 14,
      title: 'Farmer Real-Time Incoming Order Alert',
      actor: 'Farmer',
      icon: '🔔',
      desc: 'Farmer receives real-time order alert (#FM10245) in their dashboard orders pipeline.'
    },
    {
      num: 15,
      title: 'Farmer Order Acceptance & Pipeline Advancement',
      actor: 'Farmer',
      icon: '📦',
      desc: 'Farmer accepts order, transitions through Preparing (Harvesting) -> Ready -> Out for Delivery.'
    },
    {
      num: 16,
      title: 'Buyer Live Milestone Tracking (6 Stages)',
      actor: 'Buyer',
      icon: '🚚',
      desc: 'Buyer tracks live order status through visual 6-stage milestone tracker (#FM10245).'
    },
    {
      num: 17,
      title: 'Direct Farmer-to-Buyer In-App Chat',
      actor: 'Buyer & Farmer',
      icon: '💬',
      desc: 'Parties communicate directly regarding harvest readiness, crate drop coordinates, and delivery notes.'
    },
    {
      num: 18,
      title: 'Delivery Confirmation & Zero Commission Settlement',
      actor: 'Farmer & Buyer',
      icon: '💰',
      desc: 'Order is marked Delivered, triggering 100% direct revenue payout to farmer and celebration confetti.'
    },
    {
      num: 19,
      title: 'Buyer Rating & Review Submission',
      actor: 'Buyer',
      icon: '⭐',
      desc: 'Buyer submits 5-star rating, quality rating, and feedback comment which updates grower reputation.'
    },
    {
      num: 20,
      title: 'Admin Oversight, Verification & Trade Analytics',
      actor: 'Admin',
      icon: '📊',
      desc: 'Platform admin validates grower land documents, resolves disputes, inspects GMV, and analyzes category trends.'
    }
  ];

  const activeStepData = demoSteps[currentStep - 1] || demoSteps[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="sih-demo-guide-modal"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-sm">
              SIH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-extrabold text-stone-900">
                  Smart India Hackathon: 20-Step Live Evaluation Tour
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  End-to-End Walkthrough
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Guiding judges through every stage of the direct agricultural marketplace lifecycle
              </p>
            </div>
          </div>

          <button
            id="btn-close-sih-tour"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Step Highlight Card */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-6 space-y-4 shadow-lg border border-emerald-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase">
                Step {activeStepData.num} of 20
              </span>
              <span className="text-xs text-emerald-200 font-bold bg-white/10 px-2.5 py-0.5 rounded-full">
                Actor: {activeStepData.actor}
              </span>
            </div>
            <span className="text-2xl">{activeStepData.icon}</span>
          </div>

          <div>
            <h4 className="font-display text-xl sm:text-2xl font-bold">
              {activeStepData.title}
            </h4>
            <p className="text-stone-200 text-xs sm:text-sm mt-1 leading-relaxed">
              {activeStepData.desc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/15">
            <div className="flex items-center gap-2">
              <button
                id="btn-sih-tour-prev"
                disabled={currentStep <= 1}
                onClick={() => onJumpToStep(Math.max(1, currentStep - 1))}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                id="btn-sih-tour-next"
                disabled={currentStep >= 20}
                onClick={() => onJumpToStep(Math.min(20, currentStep + 1))}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-4 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-md cursor-pointer disabled:opacity-30"
              >
                <span>Execute Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-bold text-emerald-300 hover:underline cursor-pointer"
            >
              Explore this screen directly →
            </button>
          </div>
        </div>

        {/* 20-Step Grid Navigation Matrix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              Complete 20-Step Demonstration Matrix:
            </h4>
            <span className="text-xs text-stone-500">
              Click any step below to jump and execute
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
            {demoSteps.map((step) => {
              const isCurrent = step.num === currentStep;
              const isPast = step.num < currentStep;

              return (
                <button
                  key={step.num}
                  id={`btn-sih-step-${step.num}`}
                  onClick={() => onJumpToStep(step.num)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between h-20 ${
                    isCurrent
                      ? 'bg-emerald-700 text-white border-emerald-700 ring-2 ring-emerald-300 shadow-md'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-black text-[11px]">#{step.num}</span>
                    <span className="text-sm">{step.icon}</span>
                  </div>
                  <p className="font-bold text-[11px] leading-tight line-clamp-2">
                    {step.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
