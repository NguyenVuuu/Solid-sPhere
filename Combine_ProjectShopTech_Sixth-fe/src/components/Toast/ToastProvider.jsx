import { createContext, useContext, useState } from 'react';
import Toast from './Toast';
import { useTranslation } from 'react-i18next';
import { useEffect} from 'react';
const ToastContext = createContext();

export const useToast = () => {
  const { t } = useTranslation();

  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 5000, position = 'top-right') => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration, position };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);

    return id;
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message, duration, position) => {
    return addToast(message, 'success', duration, position);
  };

  const showError = (message, duration, position) => {
    return addToast(message, 'error', duration, position);
  };

  const showWarning = (message, duration, position) => {
    return addToast(message, 'warning', duration, position);
  };

  const showInfo = (message, duration, position) => {
    return addToast(message, 'info', duration, position);
  };

  // Global event bridge so non-react files or non-hook places can trigger notifications
  useEffect(() => {
    const handler = (e) => {
      const { type = 'info', message = '', duration = 3000, position = 'top-right' } = e.detail || {};
      addToast(message, type, duration, position);
    };
    window.addEventListener('app:notify', handler);
    return () => window.removeEventListener('app:notify', handler);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        addToast,
        showSuccess,
        showError,
        showWarning,
        showInfo
      }}
    >
      {children}
      
      {/* Render Toasts by Position */}
      <div className="fixed top-0 right-0 pointer-events-none z-[9999]">
        <div className="flex flex-col gap-3 p-4 pointer-events-auto">
          {toasts
            .filter((toast) => toast.position === 'top-right')
            .map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={removeToast}
              />
            ))}
        </div>
      </div>

      <div className="fixed top-0 left-0 pointer-events-none z-[9999]">
        <div className="flex flex-col gap-3 p-4 pointer-events-auto">
          {toasts
            .filter((toast) => toast.position === 'top-left')
            .map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={removeToast}
              />
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 right-0 pointer-events-none z-[9999]">
        <div className="flex flex-col-reverse gap-3 p-4 pointer-events-auto">
          {toasts
            .filter((toast) => toast.position === 'bottom-right')
            .map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={removeToast}
              />
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 pointer-events-none z-[9999]">
        <div className="flex flex-col-reverse gap-3 p-4 pointer-events-auto">
          {toasts
            .filter((toast) => toast.position === 'bottom-left')
            .map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={removeToast}
              />
            ))}
        </div>
      </div>

      <div className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none z-[9999]">
        <div className="flex flex-col gap-3 p-4 pointer-events-auto">
          {toasts
            .filter((toast) => toast.position === 'top-center')
            .map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={removeToast}
              />
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-[9999]">
        <div className="flex flex-col-reverse gap-3 p-4 pointer-events-auto">
          {toasts
            .filter((toast) => toast.position === 'bottom-center')
            .map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={removeToast}
              />
            ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
