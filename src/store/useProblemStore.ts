import { toast } from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],

  getAllProblems: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-all-problems");
      set({ problems: res.data.data.problems });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch problems");
      throw err;
    }
  },

  getProblemById: async (id: string) => {
    try {
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      set({ problem: res.data.data.problem });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error in getting problem");
      throw err;
    }
  },

  getAllSolvedProblems: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-all-solved-problems");
      set({ solvedProblems: res.data.data.solvedProblems });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error getting solved problems",
      );
      throw err;
    }
  },
}));
