import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  Truck,
  MapPin,
  ShieldCheck,
  CreditCard,
  Banknote,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, DeliveryType, PaymentMethod, User } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  currentUser: User | null;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (
    items: CartItem[],
    deliveryType: DeliveryType,
    deliveryAddress: string,
    paymentMethod: PaymentMethod
  ) => Promise<void>;
  onOpenAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cartItems,
  currentUser,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onOpenAuth
}) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('farmer_direct');
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser?.address || 'Flat 402, Shivalik Residency, Satellite, Ahmedabad, Gujarat - 380015'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.pricePerUnit * item.quantity,
    0
  );

  const deliveryFee = deliveryType === 'farm_pickup' ? 0 : deliveryType === 'farmer_direct' ? 40 : 60;
  const estimatedSavings = Math.round(subtotal * 0.28);
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (cartItems.length === 0) return;
    if (!deliveryAddress.trim()) return;

    try {
      setIsSubmitting(true);
      await onCheckout(cartItems, deliveryType, deliveryAddress, paymentMethod);
      
      // Trigger festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setOrderSuccessId(`FM${Math.floor(10000 + Math.random() * 90000)}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full justify-end">
        <div
          id="cart-drawer-panel"
          className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl border-l border-stone-200 flex flex-col justify-between h-full"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h3 className="font-display font-extrabold text-lg text-stone-900">
                Direct Farm Basket ({cartItems.length})
              </h3>
            </div>
            <button
              id="btn-close-cart"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-6">
            {orderSuccessId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-2xl font-bold text-stone-900">
                    Order Placed Successfully!
                  </h4>
                  <p className="text-xs text-stone-500">
                    Your direct order has been transmitted directly to the farmer.
                  </p>
                  <p className="text-sm font-black text-emerald-800 pt-2">
                    Reference ID: #{orderSuccessId}
                  </p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1 text-left">
                  <p className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Zero Middlemen Commission
                  </p>
                  <p className="text-emerald-800">
                    100% of the produce value will be credited directly to the farmer.
                  </p>
                </div>
                <button
                  id="btn-done-cart-success"
                  onClick={() => {
                    setOrderSuccessId(null);
                    onClose();
                  }}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <h4 className="font-bold text-stone-700">Your basket is empty</h4>
                <p className="text-xs text-stone-400">
                  Explore fresh farm produce and add items directly from local growers.
                </p>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      id={`cart-item-${item.product.id}`}
                      className="flex items-center justify-between gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h5 className="font-bold text-stone-900 text-xs truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-stone-500 truncate">
                          Grower: {item.product.farmerName}
                        </p>
                        <p className="text-xs font-black text-emerald-800">
                          ₹{item.product.pricePerUnit}/{item.product.unit}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-xs">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                Math.max(item.product.minimumOrderQuantity, item.quantity - 1)
                              )
                            }
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-xs text-stone-900">
                            {item.quantity} {item.product.unit}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                Math.min(item.product.quantity, item.quantity + 1)
                              )
                            }
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[10px] text-stone-400 hover:text-rose-600 flex items-center gap-0.5 font-semibold"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Option Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-700">
                    Select Delivery Logistics:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('farmer_direct')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        deliveryType === 'farmer_direct'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-stone-200 bg-white text-stone-600'
                      }`}
                    >
                      <p className="text-[11px] font-bold">Farmer Direct</p>
                      <p className="text-[10px] text-stone-500">₹40 • Tempo/Auto</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('farm_pickup')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        deliveryType === 'farm_pickup'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-stone-200 bg-white text-stone-600'
                      }`}
                    >
                      <p className="text-[11px] font-bold">Farmgate Pickup</p>
                      <p className="text-[10px] text-emerald-700 font-bold">FREE (₹0)</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('partner_logistics')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        deliveryType === 'partner_logistics'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-stone-200 bg-white text-stone-600'
                      }`}
                    >
                      <p className="text-[11px] font-bold">Partner Express</p>
                      <p className="text-[10px] text-stone-500">₹60 • Fast Cold</p>
                    </button>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Delivery Address:
                  </label>
                  <textarea
                    id="input-cart-delivery-address"
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter complete delivery location with landmarks..."
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none font-medium"
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-700">
                    Payment Method:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950'
                          : 'border-stone-200 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-emerald-600"
                      />
                      <Banknote className="w-4 h-4 text-emerald-700" />
                      <span>Cash On Delivery</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-950'
                          : 'border-stone-200 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-emerald-600"
                      />
                      <CreditCard className="w-4 h-4 text-emerald-700" />
                      <span>UPI / Netbanking</span>
                    </label>
                  </div>
                </div>

                {/* Savings Summary Banner */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-900">
                  <span className="flex items-center gap-1 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Estimated Direct Savings:
                  </span>
                  <span className="font-black text-emerald-900">
                    ~₹{estimatedSavings} vs Supermarket
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {!orderSuccessId && cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Produce Subtotal:</span>
                  <strong className="text-stone-900">₹{subtotal}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Logistics / Delivery:</span>
                  <strong className="text-stone-900">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</strong>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Intermediary Brokerage (Cut):</span>
                  <span>₹0 (100% Free)</span>
                </div>
                <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>Grand Total:</span>
                  <span className="font-display text-lg text-emerald-900">₹{grandTotal}</span>
                </div>
              </div>

              <button
                id="btn-place-direct-order"
                disabled={isSubmitting}
                onClick={handlePlaceOrder}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting to Farmer...</span>
                ) : (
                  <>
                    <span>Confirm & Place Direct Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
