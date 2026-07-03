import type { Resume } from "../../resume/types/resume.types";

export interface ATSResult {
  score: number;
  missingSections: string[];
  suggestions: string[];
}

export function calculateATSScore(
  resume: Resume
): ATSResult {
  let score = 0;

  const missingSections: string[] = [];
  const suggestions: string[] = [];

  if (
    resume.personalInfo.fullName &&
    resume.personalInfo.email &&
    resume.personalInfo.phone
  ) {
    score += 20;
  } else {
    missingSections.push("Personal Info");
    suggestions.push("Complete personal information.");
  }

  if (resume.summary.trim()) {
    score += 10;
  } else {
    missingSections.push("Summary");
    suggestions.push("Add professional summary.");
  }

  if (resume.skills.length >= 5) {
    score += 15;
  } else {
    missingSections.push("Skills");
    suggestions.push("Add at least 5 skills.");
  }

  if (resume.experience.length) {
    score += 20;
  } else {
    missingSections.push("Experience");
    suggestions.push("Add work experience.");
  }

  if (resume.education.length) {
    score += 10;
  } else {
    missingSections.push("Education");
    suggestions.push("Add education.");
  }

  if (resume.projects.length) {
    score += 10;
  } else {
    missingSections.push("Projects");
    suggestions.push("Add projects.");
  }

  if (resume.certifications.length) {
    score += 5;
  }

  if (resume.languages.length) {
    score += 5;
  }

  if (resume.personalInfo.linkedIn) {
    score += 3;
  }

  if (
    resume.personalInfo.github ||
    resume.personalInfo.portfolio
  ) {
    score += 2;
  }

  return {
    score,
    missingSections,
    suggestions,
  };
}