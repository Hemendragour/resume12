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


import { useQuery } from "@tanstack/react-query";

import { getResumes } from "../services/resume.service";

export const useResumes = () => {
  const query = useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
  });

  return {
    resumes: query.data ?? [],
    loading: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
};