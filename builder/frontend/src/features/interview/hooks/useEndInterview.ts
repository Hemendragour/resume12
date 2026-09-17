import { useMutation } from "@tanstack/react-query";

import { endInterviewSession } from "../services/interview.service";

export const useEndInterview = () => {
  return useMutation({
    mutationFn: (sessionId: string) => endInterviewSession(sessionId),
  });
};
