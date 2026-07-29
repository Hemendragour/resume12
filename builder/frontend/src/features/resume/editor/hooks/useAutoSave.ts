import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useParams } from "react-router-dom";

import { updateResume } from "../../services/resume.service";
import { useResumeStore } from "../../../../store/resume.store";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export const useAutoSave = () => {
  const { id } = useParams();

  const resume = useResumeStore((state) => state.resume);

  const [status, setStatus] = useState<SaveStatus>("idle");

  const firstLoad = useRef(true);
  const saveSequence = useRef(0);

  const [debouncedResume] = useDebounce(resume, 2000);

  useEffect(() => {
    if (!debouncedResume || !id) return;

    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const currentSequence = ++saveSequence.current;

    const save = async () => {
      try {
        setStatus("saving");

        await updateResume(id, debouncedResume);

        if (currentSequence !== saveSequence.current) return;

        setStatus("saved");

        timeout = setTimeout(() => {
          setStatus("idle");
        }, 1500);
      } catch (error) {
        if (currentSequence !== saveSequence.current) return;

        console.error("Auto-save failed:", error);

        setStatus("error");
      }
    };

    save();

    return () => clearTimeout(timeout);
  }, [debouncedResume, id]);

  return status;
};