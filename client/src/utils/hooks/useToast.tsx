import { toast } from "sonner";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"; // Import icons

type ToastType = "success" | "error" | "info" | "warning";

const toastStyles: Record<ToastType, { color: string; icon: React.ReactNode }> = {
  success: { color: "bg-green-500 text-white", icon: <CheckCircle className="text-green-400 w-5 h-5" /> },
  error: { color: "bg-red-500 text-white", icon: <XCircle className="text-red-400 w-5 h-5" /> },
  info: { color: "bg-blue-500 text-white", icon: <Info className="text-blue-400 w-5 h-5" /> },
  warning: { color: "bg-yellow-500 text-black", icon: <AlertTriangle className="text-yellow-400 w-5 h-5" /> },
};

export const useToast = () => {
  const showToast = (type: ToastType, message: string, description?: string) => {
    toast[type](message, {
      description,
      duration: 4000,
      position: "bottom-right",
      icon: toastStyles[type].icon,
      classNames: {
        toast: `p-4 rounded-lg shadow-lg border ${toastStyles[type].color}`,
        title: "font-semibold",
        description: "text-sm text-gray-200",
      },
    });
  };

  return {
    success: (msg: string, desc?: string) => showToast("success", msg, desc),
    error: (msg: string, desc?: string) => showToast("error", msg, desc),
    info: (msg: string, desc?: string) => showToast("info", msg, desc),
    warning: (msg: string, desc?: string) => showToast("warning", msg, desc),
  };
};