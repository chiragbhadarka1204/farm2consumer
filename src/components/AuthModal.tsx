import React, { useState } from 'react';
import { X, Sprout, ShoppingBag, ShieldCheck, User as UserIcon, Lock, Mail, Phone, Sparkles } from 'lucide-react';
import { UserRole, User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password?: string) => Promise<void>;
  onRegister: (userData: Partial<User>) => Promise<void>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('demo123');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Anand District, Gujarat');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickDemoLogin = async (demoEmail: string) => {
    try {
      setLoading(true);
      setError('');
      await onLogin(demoEmail);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      if (mode === 'login') {
        await onLogin(email, password);
      } else {
        await onRegister({
          name,
          email,
          phone,
          role,
          address
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="auth-modal-container"
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                {mode === 'login' ? 'Sign In to KisanSetu' : 'Create Direct Account'}
              </h3>
              <p className="text-xs text-stone-500">
                Direct agricultural marketplace ecosystem
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1-Click SIH Evaluation Preset Logins */}
        <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>1-Click SIH Demo Personas</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              id="btn-auth-demo-farmer"
              onClick={() => handleQuickDemoLogin('farmer@example.com')}
              className="bg-white hover:bg-emerald-100 text-emerald-900 font-bold p-2 rounded-xl border border-emerald-300 transition-colors flex flex-col items-center gap-0.5 cursor-pointer shadow-xs"
            >
              <span className="text-base">👨‍🌾</span>
              <span className="text-[11px]">Farmer</span>
            </button>

            <button
              type="button"
              id="btn-auth-demo-buyer"
              onClick={() => handleQuickDemoLogin('buyer@example.com')}
              className="bg-white hover:bg-blue-100 text-blue-900 font-bold p-2 rounded-xl border border-blue-300 transition-colors flex flex-col items-center gap-0.5 cursor-pointer shadow-xs"
            >
              <span className="text-base">🛒</span>
              <span className="text-[11px]">Buyer</span>
            </button>

            <button
              type="button"
              id="btn-auth-demo-admin"
              onClick={() => handleQuickDemoLogin('admin@example.com')}
              className="bg-white hover:bg-purple-100 text-purple-900 font-bold p-2 rounded-xl border border-purple-300 transition-colors flex flex-col items-center gap-0.5 cursor-pointer shadow-xs"
            >
              <span className="text-base">🛡️</span>
              <span className="text-[11px]">Admin</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-800 p-2.5 rounded-xl text-xs font-semibold border border-rose-200">
            {error}
          </div>
        )}

        {/* Standard Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'register' && (
            <>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Your Role *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('farmer')}
                    className={`py-2 rounded-xl font-bold border transition-colors ${
                      role === 'farmer'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    👨‍🌾 Farmer (Seller)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`py-2 rounded-xl font-bold border transition-colors ${
                      role === 'buyer'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    🛒 Buyer (Consumer)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 outline-none font-medium"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-bold text-stone-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="e.g. farmer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 outline-none font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 outline-none font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading
              ? 'Processing...'
              : mode === 'login'
              ? 'Sign In to Marketplace'
              : 'Create Account'}
          </button>
        </form>

        <div className="text-center pt-1 border-t border-stone-100 text-xs">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-stone-500 hover:text-emerald-800 font-semibold"
          >
            {mode === 'login'
              ? "Don't have an account? Sign Up Free"
              : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
