import { z } from "zod";

export const analyzeResumeSchema = z.object({
  resumeId: z.string(),

  jobDescription: z
    .string()
    .min(50, "Job description is too short"),
});