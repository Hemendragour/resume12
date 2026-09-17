import { useMutation } from "@tanstack/react-query";

import { submitInterviewAnswer } from "../services/interview.service";

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: submitInterviewAnswer,
  });
};
