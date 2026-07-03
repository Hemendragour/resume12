export const buildSkillsPrompt = (
  resume: any
) => `
You are an expert technical recruiter.

Suggest the best ATS-friendly technical skills.

Target Role:
${resume.targetRole}

Current Title:
${resume.personalInfo?.title}

Existing Skills:
${resume.skills?.join(", ")}

Experience:
${resume.experience
  ?.map(
    (item: any) =>
      `${item.position} at ${item.company}`
  )
  .join(", ")}

Projects:
${resume.projects
  ?.map(
    (project: any) =>
      `${project.title}`
  )
  .join(", ")}

Rules

- Return ONLY JSON array

Example

[
"React",
"TypeScript",
"Redux Toolkit",
"Node.js",
"Express",
"MongoDB",
"Docker",
"AWS"
]
`;