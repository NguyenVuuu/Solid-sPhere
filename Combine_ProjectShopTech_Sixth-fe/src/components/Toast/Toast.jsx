import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// message supports string or JSX (ReactNode)
const Toast = ({ id, type = 'info', message, duration = 2500, onClose, position = 'top-right' }) => {
  const { t } = useTranslation();

  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const toastConfig = {
    success: { bg: 'bg-white', text: 'text-gray-900', accent: 'border-green-500' },
    error: { bg: 'bg-white', text: 'text-gray-900', accent: 'border-red-500' },
    warning: { bg: 'bg-white', text: 'text-gray-900', accent: 'border-amber-500' },
    info: { bg: 'bg-white', text: 'text-gray-900', accent: 'border-blue-500' },
  };

  const config = toastConfig[type] || toastConfig.info;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  };

  // Minimal motion: fade only for calmer UX
  const animationClasses = isExiting ? 'opacity-0' : 'opacity-100';

  return (
    <div
      className={`fixed ${positionClasses[position]} z-[9999] transition-opacity duration-150 ease-out ${animationClasses}`}
    >
      <div className={`${config.bg} min-w-[240px] max-w-sm rounded-md border ${config.accent} border-opacity-20 px-3 py-2 shadow-sm`}>
        <div className="flex items-center gap-2">
          <div className={`flex-1 ${config.text} text-sm leading-snug`}>
            {message}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-100"
            aria-label="Close"
          >
            <FaTimes className="text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
