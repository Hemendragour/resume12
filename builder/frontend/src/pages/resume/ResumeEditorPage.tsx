import { useState } from "react";

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
import { Sparkles } from "lucide-react";
import { mapResumeToQuickGenerateFormData } from "../../features/resume/editor/utils/mapResumeToGenerateForm";

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
    setFormInitialData(undefined); // start blank
    setShowQuickGenerate(true);
  };

  const openEditWithAI = () => {
    if (!resume) return;
    setFormInitialData(mapResumeToQuickGenerateFormData(resume)); // pre-filled
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

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-112px)] items-center justify-center rounded-2xl bg-modal shadow-sm">
        <p className="text-lg font-medium text-dark/70">Loading Resume...</p>
      </div>
    );
  }

  // ============================================================
  // MAIN EDITOR
  // ============================================================

  return (
    <div className="flex min-h-[calc(100vh-112px)] flex-col rounded-2xl bg-modal shadow-sm">
      <EditorHeader
        title={resume?.title ?? "Untitled Resume"}
        saveStatus={saveStatus}
      />

      <div className="border-b border-card bg-modal px-6 py-4">
        <div className="flex flex-nowrap items-center justify-end gap-3 overflow-x-auto">
          <button
            type="button"
            onClick={openGenerate}
            disabled={showQuickGenerate || isGenerating}
            className="inline-flex items-center gap-2 shrink-0 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-dark transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={16} />
            Generate Resume in 2 Minutes
          </button>

          <button
            type="button"
            onClick={openEditWithAI}
            disabled={!hasGeneratedWithAI || showQuickGenerate || isGenerating}
            title={
              !hasGeneratedWithAI
                ? "Generate a resume with AI first"
                : undefined
            }
            className="inline-flex items-center gap-2 shrink-0 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-dark transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={16} />
            Edit with AI
          </button>

          <button
            type="button"
            onClick={() => setIsATSPanelOpen(true)}
            className="inline-flex items-center gap-2 shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-dark"
          >
            Analyze ATS
          </button>

          {resume && <ExportPdfButton />}
        </div>
      </div>

      {showQuickGenerate ? (
        <div className="flex-1 overflow-y-auto bg-background p-8">
          <QuickGenerateForm
            onGenerate={handleGenerate}
            onCancel={() => setShowQuickGenerate(false)}
            initialData={formInitialData}
          />
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <EditorSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <main className="flex-1 overflow-y-auto bg-background p-8">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-card bg-modal p-8 shadow-sm">
                {isGenerating ? (
                  <GenerateResumeLoader />
                ) : (
                  <>
                    <h2 className="mb-2 text-2xl font-bold capitalize text-dark">
                      {activeSection}
                    </h2>
                    <p className="mb-8 text-dark/60">
                      Fill this section of your resume.
                    </p>
                    <DynamicEditorRenderer activeSection={activeSection} />
                  </>
                )}
              </div>
            </div>
          </main>

          <PreviewPanel />
        </div>
      )}

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
