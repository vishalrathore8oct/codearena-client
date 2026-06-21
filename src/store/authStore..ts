import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import type { AuthState } from "../types/authStore";

const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  authUser: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-user-profile");
      set({
        isAuthenticated: true,
        authUser: res.data.data.user,
      });
      toast.success(res.data.message);
    } catch (err: any) {
      set({
        isAuthenticated: false,
        authUser: null,
      });
      toast.error(
        err.response?.data?.message || "Failed to check authentication",
      );
      throw err;
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({
        isAuthenticated: true,
        authUser: res.data.data.user,
      });
      toast.success(res.data.message);
    } catch (err: any) {
      set({
        isAuthenticated: false,
        authUser: null,
      });
      toast.error(err.response?.data?.message || "Failed to login");
      throw err;
    }
  },

  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);

      set({
        isAuthenticated: true,
        authUser: res.data.data.user,
      });
      toast.success(res.data.message);
    } catch (err: any) {
      set({
        isAuthenticated: false,
        authUser: null,
      });
      toast.error(err.response?.data?.message || "Failed to signup");
      throw err;
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      set({
        isAuthenticated: false,
        authUser: null,
      });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to logout");
      throw err;
    }
  },
}));

export default useAuthStore;
