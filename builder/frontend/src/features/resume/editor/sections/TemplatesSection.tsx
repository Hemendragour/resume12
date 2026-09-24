import { Check } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";
import TemplateThumbnail from "../components/TemplateThumbnail";

const templates = [
  {
    id: "technical-classic",
    title: "Technical Classic",
    badge: "99% ATS",
    bestFor: "Software Engineers",
    description: "FAANG inspired single-column resume.",
    popular: true,
  },
  {
    id: "technical-developer",
    title: "Technical Developer",
    badge: "ATS Friendly",
    bestFor: "Software Engineers",
    description: "Modern developer resume.",
    popular: false,
  },
  {
    id: "modern-professional",
    title: "Modern Professional",
    badge: "Most Popular",
    bestFor: "Frontend / Full Stack",
    description: "Clean modern resume.",
    popular: false,
  },
  {
    id: "professional-modern",
    title: "Professional Modern",
    badge: "95% ATS",
    bestFor: "Business & Corporate roles",
    description: "Peach header band with icon-based section headers.",
    popular: false,
  },
  {
    id: "executive",
    title: "Executive",
    badge: "Corporate",
    bestFor: "Senior Professionals",
    description: "For senior professionals.",
    popular: false,
  },
  {
    id: "student",
    title: "Student",
    badge: "Freshers",
    bestFor: "College Students",
    description: "Best for students.",
    popular: false,
  },
  {
    id: "ats",
    title: "ATS Professional",
    badge: "Best ATS",
    bestFor: "Job Applications",
    description: "Maximum ATS compatibility.",
    popular: false,
  },
  {
    id: "corporate-band",
    title: "Corporate Band",
    badge: "97% ATS",
    bestFor: "Marketing & Corporate roles",
    description: "Bold black header band, single column.",
    popular: false,
  },
  {
    id: "split-label",
    title: "Split Label",
    badge: "94% ATS",
    bestFor: "Creative & Business roles",
    description: "Elegant label-left layout, pink accents.",
    popular: false,
  },
  {
    id: "classic-serif",
    title: "Classic Serif",
    badge: "98% ATS",
    bestFor: "Operations & Business roles",
    description: "Centered serif header, clean underlined sections.",
    popular: false,
  },
  {
    id: "corporate-classic",
    title: "Corporate Classic",
    badge: "97% ATS",
    bestFor: "Marketing & Business roles",
    description: "Centered bordered headers, clean grid layout.",
    popular: false,
  },
  {
    id: "executive-blue",
    title: "Executive Blue",
    badge: "96% ATS",
    bestFor: "Full Stack & Backend Engineers",
    description:
      "Bold blue accents, badge certifications, GitHub project links.",
    popular: false,
  },
] as const;

export default function TemplatesSection() {
  const resume = useResumeStore((state) => state.resume);
  const updateTemplate = useResumeStore((state) => state.updateTemplate);

  if (!resume) return null;

  return (
    <div className="w-full min-w-0">
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
        Resume Templates
      </h2>

      <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:mt-3 sm:text-base lg:text-lg">
        Select a template. Changes are applied instantly.
      </p>

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {templates.map((template) => {
          const active = resume.templateId === template.id;

          return (
            <div
              key={template.id}
              className={`group flex min-w-0 h-full flex-col overflow-hidden rounded-2xl border bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                active
                  ? "border-blue-600 ring-2 ring-blue-200 shadow-xl"
                  : "border-gray-200"
              }`}
            >
              {/* Thumbnail */}
              <div className="h-44 bg-gradient-to-br from-slate-100 via-slate-50 to-white p-4 flex items-center justify-center overflow-hidden">
                <TemplateThumbnail templateId={template.id} />
              </div>

              {/* Content */}
              <div className="flex flex-1 min-w-0 flex-col p-4 sm:p-5">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold tracking-tight sm:text-lg">
                        {template.title}
                      </h3>

                      {template.popular && (
                        <span className="shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {template.description}
                    </p>
                  </div>

                  {active && (
                    <Check
                      className="mt-0.5 shrink-0 text-green-600"
                      size={20}
                    />
                  )}
                </div>

                {/* Badge */}
                <div className="mt-3">
                  <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                    {template.badge}
                  </span>
                </div>

                {/* Best For */}
                <div className="mt-3 rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] font-semibold text-slate-500">
                    BEST FOR
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-slate-700 sm:text-sm">
                    {template.bestFor}
                  </p>
                </div>

                <div className="flex-1" />

                {/* Button */}
                <button
                  type="button"
                  onClick={() => updateTemplate(template.id)}
                  className={`mt-4 h-10 w-full rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-green-600 text-white"
                      : "border border-gray-300 hover:bg-slate-50"
                  }`}
                >
                  {active ? "✓ Selected" : "Use Template"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
