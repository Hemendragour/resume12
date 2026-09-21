import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import {
  templates,
  type Domain,
  type ExperienceLevel,
} from "../features/resume/config/templates";
import CreateResumeModal from "../features/resume/components/CreateResumeModal";
import type { ResumeTemplate } from "../features/resume/types/resume.types";

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceLevel | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Fresher", value: "fresher" },
  { label: "Experienced", value: "experienced" },
];

const DOMAIN_OPTIONS: { label: string; value: Domain }[] = [
  { label: "Full Stack", value: "full-stack" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "AI", value: "ai" },
  { label: "Data Science", value: "data-science" },
  { label: "Cloud", value: "cloud" },
];

export default function TemplateGalleryPage() {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<ResumeTemplate | null>(null);

  const [experienceFilter, setExperienceFilter] =
    useState<ExperienceLevel | "all">("all");
  const [domainFilter, setDomainFilter] = useState<Domain[]>([]);

  const handleTemplateClick = (templateId: ResumeTemplate) => {
    setSelectedTemplateId(templateId);
  };

  const toggleDomain = (domain: Domain) => {
    setDomainFilter((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const hasActiveFilters = experienceFilter !== "all" || domainFilter.length > 0;

  const clearFilters = () => {
    setExperienceFilter("all");
    setDomainFilter([]);
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesExperience =
        experienceFilter === "all" ||
        template.experienceLevel.includes(experienceFilter);

      const matchesDomain =
        domainFilter.length === 0 ||
        template.domain.some((d) => domainFilter.includes(d));

      return matchesExperience && matchesDomain;
    });
  }, [experienceFilter, domainFilter]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-1">Choose a Template</h1>
      <p className="text-gray-500 mb-6">
        Pick a template to start building your resume
      </p>

      <div className="mb-7 rounded-2xl border border-primary/10 bg-card/60 px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2 text-dark/70">
            <SlidersHorizontal size={16} />
            <span className="text-sm font-medium">Filters</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-dark/40">
              Level
            </span>
            <div className="flex items-center gap-1 rounded-full bg-background p-1">
              {EXPERIENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setExperienceFilter(opt.value)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    experienceFilter === opt.value
                      ? "bg-primary text-white"
                      : "text-dark/60 hover:text-dark"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden h-6 w-px bg-primary/10 sm:block" />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-dark/40">
              Domain
            </span>
            {DOMAIN_OPTIONS.map((opt) => {
              const active = domainFilter.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleDomain(opt.value)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    active
                      ? "border-accent bg-accent/20 text-dark"
                      : "border-primary/15 text-dark/60 hover:border-accent/60 hover:text-dark"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 text-sm text-dark/50 hover:text-dark"
            >
              <X size={14} />
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm text-dark/40">
        {filteredTemplates.length} of {templates.length} templates
      </p>

      {filteredTemplates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-primary/15 py-16 text-center">
          <p className="text-sm text-dark/50">
            No templates match the selected filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((template) => (
            <button
              key={template.slug}
              onClick={() => handleTemplateClick(template.id)}
              className={`relative text-left border border-primary/10 rounded-xl p-5 transition hover:shadow-lg hover:-translate-y-0.5 ${template.color}`}
            >
              {template.featured && (
                <span className="absolute top-3 right-3 text-xs font-medium bg-primary text-white px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}

              <div className="mb-4 flex justify-center">
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {template.description}
              </p>
              <span className="inline-block mt-3 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                {template.ats}
              </span>
            </button>
          ))}
        </div>
      )}

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
