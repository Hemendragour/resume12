import { PanelLeftClose } from "lucide-react";

import SectionNavList from "./SectionNavList";

interface Props {
  activeSection: string;
  onSectionChange: (section: string) => void;
  /*
   * Controls visibility in the 768px–1279px band (md but below xl).
   * Ignored below 768px (sidebar is never shown there — the mobile
   * section-list overlay takes over instead) and ignored at 1280px+
   * (sidebar is always shown there — see PINNED_FROM below).
   */
  isOpen: boolean;
  onCollapse: () => void;
}

// Pinned, non-collapsible from 1280px up: it's simply part of the row,
// same as it always was.
const PINNED_FROM = "xl";

// Collapsible band: 768px–1279px. In this band the sidebar never takes
// layout space — open or closed — so it can never squeeze the form.
// When open it drops down as a floating panel over the top of the
// form instead of pushing it sideways.
const OVERLAY_QUERY = "[@media(min-width:768px)_and_(max-width:1279px)]";

export default function EditorSidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onCollapse,
}: Props) {
  return (
    <>
      {/* Light backdrop, overlay band only — lets a tap outside close
          the dropped-down panel without hunting for the collapse icon.
          Never rendered at 1280px+, where the sidebar is pinned. */}
      {isOpen && (
        <div
          className={`hidden ${OVERLAY_QUERY}:block fixed inset-0 z-10 bg-dark/10`}
          onClick={onCollapse}
          aria-hidden="true"
        />
      )}

      <aside
        className={`hidden ${isOpen ? "md:flex" : "md:hidden"} ${PINNED_FROM}:flex
          h-full w-64 bg-modal border-r border-primary/10 flex-col overflow-hidden
          ${OVERLAY_QUERY}:absolute ${OVERLAY_QUERY}:left-0 ${OVERLAY_QUERY}:top-0
          ${OVERLAY_QUERY}:z-20 ${OVERLAY_QUERY}:border-r-0 ${OVERLAY_QUERY}:shadow-2xl
          ${PINNED_FROM}:shrink-0 ${PINNED_FROM}:static ${PINNED_FROM}:shadow-none ${PINNED_FROM}:z-auto`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-primary/10 shrink-0 flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50">
            Sections
          </p>

          {/*
           * Manual collapse control — only useful in the 768px–1279px
           * band, where the sidebar can otherwise be reopened via the
           * arrow tab that appears next to the form. At 1280px+ the
           * sidebar is permanent, so this is hidden there.
           */}
          <button
            type="button"
            onClick={onCollapse}
            className={`hidden md:flex ${PINNED_FROM}:hidden shrink-0 h-6 w-6 items-center justify-center rounded-md text-primary/50 hover:bg-card hover:text-dark transition`}
            aria-label="Hide sections"
            title="Hide sections"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <SectionNavList
            activeSection={activeSection}
            onSectionChange={onSectionChange}
          />
        </div>
      </aside>
    </>
  );
}
