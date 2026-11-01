import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast, lang } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed bottom-6 ${
        lang === 'ar' ? 'left-6' : 'right-6'
      } z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none`}
    >
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-[#EAE5DF] bg-[#121214] text-white';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-[#22C55E]/30 bg-[#121214] text-white';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-[#EF4444]/30 bg-[#121214] text-white';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xl ${borderClass} animate-in slide-in-from-bottom duration-300`}
          >
            <div className="flex items-center gap-2.5">
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  toast.type === 'success'
                    ? 'text-[#4ADE80]'
                    : toast.type === 'error'
                    ? 'text-[#F87171]'
                    : 'text-[#F4A7B9]'
                }`}
              />
              <span className="text-xs font-medium leading-relaxed">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
