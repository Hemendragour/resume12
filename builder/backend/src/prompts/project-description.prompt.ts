export const buildProjectDescriptionPrompt = (
  projectName: string,
  technologies: string[]
) => `
You are an expert software engineer and resume writer.

Generate a professional resume project description.

Project Name:
${projectName}

Tech Stack:
${technologies.join(", ")}

Instructions

- ATS Friendly
- Around 80–120 words
- Mention scalability, performance and best practices naturally.
- Mention technologies only when appropriate.
- Do not exaggerate.
- Return ONLY the description.
`;