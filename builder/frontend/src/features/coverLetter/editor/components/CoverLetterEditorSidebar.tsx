import { PanelLeftClose } from "lucide-react";

export type CoverLetterSection = "header" | "body" | "closing";

interface SectionConfig {
  id: CoverLetterSection;
  label: string;
}

const sections: SectionConfig[] = [
  { id: "header", label: "Header & Greeting" },
  { id: "body", label: "Letter Body" },
  { id: "closing", label: "Closing" },
];

interface Props {
  activeSection: CoverLetterSection;
  onSectionChange: (section: CoverLetterSection) => void;
  /*
   * Controls visibility in the 768px–1279px band (md but below xl).
   * Ignored below 768px (sidebar is never shown there — the mobile
   * section-list overlay takes over instead) and ignored at 1280px+
   * (sidebar is always shown there — pinned unconditionally, see the
   * "xl:flex" in both branches below).
   */
  isOpen: boolean;
  onCollapse: () => void;
}

/*
 * IMPORTANT: every class name below is written out as a full, literal
 * string — never assembled from a JS variable (e.g. `${SOME_VAR}:absolute`).
 * Tailwind's build step scans this file's raw text for complete class
 * names; it does not execute the component to see what a variable
 * resolves to. A class built from a variable never appears as literal
 * text anywhere in the file, so Tailwind silently never generates the
 * CSS for it — the class renders in the DOM but does nothing. That
 * previously broke both the 768–1279px overlay behavior and the
 * 1280px+ pin, even though the logic driving `isOpen` was correct.
 */
export default function CoverLetterEditorSidebar({
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
          className="hidden [@media(min-width:768px)_and_(max-width:1279px)]:block fixed inset-0 z-10 bg-btn/10"
          onClick={onCollapse}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${isOpen ? "hidden md:flex xl:flex" : "hidden xl:flex"}
          h-full w-64 bg-section-panel border-r border-heading/15 flex-col overflow-hidden
          [@media(min-width:768px)_and_(max-width:1279px)]:absolute
          [@media(min-width:768px)_and_(max-width:1279px)]:left-0
          [@media(min-width:768px)_and_(max-width:1279px)]:top-0
          [@media(min-width:768px)_and_(max-width:1279px)]:z-20
          [@media(min-width:768px)_and_(max-width:1279px)]:border-r-0
          [@media(min-width:768px)_and_(max-width:1279px)]:shadow-2xl
          xl:shrink-0 xl:static xl:shadow-none xl:z-auto`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-heading/15 shrink-0 flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-heading/70">
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
            className="hidden md:flex xl:hidden shrink-0 h-6 w-6 items-center justify-center rounded-md text-heading/70 hover:bg-navbar hover:text-heading transition"
            aria-label="Hide sections"
            title="Hide sections"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <nav className="flex flex-col divide-y divide-heading/10">
            {sections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => onSectionChange(section.id)}
                  className={`text-left px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-btn text-btn-text"
                      : "text-heading hover:bg-navbar/60"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
