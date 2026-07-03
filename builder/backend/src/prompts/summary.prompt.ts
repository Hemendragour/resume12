export const buildSummaryPrompt = (
  resume: any
) => `
You are an expert resume writer and ATS optimization specialist.

Generate a professional, ATS-friendly resume summary.

Resume Information

Name:
${resume.personalInfo?.fullName ?? ""}

Target Role:
${resume.targetRole ?? ""}

Current Title:
${resume.personalInfo?.title ?? ""}

Summary:
${resume.summary ?? ""}

Skills:
${resume.skills?.join(", ") ?? ""}

Experience:
${
  resume.experience
    ?.map(
      (exp: any) =>
        `
Company: ${exp.company}
Position: ${exp.position}
Responsibilities:
${exp.responsibilities?.join(", ")}
`
    )
    .join("\n") ?? ""
}

Education:
${
  resume.education
    ?.map(
      (edu: any) =>
        `
${edu.degree}
${edu.fieldOfStudy}
${edu.institution}
`
    )
    .join("\n") ?? ""
}

Projects:
${
  resume.projects
    ?.map(
      (project: any) =>
        `
${project.title}

${project.description}

Technologies:
${project.technologies?.join(", ")}
`
    )
    .join("\n") ?? ""
}

Instructions

- Write an ATS-friendly professional summary.
- Maximum 80 words.
- Use strong action verbs.
- Highlight the candidate's strengths.
- Mention technical skills naturally.
- Keep it concise.
- Do not invent experience that is not present.
- Return ONLY the summary text.
`;