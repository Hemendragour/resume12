import { useState, useMemo } from "react";
import {
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Copy,
  Check,
  Quote,
  TrendingUp,
  Layers,
  HelpCircle,
} from "lucide-react";
import type {
  ATSSectionDeepDive as ATSSectionDeepDiveType,
  ATSSectionDeepDivePriority,
  ATSFinding,
} from "../types/ats.types";

interface Props {
  sections: ATSSectionDeepDiveType[];
  hasJobDescription: boolean;
}

const PRIORITY_ORDER: Record<ATSSectionDeepDivePriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

function getPriorityBadge(priority: ATSSectionDeepDivePriority) {
  switch (priority) {
    case "critical":
      return {
        label: "Critical Priority",
        badgeClass: "bg-danger/15 text-danger border-danger/30",
        headerBorderClass: "border-danger/30",
      };
    case "high":
      return {
        label: "High Priority",
        badgeClass: "bg-warning/15 text-warning border-warning/30",
        headerBorderClass: "border-warning/30",
      };
    case "medium":
      return {
        label: "Medium Priority",
        badgeClass: "bg-accent/20 text-dark border-accent/40",
        headerBorderClass: "border-accent/30",
      };
    case "low":
    default:
      return {
        label: "Low Priority",
        badgeClass: "bg-primary/10 text-primary/70 border-primary/20",
        headerBorderClass: "border-primary/20",
      };
  }
}

// Sub-component for individual finding card
function FindingCard({
  finding,
  isMuted = false,
}: {
  finding: ATSFinding;
  isMuted?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isExcellent = finding.verdict === "excellent";

  if (isExcellent) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 p-3 text-xs text-success">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        <span className="font-semibold">{finding.targetText}</span>
        <span className="text-success/70">— Strong impact & phrasing</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-4 space-y-3.5 transition ${
        isMuted
          ? "border-primary/10 bg-background/60 opacity-90"
          : "border-primary/15 bg-background shadow-xs"
      }`}
    >
      {/* Target Text (Quoted / Muted) */}
      {finding.targetText && (
        <div className="flex items-start gap-2.5 rounded-lg bg-card/40 p-3 border border-primary/10">
          <Quote className="h-4 w-4 shrink-0 text-primary/40 mt-0.5" />
          <p className="text-xs italic text-primary/80 leading-relaxed font-mono">
            "{finding.targetText}"
          </p>
        </div>
      )}

      {/* Problems Tags */}
      {finding.problems && finding.problems.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-danger/80 mr-1">
            Issues:
          </span>
          {finding.problems.map((problem, pIdx) => (
            <span
              key={`${finding.id}-prob-${pIdx}`}
              className="inline-flex items-center rounded-md border border-danger/25 bg-danger/10 px-2 py-0.5 text-[11px] font-medium text-danger"
            >
              {problem}
            </span>
          ))}
        </div>
      )}

      {/* Why It Matters */}
      {finding.whyItMatters && (
        <div className="text-xs text-primary/90 leading-relaxed">
          <span className="font-semibold text-dark">Why it matters: </span>
          <span>{finding.whyItMatters}</span>
        </div>
      )}

      {/* Suggested Fix / Rewrite Block */}
      {finding.suggestedFix && (
        <div className="rounded-xl border border-accent/40 bg-accent/10 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-dark">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Suggested Rewrite</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(finding.suggestedFix)}
              className="inline-flex items-center gap-1 rounded-md bg-card px-2 py-1 text-[11px] font-medium text-dark hover:bg-modal transition border border-primary/10"
              title="Copy rewrite to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-success" />
                  <span className="text-success">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 text-primary/60" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs font-medium text-dark leading-relaxed font-sans bg-modal/70 p-2.5 rounded-lg border border-accent/20">
            {finding.suggestedFix}
          </p>
        </div>
      )}

      {/* Quantification Examples */}
      {finding.needsQuantification &&
        finding.quantificationExamples &&
        finding.quantificationExamples.length > 0 && (
          <div className="rounded-xl border border-warning/30 bg-warning/5 p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-warning">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Metric & Quantification Templates</span>
            </div>
            <p className="text-[11px] text-primary/70">
              Customize these illustrative templates with your actual figures:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-xs text-primary/80">
              {finding.quantificationExamples.map((ex, exIdx) => (
                <li key={`${finding.id}-ex-${exIdx}`}>{ex}</li>
              ))}
            </ul>
          </div>
        )}

      {/* Optional Advisory JD Alignment Tip */}
      {finding.jdAlignmentTip && (
        <div className="rounded-xl border border-primary/15 bg-card/40 p-3 flex items-start gap-2 text-xs text-primary/80">
          <HelpCircle className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
          <div>
            <span className="font-semibold text-dark">Job Description Tip (Advisory): </span>
            <span>{finding.jdAlignmentTip}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ATSSectionDeepDive({
  sections,
  hasJobDescription,
}: Props) {
  // Sort sections strictly by priority (critical -> high -> medium -> low)
  const sortedSections = useMemo(() => {
    return [...sections].sort((a, b) => {
      const pA = PRIORITY_ORDER[a.priority] ?? 99;
      const pB = PRIORITY_ORDER[b.priority] ?? 99;
      if (pA !== pB) return pA - pB;
      return a.percentage - b.percentage;
    });
  }, [sections]);

  // Open first 2 sections by default, or critical/high ones
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sortedSections.forEach((sec, idx) => {
      if (idx < 2 || sec.priority === "critical" || sec.priority === "high") {
        initial[sec.sectionId] = true;
      }
    });
    return initial;
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="border-b border-primary/10 pb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold text-dark">Section-wise Deep Dive</h2>
        </div>
        <p className="mt-1 text-xs text-primary/70">
          {hasJobDescription
            ? "Detailed, line-by-line review of each resume section ordered by optimization priority against the job description."
            : "Detailed, line-by-line review of each resume section ordered by optimization priority."}
        </p>
      </div>

      {/* Accordion Panels */}
      <div className="mt-6 space-y-4">
        {sortedSections.map((sec) => {
          const isExpanded = !!expandedSections[sec.sectionId];
          const priorityInfo = getPriorityBadge(sec.priority);
          const isSkillsSection = sec.sectionId === "skills";
          const isOptimizedAndEmpty =
            sec.isFullyOptimized && (!sec.findings || sec.findings.length === 0);

          return (
            <div
              key={sec.sectionId}
              className="overflow-hidden rounded-xl border border-primary/10 bg-background transition-all hover:border-primary/20"
            >
              {/* Panel Header */}
              <button
                type="button"
                onClick={() => toggleSection(sec.sectionId)}
                className="w-full p-4 text-left transition hover:bg-card/20 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-bold text-dark">{sec.title}</span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${priorityInfo.badgeClass}`}
                  >
                    {priorityInfo.label}
                  </span>

                  {sec.isFullyOptimized && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-semibold text-success">
                      <CheckCircle2 className="h-3 w-3" /> Fully Optimized ✓
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary/60">
                      Score:
                    </span>
                    <span className="text-sm font-bold text-dark">
                      {Math.round(sec.percentage)}%
                    </span>
                  </div>

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg bg-card text-dark transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </button>

              {/* Panel Content */}
              {isExpanded && (
                <div className="border-t border-primary/10 bg-card/20 p-5 space-y-4">
                  {/* Fully Optimized compact state */}
                  {isOptimizedAndEmpty ? (
                    <div className="flex items-center gap-2.5 rounded-xl border border-success/30 bg-success/10 p-4 text-xs font-semibold text-success">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>
                        This section is fully optimized and conforms to industry ATS standards.
                      </span>
                    </div>
                  ) : isSkillsSection && sec.skillsBreakdown ? (
                    /* SPECIAL CASE: skillsBreakdown rendering */
                    <div className="space-y-5">
                      {/* 1. Skills you have (requiredPresent) */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-success mb-2.5 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Skills You Have ({sec.skillsBreakdown.requiredPresent.length})</span>
                        </h4>
                        {sec.skillsBreakdown.requiredPresent.length === 0 ? (
                          <p className="text-xs text-primary/50">
                            No verified matching skills identified in this section.
                          </p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {sec.skillsBreakdown.requiredPresent.map((skill, sIdx) => (
                              <span
                                key={`req-pres-${skill}-${sIdx}`}
                                className="inline-flex items-center gap-1 rounded-lg border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success"
                              >
                                <Check className="h-3 w-3 stroke-[2.5]" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 2. Required skills missing (requiredMissing) */}
                      {sec.skillsBreakdown.requiredMissing.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-danger flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>
                              Required Skills Missing ({sec.skillsBreakdown.requiredMissing.length})
                            </span>
                          </h4>
                          <div className="space-y-3">
                            {sec.skillsBreakdown.requiredMissing.map((finding) => (
                              <FindingCard key={finding.id} finding={finding} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Good to have (goodToHave) */}
                      {sec.skillsBreakdown.goodToHave.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary/70 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-accent" />
                            <span>
                              Good to Have / Preferred ({sec.skillsBreakdown.goodToHave.length})
                            </span>
                          </h4>
                          <div className="space-y-3">
                            {sec.skillsBreakdown.goodToHave.map((finding) => (
                              <FindingCard key={finding.id} finding={finding} isMuted />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Standard Findings list */
                    <div className="space-y-3.5">
                      {sec.findings && sec.findings.length > 0 ? (
                        sec.findings.map((finding) => (
                          <FindingCard key={finding.id} finding={finding} />
                        ))
                      ) : (
                        <div className="flex items-center gap-2 rounded-xl bg-success/10 p-3.5 text-xs text-success font-medium">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>No critical issues found in this section.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
