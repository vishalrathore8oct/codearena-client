import { LoaderPinwheel } from "lucide-react";
import React from "react";

interface LoadingStateProps {
  title?: string;
  description?: string;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  title = "Loading...",
  description,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[50vh] w-full ${className}`}
    >
      <div className="flex flex-col items-center justify-center bg-base-100 p-10 rounded-3xl shadow-2xl border border-primary/20 backdrop-blur-md">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
          <LoaderPinwheel className="w-10 h-10 text-primary animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-base-content mb-2">{title}</h2>
        {description && (
          <p className="text-base-content/60 text-center">{description}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingState;
