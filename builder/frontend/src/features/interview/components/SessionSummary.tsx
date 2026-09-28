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
    <div className="rounded-2xl border border-border bg-navbar p-5 text-center shadow-sm sm:p-6">
      <p className="text-sm font-medium text-heading/60">
        You answered {answeredCount} of {totalQuestions} questions
      </p>

      <div className="my-5 text-4xl font-bold text-subheading sm:my-6 sm:text-5xl">
        {summary.overallScore}
        <span className="text-lg text-heading/40 sm:text-xl">/100</span>
      </div>

      <p className="mx-auto mb-6 max-w-md text-sm text-nav-text">
        {summary.comment}
      </p>

      <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
        {summary.strengths.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-semibold text-green-600">
              Strengths
            </p>
            <ul className="space-y-1 text-sm text-nav-text">
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
            <ul className="space-y-1 text-sm text-nav-text">
              {summary.weaknesses.map((w, i) => (
                <li key={i}>• {w}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/interview")}
        className="mt-8 w-full rounded-xl bg-btn px-6 py-3 text-sm font-semibold text-btn-text transition hover:bg-btn-hover sm:w-auto sm:text-base"
      >
        Back to Interview Home
      </button>
    </div>
  );
}
