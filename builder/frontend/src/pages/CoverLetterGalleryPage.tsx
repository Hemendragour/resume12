import { useState } from "react";
import { Sparkles } from "lucide-react";

import { coverLetterTemplates } from "../features/coverLetter/config/coverLetterTemplates";
import CreateCoverLetterModal from "../features/coverLetter/components/CreateCoverLetterModal";
import GenerateCoverLetterWithAiModal from "../features/coverLetter/components/GenerateCoverLetterWithAiModal";
import type { CoverLetterTemplate } from "../features/coverLetter/types/coverLetter.types";

/**
 * A lightweight CSS mockup of the letter layout, used as the template
 * card's thumbnail until a real screenshot asset is added (the same
 * way resume templates use a PNG under assets/templates).
 */
function CoverLetterThumbnail() {
  return (
    <div className="flex h-56 w-40 flex-col gap-2 bg-white p-4 shadow-md">
      <div className="h-3 w-24 rounded bg-slate-800" />
      <div className="h-1.5 w-32 rounded bg-slate-300" />
      <div className="mt-1 h-[2px] w-full bg-[#1F4E79]" />
      <div className="mt-2 flex justify-between">
        <div className="h-1.5 w-14 rounded bg-slate-300" />
        <div className="h-1.5 w-10 rounded bg-slate-300" />
      </div>
      <div className="mt-2 space-y-1.5">
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="h-1.5 w-3/4 rounded bg-slate-200" />
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="h-1.5 w-2/3 rounded bg-slate-200" />
      </div>
      <div className="mt-auto h-1.5 w-16 rounded bg-slate-300" />
    </div>
  );
}

export default function CoverLetterGalleryPage() {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<CoverLetterTemplate | null>(null);

  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:text-left">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold mb-1">
            Choose a Cover Letter Template
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Pick a template to start writing your cover letter
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAiModalOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-dark"
        >
          <Sparkles size={18} />
          Create Cover Letter with AI
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {coverLetterTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplateId(template.id)}
            className={`relative text-left border border-primary/10 rounded-xl p-5 transition hover:shadow-lg hover:-translate-y-0.5 ${template.color}`}
          >
            <div className="mb-4 flex justify-center">
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <CoverLetterThumbnail />
              </div>
            </div>
            <h3 className="font-semibold text-lg">{template.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
          </button>
        ))}
      </div>

      {selectedTemplateId && (
        <CreateCoverLetterModal
          open={!!selectedTemplateId}
          onClose={() => setSelectedTemplateId(null)}
          templateId={selectedTemplateId}
        />
      )}

      <GenerateCoverLetterWithAiModal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </div>
  );
}
