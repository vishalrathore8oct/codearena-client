import { useEffect } from "react";

import { FolderSearch } from "lucide-react";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import ProblemTable from "../components/ProblemTable";
import { useProblemStore } from "../store/useProblemStore";

const HomePage = () => {
  const { getAllProblems, problems, isAllProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isAllProblemsLoading) {
    return (
      <LoadingState
        title="Loading Problems"
        description="Please wait while we fetch the details..."
        className="h-screen"
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-14 px-4">
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-30 blur-3xl rounded-md bottom-9"></div>
      <h1 className="text-4xl font-extrabold z-10 text-center">
        Welcome to <span className="text-primary">CodeArena</span>
      </h1>

      <p className="mt-4 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
        CodeArena is a platform that helps you prepare for coding interviews and
        helps you to improve your coding skills by solving coding problems
      </p>

      {problems.length > 0 ? (
        <ProblemTable problems={problems} />
      ) : (
        <EmptyState
          icon={<FolderSearch className="w-10 h-10 text-primary opacity-90" />}
          title="No Problems Found"
          description="We couldn't find any coding problems right now. Please check back later or try adjusting your filters!"
          className="mt-16"
        />
      )}
    </div>
  );
};

export default HomePage;
