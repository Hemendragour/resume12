import type { CoverLetterTemplate } from "../types/coverLetter.types";
import { CoverLetterTemplates } from "../types/coverLetter.types";

export interface CoverLetterTemplateOption {
  id: CoverLetterTemplate;
  name: string;
  description: string;
  color: string;
}

/**
 * Cover letter templates.
 *
 * Only one template for now (Classic Formal, modelled on a clean
 * LaTeX-style business letter). Add more entries here the same way
 * new resume templates are added to features/resume/config/templates.ts.
 */
export const coverLetterTemplates: CoverLetterTemplateOption[] = [
  {
    id: CoverLetterTemplates.CLASSIC_FORMAL,
    name: "Classic Formal",
    description:
      "Clean, ATS-friendly business letter layout with a bold header and accent rule",
    color: "bg-card",
  },
];
