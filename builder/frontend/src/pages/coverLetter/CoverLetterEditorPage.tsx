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

const sectionOrder: CoverLetterSection[] = ["header", "body", "closing"];

type MobileTab = "edit" | "preview";

export default function CoverLetterEditorPage() {
  const [activeSection, setActiveSection] =
    useState<CoverLetterSection>("header");
  const [regenerateOpen, setRegenerateOpen] = useState(false);

  // ── Mobile/tablet-only navigation state (ignored at lg+, where the
  // sidebar + form + preview are all shown together) ──────────────
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");

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

      {/* ── Edit / Preview toggle — mobile/tablet only ── */}
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

      {/* ── Body ─────────────────────────────────────── */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* ── Left sidebar (section nav) — lg+ only ───── */}
        <CoverLetterEditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* ── Center: editor form ────────────────────── */}
        <main
          className={`flex-1 overflow-y-auto bg-background ${
            mobileTab === "preview" ? "hidden" : "block"
          } lg:block`}
        >
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-8 sm:py-8">
            {/* Mobile/tablet section switcher — lg+ never shows this,
                since the sidebar is already visible there. */}
            <div className="lg:hidden mb-4 flex gap-1.5 rounded-xl border border-primary/15 bg-modal p-1">
              {sectionOrder.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  className={`flex-1 truncate rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                    activeSection === section
                      ? "bg-primary text-white shadow-sm"
                      : "text-dark/60 hover:bg-card"
                  }`}
                >
                  {sectionLabels[section]}
                </button>
              ))}
            </div>

            <div className="@container rounded-2xl border border-card bg-modal p-6 sm:p-8 shadow-sm">
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
