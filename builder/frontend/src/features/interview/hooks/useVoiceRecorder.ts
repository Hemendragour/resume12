import { useRef, useState } from "react";

import { transcribeAnswerAudio } from "../services/interview.service";

type RecorderStatus = "idle" | "recording" | "transcribing";

// MediaRecorder itself is a standard, cross-browser media-capture API
// (unlike SpeechRecognition) - this just picks a mime type the current
// browser actually supports for recording.
const pickMimeType = (): string => {
  if (typeof MediaRecorder === "undefined") return "";

  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];

  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
};

/**
 * Records the candidate's spoken answer via the microphone and sends it
 * to the backend Speech-to-Text service. The resulting transcript is
 * handed back via onTranscribed so the caller can drop it into an
 * editable textarea rather than auto-submitting it.
 */
export const useVoiceRecorder = (onTranscribed: (text: string) => void) => {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const isSupported =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined";

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startRecording = async () => {
    if (!isSupported || status !== "idle") return;

    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamRef.current = stream;

      const mimeType = pickMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        stopStream();

        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        chunksRef.current = [];

        if (blob.size === 0) {
          setStatus("idle");
          return;
        }

        setStatus("transcribing");

        try {
          const transcript = await transcribeAnswerAudio(blob);
          onTranscribed(transcript);
        } catch {
          setError(
            "Couldn't transcribe that recording. Please try again or type your answer.",
          );
        } finally {
          setStatus("idle");
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setStatus("recording");
    } catch {
      setError("Microphone access was denied or unavailable.");
      setStatus("idle");
    }
  };

  const stopRecording = () => {
    if (status !== "recording") return;
    mediaRecorderRef.current?.stop();
  };

  return { status, error, isSupported, startRecording, stopRecording };
};
