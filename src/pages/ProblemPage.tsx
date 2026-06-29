import Editor from "@monaco-editor/react";
import {
  Bookmark,
  ChevronLeft,
  Clock,
  Code2,
  FileText,
  Home,
  Lightbulb,
  Play,
  SearchX,
  Terminal,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Submission from "../components/Submission";
import { getJudge0LanguageId } from "../lib/language";
import { useExecutionStore } from "../store/useExecutionStore";
import { useProblemStore } from "../store/useProblemStore";

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState<
    { input: string; output: string }[]
  >([]);
  const { executeCode, submission, isExecuting } = useExecutionStore();
  const submissionCount = 123; // Placeholder for submission count, replace with actual data when available

  useEffect(() => {
    if (id) {
      getProblemById(id);
    }
  }, [id, getProblemById]);

  useEffect(() => {
    if (problem) {
      const availableLangs = Object.keys(problem.codeSnippets || {});
      const initialLang = availableLangs.includes("JAVASCRIPT")
        ? "JAVASCRIPT"
        : availableLangs[0] || "JAVASCRIPT";

      setSelectedLanguage(initialLang);

      const prevSourceCode = submission?.sourceCode;
      setCode(problem.codeSnippets?.[initialLang] || prevSourceCode || "");

      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || [],
      );
    }
  }, [problem]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem?.codeSnippets?.[lang] || "");
  };

  const handleRunCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!problem) return;
    try {
      const languageId = getJudge0LanguageId(selectedLanguage);
      const stdin = (problem.testcases || []).map((tc) => tc.input);
      const expectedOutput = (problem.testcases || []).map((tc) => tc.output);
      executeCode({
        sourceCode: code,
        languageId: languageId,
        stdin: stdin,
        expectedOutput: expectedOutput,
        problemId: id as string,
      });
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  if (isProblemLoading) {
    return (
      <LoadingState
        title="Loading Problem"
        description="Please wait while we fetch the details..."
        className="bg-base-200"
      />
    );
  }

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
        <EmptyState
          icon={<SearchX className="w-10 h-10 text-primary opacity-90" />}
          title="Problem Not Found"
          description="The problem you are looking for does not exist or has been removed. Please check the URL or return home."
        >
          <Link to="/" className="btn btn-primary mt-4">
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Link>
        </EmptyState>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem.description}</p>

            {problem.examples && problem.examples.length > 0 && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {problem.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                  >
                    <div className="mb-4">
                      <div className="text-indigo-300 mb-2 text-base font-semibold">
                        Input:
                      </div>
                      <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                        {example.input}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="text-indigo-300 mb-2 text-base font-semibold">
                        Output:
                      </div>
                      <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-emerald-300 mb-2 text-base font-semibold">
                          Explanation:
                        </div>
                        <p className="text-base-content/70 text-lg font-semibold">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {problem.constraints && problem.constraints.length > 0 && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-base-200 p-6 rounded-xl mb-6 flex flex-col gap-2">
                  {problem.constraints.map((constraint, idx) => (
                    <span
                      key={idx}
                      className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg w-fit"
                    >
                      {constraint}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <div className="p-4 text-center text-base-content/70">
            submissions list will be shown here. (This feature is under
            development)
          </div>
        );
      case "hints":
        return (
          <div className="p-2 sm:p-4">
            {problem?.hints && problem.hints.length > 0 ? (
              <div className="flex flex-col gap-4">
                {problem.hints.map((hint, idx) => (
                  <div
                    key={idx}
                    className="alert bg-base-200/50 border border-base-300 shadow-sm rounded-xl flex items-start gap-4 p-4 transition-all hover:bg-base-200"
                  >
                    <div className="bg-warning/20 p-2 rounded-lg shrink-0 mt-1">
                      <Lightbulb className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                      <h3 className="font-bold text-sm text-base-content/70 uppercase tracking-wider">
                        Hint {idx + 1}
                      </h3>
                      <div className="text-base font-medium text-base-content">
                        {hint}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-base-content/50 min-h-50">
                <Lightbulb className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg">No hints available for this problem.</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-300 to-base-200 flex flex-col w-full">
      <nav className="navbar bg-base-100 shadow-md px-2 sm:px-4 w-full sticky top-0 z-50 flex-wrap sm:flex-nowrap gap-2 sm:gap-0 py-2 sm:py-0">
        <div className="flex-1 gap-2 flex items-center min-w-0">
          <button
            type="button"
            className="flex items-center text-primary hover:text-primary/80 transition-colors bg-primary/10 p-2 rounded-lg mr-1 sm:mr-2 shrink-0"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="ml-1 sm:ml-2 truncate">
            <h1 className="text-lg sm:text-xl font-bold m-0 leading-tight truncate">
              {problem.title}
            </h1>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-base-content/70 mt-1 truncate">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">
                Updated{" "}
                {new Date(problem.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="sm:hidden">
                {new Date(problem.updatedAt).toLocaleDateString()}
              </span>
              <span className="text-base-content/30 shrink-0">•</span>
              <Users className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">{submissionCount} Submissions</span>
            </div>
          </div>
        </div>
        <div className="flex-none gap-2 sm:gap-4 ml-auto">
          <button
            className={`btn btn-ghost btn-circle btn-sm sm:btn-md ${
              isBookmarked ? "text-primary" : ""
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <select
            className="select select-bordered select-primary select-sm sm:select-md w-28 sm:w-40"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="max-w-400 mx-auto p-2 sm:p-4 w-full grow flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 lg:h-[calc(100vh-120px)]">
          <div className="card bg-base-100 shadow-xl overflow-hidden flex flex-col min-h-[50vh] lg:min-h-0 lg:h-full">
            <div className="card-body p-0 flex flex-col h-full">
              <div className="tabs tabs-bordered pt-4 px-2 sm:px-4 shrink-0 flex-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                <button
                  className={`tab gap-2 pb-2 whitespace-nowrap ${
                    activeTab === "description" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`tab gap-2 pb-2 whitespace-nowrap ${
                    activeTab === "submissions" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 pb-2 whitespace-nowrap ${
                    activeTab === "hints" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>

              <div className="p-6 overflow-y-auto grow">
                {renderTabContent()}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl overflow-hidden flex flex-col min-h-[60vh] lg:min-h-0 lg:h-full mt-4 lg:mt-0">
            <div className="card-body p-0 flex flex-col h-full">
              <div className="tabs tabs-bordered pt-4 px-2 sm:px-4 shrink-0">
                <button className="tab tab-active gap-2 pb-2 whitespace-nowrap">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </button>
              </div>

              <div className="grow w-full relative min-h-75 lg:min-h-0">
                <Editor
                  height="100%"
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="p-2 sm:p-4 border-t border-base-300 bg-base-200 shrink-0">
                <div className="flex justify-between items-center gap-2">
                  <button
                    className={`btn btn-primary gap-1 sm:gap-2 flex-1 sm:flex-none ${
                      isExecuting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleRunCode}
                    disabled={isExecuting}
                  >
                    {!isExecuting && <Play className="w-4 h-4 shrink-0" />}
                    {isExecuting ? (
                      "Running..."
                    ) : (
                      <>
                        <span className="hidden sm:inline">Run Code</span>
                        <span className="sm:hidden">Run</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      toast.success("Submit functionality not implemented yet");
                    }}
                    className="btn btn-success gap-1 sm:gap-2 flex-1 sm:flex-none"
                  >
                    <span className="hidden sm:inline">Submit Solution</span>
                    <span className="sm:hidden">Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            {submission ? (
              <Submission submission={submission} />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Test Cases</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Input</th>
                        <th>Expected Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testcases.map((testCase, index) => (
                        <tr key={index}>
                          <td className="font-mono">{testCase.input}</td>
                          <td className="font-mono">{testCase.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
