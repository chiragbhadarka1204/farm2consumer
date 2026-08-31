import React, { useState } from 'react';
import { X, Sprout, Image, DollarSign, Layers, Calendar, Leaf, MapPin, Check } from 'lucide-react';
import { Product, ProductCategory, ProductUnit, User } from '../types';

interface AddProductModalProps {
  currentUser: User | null;
  productToEdit?: Product | null;
  onClose: () => void;
  onSubmit: (productData: Partial<Product>) => Promise<void>;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  currentUser,
  productToEdit,
  onClose,
  onSubmit
}) => {
  const [name, setName] = useState(productToEdit?.name || '');
  const [category, setCategory] = useState<ProductCategory>(productToEdit?.category || 'vegetables');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [image, setImage] = useState(
    productToEdit?.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
  );
  const [quantity, setQuantity] = useState<number | string>(productToEdit?.quantity || 500);
  const [unit, setUnit] = useState<ProductUnit>(productToEdit?.unit || 'kg');
  const [pricePerUnit, setPricePerUnit] = useState<number | string>(productToEdit?.pricePerUnit || 25);
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState<number | string>(
    productToEdit?.minimumOrderQuantity || 5
  );
  const [availableFrom, setAvailableFrom] = useState(
    productToEdit?.availableFrom || new Date().toISOString().split('T')[0]
  );
  const [expectedHarvestDate, setExpectedHarvestDate] = useState(
    productToEdit?.expectedHarvestDate || new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
  );
  const [location, setLocation] = useState(productToEdit?.farmerLocation || 'Anand, Gujarat');
  const [isOrganic, setIsOrganic] = useState(productToEdit?.isOrganic ?? true);
  const [organicCertNumber, setOrganicCertNumber] = useState(productToEdit?.organicCertNumber || 'NPOP/NAB/0018-ORG');
  const [qualityGrade, setQualityGrade] = useState<'Grade A (Export/Premium)' | 'Grade B (Standard)' | 'Organic Certified'>(
    productToEdit?.qualityGrade || 'Grade A (Export/Premium)'
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample image shortcuts
  const sampleImages = [
    { label: 'Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80' },
    { label: 'Potatoes', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80' },
    { label: 'Onions', url: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80' },
    { label: 'Wheat', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80' },
    { label: 'Bananas', url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80' },
    { label: 'A2 Milk', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a product name');
      return;
    }
    if (Number(pricePerUnit) <= 0) {
      setError('Price per unit must be greater than 0');
      return;
    }
    if (Number(quantity) <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSubmit({
        name,
        category,
        description,
        image,
        quantity: Number(quantity),
        unit,
        pricePerUnit: Number(pricePerUnit),
        minimumOrderQuantity: Number(minimumOrderQuantity) || 1,
        availableFrom,
        expectedHarvestDate,
        farmerLocation: location,
        isOrganic,
        organicCertNumber: isOrganic ? organicCertNumber : undefined,
        qualityGrade,
        farmerId: currentUser?.id || 'usr_farmer_1',
        farmerName: currentUser?.name || 'Rajesh Patel'
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="add-product-modal-container"
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                {productToEdit ? 'Edit Farm Listing' : 'List New Farm Produce'}
              </h3>
              <p className="text-xs text-stone-500">
                Directly connect with consumers, retailers, and restaurants at transparent prices
              </p>
            </div>
          </div>
          <button
            id="btn-close-add-product-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-800 p-3 rounded-xl text-xs font-semibold border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Product Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Crop / Product Name *
              </label>
              <input
                id="input-add-product-name"
                type="text"
                required
                placeholder="e.g. Fresh Farm Tomatoes (Hybrid Red)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Category *
              </label>
              <select
                id="select-add-product-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none font-medium bg-white"
              >
                <option value="vegetables">Vegetables (शाकभाजी / सब्जियां)</option>
                <option value="fruits">Fruits (ફળો / फल)</option>
                <option value="grains">Grains & Wheat (અનાજ / अनाज)</option>
                <option value="pulses">Pulses & Dal (કઠોળ / दालें)</option>
                <option value="spices">Spices & Cumin (મસાલા / मसाले)</option>
                <option value="dairy">Dairy & Milk (ડેરી / दूध)</option>
                <option value="oilseeds">Oilseeds & Groundnut (તેલીબિયાં / तिलहन)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Description & Harvest Details
            </label>
            <textarea
              id="textarea-add-product-desc"
              rows={2}
              placeholder="Describe variety, soil type, pesticide-free practices, and taste profile..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none font-medium"
            />
          </div>

          {/* Quantity, Unit, Price, MOQ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Available Stock *
              </label>
              <input
                id="input-add-product-quantity"
                type="number"
                required
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Unit *
              </label>
              <select
                id="select-add-product-unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as ProductUnit)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-bold bg-white"
              >
                <option value="kg">kg (Kilogram)</option>
                <option value="quintal">quintal (100 kg)</option>
                <option value="litre">litre (L)</option>
                <option value="dozen">dozen</option>
                <option value="crate">crate (20 kg)</option>
                <option value="bag">bag (50 kg)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Farmer Price (₹/{unit}) *
              </label>
              <input
                id="input-add-product-price"
                type="number"
                required
                min={1}
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-bold text-emerald-800"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Min Order (MOQ)
              </label>
              <input
                id="input-add-product-moq"
                type="number"
                min={1}
                value={minimumOrderQuantity}
                onChange={(e) => setMinimumOrderQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-bold"
              />
            </div>
          </div>

          {/* Dates & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Available From
              </label>
              <input
                id="input-add-product-avail-date"
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-medium bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Expected Harvest Date
              </label>
              <input
                id="input-add-product-harvest-date"
                type="date"
                value={expectedHarvestDate}
                onChange={(e) => setExpectedHarvestDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-medium bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Farm Location
              </label>
              <input
                id="input-add-product-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="District, State"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-medium"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Produce Image URL
            </label>
            <input
              id="input-add-product-image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-mono text-[11px]"
            />
            <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase flex-shrink-0">
                Quick Preset:
              </span>
              {sampleImages.map((s, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImage(s.url)}
                  className="bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded border border-stone-200 flex-shrink-0 cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Organic & Quality Grade */}
          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 font-bold text-stone-800 cursor-pointer">
                <input
                  id="checkbox-add-product-organic"
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  100% Certified Organic (Zero Chemical Sprays)
                </span>
              </label>

              <select
                id="select-add-product-grade"
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value as any)}
                className="px-2.5 py-1 rounded-lg border border-stone-300 font-bold bg-white text-[11px]"
              >
                <option value="Grade A (Export/Premium)">Grade A (Export/Premium)</option>
                <option value="Grade B (Standard)">Grade B (Standard)</option>
                <option value="Organic Certified">Organic Certified</option>
              </select>
            </div>

            {isOrganic && (
              <input
                id="input-add-product-cert-no"
                type="text"
                placeholder="Organic Certification Number (e.g. NPOP/NAB/0018-ORG)"
                value={organicCertNumber}
                onChange={(e) => setOrganicCertNumber(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 font-medium bg-white text-xs"
              />
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              id="btn-cancel-add-product"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="btn-submit-add-product"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{productToEdit ? 'Update Listing' : 'Publish Product Direct'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
