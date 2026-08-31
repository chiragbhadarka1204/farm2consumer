import React, { useState } from 'react';
import { X, Send, User as UserIcon, ShieldCheck, MessageCircle } from 'lucide-react';
import { Message, User } from '../types';

interface ChatDrawerProps {
  isOpen: boolean;
  currentUser: User | null;
  recipientId: string;
  recipientName: string;
  orderId?: string;
  messages: Message[];
  onClose: () => void;
  onSendMessage: (receiverId: string, text: string, orderId?: string) => Promise<void>;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  currentUser,
  recipientId,
  recipientName,
  orderId,
  messages,
  onClose,
  onSendMessage
}) => {
  if (!isOpen) return null;

  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Filter messages between these two parties
  const threadMessages = messages.filter(
    (m) =>
      (m.senderId === currentUser?.id && m.receiverId === recipientId) ||
      (m.senderId === recipientId && m.receiverId === currentUser?.id)
  );

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      setSending(true);
      await onSendMessage(recipientId, inputMessage.trim(), orderId);
      setInputMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full justify-end">
        <div
          id="chat-drawer-panel"
          className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl border-l border-stone-200 flex flex-col justify-between h-full"
        >
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1">
                  <span>{recipientName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </h3>
                <p className="text-[11px] text-stone-500">
                  {orderId ? `Regarding Order #${orderId}` : 'Direct Farm Negotiation Channel'}
                </p>
              </div>
            </div>

            <button
              id="btn-close-chat"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Thread */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-stone-50/50">
            {threadMessages.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <MessageCircle className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-xs font-bold text-stone-700">No messages yet</p>
                <p className="text-[11px] text-stone-400 max-w-xs mx-auto">
                  Ask about harvest schedule, variety specifics, custom quantity packaging, or delivery coordinates.
                </p>
              </div>
            ) : (
              threadMessages.map((msg) => {
                const isMe = msg.senderId === currentUser?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                        isMe
                          ? 'bg-emerald-700 text-white rounded-br-none shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-900 rounded-bl-none shadow-xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-stone-400 px-1 mt-0.5">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 border-t border-stone-200 bg-white flex gap-2">
            <input
              id="input-chat-message"
              type="text"
              placeholder="Type message directly to grower/buyer..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 outline-none text-xs"
            />
            <button
              id="btn-send-chat-msg"
              type="submit"
              disabled={sending || !inputMessage.trim()}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
