 


import { generateJSON } from "../../providers/gemini.provider";
import { buildATSAnalysisPrompt } from "../../prompts/ats-analysis.prompt";

export interface ATSResult {
  atsScore: number;

  matchedKeywords: string[];
  missingKeywords: string[];

  strengths: string[];
  weaknesses: string[];

  suggestions: string[];

  optimizedSummary: string;

  improvedExperience: string[];
}

export const analyzeResume = async (
  resume: object,
  jobDescription: string
): Promise<ATSResult> => {
  const prompt = buildATSAnalysisPrompt(
    resume,
    jobDescription
  );

  return generateJSON<ATSResult>(prompt);
};