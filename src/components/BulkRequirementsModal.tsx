import React, { useState } from 'react';
import {
  X,
  Layers,
  Plus,
  Building,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  Send,
  Sparkles
} from 'lucide-react';
import { BulkRequirement, User } from '../types';

interface BulkRequirementsModalProps {
  currentUser: User | null;
  bulkRequirements: BulkRequirement[];
  onClose: () => void;
  onCreateRequirement: (data: Partial<BulkRequirement>) => Promise<void>;
  onSubmitQuote: (
    requirementId: string,
    quote: { farmerId: string; farmerName: string; pricePerUnit: number; availableQuantity: number; notes: string }
  ) => Promise<void>;
  onOpenAuth: () => void;
}

export const BulkRequirementsModal: React.FC<BulkRequirementsModalProps> = ({
  currentUser,
  bulkRequirements,
  onClose,
  onCreateRequirement,
  onSubmitQuote,
  onOpenAuth
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedReqForQuote, setSelectedReqForQuote] = useState<BulkRequirement | null>(null);

  // New Requirement state
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState<'vegetables' | 'fruits' | 'grains' | 'pulses' | 'spices' | 'dairy' | 'oilseeds'>('vegetables');
  const [quantity, setQuantity] = useState<number | string>(500);
  const [unit, setUnit] = useState('kg');
  const [targetPricePerUnit, setTargetPricePerUnit] = useState<number | string>(22);
  const [requiredByDate, setRequiredByDate] = useState(
    new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );
  const [location, setLocation] = useState(currentUser?.address || 'Ahmedabad Commercial Hub, Gujarat');
  const [description, setDescription] = useState('');
  const [submittingReq, setSubmittingReq] = useState(false);

  // Quote state (for farmers)
  const [quotePrice, setQuotePrice] = useState<number | string>(20);
  const [quoteQty, setQuoteQty] = useState<number | string>(500);
  const [quoteNotes, setQuoteNotes] = useState('Can supply fresh from field with Grade A sorting.');
  const [submittingQuote, setSubmittingQuote] = useState(false);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    try {
      setSubmittingReq(true);
      await onCreateRequirement({
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        buyerType: 'restaurant',
        productName,
        category,
        quantity: Number(quantity),
        unit: unit as any,
        targetPricePerUnit: Number(targetPricePerUnit),
        requiredByDate,
        location,
        description
      });
      setShowCreateForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReq(false);
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedReqForQuote) return;

    try {
      setSubmittingQuote(true);
      await onSubmitQuote(selectedReqForQuote.id, {
        farmerId: currentUser.id,
        farmerName: currentUser.name,
        pricePerUnit: Number(quotePrice),
        availableQuantity: Number(quoteQty),
        notes: quoteNotes
      });
      setSelectedReqForQuote(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingQuote(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="bulk-requirements-modal-container"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Bulk Demand & Commercial Procurement Hub
              </h3>
              <p className="text-xs text-stone-500">
                Restaurants, institutions, and bulk buyers post demand — local farmers quote directly
              </p>
            </div>
          </div>

          <button
            id="btn-close-bulk-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Toggle */}
        <div className="flex items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-200">
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Need High Volume Agricultural Produce?</h4>
            <p className="text-xs text-stone-500">
              Bypass wholesale commission yards and receive direct quotes from producers.
            </p>
          </div>
          <button
            id="btn-toggle-post-bulk-req"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{showCreateForm ? 'View Active Demands' : 'Post Bulk Demand'}</span>
          </button>
        </div>

        {/* Form: Post Bulk Requirement */}
        {showCreateForm ? (
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs bg-stone-50 p-5 rounded-2xl border border-stone-200">
            <h4 className="font-bold text-stone-900 text-sm border-b border-stone-200 pb-2">
              Post New Bulk Procurement Requirement
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Required Produce *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 500 kg Hybrid Red Tomatoes"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white outline-none font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white outline-none font-medium"
                >
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="pulses">Pulses</option>
                  <option value="spices">Spices</option>
                  <option value="dairy">Dairy</option>
                  <option value="oilseeds">Oilseeds</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Required Volume *</label>
                <input
                  type="number"
                  required
                  min={10}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white font-bold"
                >
                  <option value="kg">kg</option>
                  <option value="quintal">quintal (100 kg)</option>
                  <option value="litre">litre</option>
                  <option value="crate">crate</option>
                  <option value="bag">bag</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Target Price (₹/{unit})</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={targetPricePerUnit}
                  onChange={(e) => setTargetPricePerUnit(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white font-bold text-emerald-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Required Delivery Date</label>
                <input
                  type="date"
                  value={requiredByDate}
                  onChange={(e) => setRequiredByDate(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Delivery Destination</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Quality Specifications</label>
              <textarea
                rows={2}
                placeholder="Specify size, grade, moisture content, packaging preference..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-xl border border-stone-300 bg-white font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 rounded-xl text-stone-600 font-bold hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingReq}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2 rounded-xl shadow-xs cursor-pointer"
              >
                {submittingReq ? 'Publishing...' : 'Publish Commercial Demand'}
              </button>
            </div>
          </form>
        ) : (
          /* Active Bulk Demands List */
          <div className="space-y-4">
            <h4 className="font-bold text-stone-900 text-sm">
              Active Commercial Procurement Demands ({bulkRequirements.length})
            </h4>

            <div className="space-y-4">
              {bulkRequirements.map((req) => (
                <div
                  key={req.id}
                  id={`bulk-req-${req.id}`}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 hover:border-amber-400 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-stone-900 text-base">{req.productName}</h5>
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                          {req.buyerType}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-medium">
                        Posted by <strong>{req.buyerName}</strong> • {req.location}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
                      <span className="text-xs text-stone-500 font-medium">Target Price:</span>
                      <span className="font-display font-black text-base text-emerald-800">
                        ₹{req.targetPricePerUnit}
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">/{req.unit}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl">
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Required Volume</span>
                      <span className="font-bold text-stone-900">{req.quantity} {req.unit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Required By</span>
                      <span className="font-bold text-stone-900">{req.requiredByDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Direct Farmer Quotes</span>
                      <span className="font-bold text-emerald-700">{req.quotes?.length || 0} Quotes Received</span>
                    </div>
                  </div>

                  {req.description && (
                    <p className="text-xs text-stone-600 italic">
                      "{req.description}"
                    </p>
                  )}

                  {/* Farmer Quoting Action */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 text-xs">
                    <span className="text-stone-500">
                      {currentUser?.role === 'farmer'
                        ? 'As a registered farmer, you can quote directly without middlemen:'
                        : 'Farmers can submit direct price quotes.'}
                    </span>

                    {currentUser?.role === 'farmer' && (
                      <button
                        id={`btn-quote-req-${req.id}`}
                        onClick={() => setSelectedReqForQuote(req)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-1.5 rounded-lg text-xs shadow-xs cursor-pointer"
                      >
                        Submit Farmer Quote ✍️
                      </button>
                    )}
                  </div>

                  {/* Submitted Quotes list */}
                  {req.quotes && req.quotes.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                        Received Quotes from Verified Farmers:
                      </span>
                      <div className="space-y-1">
                        {req.quotes.map((q, idx) => (
                          <div
                            key={idx}
                            className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-2 flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-bold text-emerald-950">{q.farmerName}</span>
                              <span className="text-stone-500 ml-2">({q.availableQuantity} {req.unit} available)</span>
                              <p className="text-[11px] text-emerald-800 mt-0.5 font-medium">{q.notes}</p>
                            </div>
                            <span className="font-display font-black text-sm text-emerald-900">
                              ₹{q.pricePerUnit}/{req.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Sub-drawer: Farmer Quote Submission */}
        {selectedReqForQuote && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h4 className="font-bold text-stone-900 text-sm">
                  Quote for: {selectedReqForQuote.productName}
                </h4>
                <button
                  onClick={() => setSelectedReqForQuote(null)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Your Quoted Price (₹/{selectedReqForQuote.unit}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-300 font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Available Supply Quantity ({selectedReqForQuote.unit}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={quoteQty}
                    onChange={(e) => setQuoteQty(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Notes & Harvest Quality
                  </label>
                  <textarea
                    rows={2}
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-300 font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedReqForQuote(null)}
                    className="px-4 py-2 rounded-xl font-bold text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingQuote}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingQuote ? 'Submitting...' : 'Send Quote'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
