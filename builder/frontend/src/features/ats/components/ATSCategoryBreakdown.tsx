import { useState, useMemo } from "react";
import {
  ChevronDown,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import type { ATSCategoryResult, ATSCategoryStatus } from "../types/ats.types";

interface Props {
  categories: ATSCategoryResult[];
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

export default function ATSCategoryBreakdown({ categories }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Order categories by declared order if present, or preserve original order
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      if (typeof a.order === "number" && typeof b.order === "number") {
        return a.order - b.order;
      }
      return 0;
    });
  }, [categories]);

  const toggleExpand = (categoryKey: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    sortedCategories.forEach((cat) => {
      allExpanded[cat.category] = true;
    });
    setExpandedCategories(allExpanded);
  };

  const collapseAll = () => {
    setExpandedCategories({});
  };

  const isAnyExpanded = Object.values(expandedCategories).some(Boolean);

  return (
    <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-primary/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-dark">Category Breakdown</h2>
          </div>
          <p className="mt-1 text-xs text-primary/70">
            Score breakdown across essential ATS evaluation criteria.
          </p>
        </div>

        <button
          type="button"
          onClick={isAnyExpanded ? collapseAll : expandAll}
          className="text-xs font-semibold text-primary/70 hover:text-dark transition underline-offset-2 hover:underline self-start sm:self-auto"
        >
          {isAnyExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* Categories List */}
      <div className="mt-4 space-y-3">
        {sortedCategories.map((cat) => {
          const isExpanded = !!expandedCategories[cat.category];
          const statusInfo = getStatusBadge(cat.status);
          const hasDetails =
            (cat.issues && cat.issues.length > 0) ||
            (cat.suggestions && cat.suggestions.length > 0) ||
            Boolean(cat.summary);

          return (
            <div
              key={cat.category}
              className="overflow-hidden rounded-xl border border-primary/10 bg-background transition-all hover:border-primary/20"
            >
              {/* Category Header Row (Clickable) */}
              <button
                type="button"
                onClick={() => toggleExpand(cat.category)}
                className="w-full p-4 text-left transition hover:bg-card/30"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-dark">
                      {cat.title}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusInfo.badgeClass}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-sm font-bold text-dark">
                        {cat.score}
                      </span>
                      <span className="text-xs font-medium text-primary/50">
                        {" "}
                        / {cat.maxScore} pts
                      </span>
                      <span className="ml-2 text-xs font-bold text-primary/70">
                        ({Math.round(cat.percentage)}%)
                      </span>
                    </div>

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg bg-card text-dark transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
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

              {/* Expandable Details */}
              {isExpanded && (
                <div className="border-t border-primary/10 bg-card/20 p-4 space-y-4 text-xs">
                  {cat.summary && (
                    <p className="text-primary/80 leading-relaxed font-medium">
                      {cat.summary}
                    </p>
                  )}

                  {/* Issues */}
                  {cat.issues && cat.issues.length > 0 && (
                    <div className="rounded-xl border border-danger/20 bg-danger/5 p-3.5">
                      <div className="flex items-center gap-1.5 font-bold text-danger mb-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>Identified Issues ({cat.issues.length})</span>
                      </div>
                      <ul className="space-y-1.5 pl-5 list-disc text-primary/80">
                        {cat.issues.map((issue, idx) => (
                          <li key={`${cat.category}-issue-${idx}`}>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {cat.suggestions && cat.suggestions.length > 0 && (
                    <div className="rounded-xl border border-accent/30 bg-accent/10 p-3.5">
                      <div className="flex items-center gap-1.5 font-bold text-dark mb-2">
                        <Lightbulb className="h-4 w-4 shrink-0 text-accent" />
                        <span>Actionable Suggestions ({cat.suggestions.length})</span>
                      </div>
                      <ul className="space-y-1.5 pl-5 list-disc text-primary/80">
                        {cat.suggestions.map((suggestion, idx) => (
                          <li key={`${cat.category}-sug-${idx}`}>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!hasDetails && (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>This category looks strong with no major issues flagged.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
