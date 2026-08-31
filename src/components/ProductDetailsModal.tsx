import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  Leaf,
  Calendar,
  Layers,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  TrendingDown,
  Info,
  Truck,
  CheckCircle,
  Scale
} from 'lucide-react';
import { Product, User } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  currentUser: User | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onMessageFarmer: (farmerId: string, farmerName: string, productId: string) => void;
  onOpenPriceInsights: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  currentUser,
  onClose,
  onAddToCart,
  onBuyNow,
  onMessageFarmer,
  onOpenPriceInsights
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(product.minimumOrderQuantity || 1);
  const isOutOfStock = product.quantity <= 0;
  const totalPrice = product.pricePerUnit * quantity;

  const getVerificationLabel = (level: string) => {
    switch (level) {
      case 'identity_verified':
        return 'Identity & Land Records Verified ✓';
      case 'farm_verified':
        return 'Farm Details Verified ✓';
      case 'profile_verified':
        return 'Profile Verified ✓';
      default:
        return 'Verification Pending';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="product-details-modal-container"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
      >
        {/* Header Close Button */}
        <button
          id="btn-close-product-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                {product.isOrganic && (
                  <span className="inline-flex items-center gap-1 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Certified Organic</span>
                  </span>
                )}
                <span className="bg-stone-900/90 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-md">
                  {product.qualityGrade}
                </span>
              </div>
            </div>

            {/* Farmer Card */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                  Grower Profile
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {getVerificationLabel(product.farmerVerification)}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-base">{product.farmerName}</h4>
                <p className="text-xs text-stone-600 font-medium">{product.farmName}</p>
                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{product.farmerLocation}</span>
                  {product.distanceKm !== undefined && (
                    <span className="font-semibold text-emerald-700">({product.distanceKm} km away)</span>
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60 text-xs">
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.farmerRating || 4.8} / 5.0</span>
                </div>
                <button
                  id="btn-message-farmer-modal"
                  onClick={() => onMessageFarmer(product.farmerId, product.farmerName, product.id)}
                  className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Message Grower</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wide">
                <span>Category: {product.category}</span>
                <span>•</span>
                <span>ID: {product.id}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                {product.name}
              </h2>
            </div>

            {/* Price & Market Benchmark Section */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                    Direct Farmer Price
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display text-3xl font-black text-emerald-900">
                      ₹{product.pricePerUnit}
                    </span>
                    <span className="text-sm font-bold text-stone-600">/ {product.unit}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Marketplace Benchmarks
                  </span>
                  <div className="text-xs space-y-0.5 mt-0.5 text-stone-600 font-medium">
                    <p>APMC Mandi Price: <strong className="text-stone-800">₹{product.referenceMandiPrice || Math.round(product.pricePerUnit * 1.25)}/{product.unit}</strong></p>
                    <p>City Retail Supermarket: <strong className="text-stone-800">₹{product.marketAveragePrice || Math.round(product.pricePerUnit * 1.4)}/{product.unit}</strong></p>
                  </div>
                </div>
              </div>

              {/* Price Transparency Callout */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                  Direct buying cuts unnecessary middle-tier markups
                </span>
                <button
                  id="btn-view-price-transparency-modal"
                  onClick={onOpenPriceInsights}
                  className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                >
                  View Price Insights & Trend
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
                Produce & Quality Information
              </h4>
              <p className="text-sm text-stone-700 leading-relaxed">
                {product.description}
              </p>
              {product.organicCertNumber && (
                <p className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                  Cert No: {product.organicCertNumber}
                </p>
              )}
            </div>

            {/* Availability & Harvest Data */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-stone-100/70 p-3 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <div>
                  <p className="text-stone-400 text-[10px] font-bold">EXPECTED HARVEST</p>
                  <p className="font-bold text-stone-800">{product.expectedHarvestDate || 'Fresh Regular Harvest'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <div>
                  <p className="text-stone-400 text-[10px] font-bold">AVAILABLE STOCK</p>
                  <p className="font-bold text-stone-800">
                    {product.quantity} {product.unit} (Min: {product.minimumOrderQuantity} {product.unit})
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Live Total */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">Select Order Quantity:</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-xs overflow-hidden">
                    <button
                      id="btn-qty-decrease"
                      onClick={() => setQuantity(Math.max(product.minimumOrderQuantity, quantity - 1))}
                      disabled={quantity <= product.minimumOrderQuantity}
                      className="px-3 py-1 text-stone-700 hover:bg-stone-100 font-black disabled:opacity-30 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      id="input-product-quantity"
                      type="number"
                      min={product.minimumOrderQuantity}
                      max={product.quantity}
                      value={quantity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= product.minimumOrderQuantity && val <= product.quantity) {
                          setQuantity(val);
                        }
                      }}
                      className="w-16 text-center font-bold text-sm text-stone-900 border-none outline-none"
                    />
                    <button
                      id="btn-qty-increase"
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      disabled={quantity >= product.quantity}
                      className="px-3 py-1 text-stone-700 hover:bg-stone-100 font-black disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs font-bold text-stone-500">{product.unit}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm bg-emerald-100/50 border border-emerald-200 px-4 py-2 rounded-xl">
                <span className="font-bold text-emerald-950">Produce Total:</span>
                <span className="font-display font-black text-lg text-emerald-900">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                id="btn-modal-add-to-cart"
                disabled={isOutOfStock}
                onClick={() => onAddToCart(product, quantity)}
                className="bg-white hover:bg-stone-50 text-emerald-900 border-2 border-emerald-700 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>Add to Cart</span>
              </button>

              <button
                id="btn-modal-buy-now"
                disabled={isOutOfStock}
                onClick={() => onBuyNow(product, quantity)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>Buy Now Direct</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Informational Notice */}
            <p className="text-[10px] text-stone-500 leading-normal italic">
              * Prices shown are informational and directly set by the farmer. Payment is processed securely with zero hidden platform cuts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
