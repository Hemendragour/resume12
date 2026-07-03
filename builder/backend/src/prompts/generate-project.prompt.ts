export const buildProjectPrompt = (
  projectName: string,
  technologies: string[]
) => `
You are an expert resume writer.

Generate an ATS-friendly project description.

Rules:
- Maximum 3 bullet points
- Include impact and functionality
- Mention technologies naturally
- Focus on business value

Project Name:
${projectName}

Technologies:
${technologies.join(", ")}

Return only bullet points.
`;