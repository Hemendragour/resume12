import { useResumeStore } from "../../../../../../store/resume.store";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const awards = resume?.awards ?? [];
  if (!resume || awards.length === 0) return null;

  const awardsSection = resume.sections.find(
    (section) => section.id === "awards",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-900">
        {awardsSection?.displayTitle?.trim() ||
          awardsSection?.title ||
          "Awards"}
      </h2>

      <ul className="mt-3 space-y-1 pl-4 text-[11.5px] leading-5 text-slate-700">
        {awards.map((award, i) => (
          <li key={i} className="list-disc">
            {award}
          </li>
        ))}
      </ul>
    </section>
  );
}
