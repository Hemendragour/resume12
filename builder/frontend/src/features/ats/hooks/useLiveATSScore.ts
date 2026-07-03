import { useMemo } from "react";

import { useResumeStore } from "../../../store/resume.store";

import { calculateATSScore } from "../utils/calculateATSScore";

export function useLiveATSScore() {
  const resume = useResumeStore(
    (state) => state.resume
  );

  return useMemo(() => {
    if (!resume) return null;

    return calculateATSScore(resume);
  }, [resume]);
}