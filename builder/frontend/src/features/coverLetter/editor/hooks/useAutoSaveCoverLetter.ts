import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useParams } from "react-router-dom";

import { updateCoverLetter } from "../../services/coverLetter.service";
import { useCoverLetterStore } from "../../../../store/coverLetter.store";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export const useAutoSaveCoverLetter = () => {
  const { id } = useParams();

  const coverLetter = useCoverLetterStore((state) => state.coverLetter);

  const [status, setStatus] = useState<SaveStatus>("idle");

  const firstLoad = useRef(true);
  const saveSequence = useRef(0);

  const [debouncedCoverLetter] = useDebounce(coverLetter, 2000);

  useEffect(() => {
    if (!debouncedCoverLetter || !id) return;

    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const currentSequence = ++saveSequence.current;

    const save = async () => {
      try {
        setStatus("saving");

        await updateCoverLetter(id, debouncedCoverLetter);

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
  }, [debouncedCoverLetter, id]);

  return status;
};
