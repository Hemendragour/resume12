import { useResumeStore } from "../../../../../../store/resume.store";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || !resume.summary?.trim()) return null;
  const summarySection = resume.sections.find(
    (section) => section.id === "summary",
  );
  return (
    <section className="mt-6">
      <h2 className="mb-2 border-b border-slate-700 pb-1 text-[13px] font-bold uppercase tracking-[0.6px] text-black">
        {summarySection?.displayTitle?.trim() ||
          summarySection?.title ||
          " Summary"}
      </h2>

      <p className="text-[11.5px] leading-[1.55] text-slate-800 text-justify whitespace-pre-line">
        {resume.summary}
      </p>
    </section>
  );
}
