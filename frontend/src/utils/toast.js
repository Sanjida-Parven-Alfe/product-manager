import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#1e1b4b',
      color: '#fff',
      border: '1px solid #5046e4',
      borderRadius: '10px',
      fontSize: '14px',
    },
    iconTheme: {
      primary: '#5046e4',
      secondary: '#fff',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#1e1b4b',
      color: '#fff',
      border: '1px solid #ef4444',
      borderRadius: '10px',
      fontSize: '14px',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  });
};

export const showLoading = (message) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#1e1b4b',
      color: '#fff',
      border: '1px solid #5046e4',
      borderRadius: '10px',
      fontSize: '14px',
    },
  });
};

export const dismissToast = (id) => toast.dismiss(id);