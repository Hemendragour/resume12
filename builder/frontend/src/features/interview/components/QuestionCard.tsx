import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Timer } from "lucide-react";

interface QuestionCardProps {
  question: string;
  isFollowUp: boolean;
  onSubmit: (answerText: string, timeTakenSeconds: number) => void;
  submitting: boolean;
}

// Not every browser supports the Web Speech API (notably Safari has patchy
// support), so we feature-detect and simply hide the mic button if it's
// unavailable rather than breaking the write flow.
const SpeechRecognitionCtor: any =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    : undefined;

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
  onSubmit,
  submitting,
}: QuestionCardProps) {
  const [answerText, setAnswerText] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Timer — starts as soon as a new question is shown.
  useEffect(() => {
    setAnswerText("");
    setSeconds(0);

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [question]);

  const toggleListening = () => {
    if (!SpeechRecognitionCtor) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswerText(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleSubmit = () => {
    if (!answerText.trim() || submitting) return;

    recognitionRef.current?.stop();
    setIsListening(false);

    onSubmit(answerText.trim(), seconds);
  };

  return (
    <div className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
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

      <p className="mb-6 text-lg font-medium text-dark">{question}</p>

      <div className="relative">
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          rows={6}
          placeholder="Type your answer here..."
          disabled={submitting}
          className="w-full resize-none rounded-xl border border-primary/15 bg-white px-4 py-3 pr-12 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent"
        />

        {SpeechRecognitionCtor && (
          <button
            type="button"
            onClick={toggleListening}
            title={isListening ? "Stop recording" : "Answer by speaking"}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition ${
              isListening
                ? "bg-red-500 text-white"
                : "bg-primary/10 text-primary/60 hover:bg-accent/15 hover:text-accent"
            }`}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!answerText.trim() || submitting}
        className="mt-4 w-full rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Evaluating your answer..." : "Submit Answer"}
      </button>
    </div>
  );
}
