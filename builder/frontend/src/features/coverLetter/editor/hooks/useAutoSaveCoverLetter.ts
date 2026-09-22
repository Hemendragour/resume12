import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

import {
  createCoverLetter,
  updateCoverLetter,
} from "../../services/coverLetter.service";
import { useCoverLetterStore } from "../../../../store/coverLetter.store";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export const useAutoSaveCoverLetter = () => {
  const navigate = useNavigate();

  const coverLetter = useCoverLetterStore((state) => state.coverLetter);
  const setCoverLetter = useCoverLetterStore((state) => state.setCoverLetter);

  const [status, setStatus] = useState<SaveStatus>("idle");

  const firstLoad = useRef(true);
  const saveSequence = useRef(0);

  // Tracks the real DB id the moment we know it — synchronously, not via
  // the debounced value (which can lag behind by up to the debounce delay).
  // This is what actually prevents duplicate creates; do not swap this
  // for reading `coverLetter._id`/`debouncedCoverLetter._id` inside the
  // effect below, or the id-changes-on-navigate loop this fixes will come
  // back.
  const savedIdRef = useRef<string>(coverLetter?._id ?? "");

  const [debouncedCoverLetter] = useDebounce(coverLetter, 2000);

  useEffect(() => {
    if (coverLetter?._id) {
      savedIdRef.current = coverLetter._id;
    }
  }, [coverLetter?._id]);

  useEffect(() => {
    if (!debouncedCoverLetter) return;

    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const currentSequence = ++saveSequence.current;

    const save = async () => {
      try {
        setStatus("saving");

        // No saved id yet means this is an AI-generated draft (or
        // otherwise unsaved letter) — the first edit creates the DB
        // record instead of patching a nonexistent one.
        if (!savedIdRef.current) {
          const created = await createCoverLetter(debouncedCoverLetter);

          if (currentSequence !== saveSequence.current) return;

          // Set this synchronously *before* anything else can re-enter
          // save(), so a route/id change triggered by navigate() below
          // can never see an empty id and create a duplicate.
          savedIdRef.current = created._id;

          setCoverLetter(created);
          navigate(`/cover-letter/${created._id}/edit`, { replace: true });
        } else {
          await updateCoverLetter(savedIdRef.current, debouncedCoverLetter);
        }

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
    // Intentionally NOT depending on route `id`: navigating after a
    // create changes the id, and re-running this effect for that reason
    // alone (with a debounced value that hasn't caught up yet) is what
    // caused a create -> navigate -> create -> navigate loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCoverLetter]);

  return status;
};
