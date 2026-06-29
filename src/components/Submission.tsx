import {
  CheckCircle2,
  Clock,
  MemoryStick as Memory,
  XCircle,
} from "lucide-react";
import type { SubmissionProps, TestCaseResult } from "../types/Submission";

const SubmissionResults = ({ submission }: SubmissionProps) => {
  // Parse stringified arrays
  const memoryArr: string[] = JSON.parse(submission.memory || "[]");
  const timeArr: string[] = JSON.parse(submission.time || "[]");

  // Calculate averages
  const avgMemory =
    memoryArr
      .map((m: string) => parseFloat(m)) // remove ' KB' using parseFloat
      .reduce((a: number, b: number) => a + b, 0) / (memoryArr.length || 1);

  const avgTime =
    timeArr
      .map((t: string) => parseFloat(t)) // remove ' s' using parseFloat
      .reduce((a: number, b: number) => a + b, 0) / (timeArr.length || 1);

  const testcases = submission.testcaseResults || [];
  const passedTests = testcases.filter(
    (tc: TestCaseResult) => tc.passed,
  ).length;
  const totalTests = testcases.length;
  const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm">Status</h3>
            <div
              className={`text-lg font-bold ${
                submission.status === "Accepted" ? "text-success" : "text-error"
              }`}
            >
              {submission.status}
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm">Success Rate</h3>
            <div className="text-lg font-bold">{successRate.toFixed(1)}%</div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Avg. Runtime
            </h3>
            <div className="text-lg font-bold">
              {avgTime ? avgTime.toFixed(3) : 0} s
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm flex items-center gap-2">
              <Memory className="w-4 h-4" />
              Avg. Memory
            </h3>
            <div className="text-lg font-bold">
              {avgMemory ? avgMemory.toFixed(0) : 0} KB
            </div>
          </div>
        </div>
      </div>

      {/* Test Cases Results */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 md:p-6">
          <h2 className="card-title mb-4">Test Cases Results</h2>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Expected Output</th>
                  <th>Your Output</th>
                  <th>Memory</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {testcases.map((testCase: TestCaseResult) => (
                  <tr key={testCase.id}>
                    <td>
                      {testCase.passed ? (
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="w-5 h-5" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-error">
                          <XCircle className="w-5 h-5" />
                          Failed
                        </div>
                      )}
                    </td>
                    <td className="font-mono">{testCase.expectedOutput}</td>
                    <td className="font-mono">{testCase.stdout || "null"}</td>
                    <td>{testCase.memory}</td>
                    <td>{testCase.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {testcases.map((testCase: TestCaseResult) => (
              <div
                key={testCase.id}
                className="card bg-base-200 shadow-sm border border-base-300"
              >
                <div className="card-body p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-base-content/70">
                      Status
                    </span>
                    {testCase.passed ? (
                      <div className="flex items-center gap-1 text-success font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Passed
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-error font-medium">
                        <XCircle className="w-4 h-4" />
                        Failed
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm text-base-content/70">
                      Expected Output
                    </span>
                    <div className="bg-base-300 p-2 rounded-md font-mono text-sm break-all">
                      {testCase.expectedOutput}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm text-base-content/70">
                      Your Output
                    </span>
                    <div className="bg-base-300 p-2 rounded-md font-mono text-sm break-all">
                      {testCase.stdout || "null"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-base-300">
                    <div className="flex flex-col">
                      <span className="text-xs text-base-content/60">
                        Memory
                      </span>
                      <span className="font-medium">{testCase.memory}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-base-content/60">Time</span>
                      <span className="font-medium">{testCase.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;
