import { History, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InterviewHistoryBox() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/interview/history")}
      className="mb-6 flex w-full items-center justify-between rounded-2xl border border-border bg-navbar px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-btn-hover-bg">
          <History size={20} className="text-subheading" />
        </div>

        <div>
          <p className="font-semibold text-heading">View your interview history</p>
          <p className="text-sm text-heading/60">
            See your past sessions, scores, and feedback
          </p>
        </div>
      </div>

      <ChevronRight size={20} className="text-heading/40" />
    </button>
  );
}
