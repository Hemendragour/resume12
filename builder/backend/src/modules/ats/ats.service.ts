// builder/backend/src/modules/ats/ats.service.ts   




import { ResumeAnalysis } from "../../models/resume-analysis.model";
import { Resume } from "../../models/resume.model";
import { ApiError } from "../../utils/ApiError";

import {
  generateJSON,
} from "../../providers/gemini.provider";

import {
  buildATSAnalysisPrompt,
} from "../../prompts/ats-analysis.prompt";

import {
  analyzeResumeATS,
} from "./ats.scorer";

import type {
  ATSAnalyzeRequest,
  ATSAnalysisOptions,
  ATSRuleAnalysis,
  ATSAIAnalysis,
  ATSResult,
} from "./ats.types";

// ============================================================
// INTERNAL TYPES
// ============================================================

interface ATSServiceContext {
  userId: string;
  resumeId: string;
  targetRole: string;
  jobDescription?: string;
  options?: ATSAnalysisOptions;
}

// ============================================================
// RESUME CONVERSION
// ============================================================

/**
 * Convert the Mongoose Resume document into a plain object
 * before passing it to the deterministic scorer / AI layer.
 *
 * This keeps the ATS engine independent from Mongoose internals.
 */
const getResumeObject = (
  resume: any
): Record<string, unknown> => {
  if (
    resume &&
    typeof resume.toObject === "function"
  ) {
    return resume.toObject();
  }

  return resume;
};

// ============================================================
// AI RESPONSE NORMALIZATION
// ============================================================

/**
 * Gemini should return the structure defined in
 * ats-analysis.prompt.ts.
 *
 * We still normalize the response defensively because AI output
 * should never be trusted blindly.
 */
const normalizeAIAnalysis = (
  result: any
): ATSAIAnalysis => {
  const allowedCategories = [
    "contact",
    "sections",
    "skills",
    "keywords",
    "experience",
    "actionVerbs",
    "quantifiedResults",
    "formatting",
  ] as const;

  type AllowedCategory =
    (typeof allowedCategories)[number];

  const normalizeCategory = (
    category: unknown
  ): AllowedCategory => {
    if (
      typeof category !== "string"
    ) {
      return "keywords";
    }

    const normalized =
      category.trim();

    if (
      allowedCategories.includes(
        normalized as AllowedCategory
      )
    ) {
      return normalized as AllowedCategory;
    }

    return "keywords";
  };

  const normalizePriority = (
    priority: unknown
  ) => {
    if (
      priority === "critical" ||
      priority === "high" ||
      priority === "low"
    ) {
      return priority;
    }

    return "medium" as const;
  };

  const normalizeRecommendation = (
    item: any
  ) => {
    if (
      !item ||
      typeof item.description !==
        "string"
    ) {
      return null;
    }

    const description =
      item.description.trim();

    if (!description) {
      return null;
    }

    return {
      title:
        typeof item.title ===
        "string" &&
        item.title.trim()
          ? item.title.trim()
          : "ATS Recommendation",

      description,

      priority:
        normalizePriority(
          item.priority
        ),

      category:
        normalizeCategory(
          item.category
        ),

      impact:
        typeof item.impact ===
          "number" &&
        Number.isFinite(
          item.impact
        )
          ? Number(
              Math.max(
                0,
                Math.min(
                  100,
                  item.impact
                )
              ).toFixed(2)
            )
          : 0,

      actionable:
        item.actionable !==
        false,

      evidence:
        typeof item.evidence ===
        "string"
          ? item.evidence.trim()
          : "",

      suggestedFix:
        typeof item.suggestedFix ===
        "string"
          ? item.suggestedFix.trim()
          : "",
    };
  };

  // ------------------------------------------------------------
  // RECOMMENDATIONS
  // ------------------------------------------------------------

  let recommendations: any[] = [];

  if (
    Array.isArray(
      result?.suggestions
    )
  ) {
    recommendations =
      result.suggestions
        .map(
          (item: any) => {
            // New format:
            // Gemini returns recommendation objects.
            if (
              item &&
              typeof item === "object"
            ) {
              return normalizeRecommendation(
                item
              );
            }

            // Backward compatibility:
            // Older Gemini responses may
            // still return suggestion strings.
            if (
              typeof item ===
              "string"
            ) {
              const description =
                item.trim();

              if (!description) {
                return null;
              }

              return {
                title:
                  "ATS Recommendation",

                description,

                priority:
                  "medium" as const,

                category:
                  "keywords" as const,

                impact: 0,

                actionable: true,

                evidence: "",

                suggestedFix:
                  description,
              };
            }

            return null;
          }
        )
        .filter(Boolean);
  }

  // ------------------------------------------------------------
  // BACKWARD COMPATIBILITY
  // ------------------------------------------------------------

  if (
    recommendations.length === 0 &&
    Array.isArray(
      result?.recommendations
    )
  ) {
    recommendations =
      result.recommendations
        .map(
          (item: any) =>
            normalizeRecommendation(
              item
            )
        )
        .filter(Boolean);
  }

  // ------------------------------------------------------------
  // FINAL NORMALIZED RESULT
  // ------------------------------------------------------------

  return {
    strengths:
      Array.isArray(
        result?.strengths
      )
        ? result.strengths
            .filter(
              (item: unknown) =>
                typeof item ===
                "string"
            )
            .map(
              (item: string) =>
                item.trim()
            )
            .filter(Boolean)
        : [],

    weaknesses:
      Array.isArray(
        result?.weaknesses
      )
        ? result.weaknesses
            .filter(
              (item: unknown) =>
                typeof item ===
                "string"
            )
            .map(
              (item: string) =>
                item.trim()
            )
            .filter(Boolean)
        : [],

    matchedKeywords:
      Array.isArray(
        result?.matchedKeywords
      )
        ? result.matchedKeywords
            .filter(
              (item: unknown) =>
                typeof item ===
                "string"
            )
            .map(
              (item: string) =>
                item.trim()
            )
            .filter(Boolean)
        : [],

    missingKeywords:
      Array.isArray(
        result?.missingKeywords
      )
        ? result.missingKeywords
            .filter(
              (item: unknown) =>
                typeof item ===
                "string"
            )
            .map(
              (item: string) =>
                item.trim()
            )
            .filter(Boolean)
        : [],

    recommendations,

    optimizedSummary:
      typeof result?.optimizedSummary ===
      "string"
        ? result.optimizedSummary.trim()
        : "",

    improvedExperience:
      Array.isArray(
        result?.improvedExperience
      )
        ? result.improvedExperience
            .filter(
              (item: unknown) =>
                typeof item ===
                "string"
            )
            .map(
              (item: string) =>
                item.trim()
            )
            .filter(Boolean)
        : [],
  };
};
// ============================================================
// AI ANALYSIS
// ============================================================

/**
 * Runs Gemini analysis.
 *
 * IMPORTANT:
 * Rule-based scoring happens separately.
 * Gemini is used for qualitative intelligence:
 *
 * - strengths
 * - weaknesses
 * - missing keywords
 * - suggestions
 * - optimized summary
 * - improved experience
 */
const runAIAnalysis = async (
  resume: Record<string, unknown>,
  targetRole: string,
  jobDescription: string
): Promise<ATSAIAnalysis> => {
  const prompt =
    buildATSAnalysisPrompt(
      resume,
      targetRole,
      jobDescription
    );

  const result =
    await generateJSON<any>(
      prompt
    );

  return normalizeAIAnalysis(
    result
  );
};

// ============================================================
// MERGE RULE + AI ANALYSIS
// ============================================================

const mergeRecommendations = (
  ruleAnalysis: ATSRuleAnalysis,
  aiAnalysis: ATSAIAnalysis
) => {
  const ruleRecommendations =
    ruleAnalysis.recommendations.map(
      (recommendation) => ({
        ...recommendation,
      })
    );

  const aiRecommendations =
    aiAnalysis.recommendations.map(
      (recommendation) => ({
        ...recommendation,
      })
    );

  return [
    ...ruleRecommendations,
    ...aiRecommendations,
  ].slice(0, 15);
};

// ============================================================
// BUILD FINAL RESULT
// ============================================================

const buildATSResult = (
  resumeId: string,
  ruleAnalysis: ATSRuleAnalysis,
  aiAnalysis?: ATSAIAnalysis
): ATSResult => {
  const ai =
    aiAnalysis ?? {
      strengths: [],
      weaknesses: [],
      matchedKeywords: [],
      missingKeywords: [],
      recommendations: [],
      optimizedSummary: "",
      improvedExperience: [],
      
    };

  const matchedKeywords = [
    ...ruleAnalysis.keywords.matchedKeywords,
    ...ai.matchedKeywords,
  ];

  const missingKeywords = [
    ...ruleAnalysis.keywords.missingKeywords,
    ...ai.missingKeywords,
  ];

  const uniqueMatchedKeywords =
    Array.from(
      new Set(
        matchedKeywords.map(
          (keyword) =>
            keyword.trim()
        )
      )
    ).filter(Boolean);

  const uniqueMissingKeywords =
    Array.from(
      new Set(
        missingKeywords.map(
          (keyword) =>
            keyword.trim()
        )
      )
    ).filter(Boolean);

  const strengths =
    Array.from(
      new Set([
        ...ruleAnalysis.strengths,
        ...ai.strengths,
      ])
    ).slice(0, 10);

  const weaknesses =
    Array.from(
      new Set([
        ...ruleAnalysis.weaknesses,
        ...ai.weaknesses,
      ])
    ).slice(0, 10);

  const recommendations =
    mergeRecommendations(
      ruleAnalysis,
      ai
    );

  return {
    resumeId,

    atsScore:
      ruleAnalysis.overallScore,

    grade:
      getGradeFromScore(
        ruleAnalysis.overallScore
      ),

    breakdown:
      ruleAnalysis.breakdown,

    categories:
      ruleAnalysis.categories,

    matchedKeywords:
      uniqueMatchedKeywords,

    missingKeywords:
  uniqueMissingKeywords,

dateConsistency:
  ruleAnalysis.dateConsistency,

strengths,

    weaknesses,

    recommendations,

    optimizedSummary:
      ai.optimizedSummary,

    improvedExperience:
      ai.improvedExperience,

    analyzedAt:
      new Date().toISOString(),
  };
};

// ============================================================
// GRADE
// ============================================================

const getGradeFromScore = (
  score: number
) => {
  if (score >= 90) {
    return "A" as const;
  }

  if (score >= 80) {
    return "B" as const;
  }

  if (score >= 70) {
    return "C" as const;
  }

  if (score >= 60) {
    return "D" as const;
  }

  return "F" as const;
};

// ============================================================
// SAVE ANALYSIS
// ============================================================

const saveATSAnalysis = async (
  context: ATSServiceContext,
  result: ATSResult
) => {
  const {
    userId,
    resumeId,
    jobDescription,
  } = context;

  const analysis =
    await ResumeAnalysis.create({
      userId,

      resumeId,

      jobDescription:
        jobDescription ?? "",

      atsScore:
        result.atsScore,

      grade:
        result.grade,

     breakdown: result.breakdown,

      matchedKeywords:
        result.matchedKeywords,

      missingKeywords:
        result.missingKeywords,

      recommendations:
        result.recommendations,

      strengths:
        result.strengths,

      weaknesses:
        result.weaknesses,

      optimizedSummary:
        result.optimizedSummary,

      improvedExperience:
        result.improvedExperience,
        dateConsistency:
  result.dateConsistency,
    });

  return analysis;
};

// ============================================================
// MAIN SERVICE
// ============================================================

export const analyzeResumeService =
  async (
    context: ATSServiceContext
  ) => {
    const {
      userId,
      resumeId,
      jobDescription,
        targetRole,
      options,
    } = context;

    // --------------------------------------------------------
    // 1. Fetch resume
    // --------------------------------------------------------

    const resume =
      await Resume.findOne({
        _id: resumeId,
        userId,
      });

    if (!resume) {
  throw new ApiError(
    404,
    "Resume not found"
  );
}
    // --------------------------------------------------------
    // 2. Convert Mongoose document
    // --------------------------------------------------------

    const resumeObject =
      getResumeObject(
        resume
      );

      

      const atsResume = {
  ...resumeObject,
  targetRole: targetRole.trim(),
};

    // --------------------------------------------------------
    // 3. Deterministic ATS analysis
    // --------------------------------------------------------

    const ruleAnalysis =
      analyzeResumeATS(
        resumeObject as any
      );

    // --------------------------------------------------------
    // 4. AI analysis
    // --------------------------------------------------------

    let aiAnalysis:
      | ATSAIAnalysis
      | undefined;

    /**
     * AI analysis is enabled by default.
     *
     * If explicitly disabled, only deterministic ATS
     * analysis is returned.
     */
    const shouldRunAI =
      options?.includeAIAnalysis !==
      false;

    if (
      shouldRunAI
    ) {
      aiAnalysis =
  await runAIAnalysis(
    atsResume,
    targetRole,
    jobDescription ?? ""
  );
    }

    // --------------------------------------------------------
    // 5. Merge
    // --------------------------------------------------------

    const result =
      buildATSResult(
        resumeId,
        ruleAnalysis,
        aiAnalysis
      );

    // --------------------------------------------------------
    // 6. Save
    // --------------------------------------------------------

    const savedAnalysis =
      await saveATSAnalysis(
        context,
        result
      );

    // --------------------------------------------------------
    // 7. Return
    // --------------------------------------------------------

    return {
      result,

      analysis:
        savedAnalysis,

      ruleAnalysis,

      aiAnalysis:
        aiAnalysis ?? null,
    };
  };

// ============================================================
// GET LATEST ANALYSIS
// ============================================================

export const getLatestATSAnalysis =
  async (
    userId: string,
    resumeId: string
  ) => {
    const analysis =
      await ResumeAnalysis.findOne({
        userId,
        resumeId,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return analysis;
  };

// ============================================================
// GET ANALYSIS HISTORY
// ============================================================

export const getATSAnalysisHistory =
  async (
    userId: string,
    resumeId: string
  ) => {
    return ResumeAnalysis.find({
      userId,
      resumeId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();
  };

// ============================================================
// REQUEST VALIDATION
// ============================================================

export const validateATSRequest =
  (
    request: ATSAnalyzeRequest
  ) => {
    // --------------------------------------------------------
    // Resume ID
    // --------------------------------------------------------

    if (
      !request.resumeId ||
      typeof request.resumeId !==
        "string"
    ) {
      const error =
        new Error(
          "resumeId is required"
        );

      (error as any).statusCode =
        400;

      throw error;
    }

    // --------------------------------------------------------
    // Target Role
    // --------------------------------------------------------

    if (
      !request.targetRole ||
      typeof request.targetRole !==
        "string" ||
      !request.targetRole.trim()
    ) {
      const error =
        new Error(
          "targetRole is required"
        );

      (error as any).statusCode =
        400;

      throw error;
    }

    // --------------------------------------------------------
    // Job Description
    // --------------------------------------------------------

    if (
      request.jobDescription !==
        undefined &&
      typeof request.jobDescription !==
        "string"
    ) {
      const error =
        new Error(
          "jobDescription must be a string"
        );

      (error as any).statusCode =
        400;

      throw error;
    }

    return true;
  };