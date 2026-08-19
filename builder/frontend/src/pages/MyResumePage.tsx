import { useEffect, useRef, useState } from "react";

import { Plus, Search, FileText } from "lucide-react";

import ResumeGrid from "../features/resume/components/ResumeGrid";
import CreateResumeModal from "../features/resume/components/CreateResumeModal";
import EmptyResumeState from "../features/resume/components/EmptyResumeState";

import { useResumes } from "../features/resume/hooks/useResumes";

import type { Resume } from "../features/resume/types/resume.types";

export default function MyResumePage() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<"all" | "draft" | "completed">("all");

  const [sort, setSort] = useState<"updated" | "newest" | "oldest" | "az">(
    "updated",
  );

  // ==========================================
  // GET RESUMES
  // ==========================================

  const {
    resumes,
    pagination,
    loading,
    loadingMore,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useResumes();

  // ==========================================
  // INFINITE SCROLL REF
  // ==========================================

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ==========================================
  // INFINITE SCROLL
  // ==========================================

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasNextPage && !loadingMore) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, loadingMore, fetchNextPage]);

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="flex min-h-100 items-center bg-background justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Failed to load resumes
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Something went wrong while fetching your resumes.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredResumes = resumes.filter((resume: Resume) => {
    const keyword = search.toLowerCase().trim();

    const title = resume.title?.toLowerCase() ?? "";

    const targetRole = resume.targetRole?.toLowerCase() ?? "";

    const matchesSearch =
      title.includes(keyword) || targetRole.includes(keyword);

    const matchesFilter = filter === "all" || resume.status === filter;

    return matchesSearch && matchesFilter;
  });

  // ==========================================
  // SORT
  // ==========================================

  const sortedResumes = [...filteredResumes];

  switch (sort) {
    case "updated":
      sortedResumes.sort((a, b) => {
        const dateA = new Date(a.updatedAt || 0).getTime();

        const dateB = new Date(b.updatedAt || 0).getTime();

        return dateB - dateA;
      });
      break;

    case "newest":
      sortedResumes.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();

        const dateB = new Date(b.createdAt || 0).getTime();

        return dateB - dateA;
      });
      break;

    case "oldest":
      sortedResumes.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();

        const dateB = new Date(b.createdAt || 0).getTime();

        return dateA - dateB;
      });
      break;

    case "az":
      sortedResumes.sort((a, b) => {
        const titleA = a.title?.toLowerCase() ?? "";

        const titleB = b.title?.toLowerCase() ?? "";

        return titleA.localeCompare(titleB);
      });
      break;
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-8">
      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <FileText size={22} className="text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Resumes</h1>

            <p className="mt-1 text-sm text-slate-500">
              Create, edit and manage all your resumes
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Create Resume
        </button>
      </div>

      {/* ======================================
          SEARCH + FILTER
      ====================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resumes or target roles..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap gap-3">
            {/* STATUS FILTER */}

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "draft" | "completed")
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-primary"
            >
              <option value="all">All Resumes</option>

              <option value="draft">Drafts</option>

              <option value="completed">Completed</option>
            </select>

            {/* SORT */}

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value as "updated" | "newest" | "oldest" | "az",
                )
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-primary"
            >
              <option value="updated">Recently Updated</option>

              <option value="newest">Newest First</option>

              <option value="oldest">Oldest First</option>

              <option value="az">A → Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* ======================================
          RESUME COUNT
      ====================================== */}

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Your Resumes</h2>

        <p className="mt-1 text-sm text-slate-500">
          Showing {sortedResumes.length} of{" "}
          {pagination?.totalResumes ?? resumes.length} resumes
        </p>
      </div>

      {/* ======================================
          INITIAL LOADING
      ====================================== */}

      {loading ? (
        <ResumeGrid
          resumes={[]}
          loading={true}
          onCreate={() => setOpen(true)}
          onRefresh={refetch}
        />
      ) : sortedResumes.length === 0 ? (
        /* ====================================
           EMPTY / SEARCH EMPTY
        ==================================== */

        resumes.length === 0 ? (
          <EmptyResumeState onCreate={() => setOpen(true)} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Search size={24} className="text-slate-400" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No resumes found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-5 text-sm font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )
      ) : (
        /* ====================================
           RESUME GRID
        ==================================== */

        <ResumeGrid
          resumes={sortedResumes}
          loading={false}
          onCreate={() => setOpen(true)}
          onRefresh={refetch}
        />
      )}

      {/* ======================================
          INFINITE SCROLL TRIGGER
      ====================================== */}

      {!loading && resumes.length > 0 && (
        <div
          ref={loadMoreRef}
          className="flex min-h-20 items-center justify-center"
        >
          {loadingMore && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-primary" />
              Loading more resumes...
            </div>
          )}

          {!hasNextPage && !loadingMore && (
            <p className="text-sm text-slate-400">You have reached the end.</p>
          )}
        </div>
      )}

      {/* ======================================
          CREATE RESUME MODAL
      ====================================== */}

      <CreateResumeModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
