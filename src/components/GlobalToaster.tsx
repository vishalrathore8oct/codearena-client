import { X } from "lucide-react";
import { ToastBar, Toaster, toast } from "react-hot-toast";

const GlobalToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className:
          "!bg-base-200 !text-base-content !shadow-lg border border-base-300",
        duration: 4000,
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button
                  type="button"
                  onClick={() => toast.dismiss(t.id)}
                  className="p-1 ml-2 rounded-md hover:bg-base-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 opacity-70 hover:opacity-100" />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default GlobalToaster;
