import { useMemo } from "react";

import { useResumeStore } from "../../../store/resume.store";

import { calculateCompletion } from "../utils/calculateCompletion";

export function useResumeCompletion() {
  const resume = useResumeStore(
    (state) => state.resume
  );

  return useMemo(() => {
    if (!resume) return null;

    return calculateCompletion(resume);
  }, [resume]);
}