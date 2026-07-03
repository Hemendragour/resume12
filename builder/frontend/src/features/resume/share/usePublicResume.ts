import { useEffect, useState } from "react";

import { getPublicResume } from "./share.service";

import type { Resume } from "../types/resume.types";

export function usePublicResume(
  shareId: string
) {
  const [loading, setLoading] =
    useState(true);

  const [resume, setResume] =
    useState<Resume | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await getPublicResume(
            shareId
          );

        setResume(data);
      } finally {
        setLoading(false);
      }
    };

    if (shareId) load();
  }, [shareId]);

  return {
    loading,
    resume,
  };
}