import { CheckCircle2, XCircle } from "lucide-react";

import type { InterviewQuestion } from "../types/interview.types";

interface QuestionReviewCardProps {
  question: InterviewQuestion;
  number: number;
}

export default function QuestionReviewCard({
  question,
  number,
}: QuestionReviewCardProps) {
  const feedback = question.feedback;

  return (
    <div className="rounded-2xl border border-primary/10 bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary/70">
          {number}
        </span>

        {question.isFollowUp && (
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
            Follow-up
          </span>
        )}

        {feedback && (
          <span className="ml-auto rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
            {feedback.overallScore}/100
          </span>
        )}
      </div>

      <p className="mb-3 font-medium text-dark">{question.question}</p>

      {question.answerText ? (
        <div className="mb-3 rounded-xl bg-primary/5 p-3 text-sm text-primary/80">
          {question.answerText}
        </div>
      ) : (
        <p className="mb-3 text-sm italic text-primary/40">
          Not answered — session ended before this question.
        </p>
      )}

      {feedback && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {feedback.strengths.length > 0 && (
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-green-600">
                <CheckCircle2 size={14} /> Strengths
              </p>
              <ul className="space-y-0.5 text-xs text-primary/70">
                {feedback.strengths.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {feedback.improvements.length > 0 && (
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                <XCircle size={14} /> Improve
              </p>
              <ul className="space-y-0.5 text-xs text-primary/70">
                {feedback.improvements.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
