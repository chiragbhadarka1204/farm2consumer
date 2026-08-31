import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MapPin,
  MessageCircle,
  AlertTriangle,
  Star,
  ShieldCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingModalProps {
  order: Order | null;
  onClose: () => void;
  onOpenChat: (farmerId: string, farmerName: string, orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onOpenReview: (order: Order) => void;
  onOpenFileDispute: (order: Order) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  onClose,
  onOpenChat,
  onCancelOrder,
  onOpenReview,
  onOpenFileDispute
}) => {
  if (!order) return null;

  const stages: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'Pending', label: 'Order Transmitted', desc: 'Direct request sent to farmer' },
    { status: 'Accepted', label: 'Farmer Confirmed', desc: 'Farmer confirmed harvest & reservation' },
    { status: 'Preparing', label: 'Fresh Harvest & Sort', desc: 'Crop harvested and graded in field' },
    { status: 'Ready', label: 'Packed & Eco-Crated', desc: 'Ready for farm pickup / dispatch vehicle' },
    { status: 'Out for Delivery', label: 'In Direct Transit', desc: 'Dispatched to your doorstep' },
    { status: 'Delivered', label: 'Delivered & Handed Over', desc: 'Direct farm produce received' }
  ];

  const getStageIndex = (status: OrderStatus) => {
    if (status === 'Cancelled') return -1;
    return stages.findIndex((s) => s.status === status);
  };

  const currentStageIndex = getStageIndex(order.orderStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="order-tracking-modal-container"
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-stone-900">
                  Track Order #{order.id}
                </h3>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    order.orderStatus === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.orderStatus === 'Cancelled'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            id="btn-close-order-tracking"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 6-Stage Timeline */}
        {order.orderStatus === 'Cancelled' ? (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center space-y-1">
            <h4 className="font-bold text-rose-900 text-sm">Order Cancelled</h4>
            <p className="text-xs text-rose-700">
              This direct order was cancelled. Any pre-payments are returned directly.
            </p>
          </div>
        ) : (
          <div className="space-y-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              Harvest & Delivery Milestones
            </h4>
            <div className="space-y-4">
              {stages.map((stage, idx) => {
                const isCompleted = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={idx} className="flex items-start gap-3 relative">
                    {/* Connecting line */}
                    {idx < stages.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-6 w-0.5 h-7 ${
                          idx < currentStageIndex ? 'bg-emerald-600' : 'bg-stone-200'
                        }`}
                      />
                    )}

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 z-10 ${
                        isCompleted
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-200 text-stone-500'
                      } ${isCurrent ? 'ring-4 ring-emerald-200' : ''}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <p
                        className={`text-xs font-bold ${
                          isCompleted ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {stage.label}
                      </p>
                      <p className="text-[11px] text-stone-500">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Farmer & Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-emerald-50/60 border border-emerald-200 p-3.5 rounded-2xl space-y-1.5">
            <span className="font-extrabold text-[10px] uppercase text-emerald-800 tracking-wider">
              Grower Information
            </span>
            <p className="font-bold text-stone-900 text-sm">{order.farmerName}</p>
            <p className="text-stone-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Verified Farmer</span>
            </p>
            <button
              id="btn-track-message-farmer"
              onClick={() => onOpenChat(order.farmerId, order.farmerName, order.id)}
              className="mt-1 inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct Message Farmer</span>
            </button>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-2xl space-y-1.5">
            <span className="font-extrabold text-[10px] uppercase text-stone-500 tracking-wider">
              Destination Address
            </span>
            <p className="text-stone-800 flex items-start gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
              <span>{order.deliveryAddress}</span>
            </p>
            <p className="text-[11px] text-stone-500 pt-1">
              Type: <strong className="capitalize text-stone-700">{order.deliveryType.replace('_', ' ')}</strong>
            </p>
          </div>
        </div>

        {/* Items Summary */}
        <div className="space-y-2">
          <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
            Order Items
          </h4>
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="font-bold text-stone-900">{item.productName}</p>
                  <p className="text-[11px] text-stone-500">
                    {item.quantity} {item.unit} × ₹{item.unitPrice}
                  </p>
                </div>
              </div>
              <span className="font-bold text-stone-900">₹{item.totalPrice}</span>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2 font-bold text-sm text-stone-900">
            <span>Total Paid (Direct):</span>
            <span className="font-display font-black text-base text-emerald-900">
              ₹{order.totalAmount}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
          {order.orderStatus === 'Delivered' ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="btn-rate-delivered-order"
                onClick={() => onOpenReview(order)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Rate & Review Harvest</span>
              </button>

              <button
                id="btn-file-dispute-order"
                onClick={() => onOpenFileDispute(order)}
                className="text-stone-600 hover:text-stone-900 font-semibold px-3 py-2 text-xs hover:bg-stone-100 rounded-xl"
              >
                Report Issue
              </button>
            </div>
          ) : order.orderStatus === 'Pending' ? (
            <button
              id="btn-cancel-pending-order"
              onClick={() => onCancelOrder(order.id)}
              className="text-rose-700 hover:bg-rose-50 border border-rose-200 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
            >
              Cancel Order
            </button>
          ) : (
            <button
              id="btn-file-dispute-transit"
              onClick={() => onOpenFileDispute(order)}
              className="text-stone-500 hover:text-stone-800 text-xs font-semibold"
            >
              Need Help with this Order?
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-bold text-stone-600 hover:bg-stone-100 text-xs"
          >
            Close Tracking
          </button>
        </div>
      </div>
    </div>
  );
};
