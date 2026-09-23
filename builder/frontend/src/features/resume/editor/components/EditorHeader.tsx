// EditorHeader.tsx
import {
  CheckCircle,
  Loader2,
  AlertCircle,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  saveStatus: "idle" | "saving" | "saved" | "error";
  onGenerateClick: () => void;
  onEditWithAIClick: () => void;
  onATSClick: () => void;
  hasGeneratedWithAI: boolean;
  isGenerating: boolean;
  showQuickGenerate: boolean;
  exportButton?: React.ReactNode;
}

export default function EditorHeader({
  title,
  saveStatus,
  onGenerateClick,
  onEditWithAIClick,
  onATSClick,
  hasGeneratedWithAI,
  isGenerating,
  showQuickGenerate,
  exportButton,
}: Props) {
  const navigate = useNavigate();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-primary/15 bg-modal px-3 gap-2 shadow-sm z-20">
      {/* Left: back + title */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={() => navigate(-1)}
          className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg text-primary/60 hover:bg-card hover:text-dark transition"
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-dark leading-tight max-w-[160px] sm:max-w-[240px] lg:max-w-[320px]">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-primary/60 leading-tight">
            Resume Editor
          </p>
        </div>
      </div>

      {/* Center: save status */}
      <div className="flex items-center justify-center min-w-[80px]">
        {saveStatus === "saving" && (
          <div className="flex items-center gap-1.5 text-xs text-primary/70 font-medium">
            <Loader2 size={14} className="animate-spin" />
            <span className="hidden sm:inline">Saving…</span>
          </div>
        )}
        {saveStatus === "saved" && (
          <div className="flex items-center gap-1.5 text-xs text-success font-medium">
            <CheckCircle size={14} />
            <span className="hidden sm:inline">Saved</span>
          </div>
        )}
        {saveStatus === "error" && (
          <div className="flex items-center gap-1.5 text-xs text-danger font-medium">
            <AlertCircle size={14} />
            <span className="hidden sm:inline">Save Failed</span>
          </div>
        )}
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onGenerateClick}
          disabled={showQuickGenerate || isGenerating}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-accent/20 border border-accent/30 px-3 py-1.5 text-xs font-semibold text-dark transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles size={13} />
          <span className="hidden md:inline">Generate with AI</span>
          <span className="md:hidden">Generate</span>
        </button>

        <button
          type="button"
          onClick={onEditWithAIClick}
          disabled={!hasGeneratedWithAI || showQuickGenerate || isGenerating}
          title={
            !hasGeneratedWithAI ? "Generate a resume with AI first" : undefined
          }
          className="hidden lg:inline-flex items-center gap-1.5 rounded-lg bg-accent/20 border border-accent/30 px-3 py-1.5 text-xs font-semibold text-dark transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles size={13} />
          Edit with AI
        </button>

        <button
          type="button"
          onClick={onATSClick}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-dark"
        >
          <span className="hidden sm:inline">Analyze ATS</span>
          <span className="sm:hidden">ATS</span>
        </button>

        {exportButton && (
          <div
            className="origin-right overflow-hidden"
            style={{ transform: "scale(0.82)", marginRight: "-4px" }}
          >
            {exportButton}
          </div>
        )}
      </div>
    </header>
  );
}
