import { useMutation } from "@tanstack/react-query";
import { generateCoursework } from "../services/coursework.service";

export function useGenerateCoursework() {
  return useMutation({
    mutationFn: ({
      degree,
      fieldOfStudy,
      targetRole,
    }: {
      degree: string;
      fieldOfStudy: string;
      targetRole?: string;
    }) => generateCoursework(degree, fieldOfStudy, targetRole),
  });
}