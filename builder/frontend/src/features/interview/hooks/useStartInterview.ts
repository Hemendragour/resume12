import { useMutation } from "@tanstack/react-query";

import { startInterview } from "../services/interview.service";

export const useStartInterview = () => {
  return useMutation({
    mutationFn: startInterview,
  });
};
