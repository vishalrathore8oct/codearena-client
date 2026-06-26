export interface TestCase {
  input: string;
  output: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodeSnippets {
  JAVA?: string;
  PYTHON?: string;
  JAVASCRIPT?: string;
  [key: string]: string | undefined;
}

export interface ReferenceSolutions {
  JAVA?: string;
  PYTHON?: string;
  JAVASCRIPT?: string;
  [key: string]: string | undefined;
}

export interface SolvedProblem {
  id?: string;
  userId: string;
  problemId?: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags?: string[];
  hints?: string[];
  constraints?: string[];
  editorial?: string;
  examples?: Example[];
  testcases?: TestCase[];
  codeSnippets?: CodeSnippets;
  referenceSolutions?: ReferenceSolutions;
  userId: string;
  createdAt: string;
  updatedAt: string;
  solvedProblems: SolvedProblem[];
}
