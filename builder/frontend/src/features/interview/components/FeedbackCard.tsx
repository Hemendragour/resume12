import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";

import type { InterviewFeedback } from "../types/interview.types";

interface FeedbackCardProps {
  feedback: InterviewFeedback;
  isLastQuestion: boolean;
  onNext: () => void;
}

const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="mb-1 flex justify-between text-xs font-medium text-heading/60">
      <span>{label}</span>
      <span>{value}/10</span>
    </div>
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-popup">
      <div
        className="h-full rounded-full bg-btn"
        style={{ width: `${(value / 10) * 100}%` }}
      />
    </div>
  </div>
);

export default function FeedbackCard({
  feedback,
  isLastQuestion,
  onNext,
}: FeedbackCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-navbar p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-heading sm:text-lg">
          Feedback
        </h3>
        <span className="rounded-full bg-btn-hover-bg px-3 py-1 text-sm font-semibold text-subheading">
          {feedback.overallScore}/100
        </span>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ScoreBar label="Clarity" value={feedback.clarity} />
        <ScoreBar label="Structure" value={feedback.structure} />
        <ScoreBar label="Technical accuracy" value={feedback.technicalAccuracy} />
      </div>

      {feedback.comment && (
        <p className="mb-5 text-sm text-heading/80">{feedback.comment}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {feedback.strengths.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-green-600">
              <CheckCircle2 size={16} /> Strengths
            </p>
            <ul className="space-y-1 text-sm text-nav-text">
              {feedback.strengths.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        {feedback.improvements.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-600">
              <XCircle size={16} /> Improve
            </p>
            <ul className="space-y-1 text-sm text-nav-text">
              {feedback.improvements.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={onNext}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-btn px-4 py-3 text-sm font-semibold text-btn-text transition hover:bg-btn-hover sm:px-6 sm:text-base"
      >
        {isLastQuestion ? "See Summary" : "Next Question"}
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
