import { useState } from "react";
import { X, Sparkles } from "lucide-react";

interface ProjectContext {
  whatBuilt: string;
  problemSolved: string;
  teamSize: string;
  impact: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (context: ProjectContext) => void;
  loading?: boolean;
}

export default function AIProjectContextModal({
  open,
  onClose,
  onSubmit,
  loading,
}: Props) {
  const [form, setForm] = useState<ProjectContext>({
    whatBuilt: "",
    problemSolved: "",
    teamSize: "",
    impact: "",
  });

  if (!open) return null;

  const handleChange = (field: keyof ProjectContext, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
          Answer a few quick questions so AI can write a specific, non-generic
          description.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">
              1. Project mein exactly kya banaya?
            </label>
            <input
              value={form.whatBuilt}
              onChange={(e) => handleChange("whatBuilt", e.target.value)}
              placeholder="e.g. AI-powered resume builder with 50+ templates"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              2. Kaunsa problem solve kiya / key feature?
            </label>
            <input
              value={form.problemSolved}
              onChange={(e) => handleChange("problemSolved", e.target.value)}
              placeholder="e.g. Real-time ATS scoring, drag-and-drop editor"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">3. Team size / role?</label>
            <input
              value={form.teamSize}
              onChange={(e) => handleChange("teamSize", e.target.value)}
              placeholder="e.g. Solo project, team of 3"
              className="mt-1.5 h-11 w-full rounded-lg border px-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              4. Koi result/impact?{" "}
              <span className="text-slate-400">(optional)</span>
            </label>
            <input
              value={form.impact}
              onChange={(e) => handleChange("impact", e.target.value)}
              placeholder="e.g. 500+ users, reduced load time by 30%"
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
            onClick={() => onSubmit(form)}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            <Sparkles size={16} />
            {loading ? "Generating..." : "Generate Description"}
          </button>
        </div>
      </div>
    </div>
  );
}
