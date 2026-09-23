import { useEffect, useState } from "react";

import { useResume } from "../../features/resume/editor/hooks/useResume";
import { useAutoSave } from "../../features/resume/editor/hooks/useAutoSave";

import EditorHeader from "../../features/resume/editor/components/EditorHeader";
import EditorSidebar from "../../features/resume/editor/components/EditorSidebar";
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
import { Loader2 } from "lucide-react";

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
        <div className="flex flex-1 overflow-hidden">
          {/* ── Left sidebar (sections nav) ────────── */}
          <EditorSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* ── Center: editor form ────────────────── */}
          <main className="flex-1 overflow-y-auto bg-background">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-8">
              <div className="rounded-2xl border border-card bg-modal p-6 sm:p-8 shadow-sm">
                {isGenerating ? (
                  <GenerateResumeLoader />
                ) : (
                  <>
                    <h2 className="mb-1 text-xl font-bold capitalize text-dark">
                      {activeSection}
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
          <PreviewPanel />
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
