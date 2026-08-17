/**
 * ============================================================
 * THRONE8 ATS ENGINE
 * ats.types.ts
 * ============================================================
 *
 * RESPONSIBILITY
 * ------------------------------------------------------------
 * - ATS types
 * - ATS configuration
 * - ATS constants
 * - ATS contracts
 *
 * NOT RESPONSIBLE FOR
 * ------------------------------------------------------------
 * - Database operations
 * - Gemini/API calls
 * - Express controllers
 * - Scoring implementation
 *
 * IMPORTANT ARCHITECTURE RULE
 * ------------------------------------------------------------
 * ATS_SCORE_CATEGORIES is the single source of truth for
 * category IDs, display names, order and maximum scores.
 * ============================================================
 */

// ============================================================
// ATS CATEGORY DEFINITION
// ============================================================

export interface ATSScoreCategoryDefinition {
  /**
   * Machine-readable category identifier.
   *
   * Example:
   * "contact"
   * "skills"
   * "quantifiedResults"
   */
  id: string;

  /**
   * User-facing category name.
   */
  title: string;

  /**
   * Explanation shown in UI / reports.
   */
  description: string;

  /**
   * Maximum points available for this category.
   */
  maxScore: number;

  /**
   * Whether this category participates in the current
   * ATS scoring configuration.
   */
  enabled: boolean;

  /**
   * Evaluation / display order.
   */
  order: number;
}

// ============================================================
// DEFAULT ATS SCORE CATEGORIES
// ============================================================

/**
 * IMPORTANT:
 *
 * This configuration is intentionally extensible.
 *
 * We can later add:
 *
 * - semanticRelevance
 * - seniorityAlignment
 * - industryRelevance
 * - careerProgression
 * - redundancy
 * - grammar
 * - spelling
 * - linkValidation
 * - dateConsistency
 * - parseability
 * - contentDensity
 * - keywordStuffing
 * - jdRequirements
 * - etc.
 *
 * without redesigning the ATS engine.
 */
export const ATS_SCORE_CATEGORIES = [
  {
    id: "contact",
    title: "Contact & Identity",
    description:
      "Checks whether essential professional contact information is present and usable.",
    maxScore: 10,
    enabled: true,
    order: 1,
  },

  {
    id: "sections",
    title: "Section Completeness",
    description:
      "Evaluates the presence, completeness and organization of important resume sections.",
    maxScore: 15,
    enabled: true,
    order: 2,
  },

  {
    id: "skills",
    title: "Skills",
    description:
      "Evaluates the quality, organization and relevance of listed skills.",
    maxScore: 15,
    enabled: true,
    order: 3,
  },

  {
    id: "keywords",
    title: "Keyword Relevance",
    description:
      "Evaluates important role-related keywords and their usage throughout the resume.",
    maxScore: 20,
    enabled: true,
    order: 4,
  },

  {
    id: "experience",
    title: "Experience Quality",
    description:
      "Evaluates responsibilities, achievements, relevance and quality of professional experience.",
    maxScore: 15,
    enabled: true,
    order: 5,
  },

  {
    id: "actionVerbs",
    title: "Action Verbs",
    description:
      "Evaluates the use of strong, relevant and varied action verbs.",
    maxScore: 10,
    enabled: true,
    order: 6,
  },

  {
    id: "quantifiedResults",
    title: "Quantified Impact",
    description:
      "Evaluates measurable results, metrics and evidence of professional impact.",
    maxScore: 5,
    enabled: true,
    order: 7,
  },

  {
    id: "formatting",
    title: "ATS Formatting",
    description:
      "Evaluates formatting patterns that may negatively affect automated resume parsing.",
    maxScore: 10,
    enabled: true,
    order: 8,
  },
] as const satisfies readonly ATSScoreCategoryDefinition[];

// ============================================================
// KNOWN CATEGORY TYPE
// ============================================================

/**
 * Gives TypeScript autocomplete for the currently configured
 * categories.
 *
 * Future custom category strings are still allowed through
 * ATSScoreCategory below.
 */
export type KnownATSCategory =
  (typeof ATS_SCORE_CATEGORIES)[number]["id"];

/**
 * Extensible category type.
 *
 * Known categories receive autocomplete while arbitrary future
 * category IDs remain technically valid.
 */
export type ATSScoreCategory =
  | KnownATSCategory
  | (string & {});

// ============================================================
// ATS BREAKDOWN
// ============================================================

/**
 * Dynamic because ATS categories are configuration-driven.
 *
 * Example:
 *
 * {
 *   contact: 9,
 *   sections: 13,
 *   skills: 14,
 *   keywords: 17,
 *   ...
 * }
 */
export type ATSBreakdown = Record<string, number>;

// ============================================================
// ATS CATEGORY STATUS
// ============================================================

export type ATSCategoryStatus =
  | "excellent"
  | "good"
  | "needs-improvement"
  | "poor";

// ============================================================
// ATS CATEGORY RESULT
// ============================================================

export interface ATSCategoryResult {
  category: ATSScoreCategory;

  title: string;

  score: number;

  /**
   * This is resolved from ATS_SCORE_CATEGORIES.
   *
   * It is included in the final result for convenient API/UI
   * consumption, but the scorer must NOT independently invent
   * this value.
   */
  maxScore: number;

  percentage: number;

  status: ATSCategoryStatus;

  summary: string;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// CONTACT ANALYSIS
// ============================================================

export interface ATSContactAnalysis {
  fullName: boolean;

  email: boolean;

  phone: boolean;

  linkedIn: boolean;

  github: boolean;

  portfolio: boolean;

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// SECTION ANALYSIS
// ============================================================

export interface ATSSectionAnalysis {
  present: string[];

  missing: string[];

  disabled: string[];

  empty: string[];

  duplicate: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// SKILLS ANALYSIS
// ============================================================

export interface ATSSkillsAnalysis {
  totalSkills: number;

  categories: number;

  skills: string[];

  duplicateSkills: string[];

  suspiciousSkills: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// KEYWORD ANALYSIS
// ============================================================

export interface ATSKeywordAnalysis {
  keywords: string[];

  matchedKeywords: string[];

  missingKeywords: string[];

  keywordFrequency: Record<string, number>;

  keywordCoverage: number;

  /**
   * Approximate content keyword density.
   *
   * Optional because it may not be calculated in every mode.
   */
  keywordDensity?: number;

  /**
   * Indicates potentially unnatural keyword repetition.
   */
  stuffingDetected?: boolean;

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// SEMANTIC RELEVANCE ANALYSIS
// ============================================================

export interface ATSSemanticRelevanceAnalysis {
  matchedConcepts: string[];

  missingConcepts: string[];

  relatedConcepts: string[];

  irrelevantContent: string[];

  relevanceScore: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// EXPERIENCE ANALYSIS
// ============================================================

export interface ATSExperienceAnalysis {
  experienceCount: number;

  internshipCount: number;

  totalBullets: number;

  responsibilityBullets: number;

  achievementBullets: number;

  quantifiedBullets: number;

  weakBullets: string[];

  strongBullets: string[];

  repetitiveBullets: string[];

  relevanceIssues: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// ACTION VERB ANALYSIS
// ============================================================

export interface ATSActionVerbAnalysis {
  totalBullets: number;

  bulletsWithActionVerbs: number;

  actionVerbCoverage: number;

  detectedVerbs: string[];

  weakOpenings: string[];

  repeatedVerbs: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// QUANTIFIED RESULTS ANALYSIS
// ============================================================

export interface ATSQuantifiedResultAnalysis {
  totalBullets: number;

  quantifiedBullets: number;

  percentages: string[];

  numbers: string[];

  currencies: string[];

  timeMetrics: string[];

  performanceMetrics: string[];

  metricCoverage: number;

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// ACHIEVEMENT ANALYSIS
// ============================================================

export interface ATSAchievementAnalysis {
  totalAchievements: number;

  quantifiedAchievements: number;

  impactStatements: number;

  weakAchievements: string[];

  strongAchievements: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// PROJECT ANALYSIS
// ============================================================

export interface ATSProjectAnalysis {
  projectCount: number;

  projectsWithTechnologies: number;

  projectsWithDescription: number;

  projectsWithLinks: number;

  projectsWithImpact: number;

  projectsWithMetrics: number;

  weakProjects: string[];

  strongProjects: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// EDUCATION ANALYSIS
// ============================================================

export interface ATSEducationAnalysis {
  educationCount: number;

  completeEntries: number;

  incompleteEntries: number;

  hasDegree: boolean;

  hasInstitution: boolean;

  hasFieldOfStudy: boolean;

  hasDates: boolean;

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// FORMATTING ANALYSIS
// ============================================================

export interface ATSFormattingAnalysis {
  hasContactInfo: boolean;

  hasStandardSections: boolean;

  hasUnusualSectionNames: boolean;

  hasEmptySections: boolean;

  hasExcessiveLinks: boolean;

  hasSuspiciousCharacters: boolean;

  hasPotentialParserIssues: boolean;

  hasPotentialColumnRisk?: boolean;

  hasPotentialTableRisk?: boolean;

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// PARSEABILITY ANALYSIS
// ============================================================

export interface ATSParseabilityAnalysis {
  readableText: boolean;

  contactExtractionPossible: boolean;

  sectionExtractionPossible: boolean;

  dateExtractionPossible: boolean;

  skillExtractionPossible: boolean;

  linkExtractionPossible: boolean;

  unusualStructureDetected: boolean;

  parserRisks: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// DATE CONSISTENCY ANALYSIS
// ============================================================

export interface ATSDateConsistencyAnalysis {
  invalidDates: string[];

  overlappingDates: string[];

  reversedDateRanges: string[];

  inconsistentDateFormats: string[];

  missingDates: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// CONTENT QUALITY ANALYSIS
// ============================================================

export interface ATSContentQualityAnalysis {
  weakStatements: string[];

  vagueStatements: string[];

  repetitiveStatements: string[];

  grammarIssues: string[];

  spellingIssues: string[];

  unnecessaryContent: string[];

  strongStatements: string[];

  score: number;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// SENIORITY / ROLE ALIGNMENT
// ============================================================

export interface ATSSeniorityAlignmentAnalysis {
  targetRole?: string;

  detectedSeniority?: string;

  experienceLevel?: string;

  alignmentScore: number;

  mismatches: string[];

  issues: string[];

  suggestions: string[];
}

// ============================================================
// RECOMMENDATION
// ============================================================

export interface ATSRecommendation {
  id?: string;

  title: string;

  description: string;

  priority: "critical" | "high" | "medium" | "low";

  category: ATSScoreCategory;

  /**
   * Estimated score improvement.
   */
  impact?: number;

  actionable?: boolean;

  /**
   * Resume evidence supporting the recommendation.
   */
  evidence?: string;

  /**
   * Suggested correction.
   */
  suggestedFix?: string;
}

// ============================================================
// RULE-BASED ATS ANALYSIS
// ============================================================

export interface ATSRuleAnalysis {
  overallScore: number;

  breakdown: ATSBreakdown;

  categories: ATSCategoryResult[];

  contact: ATSContactAnalysis;

  sections: ATSSectionAnalysis;

  skills: ATSSkillsAnalysis;

  keywords: ATSKeywordAnalysis;

  semanticRelevance?: ATSSemanticRelevanceAnalysis;

  experience: ATSExperienceAnalysis;

  actionVerbs: ATSActionVerbAnalysis;

  quantifiedResults: ATSQuantifiedResultAnalysis;

  achievements?: ATSAchievementAnalysis;

  projects?: ATSProjectAnalysis;

  education?: ATSEducationAnalysis;

  formatting: ATSFormattingAnalysis;

  parseability?: ATSParseabilityAnalysis;

  dateConsistency?: ATSDateConsistencyAnalysis;

  contentQuality?: ATSContentQualityAnalysis;

  seniorityAlignment?: ATSSeniorityAlignmentAnalysis;

  strengths: string[];

  weaknesses: string[];

  recommendations: ATSRecommendation[];
}

// ============================================================
// AI ANALYSIS RESULT
// ============================================================

export interface ATSAIAnalysis {
  strengths: string[];

  weaknesses: string[];

  matchedKeywords: string[];

  missingKeywords: string[];

  recommendations: ATSRecommendation[];

  optimizedSummary: string;

  improvedExperience: string[];
}

// ============================================================
// FINAL ATS RESULT
// ============================================================

export interface ATSResult {
  /**
   * API/Frontend-safe identifier.
   *
   * Keep Mongoose Types.ObjectId out of shared ATS DTOs.
   */
  resumeId: string;

  atsScore: number;

  grade: ATSGrade;

  breakdown: ATSBreakdown;

  categories: ATSCategoryResult[];

  matchedKeywords: string[];

  missingKeywords: string[];
  dateConsistency?: ATSDateConsistencyAnalysis;

  strengths: string[];

  weaknesses: string[];

  recommendations: ATSRecommendation[];

  optimizedSummary: string;

  improvedExperience: string[];

  analyzedAt: string;
}

// ============================================================
// ATS GRADE
// ============================================================

export type ATSGrade = "A" | "B" | "C" | "D" | "F";

// ============================================================
// ATS ANALYSIS REQUEST
// ============================================================

export interface ATSAnalyzeRequest {
  resumeId: string;
  targetRole: string;
  jobDescription?: string;
  options?: ATSAnalysisOptions;
}

// ============================================================
// ATS ANALYSIS OPTIONS
// ============================================================

export interface ATSAnalysisOptions {
  includeAIAnalysis?: boolean;

  includeOptimizedSummary?: boolean;

  includeImprovedExperience?: boolean;

  includeKeywordAnalysis?: boolean;

  includeSemanticAnalysis?: boolean;

  includeParseabilityAnalysis?: boolean;

  includeContentQualityAnalysis?: boolean;

  includeDateConsistencyAnalysis?: boolean;

  includeSeniorityAnalysis?: boolean;
}

// ============================================================
// ATS TOTAL SCORE
// ============================================================

/**
 * Single source of truth for the current maximum ATS score.
 */
export const ATS_TOTAL_SCORE = ATS_SCORE_CATEGORIES.reduce(
  (total, category) => {
    return category.enabled
      ? total + category.maxScore
      : total;
  },
  0
);

// ============================================================
// CATEGORY LOOKUP
// ============================================================

/**
 * Returns a category definition by ID.
 *
 * The scorer should use this instead of hard-coding max scores.
 */
export const getATSCategory = (
  categoryId: string
): ATSScoreCategoryDefinition | undefined => {
  return ATS_SCORE_CATEGORIES.find(
    (category) => category.id === categoryId
  );
};

// ============================================================
// SCORE HELPERS
// ============================================================

/**
 * Returns the configured maximum score for a category.
 */
export const getATSCategoryMaxScore = (
  categoryId: string
): number => {
  return getATSCategory(categoryId)?.maxScore ?? 0;
};

/**
 * Checks whether a category is currently enabled.
 */
export const isATSCategoryEnabled = (
  categoryId: string
): boolean => {
  return (
    getATSCategory(categoryId)?.enabled ?? false
  );
};

// ============================================================
// GRADE THRESHOLDS
// ============================================================

export const ATS_GRADE_THRESHOLDS = {
  A: 90,
  B: 80,
  C: 70,
  D: 60,
  F: 0,
} as const;

// ============================================================
// STANDARD RESUME SECTIONS
// ============================================================

export const ATS_STANDARD_SECTIONS = [
  "summary",
  "experience",
  "internships",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
  "awards",
  "achievements",
] as const;

// ============================================================
// ACTION VERBS
// ============================================================

export const ATS_ACTION_VERBS = [
  "achieved",
  "administered",
  "analyzed",
  "architected",
  "automated",
  "built",
  "collaborated",
  "configured",
  "created",
  "debugged",
  "delivered",
  "deployed",
  "designed",
  "developed",
  "engineered",
  "implemented",
  "improved",
  "increased",
  "integrated",
  "launched",
  "led",
  "maintained",
  "managed",
  "migrated",
  "monitored",
  "optimized",
  "reduced",
  "refactored",
  "resolved",
  "scaled",
  "streamlined",
  "tested",
  "transformed",
] as const;

// ============================================================
// WEAK BULLET PATTERNS
// ============================================================

export const ATS_WEAK_BULLET_PATTERNS = [
  /^worked on\b/i,
  /^responsible for\b/i,
  /^helped\b/i,
  /^involved in\b/i,
  /^participated in\b/i,
  /^handled\b/i,
  /^did\b/i,
  /^made\b/i,
  /^used\b/i,
  /^worked with\b/i,
] as const;

// ============================================================
// METRIC PATTERNS
// ============================================================

/**
 * IMPORTANT:
 *
 * These patterns intentionally avoid treating normal years such
 * as 2023 or 2026 as professional achievement metrics.
 *
 * Do NOT use .test() repeatedly on these global regexes.
 * Prefer String.match(), String.matchAll() or create a fresh
 * regex when necessary.
 */
export const ATS_METRIC_PATTERNS = {
  percentage:
    /\b\d+(?:\.\d+)?\s?%/gi,

  currency:
    /(?:₹|rs\.?|inr|\$|usd|€|eur|£|gbp)\s?\d+(?:[,.]\d+)?/gi,

  time:
    /\b\d+(?:\.\d+)?\s?(?:days?|weeks?|months?|years?|hours?|mins?|minutes?)\b/gi,

  /**
   * Numbers associated with measurable impact.
   *
   * Examples:
   * 500+ users
   * 30% faster
   * 20 requests/sec
   * 5 engineers
   *
   * Standalone years such as 2023 are intentionally excluded.
   */
  impactNumber:
    /\b\d+(?:\.\d+)?\+?\s?(?:users?|customers?|clients?|requests?|records?|items?|projects?|engineers?|developers?|members?|employees?|teams?|days?|weeks?|months?|years?|hours?|minutes?|seconds?|ms|x|times?)\b/gi,
} as const;

// ============================================================
// COMMON DATE / YEAR PATTERN
// ============================================================

export const ATS_YEAR_PATTERN =
  /\b(?:19|20)\d{2}\b/g;

// ============================================================
// URL PATTERN
// ============================================================

export const ATS_URL_PATTERN =
  /https?:\/\/[^\s]+/gi;

// ============================================================
// EMAIL PATTERN
// ============================================================

export const ATS_EMAIL_PATTERN =
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

// ============================================================
// PHONE PATTERN
// ============================================================

export const ATS_PHONE_PATTERN =
  /(?:\+?\d[\d\s().-]{7,}\d)/g;

// ============================================================
// SCORE NORMALIZATION
// ============================================================

/**
 * Converts any raw score into a valid range.
 */
export const clampATSScore = (
  score: number,
  min = 0,
  max = 100
): number => {
  if (!Number.isFinite(score)) {
    return min;
  }

  return Math.min(
    Math.max(score, min),
    max
  );
};

// ============================================================
// PERCENTAGE CALCULATION
// ============================================================

export const calculateATSPercentage = (
  score: number,
  maxScore: number
): number => {
  if (
    !Number.isFinite(score) ||
    !Number.isFinite(maxScore) ||
    maxScore <= 0
  ) {
    return 0;
  }

  return Number(
    ((score / maxScore) * 100).toFixed(2)
  );
};

// ============================================================
// ATS STATUS
// ============================================================

export const getATSCategoryStatus = (
  percentage: number
): ATSCategoryStatus => {
  if (percentage >= 90) {
    return "excellent";
  }

  if (percentage >= 75) {
    return "good";
  }

  if (percentage >= 50) {
    return "needs-improvement";
  }

  return "poor";
};

// ============================================================
// ATS GRADE
// ============================================================

export const getATSGrade = (
  score: number
): ATSGrade => {
  const normalizedScore = clampATSScore(
    score,
    0,
    100
  );

  if (normalizedScore >= 90) {
    return "A";
  }

  if (normalizedScore >= 80) {
    return "B";
  }

  if (normalizedScore >= 70) {
    return "C";
  }

  if (normalizedScore >= 60) {
    return "D";
  }

  return "F";
};