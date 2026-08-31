import { useResumeStore } from "../../../../../../store/resume.store";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const awards = resume?.awards ?? [];
  if (!resume || awards.length === 0) return null;

  const awardsSection = resume.sections.find(
    (section) => section.id === "awards",
  );

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        {awardsSection?.displayTitle?.trim() ||
          awardsSection?.title ||
          "Awards"}
      </h2>

      <div className="mt-3 grid grid-cols-3 gap-x-6 gap-y-2 text-[11.5px] leading-5 text-slate-700">
        {awards.map((award, i) => (
          <span key={i} className="flex gap-2">
            <span>•</span> <span>{award}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
