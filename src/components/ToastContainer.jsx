import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 opacity-100 ${
              isSuccess
                ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-100 dark:bg-slate-900/95'
                : isError
                ? 'bg-slate-900/95 border-rose-500/40 text-rose-100 dark:bg-slate-900/95'
                : 'bg-slate-900/95 border-indigo-500/40 text-indigo-100 dark:bg-slate-900/95'
            } backdrop-blur-md`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {isInfo && <Info className="w-5 h-5 text-indigo-400" />}
            </div>

            <div className="flex-1 text-sm min-w-0">
              {toast.title && (
                <div className="font-semibold text-white tracking-wide mb-0.5">
                  {toast.title}
                </div>
              )}
              <div className="text-slate-300 text-xs leading-relaxed break-words">
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-slate-400 hover:text-white transition-colors p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
