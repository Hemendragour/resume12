import { useState } from "react";
import { Loader2, Calendar } from "lucide-react";
import { useAdminBookings } from "../../features/booking/hooks/useBookings";
import type { IBookingSession } from "../../features/booking/types/booking.types";
import {
  ConfirmBookingModal,
  CancelBookingModal,
  CompleteBookingModal,
} from "../../features/booking/components/AdminBookingModals";

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

export default function BookingRequestsPage() {
  const { data: bookings = [], isLoading, isError } = useAdminBookings();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBookingSession | null>(
    null,
  );

  const openConfirm = (booking: IBookingSession) => {
    setSelectedBooking(booking);
    setConfirmModalOpen(true);
  };

  const openCancel = (booking: IBookingSession) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const openComplete = (booking: IBookingSession) => {
    setSelectedBooking(booking);
    setCompleteModalOpen(true);
  };

  if (isLoading) {
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
          We couldn't load booking requests. Please try again.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">
          Interview Session Requests
        </h1>
        <p className="mt-2 text-primary/70">
          Manage and respond to user requests for live mock interviews.
        </p>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center text-primary/60">No booking requests found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const userName =
              typeof booking.userId === "object"
                ? booking.userId.fullName
                : "Unknown User";
            const userEmail =
              typeof booking.userId === "object"
                ? booking.userId.email
                : "Unknown Email";
            const resumeTitle =
              booking.resumeId && typeof booking.resumeId === "object"
                ? booking.resumeId.title
                : "No Resume Selected";

            return (
              <div
                key={booking._id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-primary/10 bg-card p-6 shadow-sm md:flex-row md:items-start"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-dark">{userName}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        STATUS_STYLES[booking.status] ||
                        "bg-primary/10 text-primary/60"
                      }`}
                    >
                      {STATUS_LABELS[booking.status] || booking.status}
                    </span>
                  </div>

                  <p className="text-sm text-primary/70">{userEmail}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary/60">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(booking.preferredDate).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </span>
                    <span className="capitalize">
                      {booking.interviewType.replace("_", " ")}
                    </span>
                    <span className="capitalize">
                      {booking.timeSlot}
                    </span>
                  </div>
                  {booking.customTimeText && (
                    <p className="text-sm text-primary/60">
                      Custom Time: {booking.customTimeText}
                    </p>
                  )}
                  <p className="text-sm text-primary/60">
                    Resume: {resumeTitle}
                  </p>
                  {booking.notes && (
                    <p className="mt-2 text-sm italic text-primary/80">
                      "{booking.notes}"
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 md:items-end">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => openConfirm(booking)}
                        className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Confirm Session
                      </button>
                      <button
                        onClick={() => openCancel(booking)}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Cancel Request
                      </button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => openComplete(booking)}
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Complete Session
                    </button>
                  )}
                  {booking.status === "completed" && booking.feedback && (
                    <div className="text-right text-sm">
                      <p className="font-semibold text-green-600">
                        Score: {booking.feedback.score}/10
                      </p>
                      <p className="text-primary/60">
                        by {booking.feedback.interviewerName}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmBookingModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        booking={selectedBooking}
      />
      <CancelBookingModal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        booking={selectedBooking}
      />
      <CompleteBookingModal
        open={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        booking={selectedBooking}
      />
    </section>
  );
}
