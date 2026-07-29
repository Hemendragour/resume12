import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

interface Props {
  sectionId: string;
}

export default function ExecutiveBlueCustomSection({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);
  const section = resume?.customSections.find((s) => s.id === sectionId);
  if (!section) return null;

  return (
    <section className="mt-5">
      <h2 className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}>
        {section.title}
      </h2>

      {section.items.length === 0 ? (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.muted}`}>No entries added.</p>
      ) : (
        <div className="mt-3 space-y-3">
          {section.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-6">
              <div className="flex-1">
                <p className={`${T.fontSize.itemTitle} font-bold ${T.colors.heading}`}>
                  {item.title}
                  {item.subtitle && (
                    <span className={`ml-1 font-normal ${T.fontSize.itemSubtitle} ${T.colors.muted}`}>
                      {item.subtitle}
                    </span>
                  )}
                </p>
                {item.description && (
                  <p className={`mt-1 ${T.fontSize.body} leading-5 ${T.colors.body}`}>
                    {item.description}
                  </p>
                )}
              </div>
              {(item.startDate || item.endDate) && (
                <span className={`whitespace-nowrap ${T.fontSize.date} ${T.colors.muted}`}>
                  {item.startDate} {item.endDate && `– ${item.endDate}`}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}