import { useEffect } from "react";

import { FolderSearch, LoaderPinwheel } from "lucide-react";
import ProblemTable from "../components/ProblemTable";
import { useProblemStore } from "../store/useProblemStore";

const HomePage = () => {
  const { getAllProblems, problems, isAllProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isAllProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderPinwheel className="size-10 animate-spin" />
      </div>
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
        <div className="mt-16 flex flex-col items-center justify-center p-10 bg-base-200/50 backdrop-blur-md border border-primary/30 border-dashed rounded-3xl shadow-2xl w-full max-w-lg z-10 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/5">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
            <FolderSearch className="w-10 h-10 text-primary opacity-90" />
          </div>
          <h3 className="text-2xl font-bold text-base-content mb-3">
            No Problems Found
          </h3>
          <p className="text-center text-base-content/70">
            We couldn't find any coding problems right now.
            <br />
            Please check back later or try adjusting your filters!
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
