import { useState } from "react";
import { X, Sparkles } from "lucide-react";

interface ExperienceContext {
  workedOn: string;
  technologies: string;
  scope: string;
  impact: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (context: ExperienceContext) => void;
  loading?: boolean;
}

export default function AIQuickContextModal({
  open,
  onClose,
  onSubmit,
  loading,
}: Props) {
  const [form, setForm] = useState<ExperienceContext>({
    workedOn: "",
    technologies: "",
    scope: "",
    impact: "",
  });

  if (!open) return null;

  const handleChange = (field: keyof ExperienceContext, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-violet-600" />
            <h3 className="text-lg font-bold">Quick Context</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Answer a few quick questions so AI can write specific, non-generic
          bullet points.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">
              1. Aapne kispe kaam kiya?
            </label>
            <input
              value={form.workedOn}
              onChange={(e) => handleChange("workedOn", e.target.value)}
              placeholder="e.g. E-commerce checkout flow, admin dashboard"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              2. Kaunsi technology/tools use ki?
            </label>
            <input
              value={form.technologies}
              onChange={(e) => handleChange("technologies", e.target.value)}
              placeholder="e.g. React, Node.js, MongoDB"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              3. Scope/scale kya tha?
            </label>
            <input
              value={form.scope}
              onChange={(e) => handleChange("scope", e.target.value)}
              placeholder="e.g. Solo project, team of 4, 50K+ users"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              4. Koi specific result/impact?{" "}
              <span className="text-slate-400">(optional)</span>
            </label>
            <input
              value={form.impact}
              onChange={(e) => handleChange("impact", e.target.value)}
              placeholder="e.g. Reduced load time by 30%, N/A if unsure"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            <Sparkles size={16} />
            {loading ? "Generating..." : "Generate Bullets"}
          </button>
        </div>
      </div>
    </div>
  );
}
