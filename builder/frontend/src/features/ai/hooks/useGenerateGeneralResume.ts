import { useMutation } from "@tanstack/react-query";
import {
  generateFullResume,
  type QuickGenerateFormData,
} from "../services/generate-general-resume.service";

export function useGenerateFullResume() {
  return useMutation({
    mutationFn: (formData: QuickGenerateFormData) =>
      generateFullResume(formData),
  });
}
