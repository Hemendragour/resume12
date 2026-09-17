import { useQuery } from "@tanstack/react-query";

import { getInterviewHistory } from "../services/interview.service";

export const useInterviewHistory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["interview-history"],
    queryFn: getInterviewHistory,
  });

  return {
    sessions: data ?? [],
    loading: isLoading,
    isError,
  };
};
