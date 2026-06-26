import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-10 bg-base-200/50 backdrop-blur-md border border-primary/30 border-dashed rounded-3xl shadow-2xl w-full max-w-lg mx-auto z-10 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/5 ${className}`}
    >
      {icon && (
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
          {icon}
        </div>
      )}
      <h3 className="text-2xl font-bold text-base-content mb-3 text-center">
        {title}
      </h3>
      <p className="text-center text-base-content/70 whitespace-pre-line mb-4">
        {description}
      </p>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default EmptyState;
