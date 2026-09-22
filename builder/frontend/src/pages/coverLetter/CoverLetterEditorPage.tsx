import { useState } from "react";

import { useCoverLetter } from "../../features/coverLetter/editor/hooks/useCoverLetter";
import { useAutoSaveCoverLetter } from "../../features/coverLetter/editor/hooks/useAutoSaveCoverLetter";

import EditorHeader from "../../features/resume/editor/components/EditorHeader";
import CoverLetterEditorSidebar, {
  type CoverLetterSection,
} from "../../features/coverLetter/editor/components/CoverLetterEditorSidebar";
import CoverLetterPreviewPanel from "../../features/coverLetter/editor/components/CoverLetterPreviewPanel";
import CoverLetterDynamicEditorRenderer from "../../features/coverLetter/editor/components/CoverLetterDynamicEditorRenderer";
import ExportCoverLetterPdfButton from "../../features/coverLetter/components/ExportCoverLetterPdfButton";

const sectionLabels: Record<CoverLetterSection, string> = {
  header: "Header & Greeting",
  body: "Letter Body",
  closing: "Closing",
};

export default function CoverLetterEditorPage() {
  const [activeSection, setActiveSection] =
    useState<CoverLetterSection>("header");

  const { loading, coverLetter } = useCoverLetter();

  const saveStatus = useAutoSaveCoverLetter();

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-112px)] items-center justify-center rounded-2xl bg-modal shadow-sm">
        <p className="text-lg font-medium text-dark/70">
          Loading Cover Letter...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-112px)] flex-col rounded-2xl bg-modal shadow-sm">
      <EditorHeader
        title={coverLetter?.title ?? "Untitled Cover Letter"}
        saveStatus={saveStatus}
      />

      <div className="border-b border-card bg-modal px-6 py-4">
        <div className="flex flex-nowrap items-center justify-end gap-3 overflow-x-auto">
          {coverLetter && <ExportCoverLetterPdfButton />}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <CoverLetterEditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 overflow-y-auto bg-background p-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-card bg-modal p-8 shadow-sm">
              <h2 className="mb-2 text-2xl font-bold text-dark">
                {sectionLabels[activeSection]}
              </h2>
              <p className="mb-8 text-dark/60">
                Fill this section of your cover letter.
              </p>

              <CoverLetterDynamicEditorRenderer activeSection={activeSection} />
            </div>
          </div>
        </main>

        <CoverLetterPreviewPanel />
      </div>
    </div>
  );
}
