import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Order, ComplaintReason } from '../types';

interface ComplaintModalProps {
  order: Order | null;
  onClose: () => void;
  onSubmitComplaint: (complaintData: {
    orderId: string;
    farmerId: string;
    farmerName: string;
    reason: ComplaintReason;
    description: string;
  }) => Promise<void>;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({
  order,
  onClose,
  onSubmitComplaint
}) => {
  if (!order) return null;

  const [reason, setReason] = useState<ComplaintReason>('quality_mismatch');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      setSubmitting(true);
      await onSubmitComplaint({
        orderId: order.id,
        farmerId: order.farmerId,
        farmerName: order.farmerName,
        reason,
        description
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="complaint-modal-container"
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-display text-lg font-bold text-stone-900">
              Report an Issue / Dispute
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-stone-900 text-base">Dispute Case Registered</h4>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Our administration resolution team has received your ticket and will mediate with the grower within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="bg-stone-900 hover:bg-black text-white font-bold px-5 py-2 rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Issue Category *</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as ComplaintReason)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium outline-none"
              >
                <option value="quality_mismatch">Quality Not as Described</option>
                <option value="damaged_produce">Produce Damaged in Transit</option>
                <option value="wrong_quantity">Incorrect Quantity Received</option>
                <option value="delayed_delivery">Excessive Unnotified Delay</option>
                <option value="other">Other Dispute</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Detailed Description of the Issue *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Explain the discrepancy, weight difference, or quality fault..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 outline-none text-xs font-medium"
              />
            </div>

            <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              🛡️ KisanSetu Admin team reviews land authenticity and handles fair refund or batch replacement.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl font-bold text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-rose-700 hover:bg-rose-800 text-white font-bold px-5 py-2 rounded-xl shadow-xs"
              >
                {submitting ? 'Submitting...' : 'File Official Ticket'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
