import { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";
import type { IBookingSession } from "../types/booking.types";
import {
  useConfirmBooking,
  useCancelBooking,
  useCompleteBooking,
} from "../hooks/useBookings";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  booking: IBookingSession | null;
}

export function ConfirmBookingModal({ open, onClose, booking }: ModalProps) {
  const confirmBooking = useConfirmBooking();

  const [confirmedDateTime, setConfirmedDateTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  // Reset form when opened with a new booking
  useEffect(() => {
    if (open && booking) {
      setConfirmedDateTime("");
      setMeetingLink("");
      setAdminNotes("");
    }
  }, [open, booking]);

  if (!open || !booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedDateTime || !meetingLink) return;

    try {
      await confirmBooking.mutateAsync({
        bookingId: booking._id,
        payload: {
          confirmedDateTime: new Date(confirmedDateTime).toISOString(),
          meetingLink,
          adminNotes: adminNotes || undefined,
        },
      });
      onClose();
    } catch (error) {
      console.error("Failed to confirm booking", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark">Confirm Session</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-primary/50 transition hover:bg-primary/5 hover:text-dark"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-dark">
              Confirmed Date & Time
            </label>
            <input
              type="datetime-local"
              value={confirmedDateTime}
              onChange={(e) => setConfirmedDateTime(e.target.value)}
              className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-dark">
              Meeting Link (Zoom/Meet)
            </label>
            <input
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-dark">
              Admin Notes (Optional)
            </label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              placeholder="Internal notes..."
              className="w-full resize-none rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-dark transition hover:bg-primary/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !confirmedDateTime || !meetingLink || confirmBooking.isPending
              }
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {confirmBooking.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CancelBookingModal({ open, onClose, booking }: ModalProps) {
  const cancelBooking = useCancelBooking();

  const [cancelReason, setCancelReason] = useState("");
  const [suggestedDate, setSuggestedDate] = useState("");
  const [suggestedTimeText, setSuggestedTimeText] = useState("");
  const [contactNote, setContactNote] = useState("");

  useEffect(() => {
    if (open && booking) {
      setCancelReason("");
      setSuggestedDate("");
      setSuggestedTimeText("");
      setContactNote("");
    }
  }, [open, booking]);

  if (!open || !booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelReason) return;

    try {
      await cancelBooking.mutateAsync({
        bookingId: booking._id,
        payload: {
          cancelReason,
          rescheduleSuggestion:
            suggestedDate || suggestedTimeText || contactNote
              ? {
                  suggestedDate: suggestedDate
                    ? new Date(suggestedDate).toISOString()
                    : undefined,
                  suggestedTimeText: suggestedTimeText || undefined,
                  contactNote: contactNote || undefined,
                }
              : undefined,
        },
      });
      onClose();
    } catch (error) {
      console.error("Failed to cancel booking", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark">Cancel Session</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-primary/50 transition hover:bg-primary/5 hover:text-dark"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-dark">
              Reason for Cancellation <span className="text-red-500">*</span>
            </label>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={2}
              placeholder="e.g., Expert unavailable..."
              className="w-full resize-none rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div className="border-t border-primary/10 pt-4">
            <h3 className="mb-3 text-sm font-semibold text-dark">
              Reschedule Suggestion (Optional)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-primary/70">
                  Suggested Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={suggestedDate}
                  onChange={(e) => setSuggestedDate(e.target.value)}
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-primary/70">
                  Or Custom Time Text
                </label>
                <input
                  type="text"
                  value={suggestedTimeText}
                  onChange={(e) => setSuggestedTimeText(e.target.value)}
                  placeholder="e.g., Any time next week"
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-primary/70">
                  Contact Note
                </label>
                <input
                  type="text"
                  value={contactNote}
                  onChange={(e) => setContactNote(e.target.value)}
                  placeholder="e.g., Reply to this email or call 555-1234"
                  className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-dark transition hover:bg-primary/5"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!cancelReason || cancelBooking.isPending}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {cancelBooking.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Cancel Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CompleteBookingModal({ open, onClose, booking }: ModalProps) {
  const completeBooking = useCompleteBooking();

  const [interviewFocus, setInterviewFocus] = useState("");
  const [score, setScore] = useState<number | "">("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (open && booking) {
      setInterviewFocus(
        booking.interviewType === "mock_interview" ? "Mock Interview" : "",
      );
      setScore("");
      setComment("");
    }
  }, [open, booking]);

  if (!open || !booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewFocus || score === "" || !comment) return;

    try {
      await completeBooking.mutateAsync({
        bookingId: booking._id,
        payload: {
          interviewFocus,
          score: Number(score),
          comment,
        },
      });
      onClose();
    } catch (error) {
      console.error("Failed to complete booking", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark">Complete Session</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-primary/50 transition hover:bg-primary/5 hover:text-dark"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 rounded-lg bg-primary/5 p-3 text-sm text-primary/70">
          <p>
            <strong>Date:</strong>{" "}
            {booking.confirmedDateTime &&
              new Date(booking.confirmedDateTime).toLocaleString()}
          </p>
          <p>
            <strong>Type:</strong> {booking.interviewType}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-dark">
              Interview Focus
            </label>
            <input
              type="text"
              value={interviewFocus}
              onChange={(e) => setInterviewFocus(e.target.value)}
              placeholder="e.g. React, System Design"
              className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-dark">
              Score (0-10)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.5"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-dark">
              Feedback (Good & Needs Improvement)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Provide constructive feedback here..."
              className="w-full resize-none rounded-xl border border-primary/15 bg-background px-4 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-dark transition hover:bg-primary/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !interviewFocus || score === "" || !comment || completeBooking.isPending
              }
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {completeBooking.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Complete Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
