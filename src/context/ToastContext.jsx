import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/Toast';

const ToastContext = createContext({ showToast: () => {} });

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, opts = {}) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, ...opts };
    setToasts((t) => [toast, ...t]);
    if (!opts.sticky) {
      const ttl = opts.duration || 4000;
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastContext;
