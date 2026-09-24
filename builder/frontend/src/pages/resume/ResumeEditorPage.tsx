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
import { ChevronRight, List, Loader2 } from "lucide-react";

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

  // ── Mobile/tablet-only navigation state (ignored at lg+, where the
  // sidebar + form + preview are all shown together as before) ──────
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const [showMobileSectionList, setShowMobileSectionList] = useState(false);

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
  };

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] flex-col">
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
     * Outer shell: fills everything below the global Navbar (h-20 desktop,
     * h-16 mobile). We use a negative-margin trick to cancel out the
     * MainLayout p-4/p-6/p-8 padding so the editor goes edge-to-edge.
     */
    <div className="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 flex flex-col overflow-hidden"
      style={{ height: "calc(100vh - 80px)" }}>

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

      {/* ── Edit / Preview toggle — mobile/tablet only ── */}
      {!showQuickGenerate && (
        <div className="flex lg:hidden items-center gap-1 border-b border-primary/10 bg-modal px-3 py-2">
          <button
            type="button"
            onClick={() => setMobileTab("edit")}
            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
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
            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
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
        <div className="relative flex flex-1 overflow-hidden">
          {/* ── Left sidebar (sections nav) — lg+ only ── */}
          <EditorSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />

          {/* ── Center: editor form ────────────────── */}
          <main
            className={`flex-1 overflow-y-auto bg-background ${
              mobileTab === "preview" ? "hidden" : "block"
            } lg:block`}
          >
            {/* Mobile/tablet section-list overlay — replaces the form
                until a section is picked, then hands back to it. Never
                rendered at lg+, where the sidebar is always visible
                instead. */}
            {showMobileSectionList && (
              <div className="lg:hidden flex h-full flex-col bg-modal">
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
                <div className="flex-1 overflow-y-auto">
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
              } mx-auto max-w-3xl px-3 py-5 sm:px-5 sm:py-6`}
            >
              {/* Mobile/tablet trigger to open the section list above —
                  lg+ never shows this, since the sidebar is already
                  visible there. */}
              <button
                type="button"
                onClick={() => setShowMobileSectionList(true)}
                className="lg:hidden mb-4 flex w-full items-center justify-between rounded-xl border border-primary/15 bg-modal px-4 py-2.5 text-sm font-medium text-dark transition hover:border-primary/30"
              >
                <span className="flex items-center gap-2 truncate">
                  <List size={15} className="shrink-0 text-primary/50" />
                  <span className="truncate">{activeSectionLabel}</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-primary/40" />
              </button>

              <div className="rounded-2xl border border-card bg-modal p-4 sm:p-6 shadow-sm overflow-hidden">
                {isGenerating ? (
                  <GenerateResumeLoader />
                ) : (
                  <>
                    <h2 className="mb-1 text-xl font-bold text-dark">
                      {activeSectionLabel}
                    </h2>
                    <p className="mb-7 text-sm text-dark/50">
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
