import React, { useState } from 'react';
import { X, Star, Sparkles, Check } from 'lucide-react';
import { Order } from '../types';

interface ReviewModalProps {
  order: Order | null;
  onClose: () => void;
  onSubmitReview: (reviewData: {
    orderId: string;
    farmerId: string;
    farmerName: string;
    rating: number;
    qualityRating: number;
    deliveryRating: number;
    comment: string;
  }) => Promise<void>;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  order,
  onClose,
  onSubmitReview
}) => {
  if (!order) return null;

  const [rating, setRating] = useState<number>(5);
  const [qualityRating, setQualityRating] = useState<number>(5);
  const [deliveryRating, setDeliveryRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('Extremely fresh produce direct from farm! Crisp tomatoes with genuine authentic taste. Highly recommended.');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onSubmitReview({
        orderId: order.id,
        farmerId: order.farmerId,
        farmerName: order.farmerName,
        rating,
        qualityRating,
        deliveryRating,
        comment
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="review-modal-container"
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-display text-xl font-bold text-stone-900">
              Rate Your Harvest Experience
            </h3>
            <p className="text-xs text-stone-500">
              Order #{order.id} • Grower: {order.farmerName}
            </p>
          </div>
          <button
            id="btn-close-review-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Overall Rating */}
          <div className="text-center space-y-2 py-2">
            <span className="font-bold text-stone-700 block text-sm">
              Overall Grower & Produce Rating
            </span>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sub Criteria Ratings */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700">Freshness & Crop Quality:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setQualityRating(s)}
                    className="p-0.5 cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        s <= qualityRating
                          ? 'fill-emerald-600 text-emerald-600'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700">Punctuality & Packaging:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setDeliveryRating(s)}
                    className="p-0.5 cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        s <= deliveryRating
                          ? 'fill-blue-600 text-blue-600'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Comment */}
          <div className="space-y-1">
            <label className="block font-bold text-stone-700">
              Your Review / Message for the Farmer:
            </label>
            <textarea
              id="input-review-comment"
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share taste, texture, packing experience..."
              className="w-full p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none text-xs font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-submit-review"
              disabled={submitting}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Post Direct Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
