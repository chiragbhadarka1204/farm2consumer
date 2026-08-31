import React from 'react';
import { Sprout, ShieldCheck, Heart, Sparkles, TrendingUp, Users, Layers, Info } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  currentLanguage: Language;
  onSelectTab: (tab: string) => void;
  onOpenPriceInsights: () => void;
  onOpenBulkHub: () => void;
  onOpenGroupHub: () => void;
  onOpenDemoTour: () => void;
  onChangeLanguage: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onSelectTab,
  onOpenPriceInsights,
  onOpenBulkHub,
  onOpenGroupHub,
  onOpenDemoTour,
  onChangeLanguage
}) => {
  const t = translations[currentLanguage];

  return (
    <footer className="bg-stone-900 text-white border-t border-stone-800 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                {t.appName}
              </span>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Empowering Indian farmers by directly bridging agricultural producers with households, retailers, and commercial buyers — eliminating exploitative commission middlemen and guaranteeing fair price transparency.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenDemoTour}
                className="bg-emerald-800 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer"
              >
                Interactive Demo Tour
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
              Marketplace Hub
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('marketplace')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.exploreProducts}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPriceInsights}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.priceInsights} & Mandi Trends
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBulkHub}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.bulkOrders} (Commercial)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGroupHub}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.groupBuying} (Societies)
                </button>
              </li>
            </ul>
          </div>

          {/* Stakeholder Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
              Stakeholder Access
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('farmer_dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Farmer Portal & Listings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('marketplace')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Buyer Produce Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('admin_dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Admin Trust & Land Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Languages & Compliance */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
              Languages (ભાષા / भाषा)
            </h4>
            <div className="flex flex-col gap-1.5 text-stone-400">
              <button
                onClick={() => onChangeLanguage('en')}
                className={`text-left hover:text-emerald-400 ${currentLanguage === 'en' ? 'text-amber-400 font-bold' : ''}`}
              >
                English (Default)
              </button>
              <button
                onClick={() => onChangeLanguage('hi')}
                className={`text-left hover:text-emerald-400 ${currentLanguage === 'hi' ? 'text-amber-400 font-bold' : ''}`}
              >
                हिंदी (Hindi)
              </button>
              <button
                onClick={() => onChangeLanguage('gu')}
                className={`text-left hover:text-emerald-400 ${currentLanguage === 'gu' ? 'text-amber-400 font-bold' : ''}`}
              >
                ગુજરાતી (Gujarati)
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex items-start gap-2.5 text-[11px] text-stone-500">
          <Info className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Informational Disclaimer:</strong> All price benchmarks, Mandi reference rates, and market comparisons displayed in this application are approximate informational benchmarks intended to provide transparency. Transactions occur directly between verified farmers and buyers.
          </p>
        </div>
      </div>

      {/* Lower Copyright Strip */}
      <div className="bg-stone-950 py-4 px-4 sm:px-6 border-t border-stone-800/80 text-stone-500 text-center text-[11px]">
        <p>
          KisanSetu • Smart India Hackathon Agricultural Platform • Built for Direct Farmer Empowerment
        </p>
      </div>
    </footer>
  );
};
