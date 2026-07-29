import { useMutation } from "@tanstack/react-query";
import { generateExperience } from "../services/experience.service";

interface ExperienceContext {
  workedOn?: string;
  technologies?: string;
  scope?: string;
  impact?: string;
}

export function useGenerateExperience() {
  return useMutation({
    mutationFn: ({
      company,
      position,
      context,
    }: {
      company: string;
      position: string;
      context?: ExperienceContext;
    }) => generateExperience(company, position, context),
  });
}