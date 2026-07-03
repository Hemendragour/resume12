import type { Resume } from "../types/resume.types";

export interface CompletionResult {
  percentage: number;
  completed: number;
  total: number;
  missing: string[];
}

export function calculateCompletion(
  resume: Resume
): CompletionResult {
  const checks = [
    {
      title: "Personal Information",
      value:
        !!resume.personalInfo.fullName &&
        !!resume.personalInfo.email &&
        !!resume.personalInfo.phone,
    },
    {
      title: "Summary",
      value: !!resume.summary.trim(),
    },
    {
      title: "Skills",
      value: resume.skills.length > 0,
    },
    {
      title: "Experience",
      value: resume.experience.length > 0,
    },
    {
      title: "Education",
      value: resume.education.length > 0,
    },
    {
      title: "Projects",
      value: resume.projects.length > 0,
    },
    {
      title: "Languages",
      value: resume.languages.length > 0,
    },
    {
      title: "Certifications",
      value: resume.certifications.length > 0,
    },
    {
      title: "LinkedIn",
      value: !!resume.personalInfo.linkedIn,
    },
    {
      title: "GitHub / Portfolio",
      value:
        !!resume.personalInfo.github ||
        !!resume.personalInfo.portfolio,
    },
  ];

  const completed =
    checks.filter(
      (item) => item.value
    ).length;

  return {
    percentage: Math.round(
      (completed / checks.length) * 100
    ),
    completed,
    total: checks.length,
    missing: checks
      .filter((c) => !c.value)
      .map((c) => c.title),
  };
}