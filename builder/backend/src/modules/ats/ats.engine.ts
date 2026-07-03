interface ResumeData {
  personalInfo: {
    fullName?: string;
    email?: string;
    phone?: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };

  summary?: string;

  skills?: string[];

  experience?: unknown[];

  education?: unknown[];

  projects?: unknown[];

  certifications?: unknown[];

  languages?: unknown[];
}

export interface ATSAnalysisResult {
  score: number;

  missingSections: string[];

  suggestions: string[];
}

export function calculateATSScore(
  resume: ResumeData
): ATSAnalysisResult {
  let score = 0;

  const missingSections: string[] = [];

  const suggestions: string[] = [];

  // Personal Info (20)

  if (
    resume.personalInfo?.fullName &&
    resume.personalInfo?.email &&
    resume.personalInfo?.phone
  ) {
    score += 20;
  } else {
    missingSections.push("Personal Information");

    suggestions.push(
      "Complete your personal information."
    );
  }

  // Summary (10)

  if (resume.summary?.trim()) {
    score += 10;
  } else {
    missingSections.push("Professional Summary");

    suggestions.push(
      "Add a professional summary."
    );
  }

  // Skills (15)

  if (
    resume.skills &&
    resume.skills.length >= 5
  ) {
    score += 15;
  } else {
    missingSections.push("Skills");

    suggestions.push(
      "Add at least 5 relevant skills."
    );
  }

  // Experience (20)

  if (
    resume.experience &&
    resume.experience.length > 0
  ) {
    score += 20;
  } else {
    missingSections.push("Experience");

    suggestions.push(
      "Add work experience."
    );
  }

  // Education (10)

  if (
    resume.education &&
    resume.education.length > 0
  ) {
    score += 10;
  } else {
    missingSections.push("Education");

    suggestions.push(
      "Add your education."
    );
  }

  // Projects (10)

  if (
    resume.projects &&
    resume.projects.length > 0
  ) {
    score += 10;
  } else {
    missingSections.push("Projects");

    suggestions.push(
      "Add at least one project."
    );
  }

  // Certifications (5)

  if (
    resume.certifications &&
    resume.certifications.length > 0
  ) {
    score += 5;
  } else {
    suggestions.push(
      "Add certifications."
    );
  }

  // Languages (5)

  if (
    resume.languages &&
    resume.languages.length > 0
  ) {
    score += 5;
  }

  // LinkedIn (3)

  if (
    resume.personalInfo?.linkedIn
  ) {
    score += 3;
  } else {
    suggestions.push(
      "Add LinkedIn profile."
    );
  }

  // GitHub / Portfolio (2)

  if (
    resume.personalInfo?.github ||
    resume.personalInfo?.portfolio
  ) {
    score += 2;
  } else {
    suggestions.push(
      "Add GitHub or Portfolio."
    );
  }

  return {
    score,
    missingSections,
    suggestions,
  };
}