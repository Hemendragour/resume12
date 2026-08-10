import { useResumeStore } from "../../../../../../store/resume.store";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function CustomSectionPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.customSections.length === 0) return null;

  return (
    <>
      {resume.customSections.map((section) => {
        if (!section.items.length) return null;

        return (
          <section key={section.id} className={T.spacing.section}>
            <SectionHeader title={section.title} />

            <div className="mt-3 space-y-6">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-slate-200 pb-5 last:border-b-0"
                >
                  <div className="flex justify-between items-start gap-5">
                    <div>
                      <h3
                        className={`
                          ${T.fontWeight.bold}
                          ${T.fontSize.itemTitle}
                          ${T.colors.heading}
                        `}
                      >
                        {item.title}
                      </h3>

                      {item.subtitle && (
                        <p
                          className={`
                            mt-1
                            ${T.fontSize.body}
                            text-blue-700
                          `}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {(item.startDate || item.endDate) && (
                      <p
                        className={`
                          ${T.fontSize.small}
                          ${T.colors.muted}
                        `}
                      >
                        {item.startDate} {item.endDate && `- ${item.endDate}`}
                      </p>
                    )}
                  </div>

                  {item.description && (
                    <p
                      className={`
                        mt-3
                        ${T.fontSize.body}
                        ${T.colors.body}
                        whitespace-pre-line
                      `}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
