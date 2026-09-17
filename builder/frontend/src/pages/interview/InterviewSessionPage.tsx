import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, XCircle } from "lucide-react";

import { getInterviewSession } from "../../features/interview/services/interview.service";
import { useSubmitAnswer } from "../../features/interview/hooks/useSubmitAnswer";
import { useEndInterview } from "../../features/interview/hooks/useEndInterview";

import ProgressBar from "../../features/interview/components/ProgressBar";
import QuestionCard from "../../features/interview/components/QuestionCard";
import FeedbackCard from "../../features/interview/components/FeedbackCard";
import EndTestModal from "../../features/interview/components/EndTestModal";
import SessionSummary from "../../features/interview/components/SessionSummary";
import QuestionReviewCard from "../../features/interview/components/QuestionReviewCard";

import type { InterviewFeedback } from "../../features/interview/types/interview.types";

export default function InterviewSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const queryClient = useQueryClient();

  const [pendingFeedback, setPendingFeedback] =
    useState<InterviewFeedback | null>(null);
  const [showEndModal, setShowEndModal] = useState(false);

  const submitAnswer = useSubmitAnswer();
  const endInterview = useEndInterview();

  const { data: session, isLoading, isError } = useQuery({
    queryKey: ["interview-session", sessionId],
    queryFn: () => getInterviewSession(sessionId as string),
    enabled: !!sessionId,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (isError || !session || !sessionId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <XCircle className="mx-auto mb-3 text-red-500" size={32} />
        <p className="text-primary/70">
          We couldn't load this interview session.
        </p>
      </div>
    );
  }

  if (session.status !== "in_progress") {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10">
        {session.summary ? (
          <>
            <SessionSummary
              summary={session.summary}
              answeredCount={
                session.questions.filter((q) => q.feedback).length
              }
              totalQuestions={session.totalQuestions}
            />

            {session.questions.length > 0 && (
              <div className="mt-8 space-y-4">
                <h2 className="text-lg font-semibold text-dark">
                  Question by Question
                </h2>

                {session.questions.map((question, i) => (
                  <QuestionReviewCard
                    key={question.index}
                    question={question}
                    number={i + 1}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-primary/70">
            This interview session has ended.
          </p>
        )}
      </section>
    );
  }

  const currentQuestion = session.questions[session.questions.length - 1];
  const currentIndex = session.questions.length - 1;
  const isLastQuestion = session.questions.length >= session.totalQuestions;

  const handleAnswerSubmit = (
    answerText: string,
    timeTakenSeconds: number,
  ) => {
    submitAnswer.mutate(
      {
        sessionId,
        questionIndex: currentIndex,
        answerText,
        timeTakenSeconds,
      },
      {
        onSuccess: (result) => {
          setPendingFeedback(result.feedback);
          queryClient.setQueryData(
            ["interview-session", sessionId],
            result.session,
          );
        },
      },
    );
  };

  const handleNext = () => {
    setPendingFeedback(null);
  };

  const handleEndConfirm = () => {
    endInterview.mutate(sessionId, {
      onSuccess: (updatedSession) => {
        setShowEndModal(false);
        setPendingFeedback(null);
        queryClient.setQueryData(
          ["interview-session", sessionId],
          updatedSession,
        );
      },
    });
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <ProgressBar
          current={session.questions.length}
          total={session.totalQuestions}
        />
      </div>

      {pendingFeedback ? (
        <FeedbackCard
          feedback={pendingFeedback}
          isLastQuestion={isLastQuestion}
          onNext={handleNext}
        />
      ) : (
        <QuestionCard
          key={currentQuestion.index}
          question={currentQuestion.question}
          isFollowUp={currentQuestion.isFollowUp}
          onSubmit={handleAnswerSubmit}
          submitting={submitAnswer.isPending}
        />
      )}

      {submitAnswer.isError && (
        <p className="mt-4 text-center text-sm text-red-500">
          Something went wrong evaluating your answer. Please try again.
        </p>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => setShowEndModal(true)}
          className="text-sm font-medium text-primary/50 underline-offset-2 hover:text-red-500 hover:underline"
        >
          End Test
        </button>
      </div>

      <EndTestModal
        open={showEndModal}
        onCancel={() => setShowEndModal(false)}
        onConfirm={handleEndConfirm}
        ending={endInterview.isPending}
      />
    </section>
  );
}
