import type { ReactNode } from "react";
import React from "react";
import useAuthStore from "../store/useAuthStore";

interface LogoutButtonProps {
  children: ReactNode;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  children,
  className = "",
}) => {
  const { logout } = useAuthStore();

  const onLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <button
      type="button"
      className={`btn btn-primary ${className}`}
      onClick={onLogout}
    >
      {children}
    </button>
  );
};

export default LogoutButton;
