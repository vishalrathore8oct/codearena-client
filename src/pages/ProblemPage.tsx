import { ChevronLeft, Home, SearchX } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import { useProblemStore } from "../store/useProblemStore";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const navigation = useNavigate();

  useEffect(() => {
    getProblemById(id);
  }, [id, getProblemById]);

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
