import { useNavigate } from "react-router-dom";

import type { InterviewSummary } from "../types/interview.types";

interface SessionSummaryProps {
  summary: InterviewSummary;
  answeredCount: number;
  totalQuestions: number;
}

export default function SessionSummary({
  summary,
  answeredCount,
  totalQuestions,
}: SessionSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-primary/10 bg-card p-6 text-center shadow-sm">
      <p className="text-sm font-medium text-primary/60">
        You answered {answeredCount} of {totalQuestions} questions
      </p>

      <div className="my-6 text-5xl font-bold text-accent">
        {summary.overallScore}
        <span className="text-xl text-primary/40">/100</span>
      </div>

      <p className="mx-auto mb-6 max-w-md text-sm text-primary/70">
        {summary.comment}
      </p>

      <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
        {summary.strengths.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-semibold text-green-600">
              Strengths
            </p>
            <ul className="space-y-1 text-sm text-primary/70">
              {summary.strengths.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
        )}

        {summary.weaknesses.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-semibold text-amber-600">
              Areas to improve
            </p>
            <ul className="space-y-1 text-sm text-primary/70">
              {summary.weaknesses.map((w, i) => (
                <li key={i}>• {w}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/interview")}
        className="mt-8 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Back to Interview Home
      </button>
    </div>
  );
}
