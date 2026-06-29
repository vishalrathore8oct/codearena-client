import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import type { SubmissionData } from "../types/Submission";

interface SubmissionStore {
  isSubmissionsLoading: boolean;
  submissions: SubmissionData[];
  submissionCount: number | null;
  getSubmissionForProblem: (problemId: string) => Promise<void>;
  getSubmissionCountForProblem: (problemId: string) => Promise<void>;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  isSubmissionsLoading: false,
  submissions: [],
  submissionCount: null,

  getSubmissionForProblem: async (problemId: string) => {
    try {
      set({ isSubmissionsLoading: true });
      const res = await axiosInstance.get(
        `/submission/get-submissions-for-problem/${problemId}`,
      );

      set({ submissions: res.data.data.submissions });
    } catch (error) {
      console.log("Error getting submissions for problem", error);
      toast.error("Error getting submissions for problem");
    } finally {
      set({ isSubmissionsLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId: string) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-count-of-submissions-for-problem/${problemId}`,
      );

      set({ submissionCount: res.data.data.submissionsCount });
    } catch (error) {
      console.log("Error getting submission count for problem", error);
      toast.error("Error getting submission count for problem");
    }
  },
}));
