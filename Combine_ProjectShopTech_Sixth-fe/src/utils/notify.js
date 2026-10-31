// Minimal 2025-style notification adapter for the in-house Toast system
// Usage:
// import notify from '../utils/notify';
// notify.success('Đăng nhập thành công');
// notify.error('Lỗi xảy ra', { duration: 5000, position: 'bottom-right' });
//
// This dispatches a CustomEvent captured by ToastProvider to render toasts.

const emit = (type, message, options = {}) => {
  const detail = {
    type,
    message,
    duration: options.duration ?? 3000,
    position: options.position ?? 'top-right',
  };
  window.dispatchEvent(new CustomEvent('app:notify', { detail }));
};

const notify = {
  success: (msg, opts) => emit('success', msg, opts),
  error: (msg, opts) => emit('error', msg, opts),
  warning: (msg, opts) => emit('warning', msg, opts),
  info: (msg, opts) => emit('info', msg, opts),
};

export default notify;


