import { useNavigate } from "react-router-dom";
import { Loader2, ChevronRight, Calendar } from "lucide-react";

import { useInterviewHistory } from "../../features/interview/hooks/useInterviewHistory";

const STATUS_LABELS: Record<string, string> = {
  completed: "Completed",
  ended_early: "Ended Early",
  in_progress: "In Progress",
};

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  ended_early: "bg-amber-100 text-amber-700",
  in_progress: "bg-blue-100 text-blue-700",
};

export default function InterviewHistoryPage() {
  const navigate = useNavigate();
  const { sessions, loading, isError } = useInterviewHistory();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-primary/70">
          We couldn't load your interview history. Please try again.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Interview History</h1>
        <p className="mt-2 text-primary/70">
          Your past AI interview sessions, scores, and feedback.
        </p>
      </div>

      {sessions.length === 0 ? (
        <p className="text-center text-primary/60">
          You haven't taken any interviews yet.
        </p>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => {
            const answeredCount = session.questions.filter(
              (q) => q.feedback,
            ).length;

            return (
              <button
                key={session._id}
                onClick={() =>
                  navigate(`/interview/ai/session/${session._id}`)
                }
                className="flex w-full items-center justify-between rounded-2xl border border-primary/10 bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold text-dark">
                      {session.targetRole}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        STATUS_STYLES[session.status] ??
                        "bg-primary/10 text-primary/60"
                      }`}
                    >
                      {STATUS_LABELS[session.status] ?? session.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary/60">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(session.createdAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </span>

                    <span className="capitalize">
                      {session.questionType} · {session.difficulty}
                    </span>

                    <span>
                      {answeredCount}/{session.totalQuestions} answered
                    </span>

                    {session.summary && (
                      <span className="font-semibold text-accent">
                        {session.summary.overallScore}/100
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight size={20} className="shrink-0 text-primary/40" />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
