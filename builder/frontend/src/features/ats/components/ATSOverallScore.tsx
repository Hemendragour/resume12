import { Target, Briefcase, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import type { ATSGrade } from "../types/ats.types";

interface Props {
  score: number;
  grade: ATSGrade;
  targetRole?: string;
  hasJobDescription: boolean;
  analyzedAt?: string;
}

interface ScoreTier {
  label: string;
  gradeBadgeClass: string;
  scoreTextClass: string;
  barClass: string;
  trackClass: string;
  summaryText: string;
}

function getScoreTier(score: number, grade: ATSGrade): ScoreTier {
  if (score >= 85 || grade === "A") {
    return {
      label: "Excellent ATS Match",
      gradeBadgeClass: "bg-success/15 text-success border-success/30",
      scoreTextClass: "text-success",
      barClass: "bg-success",
      trackClass: "bg-success/15",
      summaryText: "Your resume is highly optimized for ATS parsers and hiring managers.",
    };
  }

  if (score >= 70 || grade === "B") {
    return {
      label: "Good ATS Match",
      gradeBadgeClass: "bg-accent/20 text-dark border-accent/40",
      scoreTextClass: "text-dark",
      barClass: "bg-accent",
      trackClass: "bg-accent/15",
      summaryText: "Your resume performs well, with a few targeted optimization opportunities.",
    };
  }

  if (score >= 50 || grade === "C") {
    return {
      label: "Needs Improvement",
      gradeBadgeClass: "bg-warning/15 text-warning border-warning/30",
      scoreTextClass: "text-warning",
      barClass: "bg-warning",
      trackClass: "bg-warning/15",
      summaryText: "Your resume has critical gaps in keywords, formatting, or quantifiable impact.",
    };
  }

  return {
    label: "Significant Revision Needed",
    gradeBadgeClass: "bg-danger/15 text-danger border-danger/30",
    scoreTextClass: "text-danger",
    barClass: "bg-danger",
    trackClass: "bg-danger/15",
    summaryText: "Your resume is at high risk of being filtered out by automated screening systems.",
  };
}

export default function ATSOverallScore({
  score,
  grade,
  targetRole,
  hasJobDescription,
  analyzedAt,
}: Props) {
  const safeScore = Math.min(100, Math.max(0, score));
  const roundedScore = Math.round(safeScore);
  const tier = getScoreTier(roundedScore, grade);

  const formattedDate = analyzedAt
    ? new Date(analyzedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="w-full rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all">
      {/* Top Meta Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-primary/10 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {targetRole && (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1 text-xs font-semibold text-dark border border-primary/10">
              <Briefcase className="h-3.5 w-3.5 text-accent" />
              <span>{targetRole}</span>
            </div>
          )}

          <div
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium border ${
              hasJobDescription
                ? "bg-accent/15 text-dark border-accent/30"
                : "bg-primary/5 text-primary/70 border-primary/10"
            }`}
          >
            {hasJobDescription ? (
              <>
                <Target className="h-3.5 w-3.5 text-accent" />
                <span>Scored against job description</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-primary/60" />
                <span>General scoring — no JD provided</span>
              </>
            )}
          </div>
        </div>

        {formattedDate && (
          <span className="text-[11px] text-primary/50">
            Analyzed {formattedDate}
          </span>
        )}
      </div>

      {/* Main Score & Grade Block */}
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          {/* Grade Badge */}
          <div
            className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border-2 shadow-sm ${tier.gradeBadgeClass}`}
          >
            <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
              Grade
            </span>
            <span className="text-3xl font-black leading-none">{grade}</span>
          </div>

          {/* Score Numerical */}
          <div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-5xl font-black tracking-tight ${tier.scoreTextClass}`}
              >
                {roundedScore}
              </span>
              <span className="text-base font-semibold text-primary/40">
                / 100
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-base font-bold text-dark">
                {tier.label}
              </span>
            </div>
          </div>
        </div>

        {/* Short Advice Callout */}
        <div className="max-w-md rounded-xl bg-background p-3.5 border border-primary/10 text-xs text-primary/80">
          <p className="flex items-start gap-2">
            {roundedScore >= 70 ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-warning mt-0.5" />
            )}
            <span>{tier.summaryText}</span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div
          className={`h-3 w-full overflow-hidden rounded-full ${tier.trackClass}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${tier.barClass}`}
            style={{ width: `${safeScore}%` }}
          />
        </div>

        {/* Milestone Scale */}
        <div className="mt-2 flex justify-between text-[11px] font-medium text-primary/40">
          <span>0 (Critical)</span>
          <span>50 (Needs Work)</span>
          <span>75 (Good)</span>
          <span>90+ (Excellent)</span>
        </div>
      </div>
    </div>
  );
}
