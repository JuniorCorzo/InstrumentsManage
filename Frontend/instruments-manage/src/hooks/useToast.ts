import Toast, { ToastProps } from "@/components/Toast";
import { toast } from "react-toastify";

export const useToast = () => {
  const displayToast = (toastProps: ToastProps) => {
    toast(Toast(toastProps), {
      position: "top-right",
      autoClose: 2500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return { displayToast };
};
