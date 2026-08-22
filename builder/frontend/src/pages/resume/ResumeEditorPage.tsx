import { useState } from "react";

import { useResume } from "../../features/resume/editor/hooks/useResume";
import { useAutoSave } from "../../features/resume/editor/hooks/useAutoSave";

import EditorHeader from "../../features/resume/editor/components/EditorHeader";
import EditorSidebar from "../../features/resume/editor/components/EditorSidebar";
import PreviewPanel from "../../features/resume/editor/components/PreviewPanel";
import DynamicEditorRenderer from "../../features/resume/editor/components/DynamicEditorRenderer";
import ATSPanel from "../../features/resume/editor/components/ATSPanel/ATSPanel";

// import ResumeCompletionCard from "../../features/resume/components/ResumeCompletionCard";
// import { useResumeCompletion } from "../../features/resume/hooks/useResumeCompletion";
import ExportPdfButton from "../../features/resume/components/ExportPdfButton";

export default function ResumeEditorPage() {
  const [activeSection, setActiveSection] = useState("personal");

  // ============================================================
  // RESUME
  // ============================================================

  const { loading, resume, resumeId } = useResume();

  const saveStatus = useAutoSave();

  // ============================================================
  // ATS PANEL
  // ============================================================

  const [isATSPanelOpen, setIsATSPanelOpen] = useState(false);

  // ============================================================
  // RESUME COMPLETION
  // ============================================================

  // const completion = useResumeCompletion();

  // ============================================================
  // LOADING
  // ============================================================

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
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <EditorHeader
        title={resume?.title ?? "Untitled Resume"}
        saveStatus={saveStatus}
      />

      {/* ====================================================== */}
      {/* ACTION BAR */}
      {/* ====================================================== */}

      <div className="border-b border-card bg-modal px-6 py-4">
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsATSPanelOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-dark"
          >
            Analyze ATS
          </button>

          {resume && <ExportPdfButton />}
        </div>
      </div>

      {/* ====================================================== */}
      {/* RESUME COMPLETION */}
      {/* ====================================================== */}

      {/* {completion && (
        <ResumeCompletionCard
          percentage={completion.percentage}
          missing={completion.missing}
        />
      )} */}

      {/* ====================================================== */}
      {/* EDITOR WORKSPACE */}
      {/* ====================================================== */}

      <div className="flex flex-1 overflow-hidden">
        {/* ==================================================== */}
        {/* LEFT SIDEBAR */}
        {/* ==================================================== */}

        <EditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* ==================================================== */}
        {/* CENTER EDITOR */}
        {/* ==================================================== */}

        <main className="flex-1 overflow-y-auto bg-background p-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-card bg-modal p-8 shadow-sm">
              <h2 className="mb-2 text-2xl font-bold capitalize text-dark">
                {activeSection}
              </h2>

              <p className="mb-8 text-dark/60">
                Fill this section of your resume.
              </p>

              {/* ================================================= */}
              {/* DYNAMIC EDITOR */}
              {/* ================================================= */}

              <DynamicEditorRenderer activeSection={activeSection} />
            </div>
          </div>
        </main>

        {/* ==================================================== */}
        {/* RIGHT PREVIEW */}
        {/* ==================================================== */}

        <PreviewPanel />
      </div>

      {/* ====================================================== */}
      {/* ATS PANEL (slide-in) */}
      {/* ====================================================== */}

      {/* <ATSPanel
        isOpen={isATSPanelOpen}
        onClose={() => setIsATSPanelOpen(false)}
        resumeId={resumeId}
        initialTargetRole={resume?.targetRole}
      /> */}

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
