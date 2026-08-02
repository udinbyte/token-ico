import React, { createContext, useContext, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// ============ STYLES ============
const TOAST_STYLE = {
  success: {
    style: {
      background: '#22c55e',
      color: 'white',
      padding: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    icon: '✅',
  },
  error: {
    style: {
      background: '#ef4444',
      color: 'white',
      padding: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    icon: '❌',
  },
  loading: {
    style: {
      background: '#facc15',
      color: '#1a1a1a',
      padding: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    icon: '⏳',
  },
  info: {
    style: {
      background: '#2ed3c0',
      color: 'white',
      padding: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    icon: 'ℹ️',
  },
};

// ============ CONTEXT ============
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showLoading = useCallback((message = 'Processing...') => {
    return toast.loading(message, {
      style: TOAST_STYLE.loading.style,
      icon: TOAST_STYLE.loading.icon,
    });
  }, []);

  const showSuccess = useCallback((message = 'Success!') => {
    return toast.success(message, {
      style: TOAST_STYLE.success.style,
      icon: TOAST_STYLE.success.icon,
      duration: 5000,
    });
  }, []);

  const showError = useCallback((message = 'Failed!') => {
    return toast.error(message, {
      style: TOAST_STYLE.error.style,
      icon: TOAST_STYLE.error.icon,
      duration: 5000,
    });
  }, []);

  const showInfo = useCallback((message = 'Info') => {
    return toast(message, {
      style: TOAST_STYLE.info.style,
      icon: TOAST_STYLE.info.icon,
      duration: 4000,
    });
  }, []);

  const updateToast = useCallback((id, state, message) => {
    toast.dismiss(id);

    switch (state) {
      case 'loading':
        return showLoading(message);
      case 'success':
        return showSuccess(message);
      case 'error':
        return showError(message);
      case 'info':
        return showInfo(message);
      default:
        return showInfo(message);
    }
  }, [showLoading, showSuccess, showError, showInfo]);

  const notify = {
    start: showLoading,
    update: updateToast,
    success: showSuccess,
    error: showError,
    info: showInfo,
    complete: (id, message) => updateToast(id, 'success', message),
    reject: (id, message) => updateToast(id, 'error', message),
    failed: (id, message) => updateToast(id, 'error', message),
  };

  return (
    <ToastContext.Provider value={{ notify, toast }}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
      {children}
    </ToastContext.Provider>
  );
};

// ============ HOOK ============
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};