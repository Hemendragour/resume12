import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

interface Props {
  sectionId: string;
}

export default function CustomSectionPreview({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const section = resume.customSections.find((item) => item.id === sectionId);
  if (!section || section.items.length === 0) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {section.title}
      </h2>

      <div className="mt-2 space-y-4">
        {section.items.map((item) => (
          <div key={item.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[12px] font-bold text-slate-900">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-[11px] italic text-slate-600">
                    {item.subtitle}
                  </p>
                )}
              </div>
              {(item.startDate || item.endDate) && (
                <span className="text-[11px] text-slate-600">
                  {formatMonthYear(item.startDate)}
                  {item.startDate && item.endDate ? " - " : ""}
                  {formatMonthYear(item.endDate)}
                </span>
              )}
            </div>
            {item.description && (
              <p className="mt-1 text-[11px] leading-4 text-slate-700">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
