// import { useEffect, useState } from "react";

// import { getResumes } from "../services/resume.service";

// import type { Resume } from "../types/resume.types";

// export const useResumes = () => {
//   const [loading, setLoading] =
//     useState(true);

//   const [resumes, setResumes] =
//     useState<Resume[]>([]);

//   const fetchResumes = async () => {
//     try {
//       const data =
//         await getResumes();

//       setResumes(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchResumes();
//   }, []);

//   return {
//     loading,
//     resumes,
//     refetch: fetchResumes,
//   };
// };

// -------- ORG CODE ----------------
// import { useQuery } from "@tanstack/react-query";

// import { getResumes } from "../services/resume.service";

// export const useResumes = () => {
//   const query = useQuery({
//     queryKey: ["resumes"],
//     queryFn: getResumes,
//   });

//   return {
//     resumes: query.data ?? [],
//     loading: query.isPending,
//     error: query.error,
//     refetch: query.refetch,
//   };
// };

import { useInfiniteQuery } from "@tanstack/react-query";

import { getResumes } from "../services/resume.service";

export const useResumes = () => {
  const query = useInfiniteQuery({
    queryKey: ["resumes"],

    queryFn: ({ pageParam }) => {
      return getResumes(pageParam);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.hasNextPage) {
        return undefined;
      }

      return lastPage.pagination.currentPage + 1;
    },
  });

  // All loaded pages combined into one array
  const resumes = query.data?.pages?.flatMap((page) => page.resumes) ?? [];

  // Last loaded page's pagination
  const pagination = query.data?.pages?.at(-1)?.pagination;

  return {
    resumes,

    pagination,

    loading: query.isPending,

    loadingMore: query.isFetchingNextPage,

    hasNextPage: query.hasNextPage,

    fetchNextPage: query.fetchNextPage,

    error: query.error,

    refetch: query.refetch,
  };
};
