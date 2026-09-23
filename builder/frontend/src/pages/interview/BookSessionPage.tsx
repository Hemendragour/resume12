import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import BookingForm from "../../features/booking/components/BookingForm";
import { useCreateBooking } from "../../features/booking/hooks/useBookings";
import type { CreateBookingPayload } from "../../features/booking/types/booking.types";

export default function BookSessionPage() {
  const navigate = useNavigate();
  const createBooking = useCreateBooking();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (payload: CreateBookingPayload) => {
    try {
      await createBooking.mutateAsync(payload);
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to book session", error);
    }
  };

  if (isSuccess) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 text-center sm:py-16">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 size={44} className="text-green-600" />
          </div>
        </div>
        <h1 className="mb-3 text-xl font-bold text-dark sm:mb-4 sm:text-2xl lg:text-3xl">
          Session Request Sent!
        </h1>
        <p className="mb-6 text-sm text-primary/70 sm:mb-8 sm:text-base">
          We've received your request to book a live session. Our experts will
          review your request and confirm the date and time. We'll notify you
          once this is confirmed.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={() => navigate("/interview")}
            className="rounded-xl border border-primary/20 px-6 py-2.5 text-sm font-semibold text-dark transition hover:bg-card sm:text-base"
          >
            Back to Interview Prep
          </button>
          <button
            onClick={() => navigate("/interview/history")}
            className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:text-base"
          >
            View History
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-primary/70 transition hover:text-dark sm:mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-bold text-dark sm:text-2xl lg:text-3xl">
          Book a Live Session
        </h1>
        <p className="mt-1.5 text-sm text-primary/70 sm:mt-2 sm:text-base">
          Talk to a placement expert for 1:1 mock interviews and career guidance.
        </p>
      </div>

      <div className="rounded-2xl border border-primary/10 bg-card p-4 shadow-sm sm:p-6 lg:p-8">
        <BookingForm
          onSubmit={handleSubmit}
          submitting={createBooking.isPending}
        />
        {createBooking.isError && (
          <p className="mt-4 text-center text-sm font-medium text-red-500">
            Failed to book session. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
