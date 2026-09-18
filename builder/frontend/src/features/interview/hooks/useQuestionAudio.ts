import { useEffect, useRef, useState } from "react";

/**
 * Plays a pre-generated question audio Blob (fetched by the caller,
 * bundled together with the question text in the same API response).
 *
 * Behavior:
 * - Autoplays immediately whenever `audioBlob` changes (a new question
 *   arrived with its audio already attached - no click needed).
 * - `toggle()` stops playback if currently playing.
 * - `toggle()` replays the same audio from the start if not playing
 *   (whether it was stopped by the user or finished on its own).
 */
export const useQuestionAudio = (audioBlob: Blob | null) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const cleanup = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  // A new question's audio arrived - tear down the previous one and
  // autoplay the new one straight away.
  useEffect(() => {
    cleanup();
    setIsPlaying(false);
    setError(null);

    if (!audioBlob) return;

    const url = URL.createObjectURL(audioBlob);
    objectUrlRef.current = url;

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      setError("Couldn't play the question audio.");
      setIsPlaying(false);
    };

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Some browsers block autoplay until the user has interacted
        // with the page at least once - the speaker button still works.
        setIsPlaying(false);
      });

    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // Whether it was paused mid-way or ran to the end, the speaker
    // button always restarts it from the beginning.
    audio.currentTime = 0;
    setError(null);

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setError("Couldn't play the question audio."));
  };

  return { isPlaying, error, toggle, hasAudio: !!audioBlob };
};
