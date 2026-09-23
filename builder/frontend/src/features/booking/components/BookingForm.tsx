import { useRef, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { useAuthStore } from "../../../store/auth.store";
import { useResumes } from "../../resume/hooks/useResumes";
import { useUploadAndParseResume } from "../../resume/hooks/useUploadAndParseResume";
import type {
  BookingTimeSlot,
  BookingInterviewType,
  CreateBookingPayload,
} from "../types/booking.types";

interface BookingFormProps {
  onSubmit: (payload: CreateBookingPayload) => void;
  submitting: boolean;
}

const INTERVIEW_TYPES: { value: BookingInterviewType; label: string }[] = [
  { value: "mock_interview", label: "Mock Interview" },
  { value: "resume_review", label: "Resume Review" },
  { value: "placement_guidance", label: "Placement Guidance" },
];

const TIME_SLOTS: { value: BookingTimeSlot; label: string }[] = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "night", label: "Night" },
  { value: "custom", label: "Custom time..." },
];

export default function BookingForm({
  onSubmit,
  submitting,
}: BookingFormProps) {
  const user = useAuthStore((state) => state.user);
  const { resumes, loading: loadingResumes } = useResumes();
  const uploadAndParse = useUploadAndParseResume();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeId, setResumeId] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<BookingTimeSlot>("morning");
  const [customTimeText, setCustomTimeText] = useState("");
  const [interviewType, setInterviewType] =
    useState<BookingInterviewType>("mock_interview");
  const [notes, setNotes] = useState("");

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const resume = await uploadAndParse.mutateAsync({ file });
    setResumeId(resume._id);
  };

  const canSubmit =
    preferredDate.trim().length > 0 &&
    (timeSlot !== "custom" || customTimeText.trim().length > 0) &&
    !submitting &&
    !uploadAndParse.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    onSubmit({
      resumeId: resumeId || undefined,
      preferredDate: new Date(preferredDate).toISOString(),
      timeSlot,
      customTimeText: timeSlot === "custom" ? customTimeText.trim() : undefined,
      interviewType,
      notes: notes.trim() || undefined,
    });
  };

  // Get tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* User Info (Read-only) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-dark">
            Name
          </label>
          <input
            type="text"
            value={user?.fullName || ""}
            disabled
            className="w-full rounded-xl border border-primary/15 bg-card/50 px-4 py-2.5 text-sm text-dark opacity-70"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-dark">
            Email
          </label>
          <input
            type="text"
            value={user?.email || ""}
            disabled
            className="w-full rounded-xl border border-primary/15 bg-card/50 px-4 py-2.5 text-sm text-dark opacity-70"
          />
        </div>
      </div>

      {/* Resume */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Resume <span className="font-normal text-primary/50">(optional)</span>
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <select
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            disabled={loadingResumes}
            className="w-full rounded-xl border border-primary/15 bg-card px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent sm:min-w-[220px] sm:flex-1"
          >
            <option value="">
              {loadingResumes ? "Loading resumes..." : "None selected"}
            </option>
            {resumes.map((resume) => (
              <option key={resume._id} value={resume._id}>
                {resume.title || "Untitled resume"}
              </option>
            ))}
          </select>
          <span className="text-center text-xs text-primary/50 sm:shrink-0">
            or
          </span>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadAndParse.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/25 px-4 py-2.5 text-sm font-medium text-primary transition hover:border-accent hover:text-accent disabled:opacity-60 sm:w-auto sm:justify-start"
          >
            {uploadAndParse.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UploadCloud size={16} />
            )}
            Upload new resume
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {uploadAndParse.isError && (
          <p className="mt-2 text-xs text-red-500">
            Couldn't upload that file. Please try again.
          </p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Preferred Date
        </label>
        <input
          type="date"
          min={minDate}
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          className="w-full rounded-xl border border-primary/15 bg-card px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent"
          required
        />
      </div>

      {/* Time Slot */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Preferred Time
        </label>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTimeSlot(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                timeSlot === option.value
                  ? "bg-accent text-white"
                  : "border border-primary/15 text-primary/70 hover:border-accent"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {timeSlot === "custom" && (
          <div className="mt-3">
            <input
              type="text"
              value={customTimeText}
              onChange={(e) => setCustomTimeText(e.target.value)}
              placeholder="e.g. 10am to 11am IST"
              className="w-full rounded-xl border border-primary/15 bg-card px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
        )}
      </div>

      {/* Interview Type */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Session Type
        </label>
        <div className="flex flex-wrap gap-2">
          {INTERVIEW_TYPES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setInterviewType(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                interviewType === option.value
                  ? "bg-accent text-white"
                  : "border border-primary/15 text-primary/70 hover:border-accent"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          What are you preparing for?{" "}
          <span className="font-normal text-primary/50">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="e.g. I have an interview in 3 days, want to test my core subject knowledge for Google..."
          className="w-full resize-none rounded-xl border border-primary/15 bg-card px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Booking Session...
          </>
        ) : (
          "Book Session"
        )}
      </button>
    </form>
  );
}
