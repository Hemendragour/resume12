export const buildGenerateExperiencePrompt = (
  company: string,
  position: string
) => `
You are an expert resume writer.

Generate 6 professional resume bullet points.

Company:
${company}

Position:
${position}

Rules:

- ATS Friendly
- Action verbs
- Maximum 25 words each
- Professional language
- Do not number bullets
- Return JSON array only

Example:

[
"Developed scalable React applications...",
"Collaborated with designers..."
]
`;