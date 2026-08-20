 

 




import {
  ATS_ACTION_VERBS,
  ATS_SCORE_CATEGORIES,
  ATS_STANDARD_SECTIONS,
  ATS_WEAK_BULLET_PATTERNS,
  ATS_METRIC_PATTERNS,
  ATS_YEAR_PATTERN,

  ATSBreakdown,
  ATSCategoryResult,
  ATSContactAnalysis,
  ATSSectionAnalysis,
  ATSSkillsAnalysis,
  ATSKeywordAnalysis,
  ATSExperienceAnalysis,
  ATSActionVerbAnalysis,
  ATSQuantifiedResultAnalysis,
  ATSAchievementAnalysis,
  ATSProjectAnalysis,
  ATSEducationAnalysis,
  ATSFormattingAnalysis,
  ATSRuleAnalysis,
  ATSRecommendation,
  ATSCategoryStatus,
  ATSScoreCategory,

  ATSDateConsistencyAnalysis,
  ATSMatchStatus,
  ATSEvidenceStrength,

  ATSJobRequirement,
  ATSRequirementMatch,
  ATSJobDescriptionAnalysis,

  clampATSScore,
  calculateATSPercentage,
  getATSCategoryStatus,
  ATSRequirementPriority,
} from "./ats.types";

import {
  getRoleMatchInfo,
  getRoleSkillPool,
  getRoleCoreSkillPool,
  getRoleKeywordPool,
  getRoleResponsibilityPool,
  getRoleProjectSignals,
  getRoleAchievementSignals,
  getRoleSenioritySignals,
  getPreferredRoleSections,
  hasRoleBenchmark,
} from "./role-intelligence";

// ============================================================
// RESUME SHAPE
// ============================================================

/**
 * ATS does not mutate the Resume document.
 *
 * We intentionally use a lightweight internal shape here so
 * the scorer remains independent from Mongoose.
 */
interface ATSResume {
  targetRole?: string;

  sections?: Array<{
    id?: string;
    type?: string;
    title?: string;
    enabled?: boolean;
    order?: number;
  }>;

  personalInfo?: {
    fullName?: string;
    title?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };

  summary?: string;

  skills?: Array<{
    title?: string;
    skills?: string[];
  }>;

  experience?: Array<{
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    currentlyWorking?: boolean;
    responsibilities?: string[];
    achievements?: string[];
    location?: string;
  }>;

  internships?: Array<{
    company?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    currentlyInterning?: boolean;
    responsibilities?: string[];
    achievements?: string[];
  }>;

  education?: Array<{
    institution?: string;
    degree?: string;
    fieldOfStudy?: string;
    startYear?: number;
    endYear?: number;
    cgpa?: string;
  }>;

  projects?: Array<{
    title?: string;
    role?: string;
    description?: string;
    technologies?: string[];
    github?: string;
    link?: string;
  }>;

  certifications?: string[];

  languages?: Array<{
    name?: string;
    level?: string;
  }>;

  awards?: string[];

  interests?: string[];

  achievements?: string[];

  strengths?: Array<{
    title?: string;
    description?: string;
  }>;

  customSections?: Array<{
    id?: string;
    type?: string;
    title?: string;
    enabled?: boolean;
    order?: number;
    items?: Array<{
      title?: string;
      subtitle?: string;
      description?: string;
    }>;
  }>;
}

// ============================================================
// INTERNAL HELPERS
// ============================================================

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const normalizeText = (value: unknown): string => {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#./-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const containsNormalizedPhrase = (
  text: string,
  phrase: string
): boolean => {
  const normalizedText =
    normalizeRequirementForMatch(text)
      .toLowerCase()
      .replace(/[./+#-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const normalizedPhrase =
    normalizeRequirementForMatch(phrase)
      .toLowerCase()
      .replace(/[./+#-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  if (!normalizedText || !normalizedPhrase) {
    return false;
  }

  // Exact phrase
  if (normalizedText.includes(normalizedPhrase)) {
    return true;
  }

  // Token-based matching
  const textTokens = new Set(
    normalizedText.split(/\s+/)
  );

  const phraseTokens =
    normalizedPhrase.split(/\s+/);

  // Single-word requirement
  if (phraseTokens.length === 1) {
    return textTokens.has(phraseTokens[0]);
  }

  // Multi-word requirement:
  // all important words must exist
  return phraseTokens.every((token) =>
    textTokens.has(token)
  );
};
const countMatchingSignals = (
  textValues: string[],
  signals: string[]
): number => {
  if (!textValues.length || !signals.length) {
    return 0;
  }

  return signals.filter((signal) =>
    textValues.some((text) =>
      containsNormalizedPhrase(text, signal)
    )
  ).length;
};

const uniqueStrings = (
  values: string[]
): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const cleaned = cleanText(value);

    if (!cleaned) {
      continue;
    }

    const key = normalizeText(cleaned);

    if (!seen.has(key)) {
      seen.add(key);
      result.push(cleaned);
    }
  }

  return result;
};

const flattenStrings = (
  values: unknown[]
): string[] => {
  return values
    .flatMap((value) => {
      if (Array.isArray(value)) {
        return flattenStrings(value);
      }

      if (typeof value === "string") {
        return [value];
      }

      return [];
    })
    .filter(Boolean);
};

const getCategory = (
  id: string
) => {
  return ATS_SCORE_CATEGORIES.find(
    (category) => category.id === id
  );
};

const getCategoryMaxScore = (
  id: string
): number => {
  return getCategory(id)?.maxScore ?? 0;
};

const makeCategoryResult = (
  categoryId: string,
  score: number,
  summary: string,
  issues: string[],
  suggestions: string[]
): ATSCategoryResult => {
  const category = getCategory(categoryId);

  const maxScore = category?.maxScore ?? 0;

  const safeScore = clampATSScore(
    score,
    0,
    maxScore
  );

  const percentage =
    calculateATSPercentage(
      safeScore,
      maxScore
    );

  const status: ATSCategoryStatus =
    getATSCategoryStatus(percentage);

  return {
    category: categoryId as ATSScoreCategory,

    title:
      category?.title ?? categoryId,

    score: safeScore,

    maxScore,

    percentage,

    status,

    summary,

    issues: uniqueStrings(issues),

    suggestions: uniqueStrings(
      suggestions
    ),
  };
};

// ============================================================
// CONTACT ANALYSIS
// ============================================================

export const analyzeContact = (
  resume: ATSResume
): ATSContactAnalysis => {
  const personalInfo =
    resume.personalInfo ?? {};

  const fullName =
    cleanText(
      personalInfo.fullName
    ).length > 0;

  const email =
    cleanText(
      personalInfo.email
    ).length > 0;

  const phone =
    cleanText(
      personalInfo.phone
    ).length > 0;

  const linkedIn =
    cleanText(
      personalInfo.linkedIn
    ).length > 0;

  const github =
    cleanText(
      personalInfo.github
    ).length > 0;

  const portfolio =
    cleanText(
      personalInfo.portfolio
    ).length > 0;

  /**
   * Contact scoring:
   *
   * Name       2
   * Email      2
   * Phone      2
   * LinkedIn   1.5
   * GitHub     1.5
   * Portfolio  1
   *
   * Total = 10
   */
  let score = 0;

  if (fullName) score += 2;
  if (email) score += 2;
  if (phone) score += 2;
  if (linkedIn) score += 1.5;
  if (github) score += 1.5;
  if (portfolio) score += 1;

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (!fullName) {
    issues.push(
      "Full name is missing."
    );

    suggestions.push(
      "Add your full professional name."
    );
  }

  if (!email) {
    issues.push(
      "Email address is missing."
    );

    suggestions.push(
      "Add a professional email address."
    );
  }

  if (!phone) {
    issues.push(
      "Phone number is missing."
    );

    suggestions.push(
      "Add a reachable phone number."
    );
  }

  if (!linkedIn) {
    suggestions.push(
      "Add a LinkedIn profile if available."
    );
  }

  if (!github) {
    suggestions.push(
      "Add GitHub when applying for technical roles."
    );
  }

  if (!portfolio) {
    suggestions.push(
      "Add a portfolio when it strengthens your application."
    );
  }

  return {
    fullName,
    email,
    phone,
    linkedIn,
    github,
    portfolio,
    score,
    issues: uniqueStrings(issues),
    suggestions: uniqueStrings(
      suggestions
    ),
  };
};

// ============================================================
// SECTION ANALYSIS
// ============================================================

export const analyzeSections = (
  resume: ATSResume
): ATSSectionAnalysis => {
  const sections =
    resume.sections ?? [];

  const enabledSections =
    sections.filter(
      (section) =>
        section.enabled !== false
    );

  const present = uniqueStrings(
    enabledSections.map(
      (section) =>
        section.type ||
        section.id ||
        ""
    )
  );

  const disabled = uniqueStrings(
    sections
      .filter(
        (section) =>
          section.enabled === false
      )
      .map(
        (section) =>
          section.type ||
          section.id ||
          ""
      )
  );

  const missing =
    ATS_STANDARD_SECTIONS.filter(
      (section) =>
        !present.some(
          (existing) =>
            normalizeText(existing) ===
            normalizeText(section)
        )
    );

  const empty: string[] = [];

  if (
    present.includes("summary") &&
    !cleanText(resume.summary)
  ) {
    empty.push("summary");
  }

  if (
    present.includes("skills") &&
    !(resume.skills ?? []).some(
      (category) =>
        (category.skills ?? []).length > 0
    )
  ) {
    empty.push("skills");
  }

  if (
    present.includes("experience") &&
    (resume.experience ?? []).length === 0
  ) {
    empty.push("experience");
  }

  if (
    present.includes("projects") &&
    (resume.projects ?? []).length === 0
  ) {
    empty.push("projects");
  }

  const issues: string[] = [];
  const suggestions: string[] = [];

  const targetRole =
    cleanText(
      resume.targetRole
    );

  const preferredRoleSections =
    targetRole
      ? getPreferredRoleSections(
          targetRole
        )
      : [];

  const missingPreferredRoleSections =
    preferredRoleSections.filter(
      (section) =>
        !present.some(
          (existing) =>
            normalizeText(existing) ===
            normalizeText(section)
        )
    );

  if (
    hasRoleBenchmark(targetRole) &&
    missingPreferredRoleSections.length > 0
  ) {
    suggestions.push(
      `Consider adding role-relevant sections: ${missingPreferredRoleSections.slice(0, 3).join(", ")}.`
    );
  }

  if (missing.includes("summary")) {
    issues.push(
      "Professional summary section is missing."
    );
  }

  if (empty.length > 0) {
    issues.push(
      `Empty sections detected: ${empty.join(", ")}.`
    );

    suggestions.push(
      "Remove empty sections or add meaningful content."
    );
  }

  if (
    !present.includes("experience") &&
    !present.includes("internships")
  ) {
    suggestions.push(
      "Add relevant professional or internship experience."
    );
  }

  if (!present.includes("skills")) {
    issues.push(
      "Skills section is missing."
    );

    suggestions.push(
      "Add a dedicated skills section."
    );
  }

  if (!present.includes("education")) {
    suggestions.push(
      "Include education when relevant to the target role."
    );
  }

  /**
   * Base section score.
   *
   * 15 points distributed according to important
   * section availability and completeness.
   */
  const importantSections = [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
  ];

  const availableImportantSections =
    importantSections.filter(
      (section) =>
        present.includes(section) &&
        !empty.includes(section)
    ).length;

  let score =
    (availableImportantSections /
      importantSections.length) *
    10;

  if (present.length >= 5) {
    score += 2;
  }

  if (
    present.includes("certifications") ||
    present.includes("achievements")
  ) {
    score += 1;
  }

  if (
    present.includes("languages") ||
    present.includes("awards")
  ) {
    score += 1;
  }

  if (empty.length === 0) {
    score += 1;
  }

  return {
    present,
    missing,
    disabled,
    empty,
    duplicate: [],
    score: clampATSScore(
      score,
      0,
      getCategoryMaxScore("sections")
    ),
    issues: uniqueStrings(issues),
    suggestions: uniqueStrings(
      suggestions
    ),
  };
};

// ============================================================
// SKILLS ANALYSIS
// ============================================================

export const analyzeSkills = (
  resume: ATSResume
): ATSSkillsAnalysis => {
  const categories =
    resume.skills ?? [];

  const allSkills = flattenStrings(
    categories.map(
      (category) =>
        category.skills ?? []
    )
  );

  const normalizedMap =
    new Map<string, string>();

  const duplicateSkills: string[] = [];

  for (const skill of allSkills) {
    const normalized =
      normalizeText(skill);

    if (!normalized) {
      continue;
    }

    if (
      normalizedMap.has(normalized)
    ) {
      duplicateSkills.push(
        skill
      );
    } else {
      normalizedMap.set(
        normalized,
        skill
      );
    }
  }

  const skills = uniqueStrings(
    allSkills
  );

  // ------------------------------------------------------------
  // TARGET ROLE
  // ------------------------------------------------------------

  const targetRole =
    cleanText(
      resume.targetRole
    );

  // Resolve the user's target role to the
  // official Role Intelligence profile name.
  //
  // Example:
  // "react" -> "Frontend Developer"
  // "node js" -> "Backend Developer"
  // "full stack java developer" -> matched role profile
  const roleMatchInfo =
  targetRole
    ? getRoleMatchInfo(targetRole)
    : null;

const displayRole =
  roleMatchInfo?.matchedProfile ??
  targetRole;

  // ------------------------------------------------------------
  // ROLE SKILL BENCHMARK
  // ------------------------------------------------------------

  const roleSkillPool =
    targetRole
      ? getRoleSkillPool(
          targetRole
        )
      : [];

  const roleCoreSkillPool =
    targetRole
      ? getRoleCoreSkillPool(
          targetRole
        )
      : [];

  const roleMatchedSkills =
    roleSkillPool.filter(
      (roleSkill) =>
        skills.some((skill) =>
          containsNormalizedPhrase(
            skill,
            roleSkill
          )
        )
    );

  const roleCoreMatchedSkills =
    roleCoreSkillPool.filter(
      (roleSkill) =>
        skills.some((skill) =>
          containsNormalizedPhrase(
            skill,
            roleSkill
          )
        )
    );

  const roleCoverage =
    roleSkillPool.length === 0
      ? 0
      : (
          roleMatchedSkills.length /
          roleSkillPool.length
        ) * 100;

  const coreCoverage =
    roleCoreSkillPool.length === 0
      ? 0
      : (
          roleCoreMatchedSkills.length /
          roleCoreSkillPool.length
        ) * 100;

  const issues: string[] = [];
  const suggestions: string[] = [];

  // ------------------------------------------------------------
  // SKILL VALIDATION
  // ------------------------------------------------------------

  if (skills.length === 0) {
    issues.push(
      "No skills were detected."
    );

    suggestions.push(
      "Add relevant technical or professional skills."
    );
  }

  if (skills.length < 5) {
    issues.push(
      "Very few skills are listed."
    );

    suggestions.push(
      "Add the most relevant skills for your target role."
    );
  }

  if (duplicateSkills.length > 0) {
    issues.push(
      "Duplicate skills were detected."
    );

    suggestions.push(
      "Remove duplicate skills and keep one clean occurrence."
    );
  }

  if (categories.length === 0) {
    suggestions.push(
      "Organize skills into clear categories."
    );
  }

  // ------------------------------------------------------------
  // ROLE BENCHMARK
  // ------------------------------------------------------------

  if (
    hasRoleBenchmark(targetRole) &&
    roleSkillPool.length > 0 &&
    roleCoverage < 40
  ) {
    issues.push(
      `Low alignment with the ${displayRole} role benchmark (${Number(
        roleCoverage.toFixed(1)
      )}% skill coverage).`
    );

    suggestions.push(
      `Add relevant ${displayRole} skills only when you genuinely have those skills.`
    );
  }

  if (
    hasRoleBenchmark(targetRole) &&
    roleCoreSkillPool.length > 0 &&
    coreCoverage < 50
  ) {
    suggestions.push(
      "Prioritize core skills expected for the target role."
    );
  }

  // ------------------------------------------------------------
  // SKILL SCORE
  // ------------------------------------------------------------

  let score = 0;

  if (skills.length >= 5) {
    score += 4;
  }

  if (skills.length >= 10) {
    score += 3;
  }

  if (skills.length >= 15) {
    score += 2;
  }

  // Category bonuses only apply when
  // the resume actually contains skills.
  if (
    skills.length > 0 &&
    categories.length >= 2
  ) {
    score += 2;
  }

  if (
    skills.length > 0 &&
    categories.length >= 4
  ) {
    score += 2;
  }

  // Do not reward duplicate-free structure
  // when there are no skills.
  if (
    skills.length > 0 &&
    duplicateSkills.length === 0
  ) {
    score += 1;
  }

  // Too many skills can reduce readability.
  if (skills.length >= 20) {
    score -= 1;
  }

  // ------------------------------------------------------------
  // ROLE ALIGNMENT
  // ------------------------------------------------------------

  // Role alignment only contributes when
  // actual skills exist.
  if (
    skills.length > 0 &&
    hasRoleBenchmark(targetRole) &&
    roleSkillPool.length > 0
  ) {
    score +=
      (Math.min(
        roleCoverage,
        100
      ) / 100) * 3;
  }

  // ------------------------------------------------------------
  // FINAL RESULT
  // ------------------------------------------------------------

  return {
    totalSkills:
      skills.length,

    categories:
      categories.length,

    skills,

    duplicateSkills:
      uniqueStrings(
        duplicateSkills
      ),

    suspiciousSkills: [],

    score:
      clampATSScore(
        score,
        0,
        getCategoryMaxScore(
          "skills"
        )
      ),

    issues:
      uniqueStrings(
        issues
      ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};


// ============================================================
// EXPERIENCE ANALYSIS
// ============================================================

const getExperienceBullets = (
  resume: ATSResume
): string[] => {
  const experienceBullets =
    (resume.experience ?? []).flatMap(
      (experience) => [
        ...(experience.responsibilities ??
          []),
        ...(experience.achievements ??
          []),
      ]
    );

  const internshipBullets =
    (resume.internships ?? []).flatMap(
      (internship) => [
        ...(internship.responsibilities ??
          []),
        ...(internship.achievements ??
          []),
      ]
    );

  return [
    ...experienceBullets,
    ...internshipBullets,
  ].filter(
    (bullet) =>
      cleanText(bullet).length > 0
  );
};

const isWeakBullet = (
  bullet: string
): boolean => {
  const text =
    cleanText(bullet);

  return ATS_WEAK_BULLET_PATTERNS.some(
    (pattern) =>
      pattern.test(text)
  );
};

const containsMetric = (
  bullet: string
): boolean => {
  return (
    bullet.match(
      ATS_METRIC_PATTERNS.percentage
    ) !== null ||
    bullet.match(
      ATS_METRIC_PATTERNS.currency
    ) !== null ||
    bullet.match(
      ATS_METRIC_PATTERNS.time
    ) !== null ||
    bullet.match(
      ATS_METRIC_PATTERNS.impactNumber
    ) !== null
  );
};
const containsActionVerb = (
  bullet: string
): boolean => {
  const normalized =
    normalizeText(bullet);

  if (!normalized) {
    return false;
  }

  const firstWord =
    normalized.split(" ")[0];

  return ATS_ACTION_VERBS.some(
    (verb) =>
      verb === firstWord
  );
};

export const analyzeExperience = (
  resume: ATSResume
): ATSExperienceAnalysis => {
  const experience =
    resume.experience ?? [];

  const internships =
    resume.internships ?? [];

  const bullets =
    getExperienceBullets(
      resume
    );

  const responsibilityBullets =
    experience.reduce(
      (count, item) =>
        count +
        (item.responsibilities
          ?.length ?? 0),
      0
    ) +
    internships.reduce(
      (count, item) =>
        count +
        (item.responsibilities
          ?.length ?? 0),
      0
    );

  const achievementBullets =
    experience.reduce(
      (count, item) =>
        count +
        (item.achievements
          ?.length ?? 0),
      0
    ) +
    internships.reduce(
      (count, item) =>
        count +
        (item.achievements
          ?.length ?? 0),
      0
    );

  const quantifiedBullets =
    bullets.filter(
      containsMetric
    ).length;

  const weakBullets =
    bullets.filter(
      isWeakBullet
    );

  const strongBullets =
    bullets.filter(
      (bullet) =>
        containsActionVerb(
          bullet
        ) &&
        containsMetric(
          bullet
        )
    );

  const repetitiveBullets: string[] =
    [];

  const seen = new Set<string>();

  for (const bullet of bullets) {
    const normalized =
      normalizeText(bullet);

    if (
      seen.has(normalized)
    ) {
      repetitiveBullets.push(
        bullet
      );
    }

    seen.add(normalized);
  }

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (
    experience.length === 0 &&
    internships.length === 0
  ) {
    issues.push(
      "No professional experience or internships were detected."
    );

    suggestions.push(
      "Add relevant internships, projects or experience where appropriate."
    );
  }

  if (
    bullets.length > 0 &&
    achievementBullets === 0
  ) {
    issues.push(
      "Experience contains responsibilities but no explicit achievements."
    );

    suggestions.push(
      "Convert important responsibilities into measurable achievements."
    );
  }

  if (
    quantifiedBullets === 0 &&
    bullets.length > 0
  ) {
    issues.push(
      "No measurable results were detected in experience bullets."
    );

    suggestions.push(
      "Add numbers, percentages, scale or measurable outcomes."
    );
  }

  if (weakBullets.length > 0) {
    issues.push(
      `${weakBullets.length} weakly phrased bullet(s) detected.`
    );

    suggestions.push(
      "Replace weak openings with strong action verbs."
    );
  }

  if (
    repetitiveBullets.length > 0
  ) {
    issues.push(
      "Repeated experience bullets were detected."
    );

    suggestions.push(
      "Remove duplicate or highly repetitive statements."
    );
  }

  const targetRole =
    cleanText(
      resume.targetRole
    );

    const displayRole =
  cleanText(
    getRoleMatchInfo(
      targetRole
    ).matchedProfile
  ) ||
  targetRole ||
  "target role";

  const roleResponsibilities =
    targetRole
      ? getRoleResponsibilityPool(
          targetRole
        )
      : [];

  const roleSenioritySignals =
    targetRole
      ? getRoleSenioritySignals(
          targetRole
        )
      : {
          entry: [],
          mid: [],
          senior: [],
          lead: [],
        };

  const roleRelevantBullets =
    roleResponsibilities.length > 0
      ? bullets.filter((bullet) =>
          roleResponsibilities.some(
            (signal) =>
              containsNormalizedPhrase(
                bullet,
                signal
              )
          )
        )
      : [];

  const senioritySignalBullets =
    bullets.filter((bullet) =>
      [
        ...roleSenioritySignals.entry,
        ...roleSenioritySignals.mid,
        ...roleSenioritySignals.senior,
        ...roleSenioritySignals.lead,
      ].some((signal) =>
        containsNormalizedPhrase(
          bullet,
          signal
        )
      )
    );

  const roleRelevanceCoverage =
    roleResponsibilities.length === 0 ||
    bullets.length === 0
      ? 0
      : (
          roleRelevantBullets.length /
          bullets.length
        ) * 100;

 const resolvedRoleInfo =
  targetRole
    ? getRoleMatchInfo(targetRole)
    : null;

 

if (
  hasRoleBenchmark(targetRole) &&
  bullets.length > 0 &&
  roleResponsibilities.length > 0 &&
  roleRelevantBullets.length === 0
) {
  issues.push(
  `Experience bullets show weak alignment with the ${displayRole} role benchmark.`
);

 suggestions.push(
  `Rewrite experience bullets to emphasize responsibilities that genuinely match the ${displayRole} role.`
);
  }

  if (
    hasRoleBenchmark(targetRole) &&
    bullets.length > 0 &&
    senioritySignalBullets.length === 0
  ) {
    suggestions.push(
      "Use role-appropriate ownership and impact language that accurately reflects your seniority."
    );
  }

  let score = 0;

  if (experience.length > 0) {
    score += 4;
  } else if (
    internships.length > 0
  ) {
    score += 3;
  }

  if (bullets.length >= 3) {
    score += 2;
  }

  if (achievementBullets > 0) {
    score += 3;
  }

  if (quantifiedBullets > 0) {
    score += 2;
  }

  if (strongBullets.length > 0) {
    score += 2;
  }

  // Role relevance contributes up to 2 points.
  if (
    hasRoleBenchmark(targetRole) &&
    roleResponsibilities.length > 0 &&
    bullets.length > 0
  ) {
    score +=
      (Math.min(
        roleRelevanceCoverage,
        100
      ) / 100) * 2;
  }

  if (
    weakBullets.length === 0 &&
    bullets.length > 0
  ) {
    score += 1;
  }

  if (
    repetitiveBullets.length > 0
  ) {
    score -= 1;
  }

  return {
    experienceCount:
      experience.length,

    internshipCount:
      internships.length,

    totalBullets:
      bullets.length,

    responsibilityBullets,

    achievementBullets,

    quantifiedBullets,

    weakBullets:
      uniqueStrings(
        weakBullets
      ),

    strongBullets:
      uniqueStrings(
        strongBullets
      ),

    repetitiveBullets:
      uniqueStrings(
        repetitiveBullets
      ),

    relevanceIssues: [],

    score: clampATSScore(
      score,
      0,
      getCategoryMaxScore(
        "experience"
      )
    ),

    issues: uniqueStrings(
      issues
    ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};

// ============================================================
// ACTION VERB ANALYSIS
// ============================================================

export const analyzeActionVerbs = (
  resume: ATSResume
): ATSActionVerbAnalysis => {
  const bullets =
    getExperienceBullets(
      resume
    );

  const bulletsWithActionVerbs =
    bullets.filter(
      containsActionVerb
    );

  const detectedVerbs =
    bulletsWithActionVerbs.map(
      (bullet) =>
        normalizeText(
          bullet
        ).split(" ")[0]
    );

  const verbFrequency =
    new Map<string, number>();

  for (const verb of detectedVerbs) {
    verbFrequency.set(
      verb,
      (verbFrequency.get(verb) ??
        0) + 1
    );
  }

  const repeatedVerbs =
    Array.from(
      verbFrequency.entries()
    )
      .filter(
        ([, count]) =>
          count >= 3
      )
      .map(
        ([verb]) => verb
      );

  const weakOpenings =
    bullets.filter(
      (bullet) =>
        !containsActionVerb(
          bullet
        )
    );

  const coverage =
    bullets.length === 0
      ? 0
      : (bulletsWithActionVerbs.length /
          bullets.length) *
        100;

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (
    bullets.length > 0 &&
    coverage < 50
  ) {
    issues.push(
      "Many bullets do not begin with strong action verbs."
    );

    suggestions.push(
      "Start achievement and responsibility bullets with precise action verbs."
    );
  }

  if (
    repeatedVerbs.length > 0
  ) {
    issues.push(
      `Repeated action verbs detected: ${repeatedVerbs.join(", ")}.`
    );

    suggestions.push(
      "Use varied action verbs where they accurately describe the work."
    );
  }

  let score =
    (coverage / 100) *
    getCategoryMaxScore(
      "actionVerbs"
    );

  if (
    repeatedVerbs.length > 0
  ) {
    score -= 1;
  }

  return {
    totalBullets:
      bullets.length,

    bulletsWithActionVerbs:
      bulletsWithActionVerbs.length,

    actionVerbCoverage:
      Number(
        coverage.toFixed(2)
      ),

    detectedVerbs:
      uniqueStrings(
        detectedVerbs
      ),

    weakOpenings:
      uniqueStrings(
        weakOpenings
      ),

    repeatedVerbs:
      uniqueStrings(
        repeatedVerbs
      ),

    score: clampATSScore(
      score,
      0,
      getCategoryMaxScore(
        "actionVerbs"
      )
    ),

    issues: uniqueStrings(
      issues
    ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};

// ============================================================
// QUANTIFIED RESULT ANALYSIS
// ============================================================

const extractMatches = (
  regex: RegExp,
  text: string
): string[] => {
  /**
   * String.match() avoids manually managing lastIndex
   * for global regexes.
   */
  return text.match(regex) ?? [];
};

export const analyzeQuantifiedResults = (
  resume: ATSResume
): ATSQuantifiedResultAnalysis => {
  const bullets =
    getExperienceBullets(
      resume
    );

  const allText =
    bullets.join(" ");

  const percentages =
    extractMatches(
      ATS_METRIC_PATTERNS.percentage,
      allText
    );

  const currencies =
    extractMatches(
      ATS_METRIC_PATTERNS.currency,
      allText
    );

  const timeMetrics =
    extractMatches(
      ATS_METRIC_PATTERNS.time,
      allText
    );

  const numbers =
    extractMatches(
      ATS_METRIC_PATTERNS.impactNumber,
      allText
    );

  const quantifiedBullets =
    bullets.filter(
      (bullet) =>
        extractMatches(
          ATS_METRIC_PATTERNS.percentage,
          bullet
        ).length > 0 ||
        extractMatches(
          ATS_METRIC_PATTERNS.currency,
          bullet
        ).length > 0 ||
        extractMatches(
          ATS_METRIC_PATTERNS.time,
          bullet
        ).length > 0 ||
        extractMatches(
          ATS_METRIC_PATTERNS.impactNumber,
          bullet
        ).length > 0
    ).length;

  const metricCoverage =
    bullets.length === 0
      ? 0
      : (quantifiedBullets /
          bullets.length) *
        100;

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (
    bullets.length > 0 &&
    quantifiedBullets === 0
  ) {
    issues.push(
      "No measurable impact was detected."
    );

    suggestions.push(
      "Add measurable outcomes such as growth, speed, scale, users, revenue or efficiency."
    );
  } else if (
    metricCoverage < 30
  ) {
    suggestions.push(
      "Add measurable outcomes to more experience bullets."
    );
  }

  const score =
    (metricCoverage / 100) *
    getCategoryMaxScore(
      "quantifiedResults"
    );

  return {
    totalBullets:
      bullets.length,

    quantifiedBullets,

    percentages:
      uniqueStrings(
        percentages
      ),

    numbers:
      uniqueStrings(
        numbers
      ),

    currencies:
      uniqueStrings(
        currencies
      ),

    timeMetrics:
      uniqueStrings(
        timeMetrics
      ),

    performanceMetrics:
      uniqueStrings([
        ...percentages,
        ...numbers,
      ]),

    metricCoverage:
      Number(
        metricCoverage.toFixed(2)
      ),

    score: clampATSScore(
      score,
      0,
      getCategoryMaxScore(
        "quantifiedResults"
      )
    ),

    issues: uniqueStrings(
      issues
    ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};

// ============================================================
// ACHIEVEMENT ANALYSIS
// ============================================================

export const analyzeAchievements = (
  resume: ATSResume
): ATSAchievementAnalysis => {
  const achievements = [
    ...(resume.achievements ?? []),
    ...(resume.experience ?? []).flatMap(
      (item) =>
        item.achievements ?? []
    ),
    ...(resume.internships ?? []).flatMap(
      (item) =>
        item.achievements ?? []
    ),
  ].filter(Boolean);

  const quantifiedAchievements =
    achievements.filter(
      containsMetric
    );

  const impactStatements =
    achievements.filter(
      (achievement) =>
        containsActionVerb(
          achievement
        ) ||
        containsMetric(
          achievement
        )
    );

  const weakAchievements =
    achievements.filter(
      isWeakBullet
    );

  const strongAchievements =
    achievements.filter(
      (achievement) =>
        containsActionVerb(
          achievement
        ) &&
        containsMetric(
          achievement
        )
    );

  const targetRole =
    cleanText(
      resume.targetRole
    );

  const roleAchievementSignals =
    targetRole
      ? getRoleAchievementSignals(
          targetRole
        )
      : [];

  const roleRelevantAchievements =
    roleAchievementSignals.length > 0
      ? achievements.filter(
          (achievement) =>
            roleAchievementSignals.some(
              (signal) =>
                containsNormalizedPhrase(
                  achievement,
                  signal
                )
            )
        )
      : [];

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (
    achievements.length === 0
  ) {
    suggestions.push(
      "Add meaningful achievements where you have measurable results."
    );
  }

  if (
    achievements.length > 0 &&
    quantifiedAchievements.length === 0
  ) {
    suggestions.push(
      "Quantify important achievements with measurable outcomes."
    );
  }

  if (
    hasRoleBenchmark(targetRole) &&
    achievements.length > 0 &&
    roleAchievementSignals.length > 0 &&
    roleRelevantAchievements.length === 0
  ) {
    suggestions.push(
      `Emphasize measurable achievements relevant to ${targetRole}, such as ${roleAchievementSignals.slice(0, 3).join(", ")}.`
    );
  }

  return {
    totalAchievements:
      achievements.length,

    quantifiedAchievements:
      quantifiedAchievements.length,

    impactStatements:
      impactStatements.length,

    weakAchievements:
      uniqueStrings(
        weakAchievements
      ),

    strongAchievements:
      uniqueStrings(
        strongAchievements
      ),

    score: 0,

    issues: uniqueStrings(
      issues
    ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};

// ============================================================
// PROJECT ANALYSIS
// ============================================================

export const analyzeProjects = (
  resume: ATSResume
): ATSProjectAnalysis => {
  const projects =
    resume.projects ?? [];

  const projectsWithTechnologies =
    projects.filter(
      (project) =>
        (project.technologies ??
          []).length > 0
    ).length;

  const projectsWithDescription =
    projects.filter(
      (project) =>
        cleanText(
          project.description
        ).length > 0
    ).length;

  const projectsWithLinks =
    projects.filter(
      (project) =>
        Boolean(
          cleanText(
            project.github
          )
        ) ||
        Boolean(
          cleanText(
            project.link
          )
        )
    ).length;

  const projectsWithImpact =
    projects.filter(
      (project) =>
        containsMetric(
          cleanText(
            project.description
          )
        )
    ).length;

  const projectsWithMetrics =
    projectsWithImpact;

  const weakProjects =
    projects
      .filter(
        (project) =>
          !cleanText(
            project.description
          )
      )
      .map(
        (project) =>
          cleanText(
            project.title
          )
      );

  const strongProjects =
    projects
      .filter(
        (project) =>
          cleanText(
            project.description
          ) &&
          (project.technologies ??
            []).length > 0 &&
          containsMetric(
            cleanText(
              project.description
            )
          )
      )
      .map(
        (project) =>
          cleanText(
            project.title
          )
      );

  const targetRole =
    cleanText(
      resume.targetRole
    );

  const roleProjectSignals =
    targetRole
      ? getRoleProjectSignals(
          targetRole
        )
      : [];

  const roleRelevantProjects =
    roleProjectSignals.length > 0
      ? projects.filter(
          (project) =>
            roleProjectSignals.some(
              (signal) =>
                containsNormalizedPhrase(
                  [
                    project.title,
                    project.role,
                    project.description,
                    ...(project.technologies ?? []),
                  ]
                    .filter(Boolean)
                    .join(" "),
                  signal
                )
            )
        )
      : [];

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (
    projects.length > 0 &&
    projectsWithDescription <
      projects.length
  ) {
    issues.push(
      "Some projects do not have descriptions."
    );
  }

  if (
    projects.length > 0 &&
    projectsWithTechnologies <
      projects.length
  ) {
    suggestions.push(
      "Add relevant technologies to projects."
    );
  }

  if (
    projects.length > 0 &&
    projectsWithImpact === 0
  ) {
    suggestions.push(
      "Describe project outcomes or measurable impact where possible."
    );
  }

  if (
    hasRoleBenchmark(targetRole) &&
    projects.length > 0 &&
    roleProjectSignals.length > 0 &&
    roleRelevantProjects.length === 0
  ) {
    suggestions.push(
      `Highlight projects that genuinely demonstrate ${targetRole}-relevant work such as ${roleProjectSignals.slice(0, 3).join(", ")}.`
    );
  }

  return {
    projectCount:
      projects.length,

    projectsWithTechnologies,

    projectsWithDescription,

    projectsWithLinks,

    projectsWithImpact,

    projectsWithMetrics,

    weakProjects:
      uniqueStrings(
        weakProjects
      ),

    strongProjects:
      uniqueStrings(
        strongProjects
      ),

    score: 0,

    issues: uniqueStrings(
      issues
    ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};

// ============================================================
// EDUCATION ANALYSIS
// ============================================================

export const analyzeEducation = (
  resume: ATSResume
): ATSEducationAnalysis => {
  const education =
    resume.education ?? [];

  const completeEntries =
    education.filter(
      (entry) =>
        Boolean(
          cleanText(
            entry.institution
          )
        ) &&
        Boolean(
          cleanText(
            entry.degree
          )
        ) &&
        Boolean(
          cleanText(
            entry.fieldOfStudy
          )
        )
    ).length;

  const incompleteEntries =
    education.length -
    completeEntries;

  const hasDegree =
    education.some(
      (entry) =>
        Boolean(
          cleanText(
            entry.degree
          )
        )
    );

  const hasInstitution =
    education.some(
      (entry) =>
        Boolean(
          cleanText(
            entry.institution
          )
        )
    );

  const hasFieldOfStudy =
    education.some(
      (entry) =>
        Boolean(
          cleanText(
            entry.fieldOfStudy
          )
        )
    );

  const hasDates =
    education.some(
      (entry) =>
        Boolean(
          entry.startYear
        ) ||
        Boolean(
          entry.endYear
        )
    );

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (education.length === 0) {
    suggestions.push(
      "Add education details when relevant to the role."
    );
  }

  if (incompleteEntries > 0) {
    issues.push(
      "Some education entries are incomplete."
    );
  }

  return {
    educationCount:
      education.length,

    completeEntries,

    incompleteEntries,

    hasDegree,

    hasInstitution,

    hasFieldOfStudy,

    hasDates,

    score: 0,

    issues: uniqueStrings(
      issues
    ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};





export const analyzeDateConsistency = (
  resume: ATSResume
): ATSDateConsistencyAnalysis => {
  const invalidDates: string[] = [];
  const overlappingDates: string[] = [];
  const reversedDateRanges: string[] = [];
  const inconsistentDateFormats: string[] = [];
  const missingDates: string[] = [];

  const issues: string[] = [];
  const suggestions: string[] = [];

  type DateEntry = {
    label: string;
    startDate?: string;
    endDate?: string;
    currentlyActive: boolean;
  };

  const entries: DateEntry[] = [];

  // ------------------------------------------------------------
  // EXPERIENCE
  // ------------------------------------------------------------

  (resume.experience ?? []).forEach(
    (entry, index) => {
      const label =
        cleanText(
          entry.position
        ) ||
        cleanText(
          entry.company
        ) ||
        `Experience ${index + 1}`;

      entries.push({
        label,
        startDate:
          cleanText(
            entry.startDate
          ),
        endDate:
          cleanText(
            entry.endDate
          ),
        currentlyActive:
          entry.currentlyWorking === true,
      });
    }
  );

  // ------------------------------------------------------------
  // INTERNSHIPS
  // ------------------------------------------------------------

  // ------------------------------------------------------------
// INTERNSHIPS
// ------------------------------------------------------------

(resume.internships ?? []).forEach(
  (entry, index) => {
    const label =
      cleanText(
        entry.role
      ) ||
      cleanText(
        entry.company
      ) ||
      `Internship ${index + 1}`;

    entries.push({
      label,
      startDate:
        cleanText(
          entry.startDate
        ),
      endDate:
        cleanText(
          entry.endDate
        ),
      currentlyActive:
        entry.currentlyInterning === true,
    });
  }
);

// ------------------------------------------------------------
// EDUCATION
// ------------------------------------------------------------

(resume.education ?? []).forEach(
  (entry, index) => {
    const label =
      cleanText(
        entry.degree
      ) ||
      cleanText(
        entry.institution
      ) ||
      `Education ${index + 1}`;

    entries.push({
      label,

      startDate:
        entry.startYear
          ? String(
              entry.startYear
            )
          : undefined,

      endDate:
        entry.endYear
          ? String(
              entry.endYear
            )
          : undefined,

      currentlyActive:
        false,
    });
  }
);

// ------------------------------------------------------------
// DATE PARSER
// ------------------------------------------------------------

 

  // ------------------------------------------------------------
  // DATE PARSER
  // ------------------------------------------------------------

  const parseDate = (
    value?: string
  ): Date | null => {
    if (!value) {
      return null;
    }

    const normalized =
      value
        .trim()
        .toLowerCase();

    if (
      normalized ===
        "present" ||
      normalized ===
        "current" ||
      normalized ===
        "now"
    ) {
      return new Date();
    }

    // YYYY
    if (
      /^\d{4}$/.test(
        normalized
      )
    ) {
      const year =
        Number(normalized);

      if (
        year >= 1900 &&
        year <= 2100
      ) {
        return new Date(
          year,
          0,
          1
        );
      }

      return null;
    }

    // YYYY-MM
    if (
      /^\d{4}-\d{1,2}$/.test(
        normalized
      )
    ) {
      const [
        yearString,
        monthString,
      ] = normalized.split(
        "-"
      );

      const year =
        Number(yearString);

      const month =
        Number(monthString);

      if (
        year >= 1900 &&
        year <= 2100 &&
        month >= 1 &&
        month <= 12
      ) {
        return new Date(
          year,
          month - 1,
          1
        );
      }

      return null;
    }

    // MM/YYYY
    if (
      /^\d{1,2}\/\d{4}$/.test(
        normalized
      )
    ) {
      const [
        monthString,
        yearString,
      ] = normalized.split(
        "/"
      );

      const month =
        Number(monthString);

      const year =
        Number(yearString);

      if (
        year >= 1900 &&
        year <= 2100 &&
        month >= 1 &&
        month <= 12
      ) {
        return new Date(
          year,
          month - 1,
          1
        );
      }

      return null;
    }

    // Month YYYY
    const monthYearMatch =
      normalized.match(
        /^(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})$/
      );

    if (monthYearMatch) {
      const months: Record<
        string,
        number
      > = {
        january: 0,
        february: 1,
        march: 2,
        april: 3,
        may: 4,
        june: 5,
        july: 6,
        august: 7,
        september: 8,
        october: 9,
        november: 10,
        december: 11,
      };

      const month =
        months[
          monthYearMatch[1]
        ];

      const year =
        Number(
          monthYearMatch[2]
        );

      return new Date(
        year,
        month,
        1
      );
    }

    const parsed =
      new Date(value);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return null;
    }

    return parsed;
  };

  // ------------------------------------------------------------
  // DATE FORMAT DETECTION
  // ------------------------------------------------------------

  const getDateFormat = (
    value: string
  ): string => {
    const normalized =
      value
        .trim()
        .toLowerCase();

    if (
      /^\d{4}$/.test(
        normalized
      )
    ) {
      return "YYYY";
    }

    if (
      /^\d{4}-\d{1,2}$/.test(
        normalized
      )
    ) {
      return "YYYY-MM";
    }

    if (
      /^\d{1,2}\/\d{4}$/.test(
        normalized
      )
    ) {
      return "MM/YYYY";
    }

    if (
      /^[a-z]+\s+\d{4}$/i.test(
        normalized
      )
    ) {
      return "Month YYYY";
    }

    if (
      normalized ===
        "present" ||
      normalized ===
        "current" ||
      normalized ===
        "now"
    ) {
      return "CURRENT";
    }

    return "OTHER";
  };

  // ------------------------------------------------------------
  // VALIDATE INDIVIDUAL ENTRIES
  // ------------------------------------------------------------

  for (const entry of entries) {
    const {
      label,
      startDate,
      endDate,
      currentlyActive,
    } = entry;

    if (
      !startDate &&
      !endDate
    ) {
      missingDates.push(
        `${label}: missing start and end dates.`
      );

      continue;
    }

    if (!startDate) {
      missingDates.push(
        `${label}: missing start date.`
      );
    }

    if (
      !endDate &&
      !currentlyActive
    ) {
      missingDates.push(
        `${label}: missing end date.`
      );
    }

    if (startDate) {
      const parsedStart =
        parseDate(
          startDate
        );

      if (!parsedStart) {
        invalidDates.push(
          `${label}: invalid start date "${startDate}".`
        );
      } else if (
        parsedStart >
        new Date()
      ) {
        invalidDates.push(
          `${label}: start date "${startDate}" is in the future.`
        );
      }
    }

    if (
      endDate &&
      endDate
        .trim()
        .toLowerCase() !==
        "present"
    ) {
      const parsedEnd =
        parseDate(
          endDate
        );

      if (!parsedEnd) {
        invalidDates.push(
          `${label}: invalid end date "${endDate}".`
        );
      } else if (
        parsedEnd >
        new Date()
      ) {
        invalidDates.push(
          `${label}: end date "${endDate}" is in the future.`
        );
      }
    }

    // ----------------------------------------------------------
    // REVERSED DATE RANGE
    // ----------------------------------------------------------

    if (
      startDate &&
      endDate
    ) {
      const parsedStart =
        parseDate(
          startDate
        );

      const parsedEnd =
        parseDate(
          endDate
        );

      const normalizedEnd =
        endDate
          .trim()
          .toLowerCase();

      if (
        parsedStart &&
        parsedEnd &&
        normalizedEnd !==
          "present" &&
        parsedEnd <
          parsedStart
      ) {
        reversedDateRanges.push(
          `${label}: end date "${endDate}" is before start date "${startDate}".`
        );
      }
    }

    // ----------------------------------------------------------
    // DATE FORMAT
    // ----------------------------------------------------------

    const formats = [
      startDate,
      endDate,
    ]
      .filter(
        (
          value
        ): value is string =>
          Boolean(value)
      )
      .map(
        getDateFormat
      )
      .filter(
        (format) =>
          format !==
          "CURRENT"
      );

    if (
      formats.length > 1
    ) {
      const uniqueFormats =
        uniqueStrings(
          formats
        );

      if (
        uniqueFormats.length >
        1
      ) {
        inconsistentDateFormats.push(
          `${label}: inconsistent date formats used (${uniqueFormats.join(
            ", "
          )}).`
        );
      }
    }
  }

  // ------------------------------------------------------------
  // OVERLAPPING ACTIVE/PERIODS
  // ------------------------------------------------------------

  const datedEntries =
    entries
      .map(
        (entry) => {
          const start =
            entry.startDate
              ? parseDate(
                  entry.startDate
                )
              : null;

          const end =
            entry.endDate
              ? parseDate(
                  entry.endDate
                )
              : entry.currentlyActive
              ? new Date()
              : null;

          return {
            ...entry,
            start,
            end,
          };
        }
      )
      .filter(
        (
          entry
        ): entry is typeof entry & {
          start: Date;
          end: Date;
        } =>
          Boolean(
            entry.start &&
              entry.end
          )
      );

  for (
    let i = 0;
    i < datedEntries.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < datedEntries.length;
      j++
    ) {
      const first =
        datedEntries[i];

      const second =
        datedEntries[j];

      if (
        first.start <=
          second.end &&
        second.start <=
          first.end
      ) {
        overlappingDates.push(
          `${first.label} overlaps with ${second.label}.`
        );
      }
    }
  }

  // ------------------------------------------------------------
  // ISSUES
  // ------------------------------------------------------------

  if (
    invalidDates.length >
    0
  ) {
    issues.push(
      "Invalid or future dates were detected."
    );

    suggestions.push(
      "Correct invalid or future dates before submitting the resume."
    );
  }

  if (
    reversedDateRanges.length >
    0
  ) {
    issues.push(
      "Some date ranges are reversed."
    );

    suggestions.push(
      "Ensure every end date is on or after its start date."
    );
  }

  if (
    overlappingDates.length >
    0
  ) {
    issues.push(
      "Overlapping experience or internship dates were detected."
    );

    suggestions.push(
      "Review overlapping roles and make the timeline clear and accurate."
    );
  }

  if (
    inconsistentDateFormats.length >
    0
  ) {
    issues.push(
      "Inconsistent date formats were detected."
    );

    suggestions.push(
      "Use one consistent date format throughout the resume."
    );
  }

  if (
    missingDates.length >
    0
  ) {
    issues.push(
      "Some experience or internship entries have incomplete dates."
    );

    suggestions.push(
      "Add accurate start and end dates where available."
    );
  }

  // ------------------------------------------------------------
  // SCORE
  // ------------------------------------------------------------

  const totalChecks =
    entries.length * 3;

  const issueCount =
    invalidDates.length +
    reversedDateRanges.length +
    inconsistentDateFormats.length +
    missingDates.length;

  let score = 10;

  if (
    totalChecks > 0
  ) {
    const penalty =
      Math.min(
        10,
        (
          issueCount /
          totalChecks
        ) * 10
      );

    score =
      10 - penalty;
  }

  return {
    invalidDates:
      uniqueStrings(
        invalidDates
      ),

    overlappingDates:
      uniqueStrings(
        overlappingDates
      ),

    reversedDateRanges:
      uniqueStrings(
        reversedDateRanges
      ),

    inconsistentDateFormats:
      uniqueStrings(
        inconsistentDateFormats
      ),

    missingDates:
      uniqueStrings(
        missingDates
      ),

    score: Number(
      Math.max(
        0,
        Math.min(
          10,
          score
        )
      ).toFixed(2)
    ),

    issues:
      uniqueStrings(
        issues
      ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};

// ============================================================
// FORMATTING ANALYSIS
// ============================================================

export const analyzeFormatting = (
  resume: ATSResume
): ATSFormattingAnalysis => {
  const sections =
    resume.sections ?? [];

  const hasContactInfo =
    Boolean(
      resume.personalInfo
    );

  const hasStandardSections =
  sections.some((section) => {
    const sectionName =
      normalizeText(
        section.type ??
          section.id ??
          ""
      );

    return ATS_STANDARD_SECTIONS.some(
      (standardSection) =>
        normalizeText(
          standardSection
        ) === sectionName
    );
  });

  const hasUnusualSectionNames =
    sections.some(
      (section) => {
        const type =
          normalizeText(
            section.type ??
              section.id ??
              ""
          );

        return (
          Boolean(type) &&
          !ATS_STANDARD_SECTIONS.some(
            (standard) =>
              normalizeText(
                standard
              ) === type
          ) &&
          type !== "personalinfo" &&
          type !== "custom"
        );
      }
    );

  const hasEmptySections =
    sections.some(
      (section) =>
        section.enabled !== false &&
        (
          !section.type &&
          !section.id
        )
    );

  const hasExcessiveLinks =
    [
      resume.personalInfo?.linkedIn,
      resume.personalInfo?.github,
      resume.personalInfo?.portfolio,
      ...(resume.projects ?? []).flatMap(
        (project) => [
          project.github,
          project.link,
        ]
      ),
    ].filter(Boolean).length >
    10;

  const allText =
    JSON.stringify(resume);

  const suspiciousCharacters =
    /[�]/.test(allText);

  const hasPotentialParserIssues =
    suspiciousCharacters ||
    hasUnusualSectionNames;

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (
    hasUnusualSectionNames
  ) {
    issues.push(
      "Some non-standard section names may reduce parser consistency."
    );

    suggestions.push(
      "Prefer conventional section headings where possible."
    );
  }

  if (
    hasExcessiveLinks
  ) {
    issues.push(
      "An unusually high number of links was detected."
    );

    suggestions.push(
      "Keep only relevant professional links."
    );
  }

  if (suspiciousCharacters) {
    issues.push(
      "Suspicious replacement characters were detected."
    );

    suggestions.push(
      "Remove corrupted or unsupported characters."
    );
  }

  let score =
    getCategoryMaxScore(
      "formatting"
    );

  if (
    hasUnusualSectionNames
  ) {
    score -= 3;
  }

  if (
    hasExcessiveLinks
  ) {
    score -= 2;
  }

  if (
    suspiciousCharacters
  ) {
    score -= 3;
  }

  return {
    hasContactInfo,

    hasStandardSections,

    hasUnusualSectionNames,

    hasEmptySections,

    hasExcessiveLinks,

hasSuspiciousCharacters:
  suspiciousCharacters,

    hasPotentialParserIssues,

    hasPotentialColumnRisk: false,

    hasPotentialTableRisk: false,

    score: clampATSScore(
      score,
      0,
      getCategoryMaxScore(
        "formatting"
      )
    ),

    issues: uniqueStrings(
      issues
    ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};

// ============================================================
// CATEGORY RESULT BUILDING
// ============================================================

const buildCategoryResults = (
  analysis: {
    contact: ATSContactAnalysis;
    sections: ATSSectionAnalysis;
    skills: ATSSkillsAnalysis;
    keywords: ATSKeywordAnalysis;
    experience: ATSExperienceAnalysis;
    actionVerbs: ATSActionVerbAnalysis;
    quantifiedResults: ATSQuantifiedResultAnalysis;
    formatting: ATSFormattingAnalysis;
  }
): ATSCategoryResult[] => {
  return [
    makeCategoryResult(
      "contact",
      analysis.contact.score,
      "Evaluates essential professional contact information.",
      analysis.contact.issues,
      analysis.contact.suggestions
    ),

    makeCategoryResult(
      "sections",
      analysis.sections.score,
      "Evaluates the completeness and organization of important resume sections.",
      analysis.sections.issues,
      analysis.sections.suggestions
    ),

    makeCategoryResult(
      "skills",
      analysis.skills.score,
      "Evaluates the breadth and organization of listed skills.",
      analysis.skills.issues,
      analysis.skills.suggestions
    ),

    makeCategoryResult(
      "keywords",
      analysis.keywords.score,
      "Evaluates keyword coverage and relevance.",
      analysis.keywords.issues,
      analysis.keywords.suggestions
    ),

    makeCategoryResult(
      "experience",
      analysis.experience.score,
      "Evaluates experience content and achievement quality.",
      analysis.experience.issues,
      analysis.experience.suggestions
    ),

    makeCategoryResult(
      "actionVerbs",
      analysis.actionVerbs.score,
      "Evaluates strong and varied action verbs.",
      analysis.actionVerbs.issues,
      analysis.actionVerbs.suggestions
    ),

    makeCategoryResult(
      "quantifiedResults",
      analysis.quantifiedResults.score,
      "Evaluates measurable professional impact.",
      analysis.quantifiedResults.issues,
      analysis.quantifiedResults.suggestions
    ),

    makeCategoryResult(
      "formatting",
      analysis.formatting.score,
      "Evaluates potential ATS parsing and formatting risks.",
      analysis.formatting.issues,
      analysis.formatting.suggestions
    ),
  ].filter((result) => {
    const category =
      getCategory(
        result.category
      );

    return (
      category?.enabled === true
    );
  });
};

// ============================================================
// GENERIC SCORE CALCULATION
// ============================================================

const calculateOverallScore = (
  categories: ATSCategoryResult[]
): number => {
  const totalMax =
    categories.reduce(
      (sum, category) =>
        sum + category.maxScore,
      0
    );

  const totalScore =
    categories.reduce(
      (sum, category) =>
        sum + category.score,
      0
    );

  if (totalMax <= 0) {
    return 0;
  }

  return Number(
    (
      (totalScore / totalMax) *
      100
    ).toFixed(2)
  );
};

// ============================================================
// RECOMMENDATIONS
// ============================================================

const buildRecommendations = (
  categories: ATSCategoryResult[]
): ATSRecommendation[] => {
  const recommendations: ATSRecommendation[] =
    [];

  for (const category of categories) {
    if (
      category.status ===
      "excellent"
    ) {
      continue;
    }

    const priority =
      category.percentage < 40
        ? "high"
        : category.percentage < 60
          ? "medium"
          : "low";

    for (const issue of category.issues) {
      recommendations.push({
        title:
          `${category.title} needs improvement`,

        description:
          issue,

        priority,

        category:
          category.category,

        impact: Number(
  Math.max(
    0,
    category.maxScore -
      category.score
  ).toFixed(2)
),

        actionable: true,

        suggestedFix:
          category.suggestions[0],
      });
    }
  }

  return recommendations
    .slice(0, 10);
};

// ============================================================
// STRENGTHS
// ============================================================

const buildStrengths = (
  categories: ATSCategoryResult[]
): string[] => {
  return categories
    .filter(
      (category) =>
        category.status ===
          "excellent" ||
        category.status ===
          "good"
    )
    .map(
      (category) =>
        `${category.title}: ${category.summary}`
    )
    .slice(0, 8);
};

// ============================================================
// WEAKNESSES
// ============================================================

const buildWeaknesses = (
  categories: ATSCategoryResult[]
): string[] => {
  return categories
    .filter(
      (category) =>
        category.status ===
          "poor" ||
        category.status ===
          "needs-improvement"
    )
    .flatMap(
      (category) =>
        category.issues.map(
          (issue) =>
            `${category.title}: ${issue}`
        )
    )
    .slice(0, 10);
};

// ============================================================
// MAIN ATS SCORER
// ============================================================

/**
 * Main rule-based ATS analysis.
 *
 * IMPORTANT:
 *
 * This function does NOT call Gemini.
 * It does NOT access MongoDB.
 * It does NOT modify the resume.
 *
 * It only performs deterministic analysis.
 */
export const analyzeResumeATS = (
  resume: ATSResume,
  jobDescription?: string
): ATSRuleAnalysis => {
  const contact =
    analyzeContact(
      resume
    );

  const sections =
    analyzeSections(
      resume
    );

  const skills =
    analyzeSkills(
      resume
    );

  /**
   * General ATS v1 does not have a JD yet.
   *
   * Keyword analysis therefore uses resume-internal
   * terminology for now.
   *
   * JD-specific keyword matching will be implemented
   * separately in the Job Matcher layer.
   */
 const keywordAnalysis =
  analyzeResumeKeywords(
    resume,
    jobDescription
  );

  const experience =
    analyzeExperience(
      resume
    );

  const actionVerbs =
    analyzeActionVerbs(
      resume
    );

  const quantifiedResults =
    analyzeQuantifiedResults(
      resume
    );

  const achievements =
    analyzeAchievements(
      resume
    );

  const projects =
    analyzeProjects(
      resume
    );

  const education =
  analyzeEducation(
    resume
  );

const dateConsistency =
  analyzeDateConsistency(
    resume
  );

const formatting =
  analyzeFormatting(
    resume
  );

  /**
   * Optional detailed analyses are calculated here,
   * but they are not yet independent scoring categories.
   *
   * We will add their category configuration only when
   * we intentionally expand the scoring model.
   */

  const categories =
    buildCategoryResults({
      contact,
      sections,
      skills,
      keywords:
        keywordAnalysis,
      experience,
      actionVerbs,
      quantifiedResults,
      formatting,
    });

  const overallScore =
    calculateOverallScore(
      categories
    );

  const recommendations =
    buildRecommendations(
      categories
    );

  const strengths =
    buildStrengths(
      categories
    );

  const weaknesses =
    buildWeaknesses(
      categories
    );

  const breakdown: ATSBreakdown =
    {};

  for (const category of categories) {
    breakdown[
      category.category
    ] = category.score;
  }

  return {
  overallScore,

  breakdown,

  categories,

  contact,

  sections,

  skills,

  keywords:
    keywordAnalysis,

  experience,

  actionVerbs,

  quantifiedResults,

  achievements,

  projects,

  education,

  dateConsistency,

  formatting,

  strengths,

  weaknesses,

  recommendations,
};
};



// ============================================================
// JD REQUIREMENT MATCHING ENGINE
// ============================================================

const getResumeEvidenceSources = (
  resume: ATSResume
): Array<{
  section: string;
  text: string;
}> => {
  const sources: Array<{
    section: string;
    text: string;
  }> = [];

  if (resume.summary) {
    sources.push({
      section: "summary",
      text: resume.summary,
    });
  }

  for (const skillGroup of resume.skills ?? []) {
    for (const skill of skillGroup.skills ?? []) {
      sources.push({
        section: "skills",
        text: skill,
      });
    }
  }

  for (const experience of resume.experience ?? []) {
    for (const bullet of [
      ...(experience.responsibilities ?? []),
      ...(experience.achievements ?? []),
    ]) {
      sources.push({
        section: "experience",
        text: bullet,
      });
    }
  }

  for (const internship of resume.internships ?? []) {
    for (const bullet of [
      ...(internship.responsibilities ?? []),
      ...(internship.achievements ?? []),
    ]) {
      sources.push({
        section: "internship",
        text: bullet,
      });
    }
  }

  for (const project of resume.projects ?? []) {
    if (project.description) {
      sources.push({
        section: "projects",
        text: project.description,
      });
    }

    for (const technology of project.technologies ?? []) {
      sources.push({
        section: "projects",
        text: technology,
      });
    }
  }

  return sources;
};

const normalizeRequirementForMatch = (
  value: string
): string => {
  return normalizeText(value)
    .replace(/\bnode\s*\.\s*js\b/g, "node.js")
    .replace(/\bnodejs\b/g, "node.js")
    .replace(/\bnode\s+js\b/g, "node.js")

    .replace(/\bexpress\s*\.\s*js\b/g, "express")
    .replace(/\bexpressjs\b/g, "express")

    .replace(/\breact\s*\.\s*js\b/g, "react")
    .replace(/\breactjs\b/g, "react")

    .replace(/\brestful\s+apis?\b/g, "rest api")
    .replace(/\brest\s+apis?\b/g, "rest api")

    .replace(/\bpostgres\b/g, "postgresql")
    .replace(/\bmongo\b/g, "mongodb")

    .trim();
};

const getRequirementAliases = (
  requirement: string
): string[] => {
  const normalized =
    normalizeRequirementForMatch(requirement);

  const aliases = new Set<string>();

  const add = (value: string) => {
    const normalizedValue =
      normalizeRequirementForMatch(value);

    if (normalizedValue) {
      aliases.add(normalizedValue);
    }
  };

  // Always keep original requirement
  add(requirement);

  const aliasMap: Record<string, string[]> = {
    javascript: [
      "javascript",
      "js",
      "ecmascript",
    ],

    typescript: [
      "typescript",
      "ts",
    ],

    "node.js": [
      "node.js",
      "nodejs",
      "node js",
      "node",
    ],

    express: [
      "express",
      "express.js",
      "expressjs",
    ],

    "rest api": [
      "rest api",
      "rest apis",
      "restful api",
      "restful apis",
      "restful",
      "rest api development",
      "restful api development",
      "rest api development using express",
    ],

    "rest api development": [
      "rest api development",
      "rest api",
      "restful api development",
      "restful apis",
      "restful api",
      "restful",
      "developed rest apis",
      "developed restful apis",
      "built rest apis",
      "build rest apis",
    ],

    mongodb: [
      "mongodb",
      "mongo",
      "mongo db",
    ],

    mongoose: [
      "mongoose",
    ],

    postgresql: [
      "postgresql",
      "postgres",
      "postgres db",
    ],

    authentication: [
      "authentication",
      "authenticate",
      "authenticated",
      "auth",
      "jwt authentication",
      "user authentication",
    ],

    authorization: [
      "authorization",
      "authorize",
      "authorized",
      "rbac",
      "role based access control",
      "role-based access control",
    ],

    jwt: [
      "jwt",
      "json web token",
      "json web tokens",
    ],

    redis: [
      "redis",
      "redis cache",
      "redis caching",
    ],

    git: [
      "git",
      "version control",
    ],

    github: [
      "github",
      "git hub",
    ],

    postman: [
      "postman",
      "api testing with postman",
      "api testing",
    ],

    "api testing": [
      "api testing",
      "api tests",
      "tested apis",
      "testing apis",
      "postman",
    ],

    "database schemas": [
      "database schemas",
      "database schema",
      "design database schemas",
      "designed database schemas",
      "database design",
      "designed database",
    ],

    "database design": [
      "database design",
      "database schema",
      "database schemas",
      "designed database",
      "designed database schemas",
    ],

    "api design": [
      "api design",
      "api architecture",
      "rest api design",
      "restful api design",
      "designed apis",
      "designed rest apis",
    ],

    "api architecture": [
      "api architecture",
      "api design",
      "rest api architecture",
      "restful api architecture",
      "designed api architecture",
    ],

    "error handling": [
      "error handling",
      "error handler",
      "exception handling",
      "handled errors",
    ],

    logging: [
      "logging",
      "application logging",
      "error logging",
      "logger",
    ],

    security: [
      "security",
      "backend security",
      "api security",
      "application security",
      "secure apis",
    ],

    scalability: [
      "scalability",
      "scalable",
      "scalable backend",
      "scalable apis",
      "scalable rest apis",
    ],

    caching: [
      "caching",
      "cache",
      "redis caching",
      "redis cache",
    ],

    "problem-solving": [
      "problem solving",
      "problem-solving",
      "problem solving skills",
      "problem-solving skills",
    ],

    debugging: [
      "debugging",
      "debug",
      "debugging skills",
      "debug backend",
    ],

    "ci/cd": [
      "ci/cd",
      "continuous integration",
      "continuous delivery",
      "continuous deployment",
    ],
  };

  // Find aliases by exact normalized key
  for (const [key, values] of Object.entries(aliasMap)) {
    const normalizedKey =
      normalizeRequirementForMatch(key);

    if (
      normalized === normalizedKey ||
      values.some(
        (value) =>
          normalizeRequirementForMatch(value) ===
          normalized
      )
    ) {
      values.forEach(add);
      add(key);
    }
  }

  // ----------------------------------------------------------
  // GENERIC COMPOSITE REQUIREMENT EXPANSION
  // ----------------------------------------------------------

  if (
    normalized.includes("rest api") ||
    normalized.includes("restful api")
  ) {
    add("rest api");
    add("rest apis");
    add("restful api");
    add("restful apis");
    add("restful");
  }

  if (
    normalized.includes("database schema") ||
    normalized.includes("database schemas")
  ) {
    add("database schema");
    add("database schemas");
    add("database design");
  }

  if (
    normalized.includes("authentication")
  ) {
    add("authentication");
    add("auth");
    add("jwt authentication");
  }

  if (
    normalized.includes("authorization") ||
    normalized.includes("rbac")
  ) {
    add("authorization");
    add("rbac");
    add("role based access control");
  }

  if (
    normalized.includes("api testing")
  ) {
    add("api testing");
    add("postman");
  }

  if (
    normalized.includes("security")
  ) {
    add("security");
    add("api security");
    add("backend security");
  }

  return Array.from(aliases);
};

// const findRequirementEvidence = (
//   requirement: string,
//   resume: ATSResume
// ): {
//   status: ATSMatchStatus;
//   evidenceStrength: ATSEvidenceStrength;
//   evidence: string[];
//   sections: string[];
//   confidence: number;
//   explanation: string;
// } => {
//   const sources =
//     getResumeEvidenceSources(resume);

//   const aliases =
//     getRequirementAliases(requirement);

//     if (
//   ["Node.js", "Express.js", "TypeScript"].includes(
//     requirement
//   )
// ) {
//   console.log("========== REQUIREMENT DEBUG ==========");
//   console.log("Requirement:", requirement);
//   console.log(
//     "Normalized requirement:",
//     normalizeRequirementForMatch(requirement)
//   );
//   console.log("Aliases:", aliases);

//   console.log(
//     "Resume sources:",
//     sources.filter((source) =>
//       /node|express|typescript/i.test(
//         source.text
//       )
//     )
//   );

//   console.log("=======================================");
// }

//     const matchedSources: Array<{
//     section: string;
//     text: string;
//   }> = [];

//   for (const source of sources) {
//     const sourceText =
//       normalizeRequirementForMatch(
//         source.text
//       );

//     if (!sourceText) {
//       continue;
//     }

//     const matched =
//       aliases.some((alias) => {
//         const result =
//           containsNormalizedPhrase(
//             sourceText,
//             alias
//           );

//         console.log(
//           "MATCH CHECK:",
//           {
//             requirement,
//             sourceText,
//             alias,
//             result,
//           }
//         );

//         return result;
//       });

//     if (matched) {
//       matchedSources.push(source);
//     }
//   }

//   // ----------------------------------------------------------
//   // NO EVIDENCE
//   // ----------------------------------------------------------

//   if (matchedSources.length === 0) {
//     return {
//       status: "missing",

//       evidenceStrength: "missing",

//       evidence: [],

//       sections: [],

//       confidence: 95,

//       explanation:
//         `"${requirement}" is not demonstrated anywhere in the resume.`,
//     };
//   }

//   const sections =
//     uniqueStrings(
//       matchedSources.map(
//         (item) => item.section
//       )
//     );

//   const evidence =
//     uniqueStrings(
//       matchedSources.map(
//         (item) => item.text
//       )
//     );

//   return {
//     status: "matched",

//     evidenceStrength:
//       matchedSources.length >= 2
//         ? "strong"
//         : "moderate",

//     evidence,

//     sections,

//     confidence:
//       matchedSources.length >= 2
//         ? 95
//         : 85,

//     explanation:
//       `"${requirement}" is demonstrated in the resume through ${sections.join(", ")}.`,
//   };
// };


const findRequirementEvidence = (
  requirement: string,
  resume: ATSResume
): {
  status: ATSMatchStatus;
  evidenceStrength: ATSEvidenceStrength;
  evidence: string[];
  sections: string[];
  confidence: number;
  explanation: string;
} => {
  const sources =
    getResumeEvidenceSources(resume);

  const aliases =
    getRequirementAliases(requirement);

  // ----------------------------------------------------------
  // DEBUG
  // ----------------------------------------------------------

  if (
    ["Node.js", "Express.js", "TypeScript"].includes(
      requirement
    )
  ) {
    console.log(
      "========== REQUIREMENT DEBUG =========="
    );

    console.log(
      "Requirement:",
      requirement
    );

    console.log(
      "Normalized requirement:",
      normalizeRequirementForMatch(
        requirement
      )
    );

    console.log(
      "Aliases:",
      aliases
    );

    console.log(
      "Resume sources:",
      sources.filter((source) =>
        /node|express|typescript/i.test(
          source.text
        )
      )
    );

    console.log(
      "======================================="
    );
  }

  // ----------------------------------------------------------
  // MATCHED SOURCES
  // ----------------------------------------------------------

  const matchedSources: Array<{
    section: string;
    text: string;
  }> = [];

  // ----------------------------------------------------------
  // FIND EVIDENCE
  // ----------------------------------------------------------

  for (const source of sources) {
    const sourceText =
      normalizeRequirementForMatch(
        source.text
      );

    if (!sourceText) {
      continue;
    }

    const matched =
      aliases.some((alias) => {
        const result =
          containsNormalizedPhrase(
            sourceText,
            alias
          );

        // Keep debug only for important requirements.
        if (
          ["Node.js", "Express.js", "TypeScript"].includes(
            requirement
          )
        ) {
          console.log(
            "MATCH CHECK:",
            {
              requirement,
              sourceText,
              alias,
              result,
            }
          );
        }

        return result;
      });

    if (matched) {
      matchedSources.push(source);
    }
  }

  // ----------------------------------------------------------
  // NO EVIDENCE
  // ----------------------------------------------------------

  if (matchedSources.length === 0) {
    return {
      status: "missing",

      evidenceStrength: "missing",

      evidence: [],

      sections: [],

      confidence: 95,

      explanation:
        `"${requirement}" is not demonstrated anywhere in the resume.`,
    };
  }

  // ----------------------------------------------------------
  // BUILD EVIDENCE
  // ----------------------------------------------------------

  const sections =
    uniqueStrings(
      matchedSources.map(
        (item) => item.section
      )
    );

  const evidence =
    uniqueStrings(
      matchedSources.map(
        (item) => item.text
      )
    ).slice(0, 5);

  // ----------------------------------------------------------
  // EVIDENCE LEVEL
  //
  // Experience / Internship
  //      ↓
  // Projects
  //      ↓
  // Skills
  //      ↓
  // Other
  // ----------------------------------------------------------

  const hasExperience =
    sections.includes("experience");

  const hasInternship =
    sections.includes("internship") ||
    sections.includes("internships");

  const hasProject =
    sections.includes("projects");

  const hasSkills =
    sections.includes("skills");

  // ----------------------------------------------------------
  // STRONG EVIDENCE: EXPERIENCE / INTERNSHIP
  // ----------------------------------------------------------

  if (
    hasExperience ||
    hasInternship
  ) {
    return {
      status: "matched",

      evidenceStrength: "strong",

      evidence,

      sections,

      confidence: 95,

      explanation:
        `"${requirement}" is directly demonstrated through practical experience.`,
    };
  }

  // ----------------------------------------------------------
  // STRONG EVIDENCE: PROJECT
  // ----------------------------------------------------------

  if (hasProject) {
    return {
      status: "matched",

      evidenceStrength: "strong",

      evidence,

      sections,

      confidence: 90,

      explanation:
        `"${requirement}" is demonstrated through project work.`,
    };
  }

  // ----------------------------------------------------------
  // PARTIAL EVIDENCE: SKILLS ONLY
  // ----------------------------------------------------------

  if (hasSkills) {
    return {
      status: "partial",

      evidenceStrength: "moderate",

      evidence,

      sections,

      confidence: 80,

      explanation:
        `"${requirement}" is listed in the skills section but lacks supporting evidence in experience or projects.`,
    };
  }

  // ----------------------------------------------------------
  // WEAK EVIDENCE
  // ----------------------------------------------------------

  return {
    status: "partial",

    evidenceStrength: "weak",

    evidence,

    sections,

    confidence: 70,

    explanation:
      `"${requirement}" appears in the resume but has limited supporting evidence.`,
  };
};

// ============================================================
// JD REQUIREMENT MATCHING
// ============================================================

const analyzeJDRequirements = (
  resume: ATSResume,
  jd: ATSJobDescriptionAnalysis
): ATSJobDescriptionAnalysis => {
  const requirements = [
    ...jd.requiredSkills,
    ...jd.preferredSkills,
    ...jd.responsibilities,
    ...jd.softSkills,
    ...jd.tools,
    ...jd.technologies,
    ...jd.domains,
    ...jd.requirements,
  ];

  const uniqueRequirements = Array.from(
    new Map(
      requirements.map((item) => [
        normalizeRequirementForMatch(item.name),
        item,
      ])
    ).values()
  );

  const matches: ATSRequirementMatch[] =
    uniqueRequirements.map((requirement) => {
      const evidence = findRequirementEvidence(
        requirement.name,
        resume
      );

      return {
        requirementId: requirement.id,

      requirement: requirement.name,

        normalizedRequirement:
          normalizeRequirementForMatch(
            requirement.name
          ),

        priority:
          requirement.priority,

        status:
          evidence.status,

        evidenceStrength:
          evidence.evidenceStrength,

        matchedResumeEvidence:
          evidence.evidence,

        matchedResumeSections:
          evidence.sections,

        confidence:
          evidence.confidence,

        explanation:
          evidence.explanation,
      };
    });

  const calculatePercentage = (
    items: ATSRequirementMatch[]
  ): number => {
    if (items.length === 0) {
      return 100;
    }

    let points = 0;

    for (const item of items) {
      if (item.status === "matched") {
        points += 1;
      } else if (item.status === "partial") {
        points += 0.5;
      }
    }

    return Number(
      ((points / items.length) * 100).toFixed(1)
    );
  };

  const requiredMatches = matches.filter(
    (match) => match.priority === "required"
  );

  const preferredMatches = matches.filter(
    (match) => match.priority === "preferred"
  );

 const responsibilityMatches =
  matches.filter((match) =>
    jd.requirements.some(
      (requirement) =>
        requirement.category === "responsibility" &&
        requirement.id === match.requirementId
    )
  );  

  const requiredMatchPercentage =
    calculatePercentage(requiredMatches);

  const preferredMatchPercentage =
    calculatePercentage(preferredMatches);

  const responsibilityMatchPercentage =
    calculatePercentage(responsibilityMatches);

  const overallMatchPercentage = Number(
    (
      requiredMatchPercentage * 0.6 +
      responsibilityMatchPercentage * 0.2 +
      preferredMatchPercentage * 0.2
    ).toFixed(1)
  );

  const criticalMissingRequirements =
    matches
      .filter(
        (match) =>
          match.priority === "required" &&
          match.status === "missing"
      )
      .map(
        (match) => match.requirement
      );

  const partialRequirements =
    matches
      .filter(
        (match) =>
          match.status === "partial"
      )
      .map(
        (match) => match.requirement
      );

  const matchedRequirements =
    matches
      .filter(
        (match) =>
          match.status === "matched"
      )
      .map(
        (match) => match.requirement
      );

  return {
    ...jd,

    matches,

    requiredMatchPercentage,

    preferredMatchPercentage,

    responsibilityMatchPercentage,

    overallMatchPercentage,

    criticalMissingRequirements,

    partialRequirements,

    matchedRequirements,

    issues: [
      ...(jd.issues ?? []),
    ],

    suggestions: [
      ...(jd.suggestions ?? []),
    ],
  };
};


// ============================================================
// JD ANALYSIS + REQUIREMENT MATCHING
// ============================================================

export const analyzeJobDescriptionMatch = (
  resume: ATSResume,
  jd: ATSJobDescriptionAnalysis
): ATSJobDescriptionAnalysis => {
  const allRequirements: ATSJobRequirement[] =
  Array.isArray(jd.requirements)
    ? jd.requirements
    : [];

const uniqueRequirements =
  Array.from(
    new Map(
      allRequirements.map((item) => [
        normalizeRequirementForMatch(
          item.name
        ),
        item,
      ])
    ).values()
  );

  const matches: ATSRequirementMatch[] =
    uniqueRequirements.map((requirement) => {
      const evidence = findRequirementEvidence(
        requirement.name,
        resume
      );

      return {
        requirementId: requirement.id,

        requirement: requirement.name,

        normalizedRequirement:
          normalizeRequirementForMatch(
            requirement.name
          ),

        priority:
          requirement.priority,

        status:
          evidence.status,

        evidenceStrength:
          evidence.evidenceStrength,

        matchedResumeEvidence:
          evidence.evidence,

        matchedResumeSections:
          evidence.sections,

        confidence:
          evidence.confidence,

        explanation:
          evidence.explanation,
      };
    });

  const requiredMatches =
    matches.filter(
      (match) =>
        match.priority === "required"
    );

  const preferredMatches =
    matches.filter(
      (match) =>
        match.priority === "preferred"
    );

  const responsibilityMatches =
    matches.filter((match) =>
      jd.responsibilities.some(
        (responsibility) =>
          normalizeRequirementForMatch(
            responsibility.name
          ) ===
          match.normalizedRequirement
      )
    );

  const calculateMatchPercentage = (
    items: ATSRequirementMatch[]
  ): number => {
    if (items.length === 0) {
      return 100;
    }

    let score = 0;

    for (const item of items) {
      if (item.status === "matched") {
        score += 1;
      } else if (
        item.status === "partial"
      ) {
        score += 0.5;
      }
    }

    return Number(
      (
        (score / items.length) *
        100
      ).toFixed(1)
    );
  };

  const requiredMatchPercentage =
    calculateMatchPercentage(
      requiredMatches
    );

  const preferredMatchPercentage =
    calculateMatchPercentage(
      preferredMatches
    );

  const responsibilityMatchPercentage =
    calculateMatchPercentage(
      responsibilityMatches
    );

  /*
   * Required requirements get the highest weight.
   *
   * 60% Required
   * 20% Responsibilities
   * 10% Preferred
   * 10% Other JD requirements
   */

  const otherMatches =
    matches.filter(
      (match) =>
        !requiredMatches.includes(match) &&
        !preferredMatches.includes(match) &&
        !responsibilityMatches.includes(match)
    );

  const otherMatchPercentage =
    calculateMatchPercentage(
      otherMatches
    );

  const overallMatchPercentage =
    Number(
      (
        requiredMatchPercentage * 0.60 +
        responsibilityMatchPercentage * 0.20 +
        preferredMatchPercentage * 0.10 +
        otherMatchPercentage * 0.10
      ).toFixed(1)
    );

  const criticalMissingRequirements =
    requiredMatches
      .filter(
        (match) =>
          match.status === "missing"
      )
      .map(
        (match) =>
          match.requirement
      );

  const partialRequirements =
    matches
      .filter(
        (match) =>
          match.status === "partial"
      )
      .map(
        (match) =>
          match.requirement
      );

  const matchedRequirements =
    matches
      .filter(
        (match) =>
          match.status === "matched"
      )
      .map(
        (match) =>
          match.requirement
      );

  const issues: string[] = [];

  const suggestions: string[] = [];

  if (
    criticalMissingRequirements.length > 0
  ) {
    issues.push(
      `${criticalMissingRequirements.length} required JD requirement(s) are missing from the resume.`
    );

    suggestions.push(
      `Address required requirements such as ${criticalMissingRequirements
        .slice(0, 5)
        .join(", ")} if you genuinely have experience with them.`
    );
  }

  if (
    responsibilityMatchPercentage < 60
  ) {
    issues.push(
      "Resume experience does not sufficiently demonstrate the responsibilities described in the JD."
    );

    suggestions.push(
      "Rewrite relevant experience and project bullets to demonstrate the JD responsibilities using truthful evidence."
    );
  }

  if (
    requiredMatchPercentage < 70
  ) {
    issues.push(
      `Required-skill match is only ${requiredMatchPercentage}%.`
    );
  }

  if (
    overallMatchPercentage < 70
  ) {
    suggestions.push(
      "Prioritize high-impact missing requirements before optimizing secondary keywords."
    );
  }

  return {
    ...jd,

    matches,

    requiredMatchPercentage,

    preferredMatchPercentage,

    responsibilityMatchPercentage,

    overallMatchPercentage,

    criticalMissingRequirements,

    partialRequirements,

    matchedRequirements,

    issues: Array.from(
      new Set([
        ...(jd.issues ?? []),
        ...issues,
      ])
    ),

    suggestions: Array.from(
      new Set([
        ...(jd.suggestions ?? []),
        ...suggestions,
      ])
    ),
  };
};

// ============================================================
// GENERAL RESUME KEYWORD ANALYSIS
// ============================================================

/**
 * General ATS keyword analysis.
 *
 * IMPORTANT:
 *
 * This is NOT the final JD keyword matcher.
 *
 * Without a Job Description, we cannot honestly say that a
 * keyword is "missing from the job".
 *
 * Therefore this layer checks:
 * - important technical terms already present
 * - repeated terminology
 * - skill coverage
 *
 * JD-specific matching comes later.
 */
const analyzeResumeKeywords = (
  resume: ATSResume,
  jobDescription?: string
): ATSKeywordAnalysis => {
  const targetRole =
    cleanText(
      resume.targetRole
    );

  const roleMatchInfo =
    targetRole
      ? getRoleMatchInfo(
          targetRole
        )
      : null;

  const skillNames =
    flattenStrings(
      (resume.skills ?? []).map(
        (category) =>
          category.skills ?? []
      )
    );

  const technologies =
    (resume.projects ?? []).flatMap(
      (project) =>
        project.technologies ?? []
    );

  const experienceText =
    getExperienceBullets(
      resume
    );

  const projectDescriptions =
    (resume.projects ?? []).map(
      (project) =>
        project.description ?? ""
    );

  const textSources = [
    targetRole,
    resume.summary ?? "",
    ...skillNames,
    ...technologies,
    ...experienceText,
    ...projectDescriptions,
  ];

  const combinedText =
    textSources.join(" ");

  const normalized =
    normalizeText(
      combinedText
    );

  const roleBenchmarkAvailable =
    hasRoleBenchmark(
      targetRole
    );

  const roleKeywordPool =
    roleBenchmarkAvailable
      ? getRoleKeywordPool(
          targetRole
        )
      : [];

  const keywordCandidates =
    uniqueStrings([
      ...skillNames,
      ...technologies,
      ...roleKeywordPool,
    ]);

  const keywordFrequency:
    Record<string, number> =
    {};

  const matchedKeywords:
    string[] = [];

  for (const keyword of keywordCandidates) {
    const normalizedKeyword =
      normalizeText(
        keyword
      );

    if (!normalizedKeyword) {
      continue;
    }

    const escaped =
      normalizedKeyword.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const regex =
      new RegExp(
        `\\b${escaped}\\b`,
        "gi"
      );

    const matches =
      normalized.match(regex) ??
      [];

    const frequency =
      matches.length;

    keywordFrequency[
      keyword
    ] = frequency;

    if (frequency > 0) {
      matchedKeywords.push(
        keyword
      );
    }
  }

  const roleMatchedKeywords =
    roleKeywordPool.filter(
      (keyword) =>
        containsNormalizedPhrase(
          combinedText,
          keyword
        )
    );

  const roleMissingKeywords =
    roleKeywordPool.filter(
      (keyword) =>
        !containsNormalizedPhrase(
          combinedText,
          keyword
        )
    );

  const missingKeywords: string[] =
    [];

  // Role benchmark is the primary source of
  // missing keywords when a known role is supplied.
  if (
    roleBenchmarkAvailable
  ) {
    missingKeywords.push(
      ...roleMissingKeywords
    );
  }

  // Also identify skills that are listed in
  // the structured skill section but absent
  // from the actual resume text.
  const skillsPresentInText =
    uniqueStrings(
      skillNames
    ).filter(
      (skill) =>
        containsNormalizedPhrase(
          combinedText,
          skill
        )
    );

  for (const skill of skillNames) {
    if (
      !skillsPresentInText.some(
        (existing) =>
          normalizeText(
            existing
          ) ===
          normalizeText(
            skill
          )
      )
    ) {
      missingKeywords.push(
        skill
      );
    }
  }

  const roleCoverage =
    roleKeywordPool.length === 0
      ? 0
      : (
          roleMatchedKeywords.length /
          roleKeywordPool.length
        ) * 100;

  const keywordCoverage =
    keywordCandidates.length === 0
      ? 0
      : (
          matchedKeywords.length /
          keywordCandidates.length
        ) * 100;

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (
    keywordCandidates.length === 0
  ) {
    issues.push(
      "Very few role-related keywords were detected."
    );

    suggestions.push(
      "Add relevant skills and technologies that genuinely match your target role."
    );
  }

  if (
    roleBenchmarkAvailable &&
    roleMatchInfo?.matchedProfile
  ) {
    suggestions.push(
      `Role benchmark matched: ${roleMatchInfo.matchedProfile} (${roleMatchInfo.matchScore}% title match).`
    );
  }

  if (
  roleBenchmarkAvailable &&
  roleKeywordPool.length > 0 &&
  roleCoverage < 50
) {
  const resolvedRole =
    roleMatchInfo?.matchedProfile ||
    targetRole;

  issues.push(
    `Only ${Number(
      roleCoverage.toFixed(1)
    )}% of benchmark keywords for ${resolvedRole} are present.`
  );

  suggestions.push(
    `Review missing ${resolvedRole} keywords and add only those that accurately reflect your experience.`
  );
}

  if (
    roleBenchmarkAvailable &&
    roleMissingKeywords.length > 0
  ) {
    suggestions.push(
      `Prioritize relevant missing role terms such as: ${roleMissingKeywords.slice(0, 5).join(", ")}.`
    );
  }

  const baseMaxScore =
    getCategoryMaxScore(
      "keywords"
    );

  let score = 0;

  if (
  roleBenchmarkAvailable &&
  roleKeywordPool.length > 0
) {
  // Role benchmark is the primary signal.
  // General keyword coverage provides a smaller
  // secondary signal.

  score = Number(
    (
      (
        (Math.min(
          roleCoverage,
          100
        ) / 100) * 0.7 +
        (Math.min(
          keywordCoverage,
          100
        ) / 100) * 0.3
      ) * baseMaxScore
    ).toFixed(2)
  );
} else {
  score = Number(
    (
      (keywordCoverage / 100) *
      baseMaxScore
    ).toFixed(2)
  );
}


  const finalMatchedKeywords =
  uniqueStrings(matchedKeywords);

const finalMissingKeywords =
  uniqueStrings(missingKeywords).filter(
    (keyword) =>
      !finalMatchedKeywords.some(
        (matched) =>
          normalizeText(matched) ===
          normalizeText(keyword)
      )
  );

  return {
    keywords:
      uniqueStrings(
        keywordCandidates
      ),

    matchedKeywords:
  finalMatchedKeywords,

missingKeywords:
  finalMissingKeywords,

    keywordFrequency,

    keywordCoverage:
      Number(
        keywordCoverage.toFixed(2)
      ),

    keywordDensity: undefined,

    stuffingDetected: false,

    score: clampATSScore(
      score,
      0,
      baseMaxScore
    ),

    issues: uniqueStrings(
      issues
    ),

    suggestions:
      uniqueStrings(
        suggestions
      ),
  };
};