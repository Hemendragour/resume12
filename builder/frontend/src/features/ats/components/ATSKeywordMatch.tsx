import { useState } from "react";
import { Check, X, Tag, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  matchedKeywords: string[];
  missingKeywords: string[];
  hasJobDescription: boolean;
}

const COLLAPSE_LIMIT = 15;

export default function ATSKeywordMatch({
  matchedKeywords,
  missingKeywords,
  hasJobDescription,
}: Props) {
  const [showAllMissing, setShowAllMissing] = useState(false);
  const [showAllMatched, setShowAllMatched] = useState(false);

  const displayedMissing = showAllMissing
    ? missingKeywords
    : missingKeywords.slice(0, COLLAPSE_LIMIT);

  const displayedMatched = showAllMatched
    ? matchedKeywords
    : matchedKeywords.slice(0, COLLAPSE_LIMIT);

  const hasExcessMissing = missingKeywords.length > COLLAPSE_LIMIT;
  const hasExcessMatched = matchedKeywords.length > COLLAPSE_LIMIT;

  const totalKeywords = matchedKeywords.length + missingKeywords.length;
  const matchRate =
    totalKeywords > 0
      ? Math.round((matchedKeywords.length / totalKeywords) * 100)
      : 0;

  return (
    <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-primary/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-dark">Keyword Match Analysis</h2>
          </div>
          <p className="mt-1 text-xs text-primary/70">
            {hasJobDescription
              ? "Key skills and terminology compared against the provided job description."
              : "Standard role-specific keywords analyzed for this profile."}
          </p>
        </div>

        {totalKeywords > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto rounded-lg bg-background px-3 py-1.5 border border-primary/10">
            <span className="text-xs text-primary/60">Match Rate:</span>
            <span className="text-xs font-bold text-dark">{matchRate}%</span>
            <span className="text-[11px] text-primary/40">
              ({matchedKeywords.length}/{totalKeywords})
            </span>
          </div>
        )}
      </div>

      {/* Two Columns Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Matched Keywords Column */}
        <div className="rounded-xl border border-success/20 bg-background p-4">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 text-success">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <h3 className="text-sm font-bold text-dark">Matched Keywords</h3>
            </div>
            <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
              {matchedKeywords.length}
            </span>
          </div>

          <div className="mt-3.5">
            {matchedKeywords.length === 0 ? (
              <p className="text-xs text-primary/50 py-2">
                No matching keywords detected in the resume.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {displayedMatched.map((kw, idx) => (
                    <span
                      key={`matched-${kw}-${idx}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success transition hover:bg-success/20"
                    >
                      <Check className="h-3 w-3 stroke-[2.5]" />
                      {kw}
                    </span>
                  ))}
                </div>

                {hasExcessMatched && (
                  <button
                    type="button"
                    onClick={() => setShowAllMatched(!showAllMatched)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary/70 hover:text-dark transition"
                  >
                    {showAllMatched ? (
                      <>
                        <ChevronUp className="h-3.5 w-3.5" /> Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3.5 w-3.5" /> Show{" "}
                        {matchedKeywords.length - COLLAPSE_LIMIT} more
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Missing Keywords Column */}
        <div className="rounded-xl border border-danger/20 bg-background p-4">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-danger/20 text-danger">
                <X className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <h3 className="text-sm font-bold text-dark">Missing Keywords</h3>
            </div>
            <span className="rounded-full bg-danger/15 px-2.5 py-0.5 text-xs font-bold text-danger">
              {missingKeywords.length}
            </span>
          </div>

          <div className="mt-3.5">
            {missingKeywords.length === 0 ? (
              <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-xs font-medium text-success">
                <Check className="h-4 w-4" />
                <span>Great job! All high-priority keywords are present.</span>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {displayedMissing.map((kw, idx) => (
                    <span
                      key={`missing-${kw}-${idx}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-danger/30 bg-danger/10 px-2.5 py-1 text-xs font-semibold text-danger transition hover:bg-danger/20"
                    >
                      <X className="h-3 w-3 stroke-[2.5]" />
                      {kw}
                    </span>
                  ))}
                </div>

                {hasExcessMissing && (
                  <button
                    type="button"
                    onClick={() => setShowAllMissing(!showAllMissing)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-danger/80 hover:text-danger transition"
                  >
                    {showAllMissing ? (
                      <>
                        <ChevronUp className="h-3.5 w-3.5" /> Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3.5 w-3.5" /> Show{" "}
                        {missingKeywords.length - COLLAPSE_LIMIT} more
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
