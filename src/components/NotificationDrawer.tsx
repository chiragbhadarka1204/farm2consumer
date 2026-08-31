import React from 'react';
import { X, Bell, CheckCircle2, Clock, Truck, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Notification } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  notifications,
  onClose,
  onMarkAsRead,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full justify-end">
        <div
          id="notifications-drawer-panel"
          className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl border-l border-stone-200 flex flex-col justify-between h-full"
        >
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-stone-900 text-base">
                Notification Center ({notifications.filter((n) => !n.isRead).length})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClearAll}
                className="text-[11px] font-bold text-stone-500 hover:text-stone-800"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <Bell className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-xs font-bold text-stone-700">No new notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onMarkAsRead(notif.id)}
                  className={`p-3.5 rounded-2xl border transition-colors cursor-pointer space-y-1 ${
                    notif.isRead
                      ? 'bg-white border-stone-200 opacity-75'
                      : 'bg-emerald-50/70 border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      )}
                      {notif.title}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {notif.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
