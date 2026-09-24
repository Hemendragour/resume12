import { useEffect, useState } from "react";
import { Loader2, Mic, MicOff, Timer, Volume2, VolumeX } from "lucide-react";

import { useQuestionAudio } from "../hooks/useQuestionAudio";
import { useVoiceRecorder } from "../hooks/useVoiceRecorder";

interface QuestionCardProps {
  question: string;
  isFollowUp: boolean;
  audioBlob: Blob | null;
  onSubmit: (answerText: string, timeTakenSeconds: number) => void;
  submitting: boolean;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default function QuestionCard({
  question,
  isFollowUp,
  audioBlob,
  onSubmit,
  submitting,
}: QuestionCardProps) {
  const [answerText, setAnswerText] = useState("");
  const [seconds, setSeconds] = useState(0);

  // Plays the audio that arrived bundled with this question - autoplays
  // on mount, and the speaker button toggles stop/replay from there.
  // No browser SpeechSynthesis involved.
  const questionAudio = useQuestionAudio(audioBlob);

  // Records the mic and sends it to a real server-side STT service
  // (see useVoiceRecorder), then drops the transcript into the
  // textarea below so it stays fully editable before submission.
  const voiceRecorder = useVoiceRecorder((transcript) => {
    if (!transcript) return;

    setAnswerText((prev) =>
      prev.trim() ? `${prev.trim()} ${transcript}` : transcript,
    );
  });

  // Timer — starts as soon as a new question is shown.
  useEffect(() => {
    setAnswerText("");
    setSeconds(0);

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [question]);

  const handleMicClick = () => {
    if (voiceRecorder.status === "recording") {
      voiceRecorder.stopRecording();
    } else {
      voiceRecorder.startRecording();
    }
  };

  const handleSubmit = () => {
    if (!answerText.trim() || submitting) return;

    if (voiceRecorder.status === "recording") {
      voiceRecorder.stopRecording();
    }

    onSubmit(answerText.trim(), seconds);
  };

  const isRecorderBusy = voiceRecorder.status !== "idle";

  return (
    <div className="rounded-2xl border border-primary/10 bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
        {isFollowUp && (
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            Follow-up
          </span>
        )}

        <div className="ml-auto flex items-center gap-1.5 text-sm font-medium text-primary/60">
          <Timer size={16} />
          {formatTime(seconds)}
        </div>
      </div>

      <div className="mb-2 flex items-start gap-2 sm:gap-3">
        <p className="flex-1 text-base font-medium text-dark sm:text-lg">
          {question}
        </p>

        <button
          type="button"
          onClick={questionAudio.toggle}
          disabled={!questionAudio.hasAudio}
          title={
            questionAudio.isPlaying
              ? "Stop reading question aloud"
              : "Replay question"
          }
          className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary/60 transition hover:bg-accent/15 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {questionAudio.isPlaying ? (
            <Volume2 size={16} />
          ) : (
            <VolumeX size={16} />
          )}
        </button>
      </div>

      {questionAudio.error && (
        <p className="mb-4 text-xs text-red-500">{questionAudio.error}</p>
      )}

      <div className={`relative ${questionAudio.error ? "" : "mt-4"}`}>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          rows={6}
          placeholder="Type your answer, or tap the mic to speak it — you can review and edit the transcript before submitting."
          disabled={submitting}
          className="w-full resize-none rounded-xl border border-primary/15 bg-white px-3 py-3 pr-12 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent sm:px-4"
        />

        {voiceRecorder.isSupported && (
          <button
            type="button"
            onClick={handleMicClick}
            disabled={submitting || voiceRecorder.status === "transcribing"}
            title={
              voiceRecorder.status === "recording"
                ? "Stop recording"
                : voiceRecorder.status === "transcribing"
                  ? "Transcribing..."
                  : "Answer by speaking"
            }
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${
              voiceRecorder.status === "recording"
                ? "bg-red-500 text-white"
                : "bg-primary/10 text-primary/60 hover:bg-accent/15 hover:text-accent"
            }`}
          >
            {voiceRecorder.status === "transcribing" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : voiceRecorder.status === "recording" ? (
              <Mic size={16} />
            ) : (
              <MicOff size={16} />
            )}
          </button>
        )}
      </div>

      {voiceRecorder.status === "recording" && (
        <p className="mt-2 text-xs font-medium text-red-500">
          Recording... tap the mic again to stop and transcribe.
        </p>
      )}

      {voiceRecorder.status === "transcribing" && (
        <p className="mt-2 text-xs font-medium text-primary/60">
          Transcribing your answer...
        </p>
      )}

      {voiceRecorder.error && (
        <p className="mt-2 text-xs text-red-500">{voiceRecorder.error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!answerText.trim() || submitting || isRecorderBusy}
        className="mt-4 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:text-base"
      >
        {submitting ? "Evaluating your answer..." : "Submit Answer"}
      </button>
    </div>
  );
}
