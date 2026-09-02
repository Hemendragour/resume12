import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

interface Props {
  sectionId: string;
}

export default function CorporateClassicCustomSection({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);
  const section = resume?.customSections.find((s) => s.id === sectionId);
  if (!section || section.items.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        {section.title}
      </h2>

      <div className="mt-3 space-y-3">
        {section.items.map((item) => (
          <div key={item.id} className="flex justify-between gap-6">
            <div className="flex-1">
              <p className="text-[12px] font-bold text-slate-900">
                {item.title}
                {item.subtitle && (
                  <span className="ml-1 text-[11px] italic font-normal text-slate-700">
                    {item.subtitle}
                  </span>
                )}
              </p>
              {item.description && (
                <p className="mt-1 text-[11px] leading-5 text-slate-700">
                  {item.description}
                </p>
              )}
            </div>
            {(item.startDate || item.endDate) && (
              <span className="whitespace-nowrap text-[11px] text-slate-600">
                {formatMonthYear(item.startDate)}{" "}
                {item.endDate && `– ${formatMonthYear(item.endDate)}`}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
