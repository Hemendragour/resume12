import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  renameResume,
} from "../services/resume.service";

export const useRenameResume =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        title,
      }: {
        id: string;
        title: string;
      }) =>
        renameResume(
          id,
          title
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "resumes",
          ],
        });
      },
    });
  };