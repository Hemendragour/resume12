import { useMutation } from "@tanstack/react-query";
import { generateInternshipDescription } from "../services/internship.service";

interface InternshipContext {
  whatDone?: string;
  toolsUsed?: string;
  mentorTeam?: string;
  result?: string;
}

export function useGenerateInternship() {
  return useMutation({
    mutationFn: ({
      company,
      role,
      context,
    }: {
      company: string;
      role: string;
      context?: InternshipContext;
    }) => generateInternshipDescription(company, role, context),
  });
}