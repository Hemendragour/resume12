import { useState } from "react";
import { X } from "lucide-react";

import { useLatestATS, useAnalyzeATS } from "../../../../ats/hooks/useATSScore";
import ATSScoreCard from "../../../../ats/components/ATSScoreCard";
import ATSSuggestions from "../../../../ats/components/ATSSuggestions";
import JobDescriptionInput from "./JobDescriptionInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeId?: string;
  initialTargetRole?: string;
}

export default function ATSPanel({
  isOpen,
  onClose,
  resumeId,
  initialTargetRole = "",
}: Props) {
  const [targetRole, setTargetRole] = useState(initialTargetRole);

  const [jobDescription, setJobDescription] = useState("");

  //   useEffect(() => {
  //     if (initialTargetRole) setTargetRole(initialTargetRole);
  //   }, [initialTargetRole]);

  const {
    data: atsResponse,
    isLoading: isATSLoading,
    isError: isATSError,
  } = useLatestATS(resumeId);

  const {
    mutate: analyzeATS,
    isPending: isAnalyzingATS,
    isError: isAnalyzeError,
    isSuccess: isAnalyzeSuccess,
  } = useAnalyzeATS();

  const ats = atsResponse?.data ?? null;

  const handleAnalyze = () => {
    if (!resumeId || !targetRole.trim()) return;

    analyzeATS({
      resumeId,
      targetRole: targetRole.trim(),
      jobDescription: jobDescription.trim(),
      options: {
        includeAIAnalysis: true,
        includeOptimizedSummary: true,
        includeImprovedExperience: true,
        includeKeywordAnalysis: true,
        includeSemanticAnalysis: true,
        includeParseabilityAnalysis: true,
        includeContentQualityAnalysis: true,
        includeDateConsistencyAnalysis: true,
        includeSeniorityAnalysis: true,
      },
    });
  };

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-dark/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-4xl overflow-y-auto bg-modal shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-card px-6 py-4">
          <h2 className="text-lg font-bold text-dark">ATS Analysis</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-card">
            <X className="h-5 w-5 text-dark/60" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="Target role e.g. Backend Developer"
            className="w-full rounded-xl border border-card bg-background px-4 py-2.5 text-sm text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />

          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
          />

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!resumeId || !targetRole.trim() || isAnalyzingATS}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAnalyzingATS && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {isAnalyzingATS ? "Analyzing..." : "Analyze ATS"}
          </button>

          {isAnalyzeError && (
            <p className="text-sm font-medium text-danger">
              ATS analysis failed. Please try again.
            </p>
          )}
          {isAnalyzeSuccess && (
            <p className="text-sm font-medium text-success">
              ATS analysis completed successfully.
            </p>
          )}

          {isATSLoading && (
            <p className="text-sm text-dark/60">Loading ATS...</p>
          )}
          {isATSError && (
            <p className="text-sm font-medium text-danger">
              Unable to load ATS analysis.
            </p>
          )}

          {!isATSLoading && ats && (
            <>
              <ATSScoreCard score={ats.atsScore} grade={ats.grade} />
              <ATSSuggestions
                recommendations={ats.recommendations}
                strengths={ats.strengths}
                weaknesses={ats.weaknesses}
                matchedKeywords={ats.matchedKeywords}
                missingKeywords={ats.missingKeywords}
              />
            </>
          )}

          {!isATSLoading && !ats && !isATSError && (
            <p className="text-sm text-dark/60">
              Run an analysis to see your ATS score and suggestions here.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
