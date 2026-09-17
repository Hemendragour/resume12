import { useNavigate } from "react-router-dom";

import InterviewConfigForm from "../../features/interview/components/InterviewConfigForm";
import { useStartInterview } from "../../features/interview/hooks/useStartInterview";

import type { StartInterviewPayload } from "../../features/interview/types/interview.types";

export default function GenerateInterviewPage() {
  const navigate = useNavigate();
  const startInterview = useStartInterview();

  const handleSubmit = (payload: StartInterviewPayload) => {
    startInterview.mutate(payload, {
      onSuccess: (session) => {
        navigate(`/interview/ai/session/${session._id}`);
      },
    });
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Generate Questions</h1>
        <p className="mt-2 text-primary/70">
          Tell us what you're preparing for and we'll build a mock interview
          around it.
        </p>
      </div>

      <InterviewConfigForm
        onSubmit={handleSubmit}
        submitting={startInterview.isPending}
      />

      {startInterview.isError && (
        <p className="mt-4 text-center text-sm text-red-500">
          Something went wrong starting your interview. Please try again.
        </p>
      )}
    </section>
  );
}
