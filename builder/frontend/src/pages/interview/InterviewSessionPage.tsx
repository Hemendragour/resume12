import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, XCircle } from "lucide-react";

import {
  getInterviewSession,
  synthesizeQuestionAudio,
} from "../../features/interview/services/interview.service";
import { base64ToAudioBlob } from "../../features/interview/utils/base64ToAudioBlob";
import { useSubmitAnswer } from "../../features/interview/hooks/useSubmitAnswer";
import { useEndInterview } from "../../features/interview/hooks/useEndInterview";

import ProgressBar from "../../features/interview/components/ProgressBar";
import QuestionCard from "../../features/interview/components/QuestionCard";
import FeedbackCard from "../../features/interview/components/FeedbackCard";
import EndTestModal from "../../features/interview/components/EndTestModal";
import SessionSummary from "../../features/interview/components/SessionSummary";
import QuestionReviewCard from "../../features/interview/components/QuestionReviewCard";

import type {
  InterviewFeedback,
  QuestionAudio,
} from "../../features/interview/types/interview.types";

interface SessionLocationState {
  initialAudio?: QuestionAudio;
}

export default function InterviewSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [pendingFeedback, setPendingFeedback] =
    useState<InterviewFeedback | null>(null);
  // True only once the backend confirms there is no next question - i.e.
  // audio came back null. session.questions.length already includes the
  // next (unanswered) question by this point, so it can't be used here.
  const [isFinalAnswer, setIsFinalAnswer] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  // Audio for each question, keyed by question index. A question is
  // only ever rendered once its entry exists here - text and audio
  // always arrive, and appear, together.
  const [audioByIndex, setAudioByIndex] = useState<Record<number, Blob>>({});
  const [audioFetchError, setAudioFetchError] = useState(false);
  const [audioRetryTick, setAudioRetryTick] = useState(0);
  const fetchingIndexRef = useRef<number | null>(null);

  const submitAnswer = useSubmitAnswer();
  const endInterview = useEndInterview();

  const { data: session, isLoading, isError } = useQuery({
    queryKey: ["interview-session", sessionId],
    queryFn: () => getInterviewSession(sessionId as string),
    enabled: !!sessionId,
  });

  // Seed question 0's audio from the start-interview response that was
  // just handed to us via navigation - avoids a redundant fetch for
  // the very first question.
  useEffect(() => {
    const initialAudio = (location.state as SessionLocationState | null)
      ?.initialAudio;

    if (!initialAudio) return;

    setAudioByIndex((prev) =>
      prev[0]
        ? prev
        : {
            ...prev,
            0: base64ToAudioBlob(initialAudio.base64, initialAudio.mimeType),
          },
    );
    // Only ever meant to run once, for the question this page was
    // navigated to with - session/currentIndex intentionally excluded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentIndex = session ? session.questions.length - 1 : -1;
  const currentQuestion = session?.questions[currentIndex];

  // Fallback: if the current question has no audio yet (e.g. the user
  // landed here via a page refresh, so there was no bundled response
  // to seed from), fetch it on its own. This never fires on the normal
  // start/submit-answer path, since that audio is already in the map
  // by the time this effect runs.
  useEffect(() => {
    if (!currentQuestion || pendingFeedback) return;
    if (audioByIndex[currentIndex]) return;
    if (fetchingIndexRef.current === currentIndex) return;

    fetchingIndexRef.current = currentIndex;
    setAudioFetchError(false);

    synthesizeQuestionAudio(currentQuestion.question)
      .then((blob) => {
        setAudioByIndex((prev) => ({ ...prev, [currentIndex]: blob }));
      })
      .catch(() => {
        setAudioFetchError(true);
      })
      .finally(() => {
        fetchingIndexRef.current = null;
      });
  }, [
    currentIndex,
    currentQuestion,
    audioByIndex,
    pendingFeedback,
    audioRetryTick,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (isError || !session || !sessionId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center sm:py-16">
        <XCircle className="mx-auto mb-3 text-red-500" size={32} />
        <p className="text-primary/70">
          We couldn't load this interview session.
        </p>
      </div>
    );
  }

  if (session.status !== "in_progress" && !pendingFeedback) {
    return (
      <section className="mx-auto w-full max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
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
              <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                <h2 className="text-base font-semibold text-dark sm:text-lg">
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

  const activeQuestion = session.questions[currentIndex];
  const activeAudio = audioByIndex[currentIndex] ?? null;

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
          const nextIndex = result.session.questions.length - 1;

          // Updating the session cache and the next question's audio
          // together, in this one handler, means React batches them
          // into a single render - the next question and its audio
          // always appear together, never one before the other.
          setPendingFeedback(result.feedback);
          // audio is only ever null when the backend generated no next
          // question - the one true signal that this was the last one.
          setIsFinalAnswer(!result.audio);

          if (result.audio) {
            setAudioByIndex((prev) => ({
              ...prev,
              [nextIndex]: base64ToAudioBlob(
                result.audio!.base64,
                result.audio!.mimeType,
              ),
            }));
          }

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
    setIsFinalAnswer(false);
  };

  const handleEndConfirm = () => {
    endInterview.mutate(sessionId, {
      onSuccess: (updatedSession) => {
        setShowEndModal(false);
        setPendingFeedback(null);
        setIsFinalAnswer(false);
        queryClient.setQueryData(
          ["interview-session", sessionId],
          updatedSession,
        );
      },
    });
  };

  return (
    <section className="mx-auto w-full max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
      <div className="mb-4 sm:mb-6">
        <ProgressBar
          current={Math.min(currentIndex + 1, session.totalQuestions)}
          answered={session.questions.filter((q) => q.feedback).length}
          total={session.totalQuestions}
        />
      </div>

      {pendingFeedback ? (
        <FeedbackCard
          feedback={pendingFeedback}
          isLastQuestion={isFinalAnswer}
          onNext={handleNext}
        />
      ) : activeAudio ? (
        <QuestionCard
          key={activeQuestion.index}
          question={activeQuestion.question}
          isFollowUp={activeQuestion.isFollowUp}
          audioBlob={activeAudio}
          onSubmit={handleAnswerSubmit}
          submitting={submitAnswer.isPending}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-primary/10 bg-card p-6 text-center sm:p-10">
          <Loader2 className="animate-spin text-accent" size={28} />
          <p className="text-sm text-primary/60">
            Preparing your question...
          </p>
          {audioFetchError && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-red-500">
                Couldn't load the question audio.
              </p>
              <button
                type="button"
                onClick={() => setAudioRetryTick((t) => t + 1)}
                className="text-xs font-medium text-accent underline-offset-2 hover:underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>
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
