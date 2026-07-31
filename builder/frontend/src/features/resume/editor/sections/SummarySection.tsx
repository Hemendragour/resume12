import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useResumeStore } from "../../../../store/resume.store";
import { useGenerateSummary } from "../../../ai/hooks/useGenerateSummary";

import { Sparkles, AlertCircle, Trash2 } from "lucide-react";
import Input from "../../../../components/ui/Input";

interface SummaryFormData {
  summary: string;
}

export default function SummarySection() {
  const resume = useResumeStore((state) => state.resume);
  const updateSummary = useResumeStore((state) => state.updateSummary);

  const renameSectionDisplayTitle = useResumeStore(
    (state) => state.renameSectionDisplayTitle,
  );

  const summarySection = resume?.sections.find(
    (section) => section.id === "summary",
  );

  const { mutate, isPending } = useGenerateSummary();

  const [showConfirm, setShowConfirm] = useState(false);

  const { register, reset, watch, setValue } = useForm<SummaryFormData>({
    defaultValues: {
      summary: "",
    },
  });

  const summaryValue = watch("summary");

  // Reset form when resume data changes
  useEffect(() => {
    if (resume?.summary !== undefined) {
      reset({ summary: resume.summary });
    }
  }, [resume?.summary, reset]);

  // Auto-save with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (summaryValue !== resume?.summary) {
        updateSummary(summaryValue);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [summaryValue, resume?.summary, updateSummary]);

  // Manual save on blur
  const handleBlur = useCallback(() => {
    if (summaryValue !== resume?.summary) {
      updateSummary(summaryValue);
    }
  }, [summaryValue, resume?.summary, updateSummary]);

  // Check how much data exists to inform a good summary
  const hasExperience = (resume?.experience?.length ?? 0) > 0;
  const hasSkills = (resume?.skills?.length ?? 0) > 0;
  const hasProjects = (resume?.projects?.length ?? 0) > 0;
  const hasCustomSections = (resume?.customSections?.length ?? 0) > 0;

  const filledCount = [
    hasExperience,
    hasSkills,
    hasProjects,
    hasCustomSections,
  ].filter(Boolean).length;

  const isDataThin = filledCount <= 1;
  const alreadyHasSummary = !!resume?.summary?.trim();

  // AI Generate Handler
  const runGenerate = () => {
    if (!resume?._id) return;

    mutate(resume._id, {
      onSuccess: (generatedSummary) => {
        updateSummary(generatedSummary);
        reset({ summary: generatedSummary });
      },
    });
  };

  const handleGenerateClick = () => {
    if (isDataThin) {
      setShowConfirm(true);
    } else {
      runGenerate();
    }
  };

  return (
    <div className="space-y-6">
      {isDataThin && !isPending && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            Add your <strong>Experience</strong>, <strong>Skills</strong>, and{" "}
            <strong>Projects</strong> first — the AI summary will be much
            stronger with real data to work from. You can still generate now and
            update it later.
          </p>
        </div>
      )}

      <div>
        <div className="flex items-start justify-between gap-6 mb-3">
          <div className="flex-1 space-y-3">
  <Input
    label="Resume Heading"
    placeholder="Career Objective"
    value={summarySection?.displayTitle ?? ""}
    onChange={(e) =>
      renameSectionDisplayTitle(
        "summary",
        e.target.value
      )
    }
  />

  <label className="block font-medium">
    Professional Summary
  </label>
</div>

          <div className="flex items-center gap-2">
            {alreadyHasSummary && (
              <button
                type="button"
                onClick={() => {
                  setValue("summary", "");
                  updateSummary("");
                }}
                className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={handleGenerateClick}
              disabled={isPending || !resume?._id}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Sparkles size={18} />
              {isPending
                ? "Generating..."
                : alreadyHasSummary
                  ? "Regenerate with AI"
                  : "Generate with AI"}
            </button>
          </div>
        </div>

        <textarea
          {...register("summary")}
          rows={8}
          placeholder="Write a short professional summary..."
          className="w-full rounded-xl border p-4 outline-none focus:border-blue-600 resize-y min-h-[180px]"
          onBlur={handleBlur}
        />
      </div>

      <p className="text-sm text-slate-500">
        💡 Tip: Write 3–5 lines highlighting your experience, skills and career
        goals.
      </p>

      {/* Confirm dialog when data is thin */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold">Resume looks a bit empty</h3>
            <p className="mt-2 text-sm text-slate-600">
              Add Experience, Skills, Projects, Education, Certifications, or
              Achievements to help AI generate a stronger, ATS-friendly summary.
              You can regenerate it anytime.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Go Fill Sections
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  runGenerate();
                }}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
              >
                Generate Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
