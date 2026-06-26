import { toast } from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import type { Problem, SolvedProblem } from "../types/Problem";

interface ProblemStore {
  problems: Problem[];
  problem: Problem | null;
  solvedProblems: SolvedProblem[];
  isAllProblemsLoading: boolean;
  isProblemLoading: boolean;
  isSolvedProblemsLoading: boolean;
  getAllProblems: () => Promise<void>;
  getProblemById: (id?: string) => Promise<void>;
  getAllSolvedProblems: () => Promise<void>;
}

export const useProblemStore = create<ProblemStore>((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isAllProblemsLoading: false,
  isProblemLoading: false,
  isSolvedProblemsLoading: false,

  getAllProblems: async () => {
    set({ isAllProblemsLoading: true });
    try {
      const res = await axiosInstance.get("/problems/get-all-problems");
      set({ problems: res.data.data.problems });
      // toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch problems");
      throw err;
    } finally {
      set({ isAllProblemsLoading: false });
    }
  },

  getProblemById: async (id?: string) => {
    set({ isProblemLoading: true });
    try {
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      set({ problem: res.data.data.problem });
      // toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error in getting problem");
      throw err;
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getAllSolvedProblems: async () => {
    set({ isSolvedProblemsLoading: true });
    try {
      const res = await axiosInstance.get("/problems/get-all-solved-problems");
      set({ solvedProblems: res.data.data.solvedProblems });
      // toast.success(res.data.message);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error getting solved problems",
      );
      throw err;
    } finally {
      set({ isSolvedProblemsLoading: false });
    }
  },
}));
