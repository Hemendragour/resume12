import { useQuery } from "@tanstack/react-query";

import { getATSScore } from "../services/ats.service";

export function useATSScore(
  resumeId?: string
) {
  return useQuery({
    queryKey: [
      "ats-score",
      resumeId,
    ],

    queryFn: () =>
      getATSScore(
        resumeId!
      ),

    enabled: !!resumeId,
  });
}