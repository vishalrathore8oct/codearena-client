import { zodResolver } from "@hookform/resolvers/zod";
import Editor from "@monaco-editor/react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Download,
  FileText,
  Lightbulb,
  LoaderPinwheel,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import sampleData from "../json/sample.json";
import axiosInstance from "../lib/axios";
import type { CreateProblemFormValues } from "../types/CreateProblemForm";
import { createProblemSchema } from "../validations/createProblemSchema";

const defaultFormValues: CreateProblemFormValues = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: [""],
  hints: [""],
  constraints: [""],
  editorial: "",
  examples: [{ input: "", output: "", explanation: "" }],
  testcases: [{ input: "", output: "" }],
  codeSnippets: {
    JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
    PYTHON: "def solution():\n    # Write your code here\n    pass",
    JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
  },
  referenceSolutions: {
    JAVASCRIPT: "// Add your reference solution here",
    PYTHON: "# Add your reference solution here",
    JAVA: "// Add your reference solution here",
  },
};

const CreateProblemForm = () => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const navigation = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProblemFormValues>({
    resolver: zodResolver(createProblemSchema.shape.body),
    defaultValues: defaultFormValues,
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({ control, name: "testcases" });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" as any }) as unknown as {
    fields: { id: string }[];
    append: (value: string) => void;
    remove: (index: number) => void;
  };

  const {
    fields: hintFields,
    append: appendHint,
    remove: removeHint,
  } = useFieldArray({ control, name: "hints" as any }) as unknown as {
    fields: { id: string }[];
    append: (value: string) => void;
    remove: (index: number) => void;
  };

  const {
    fields: constraintFields,
    append: appendConstraint,
    remove: removeConstraint,
  } = useFieldArray({ control, name: "constraints" as any }) as unknown as {
    fields: { id: string }[];
    append: (value: string) => void;
    remove: (index: number) => void;
  };

  const {
    fields: exampleFields,
    append: appendExample,
    remove: removeExample,
  } = useFieldArray({ control, name: "examples" });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value: CreateProblemFormValues) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/problems/create-problem", value);
      console.log("response data", res.data);
      toast.success(res.data.message || "Problem Created successfully⚡");
      navigation("/");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error while creating problem",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const selectedSample = sampleData[selectedSampleIndex];
    if (selectedSample) {
      const fullSample: CreateProblemFormValues = {
        title: selectedSample.title || "",
        description: selectedSample.description || "",
        difficulty:
          (selectedSample.difficulty as "EASY" | "MEDIUM" | "HARD") || "EASY",
        tags: selectedSample.tags?.length ? selectedSample.tags : [""],
        hints: selectedSample.hints?.length ? selectedSample.hints : [""],
        constraints: selectedSample.constraints?.length
          ? selectedSample.constraints
          : [""],
        editorial: "",
        examples: selectedSample.examples?.length
          ? selectedSample.examples.map((ex) => ({
              input: ex.input || "",
              output: ex.output || "",
              explanation: ex.explanation || "",
            }))
          : [{ input: "", output: "", explanation: "" }],
        testcases: selectedSample.testcases?.length
          ? selectedSample.testcases
          : [{ input: "", output: "" }],
        codeSnippets: {
          JAVASCRIPT: selectedSample.codeSnippets?.JAVASCRIPT || "",
          PYTHON: selectedSample.codeSnippets?.PYTHON || "",
          JAVA: selectedSample.codeSnippets?.JAVA || "",
        },
        referenceSolutions: {
          JAVASCRIPT: selectedSample.referenceSolutions?.JAVASCRIPT || "",
          PYTHON: selectedSample.referenceSolutions?.PYTHON || "",
          JAVA: selectedSample.referenceSolutions?.JAVA || "",
        },
      };

      reset(fullSample);
      toast.success(`Loaded sample: ${fullSample.title}`);
    }
  };

  return (
    <div className="container mx-auto py-4 md:py-8 px-2 sm:px-4 max-w-7xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="btn btn-ghost btn-circle btn-sm md:btn-md"
                onClick={() => navigation(-1)}
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <h2 className="card-title text-xl sm:text-2xl md:text-3xl flex items-center gap-2 sm:gap-3 m-0">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary shrink-0" />
                Create Problem
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <select
                className="select select-bordered w-full sm:w-auto"
                value={selectedSampleIndex}
                onChange={(e) => setSelectedSampleIndex(Number(e.target.value))}
              >
                {sampleData.map((sample, idx) => (
                  <option key={idx} value={idx}>
                    {sample.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-secondary w-full sm:w-auto gap-2"
                onClick={loadSampleData}
              >
                <Download className="w-4 h-4" />
                Load Sample
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full text-base md:text-lg"
                  {...register("title")}
                  placeholder="Enter problem title"
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.title.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Description
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                  {...register("description")}
                  placeholder="Enter problem description"
                />
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.description.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Difficulty
                  </span>
                </label>
                <select
                  className="select select-bordered w-full text-base md:text-lg"
                  {...register("difficulty")}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {errors.difficulty && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.difficulty.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Array Fields Section: Tags, Hints, Constraints */}
            <div className="space-y-6">
              {/* Tags */}
              <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="w-5 h-5 shrink-0" />
                    Tags
                  </h3>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm md:btn-md"
                    onClick={() => appendTag("")}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Tag
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <input
                        type="text"
                        className="input input-bordered flex-1"
                        {...register(`tags.${index}`)}
                        placeholder="Enter tag"
                      />
                      <button
                        type="button"
                        className="btn btn-ghost text-error btn-square btn-sm sm:btn-md"
                        onClick={() => removeTag(index)}
                        disabled={tagFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                {errors.tags && (
                  <div className="mt-2 text-error text-sm">
                    {errors.tags.message}
                  </div>
                )}
              </div>

              {/* Hints */}
              <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning shrink-0" />
                    Hints
                  </h3>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm md:btn-md"
                    onClick={() => appendHint("")}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Hint
                  </button>
                </div>
                <div className="space-y-4">
                  {hintFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <textarea
                        className="textarea textarea-bordered flex-1 w-full p-3 resize-y"
                        {...register(`hints.${index}`)}
                        placeholder="Enter hint"
                      />
                      <button
                        type="button"
                        className="btn btn-ghost text-error btn-square btn-sm sm:btn-md mt-2"
                        onClick={() => removeHint(index)}
                        disabled={hintFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                {errors.hints && (
                  <div className="mt-2 text-error text-sm">
                    {errors.hints.message}
                  </div>
                )}
              </div>

              {/* Constraints */}
              <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-info shrink-0" />
                    Constraints
                  </h3>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm md:btn-md"
                    onClick={() => appendConstraint("")}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Constraint
                  </button>
                </div>
                <div className="space-y-4">
                  {constraintFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <input
                        type="text"
                        className="input input-bordered flex-1"
                        {...register(`constraints.${index}`)}
                        placeholder="Enter constraint"
                      />
                      <button
                        type="button"
                        className="btn btn-ghost text-error btn-square btn-sm sm:btn-md mt-1"
                        onClick={() => removeConstraint(index)}
                        disabled={constraintFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                {errors.constraints && (
                  <div className="mt-2 text-error text-sm">
                    {errors.constraints.message}
                  </div>
                )}
              </div>
            </div>

            {/* Examples */}
            <div className="card bg-base-200 p-4 md:p-6 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  Examples
                </h3>
                <button
                  type="button"
                  className="btn btn-primary btn-sm md:btn-md"
                  onClick={() =>
                    appendExample({ input: "", output: "", explanation: "" })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Example
                </button>
              </div>
              <div className="space-y-6">
                {exampleFields.map((field, index) => (
                  <div key={field.id} className="card bg-base-100 shadow-md">
                    <div className="card-body p-4 md:p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-base md:text-lg font-semibold">
                          Example #{index + 1}
                        </h4>
                        <button
                          type="button"
                          className="btn btn-ghost text-error btn-sm sm:btn-md"
                          onClick={() => removeExample(index)}
                          disabled={exampleFields.length === 1}
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />{" "}
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Input
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                            {...register(`examples.${index}.input`)}
                            placeholder="Enter example input"
                          />
                          {errors.examples?.[index]?.input && (
                            <label className="label">
                              <span className="label-text-alt text-error">
                                {errors.examples[index].input.message}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Output
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                            {...register(`examples.${index}.output`)}
                            placeholder="Enter expected output"
                          />
                          {errors.examples?.[index]?.output && (
                            <label className="label">
                              <span className="label-text-alt text-error">
                                {errors.examples[index].output.message}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control md:col-span-2">
                          <label className="label">
                            <span className="label-text font-medium">
                              Explanation
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                            {...register(`examples.${index}.explanation`)}
                            placeholder="Enter example explanation"
                          />
                          {errors.examples?.[index]?.explanation && (
                            <label className="label">
                              <span className="label-text-alt text-error">
                                {errors.examples[index].explanation.message}
                              </span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.examples && !Array.isArray(errors.examples) && (
                <div className="mt-2 text-error text-sm">
                  {errors.examples.message}
                </div>
              )}
            </div>

            {/* Test Cases */}
            <div className="card bg-base-200 p-4 md:p-6 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Test Cases
                </h3>
                <button
                  type="button"
                  className="btn btn-primary btn-sm md:btn-md"
                  onClick={() => appendTestCase({ input: "", output: "" })}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Test Case
                </button>
              </div>
              <div className="space-y-6">
                {testCaseFields.map((field, index) => (
                  <div key={field.id} className="card bg-base-100 shadow-md">
                    <div className="card-body p-4 md:p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-base md:text-lg font-semibold">
                          Test Case #{index + 1}
                        </h4>
                        <button
                          type="button"
                          className="btn btn-ghost text-error btn-sm sm:btn-md"
                          onClick={() => removeTestCase(index)}
                          disabled={testCaseFields.length === 1}
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />{" "}
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Input
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                            {...register(`testcases.${index}.input`)}
                            placeholder="Enter test case input"
                          />
                          {errors.testcases?.[index]?.input && (
                            <label className="label">
                              <span className="label-text-alt text-error">
                                {errors.testcases[index].input.message}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Expected Output
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                            {...register(`testcases.${index}.output`)}
                            placeholder="Enter expected output"
                          />
                          {errors.testcases?.[index]?.output && (
                            <label className="label">
                              <span className="label-text-alt text-error">
                                {errors.testcases[index].output.message}
                              </span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.testcases && !Array.isArray(errors.testcases) && (
                <div className="mt-2 text-error text-sm">
                  {errors.testcases.message}
                </div>
              )}
            </div>

            {/* Code Editor Sections */}
            <div className="space-y-8">
              {(["JAVASCRIPT", "PYTHON", "JAVA"] as const).map((language) => (
                <div
                  key={language}
                  className="card bg-base-200 p-4 md:p-6 shadow-md"
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    {language}
                  </h3>

                  <div className="space-y-6">
                    {/* Starter Code */}
                    <div className="card bg-base-100 shadow-md">
                      <div className="card-body p-4 md:p-6">
                        <h4 className="font-semibold text-base md:text-lg mb-4">
                          Starter Code Template
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <Controller
                            name={`codeSnippets.${language}`}
                            control={control}
                            render={({ field }) => (
                              <Editor
                                height="300px"
                                language={language.toLowerCase()}
                                theme="vs-dark"
                                value={field.value}
                                onChange={field.onChange}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: "on",
                                  roundedSelection: false,
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            )}
                          />
                        </div>
                        {errors.codeSnippets?.[language] && (
                          <div className="mt-2 text-error text-sm">
                            {errors.codeSnippets[language].message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Reference Solution */}
                    <div className="card bg-base-100 shadow-md">
                      <div className="card-body p-4 md:p-6">
                        <h4 className="font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                          Reference Solution
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <Controller
                            name={`referenceSolutions.${language}`}
                            control={control}
                            render={({ field }) => (
                              <Editor
                                height="300px"
                                language={language.toLowerCase()}
                                theme="vs-dark"
                                value={field.value}
                                onChange={field.onChange}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: "on",
                                  roundedSelection: false,
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            )}
                          />
                        </div>
                        {errors.referenceSolutions?.[language] && (
                          <div className="mt-2 text-error text-sm">
                            {errors.referenceSolutions[language].message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Editorial */}
            <div className="card bg-base-200 p-4 md:p-6 shadow-md">
              <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                Editorial
              </h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Editorial (Optional)
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-32 w-full p-3 resize-y"
                  {...register("editorial")}
                  placeholder="Enter problem editorial/solution explanation"
                />
              </div>
            </div>

            <div className="card-actions flex flex-col sm:flex-row justify-end pt-4 border-t mt-8 gap-3">
              <button
                type="button"
                className="btn btn-outline btn-error w-full sm:w-auto btn-lg gap-2"
                onClick={() => reset(defaultFormValues)}
                disabled={isLoading}
              >
                <RotateCcw className="w-5 h-5" />
                Reset Form
              </button>
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto btn-lg gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoaderPinwheel className="h-5 w-5 animate-spin mr-2" />{" "}
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Create Problem
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProblemForm;
