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
  description: "Bold blue accents, badge certifications, GitHub project links.",
  popular: false,
},
] as const;
 

export default function TemplatesSection() {
  const resume = useResumeStore((state) => state.resume);
  const updateTemplate = useResumeStore((state) => state.updateTemplate);

  if (!resume) return null;

  return (
    <div>
      <h2 className="text-4xl font-extrabold tracking-tight">
        Resume Templates
      </h2>

      <p className="mt-3 max-w-2xl text-lg text-slate-500">
        Select a template. Changes are applied instantly.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => {
          const active = resume.templateId === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => updateTemplate(template.id)}
              className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-white text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                active
                  ? "border-blue-600 ring-2 ring-blue-200 shadow-xl"
                  : "border-gray-200"
              }`}
            >
              {/* Thumbnail - Height Reduced */}
              <div className="h-48 bg-gradient-to-br from-slate-100 via-slate-50 to-white p-5 flex items-center justify-center overflow-hidden transition group-hover:scale-[1.03]">
                <TemplateThumbnail templateId={template.id} />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold tracking-tight">
                        {template.title}
                      </h3>
                      {template.popular && (
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 text-sm leading-tight text-slate-500 line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  {active && (
                    <Check className="text-green-600 mt-0.5" size={22} />
                  )}
                </div>

                {/* Badge */}
                <div className="mt-4">
                  <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                    {template.badge}
                  </span>
                </div>

                {/* Best For */}
                <div className="mt-4 rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-500">
                    BEST FOR
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-700">
                    {template.bestFor}
                  </p>
                </div>

                <div className="flex-1" />

                {/* Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTemplate(template.id);
                  }}
                  className={`mt-5 h-10 w-full rounded-2xl font-semibold transition-all duration-200 ${
                    active
                      ? "bg-green-600 text-white"
                      : "border border-gray-300 hover:bg-slate-50"
                  }`}
                >
                  {active ? "✓ Selected" : "Use Template"}
                </button>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
