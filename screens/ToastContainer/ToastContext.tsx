import React, { createContext, useState } from "react";
import { LayoutAnimation } from "react-native";
import ToastContainer from "./components/ToastContainer";
import { ToastItem } from "./types";

const ToastContext = createContext({
  addToast: (toast: ToastItem) => {},
  removeToast: (toastId: string) => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: ToastItem) => {
    LayoutAnimation.spring();
    setToasts((prev) => [
      ...prev,
      {
        ...toast,
        id: toast.id || Date.now(),
      } as ToastItem,
    ]);
  };

  const removeToast = (toastId: string) => {
    LayoutAnimation.spring();
    setToasts((prev) => prev.filter((item) => item.id !== toastId));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer data={toasts} />
    </ToastContext.Provider>
  );
};

export default ToastContext;
