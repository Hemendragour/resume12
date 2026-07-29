import { useResumeStore } from "../../../../../../store/resume.store";

interface Props {
  sectionId: string;
}

export default function CustomSectionPreview({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const section = resume.customSections.find((item) => item.id === sectionId);
  if (!section || section.items.length === 0) return null;

  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        {section.title}
      </h2>

      <div className="col-span-3 space-y-4">
        {section.items.map((item) => (
          <div key={item.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[12px] font-bold text-rose-700">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-[11px] text-slate-600">{item.subtitle}</p>
                )}
              </div>
              {(item.startDate || item.endDate) && (
                <span className="text-[11px] text-slate-500">
                  {item.startDate}
                  {item.startDate && item.endDate ? " – " : ""}
                  {item.endDate}
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
