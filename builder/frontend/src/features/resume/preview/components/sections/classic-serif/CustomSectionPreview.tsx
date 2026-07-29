import { useResumeStore } from "../../../../../../store/resume.store";

interface Props {
  sectionId: string;
}

export default function ClassicSerifCustomSection({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);
  const section = resume?.customSections.find((s) => s.id === sectionId);
  if (!section || section.items.length === 0) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-900">
        {section.title}
      </h2>

      <div className="mt-3 space-y-2">
        {section.items.map((item) => (
          <div key={item.id}>
            <div className="flex items-baseline justify-between">
              <p className="text-[12.5px] text-slate-900">
                <span className="font-bold">{item.title}</span>
                {item.subtitle && (
                  <span className="italic">, {item.subtitle}</span>
                )}
              </p>
              {(item.startDate || item.endDate) && (
                <span className="text-[11.5px] text-slate-600">
                  {item.startDate} {item.endDate && `– ${item.endDate}`}
                </span>
              )}
            </div>
            {item.description && (
              <p className="mt-1 text-[11.5px] leading-5 text-slate-700">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
