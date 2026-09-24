// AiActionsMenu.tsx
//
// Mobile/tablet-only dropdown that groups "Generate with AI" and
// "Edit with AI" behind a single button, so the scrollable action
// row in EditorHeader stays short on narrow screens. At `lg` and up
// these two actions are shown as their own buttons instead (see
// EditorHeader), so this component is only ever rendered below `lg`.
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

interface Props {
  onGenerateClick: () => void;
  onEditWithAIClick: () => void;
  hasGeneratedWithAI: boolean;
  isGenerating: boolean;
  showQuickGenerate: boolean;
}

export default function AiActionsMenu({
  onGenerateClick,
  onEditWithAIClick,
  hasGeneratedWithAI,
  isGenerating,
  showQuickGenerate,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const disabledAll = showQuickGenerate || isGenerating;

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabledAll}
        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-accent/20 border border-accent/30 px-3 py-1.5 text-xs font-semibold text-dark transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles size={13} />
        AI Tools
        <ChevronDown
          size={13}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-48 rounded-lg border border-primary/10 bg-card shadow-lg py-1.5">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onGenerateClick();
            }}
            disabled={disabledAll}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-dark/80 transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={14} />
            Generate with AI
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEditWithAIClick();
            }}
            disabled={!hasGeneratedWithAI || disabledAll}
            title={
              !hasGeneratedWithAI ? "Generate a resume with AI first" : undefined
            }
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-dark/80 transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={14} />
            Edit with AI
          </button>
        </div>
      )}
    </div>
  );
}
