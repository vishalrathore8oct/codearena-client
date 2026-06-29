import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import type { SubmissionData, SubmissionRequest } from "../types/Submission";

interface ExecutionState {
  isExecuting: boolean;
  submission: SubmissionData | null;
  executeCode: (request: SubmissionRequest) => Promise<void>;
}

export const useExecutionStore = create<ExecutionState>((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (request: SubmissionRequest) => {
    try {
      set({ isExecuting: true });
      const res = await axiosInstance.post("/code-execution", {
        sourceCode: request.sourceCode,
        languageId: request.languageId,
        stdin: request.stdin,
        expectedOutput: request.expectedOutput,
        problemId: request.problemId,
      });

      set({ submission: res.data.submission });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },
}));
