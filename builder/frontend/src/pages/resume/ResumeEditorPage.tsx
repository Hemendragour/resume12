import { useEffect, useMemo, useState } from "react";

import { useResume } from "../../features/resume/editor/hooks/useResume";
import { useAutoSave } from "../../features/resume/editor/hooks/useAutoSave";

import EditorHeader from "../../features/resume/editor/components/EditorHeader";
import EditorSidebar from "../../features/resume/editor/components/EditorSidebar";
import SectionNavList from "../../features/resume/editor/components/SectionNavList";
import PreviewPanel from "../../features/resume/editor/components/PreviewPanel";
import DynamicEditorRenderer from "../../features/resume/editor/components/DynamicEditorRenderer";
import ATSPanel from "../../features/resume/editor/components/ATSPanel/ATSPanel";

import ExportPdfButton from "../../features/resume/components/ExportPdfButton";
import { useResumeStore } from "../../store/resume.store";
import { useGenerateFullResume } from "../../features/ai/hooks/useGenerateGeneralResume";
import type { QuickGenerateFormData } from "../../features/ai/services/generate-general-resume.service";
import { mapGeneratedResumeToResume } from "../../features/resume/editor/utils/mapGeneratedResume";
import GenerateResumeLoader from "../../features/resume/editor/components/GenerateGeneralResumeLoader";
import QuickGenerateForm from "../../features/resume/editor/components/GenerateGeneralResumeForm";
import { mapResumeToQuickGenerateFormData } from "../../features/resume/editor/utils/mapResumeToGenerateForm";
import { useLocation } from "react-router-dom";
import { ChevronRight, List, Loader2, PanelLeftOpen } from "lucide-react";

type MobileTab = "edit" | "preview";

export default function ResumeEditorPage() {
  const [activeSection, setActiveSection] = useState("personal");

  const { loading, resume, resumeId } = useResume();
  const saveStatus = useAutoSave();
  const setResume = useResumeStore((state) => state.setResume);

  const [isATSPanelOpen, setIsATSPanelOpen] = useState(false);
  const [showQuickGenerate, setShowQuickGenerate] = useState(false);
  const [formInitialData, setFormInitialData] = useState<
    QuickGenerateFormData | undefined
  >(undefined);

  // ── Mobile-only navigation state (ignored at md+/768px and up,
  // where the sidebar + form + preview are all shown together) ──────
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
  // EditorSidebar).
  const [isEditorSidebarOpen, setIsEditorSidebarOpen] = useState(true);

  const hasGeneratedWithAI = resumeId
    ? localStorage.getItem(`ai-generated:${resumeId}`) === "true"
    : false;

  const { mutateAsync: generateResume, isPending: isGenerating } =
    useGenerateFullResume();

  const openGenerate = () => {
    setFormInitialData(undefined);
    setShowQuickGenerate(true);
  };

  const openEditWithAI = () => {
    if (!resume) return;
    setFormInitialData(mapResumeToQuickGenerateFormData(resume));
    setShowQuickGenerate(true);
  };

  const handleGenerate = async (formData: QuickGenerateFormData) => {
    setShowQuickGenerate(false);
    try {
      const generated = await generateResume(formData);
      if (resume) {
        setResume(mapGeneratedResumeToResume(resume, generated));
      }
      if (resumeId) {
        localStorage.setItem(`ai-generated:${resumeId}`, "true");
      }
    } catch (error) {
      console.error("Resume generation failed:", error);
      alert(
        "Something went wrong while generating your resume. Please try again.",
      );
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.openAts) {
      setIsATSPanelOpen(true);
    }
  }, [location.state]);

  // Friendly label for the active section — used both as the form's
  // heading and as the mobile "Sections" trigger button's label.
  // Falls back to the raw id for anything unrecognized.
  const activeSectionLabel = useMemo(() => {
    if (activeSection === "templates") return "Templates";
    if (activeSection === "settings") return "Settings";

    const match = resume?.sections.find((section) =>
      section.type === "custom"
        ? section.id === activeSection
        : section.type === activeSection,
    );

    return match?.displayTitle || match?.title || activeSection;
  }, [activeSection, resume]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setShowMobileSectionList(false);
    // Collapse the sidebar back down in the 768px–1279px band once a
    // section has actually been picked (see state comment above).
    // Has no effect below 768px or at 1280px+.
    setIsEditorSidebarOpen(false);
  };

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-full flex-col">
        {/* Minimal header skeleton */}
        <div className="h-14 border-b border-primary/10 bg-modal" />
        <div className="flex flex-1 items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={28} className="animate-spin text-primary/50" />
            <p className="text-sm font-medium text-dark/50">
              Loading your resume…
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main editor ───────────────────────────────────────────
  return (
    /*
     * Outer shell: MainLayout gives this route an exact, edge-to-edge
     * `flex-1 min-h-0 overflow-hidden` slot below the (always-compact,
     * hamburger-only) navbar — no page padding to cancel out and no
     * viewport-height math to keep in sync with the navbar's height
     * at each breakpoint. We just fill it.
     */
    <div className="flex h-full min-h-0 flex-col">

      {/* ── Overleaf-style topbar ───────────────────── */}
      <EditorHeader
        title={resume?.title ?? "Untitled Resume"}
        saveStatus={saveStatus}
        onGenerateClick={openGenerate}
        onEditWithAIClick={openEditWithAI}
        onATSClick={() => setIsATSPanelOpen(true)}
        hasGeneratedWithAI={hasGeneratedWithAI}
        isGenerating={isGenerating}
        showQuickGenerate={showQuickGenerate}
        exportButton={resume ? <ExportPdfButton /> : undefined}
      />

      {/* ── Edit / Preview toggle — mobile only (<768px); from md up
          the form and preview are always shown together ── */}
      {!showQuickGenerate && (
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
      )}

      {/* ── Body ─────────────────────────────────────── */}
      {showQuickGenerate ? (
        /* Quick Generate takes over the full body */
        <div className="flex-1 overflow-y-auto bg-background px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <QuickGenerateForm
              onGenerate={handleGenerate}
              onCancel={() => setShowQuickGenerate(false)}
              initialData={formInitialData}
            />
          </div>
        </div>
      ) : (
        <div className="relative flex flex-1 overflow-hidden min-h-0">
          {/* ── Left sidebar (sections nav) — permanent at 1280px+,
              a floating overlay in the 768–1279px band ── */}
          <EditorSidebar
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
              EditorSidebar), which used to leave the form growing to
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
                (EditorSidebar) is used instead. */}
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
                  <SectionNavList
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                  />
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
                {isGenerating ? (
                  <GenerateResumeLoader />
                ) : (
                  <>
                    <h2 className="mb-1 text-base xs:text-lg sm:text-xl font-bold text-dark">
                      {activeSectionLabel}
                    </h2>
                    <p className="mb-4 xs:mb-5 sm:mb-6 text-[11px] xs:text-xs sm:text-sm text-dark/50">
                      Fill this section of your resume.
                    </p>
                    <DynamicEditorRenderer activeSection={activeSection} />
                  </>
                )}
              </div>
            </div>
          </main>

          {/* ── Right: live PDF preview ────────────── */}
          <PreviewPanel mobileVisible={mobileTab === "preview"} />
        </div>
      )}

      {/* ── ATS Panel (slide-over) ───────────────── */}
      <ATSPanel
        key={resumeId}
        isOpen={isATSPanelOpen}
        onClose={() => setIsATSPanelOpen(false)}
        resumeId={resumeId}
        initialTargetRole={resume?.targetRole}
      />
    </div>
  );
}
