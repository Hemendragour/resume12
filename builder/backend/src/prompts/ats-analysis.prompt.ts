export const buildATSAnalysisPrompt = (
  resume: object,
  jobDescription: string
) => `
You are an ATS expert and senior recruiter at Google.

Analyze the resume against the job description.

Return ONLY valid JSON.

Required JSON format:

{
  "atsScore": number,
  "matchedKeywords": [],
  "missingKeywords": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "optimizedSummary": "",
  "improvedExperience": []
}

Scoring criteria:

- Keyword relevance: 35%
- Experience quality: 25%
- Skills alignment: 20%
- Project relevance: 10%
- Resume completeness: 10%

Resume:

${JSON.stringify(resume)}

Job Description:

${jobDescription}
`;