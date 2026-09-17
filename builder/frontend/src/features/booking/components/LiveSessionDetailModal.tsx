import { X, Calendar, Video, Star } from "lucide-react";
import type { IBookingSession } from "../types/booking.types";

interface LiveSessionDetailModalProps {
  open: boolean;
  onClose: () => void;
  booking: IBookingSession | null;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-green-100 text-green-700",
};

export default function LiveSessionDetailModal({
  open,
  onClose,
  booking,
}: LiveSessionDetailModalProps) {
  if (!open || !booking) return null;

  const resumeTitle =
    booking.resumeId && typeof booking.resumeId === "object"
      ? booking.resumeId.title
      : "No Resume Selected";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark">Session Details</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-primary/50 transition hover:bg-primary/5 hover:text-dark"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center justify-between rounded-xl bg-primary/5 p-4">
            <div>
              <p className="font-semibold capitalize text-dark">
                {booking.interviewType.replace("_", " ")}
              </p>
              <div className="mt-1 flex items-center gap-2 text-sm text-primary/70">
                <Calendar size={14} />
                <span>
                  {new Date(booking.preferredDate).toLocaleDateString()} ·{" "}
                  <span className="capitalize">{booking.timeSlot}</span>
                </span>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                STATUS_STYLES[booking.status] || "bg-primary/10 text-primary/60"
              }`}
            >
              {STATUS_LABELS[booking.status] || booking.status}
            </span>
          </div>

          {/* General Details */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-primary/80">
              Request Details
            </h3>
            <ul className="space-y-2 text-sm text-dark">
              <li>
                <span className="font-medium">Resume:</span> {resumeTitle}
              </li>
              {booking.customTimeText && (
                <li>
                  <span className="font-medium">Custom Time:</span>{" "}
                  {booking.customTimeText}
                </li>
              )}
              {booking.notes && (
                <li>
                  <span className="font-medium">Notes:</span> {booking.notes}
                </li>
              )}
            </ul>
          </div>

          {/* Status Specific Details */}
          {booking.status === "confirmed" && booking.confirmedDateTime && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-900">
                <Video size={18} /> Meeting Details
              </h3>
              <p className="text-sm text-blue-800">
                <strong>Time:</strong>{" "}
                {new Date(booking.confirmedDateTime).toLocaleString()}
              </p>
              {booking.meetingLink && (
                <a
                  href={booking.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Join Meeting
                </a>
              )}
            </div>
          )}

          {booking.status === "cancelled" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="mb-2 font-semibold text-red-900">
                Cancellation Details
              </h3>
              <p className="text-sm text-red-800">
                <strong>Reason:</strong> {booking.cancelReason}
              </p>
              {booking.rescheduleSuggestion && (
                <div className="mt-3 border-t border-red-200 pt-3 text-sm text-red-800">
                  <p className="font-medium">Reschedule Suggestion:</p>
                  {booking.rescheduleSuggestion.suggestedDate && (
                    <p>
                      Date:{" "}
                      {new Date(
                        booking.rescheduleSuggestion.suggestedDate,
                      ).toLocaleString()}
                    </p>
                  )}
                  {booking.rescheduleSuggestion.suggestedTimeText && (
                    <p>
                      Time: {booking.rescheduleSuggestion.suggestedTimeText}
                    </p>
                  )}
                  {booking.rescheduleSuggestion.contactNote && (
                    <p>Note: {booking.rescheduleSuggestion.contactNote}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {booking.status === "completed" && booking.feedback && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="mb-3 flex items-center justify-between font-semibold text-green-900">
                <span>Feedback Report</span>
                <span className="flex items-center gap-1 text-lg">
                  <Star size={18} className="fill-green-600 text-green-600" />
                  {booking.feedback.score}/10
                </span>
              </h3>
              <div className="space-y-3 text-sm text-green-900">
                <p>
                  <strong>Focus Area:</strong> {booking.feedback.interviewFocus}
                </p>
                <div className="rounded-lg bg-white/60 p-3">
                  <p className="whitespace-pre-wrap">{booking.feedback.comment}</p>
                </div>
                <p className="text-right text-xs text-green-700">
                  Reviewed by {booking.feedback.interviewerName}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
