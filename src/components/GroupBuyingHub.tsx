import React, { useState } from 'react';
import {
  X,
  Users,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GroupOrder, User } from '../types';

interface GroupBuyingHubProps {
  currentUser: User | null;
  groupOrders: GroupOrder[];
  onClose: () => void;
  onJoinGroupOrder: (groupOrderId: string, quantity: number) => Promise<void>;
  onOpenAuth: () => void;
}

export const GroupBuyingHub: React.FC<GroupBuyingHubProps> = ({
  currentUser,
  groupOrders,
  onClose,
  onJoinGroupOrder,
  onOpenAuth
}) => {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const handleJoin = async (pool: GroupOrder) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const qty = selectedQuantities[pool.id] || 10;
    try {
      setJoiningId(pool.id);
      await onJoinGroupOrder(pool.id, qty);
      
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="group-buying-modal-container"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Community Group Buying Hub
              </h3>
              <p className="text-xs text-stone-500">
                Pool orders with neighbors to unlock wholesale farmgate pricing and zero individual delivery fees
              </p>
            </div>
          </div>

          <button
            id="btn-close-group-hub"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Value Proposition Callout */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-950 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
              Collective Consumer Bargaining
            </span>
            <h4 className="font-bold text-base">How Community Group Orders Work</h4>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              When a neighborhood pool reaches the target threshold (e.g. 100 kg), the farmer delivers a single bulk crate to the community hub at a <strong>30% wholesale discount</strong>.
            </p>
          </div>
        </div>

        {/* Active Group Pools */}
        <div className="space-y-4">
          <h4 className="font-bold text-stone-900 text-sm">
            Active Community Pools Near You ({groupOrders.length})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupOrders.map((pool) => {
              const pooledQty = pool.currentPooledQuantity ?? pool.currentQuantity ?? 0;
              const discountedPrice = pool.discountedPricePerUnit ?? pool.groupPricePerUnit ?? 20;
              const originalPrice = pool.originalPricePerUnit ?? pool.normalPricePerUnit ?? 28;
              const progressPct = Math.min(
                100,
                Math.round((pooledQty / pool.targetQuantity) * 100)
              );
              const selectedQty = selectedQuantities[pool.id] || 10;
              const isFull = pooledQty >= pool.targetQuantity;

              return (
                <div
                  key={pool.id}
                  id={`group-order-card-${pool.id}`}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                          {pool.targetQuantity} {pool.unit} Bulk Pool
                        </span>
                        <h5 className="font-bold text-stone-900 text-base mt-1">
                          {pool.title || pool.productName}
                        </h5>
                        <p className="text-xs text-stone-500 font-medium">
                          Grower: <strong>{pool.farmerName}</strong> • {pool.deliveryHubLocation || pool.dropLocation || 'Local Hub'}
                        </p>
                      </div>
                    </div>

                    {/* Price Comparison */}
                    <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">Wholesale Group Rate</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-black text-xl text-indigo-900">
                            ₹{discountedPrice}
                          </span>
                          <span className="text-xs text-stone-500 font-semibold">/{pool.unit}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">Individual Retail</span>
                        <span className="text-xs line-through text-stone-400 font-semibold">
                          ₹{originalPrice}/{pool.unit}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded block mt-0.5">
                          Save {Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs font-bold text-stone-700">
                        <span>Pooled Progress:</span>
                        <span className="text-indigo-900">
                          {pooledQty} / {pool.targetQuantity} {pool.unit} ({progressPct}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>Closes: {pool.deadline || pool.expiryDate}</span>
                      </p>
                    </div>

                    {/* Participants */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                        Joined Community Members ({pool.participants.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {pool.participants.map((p, idx) => (
                          <span
                            key={idx}
                            className="bg-stone-100 text-stone-700 text-[11px] font-semibold px-2 py-0.5 rounded"
                          >
                            {p.userName || p.buyerName} ({p.quantity} {pool.unit})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Join Action Controls */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-700">Your Share:</span>
                      <div className="flex gap-1.5">
                        {[5, 10, 20].map((qty) => (
                          <button
                            key={qty}
                            onClick={() =>
                              setSelectedQuantities({ ...selectedQuantities, [pool.id]: qty })
                            }
                            className={`px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                              selectedQty === qty
                                ? 'bg-indigo-700 text-white border-indigo-700'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {qty} {pool.unit}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      id={`btn-join-pool-${pool.id}`}
                      disabled={isFull || joiningId === pool.id}
                      onClick={() => handleJoin(pool)}
                      className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-700/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {joiningId === pool.id ? (
                        <span>Joining Community Pool...</span>
                      ) : isFull ? (
                        <span>Pool Target Reached ✓</span>
                      ) : (
                        <>
                          <span>Join Pool ({selectedQty} {pool.unit} for ₹{selectedQty * discountedPrice})</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
