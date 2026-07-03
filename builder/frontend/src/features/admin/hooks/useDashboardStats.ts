import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "../services/admin.service";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboardStats,
  });
}