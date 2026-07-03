import { useQuery } from "@tanstack/react-query";

import {
  getResumeAnalytics,
} from "../services/analytics.service";

export function useResumeAnalytics(
  resumeId: string
) {
  const query = useQuery({
  queryKey: [
    "analytics",
    resumeId,
  ],
  queryFn: () =>
    getResumeAnalytics(resumeId),
  enabled: !!resumeId,
});

return query;
}