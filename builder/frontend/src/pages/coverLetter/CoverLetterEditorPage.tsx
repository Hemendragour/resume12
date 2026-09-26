import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCoverLetter } from "../../features/coverLetter/editor/hooks/useCoverLetter";
import { useAutoSaveCoverLetter } from "../../features/coverLetter/editor/hooks/useAutoSaveCoverLetter";

import CoverLetterEditorHeader from "../../features/coverLetter/editor/components/CoverLetterEditorHeader";
import CoverLetterEditorSidebar, {
  type CoverLetterSection,
} from "../../features/coverLetter/editor/components/CoverLetterEditorSidebar";
import CoverLetterPreviewPanel from "../../features/coverLetter/editor/components/CoverLetterPreviewPanel";
import CoverLetterDynamicEditorRenderer from "../../features/coverLetter/editor/components/CoverLetterDynamicEditorRenderer";
import ExportCoverLetterPdfButton from "../../features/coverLetter/components/ExportCoverLetterPdfButton";
import RegenerateCoverLetterModal from "../../features/coverLetter/editor/components/RegenerateCoverLetterModal";
import { ChevronRight, List, Loader2, PanelLeftOpen } from "lucide-react";

const sectionLabels: Record<CoverLetterSection, string> = {
  header: "Header & Greeting",
  body: "Letter Body",
  closing: "Closing",
};

const sectionOrder: CoverLetterSection[] = ["header", "body", "closing"];

type MobileTab = "edit" | "preview";

export default function CoverLetterEditorPage() {
  const [activeSection, setActiveSection] =
    useState<CoverLetterSection>("header");
  const [regenerateOpen, setRegenerateOpen] = useState(false);

  // ── Mobile-only navigation state (ignored at md+, where the sidebar + form + preview are all shown together) ──────────────
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const [showMobileSectionList, setShowMobileSectionList] = useState(false);

  // ── Editor sidebar toggle for the 768px–1279px band ─────────────────
  // At that width, sidebar + form + preview together don't fit
  // comfortably as three permanent columns. So: show the sidebar
  // (dropped down over the form, not squeezing it) initially, then
  // collapse it away as soon as the user picks a section, freeing the
  // full width for the form + preview. The arrow tab brings it back.
  // Ignored below 768px (mobile section-list overlay is used instead)
  // and ignored at 1280px+ (sidebar is permanently docked there — see
  // CoverLetterEditorSidebar).
  const [isEditorSidebarOpen, setIsEditorSidebarOpen] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, coverLetter } = useCoverLetter();
  const saveStatus = useAutoSaveCoverLetter();

  const activeSectionLabel = useMemo(() => {
    return sectionLabels[activeSection];
  }, [activeSection]);

  const handleSectionChange = (section: CoverLetterSection) => {
    setActiveSection(section);
    setShowMobileSectionList(false);
    // Collapse the sidebar back down in the 768px–1279px band once a
    // section has actually been picked (see state comment above).
    // Has no effect below 768px or at 1280px+.
    setIsEditorSidebarOpen(false);
  };

  // ── Loading state ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-full flex-col">
        {/* Minimal header skeleton */}
        <div className="h-14 border-b border-primary/10 bg-modal" />
        <div className="flex flex-1 items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={28} className="animate-spin text-primary/50" />
            <p className="text-sm font-medium text-dark/50">
              Loading your cover letter…
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Draft state lost — redirect back to gallery
  if (id === "draft" && !coverLetter) {
    navigate("/cover-letters", { replace: true });
    return null;
  }

  // ── Main editor ────────────────────────────────────────────
  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* ── Overleaf-style topbar ───────────────────── */}
      <CoverLetterEditorHeader
        title={coverLetter?.title ?? "Untitled Cover Letter"}
        saveStatus={saveStatus}
        onRegenerateClick={() => setRegenerateOpen(true)}
        hasContent={!!coverLetter}
        exportButton={coverLetter ? <ExportCoverLetterPdfButton /> : undefined}
      />

      {/* ── Edit / Preview toggle — mobile only (<768px); from md up
          the form and preview are always shown together ── */}
      <div className="flex md:hidden items-center gap-1 border-b border-primary/10 bg-modal px-2 xs:px-3 py-1.5 xs:py-2">
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          className={`flex-1 rounded-lg px-2 xs:px-3 py-1 xs:py-1.5 text-xs xs:text-sm font-semibold transition ${
            mobileTab === "edit"
              ? "bg-primary text-white shadow-sm"
              : "text-dark/60 hover:bg-card"
          }`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 rounded-lg px-2 xs:px-3 py-1 xs:py-1.5 text-xs xs:text-sm font-semibold transition ${
            mobileTab === "preview"
              ? "bg-primary text-white shadow-sm"
              : "text-dark/60 hover:bg-card"
          }`}
        >
          Preview
        </button>
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="relative flex flex-1 overflow-hidden min-h-0">
        {/* ── Left sidebar (sections nav) — permanent at 1280px+,
            a floating overlay in the 768–1279px band ── */}
        <CoverLetterEditorSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={isEditorSidebarOpen}
          onCollapse={() => setIsEditorSidebarOpen(false)}
        />

        {/* ── Top-left "show sections" button ──────
            Positioned at top-left corner when sidebar is collapsed.
            Hidden below md (mobile has its own "Sections" trigger)
            and hidden at 1280px+ (sidebar is permanent there). ── */}
        {!isEditorSidebarOpen && (
          <button
            type="button"
            onClick={() => setIsEditorSidebarOpen(true)}
            className="hidden md:flex xl:hidden absolute left-0 top-0 z-10 h-11 w-10 items-center justify-center rounded-br-lg border border-l-0 border-t-0 border-primary/30 bg-dark text-white shadow-md transition hover:bg-primary"
            aria-label="Show sections"
            title="Show sections"
          >
            <PanelLeftOpen size={16} />
          </button>
        )}

        {/* ── Center: editor form ──────────────────
            1024px–1279px band: the sections sidebar never takes
            layout space in this range (it's an overlay — see
            CoverLetterEditorSidebar), which used to leave the form growing to
            fill almost all the width while the preview stayed
            pinned at a fixed pixel width and looked squeezed. Give
            the form a fixed share instead so the two stay balanced. ── */}
        <main
          className={`flex-1 min-w-0 overflow-y-auto bg-background pb-[env(safe-area-inset-bottom)] ${
            mobileTab === "preview" ? "hidden" : "block"
          } md:block [@media(min-width:1024px)_and_(max-width:1279px)]:flex-none [@media(min-width:1024px)_and_(max-width:1279px)]:w-[58%]`}
        >
          {/* Mobile section-list overlay — replaces the form until a
              section is picked, then hands back to it. Only ever
              shown below 768px; from md up the sections sidebar
              (CoverLetterEditorSidebar) is used instead. */}
          {showMobileSectionList && (
            <div className="md:hidden flex h-full flex-col bg-modal">
              <div className="flex shrink-0 items-center justify-between border-b border-primary/10 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50">
                  Sections
                </p>
                <button
                  type="button"
                  onClick={() => setShowMobileSectionList(false)}
                  className="text-sm font-semibold text-primary hover:text-dark"
                >
                  Done
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
                <nav className="flex flex-col divide-y divide-primary/10">
                  {sectionOrder.map((section) => (
                    <button
                      key={section}
                      type="button"
                      onClick={() => handleSectionChange(section)}
                      className={`text-left px-4 py-3 transition ${
                        activeSection === section
                          ? "bg-primary/5 text-primary font-semibold"
                          : "text-dark/70 hover:bg-card/50"
                      }`}
                    >
                      {sectionLabels[section]}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          <div
            className={`${
              showMobileSectionList ? "hidden lg:block" : "block"
            } flex-1 min-w-0 flex flex-col px-1.5 xs:px-2 sm:px-3 py-3 xs:py-4 sm:py-5`}
          >
            {/* Mobile/tablet trigger to open the section list above —
                md+ never shows this, since the sidebar is already
                visible there. */}
            <button
              type="button"
              onClick={() => setShowMobileSectionList(true)}
              className="md:hidden mb-2 xs:mb-3 flex w-full items-center justify-between rounded-lg border border-primary/15 bg-modal px-2.5 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm font-medium text-dark transition hover:border-primary/30 shrink-0"
            >
              <span className="flex items-center gap-2 truncate">
                <List size={15} className="shrink-0 text-primary/50" />
                <span className="truncate text-[11px] xs:text-xs">
                  {activeSectionLabel}
                </span>
              </span>
              <ChevronRight size={14} className="shrink-0 text-primary/40" />
            </button>

            <div className="flex-1 min-h-0 overflow-y-auto rounded-lg border border-primary/10 bg-modal p-2.5 xs:p-3 sm:p-4">
              <h2 className="mb-1 text-base xs:text-lg sm:text-xl font-bold text-dark">
                {activeSectionLabel}
              </h2>
              <p className="mb-4 xs:mb-5 sm:mb-6 text-[11px] xs:text-xs sm:text-sm text-dark/50">
                Fill this section of your cover letter.
              </p>
              <CoverLetterDynamicEditorRenderer activeSection={activeSection} />
            </div>
          </div>
        </main>

        {/* ── Right: live PDF preview ────────────────── */}
        <CoverLetterPreviewPanel mobileVisible={mobileTab === "preview"} />
      </div>

      {/* ── Regenerate modal ─────────────────────────── */}
      {coverLetter && (
        <RegenerateCoverLetterModal
          open={regenerateOpen}
          onClose={() => setRegenerateOpen(false)}
        />
      )}
    </div>
  );
}
