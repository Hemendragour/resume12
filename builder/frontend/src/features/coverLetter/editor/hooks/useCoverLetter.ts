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
