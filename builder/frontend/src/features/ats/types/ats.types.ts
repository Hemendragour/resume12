// ============================================================
// ATS CATEGORY
// ============================================================

export type ATSCategoryStatus =
  | "excellent"
  | "good"
  | "needs-improvement"
  | "poor";

export type ATSScoreCategory = string;

// ============================================================
// ATS BREAKDOWN
// ============================================================

export type ATSBreakdown = Record<string, number>;

// ============================================================
// ATS CATEGORY RESULT
// ============================================================

export interface ATSCategoryResult {
  category: ATSScoreCategory;

  title: string;

  score: number;

  maxScore: number;

  percentage: number;

  status: ATSCategoryStatus;

  summary: string;

  issues: string[];

  suggestions: string[];
}

// ============================================================
// DATE CONSISTENCY
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
// ATS RECOMMENDATION
// ============================================================

export type ATSRecommendationPriority =
  | "critical"
  | "high"
  | "medium"
  | "low";

export interface ATSRecommendation {
  id?: string;

  title: string;

  description: string;

  priority: ATSRecommendationPriority;

  category: ATSScoreCategory;

  impact?: number;

  actionable?: boolean;

  evidence?: string;

  suggestedFix?: string;
}

// ============================================================
// ATS GRADE
// ============================================================

export type ATSGrade =
  | "A"
  | "B"
  | "C"
  | "D"
  | "F";

// ============================================================
// FINAL ATS RESULT
// ============================================================

export interface ATSResult {
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
// ATS ANALYSIS REQUEST
// ============================================================

export interface ATSAnalyzeRequest {
  resumeId: string;

  targetRole: string;

  jobDescription?: string;

  options?: ATSAnalysisOptions;
}

// ============================================================
// API RESPONSE
// ============================================================

export interface ATSAnalyzeResponse {
  success: boolean;

  message?: string;

  data: {
    result: ATSResult;

    analysis: unknown;
  };
}

// ============================================================
// LATEST ATS RESPONSE
// ============================================================

export interface ATSLatestResponse {
  success: boolean;

  data: ATSResult;
}

// ============================================================
// ATS HISTORY RESPONSE
// ============================================================

export interface ATSHistoryResponse {
  success: boolean;

  count: number;

  data: ATSResult[];
}