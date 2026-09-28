import { useState } from "react";
import { X, Sparkles } from "lucide-react";

interface CustomSectionContext {
  whatDone: string;
  problemSolved: string;
  teamRole: string;
  result: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (context: CustomSectionContext) => void;
  loading?: boolean;
}

export default function AICustomSectionContextModal({
  open,
  onClose,
  onSubmit,
  loading,
}: Props) {
  const [form, setForm] = useState<CustomSectionContext>({
    whatDone: "",
    problemSolved: "",
    teamRole: "",
    result: "",
  });

  if (!open) return null;

  const handleChange = (field: keyof CustomSectionContext, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-heading/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-popup p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-subheading" />
            <h3 className="text-lg font-bold">Quick Context</h3>
          </div>
          <button onClick={onClose} className="text-nav-text hover:text-heading/80">
            <X size={20} />
          </button>
        </div>

        <p className="mt-1 text-sm text-nav-text">
          Answer a few quick questions so AI can write a specific, non-generic description.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">1. Ismein exactly kya kiya/banaya?</label>
            <input
              value={form.whatDone}
              onChange={(e) => handleChange("whatDone", e.target.value)}
              placeholder="e.g. Built an AI-based attendance system"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-border-strong"
            />
          </div>

          <div>
            <label className="text-sm font-medium">2. Kaunsa problem/challenge solve kiya?</label>
            <input
              value={form.problemSolved}
              onChange={(e) => handleChange("problemSolved", e.target.value)}
              placeholder="e.g. Manual attendance tracking was slow and error-prone"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-border-strong"
            />
          </div>

          <div>
            <label className="text-sm font-medium">3. Team/role kya tha?</label>
            <input
              value={form.teamRole}
              onChange={(e) => handleChange("teamRole", e.target.value)}
              placeholder="e.g. Team of 4, led backend development"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-border-strong"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              4. Result/achievement? <span className="text-nav-text">(optional)</span>
            </label>
            <input
              value={form.result}
              onChange={(e) => handleChange("result", e.target.value)}
              placeholder="e.g. Won 1st place among 50 teams"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-border-strong"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-navbar"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(form)}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-btn px-4 py-2 text-sm font-medium text-btn-text hover:bg-btn-hover disabled:opacity-50"
          >
            <Sparkles size={16} />
            {loading ? "Generating..." : "Generate Description"}
          </button>
        </div>
      </div>
    </div>
  );
}