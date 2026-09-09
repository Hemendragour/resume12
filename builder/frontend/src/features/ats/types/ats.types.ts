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
  order?: number;
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
// ATS FINDING & SECTION DEEP DIVE
// ============================================================

export type ATSFindingVerdict = "excellent" | "needs-improvement";

export interface ATSFinding {
  id: string;
  targetText: string;
  verdict: ATSFindingVerdict;
  problems: string[];
  whyItMatters: string;
  suggestedFix: string;
  needsQuantification: boolean;
  quantificationExamples: string[];
  jdAlignmentTip?: string;
}

export type ATSSectionDeepDivePriority =
  | "critical"
  | "high"
  | "medium"
  | "low";

export interface ATSSectionDeepDive {
  sectionId: ATSScoreCategory;
  title: string;
  percentage: number;
  priority: ATSSectionDeepDivePriority;
  isFullyOptimized: boolean;
  findings: ATSFinding[];
  skillsBreakdown?: {
    requiredPresent: string[];
    requiredMissing: ATSFinding[];
    goodToHave: ATSFinding[];
  };
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
// ATS GRADE & MODE
// ============================================================

export type ATSGrade =
  | "A"
  | "B"
  | "C"
  | "D"
  | "F";

export type ATSAnalysisMode = "job-description" | "general";

// ============================================================
// FINAL ATS RESULT
// ============================================================

export interface ATSResult {
  resumeId: string;
  mode: ATSAnalysisMode;
  targetRole: string;
  hasJobDescription: boolean;
  atsScore: number;
  grade: ATSGrade;
  breakdown: ATSBreakdown;
  categories: ATSCategoryResult[];
  matchedKeywords: string[];
  missingKeywords: string[];
  sectionDeepDive: ATSSectionDeepDive[];
  dateConsistency?: ATSDateConsistencyAnalysis;
  strengths: string[];
  weaknesses: string[];
  recommendations?: ATSRecommendation[];
  optimizedSummary?: string;
  improvedExperience?: string[];
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