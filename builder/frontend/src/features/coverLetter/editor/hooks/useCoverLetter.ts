import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useCoverLetterStore } from "../../../../store/coverLetter.store";
import { getCoverLetterById } from "../../services/coverLetter.service";

export const useCoverLetter = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const coverLetter = useCoverLetterStore((state) => state.coverLetter);
  const setCoverLetter = useCoverLetterStore((state) => state.setCoverLetter);

  const fetchCoverLetter = async () => {
    if (!id) return;

    // "draft" is a synthetic id used for an AI-generated cover letter
    // that hasn't been saved yet — the store already has the content
    // (loaded via loadDraft), so there's nothing to fetch.
    if (id === "draft") {
      setLoading(false);
      return;
    }

    // The store can already hold this exact cover letter — e.g. right
    // after auto-save creates it and navigates to its real id. Re-fetching
    // in that case is a wasted round trip (and, combined with other
    // effects, has previously caused request loops), so skip it.
    if (coverLetter?._id === id) {
      setLoading(false);
      return;
    }

    try {
      const data = await getCoverLetterById(id);
      setCoverLetter(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoverLetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    loading,
    coverLetter,
    setCoverLetter,
    refetch: fetchCoverLetter,
    coverLetterId: id,
  };
};
