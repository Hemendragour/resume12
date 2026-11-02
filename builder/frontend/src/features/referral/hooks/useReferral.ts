import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "../../../store/auth.store";
import { getMyReferral } from "../services/referral.service";

export const REFERRAL_QUERY_KEY = ["referral"] as const;

/** The signed-in user's referral code and progress. */
export function useReferral() {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: REFERRAL_QUERY_KEY,
    queryFn: getMyReferral,
    enabled: !!user,
  });
}
