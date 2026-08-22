// ATSScoreCard.tsx
import type { ATSGrade } from "../types/ats.types";

interface Props {
  score: number;
  grade: ATSGrade;
}

function getStatus(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent",
      textClass: "text-success",
      barClass: "bg-success",
      trackClass: "bg-success/15",
    };
  }

  if (score >= 75) {
    return {
      label: "Good",
      textClass: "text-primary",
      barClass: "bg-accent",
      trackClass: "bg-accent/15",
    };
  }

  if (score >= 50) {
    return {
      label: "Needs Improvement",
      textClass: "text-warning",
      barClass: "bg-warning",
      trackClass: "bg-warning/15",
    };
  }

  return {
    label: "Poor",
    textClass: "text-danger",
    barClass: "bg-danger",
    trackClass: "bg-danger/15",
  };
}

export default function ATSScoreCard({ score, grade }: Props) {
  const safeScore = Math.min(100, Math.max(0, score));

  const status = getStatus(safeScore);

  return (
    <div className="w-full max-w-md rounded-2xl border border-primary/10 bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary/70">
            ATS Resume Score
          </p>

          <p className="mt-1 text-xs text-primary/40">
            Based on your latest ATS analysis
          </p>
        </div>

        {/* Grade */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-background">
          <span className="text-xl font-bold text-dark">{grade}</span>
        </div>
      </div>

      {/* Score */}
      <div className="mt-6 flex items-end gap-2">
        <span className="text-4xl font-bold tracking-tight text-dark">
          {Math.round(safeScore)}
        </span>

        <span className="mb-1 text-sm font-medium text-primary/40">/ 100</span>
      </div>

      {/* Status */}
      <div className="mt-2">
        <span className={`text-sm font-semibold ${status.textClass}`}>
          {status.label}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div
          className={`h-2.5 w-full overflow-hidden rounded-full ${status.trackClass}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${status.barClass}`}
            style={{
              width: `${safeScore}%`,
            }}
          />
        </div>
      </div>

      {/* Scale */}
      <div className="mt-3 flex justify-between text-[11px] text-primary/40">
        <span>0</span>
        <span>50</span>
        <span>75</span>
        <span>90</span>
        <span>100</span>
      </div>
    </div>
  );
}
