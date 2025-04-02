import "/public/css/toast.css";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

type ToastTypes = "success" | "error";

export interface ToastProps {
  message: string;
  type: ToastTypes;
}

const Toast = ({ message, type }: ToastProps) => {
  return (
    <div className="flex flex-col gap-1 pl-6">
      <div>
        <span
          className={`flex w-full gap-1 ${
            type === "error" ? "text-error" : "text-success"
          } items-center`}
        >
          {type === "error" && (
            <>
              <XCircleIcon className="absolute left-2 size-6" />
              <span>
                <strong>Error</strong>
              </span>
            </>
          )}
          {type === "success" && (
            <>
              <CheckCircleIcon className="absolute left-2 size-6" />
              <span>
                <strong>Exitoso</strong>
              </span>
            </>
          )}
        </span>
      </div>
      <div className="flex flex-col text-text-primary">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
