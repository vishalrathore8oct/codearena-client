export interface TestCaseResult {
  id: string;
  testcase: number;
  passed: boolean;
  expectedOutput: string;
  stdin: string;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string;
  time: string;
}

export interface SubmissionData {
  id: string;
  language: string;
  sourceCode: string;
  stdin: string;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string | null;
  time: string | null;
  testcaseResults?: TestCaseResult[];
}

export interface SubmissionProps {
  submission: SubmissionData;
}

export interface SubmissionRequest {
  sourceCode: string;
  languageId: number;
  stdin: string[];
  expectedOutput: string[];
  problemId: string;
}
