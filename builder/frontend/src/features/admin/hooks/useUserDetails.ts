import { useQuery } from "@tanstack/react-query";

import { getUserDetails } from "../services/user-details.service";

export function useUserDetails(
  id: string,
  enabled: boolean
) {
  return useQuery({
    queryKey: [
      "admin-user",
      id,
    ],
    queryFn: () =>
      getUserDetails(id),
    enabled,
  });
}