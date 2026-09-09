import { AlertOctagon, RotateCw } from "lucide-react";
import type { ATSResult } from "../types/ats.types";
import ATSOverallScore from "./ATSOverallScore";
import ATSCategoryBreakdown from "./ATSCategoryBreakdown";
import ATSKeywordMatch from "./ATSKeywordMatch";
import ATSSectionDeepDive from "./ATSSectionDeepDive";
import ATSStrengthsWeaknesses from "./ATSStrengthsWeaknesses";

interface Props {
  result: ATSResult | null;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading ATS analysis">
      {/* 1. Overall Score Skeleton */}
      <div className="h-56 rounded-2xl bg-card/60 p-6 border border-primary/10">
        <div className="flex justify-between items-center pb-4 border-b border-primary/10">
          <div className="h-6 w-40 rounded-lg bg-primary/15" />
          <div className="h-4 w-28 rounded-lg bg-primary/10" />
        </div>
        <div className="mt-6 flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-primary/20" />
          <div className="space-y-2">
            <div className="h-9 w-24 rounded-lg bg-primary/20" />
            <div className="h-4 w-36 rounded-lg bg-primary/10" />
          </div>
        </div>
        <div className="mt-6 h-3 w-full rounded-full bg-primary/15" />
      </div>

      {/* 2. Category Breakdown Skeleton */}
      <div className="h-64 rounded-2xl bg-card/60 p-6 border border-primary/10 space-y-3">
        <div className="h-6 w-48 rounded-lg bg-primary/20" />
        <div className="h-12 w-full rounded-xl bg-background/70" />
        <div className="h-12 w-full rounded-xl bg-background/70" />
        <div className="h-12 w-full rounded-xl bg-background/70" />
      </div>

      {/* 3. Keywords Skeleton */}
      <div className="h-48 rounded-2xl bg-card/60 p-6 border border-primary/10 space-y-3">
        <div className="h-6 w-44 rounded-lg bg-primary/20" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="h-24 rounded-xl bg-background/70" />
          <div className="h-24 rounded-xl bg-background/70" />
        </div>
      </div>
    </div>
  );
}

export default function ATSResultsView({
  result,
  isLoading = false,
  isError = false,
  errorMessage = "Failed to load ATS analysis results.",
  onRetry,
}: Props) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-danger/30 bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/15 text-danger">
          <AlertOctagon className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-bold text-dark">
          Analysis Unavailable
        </h3>
        <p className="mt-1 text-xs text-primary/70 max-w-md mx-auto">
          {errorMessage}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-dark transition"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6 w-full">
      {/* 1. OVERALL SCORE */}
      <ATSOverallScore
        score={result.atsScore}
        grade={result.grade}
        targetRole={result.targetRole}
        hasJobDescription={result.hasJobDescription}
        analyzedAt={result.analyzedAt}
      />

      {/* 2. CATEGORY BREAKDOWN */}
      {result.categories && result.categories.length > 0 && (
        <ATSCategoryBreakdown categories={result.categories} />
      )}

      {/* 3. KEYWORD MATCH */}
      <ATSKeywordMatch
        matchedKeywords={result.matchedKeywords || []}
        missingKeywords={result.missingKeywords || []}
        hasJobDescription={result.hasJobDescription}
      />

      {/* 4. SECTION-WISE DEEP DIVE */}
      {result.sectionDeepDive && result.sectionDeepDive.length > 0 && (
        <ATSSectionDeepDive
          sections={result.sectionDeepDive}
          hasJobDescription={result.hasJobDescription}
        />
      )}

      {/* 5. STRENGTHS & WEAKNESSES */}
      <ATSStrengthsWeaknesses
        strengths={result.strengths || []}
        weaknesses={result.weaknesses || []}
      />
    </div>
  );
}
