import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  analyzeATS,
  getATSHistory,
  getLatestATS,
} from "../services/ats.service";

import type {
  ATSAnalyzeRequest,
} from "../types/ats.types";

// ============================================================
// QUERY KEYS
// ============================================================

export const atsQueryKeys = {
  all: ["ats"] as const,

  latest: (resumeId: string) =>
    ["ats", "latest", resumeId] as const,

  history: (resumeId: string) =>
    ["ats", "history", resumeId] as const,
};

// ============================================================
// LATEST ATS ANALYSIS
// ============================================================

export function useLatestATS(
  resumeId?: string
) {
  return useQuery({
    queryKey: resumeId
      ? atsQueryKeys.latest(resumeId)
      : atsQueryKeys.all,

    queryFn: () =>
      getLatestATS(resumeId!),

    enabled: Boolean(resumeId),

    staleTime: 1000 * 60 * 5,

    retry: false,
  });
}

// ============================================================
// RUN ATS ANALYSIS
// ============================================================

export function useAnalyzeATS() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      payload: ATSAnalyzeRequest
    ) => analyzeATS(payload),

    onSuccess: (
      response,
      variables
    ) => {
      queryClient.setQueryData(
        atsQueryKeys.latest(
          variables.resumeId
        ),
        {
          success: true,
          data: response.data.result,
        }
      );

      queryClient.invalidateQueries({
        queryKey:
          atsQueryKeys.history(
            variables.resumeId
          ),
      });
    },
  });
}

// ============================================================
// ATS ANALYSIS HISTORY
// ============================================================

export function useATSHistory(
  resumeId?: string
) {
  return useQuery({
    queryKey: resumeId
      ? atsQueryKeys.history(resumeId)
      : atsQueryKeys.all,

    queryFn: () =>
      getATSHistory(resumeId!),

    enabled: Boolean(resumeId),

    staleTime: 1000 * 60 * 5,
  });
}