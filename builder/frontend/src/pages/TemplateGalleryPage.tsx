import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

import {
  templates,
  type Domain,
  type ExperienceLevel,
} from "../features/resume/config/templates";
import CreateResumeModal from "../features/resume/components/CreateResumeModal";
import type { ResumeTemplate } from "../features/resume/types/resume.types";

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceLevel | "all" }[] =
  [
    { label: "All levels", value: "all" },
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

type OpenMenu = "level" | "domain" | null;

export default function TemplateGalleryPage() {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<ResumeTemplate | null>(null);

  const [experienceFilter, setExperienceFilter] = useState<
    ExperienceLevel | "all"
  >("all");
  const [domainFilter, setDomainFilter] = useState<Domain[]>([]);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);

  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu: OpenMenu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleTemplateClick = (templateId: ResumeTemplate) => {
    setSelectedTemplateId(templateId);
  };

  const toggleDomain = (domain: Domain) => {
    setDomainFilter((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain],
    );
  };

  const hasActiveFilters =
    experienceFilter !== "all" || domainFilter.length > 0;

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

  const levelLabel =
    EXPERIENCE_OPTIONS.find((opt) => opt.value === experienceFilter)?.label ??
    "All levels";
  const domainLabel =
    domainFilter.length === 0 ? "Domain" : `Domain (${domainFilter.length})`;

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-dark mb-1">
          Choose a Template
        </h1>
        <p className="text-sm text-primary/70">
          Pick a template to start building your resume
        </p>
      </div>

      <div
        ref={filterBarRef}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
      >
        {/* Level dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("level")}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors sm:rounded-none sm:border-0 sm:border-b-2 sm:px-0 sm:py-0 sm:pb-1 ${
              openMenu === "level" || experienceFilter !== "all"
                ? "border-success/40 bg-success/10 text-success sm:bg-transparent sm:border-success"
                : "border-primary/15 bg-card text-dark hover:text-dark/70 sm:bg-transparent sm:border-transparent"
            }`}
          >
            {levelLabel === "All levels" ? "Level" : levelLabel}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openMenu === "level" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openMenu === "level" && (
            <div className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-primary/10 bg-card shadow-lg py-2">
              {EXPERIENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setExperienceFilter(opt.value);
                    setOpenMenu(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    experienceFilter === opt.value
                      ? "text-success font-medium"
                      : "text-dark/80 hover:bg-background"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Domain dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleMenu("domain")}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors sm:rounded-none sm:border-0 sm:border-b-2 sm:px-0 sm:py-0 sm:pb-1 ${
              openMenu === "domain" || domainFilter.length > 0
                ? "border-success/40 bg-success/10 text-success sm:bg-transparent sm:border-success"
                : "border-primary/15 bg-card text-dark hover:text-dark/70 sm:bg-transparent sm:border-transparent"
            }`}
          >
            {domainLabel}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openMenu === "domain" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openMenu === "domain" && (
            <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-primary/10 bg-card shadow-lg py-2">
              {DOMAIN_OPTIONS.map((opt) => {
                const active = domainFilter.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleDomain(opt.value)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      active
                        ? "text-success font-medium"
                        : "text-dark/80 hover:bg-background"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
              {domainFilter.length > 0 && (
                <>
                  <div className="my-1 h-px bg-primary/10" />
                  <button
                    onClick={() => setDomainFilter([])}
                    className="w-full text-left px-4 py-2 text-sm text-dark/50 hover:bg-background"
                  >
                    Clear domain
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-dark/50 hover:text-dark sm:ml-auto"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      <p className="mb-4 text-xs sm:text-sm text-dark/40">
        {filteredTemplates.length} of {templates.length} templates
      </p>

      {filteredTemplates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-primary/15 py-12 sm:py-16 text-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filteredTemplates.map((template) => (
            <button
              key={template.slug}
              onClick={() => handleTemplateClick(template.id)}
              className={`relative text-left border border-primary/10 rounded-xl p-2.5 sm:p-4 lg:p-5 bg-card transition hover:shadow-lg hover:-translate-y-0.5 ${template.color}`}
            >
              {template.featured && (
                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[10px] sm:text-xs font-medium bg-primary text-white px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}

              <div className="mb-3 sm:mb-4 flex justify-center">
                <div className="overflow-hidden rounded-lg bg-modal shadow-md">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-dark">
                {template.name}
              </h3>
              <p className="text-xs sm:text-sm text-primary/70 mt-1 line-clamp-2">
                {template.description}
              </p>
              <span className="inline-block mt-2 sm:mt-3 text-[10px] sm:text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
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
