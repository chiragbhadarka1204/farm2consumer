import React from 'react';
import {
  MapPin,
  Star,
  ShieldCheck,
  Leaf,
  ShoppingBag,
  Eye,
  Calendar,
  Layers
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart
}) => {
  const isOutOfStock = product.quantity <= 0;
  const savingsAgainstMarket = product.marketAveragePrice
    ? Math.round(((product.marketAveragePrice - product.pricePerUnit) / product.marketAveragePrice) * 100)
    : 0;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-500/60 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isOrganic && (
            <span className="inline-flex items-center gap-1 bg-emerald-800/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
              <Leaf className="w-3 h-3 text-emerald-300" />
              <span>Organic</span>
            </span>
          )}
          {product.qualityGrade && (
            <span className="inline-block bg-stone-900/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
              {product.qualityGrade.split(' ')[0]}
            </span>
          )}
        </div>

        {/* Distance Badge */}
        {product.distanceKm !== undefined && (
          <div className="absolute top-2.5 right-2.5 bg-white/95 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>{product.distanceKm} km</span>
          </div>
        )}

        {/* Stock Alert Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-rose-600 text-white text-xs font-black uppercase px-3 py-1 rounded-md tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Farmer & Location */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1 truncate">
              <span className="font-semibold text-stone-800 truncate">{product.farmerName}</span>
              {product.farmerVerification !== 'none' && (
                <ShieldCheck
                  className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0"
                  title="Verified Farmer"
                />
              )}
            </div>
            <div className="flex items-center gap-0.5 text-amber-600 font-bold flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.farmerRating || 4.8}</span>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-stone-400" />
            <span className="truncate">{product.farmerLocation}</span>
          </p>

          {/* Product Name */}
          <h3 className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Price Section with Transparency Benchmarks */}
          <div className="pt-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-black text-emerald-900">
                ₹{product.pricePerUnit}
              </span>
              <span className="text-xs text-stone-500 font-semibold">/ {product.unit}</span>

              {savingsAgainstMarket > 0 && (
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded ml-auto">
                  Save {savingsAgainstMarket}% vs Retail
                </span>
              )}
            </div>

            {/* Reference Mandi Comparison */}
            <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-1 font-medium">
              <span>APMC Mandi: <strong className="text-stone-700">₹{product.referenceMandiPrice || Math.round(product.pricePerUnit * 1.2)}</strong></span>
              <span>•</span>
              <span>City Avg: <strong className="text-stone-700">₹{product.marketAveragePrice || Math.round(product.pricePerUnit * 1.15)}</strong></span>
            </div>
          </div>
        </div>

        {/* Harvest Date & Stock */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <span className="flex items-center gap-1 font-medium">
            <Layers className="w-3 h-3 text-stone-400" />
            Stock: <strong className="text-stone-800">{product.quantity} {product.unit}</strong>
          </span>
          <span className="text-stone-500 font-medium">
            Min Order: <strong className="text-stone-800">{product.minimumOrderQuantity} {product.unit}</strong>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            id={`btn-view-product-${product.id}`}
            onClick={() => onViewDetails(product)}
            className="w-full min-h-[42px] sm:min-h-[38px] bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 sm:py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Details</span>
          </button>

          <button
            id={`btn-add-cart-${product.id}`}
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
            className={`w-full min-h-[42px] sm:min-h-[38px] font-bold py-2.5 sm:py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer ${
              isOutOfStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
