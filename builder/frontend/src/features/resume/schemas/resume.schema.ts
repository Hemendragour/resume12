import { z } from "zod";

export const createResumeSchema = z.object({

  title: z.string().min(3),

  targetRole: z.string().min(2),

  templateId: z.string(),

});

export type CreateResumeForm = z.infer<
  typeof createResumeSchema
>;