import React from 'react';
import { FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ toast, onClose }) => {
  const type = toast.type || 'info';
  // Use the site's primary color so toast matches site buttons
  const bg = 'bg-[hsl(var(--color-primary))]';
  const Icon = type === 'success' ? FiCheckCircle : type === 'error' ? FiXCircle : FiInfo;

  // If toast requests modal display, render centered modal overlay
  if (toast.modal) {
    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-lg w-full p-6 bg-white rounded-md shadow-2xl border border-[hsl(var(--color-border))]">
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full text-white ${bg}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-[hsl(var(--color-foreground))]">{toast.title || (type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Notice')}</div>
              <div className="mt-2 text-sm text-[hsl(var(--color-muted-foreground))]">{toast.message}</div>
            </div>
            <div>
              <button onClick={() => onClose(toast.id)} className="btn btn-ghost">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-sm w-full ${bg} text-white shadow-xl rounded-md overflow-hidden border-l-4 border-white/20`}
         role="status" aria-live="polite">
      <div className="p-3 flex items-start gap-3">
        <div className="pt-0.5">
          <Icon className="w-6 h-6 opacity-90" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{toast.title || (type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Notice')}</div>
          <div className="text-sm opacity-90 mt-1">{toast.message}</div>
        </div>
        <div>
          <button onClick={() => onClose(toast.id)} className="text-sm text-white/90 px-2 py-1">✕</button>
        </div>
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts = [], onClose = () => {} }) => {
  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col gap-3"> 
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastContainer;
