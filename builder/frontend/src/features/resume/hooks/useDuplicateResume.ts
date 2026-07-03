import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  duplicateResume,
} from "../services/resume.service";

export const useDuplicateResume =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        duplicateResume,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "resumes",
          ],
        });
      },
    });
  };