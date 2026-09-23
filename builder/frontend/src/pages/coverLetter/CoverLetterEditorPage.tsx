import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCoverLetter } from "../../features/coverLetter/editor/hooks/useCoverLetter";
import { useAutoSaveCoverLetter } from "../../features/coverLetter/editor/hooks/useAutoSaveCoverLetter";

//  Use the dedicated cover letter header — NOT the resume EditorHeader
import CoverLetterEditorHeader from "../../features/coverLetter/editor/components/CoverLetterEditorHeader";
import CoverLetterEditorSidebar, {
  type CoverLetterSection,
} from "../../features/coverLetter/editor/components/CoverLetterEditorSidebar";
import CoverLetterPreviewPanel from "../../features/coverLetter/editor/components/CoverLetterPreviewPanel";
import CoverLetterDynamicEditorRenderer from "../../features/coverLetter/editor/components/CoverLetterDynamicEditorRenderer";
import ExportCoverLetterPdfButton from "../../features/coverLetter/components/ExportCoverLetterPdfButton";
import RegenerateCoverLetterModal from "../../features/coverLetter/editor/components/RegenerateCoverLetterModal";
import { Loader2 } from "lucide-react";

const sectionLabels: Record<CoverLetterSection, string> = {
  header: "Header & Greeting",
  body: "Letter Body",
  closing: "Closing",
};

export default function CoverLetterEditorPage() {
  const [activeSection, setActiveSection] =
    useState<CoverLetterSection>("header");
  const [regenerateOpen, setRegenerateOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, coverLetter } = useCoverLetter();
  const saveStatus = useAutoSaveCoverLetter();

  // ── Loading state ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] flex-col">
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
    /*
     * Cancel out MainLayout's p-4/p-6/p-8 padding so the editor
     * fills the viewport edge-to-edge below the global Navbar (h-20).
     */
    <div
      className="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 flex flex-col overflow-hidden"
      style={{ height: "calc(100vh - 80px)" }}
    >
      {/* ── Slim Overleaf-style topbar ──────────────── */}
      <CoverLetterEditorHeader
        title={coverLetter?.title ?? "Untitled Cover Letter"}
        saveStatus={saveStatus}
        onRegenerateClick={() => setRegenerateOpen(true)}
        hasContent={!!coverLetter}
        exportButton={coverLetter ? <ExportCoverLetterPdfButton /> : undefined}
      />

      {/* ── Body ─────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left sidebar (section nav) ─────────────── */}
        <CoverLetterEditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* ── Center: editor form ────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-8">
            <div className="rounded-2xl border border-card bg-modal p-6 sm:p-8 shadow-sm">
              <h2 className="mb-1 text-xl font-bold text-dark">
                {sectionLabels[activeSection]}
              </h2>
              <p className="mb-7 text-sm text-dark/50">
                Fill this section of your cover letter.
              </p>
              <CoverLetterDynamicEditorRenderer activeSection={activeSection} />
            </div>
          </div>
        </main>

        {/* ── Right: live PDF preview ────────────────── */}
        <CoverLetterPreviewPanel />
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
