import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ChevronRight, Calendar, Star } from "lucide-react";

import { useInterviewHistory } from "../../features/interview/hooks/useInterviewHistory";
import { useMyBookings } from "../../features/booking/hooks/useBookings";
import LiveSessionDetailModal from "../../features/booking/components/LiveSessionDetailModal";
import type { IBookingSession } from "../../features/booking/types/booking.types";

const STATUS_LABELS: Record<string, string> = {
  completed: "Completed",
  ended_early: "Ended Early",
  in_progress: "In Progress",
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  ended_early: "bg-amber-100 text-amber-700",
  in_progress: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

type MergedSession =
  | { type: "ai"; date: number; data: any }
  | { type: "live"; date: number; data: IBookingSession };

export default function InterviewHistoryPage() {
  const navigate = useNavigate();
  const { sessions: aiSessions, loading: loadingAi, isError: aiError } = useInterviewHistory();
  const { data: liveBookings = [], isLoading: loadingLive, isError: liveError } = useMyBookings();

  const [selectedLiveSession, setSelectedLiveSession] = useState<IBookingSession | null>(null);

  if (loadingAi || loadingLive) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (aiError || liveError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-primary/70">
          We couldn't load your interview history. Please try again.
        </p>
      </div>
    );
  }

  // Merge and sort
  const mergedHistory: MergedSession[] = [
    ...aiSessions.map((session) => ({
      type: "ai" as const,
      date: new Date(session.createdAt).getTime(),
      data: session,
    })),
    ...liveBookings.map((booking) => ({
      type: "live" as const,
      date: new Date(booking.createdAt).getTime(),
      data: booking,
    })),
  ].sort((a, b) => b.date - a.date);

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <button
        onClick={() => navigate("/interview")}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-primary/60 transition hover:text-dark"
      >
        <ArrowLeft size={16} />
        Back to Interview Prep
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Interview History</h1>
        <p className="mt-2 text-primary/70">
          Your past AI interview sessions and live mock interviews.
        </p>
      </div>

      {mergedHistory.length === 0 ? (
        <p className="text-center text-primary/60">
          You haven't taken any interviews or booked any sessions yet.
        </p>
      ) : (
        <div className="space-y-3">
          {mergedHistory.map((item) => {
            if (item.type === "ai") {
              const session = item.data;
              const answeredCount = session.questions.filter(
                (q: any) => q.feedback,
              ).length;

              return (
                <button
                  key={`ai-${session._id}`}
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
                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-700">
                        AI Practice
                      </span>
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
            } else {
              const booking = item.data as IBookingSession;

              return (
                <button
                  key={`live-${booking._id}`}
                  onClick={() => setSelectedLiveSession(booking)}
                  className="flex w-full items-center justify-between rounded-2xl border border-primary/10 bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold capitalize text-dark">
                        {booking.interviewType.replace("_", " ")}
                      </h3>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                        Live Session
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          STATUS_STYLES[booking.status] ??
                          "bg-primary/10 text-primary/60"
                        }`}
                      >
                        {STATUS_LABELS[booking.status] ?? booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary/60">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(booking.preferredDate).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </span>
                      <span className="capitalize">
                        {booking.timeSlot}
                      </span>
                      {booking.status === "completed" && booking.feedback && (
                        <span className="flex items-center gap-1 font-semibold text-green-600">
                          <Star size={14} className="fill-green-600" />
                          {booking.feedback.score}/10
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={20} className="shrink-0 text-primary/40" />
                </button>
              );
            }
          })}
        </div>
      )}

      <LiveSessionDetailModal
        open={!!selectedLiveSession}
        onClose={() => setSelectedLiveSession(null)}
        booking={selectedLiveSession}
      />
    </section>
  );
}
