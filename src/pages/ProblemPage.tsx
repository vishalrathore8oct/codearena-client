import { ChevronLeft, Home, LoaderPinwheel } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const navigation = useNavigate();

  useEffect(() => {
    getProblemById(id);
  }, [id, getProblemById]);

  if (isProblemLoading || !problem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="flex flex-col items-center justify-center bg-base-100 p-10 rounded-3xl shadow-2xl border border-primary/20 backdrop-blur-md">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
            <LoaderPinwheel className="w-10 h-10 text-primary animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            Loading Problem
          </h2>
          <p className="text-base-content/60 text-center">
            Please wait while we fetch the details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col w-full">
      <nav className="navbar bg-base-100 shadow-md px-4 w-full sticky top-0 z-50">
        <div className="flex gap-4 items-center max-w-7xl mx-auto w-full">
          <button
            type="button"
            className="flex items-center text-primary hover:text-primary/80 transition-colors bg-primary/10 p-2 rounded-lg"
            onClick={() => navigation(-1)}
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            <Home className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <h1 className="text-2xl font-bold text-base-content m-0">
            {problem.title}
          </h1>
        </div>
      </nav>
    </div>
  );
};

export default ProblemPage;
