import { Code, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import LogoutButton from "./LogoutButton";

interface AuthUser {
  name: string;
  image?: string;
  role: "ADMIN" | "USER" | string;
}

const Navbar: React.FC = () => {
  const { authUser } = useAuthStore() as {
    authUser: AuthUser | null;
  };

  return (
    <nav className="sticky top-0 z-50 w-full py-5">
      <div className="flex w-full justify-between mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/codearena.svg"
            alt="CodeArena Logo"
            className="h-18 w-18 bg-primary/20 text-primary border-none px-2 py-2 rounded-full"
          />
          <span className="hidden text-lg font-bold tracking-tight text-white md:block md:text-2xl">
            CodeArena
          </span>
        </Link>

        {/* User Profile */}
        <div className="flex items-center gap-8">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar flex flex-row"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    authUser?.image ??
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 w-52 space-y-3 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <p className="text-base font-semibold">
                  {authUser?.name ?? "Guest"}
                </p>
                <hr className="border-gray-200/10" />
              </li>

              <li>
                <Link
                  to="/profile"
                  className="text-base font-semibold hover:bg-primary hover:text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Link>
              </li>

              {authUser?.role === "ADMIN" && (
                <li>
                  <Link
                    to="/add-problem"
                    className="text-base font-semibold hover:bg-primary hover:text-white"
                  >
                    <Code className="mr-1 h-4 w-4" />
                    Add Problem
                  </Link>
                </li>
              )}

              <li>
                <LogoutButton className="hover:bg-primary hover:text-white">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
