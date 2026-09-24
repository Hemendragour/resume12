import {
  CheckCircle,
  Loader2,
  AlertCircle,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AiActionsMenu from "./AiActionsMenu";

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
    <header className="shrink-0 border-b border-primary/15 bg-modal shadow-sm z-20">
      {/* ── Row 1: back + title (all sizes); save status + actions (lg+) ── */}
      <div className="flex h-14 items-center justify-between gap-2 px-3">
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
            <div className="flex items-center gap-1.5">
              <p className="hidden sm:block text-xs text-primary/60 leading-tight">
                Resume Editor
              </p>

              {/* Compact save-status indicator — mobile/tablet only.
                  lg+ shows the full text version further right instead. */}
              <span className="lg:hidden flex items-center">
                {saveStatus === "saving" && (
                  <Loader2 size={12} className="animate-spin text-primary/50" />
                )}
                {saveStatus === "saved" && (
                  <CheckCircle size={12} className="text-success" />
                )}
                {saveStatus === "error" && (
                  <AlertCircle size={12} className="text-danger" />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Center: save status (lg+ only) */}
        <div className="hidden lg:flex items-center justify-center min-w-[80px]">
          {saveStatus === "saving" && (
            <div className="flex items-center gap-1.5 text-xs text-primary/70 font-medium">
              <Loader2 size={14} className="animate-spin" />
              <span>Saving…</span>
            </div>
          )}
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-xs text-success font-medium">
              <CheckCircle size={14} />
              <span>Saved</span>
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex items-center gap-1.5 text-xs text-danger font-medium">
              <AlertCircle size={14} />
              <span>Save Failed</span>
            </div>
          )}
        </div>

        {/* Right: action buttons (lg+ only — mobile/tablet get row 2 below) */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onGenerateClick}
            disabled={showQuickGenerate || isGenerating}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent/20 border border-accent/30 px-3 py-1.5 text-xs font-semibold text-dark transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={13} />
            Generate with AI
          </button>

          <button
            type="button"
            onClick={onEditWithAIClick}
            disabled={!hasGeneratedWithAI || showQuickGenerate || isGenerating}
            title={
              !hasGeneratedWithAI
                ? "Generate a resume with AI first"
                : undefined
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent/20 border border-accent/30 px-3 py-1.5 text-xs font-semibold text-dark transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={13} />
            Edit with AI
          </button>

          <button
            type="button"
            onClick={onATSClick}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-dark"
          >
            Analyze ATS
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
      </div>

      {/* ── Row 2: action buttons — mobile/tablet only (below lg) ── */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto px-3 pb-2.5 pt-0.5">
        {exportButton && <div className="shrink-0">{exportButton}</div>}

        <button
          type="button"
          onClick={onATSClick}
          className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-dark"
        >
          Analyze ATS
        </button>

        <AiActionsMenu
          onGenerateClick={onGenerateClick}
          onEditWithAIClick={onEditWithAIClick}
          hasGeneratedWithAI={hasGeneratedWithAI}
          isGenerating={isGenerating}
          showQuickGenerate={showQuickGenerate}
        />
      </div>
    </header>
  );
}
