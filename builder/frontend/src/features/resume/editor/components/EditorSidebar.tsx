import { PanelLeftClose } from "lucide-react";

import SectionNavList from "./SectionNavList";

interface Props {
  activeSection: string;
  onSectionChange: (section: string) => void;
  /*
   * Controls visibility in the 1020px–1250px band (md but below 2xl).
   * Ignored below 1020px (sidebar is never shown there —
   * the mobile section-list overlay takes over instead) and ignored
   * at 1250px+ (sidebar is always shown there, room permitting).
   */
  isOpen: boolean;
  onCollapse: () => void;
}

export default function EditorSidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onCollapse,
}: Props) {
  return (
    <aside
      className={`hidden ${
        isOpen ? "md:flex" : "md:hidden"
      } 2xl:flex h-full w-52 2xl:w-64 bg-modal border-r border-primary/10 shrink-0 flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-primary/10 shrink-0 flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50">
          Sections
        </p>

        {/*
         * Manual collapse control — only useful in the 1020px–1250px band,
         * where the sidebar can otherwise be reopened via the arrow
         * tab that appears next to the form. At 1250px+ the sidebar is
         * permanent, so this is hidden there.
         */}
        <button
          type="button"
          onClick={onCollapse}
          className="hidden md:flex 2xl:hidden shrink-0 h-6 w-6 items-center justify-center rounded-md text-primary/50 hover:bg-card hover:text-dark transition"
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
  );
}
