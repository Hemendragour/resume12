// import { useMemo } from "react";

// import { useResumes } from "../../resume/hooks/useResumes";

// export function useDashboard() {
//   const { resumes, loading, refetch } = useResumes();

//   const stats = useMemo(() => {
//     const total = resumes.length;

//     const draft = resumes.filter(
//       (r) => r.status === "draft"
//     ).length;

//     const completed = resumes.filter(
//       (r) => r.status === "completed"
//     ).length;

//     const recent = resumes
//       .slice()
//       .sort(
//         (a, b) =>
//           new Date(b.updatedAt).getTime() -
//           new Date(a.updatedAt).getTime()
//       );

//     return {
//       total,
//       draft,
//       completed,
//       recent,
//     };
//   }, [resumes]);

//   return {
//     loading,
//     resumes,
//     refetch,
//     ...stats,
//   };
// }


import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../services/dashboard.service";

import type { DashboardResponse } from "../types/dashboard.types";

export function useDashboard() {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}