import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useResumeStore } from "../../../../store/resume.store";
import { useGenerateSummary } from "../../../ai/hooks/useGenerateSummary";

import { Sparkles, AlertCircle } from "lucide-react";
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
      reset({
        summary: resume.summary,
      });
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

  // Check how much data exists
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

        reset({
          summary: generatedSummary,
        });
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
    <div className="w-full min-w-0 space-y-6">
      {/* Thin Data Warning */}
      {isDataThin && !isPending && (
        <div className="flex w-full min-w-0 items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 sm:p-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />

          <p className="min-w-0 text-sm leading-5 text-amber-800">
            Add your <strong>Experience</strong>, <strong>Skills</strong>, and{" "}
            <strong>Projects</strong> first — the AI summary will be much
            stronger with real data to work from. You can still generate now and
            update it later.
          </p>
        </div>
      )}

      {/* Summary Section */}
      <div className="w-full min-w-0">
        {/* Resume Heading */}
        <div className="mb-4 w-full min-w-0">
          <Input
            label="Resume Heading"
            placeholder="Career Objective"
            value={summarySection?.displayTitle ?? ""}
            onChange={(e) =>
              renameSectionDisplayTitle("summary", e.target.value)
            }
          />
        </div>

        {/* Professional Summary + Buttons */}
        <div className="mb-3 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Label */}
          <label className="block shrink-0 font-medium">
            Professional Summary
          </label>

          {/* Action Buttons */}
          <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:w-auto sm:shrink-0">
            {/* Clear */}
            {alreadyHasSummary && (
              <button
                type="button"
                onClick={() => {
                  setValue("summary", "");
                  updateSummary("");
                }}
                className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                {/* <Trash2 size={16} /> */}

                <span className="whitespace-nowrap">Clear</span>
              </button>
            )}

            {/* Generate */}
            <button
              type="button"
              onClick={handleGenerateClick}
              disabled={isPending || !resume?._id}
              className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
            >
              <Sparkles size={18} />

              <span className="whitespace-nowrap">
                {isPending
                  ? "Generating..."
                  : alreadyHasSummary
                    ? "Regenerate with AI"
                    : "Generate with AI"}
              </span>
            </button>
          </div>
        </div>

        {/* Summary Textarea */}
        <textarea
          {...register("summary")}
          rows={8}
          placeholder="Write a short professional summary..."
          className="box-border min-h-[180px] w-full min-w-0 resize-y rounded-xl border p-3 text-sm outline-none transition-colors focus:border-blue-600 sm:p-4 sm:text-base"
          onBlur={handleBlur}
        />
      </div>

      {/* Tip */}
      <p className="text-sm leading-5 text-slate-500">
        💡 Tip: Write 3–5 lines highlighting your experience, skills and career
        goals.
      </p>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">
            <h3 className="text-lg font-bold">Resume looks a bit empty</h3>

            <p className="mt-2 text-sm leading-5 text-slate-600">
              Add Experience, Skills, Projects, Education, Certifications, or
              Achievements to help AI generate a stronger, ATS-friendly summary.
              You can regenerate it anytime.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="w-full rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 sm:w-auto"
              >
                Go Fill Sections
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  runGenerate();
                }}
                className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 sm:w-auto"
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
