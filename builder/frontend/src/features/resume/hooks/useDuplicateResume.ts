import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  duplicateResume,
} from "../services/resume.service";

export const useDuplicateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      templateId,
    }: {
      id: string;
      templateId?: string;
    }) => duplicateResume(id, templateId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
};
