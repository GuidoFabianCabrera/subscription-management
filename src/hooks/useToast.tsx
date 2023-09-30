import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
  const [toastId, setToastId] = useState(null);

  const showToast = (message: any, options = {}) => {
    if (toastId) {
      toast.dismiss(toastId);
    }

    const id = toast(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });

    setToastId(id);
  };

  return {
    showToast,
  };
};

export default useToast;
