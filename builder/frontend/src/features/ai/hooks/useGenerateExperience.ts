import { useMutation } from "@tanstack/react-query";

import { generateExperience } from "../services/experience.service";

export function useGenerateExperience() {
  return useMutation({
    mutationFn: ({
      company,
      position,
    }: {
      company: string;
      position: string;
    }) =>
      generateExperience(
        company,
        position
      ),
  });
}