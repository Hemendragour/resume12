// AiActionsMenu.tsx
//
// Mobile/tablet-only dropdown that groups "Generate with AI" and
// "Edit with AI" behind a single button, so the scrollable action
// row in EditorHeader stays short on narrow screens. At `lg` and up
// these two actions are shown as their own buttons instead (see
// EditorHeader), so this component is only ever rendered below `lg`.
//
// The dropdown itself is rendered through a portal into document.body
// rather than as a normal absolutely-positioned child. The button
// lives inside EditorHeader's mobile action row, which scrolls
// horizontally (`overflow-x-auto`) — and per the CSS spec, once one
// axis has an overflow value other than `visible`, the other axis is
// forced to clip too. That was silently cutting the dropdown off
// right where it would appear (just below the button), making it
// look like it opened "underneath" the page. Rendering it into
// document.body with `position: fixed` sidesteps that entirely.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(
    null,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  };

  const toggleOpen = () => {
    if (!open) updatePosition();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    // The menu is short-lived (pick an action and it closes), so on
    // scroll/resize we just close it rather than re-tracking the
    // button's position — simpler, and avoids the menu drifting out
    // of sync with a button that moved.
    const handleScrollOrResize = () => setOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open]);

  const disabledAll = showQuickGenerate || isGenerating;

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleOpen}
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

      {open &&
        menuPos &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: menuPos.top, right: menuPos.right }}
            className="z-50 w-48 rounded-lg border border-primary/10 bg-card shadow-lg py-1.5"
          >
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
                !hasGeneratedWithAI
                  ? "Generate a resume with AI first"
                  : undefined
              }
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-dark/80 transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles size={14} />
              Edit with AI
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
