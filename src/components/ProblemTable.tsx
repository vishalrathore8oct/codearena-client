import { Bookmark, PencilIcon, Plus, SearchX, TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import type { Problem } from "../types/Problem";
import EmptyState from "./EmptyState";

const ProblemsTable = ({ problems }: { problems: Problem[] }) => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set<string>();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Define allowed difficulties
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty,
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag),
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [filteredProblems, currentPage]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
      {/* Header with Create Playlist Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Problems</h2>
        <button
          className="btn btn-primary gap-2"
          onClick={() =>
            toast.success("Create Playlist functionality not implemented yet")
          }
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered w-full md:w-1/3 bg-base-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex w-full md:w-auto gap-3 md:contents">
          <select
            className="select select-bordered bg-base-200 flex-1 md:flex-none"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="ALL">All Difficulties</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered bg-base-200 flex-1 md:flex-none"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="ALL">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-md mb-4">
        <table className="table table-zebra table-lg bg-base-200 text-base-content w-full">
          <thead className="bg-base-300">
            <tr>
              <th>Solved</th>
              <th>Title</th>
              <th>Tags</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.solvedProblems.some(
                  (user) => user.userId === authUser?.id,
                );
                return (
                  <tr key={problem.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSolved}
                        readOnly
                        className="checkbox checkbox-sm"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/problem/${problem.id}`}
                        className="font-semibold hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge badge-outline badge-warning text-xs font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge font-semibold text-xs text-white ${
                          problem.difficulty === "EASY"
                            ? "badge-success"
                            : problem.difficulty === "MEDIUM"
                              ? "badge-warning"
                              : "badge-error"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        {authUser?.role === "ADMIN" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                toast.success(
                                  "Delete functionality not implemented yet",
                                )
                              }
                              className="btn btn-sm btn-error"
                            >
                              <TrashIcon className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={() =>
                                toast.success(
                                  "Edit functionality not implemented yet",
                                )
                              }
                              className="btn btn-sm btn-primary"
                            >
                              <PencilIcon className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        )}
                        <button
                          className="btn btn-sm btn-outline flex gap-2 items-center"
                          onClick={() =>
                            toast.success(
                              "Save to Playlist functionality not implemented yet",
                            )
                          }
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            Save to Playlist
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-8">
                  <EmptyState
                    icon={
                      <SearchX className="w-10 h-10 text-base-content/40" />
                    }
                    title="No problems found"
                    description="We couldn't find any problems matching your current filters. Try adjusting your search query or criteria."
                    className="border-none shadow-none bg-transparent"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-5 md:hidden mb-4 pb-20 relative">
        {paginatedProblems.length > 0 ? (
          paginatedProblems.map((problem) => {
            const isSolved = problem.solvedProblems.some(
              (user) => user.userId === authUser?.id,
            );
            return (
              <div
                key={problem.id}
                className="card bg-base-100 shadow-lg border border-primary/10 overflow-hidden cursor-pointer hover:border-primary/30 transition-all active:scale-[0.98]"
                onClick={() => navigate(`/problem/${problem.id}`)}
              >
                <div className="card-body p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <input
                      type="checkbox"
                      checked={isSolved}
                      readOnly
                      onClick={(e) => e.stopPropagation()}
                      className="checkbox checkbox-primary mt-1"
                    />
                    <div className="flex flex-col flex-1">
                      <Link
                        to={`/problem/${problem.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-lg hover:text-primary transition-colors text-base-content leading-tight mb-1"
                      >
                        {problem.title}
                      </Link>
                      <p className="text-sm text-base-content/60 line-clamp-2">
                        {problem.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {(problem.tags || []).map((tag, idx) => (
                        <span
                          key={idx}
                          className="badge badge-outline badge-primary badge-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className={`badge font-bold text-xs text-white whitespace-nowrap ${
                        problem.difficulty === "EASY"
                          ? "badge-success"
                          : problem.difficulty === "MEDIUM"
                            ? "badge-warning"
                            : "badge-error"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end mt-4 pt-4 border-t border-base-300/50">
                    {authUser?.role === "ADMIN" && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success(
                              "Delete functionality not implemented yet",
                            );
                          }}
                          className="btn btn-sm btn-error flex-1 text-white gap-2"
                        >
                          <TrashIcon className="w-4 h-4" /> Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success(
                              "Edit functionality not implemented yet",
                            );
                          }}
                          className="btn btn-sm btn-primary flex-1 text-white gap-2"
                        >
                          <PencilIcon className="w-4 h-4" /> Edit
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-outline flex-1 gap-2 items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success(
                          "Save to Playlist functionality not implemented yet",
                        );
                      }}
                    >
                      <Bookmark className="w-4 h-4" /> Save
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyState
            icon={<SearchX className="w-10 h-10 text-base-content/40" />}
            title="No problems found"
            description="We couldn't find any problems matching your current filters."
          />
        )}
      </div>

      {/* Desktop Pagination */}
      <div className="hidden md:flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="btn btn-ghost btn-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Mobile Pagination */}
      <div className="md:hidden sticky bottom-0 bg-base-100/95 backdrop-blur-md p-4 border-t border-base-300 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)] rounded-b-xl flex justify-center mt-6 gap-4 z-20">
        <button
          className="btn btn-sm btn-outline w-24"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <div className="flex items-center justify-center font-semibold text-base-content/80 min-w-16">
          {currentPage} / {totalPages}
        </div>
        <button
          className="btn btn-sm btn-outline w-24"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProblemsTable;
