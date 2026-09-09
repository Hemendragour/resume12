import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

import { useLatestATS, useAnalyzeATS } from "../../../../ats/hooks/useATSScore";
import ATSResultsView from "../../../../ats/components/ATSResultsView";
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

  useEffect(() => {
    if (initialTargetRole && !targetRole) {
      setTargetRole(initialTargetRole);
    }
  }, [initialTargetRole, targetRole]);

  const {
    data: atsResponse,
    isLoading: isATSLoading,
    isError: isATSError,
    refetch: refetchATS,
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
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-4xl overflow-y-auto bg-modal shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top sticky bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-modal/95 px-6 py-4 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-dark">ATS Scanner & Deep Dive</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-dark/60 hover:bg-card hover:text-dark transition"
            aria-label="Close ATS Panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Analysis Form Header Card */}
          <div className="rounded-2xl border border-primary/10 bg-card p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                Target Role <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer, Full Stack Developer..."
                className="w-full rounded-xl border border-primary/10 bg-background px-4 py-2.5 text-sm text-dark placeholder:text-primary/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
              />
            </div>

            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!resumeId || !targetRole.trim() || isAnalyzingATS}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-dark disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
            >
              {isAnalyzingATS ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Analyzing Resume against ATS Standards...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Run ATS Deep Scan</span>
                </>
              )}
            </button>

            {isAnalyzeError && (
              <p className="text-xs font-semibold text-danger">
                ATS analysis failed to complete. Please check the backend connection and try again.
              </p>
            )}
            {isAnalyzeSuccess && (
              <p className="text-xs font-semibold text-success">
                ATS analysis generated and up to date!
              </p>
            )}
          </div>

          {/* Results Area */}
          <div className="w-full">
            {isATSLoading || isAnalyzingATS ? (
              <ATSResultsView result={null} isLoading={true} />
            ) : isATSError ? (
              <ATSResultsView
                result={null}
                isError={true}
                errorMessage="Unable to load previous ATS analysis."
                onRetry={() => refetchATS()}
              />
            ) : ats ? (
              <ATSResultsView result={ats} />
            ) : (
              <div className="rounded-2xl border border-dashed border-primary/20 bg-background/60 p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-dark">
                  Ready to scan your resume
                </h3>
                <p className="mt-1 text-xs text-primary/60 max-w-sm mx-auto">
                  Provide your target role above and optionally paste a job description, then click "Run ATS Deep Scan" to receive scores, deep-dive line fixes, and keyword matching.
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
