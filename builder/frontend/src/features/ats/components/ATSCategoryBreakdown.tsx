import { useMemo } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import type { ATSCategoryResult, ATSCategoryStatus } from "../types/ats.types";

interface Props {
  categories: ATSCategoryResult[];
  onCategorySelect?: (categoryId: string) => void;
}

function getStatusBadge(status: ATSCategoryStatus) {
  switch (status) {
    case "excellent":
      return {
        label: "Excellent",
        badgeClass: "bg-success/15 text-success border-success/30",
        barClass: "bg-success",
        trackClass: "bg-success/15",
      };
    case "good":
      return {
        label: "Good",
        badgeClass: "bg-accent/20 text-dark border-accent/40",
        barClass: "bg-accent",
        trackClass: "bg-accent/15",
      };
    case "needs-improvement":
      return {
        label: "Needs Improvement",
        badgeClass: "bg-warning/15 text-warning border-warning/30",
        barClass: "bg-warning",
        trackClass: "bg-warning/15",
      };
    case "poor":
    default:
      return {
        label: "Poor",
        badgeClass: "bg-danger/15 text-danger border-danger/30",
        barClass: "bg-danger",
        trackClass: "bg-danger/15",
      };
  }
}

export default function ATSCategoryBreakdown({ categories, onCategorySelect }: Props) {
  // Order categories by declared order if present, or preserve original order
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      if (typeof a.order === "number" && typeof b.order === "number") {
        return a.order - b.order;
      }
      return 0;
    });
  }, [categories]);

  return (
    <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="border-b border-primary/10 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold text-dark">Category Breakdown</h2>
        </div>
        <p className="mt-1 text-xs text-primary/70">
          Score breakdown across essential ATS evaluation criteria. Tap a category to jump to its
          detailed review below.
        </p>
      </div>

      {/* Categories List */}
      <div className="mt-4 space-y-3">
        {sortedCategories.map((cat) => {
          const statusInfo = getStatusBadge(cat.status);

          return (
            <button
              key={cat.category}
              type="button"
              onClick={() => onCategorySelect?.(cat.category)}
              className="group w-full overflow-hidden rounded-xl border border-primary/10 bg-background p-4 text-left transition-all hover:border-accent/40 hover:bg-card/30"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-dark">{cat.title}</span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusInfo.badgeClass}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm font-bold text-dark">{cat.score}</span>
                    <span className="text-xs font-medium text-primary/50">
                      {" "}
                      / {cat.maxScore} pts
                    </span>
                    <span className="ml-2 text-xs font-bold text-primary/70">
                      ({Math.round(cat.percentage)}%)
                    </span>
                  </div>

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-card text-primary/50 transition group-hover:bg-accent/20 group-hover:text-dark">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div
                  className={`h-2 w-full overflow-hidden rounded-full ${statusInfo.trackClass}`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${statusInfo.barClass}`}
                    style={{
                      width: `${Math.min(100, Math.max(0, cat.percentage))}%`,
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
