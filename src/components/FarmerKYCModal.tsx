import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Upload,
  Sparkles,
  AlertCircle,
  Landmark,
  Leaf,
  Layers,
  Award
} from 'lucide-react';
import { FarmerProfile, VerificationLevel } from '../types';

interface FarmerKYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmerProfile?: FarmerProfile;
  onSubmitKYC: (kycData: Partial<FarmerProfile>) => Promise<void>;
}

export const FarmerKYCModal: React.FC<FarmerKYCModalProps> = ({
  isOpen,
  onClose,
  farmerProfile,
  onSubmitKYC
}) => {
  if (!isOpen) return null;

  const currentLevel: VerificationLevel =
    farmerProfile?.verificationLevel || farmerProfile?.verificationStatus || 'profile_verified';

  const [farmSizeAcres, setFarmSizeAcres] = useState<number>(farmerProfile?.farmSizeAcres || 10);
  const [landRecord712, setLandRecord712] = useState<string>(
    farmerProfile?.landRecord712Number || 'Survey No. 402/1, Boriavi'
  );
  const [aadhaarNumber, setAadhaarNumber] = useState<string>(
    farmerProfile?.aadhaarNumber || 'XXXX-XXXX-8921'
  );
  const [cropsText, setCropsText] = useState<string>(
    farmerProfile?.mainCrops?.join(', ') || 'Tomatoes, Organic Wheat, Okra'
  );
  const [organicCert, setOrganicCert] = useState<string>(
    farmerProfile?.organicCertNumber || 'NPOP/NAB/0018-ORG'
  );
  const [soilHealthCard, setSoilHealthCard] = useState<string>(
    farmerProfile?.soilHealthCardNumber || 'SHC-GUJ-2024-88219'
  );
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    farmerProfile?.kycDocuments?.[0]?.fileName || '712_RoR_Verified.pdf'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const crops = cropsText
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      await onSubmitKYC({
        farmSizeAcres: Number(farmSizeAcres),
        landRecord712Number: landRecord712,
        aadhaarNumber: aadhaarNumber,
        mainCrops: crops,
        organicCertNumber: organicCert || undefined,
        soilHealthCardNumber: soilHealthCard || undefined
      });

      setSuccessMessage('Land & Identity verification successfully processed and verified!');
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="farmer-kyc-modal"
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-start justify-between bg-stone-50/80 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Farmer Trust & Land Record Verification (KYC)
              </h3>
              <p className="text-xs text-stone-600">
                Verify 7/12 Land Records & Aadhaar OTP to earn the verified green trust badge.
              </p>
            </div>
          </div>

          <button
            id="btn-close-kyc-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-600 flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verification Tiers Breakdown */}
        <div className="p-6 space-y-6">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Current Trust Tier
              </span>
              <span className="text-xs font-black bg-emerald-700 text-white px-2.5 py-0.5 rounded-full">
                {currentLevel.replace(/_/g, ' ').toUpperCase()} ✓
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div
                className={`p-2.5 rounded-xl border ${
                  currentLevel === 'profile_verified' || currentLevel === 'farm_verified' || currentLevel === 'identity_verified'
                    ? 'bg-white border-emerald-300 font-bold text-emerald-950'
                    : 'bg-stone-100 border-stone-200 text-stone-400'
                }`}
              >
                <div className="flex justify-center mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span>1. Profile Verified</span>
              </div>

              <div
                className={`p-2.5 rounded-xl border ${
                  currentLevel === 'farm_verified' || currentLevel === 'identity_verified'
                    ? 'bg-white border-emerald-300 font-bold text-emerald-950'
                    : 'bg-stone-100 border-stone-200 text-stone-400'
                }`}
              >
                <div className="flex justify-center mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span>2. Farm Land Verified</span>
              </div>

              <div
                className={`p-2.5 rounded-xl border ${
                  currentLevel === 'identity_verified'
                    ? 'bg-emerald-800 text-white border-emerald-800 font-bold shadow-xs'
                    : 'bg-stone-100 border-stone-200 text-stone-400'
                }`}
              >
                <div className="flex justify-center mb-1">
                  <Award className={`w-4 h-4 ${currentLevel === 'identity_verified' ? 'text-amber-300' : 'text-stone-400'}`} />
                </div>
                <span>3. 7/12 & Aadhaar Verified</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Total Farm Size (in Acres) *
                </label>
                <input
                  id="input-kyc-farm-size"
                  type="number"
                  step="0.1"
                  required
                  value={farmSizeAcres}
                  onChange={(e) => setFarmSizeAcres(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Aadhaar / Government ID Number *
                </label>
                <input
                  id="input-kyc-aadhaar"
                  type="text"
                  required
                  placeholder="e.g. XXXX-XXXX-8921"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  7/12 RoR Survey / Khatiyan Number *
                </label>
                <input
                  id="input-kyc-712"
                  type="text"
                  required
                  placeholder="e.g. Survey No. 402/1, Boriavi"
                  value={landRecord712}
                  onChange={(e) => setLandRecord712(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Main Crops Grown *
                </label>
                <input
                  id="input-kyc-crops"
                  type="text"
                  required
                  placeholder="e.g. Tomatoes, Wheat, Bananas"
                  value={cropsText}
                  onChange={(e) => setCropsText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  NPOP Organic Cert (Optional)
                </label>
                <input
                  id="input-kyc-organic-cert"
                  type="text"
                  placeholder="e.g. NPOP/NAB/0018-ORG"
                  value={organicCert}
                  onChange={(e) => setOrganicCert(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Soil Health Card No. (Optional)
                </label>
                <input
                  id="input-kyc-soil-card"
                  type="text"
                  placeholder="e.g. SHC-GUJ-2024-88219"
                  value={soilHealthCard}
                  onChange={(e) => setSoilHealthCard(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
              </div>
            </div>

            {/* Document Upload Simulator */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Upload 7/12 Land Record Document (PDF / Image)
              </label>
              <div className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-2xl p-4 text-center bg-stone-50 transition-colors relative cursor-pointer">
                <input
                  type="file"
                  id="file-upload-land-record"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                  <Upload className="w-6 h-6 text-stone-400" />
                  <p className="text-xs font-semibold text-stone-700">
                    {uploadedFile ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Selected: {uploadedFile}
                      </span>
                    ) : (
                      'Click or drag & drop 7/12 RoR land record extract (PDF, PNG, JPG)'
                    )}
                  </p>
                  <span className="text-[10px] text-stone-400">Max size 10MB • Auto-scanned for digital stamp</span>
                </div>
              </div>
            </div>

            {successMessage && (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold p-3 rounded-xl flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                id="btn-submit-kyc-verification"
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Verifying Documents...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Save & Verify Land Credentials ✓</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
