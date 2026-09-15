import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadAndParseResume } from "../services/resume.service";

export const useUploadAndParseResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      templateId,
    }: {
      file: File;
      templateId?: string;
    }) => uploadAndParseResume(file, templateId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
};
