import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { templates } from "../features/resume/config/templates";
import CreateResumeModal from "../features/resume/components/CreateResumeModal";
import type { ResumeTemplate } from "../features/resume/types/resume.types";

import { useAuthStore } from "../store/auth.store";

export default function HomePage() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const [selectedTemplateId, setSelectedTemplateId] =
    useState<ResumeTemplate | null>(null);

  const handleTemplateClick = (templateId: ResumeTemplate) => {
    // User is not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // User is logged in
    setSelectedTemplateId(templateId);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-semibold mb-1 text-dark">
        Choose a Template
      </h1>

      <p className="text-primary/70 mb-6">
        Pick a template to start building your resume
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateClick(template.id)}
            className={`relative text-left border border-dark-border rounded-xl p-5 bg-card transition hover:shadow-lg hover:-translate-y-0.5 ${template.color}`}
          >
            {template.featured && (
              <span className="absolute top-3 right-3 text-xs font-medium bg-dark text-background px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}

            <div className="mb-4 flex justify-center">
              <div className="overflow-hidden rounded-lg bg-modal shadow-md">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <h3 className="font-semibold text-lg text-dark">{template.name}</h3>

            <p className="text-sm text-primary/80 mt-1">
              {template.description}
            </p>

            <span className="inline-block mt-3 text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
              {template.ats}
            </span>
          </button>
        ))}
      </div>

      {selectedTemplateId && (
        <CreateResumeModal
          open={!!selectedTemplateId}
          onClose={() => setSelectedTemplateId(null)}
          templateId={selectedTemplateId}
        />
      )}
    </div>
  );
}
