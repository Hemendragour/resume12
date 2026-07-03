import { useEffect, useRef, useState } from "react";

import { useDebounce } from "use-debounce";

import { useParams } from "react-router-dom";

import { updateResume } from "../../services/resume.service";

import { useResumeStore } from "../../../../store/resume.store";

export const useAutoSave = () => {
  const { id } = useParams();

  const resume = useResumeStore(
    (state) => state.resume
  );

  const [status, setStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const firstLoad = useRef(true);

  const [debouncedResume] = useDebounce(
    resume,
    2000
  );

  useEffect(() => {
  if (!debouncedResume || !id) return;

  // Skip first render after loading resume
  if (firstLoad.current) {
    firstLoad.current = false;
    return;
  }

  let timeout: ReturnType<typeof setTimeout>;

  const save = async () => {
    try {
      setStatus("saving");

      await updateResume(id, debouncedResume);

      setStatus("saved");

      timeout = setTimeout(() => {
        setStatus("idle");
      }, 1500);
    } catch {
      setStatus("error");
    }
  };

  save();

  return () => clearTimeout(timeout);
}, [debouncedResume, id]);

  return status;
};