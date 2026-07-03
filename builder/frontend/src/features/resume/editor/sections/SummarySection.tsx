import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Sparkles } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";
import { useGenerateSummary } from "../../../ai/hooks/useGenerateSummary";

interface SummaryFormData {
  summary: string;
}

export default function SummarySection() {
  const resume = useResumeStore((state) => state.resume);
  const updateSummary = useResumeStore((state) => state.updateSummary);

  const { mutate, isPending } = useGenerateSummary();

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

  // AI Generate Handler
  const handleGenerate = () => {
    if (!resume?._id) return;

    mutate(resume._id, {
      onSuccess: (generatedSummary) => {
        updateSummary(generatedSummary);
        reset({ summary: generatedSummary }); // Update form value
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block font-medium">Professional Summary</label>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isPending || !resume?._id}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles size={18} />
            {isPending ? "Generating..." : "Generate with AI"}
          </button>
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
    </div>
  );
}