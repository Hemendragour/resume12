export const SKILL_SUGGESTIONS: Record<string, string[]> = {
  language: [
    "Java",
    "JavaScript",
    "TypeScript",
    "Python",
    "C++",
    "C",
    "C#",
    "Go",
    "PHP",
    "Ruby",
    "Kotlin",
    "Swift",
  ],
  framework: [
    "React",
    "Next.js",
    "Angular",
    "Vue.js",
    "Express.js",
    "NestJS",
    "Django",
    "Flask",
    "Spring Boot",
    "Laravel",
  ],
  database: [
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "Redis",
    "Firebase",
    "Oracle",
    "DynamoDB",
  ],
  tools: [
    "Git",
    "GitHub",
    "Docker",
    "Postman",
    "VS Code",
    "Jira",
    "Figma",
    "Kubernetes",
    "Jenkins",
  ],
  cloud: [
    "AWS",
    "Azure",
    "GCP",
    "Vercel",
    "Netlify",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ],
};

const CATEGORY_KEYWORDS: [string, keyof typeof SKILL_SUGGESTIONS][] = [
  ["language", "language"],
  ["programming", "language"],
  ["framework", "framework"],
  ["library", "framework"],
  ["database", "database"],
  ["db", "database"],
  ["tool", "tools"],
  ["cloud", "cloud"],
  ["devops", "cloud"],
];

/** Picks a suggestion list based on what the user typed as the category name. */
export function getSkillSuggestions(categoryTitle: string): string[] {
  const normalized = categoryTitle.trim().toLowerCase();
  for (const [keyword, key] of CATEGORY_KEYWORDS) {
    if (normalized.includes(keyword)) return SKILL_SUGGESTIONS[key];
  }
  return [];
}

/** Flat combined list — used for Technologies fields (Projects, Experience). */
export const ALL_TECHNOLOGY_SUGGESTIONS: string[] = Array.from(
  new Set([
    ...SKILL_SUGGESTIONS.language,
    ...SKILL_SUGGESTIONS.framework,
    ...SKILL_SUGGESTIONS.database,
    ...SKILL_SUGGESTIONS.tools,
    ...SKILL_SUGGESTIONS.cloud,
  ]),
);

export const SKILL_CATEGORY_PRESETS = [
  "Languages",
  "Frameworks",
  "Databases",
  "Tools",
  "Cloud & DevOps",
];
